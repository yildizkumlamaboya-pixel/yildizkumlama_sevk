package com.yildiz.sevkiyat;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.provider.Settings;
import android.util.Base64;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.core.content.FileProvider;
import androidx.documentfile.provider.DocumentFile;

import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Sevkiyat Programı — kendi WebView kabuğu.
 * Sayfa Vercel'den açılır (service worker sayesinde internetsiz de çalışır).
 * Yerel köprü (window.SevkNative): resmi WhatsApp vb. ile paylaşma, dosya kaydetme,
 * Google Drive'da seçilen konuma otomatik yedek yazma.
 */
public class MainActivity extends Activity {
    static final String URL = "https://yildiz-kumlama.vercel.app/";
    static final String HOST = "yildiz-kumlama.vercel.app";
    static final String AUTH = "com.yildiz.sevkiyat.files";
    static final String MIC = android.Manifest.permission.RECORD_AUDIO, CAM = android.Manifest.permission.CAMERA;
    static final int RC_FILE = 2, RC_WEBPERM = 3, RC_CAMFILE = 5, RC_DRIVE = 8, RC_SAVE = 9, RC_MEDIA = 10;
    static volatile boolean visible = false;
    volatile String pendingAct = null;
    volatile boolean pageReady = false;
    final java.util.HashMap<String, DocumentFile> dirCache = new java.util.HashMap<>();

    WebView web;
    SharedPreferences prefs;
    ValueCallback<Uri[]> fileCb;
    Uri camUri;
    PermissionRequest pendingWebPerm;
    String saveSlot;
    volatile boolean driveBusy = false;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        prefs = getSharedPreferences("app", MODE_PRIVATE);
        web = new WebView(this);
        web.setBackgroundColor(Color.WHITE);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setUserAgentString(s.getUserAgentString() + " SevkiyatApp/1");
        web.addJavascriptInterface(new Bridge(), "SevkNative");

        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView v, String url) {
                pageReady = url != null && url.contains(HOST);
                if (pageReady && pendingAct != null) checkAct();
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (HOST.equals(u.getHost())) return false;
                openExternal(u);
                return true;
            }

            @Override
            public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
                if (r.isForMainFrame()) {
                    v.loadDataWithBaseURL(null, "<html><body style='font-family:sans-serif;text-align:center;padding:60px 24px;color:#17171A'>"
                            + "<h2>İnternet yok</h2><p>Program ilk açılışta internete bağlanmalı. Sonrasında internetsiz de açılır.</p>"
                            + "<button style='font-size:17px;padding:12px 26px;border:0;border-radius:12px;background:#17171A;color:#fff' onclick=\"location.href='" + URL + "'\">Tekrar dene</button></body></html>",
                            "text/html", "UTF-8", null);
                }
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest req) {
                runOnUiThread(() -> {
                    List<String> need = new ArrayList<>();
                    for (String r : req.getResources()) {
                        if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(r) && !has(MIC)) need.add(MIC);
                        if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(r) && !has(CAM)) need.add(CAM);
                    }
                    if (need.isEmpty()) req.grant(req.getResources());
                    else {
                        pendingWebPerm = req;
                        requestPermissions(need.toArray(new String[0]), RC_WEBPERM);
                    }
                });
            }

            @Override
            public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (fileCb != null) fileCb.onReceiveValue(null);
                fileCb = cb;
                boolean image = false;
                String[] types = p.getAcceptTypes();
                if (types != null) for (String a : types) if (a != null && a.startsWith("image")) image = true;
                if (p.isCaptureEnabled() && image) {
                    if (!has(CAM)) requestPermissions(new String[]{CAM}, RC_CAMFILE);
                    else openCamera();
                    return true;
                }
                try {
                    camUri = null;
                    Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                    i.addCategory(Intent.CATEGORY_OPENABLE);
                    String t = "*/*";
                    if (image) t = "image/*";
                    else if (types != null && types.length == 1 && types[0] != null && types[0].contains("/")) t = types[0];
                    i.setType(t);
                    if (p.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE) i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                    startActivityForResult(Intent.createChooser(i, "Dosya seç"), RC_FILE);
                } catch (Exception e) {
                    fileCb.onReceiveValue(null);
                    fileCb = null;
                }
                return true;
            }
        });

        // Eski usul <a download href="data:..."> indirmeleri: kaydetme penceresiyle kaydet
        web.setDownloadListener((url, ua, cd, mime, len) -> {
            try {
                if (url != null && url.startsWith("data:")) {
                    int c = url.indexOf(',');
                    String head = url.substring(5, c);
                    byte[] b = head.endsWith(";base64") ? Base64.decode(url.substring(c + 1), Base64.DEFAULT) : Uri.decode(url.substring(c + 1)).getBytes("UTF-8");
                    try (OutputStream os = new FileOutputStream(slot("file"))) {
                        os.write(b);
                    }
                    String m = head.replace(";base64", "");
                    String name = android.webkit.URLUtil.guessFileName(url, cd, m);
                    startSave(name, m.isEmpty() ? "application/octet-stream" : m);
                } else if (url != null && url.startsWith("http")) {
                    openExternal(Uri.parse(url));
                }
            } catch (Exception e) {
                toast("İndirilemedi");
            }
        });

        takeIntent(getIntent());
        if (state != null) web.restoreState(state);
        else web.loadUrl(URL);
    }

    @Override
    protected void onNewIntent(Intent i) {
        super.onNewIntent(i);
        setIntent(i);
        takeIntent(i);
        if (pageReady) checkAct();
    }

    void takeIntent(Intent i) {
        if (i == null) return;
        String a = i.getStringExtra("act");
        if (a == null && i.getData() != null && "sevkiyat".equals(i.getData().getScheme())) a = i.getData().getHost();
        if (a != null) pendingAct = a;
        i.removeExtra("act");
    }

    void checkAct() {
        js("window.sevkCheckAct&&window.sevkCheckAct()");
    }

    @Override
    protected void onResume() {
        super.onResume();
        visible = true;
        BubbleService.appVisible(true);
        if (prefs.getBoolean("bubble", false)) {
            if (BubbleService.canDraw(this)) BubbleService.start(this);
        }
        js("window.sevkOnResume&&window.sevkOnResume()");
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else moveTaskToBack(true);
    }

    @Override
    protected void onPause() {
        super.onPause();
        visible = false;
        BubbleService.appVisible(false);
        // Uygulamadan çıkarken bekleyen yedeği hemen al
        web.evaluateJavascript("window.sevkFlushBackup&&window.sevkFlushBackup()", null);
    }

    boolean has(String p) {
        return checkSelfPermission(p) == PackageManager.PERMISSION_GRANTED;
    }

    void toast(String m) {
        runOnUiThread(() -> Toast.makeText(this, m, Toast.LENGTH_SHORT).show());
    }

    void js(String code) {
        runOnUiThread(() -> web.evaluateJavascript(code, null));
    }

    void openExternal(Uri u) {
        try {
            Intent i = new Intent(Intent.ACTION_VIEW, u);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(i);
        } catch (ActivityNotFoundException e) {
            toast("Açılamadı");
        }
    }

    File slot(String name) {
        return new File(getCacheDir(), "slot_" + name.replaceAll("[^a-z]", "") + ".bin");
    }

    @Override
    public void onRequestPermissionsResult(int rc, String[] perms, int[] res) {
        super.onRequestPermissionsResult(rc, perms, res);
        if (rc == RC_WEBPERM && pendingWebPerm != null) {
            List<String> ok = new ArrayList<>();
            for (String r : pendingWebPerm.getResources()) {
                if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(r) && has(MIC)) ok.add(r);
                if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(r) && has(CAM)) ok.add(r);
            }
            if (ok.isEmpty()) pendingWebPerm.deny();
            else pendingWebPerm.grant(ok.toArray(new String[0]));
            pendingWebPerm = null;
        } else if (rc == RC_CAMFILE) {
            if (has(CAM)) openCamera();
            else if (fileCb != null) {
                fileCb.onReceiveValue(null);
                fileCb = null;
            }
        }
    }

    void openCamera() {
        try {
            File f = new File(getCacheDir(), "cam_" + System.currentTimeMillis() + ".jpg");
            camUri = FileProvider.getUriForFile(this, AUTH, f);
            Intent i = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            i.putExtra(MediaStore.EXTRA_OUTPUT, camUri);
            i.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(i, RC_FILE);
        } catch (Exception e) {
            camUri = null;
            if (fileCb != null) {
                fileCb.onReceiveValue(null);
                fileCb = null;
            }
            toast("Kamera açılamadı");
        }
    }

    void startSave(String name, String mime) {
        runOnUiThread(() -> {
            try {
                Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType(mime == null || mime.isEmpty() ? "application/octet-stream" : mime);
                i.putExtra(Intent.EXTRA_TITLE, name);
                saveSlot = "file";
                startActivityForResult(i, RC_SAVE);
            } catch (Exception e) {
                toast("Kaydetme penceresi açılamadı");
            }
        });
    }

    @Override
    protected void onActivityResult(int rc, int res, Intent data) {
        super.onActivityResult(rc, res, data);
        if (rc == RC_FILE) {
            if (fileCb == null) return;
            Uri[] out = null;
            if (res == RESULT_OK) {
                if (data != null && data.getClipData() != null) {
                    int n = data.getClipData().getItemCount();
                    out = new Uri[n];
                    for (int k = 0; k < n; k++) out[k] = data.getClipData().getItemAt(k).getUri();
                } else if (data != null && data.getData() != null) out = new Uri[]{data.getData()};
                else if (camUri != null) out = new Uri[]{camUri};
            }
            fileCb.onReceiveValue(out);
            fileCb = null;
            camUri = null;
            return;
        }
        if (rc == RC_SAVE) {
            if (res != RESULT_OK || data == null || data.getData() == null) return;
            final Uri u = data.getData();
            final File src = slot(saveSlot == null ? "file" : saveSlot);
            new Thread(() -> {
                boolean ok = copy(src, u);
                toast(ok ? "Kaydedildi" : "Kaydedilemedi");
            }).start();
            return;
        }
        if (rc == RC_MEDIA) {
            if (res == RESULT_OK && data != null && data.getData() != null) {
                Uri u = data.getData();
                try {
                    getContentResolver().takePersistableUriPermission(u, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                } catch (Exception ignored) {
                }
                prefs.edit().putString("mediaTree", u.toString()).apply();
                synchronized (dirCache) {
                    dirCache.clear();
                }
                js("window.onMediaPicked&&window.onMediaPicked(true)");
            } else js("window.onMediaPicked&&window.onMediaPicked(false)");
            return;
        }
        if (rc == RC_DRIVE) {
            if (res == RESULT_OK && data != null && data.getData() != null) {
                Uri u = data.getData();
                try {
                    getContentResolver().takePersistableUriPermission(u, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                } catch (Exception ignored) {
                }
                prefs.edit().putString("driveDoc", u.toString()).apply();
                js("window.onDrivePicked&&window.onDrivePicked()");
            } else js("window.onDrivePicked&&window.onDrivePicked(false)");
        }
    }

    boolean copy(File src, Uri dst) {
        try (InputStream is = new FileInputStream(src); OutputStream os = getContentResolver().openOutputStream(dst, "wt")) {
            if (os == null) return false;
            byte[] b = new byte[65536];
            int n;
            while ((n = is.read(b)) > 0) os.write(b, 0, n);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    Uri driveDoc() {
        String s = prefs.getString("driveDoc", null);
        return s == null ? null : Uri.parse(s);
    }

    // ---------- fotoğraf ve imzalar: kullanıcının seçtiği telefon klasörü ----------
    DocumentFile mediaRoot() {
        String s = prefs.getString("mediaTree", null);
        if (s == null) return null;
        try {
            DocumentFile r = DocumentFile.fromTreeUri(this, Uri.parse(s));
            return r != null && r.canWrite() ? r : null;
        } catch (Exception e) {
            return null;
        }
    }

    DocumentFile mediaDir(String dir, boolean create) {
        synchronized (dirCache) {
            DocumentFile d = dirCache.get(dir);
            if (d != null && d.exists()) return d;
            DocumentFile root = mediaRoot();
            if (root == null) return null;
            if (dirCache.isEmpty()) { // ilk kullanımda tüm alt klasörleri bir kerede listele (hızlı)
                for (DocumentFile f : root.listFiles()) if (f.isDirectory() && f.getName() != null) dirCache.put(f.getName(), f);
                d = dirCache.get(dir);
                if (d != null) return d;
            }
            if (!create) return null;
            d = root.createDirectory(dir);
            if (d != null) dirCache.put(dir, d);
            return d;
        }
    }

    static String mimeOf(String name) {
        String n = name.toLowerCase();
        if (n.endsWith(".png")) return "image/png";
        if (n.endsWith(".webp")) return "image/webp";
        return "image/jpeg";
    }

    class Bridge {
        @JavascriptInterface
        public String takeAct() {
            String a = pendingAct;
            pendingAct = null;
            return a == null ? "" : a;
        }

        // ---------- fotoğraf / imza klasörü ----------
        @JavascriptInterface
        public void mediaPick() {
            runOnUiThread(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
                    i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
                    startActivityForResult(i, RC_MEDIA);
                } catch (Exception e) {
                    toast("Klasör seçici açılamadı");
                }
            });
        }

        @JavascriptInterface
        public boolean mediaLinked() {
            return mediaRoot() != null;
        }

        @JavascriptInterface
        public String mediaName() {
            DocumentFile r = mediaRoot();
            if (r == null) return "";
            String n = r.getName();
            try {
                String id = android.provider.DocumentsContract.getTreeDocumentId(r.getUri());
                if (id != null && id.contains(":")) {
                    String vol = id.substring(0, id.indexOf(':')), path = id.substring(id.indexOf(':') + 1);
                    return ("primary".equals(vol) ? "Telefon hafızası" : "SD kart") + " / " + (path.isEmpty() ? "" : path);
                }
            } catch (Exception ignored) {
            }
            return n == null ? "Seçilen klasör" : n;
        }

        @JavascriptInterface
        public void mediaForget() {
            String s = prefs.getString("mediaTree", null);
            if (s != null) try {
                getContentResolver().releasePersistableUriPermission(Uri.parse(s), Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            } catch (Exception ignored) {
            }
            prefs.edit().remove("mediaTree").apply();
            synchronized (dirCache) {
                dirCache.clear();
            }
        }

        /** dir/name dosyasını yazar (varsa üzerine). Yazılan bayt sayısını döndürür (0 = hata). */
        @JavascriptInterface
        public int mediaWrite(String dir, String name, String b64) {
            try {
                byte[] b = Base64.decode(b64, Base64.DEFAULT);
                DocumentFile d = mediaDir(dir, true);
                if (d == null) return 0;
                DocumentFile f = d.findFile(name);
                if (f == null) f = d.createFile(mimeOf(name), name);
                if (f == null) return 0;
                try (OutputStream os = getContentResolver().openOutputStream(f.getUri(), "wt")) {
                    if (os == null) return 0;
                    os.write(b);
                }
                return b.length;
            } catch (Exception e) {
                return 0;
            }
        }

        /** dir/name dosyasını base64 olarak okur ("" = yok). */
        @JavascriptInterface
        public String mediaRead(String dir, String name) {
            try {
                DocumentFile d = mediaDir(dir, false);
                if (d == null) return "";
                DocumentFile f = d.findFile(name);
                if (f == null) return "";
                try (InputStream is = getContentResolver().openInputStream(f.getUri())) {
                    java.io.ByteArrayOutputStream bo = new java.io.ByteArrayOutputStream();
                    byte[] b = new byte[65536];
                    int n;
                    while ((n = is.read(b)) > 0) bo.write(b, 0, n);
                    return Base64.encodeToString(bo.toByteArray(), Base64.NO_WRAP);
                }
            } catch (Exception e) {
                return "";
            }
        }

        @JavascriptInterface
        public boolean mediaDelete(String dir, String name) {
            try {
                DocumentFile d = mediaDir(dir, false);
                if (d == null) return false;
                if (name == null || name.isEmpty()) {
                    boolean ok = d.delete();
                    synchronized (dirCache) {
                        dirCache.remove(dir);
                    }
                    return ok;
                }
                DocumentFile f = d.findFile(name);
                return f != null && f.delete();
            } catch (Exception e) {
                return false;
            }
        }

        // ---------- ana ekran kısayolları ----------
        @JavascriptInterface
        public boolean bubbleOn() {
            return prefs.getBoolean("bubble", false) && BubbleService.canDraw(MainActivity.this);
        }

        @JavascriptInterface
        public void bubbleSet(boolean on) {
            prefs.edit().putBoolean("bubble", on).apply();
            runOnUiThread(() -> {
                if (!on) {
                    BubbleService.stop(MainActivity.this);
                    return;
                }
                if (BubbleService.canDraw(MainActivity.this)) {
                    BubbleService.start(MainActivity.this);
                    toast("Kısayollar uygulamadan çıkınca ekranda görünür");
                } else {
                    toast("\"Diğer uygulamaların üzerinde göster\" iznini aç, sonra geri dön");
                    try {
                        startActivity(new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName())));
                    } catch (Exception ignored) {
                    }
                }
            });
        }

        @JavascriptInterface
        public boolean addWidget() {
            try {
                android.appwidget.AppWidgetManager m = getSystemService(android.appwidget.AppWidgetManager.class);
                return m != null && m.isRequestPinAppWidgetSupported() && m.requestPinAppWidget(new android.content.ComponentName(MainActivity.this, QuickWidget.class), null, null);
            } catch (Exception e) {
                return false;
            }
        }

        @JavascriptInterface
        public boolean addShortcut(String act) {
            try {
                android.content.pm.ShortcutManager sm = getSystemService(android.content.pm.ShortcutManager.class);
                if (sm == null || !sm.isRequestPinShortcutSupported()) return false;
                boolean voice = "voice".equals(act);
                android.content.pm.ShortcutInfo si = new android.content.pm.ShortcutInfo.Builder(MainActivity.this, voice ? "sc_voice" : "sc_new")
                        .setShortLabel(voice ? "Sesli sevkiyat" : "Yeni sevkiyat")
                        .setLongLabel(voice ? "Sesli asistanla yeni sevkiyat" : "Yeni sevkiyat gir")
                        .setIcon(android.graphics.drawable.Icon.createWithResource(MainActivity.this, voice ? R.drawable.sc_voice : R.drawable.sc_new))
                        .setIntent(QuickWidget.actIntent(MainActivity.this, voice ? "voice" : "new"))
                        .build();
                return sm.requestPinShortcut(si, null);
            } catch (Exception e) {
                return false;
            }
        }

        /** Yeni bir dosya hazırlığına başla (slot: file / share / drive). */
        @JavascriptInterface
        public boolean begin(String slot) {
            try {
                new FileOutputStream(slot(slot)).close();
                return true;
            } catch (Exception e) {
                return false;
            }
        }

        /** Base64 parçayı dosyanın sonuna ekle. */
        @JavascriptInterface
        public boolean append(String slot, String b64) {
            try (OutputStream os = new FileOutputStream(slot(slot), true)) {
                os.write(Base64.decode(b64, Base64.DEFAULT));
                return true;
            } catch (Exception e) {
                return false;
            }
        }

        /** Hazırlanan dosyayı Android paylaş menüsüyle gönder (WhatsApp vb.). */
        @JavascriptInterface
        public void share(String name, String mime, String text) {
            try {
                File dir = new File(getCacheDir(), "share");
                dir.mkdirs();
                File[] old = dir.listFiles();
                if (old != null) for (File f : old) f.delete();
                File f = new File(dir, name.replaceAll("[\\\\/:*?\"<>|]", "-"));
                try (InputStream is = new FileInputStream(slot("share")); OutputStream os = new FileOutputStream(f)) {
                    byte[] b = new byte[65536];
                    int n;
                    while ((n = is.read(b)) > 0) os.write(b, 0, n);
                }
                Uri u = FileProvider.getUriForFile(MainActivity.this, AUTH, f);
                Intent i = new Intent(Intent.ACTION_SEND);
                i.setType(mime);
                i.putExtra(Intent.EXTRA_STREAM, u);
                if (text != null && !text.isEmpty()) i.putExtra(Intent.EXTRA_TEXT, text);
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                Intent ch = Intent.createChooser(i, "Paylaş");
                ch.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                runOnUiThread(() -> startActivity(ch));
            } catch (Exception e) {
                toast("Paylaşılamadı");
            }
        }

        /** Hazırlanan dosyayı "Farklı kaydet" penceresiyle kaydet. */
        @JavascriptInterface
        public void saveAs(String name, String mime) {
            startSave(name, mime);
        }

        // ---------- Google Drive yedeği ----------
        @JavascriptInterface
        public void drivePick() {
            runOnUiThread(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                    i.addCategory(Intent.CATEGORY_OPENABLE);
                    i.setType("application/json");
                    i.putExtra(Intent.EXTRA_TITLE, "Sevkiyat-yedek.json");
                    i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
                    startActivityForResult(i, RC_DRIVE);
                } catch (Exception e) {
                    toast("Dosya seçici açılamadı");
                }
            });
        }

        @JavascriptInterface
        public boolean driveLinked() {
            return driveDoc() != null;
        }

        @JavascriptInterface
        public String driveName() {
            Uri u = driveDoc();
            if (u == null) return "";
            String n = null, where = "";
            try (Cursor c = getContentResolver().query(u, new String[]{OpenableColumns.DISPLAY_NAME}, null, null, null)) {
                if (c != null && c.moveToFirst()) n = c.getString(0);
            } catch (Exception ignored) {
            }
            String a = u.getAuthority() == null ? "" : u.getAuthority();
            if (a.contains("google.android.apps.docs")) where = "Google Drive";
            else if (a.contains("externalstorage") || a.contains("media")) where = "Telefon";
            return (where.isEmpty() ? "" : where + " · ") + (n == null ? "yedek dosyası" : n);
        }

        @JavascriptInterface
        public void driveForget() {
            Uri u = driveDoc();
            if (u != null) try {
                getContentResolver().releasePersistableUriPermission(u, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            } catch (Exception ignored) {
            }
            prefs.edit().remove("driveDoc").apply();
        }

        /** "drive" slotundaki yedeği seçilen Drive dosyasının üzerine yazar; bitince window.onDriveDone(ok, hata). */
        @JavascriptInterface
        public boolean driveWrite() {
            final Uri u = driveDoc();
            if (u == null || driveBusy) return false;
            driveBusy = true;
            new Thread(() -> {
                String err = "";
                if (!copy(slot("drive"), u)) err = "Drive dosyasına yazılamadı — konumu yeniden seç";
                driveBusy = false;
                js("window.onDriveDone&&window.onDriveDone(" + err.isEmpty() + "," + JSONObject.quote(err) + ")");
            }).start();
            return true;
        }
    }
}
