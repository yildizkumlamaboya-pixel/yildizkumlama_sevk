package com.yildiz.sevkiyat;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.provider.Settings;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

/** Her ekranda duran kayan kısayollar: yeni sevkiyat ve sesli asistan. */
public class BubbleService extends Service {
    static final String CH = "kisayol";
    static volatile BubbleService inst;
    WindowManager wm;
    LinearLayout box;
    WindowManager.LayoutParams lp;

    static boolean canDraw(Context c) {
        return Build.VERSION.SDK_INT < 23 || Settings.canDrawOverlays(c);
    }

    static void start(Context c) {
        if (!canDraw(c)) return;
        BubbleService s = inst;
        if (s != null && s.box != null) return;
        Intent i = new Intent(c, BubbleService.class);
        try {
            if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(i);
            else c.startService(i);
        } catch (Exception ignored) {
        }
    }

    static void stop(Context c) {
        c.stopService(new Intent(c, BubbleService.class));
    }

    /** Uygulama ekrandayken düğmeleri gizle. */
    static void appVisible(boolean v) {
        BubbleService s = inst;
        if (s != null && s.box != null) s.box.post(() -> s.box.setVisibility(v ? View.GONE : View.VISIBLE));
    }

    int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startFg();
        if (box == null) {
            if (!canDraw(this)) {
                stopSelf();
                return START_NOT_STICKY;
            }
            show();
        }
        inst = this;
        appVisible(MainActivity.visible);
        // bildirim ekranda kalmasın: düğmeler durdukça servis çalışır
        try {
            if (Build.VERSION.SDK_INT >= 24) stopForeground(STOP_FOREGROUND_REMOVE);
            else stopForeground(true);
        } catch (Exception ignored) {
        }
        return START_STICKY;
    }

    void startFg() {
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (Build.VERSION.SDK_INT >= 26) nm.createNotificationChannel(new NotificationChannel(CH, "Kayan kısayollar", NotificationManager.IMPORTANCE_MIN));
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(this, CH) : new Notification.Builder(this);
        b.setSmallIcon(R.drawable.ic_stat).setContentTitle("Sevkiyat kısayolları").setOngoing(true);
        try {
            if (Build.VERSION.SDK_INT >= 34) startForeground(9, b.build(), ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
            else startForeground(9, b.build());
        } catch (Exception ignored) {
        }
    }

    ImageView btn(int icon, String act, String desc) {
        ImageView v = new ImageView(this);
        v.setImageResource(icon);
        v.setElevation(dp(6));
        v.setContentDescription(desc);
        v.setTag(act);
        return v;
    }

    void show() {
        wm = (WindowManager) getSystemService(WINDOW_SERVICE);
        box = new LinearLayout(this);
        box.setOrientation(LinearLayout.VERTICAL);
        box.setPadding(dp(4), dp(4), dp(4), dp(4));
        ImageView nw = btn(R.drawable.sc_new, "new", "Yeni sevkiyat"), vc = btn(R.drawable.sc_voice, "voice", "Sesli asistanla yeni sevkiyat");
        LinearLayout.LayoutParams a = new LinearLayout.LayoutParams(dp(54), dp(54));
        LinearLayout.LayoutParams b2 = new LinearLayout.LayoutParams(dp(54), dp(54));
        b2.topMargin = dp(10);
        box.addView(nw, a);
        box.addView(vc, b2);
        final SharedPreferences pr = getSharedPreferences("app", MODE_PRIVATE);
        DisplayMetrics dm = getResources().getDisplayMetrics();
        lp = new WindowManager.LayoutParams(WindowManager.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT,
                Build.VERSION.SDK_INT >= 26 ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY : WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, PixelFormat.TRANSLUCENT);
        lp.gravity = Gravity.TOP | Gravity.START;
        lp.x = pr.getInt("bx", dm.widthPixels - dp(62));
        lp.y = pr.getInt("by", dm.heightPixels / 2);
        View.OnTouchListener drag = new View.OnTouchListener() {
            float sx, sy;
            int ox, oy;
            boolean moved;
            long down;

            @Override
            public boolean onTouch(View v, MotionEvent e) {
                switch (e.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        sx = e.getRawX();
                        sy = e.getRawY();
                        ox = lp.x;
                        oy = lp.y;
                        moved = false;
                        down = System.currentTimeMillis();
                        v.setAlpha(.8f);
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        float dx = e.getRawX() - sx, dy = e.getRawY() - sy;
                        if (Math.abs(dx) > dp(8) || Math.abs(dy) > dp(8)) moved = true;
                        if (moved) {
                            lp.x = ox + Math.round(dx);
                            lp.y = oy + Math.round(dy);
                            try {
                                wm.updateViewLayout(box, lp);
                            } catch (Exception ignored) {
                            }
                        }
                        return true;
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        v.setAlpha(1f);
                        if (moved) {
                            int w = getResources().getDisplayMetrics().widthPixels;
                            lp.x = lp.x + box.getWidth() / 2 < w / 2 ? 0 : w - box.getWidth();
                            try {
                                wm.updateViewLayout(box, lp);
                            } catch (Exception ignored) {
                            }
                            pr.edit().putInt("bx", lp.x).putInt("by", lp.y).apply();
                        } else if (e.getActionMasked() == MotionEvent.ACTION_UP) {
                            if (System.currentTimeMillis() - down > 800) {
                                Toast.makeText(BubbleService.this, "Kayan düğmeler kapatıldı (uygulamadan tekrar açabilirsin)", Toast.LENGTH_LONG).show();
                                pr.edit().putBoolean("bubble", false).apply();
                                stopSelf();
                            } else {
                                try {
                                    startActivity(QuickWidget.actIntent(BubbleService.this, (String) v.getTag()));
                                } catch (Exception ignored) {
                                }
                            }
                        }
                        return true;
                }
                return false;
            }
        };
        nw.setOnTouchListener(drag);
        vc.setOnTouchListener(drag);
        wm.addView(box, lp);
    }

    @Override
    public void onDestroy() {
        try {
            if (box != null) wm.removeView(box);
        } catch (Exception ignored) {
        }
        box = null;
        inst = null;
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent i) {
        return null;
    }
}
