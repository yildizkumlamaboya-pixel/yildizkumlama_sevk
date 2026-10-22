const STAR_IMG = './star.png';
const LOGO_H = './logo-h.jpg';
/* ============================== helpers ============================== */
function h(tag, attrs, children) {
  attrs = attrs || {}; children = children || [];
  const e = document.createElement(tag);
  for (const k in attrs) {
    const v = attrs[k];
    if (v == null) continue;
    if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
    else if (k.indexOf('on') === 0 && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'html') e.innerHTML = v;
    else if (k in e) { try { e[k] = v; } catch (_) { e.setAttribute(k, v); } }
    else e.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null || c === false) return;
    if (typeof c === 'string' || typeof c === 'number') e.appendChild(document.createTextNode(String(c)));
    else e.appendChild(c);
  });
  return e;
}
function icon(svgInner, size) {
  size = size || 16;
  const span = document.createElement('span');
  span.style.display = 'inline-flex'; span.style.width = size + 'px'; span.style.height = size + 'px'; span.style.flex = '0 0 auto';
  span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + svgInner + '</svg>';
  return span;
}
const ICONS = {
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 9"/>',
  whatsapp: '<path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.4L3 21z"/><path d="M9 9.5c.3 2.4 2.6 4.6 5.5 5.5l1.2-1.3-2-1-1 .7c-.8-.4-1.7-1.3-2.1-2.1l.7-1-1-2L9 9.5z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
  speaker: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  speakeroff: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"/>',
  truck: '<path d="M14 18V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1"/><path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  x: '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
  back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  refresh: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',
  edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  filedown: '<path d="M12 15V3"/><path d="m7 10 5 5 5-5"/><path d="M20 21H4"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.4-4-8-10-8z"/>',
  package: '<path d="M16.5 9.4 7.5 4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  imageoff: '<line x1="2" y1="2" x2="22" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" y1="13.5" x2="6" y2="21"/><path d="M18 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/><path d="M21 15V6a2 2 0 0 0-2-2H9"/>',
  sheet: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/>',
  drive: '<path d="M22 12h-4l-3 9H8l-3-9H1"/><path d="M5.45 5.11 2 12v0l6 12h8l6-12v0l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/>',
  upload: '<path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M5 21h14"/>',
  uploadcloud: '<path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20.4 18a4.6 4.4 0 0 0-1.9-8.4 6 6 0 1 0-11.4 3.2A4 4 0 0 0 5 21h1"/>',
  warn: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
};
function ic(name, size, color) {
  const s = icon(ICONS[name] || '', size);
  if (color) s.style.color = color;
  return s;
}

function uid() { return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8); }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function formatDateTR(iso) { if (!iso) return ''; const [y, m, d] = iso.split('-'); return d + '.' + m + '.' + y; }
function parseTRDate(str) { const s = String(str || '').trim(); const m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); if (!m) return null; return m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0'); }
function unitLabel(u) { if (u === 'kg') return 'kg'; if (u === 'm2') return 'm²'; if (u === 'ton') return 'ton'; return 'adet'; }
function pdfUnitLabel(u) { if (u === 'kg') return 'kg'; if (u === 'm2') return 'm2'; if (u === 'ton') return 'ton'; return 'adet'; }
function trNormalize(str) { return String(str || '').toLocaleUpperCase('tr-TR'); }
function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
function computeSearchIndex(s) {
  return trNormalize([s.company, s.plate, s.driver, s.driverPhone].filter(Boolean).join(' '));
}
function reindexSearch(list) { list.forEach((s) => { s._searchIdx = computeSearchIndex(s); }); return list; }

function compressImage(file, maxDim, quality) {
  maxDim = maxDim || 1400; quality = quality || 0.75;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = Math.round((height * maxDim) / width); width = maxDim; }
        else if (height > maxDim) { width = Math.round((width * maxDim) / height); height = maxDim; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject; img.src = e.target.result;
    };
    reader.onerror = reject; reader.readAsDataURL(file);
  });
}
const PH_IMG = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="14" fill="#EEF2F7"/><rect x="72" y="46" width="56" height="96" rx="10" fill="none" stroke="#94A3B8" stroke-width="7"/><circle cx="100" cy="128" r="5" fill="#94A3B8"/><text x="100" y="178" font-family="sans-serif" font-size="21" font-weight="700" text-anchor="middle" fill="#64748B">Telefonda</text></svg>');
const isDevRef = (x) => typeof x === 'string' && x.indexOf('dev:') === 0;
function devSrc(x) { return isDevRef(x) ? PH_IMG : x; }
function photoThumb(p) { return devSrc(typeof p === 'string' ? p : p.thumb); }
function photoPdf(p) { return devSrc(typeof p === 'string' ? p : (p.pdf || p.thumb)); }
function photoOriginal(p) { return typeof p === 'string' ? p : (p.original || p.pdf || p.thumb); }

/* ============================== fotoğraf + imzalar telefonda (seçilen klasör) ==============================
   Fotoğraf ve imzalar kullanıcının seçtiği telefon klasörüne dosya olarak yazılır; buluta (Supabase) yalnızca
   "dev:klasör/dosya" adresleri gider. Uygulamada görüntü için cihazdaki kopyası (IndexedDB) kullanılır. */
function mediaOn() { try { return !!(window.SevkNative && window.SevkNative.mediaLinked && window.SevkNative.mediaLinked()); } catch (e) { return false; } }
function devSplit(ref) { const p = ref.slice(4), i = p.lastIndexOf('/'); return [p.slice(0, i), p.slice(i + 1)]; }
function fastKey(str) {
  let hh = 2166136261; const n = str.length, step = Math.max(1, Math.floor(n / 512));
  for (let i = 0; i < n; i += step) { hh ^= str.charCodeAt(i); hh = Math.imul(hh, 16777619); }
  for (let i = Math.max(0, n - 64); i < n; i++) { hh ^= str.charCodeAt(i); hh = Math.imul(hh, 16777619); }
  return n.toString(36) + (hh >>> 0).toString(36);
}
function mediaDirName(r) { return (r.date || todayISO()) + '_' + String(r.seq || 0).padStart(4, '0') + '_' + (String(r.company || 'FIRMA').replace(/[^0-9A-Za-zÇĞİÖŞÜçğıöşü]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'FIRMA'); }
function dataUrlParts(u) { const s = String(u || ''); const c = s.indexOf(','); if (s.slice(0, 5) !== 'data:' || c < 0) return null; const head = s.slice(5, c); if (!/;base64$/.test(head)) return null; return { mime: head.replace(';base64', ''), b64: s.slice(c + 1) }; }
function mediaKeyOf(d) { return isDevRef(d) ? d : fastKey(String(d || '')); }
function mediaSum(r) { return (r.photos || []).map((p) => mediaKeyOf(photoOriginal(p))).join('|') + '#' + (r.signature ? mediaKeyOf(r.signature) : ''); }
function recHasLocalMedia(r) { return (r.photos || []).some((p) => !isDevRef(photoOriginal(p))) || (!!r.signature && !isDevRef(r.signature)); }
/** Kaydın fotoğraf/imzalarını telefondaki klasöre yazar, r.media'ya adresleri koyar. Başarılıysa true. */
function ensureMedia(r) {
  if (!r || !mediaOn()) return false;
  if (!(r.photos || []).length && !r.signature && !r.media) return true;
  const sum = mediaSum(r);
  if (r.media && r.media.sum === sum) return true;
  const old = r.media || {}, dir = old.dir || mediaDirName(r);
  const files = new Set(old.files || []), used = new Set();
  const N = window.SevkNative;
  const put = (data, prefix) => {
    if (isDevRef(data)) { const sp = devSplit(data); if (sp[0] === dir) used.add(sp[1]); return data; }
    const pp = dataUrlParts(data); if (!pp) return null;
    const ext = pp.mime === 'image/png' ? 'png' : pp.mime === 'image/webp' ? 'webp' : 'jpg';
    const name = prefix + '-' + fastKey(data) + '.' + ext;
    if (!files.has(name)) { if (!(N.mediaWrite(dir, name, pp.b64) > 0)) throw new Error('Telefona yazılamadı'); files.add(name); }
    used.add(name);
    return 'dev:' + dir + '/' + name;
  };
  try {
    const photos = (r.photos || []).map((p) => put(photoOriginal(p), 'foto'));
    if (photos.some((x) => !x)) return false;
    const sig = r.signature ? put(r.signature, 'imza') : null;
    if (r.signature && !sig) return false;
    files.forEach((n) => { if (!used.has(n)) { try { N.mediaDelete(dir, n); } catch (e) {} files.delete(n); } });
    r.media = { dir, photos, sig, files: Array.from(files), sum };
    return true;
  } catch (e) { state.mediaError = e && e.message ? e.message : String(e); return false; }
}
/** Buluta gidecek fotoğraf/imza alanları: klasöre yazılmışsa sadece adresler. */
function rowMedia(r) {
  if (mediaOn() && recHasLocalMedia(r)) ensureMedia(r);
  const m = r.media && r.media.sum === mediaSum(r) ? r.media : null;
  if (m) return { photos: m.photos, sig: m.sig || null };
  return { photos: Array.isArray(r.photos) ? r.photos : [], sig: r.signature || null };
}
/** Buluttan gelen adresli kaydı, cihazdaki eski kopyasındaki görüntülerle eşleştirir. */
function adoptLocalMedia(r, ex) {
  if (!r || !r.media) return r;
  if (ex && ex.media) {
    r.photos = (r.photos || []).map((p) => {
      if (!isDevRef(p)) return p;
      const i = (ex.media.photos || []).indexOf(p);
      return i >= 0 && ex.photos && ex.photos[i] && !isDevRef(photoOriginal(ex.photos[i])) ? ex.photos[i] : p;
    });
    if (isDevRef(r.signature) && ex.media.sig === r.signature && ex.signature && !isDevRef(ex.signature)) r.signature = ex.signature;
    r.media.files = Array.from(new Set((r.media.files || []).concat(ex.media.dir === r.media.dir ? (ex.media.files || []) : [])));
  }
  r.media.sum = mediaSum(r);
  return r;
}
function mediaFromRefs(photos, sig) {
  const refs = (photos || []).filter(isDevRef).concat(isDevRef(sig) ? [sig] : []);
  if (!refs.length) return null;
  const dir = devSplit(refs[0])[0];
  return { dir, photos: (photos || []).slice(), sig: sig || null, files: refs.map((x) => devSplit(x)[1]), sum: '' };
}
/** Adres olarak duran fotoğraf/imzaları telefondaki klasörden okuyup görüntülenebilir yapar. */
let _resolving = false;
async function resolveDeviceMedia() {
  if (_resolving || !mediaOn()) return;
  _resolving = true;
  try {
    const N = window.SevkNative; let changed = 0;
    const read = (ref) => { const sp = devSplit(ref); const b = N.mediaRead(sp[0], sp[1]); if (!b) return ref; const ext = sp[1].split('.').pop(); return 'data:' + (ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg') + ';base64,' + b; };
    for (const r of state.shipments.concat(state.trash)) {
      const need = (r.photos || []).some((p) => isDevRef(photoOriginal(p))) || isDevRef(r.signature);
      if (!need) continue;
      if (!r.media) r.media = mediaFromRefs(r.photos, r.signature);
      r.photos = (r.photos || []).map((p) => (isDevRef(photoOriginal(p)) ? read(photoOriginal(p)) : p));
      if (isDevRef(r.signature)) r.signature = read(r.signature);
      r.media.sum = mediaSum(r);
      try { await dbPutRaw(r); } catch (e) {}
      if (++changed % 5 === 0) { renderSafe(); await new Promise((res) => setTimeout(res, 0)); }
    }
    if (changed) renderSafe();
  } finally { _resolving = false; }
}
/** Klasör seçilince: eski kayıtların fotoğraf/imzalarını telefona yaz, buluttakileri adresle değiştir (Supabase küçülür). */
async function migrateMediaToDevice() {
  if (!mediaOn() || state.mediaMig) return;
  const list = state.shipments.filter(recHasLocalMedia);
  state.mediaMig = { done: 0, total: list.length }; state.mediaError = ''; renderSafe();
  let ok = true;
  for (const r of list) {
    if (!ensureMedia(r)) { ok = false; break; }
    try { await dbPutRaw(r); } catch (e) {}
    if (supabaseClient) { const pushed = await cloudPushShipment(r).catch(() => false); if (pushed === false) ok = false; }
    state.mediaMig.done++;
    if (state.mediaMig.done % 3 === 0) { renderSafe(); await new Promise((res) => setTimeout(res, 0)); }
  }
  if (ok) { try { localStorage.setItem('sevkiyat_media_mig', '1'); } catch (e) {} }
  const n = state.mediaMig.done;
  state.mediaMig = null;
  state.successMsg = ok ? (n ? n + ' kaydın fotoğraf ve imzaları telefona taşındı; bulutta artık sadece yazılar var.' : 'Fotoğraf ve imzalar bundan sonra telefonda saklanacak.') : 'Bazı fotoğraflar taşınamadı: ' + (state.mediaError || 'internet/izin sorunu') + '. Sonra tekrar denenecek.';
  render(); setTimeout(() => { state.successMsg = ''; render(); }, 7000);
}
window.onMediaPicked = function (ok) {
  if (!ok) return;
  try { localStorage.removeItem('sevkiyat_media_mig'); } catch (e) {}
  migrateMediaToDevice();
};
function mediaRemoveRec(r) { try { if (r && r.media && r.media.dir && mediaOn()) window.SevkNative.mediaDelete(r.media.dir, ''); } catch (e) {} }
function photoName(p, idx) { return (typeof p === 'string' ? null : p.name) || ('sevkiyat-foto-' + (idx + 1) + '.jpg'); }

/* ============================== IndexedDB ============================== */
const DB_NAME = 'sevkiyatDB', DB_STORE = 'shipments', QUOTE_STORE = 'quotes', SETTINGS_STORE = 'settings';
let _dbPromise = null;
function openDB() {
  if (_dbPromise) return _dbPromise;
  _dbPromise = openDBRaw();
  _dbPromise.then((db) => { db.onversionchange = () => { try { db.close(); } catch (e) {} _dbPromise = null; }; db.onclose = () => { _dbPromise = null; }; }, () => { _dbPromise = null; });
  return _dbPromise;
}
function openDBRaw() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 3);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(QUOTE_STORE)) db.createObjectStore(QUOTE_STORE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) db.createObjectStore(SETTINGS_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbGetSetting(key) {
  const db = await openDB();
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(SETTINGS_STORE, 'readonly');
      const req = tx.objectStore(SETTINGS_STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(undefined);
    } catch (e) { resolve(undefined); }
  });
}
async function dbSetSetting(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SETTINGS_STORE, 'readwrite');
    tx.objectStore(SETTINGS_STORE).put(value, key);
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
  });
}
async function dbGetAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
let _abTimer = null;
function runScheduledBackup() {
  _abTimer = null;
  if (state.autoBackupBusy) { scheduleAutoBackup(); return; }
  createAutoBackup(todayISO(), true).then((ok) => { if (ok) render(); }).catch(() => {});
}
function scheduleAutoBackup() { // her işlemden birkaç sn sonra (art arda işlemlerde tek yedek) bugünkü yedeği güncelle
  clearTimeout(_abTimer);
  _abTimer = setTimeout(runScheduledBackup, 4000);
}
window.sevkFlushBackup = function () { if (_abTimer) { clearTimeout(_abTimer); runScheduledBackup(); } };
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') window.sevkFlushBackup(); });
async function dbPut(record) {
  setTimeout(scheduleAutoBackup, 0);
  if (record && recHasLocalMedia(record) && mediaOn()) ensureMedia(record);
  return dbPutRaw(record);
}
async function dbPutRaw(record) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(record);
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
  });
}
async function dbDelete(id) {
  setTimeout(scheduleAutoBackup, 0);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).delete(id);
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
  });
}
async function dbReplaceAll(records) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);
    store.clear();
    records.forEach((r) => store.put(r));
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
  });
}
async function dbGetAllQuotes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(QUOTE_STORE, 'readonly');
    const req = tx.objectStore(QUOTE_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
async function dbPutQuote(record) {
  setTimeout(scheduleAutoBackup, 0);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(QUOTE_STORE, 'readwrite');
    tx.objectStore(QUOTE_STORE).put(record);
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
  });
}
async function dbDeleteQuote(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(QUOTE_STORE, 'readwrite');
    tx.objectStore(QUOTE_STORE).delete(id);
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
  });
}
async function dbReplaceAllQuotes(records) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(QUOTE_STORE, 'readwrite');
    const store = tx.objectStore(QUOTE_STORE);
    store.clear();
    records.forEach((r) => store.put(r));
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
  });
}

/* ============================== Supabase cloud sync ============================== */
const SUPABASE_URL = 'https://enrjmcrzjbqxsknnxvkx.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_RCyFDtcJVO1bz6civiZ0ZQ_GC6v41FV';
let supabaseClient = null;
try {
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  }
} catch (e) { supabaseClient = null; }

/* ---- Bekleyen silmeleri yönet ---- */
function savePendingDeletions() {
  try { localStorage.setItem('sevkiyat_pending_deletions', JSON.stringify(state.pendingDeletions)); } catch (e) {}
}
function markDeleted(id) {
  if (state.pendingDeletions.indexOf(id) === -1) { state.pendingDeletions.push(id); savePendingDeletions(); }
}
function unmarkDeleted(id) {
  const i = state.pendingDeletions.indexOf(id);
  if (i >= 0) { state.pendingDeletions.splice(i, 1); savePendingDeletions(); }
}
function savePendingRestores() {
  try { localStorage.setItem('sevkiyat_pending_restores', JSON.stringify(state.pendingRestores)); } catch (e) {}
}
function markRestored(id) { if (state.pendingRestores.indexOf(id) === -1) { state.pendingRestores.push(id); savePendingRestores(); } }
function unmarkRestored(id) { const i = state.pendingRestores.indexOf(id); if (i >= 0) { state.pendingRestores.splice(i, 1); savePendingRestores(); } }

/* ---- app kaydı  ⇄  shipments satırı eşlemesi ---- */
function shipmentToRow(r) {
  const md = rowMedia(r);
  return {
    client_id:    r.id,
    seq:          r.seq || 0,
    date:         r.date || null,
    company:      r.company || '',
    plate:        r.plate || '',
    driver_name:  r.driver || '',
    driver_phone: r.driverPhone || '',
    driver_tc:    r.driverTC || '',
    weight:       r.tonnage ? (parseFloat(r.tonnage) || null) : null,
    unit:         r.tonnageUnit || 'adet',
    details:      r.paintDetails || '',
    signature_url: md.sig,
    photos:       md.photos,
    invoiced:     !!r.invoiced,
    unit_price:   (r.unitPrice  !== undefined && r.unitPrice  !== '' && !isNaN(parseFloat(r.unitPrice)))  ? parseFloat(r.unitPrice)  : null,
    paint_cost:   (r.paintCost  !== undefined && r.paintCost  !== '' && !isNaN(parseFloat(r.paintCost)))  ? parseFloat(r.paintCost)  : null,
    astar_used:   r.astarUsed   || '',
    topcoat_used: r.topcoatUsed || '',
    thinner_used: r.thinnerUsed || '',
    ral_code:     r.ralCode     || '',
    updated_at:   new Date(r.updatedAt || r.createdAt || Date.now()).toISOString(),
  };
}
function rowToShipment(row) {
  const rec = rowToShipment0(row);
  const m = mediaFromRefs(rec.photos, rec.signature);
  if (m) { rec.media = m; m.sum = mediaSum(rec); }
  return rec;
}
function rowToShipment0(row) {
  return {
    id:           row.client_id || ('cloud-' + row.id),
    seq:          row.seq || 0,
    date:         (row.date || '').slice(0, 10),
    company:      row.company || '',
    plate:        row.plate || '',
    driver:       row.driver_name || '',
    driverPhone:  row.driver_phone || '',
    driverTC:     row.driver_tc || '',
    paintDetails: row.details || '',
    signature:    row.signature_url || null,
    tonnage:      row.weight != null ? String(row.weight) : '',
    tonnageUnit:  row.unit || 'adet',
    invoiced:     !!row.invoiced,
    photos:       Array.isArray(row.photos) ? row.photos : [],
    unitPrice:    row.unit_price   != null ? row.unit_price   : '',
    paintCost:    row.paint_cost   != null ? row.paint_cost   : '',
    astarUsed:    row.astar_used   || '',
    topcoatUsed:  row.topcoat_used || '',
    thinnerUsed:  row.thinner_used || '',
    ralCode:      row.ral_code     || '',
    createdAt:    row.created_at ? new Date(row.created_at).getTime() : Date.now(),
    updatedAt:    row.updated_at ? new Date(row.updated_at).getTime() : Date.now(),
  };
}

/* ---- app kaydı  ⇄  quotes satırı eşlemesi ---- */
function quoteToRow(q) {
  return {
    client_id:     q.id,
    quote_no:      (q.company || 'teklif') + '-' + (q.date || ''),
    customer_name: q.company || '',
    total_amount:  q.price ? (parseFloat(q.price) || null) : null,
    details:       q,
    updated_at:    new Date(q.updatedAt || q.createdAt || Date.now()).toISOString(),
  };
}
function rowToQuote(row) {
  const d = row.details || {};
  return Object.assign({}, d, {
    id:        row.client_id || d.id || ('cloud-' + row.id),
    updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : (d.updatedAt || Date.now()),
  });
}

/* ---- tek kayıt CRUD ---- */
async function cloudPushShipment(record) {
  if (!supabaseClient) return false;
  try {
    const { error } = await supabaseClient.from('shipments')
      .upsert(shipmentToRow(record), { onConflict: 'client_id' });
    if (error) { state.cloudLastError = error.message; return false; }
    return true;
  } catch (e) { state.cloudLastError = String(e && e.message || e); return false; }
}
async function cloudDeleteShipment(id) {
  if (!supabaseClient) return false;
  try {
    // Gerçek DELETE yerine "tombstone" bırakıyoruz: kayıt buluttan tamamen
    // silinmez, deleted_at damgalanır. Böylece kaydı hâlâ açık tutan başka
    // bir cihaz senkronize olduğunda onu "silinmiş" olarak görüp kendi
    // yerel kopyasını da temizler; aksi halde o cihaz kaydı geri yükleyip
    // buluta tekrar gönderebilirdi.
    const { error } = await supabaseClient.from('shipments')
      .update({ deleted_at: new Date().toISOString() }).eq('client_id', id);
    if (error) { state.cloudLastError = error.message; return false; }
    return true;
  } catch (e) { state.cloudLastError = String(e && e.message || e); return false; }
}
async function cloudRestoreShipment(record) {
  // Çöp kutusundan geri alınan kayıt: sunucudaki "silindi" damgasını (deleted_at) temizler.
  if (!supabaseClient) return false;
  try {
    const row = Object.assign(shipmentToRow(record), { deleted_at: null });
    const { error } = await supabaseClient.from('shipments').upsert(row, { onConflict: 'client_id' });
    if (error) { state.cloudLastError = error.message; return false; }
    return true;
  } catch (e) { state.cloudLastError = String(e && e.message || e); return false; }
}
async function flushPendingCloud() {
  if (state.pendingRestores.length) {
    for (const id of state.pendingRestores.slice()) {
      const rec = state.shipments.find((x) => x.id === id);
      if (!rec) { unmarkRestored(id); continue; }
      if (await cloudRestoreShipment(rec)) unmarkRestored(id);
    }
  }
  if (state.pendingDeletions.length) {
    const stillPending = [];
    for (const id of state.pendingDeletions.slice()) {
      const [sOk, qOk] = await Promise.all([cloudDeleteShipment(id), cloudDeleteQuote(id)]);
      if (!sOk && !qOk) stillPending.push(id);
    }
    state.pendingDeletions = stillPending;
    savePendingDeletions();
  }
}
async function cloudPushQuote(record) {
  if (!supabaseClient) return false;
  try {
    const { error } = await supabaseClient.from('quotes')
      .upsert(quoteToRow(record), { onConflict: 'client_id' });
    if (error) { state.cloudLastError = error.message; return false; }
    return true;
  } catch (e) { state.cloudLastError = String(e && e.message || e); return false; }
}
async function cloudDeleteQuote(id) {
  if (!supabaseClient) return false;
  try {
    const { error } = await supabaseClient.from('quotes')
      .update({ deleted_at: new Date().toISOString() }).eq('client_id', id);
    if (error) { state.cloudLastError = error.message; return false; }
    return true;
  } catch (e) { state.cloudLastError = String(e && e.message || e); return false; }
}

/* ---- toplu çek / gönder ---- */
async function cloudPullAll() {
  const empty = { shipments: [], shipmentMeta: [], quotes: [], deletedShipmentIds: [], deletedQuoteIds: [], ok: false };
  if (!supabaseClient) return empty;
  try {
    const [sRes, qRes, sDelRes, qDelRes] = await Promise.all([
      supabaseClient.from('shipments').select('client_id,updated_at').is('deleted_at', null),
      supabaseClient.from('quotes').select('*').is('deleted_at', null),
      supabaseClient.from('shipments').select('client_id').not('deleted_at', 'is', null),
      supabaseClient.from('quotes').select('client_id').not('deleted_at', 'is', null),
    ]);
    if (sRes.error) { state.cloudLastError = sRes.error.message; return empty; }
    if (qRes.error) { state.cloudLastError = qRes.error.message; return empty; }
    if (sDelRes.error) { state.cloudLastError = sDelRes.error.message; return empty; }
    if (qDelRes.error) { state.cloudLastError = qDelRes.error.message; return empty; }
    return {
      shipments: [],
      shipmentMeta: (sRes.data || []).map((r) => ({ id: r.client_id, updatedAt: r.updated_at ? new Date(r.updated_at).getTime() : 0 })),
      quotes:    (qRes.data || []).map(rowToQuote),
      deletedShipmentIds: (sDelRes.data || []).map((r) => r.client_id),
      deletedQuoteIds:    (qDelRes.data || []).map((r) => r.client_id),
      ok: true,
    };
  } catch (e) { state.cloudLastError = String(e && e.message || e); return empty; }
}
async function cloudFetchShipments(ids) {
  // Yalnızca gerçekten yeni/eksik olan kayıtların tam satırını (fotoğraf+imza dahil) indirir.
  const out = [];
  if (!supabaseClient) return null;
  try {
    for (let i = 0; i < ids.length; i += 4) {
      const { data, error } = await supabaseClient.from('shipments').select('*').in('client_id', ids.slice(i, i + 4));
      if (error) { state.cloudLastError = error.message; return null; }
      (data || []).forEach((r) => out.push(rowToShipment(r)));
    }
    return out;
  } catch (e) { state.cloudLastError = String(e && e.message || e); return null; }
}
async function cloudPushAll(shipments, quotes) {
  if (!supabaseClient) return false;
  const chunk = 25;
  try {
    for (let i = 0; i < shipments.length; i += chunk) {
      const rows = shipments.slice(i, i + chunk).map(shipmentToRow);
      const { error } = await supabaseClient.from('shipments').upsert(rows, { onConflict: 'client_id' });
      if (error) { state.cloudLastError = error.message; return false; }
    }
    for (let i = 0; i < quotes.length; i += chunk) {
      const rows = quotes.slice(i, i + chunk).map(quoteToRow);
      const { error } = await supabaseClient.from('quotes').upsert(rows, { onConflict: 'client_id' });
      if (error) { state.cloudLastError = error.message; return false; }
    }
    return true;
  } catch (e) { state.cloudLastError = String(e && e.message || e); return false; }
}

/* ---- iki yönlü senkronizasyon (silmeler dahil) ---- */
async function syncFromCloud() {
  if (!supabaseClient) return;
  state.cloudSyncing = true; renderSafe();
  try {
    // 0) Önce bekleyen geri alma / silmeleri tekrar dene
    await flushPendingCloud();

    const remote = await cloudPullAll();
    if (!remote.ok) { state.cloudSyncing = false; renderSafe(); return; }

    // 1) Silinmiş sayılacak kayıtlar: (a) bu cihazda silinip henüz buluta
    //    işlenmemiş olanlar + (b) sunucuda başka bir cihaz tarafından
    //    tombstone'lanmış (deleted_at dolu) olanlar. İkincisi sayesinde,
    //    bir kaydı açık tutan başka bir cihaz senkron olduğunda o kaydı
    //    kendi yerelinden de siler ve buluta geri göndermez.
    const deletedSet = new Set(state.pendingDeletions.concat(remote.deletedShipmentIds).filter((id) => state.pendingRestores.indexOf(id) === -1));
    const deletedQuoteSet = new Set(state.pendingDeletions.concat(remote.deletedQuoteIds));

    const localMap = new Map(state.shipments.map((s) => [s.id, s]));
    deletedSet.forEach((id) => localMap.delete(id));
    const trashMap = new Map(state.trash.map((t) => [t.id, t]));
    const needIds = remote.shipmentMeta.filter((m) => {
      if (deletedSet.has(m.id)) return false;
      const tr = trashMap.get(m.id);
      if (tr && m.updatedAt <= (tr.deletedAt || 0)) return false;
      const ex = localMap.get(m.id);
      return !ex || m.updatedAt > (ex.updatedAt || ex.createdAt || 0);
    }).map((m) => m.id);
    const fetched = needIds.length ? await cloudFetchShipments(needIds) : [];
    if (fetched === null) { state.cloudSyncing = false; renderSafe(); return; }
    remote.shipments = fetched;
    remote.shipments.forEach((r) => {
      if (deletedSet.has(r.id)) return;
      const tr = trashMap.get(r.id);
      if (tr) {
        // Çöp kutumuzdaki kayıt başka cihazda geri alınmışsa canlıya al; değilse çöpte kalsın.
        if ((r.updatedAt || 0) > (tr.deletedAt || 0)) trashMap.delete(r.id); else return;
      }
      const existing = localMap.get(r.id);
      const rTs = r.updatedAt || r.createdAt || 0;
      const lTs = existing ? (existing.updatedAt || existing.createdAt || 0) : -1;
      if (!existing || rTs > lTs) localMap.set(r.id, adoptLocalMedia(r, existing));
    });
    const merged = reindexSearch(Array.from(localMap.values())).sort(
      (a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0)
    );
    state.shipments = merged;
    state.trash = Array.from(trashMap.values());
    await dbReplaceAll(merged.concat(state.trash));

    const qMap = new Map(state.quotes.map((q) => [q.id, q]));
    deletedQuoteSet.forEach((id) => qMap.delete(id));
    remote.quotes.forEach((r) => {
      if (deletedQuoteSet.has(r.id)) return;
      const existing = qMap.get(r.id);
      const rTs = r.updatedAt || r.createdAt || 0;
      const lTs = existing ? (existing.updatedAt || existing.createdAt || 0) : -1;
      if (!existing || rTs > lTs) qMap.set(r.id, r);
    });
    const mergedQ = Array.from(qMap.values()).sort(
      (a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0)
    );
    state.quotes = mergedQ;
    await dbReplaceAllQuotes(mergedQ);

    // 2) Yukarı gönderirken silinmesi beklenen/silinmiş kayıtları hariç tut.
    //    (mergedQ ve qMap zaten deletedQuoteSet'e göre temizlendi, ama
    //    burada da açıkça filtreliyoruz.)
    const pushShipments = merged.filter((x) => !deletedSet.has(x.id));
    const pushQuotes = mergedQ.filter((x) => !deletedQuoteSet.has(x.id));
    // Sadece değişenleri gönder (her senkronda tüm fotoğrafları yeniden yüklemek yerine)
    const metaTs = new Map(remote.shipmentMeta.map((m) => [m.id, m.updatedAt]));
    const qTs = new Map(remote.quotes.map((q) => [q.id, q.updatedAt || 0]));
    const changedS = pushShipments.filter((x) => { const t = metaTs.get(x.id); return t === undefined || (x.updatedAt || x.createdAt || 0) > t; });
    const changedQ = pushQuotes.filter((x) => { const t = qTs.get(x.id); return t === undefined || (x.updatedAt || x.createdAt || 0) > t; });
    state.lastSyncStats = { pulled: fetched.length, pushed: changedS.length + changedQ.length };
    if (changedS.length || changedQ.length) await cloudPushAll(changedS, changedQ);

    state.lastSyncAt = Date.now();
    state.cloudLastError = '';
  } catch (e) {
    state.cloudLastError = String(e && e.message || e);
  }
  state.cloudSyncing = false;
  renderSafe();
  mediaAfterSync();
}
function mediaAfterSync() {
  if (!mediaOn()) return;
  resolveDeviceMedia().then(() => {
    let m = ''; try { m = localStorage.getItem('sevkiyat_media_mig') || ''; } catch (e) {}
    if (m !== '1') migrateMediaToDevice();
  }).catch(() => {});
}
function renderSafe() {
  // Arka plan senkronu ekranı yenilerken klavyeyi kapatmasın / formu sıfırlamasın.
  if (state.view === 'form' || state.view === 'paintcalc' || state.pendingCostEdit || state.locked) return;
  if (state.view === 'quotes' && state.uiExpanded.quoteForm) return;
  const ae = document.activeElement;
  if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;
  render();
}
async function pushAllToCloud() {
  if (!supabaseClient) { state.error = 'Bulut bağlantısı kurulamadı (Supabase SDK yüklenemedi).'; render(); return; }
  state.cloudSyncing = true; state.error = ''; render();
  try {
    await flushPendingCloud();
    // Başka bir cihazda silinmiş (sunucuda deleted_at damgalı) kayıtları da
    // hariç tut; yoksa bu tek yönlü "gönder" işlemi o kayıtları geri diriltir.
    const remoteDeleted = await cloudPullAll();
    const remoteDeletedShipments = new Set(remoteDeleted.ok ? remoteDeleted.deletedShipmentIds : []);
    const remoteDeletedQuotes = new Set(remoteDeleted.ok ? remoteDeleted.deletedQuoteIds : []);
    const deletedSet = new Set(state.pendingDeletions.concat([...remoteDeletedShipments]).filter((id) => state.pendingRestores.indexOf(id) === -1));
    const deletedQuoteSet = new Set(state.pendingDeletions.concat([...remoteDeletedQuotes]));
    const pushShipments = state.shipments.filter((x) => !deletedSet.has(x.id));
    const pushQuotes = state.quotes.filter((x) => !deletedQuoteSet.has(x.id));
    // Bu cihazda hâlâ duran ama sunucuda tombstone'lanmış kayıtları yerelden de temizle.
    if (remoteDeletedShipments.size || remoteDeletedQuotes.size) {
      state.shipments = pushShipments;
      state.quotes = pushQuotes;
      await dbReplaceAll(pushShipments.concat(state.trash));
      await dbReplaceAllQuotes(pushQuotes);
    }
    const ok = await cloudPushAll(pushShipments, pushQuotes);
    state.cloudSyncing = false;
    state.lastSyncAt = Date.now();
    if (ok) {
      state.successMsg = '✓ ' + pushShipments.length + ' sevkiyat ve ' + pushQuotes.length + ' teklif buluta yüklendi.'
        + (state.pendingDeletions.length ? ' (' + state.pendingDeletions.length + ' silme hâlâ bekliyor)' : '');
      setTimeout(() => { state.successMsg = ''; render(); }, 6000);
    } else {
      state.error = 'Buluta yüklenemedi' + (state.cloudLastError ? ': ' + state.cloudLastError : '.');
    }
  } catch (e) {
    state.cloudSyncing = false;
    state.error = 'Buluta yüklenemedi: ' + (e && e.message || e);
  }
  render();
}

/* ============================== PDF export ============================== */
function strToBytes(str) { const b = new Uint8Array(str.length); for (let i = 0; i < str.length; i++) b[i] = str.charCodeAt(i) & 0xff; return b; }
function concatBytes(arrays) { let total = 0; arrays.forEach((a) => (total += a.length)); const r = new Uint8Array(total); let p = 0; arrays.forEach((a) => { r.set(a, p); p += a.length; }); return r; }
function dataUrlToBytes(dataUrl) { const base64 = dataUrl.split(',')[1]; const bin = atob(base64); const b = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i); return b; }
function getImageDims(dataUrl) { return new Promise((resolve) => { const img = new Image(); img.onload = () => resolve({ w: img.naturalWidth || 100, h: img.naturalHeight || 100 }); img.onerror = () => resolve({ w: 100, h: 100 }); img.src = dataUrl; }); }
function pngToJpegDataUrl(pngDataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => { const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0); resolve(c.toDataURL('image/jpeg', 0.85)); };
    img.onerror = () => resolve(null); img.src = pngDataUrl;
  });
}
function turkishToAscii(str) {
  const map = { ı: 'i', İ: 'I', ş: 's', Ş: 'S', ğ: 'g', Ğ: 'G', ü: 'u', Ü: 'U', ö: 'o', Ö: 'O', ç: 'c', Ç: 'C' };
  return String(str || '').replace(/[ışŞğĞüÜöÖçÇİ]/g, (c) => map[c] || c);
}
function pdfEscapeText(str) { return turkishToAscii(str).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)'); }
function fitBox(w, h, maxW, maxH) { const scale = Math.min(maxW / w, maxH / h, 1); return { w: w * scale, h: h * scale }; }

const PDF_PAGE_W = 595, PDF_PAGE_H = 842;

async function buildReceiptPageContent(s) {
  const pageW = PDF_PAGE_W, pageH = PDF_PAGE_H, margin = 50;
  const sigJpeg = s.signature && !isDevRef(s.signature) ? await pngToJpegDataUrl(s.signature) : null;
  const sigDims = sigJpeg ? await getImageDims(sigJpeg) : null;
  const photos = (s.photos || []).map(photoPdf);
  const photoDims = await Promise.all(photos.map((p) => getImageDims(p)));

  let y = pageH - 70;
  const lines = [];
  const titleText = 'SEVKIYAT FISI  #' + String(s.seq).padStart(4, '0');
  const titleFontSize = 16;
  const titleWidth = titleText.length * titleFontSize * 0.56;
  const titleX = Math.max(margin, (pageW - titleWidth) / 2);
  const boxTop = pageH - 42, boxBottom = pageH - 84;
  lines.push((margin - 10) + ' ' + boxBottom + ' ' + (pageW - 2 * margin + 20) + ' ' + (boxTop - boxBottom) + ' re S');
  lines.push('BT /F1 ' + titleFontSize + ' Tf ' + titleX + ' ' + ((boxTop + boxBottom) / 2 - 5) + ' Td (' + pdfEscapeText(titleText) + ') Tj ET');
  y = boxBottom - 26;

  const leftRows = [
    ['Sevk Tarihi', formatDateTR(s.date)],
    ['Arac Plakasi', s.plate],
    ['Sofor Adi', s.driver],
    ['Sofor Telefonu', s.driverPhone || '-'],
    ['Sofor TC', s.driverTC || '-'],
  ];
  const rightRows = [
    ['Firma Adi', s.company],
    ['Malzeme Miktari', s.tonnage ? (s.tonnage + ' ' + pdfUnitLabel(s.tonnageUnit)) : '-'],
  ];
  const colGap = 16;
  const colWidth = (pageW - 2 * margin - colGap) / 2;
  const leftLabelX = margin, leftValueX = margin + 90;
  const rightLabelX = margin + colWidth + colGap, rightValueX = rightLabelX + 90;
  const rowH = 20;

  let leftY = y;
  leftRows.forEach(([label, value]) => {
    lines.push('BT /F1 11 Tf ' + leftLabelX + ' ' + leftY + ' Td (' + pdfEscapeText(label + ':') + ') Tj ET');
    lines.push('BT /F1 11 Tf ' + leftValueX + ' ' + leftY + ' Td (' + pdfEscapeText(value) + ') Tj ET');
    leftY -= rowH;
  });

  let rightY = y;
  rightRows.forEach(([label, value]) => {
    lines.push('BT /F1 11 Tf ' + rightLabelX + ' ' + rightY + ' Td (' + pdfEscapeText(label + ':') + ') Tj ET');
    lines.push('BT /F1 11 Tf ' + rightValueX + ' ' + rightY + ' Td (' + pdfEscapeText(value) + ') Tj ET');
    rightY -= rowH;
  });

  if (s.paintDetails) {
    lines.push('BT /F1 11 Tf ' + rightLabelX + ' ' + rightY + ' Td (' + pdfEscapeText('Boya Detaylari:') + ') Tj ET');
    rightY -= 16;
    const maxChars = 34;
    const words = turkishToAscii(s.paintDetails).split(/\s+/);
    let line = ''; const wrapped = [];
    words.forEach((w) => { if ((line + ' ' + w).trim().length > maxChars) { wrapped.push(line.trim()); line = w; } else line = (line + ' ' + w).trim(); });
    if (line.trim()) wrapped.push(line.trim());
    wrapped.slice(0, 3).forEach((ln) => { lines.push('BT /F1 10 Tf ' + rightLabelX + ' ' + rightY + ' Td (' + pdfEscapeText(ln) + ') Tj ET'); rightY -= 14; });
    rightY -= 6;
  }

  const images = []; let imgIndex = 0; const drawCmds = [];
  rightY -= 6;
  lines.push('BT /F1 11 Tf ' + rightLabelX + ' ' + rightY + ' Td (' + pdfEscapeText('Sofor Imzasi:') + ') Tj ET');
  rightY -= 12;
  if (sigJpeg && sigDims) {
    const box = fitBox(sigDims.w, sigDims.h, colWidth, 55);
    const name = 'Im' + (imgIndex++);
    images.push({ name, dataUrl: sigJpeg, naturalW: sigDims.w, naturalH: sigDims.h, w: box.w, h: box.h });
    const drawY = rightY - box.h;
    drawCmds.push('q ' + box.w.toFixed(2) + ' 0 0 ' + box.h.toFixed(2) + ' ' + rightLabelX + ' ' + drawY.toFixed(2) + ' cm /' + name + ' Do Q');
    rightY = drawY - 16;
  } else {
    lines.push('BT /F1 10 Tf ' + rightLabelX + ' ' + rightY + ' Td (' + pdfEscapeText('(imza alinmamis)') + ') Tj ET');
    rightY -= 20;
  }

  y = Math.min(leftY, rightY) - 8;

  lines.push('BT /F1 11 Tf ' + margin + ' ' + y + ' Td (' + pdfEscapeText('Yukleme Gorselleri:') + ') Tj ET');
  y -= 14;

  if (photos.length === 0) {
    lines.push('BT /F1 10 Tf ' + margin + ' ' + y + ' Td (' + pdfEscapeText('(gorsel eklenmemis)') + ') Tj ET');
  } else {
    const bottomMargin = 36, gap = 10, n = photos.length;
    const availableWidth = pageW - 2 * margin;
    const availableHeight = Math.max(y - bottomMargin, 60);

    function planFor(cols) {
      const groups = [];
      for (let i = 0; i < n; i += cols) groups.push(photos.slice(i, i + cols).map((p, idx) => ({ p, dims: photoDims[i + idx] })));
      const heightsUnscaled = groups.map((row) => {
        const sumAspect = row.reduce((acc, item) => acc + (item.dims.w / item.dims.h), 0);
        return (availableWidth - gap * (row.length - 1)) / sumAspect;
      });
      const total = heightsUnscaled.reduce((a, b) => a + b, 0) + gap * (groups.length - 1);
      return { groups, heightsUnscaled, total };
    }

    const cols = Math.ceil(Math.sqrt(n));
    const plan = planFor(cols);
    plan.scale = Math.min(1, availableHeight / plan.total);

    let curY = y;
    plan.groups.forEach((row, rIdx) => {
      const rowHeight = plan.heightsUnscaled[rIdx] * plan.scale;
      let curX = margin;
      row.forEach(({ p, dims }) => {
        const w = (dims.w / dims.h) * rowHeight;
        const name = 'Im' + (imgIndex++);
        images.push({ name, dataUrl: p, naturalW: dims.w, naturalH: dims.h, w, h: rowHeight });
        const drawY = curY - rowHeight;
        drawCmds.push('q ' + w.toFixed(2) + ' 0 0 ' + rowHeight.toFixed(2) + ' ' + curX.toFixed(2) + ' ' + drawY.toFixed(2) + ' cm /' + name + ' Do Q');
        curX += w + gap;
      });
      curY -= rowHeight + gap;
    });
  }
  const contentStr = lines.join('\n') + '\n' + drawCmds.join('\n') + '\n';
  return { contentStr, images };
}

function assemblePDF(pages) {
  const pageW = PDF_PAGE_W, pageH = PDF_PAGE_H;
  const pieces = []; let offset = 0; const objOffsets = {};
  function add(part) { const bytes = typeof part === 'string' ? strToBytes(part) : part; pieces.push(bytes); offset += bytes.length; }
  function startObj(n) { objOffsets[n] = offset; add(n + ' 0 obj\n'); }

  let nextObj = 4;
  const pageObjNum = [], contentObjNum = [];
  const imgObjNumsPerPage = pages.map((pg) => {
    pageObjNum.push(nextObj++); contentObjNum.push(nextObj++);
    const map = {}; pg.images.forEach((im) => { map[im.name] = nextObj++; });
    return map;
  });
  const totalObjs = nextObj - 1;

  add('%PDF-1.4\n');
  add(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));
  startObj(1); add('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  const kids = pageObjNum.map((n) => n + ' 0 R').join(' ');
  startObj(2); add('<< /Type /Pages /Kids [' + kids + '] /Count ' + pages.length + ' >>\nendobj\n');
  startObj(3); add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

  pages.forEach((pg, i) => {
    const xobjEntries = pg.images.map((im) => '/' + im.name + ' ' + imgObjNumsPerPage[i][im.name] + ' 0 R').join(' ');
    startObj(pageObjNum[i]);
    add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pageW + ' ' + pageH + '] /Resources << /Font << /F1 3 0 R >> /XObject << ' + xobjEntries + ' >> >> /Contents ' + contentObjNum[i] + ' 0 R >>\nendobj\n');
    const contentBytes = strToBytes(pg.contentStr);
    startObj(contentObjNum[i]);
    add('<< /Length ' + contentBytes.length + ' >>\nstream\n'); add(contentBytes); add('\nendstream\nendobj\n');
    pg.images.forEach((im) => {
      const n = imgObjNumsPerPage[i][im.name];
      const jpegBytes = dataUrlToBytes(im.dataUrl);
      startObj(n);
      add('<< /Type /XObject /Subtype /Image /Width ' + im.naturalW + ' /Height ' + im.naturalH + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpegBytes.length + ' >>\nstream\n');
      add(jpegBytes); add('\nendstream\nendobj\n');
    });
  });

  const xrefOffset = offset;
  add('xref\n0 ' + (totalObjs + 1) + '\n'); add('0000000000 65535 f \n');
  for (let i = 1; i <= totalObjs; i++) { const off = objOffsets[i] || 0; add(String(off).padStart(10, '0') + ' 00000 n \n'); }
  add('trailer\n<< /Size ' + (totalObjs + 1) + ' /Root 1 0 R >>\nstartxref\n' + xrefOffset + '\n%%EOF');
  return concatBytes(pieces);
}
async function buildReceiptPDF(s) { return assemblePDF([await buildReceiptPageContent(s)]); }
async function buildBulkReceiptPDF(list) { const pages = await Promise.all(list.map(buildReceiptPageContent)); return assemblePDF(pages); }

function wrapTextLines(text, maxChars) {
  const words = turkishToAscii(text).split(/\s+/);
  let line = ''; const wrapped = [];
  words.forEach((w) => { if ((line + ' ' + w).trim().length > maxChars) { wrapped.push(line.trim()); line = w; } else line = (line + ' ' + w).trim(); });
  if (line.trim()) wrapped.push(line.trim());
  return wrapped;
}
function quoteReferenceNo(q) {
  const ym = (q.date || todayISO()).slice(0, 7).replace('-', '/');
  const sameMonth = state.quotes.filter((x) => (x.date || '').slice(0, 7) === (q.date || '').slice(0, 7)).sort((a, b) => a.createdAt - b.createdAt);
  const idx = Math.max(1, sameMonth.findIndex((x) => x.id === q.id) + 1);
  return 'YKB-' + ym + '-' + String(idx).padStart(2, '0');
}
function buildQuotePageContent(q) {
  const pageW = PDF_PAGE_W, pageH = PDF_PAGE_H, margin = 46;
  const lines = [];
  const NAVY = '0.09 0.16 0.33', BLUE = '0.20 0.36 0.62', GRAY = '0.45 0.45 0.48', LGRAY = '0.6 0.6 0.62';
  function text(x, yy, size, color, str, bold) { lines.push('q ' + color + ' rg BT /F1 ' + size + ' Tf ' + x + ' ' + yy + ' Td (' + pdfEscapeText(str) + ') Tj ET Q'); }
  function rightText(yy, size, color, str) { text(pageW - margin - str.length * size * 0.5, yy, size, color, str); }

  let y = pageH - 50;
  text(margin, y, 17, NAVY, 'YILDIZ KUMLAMA BOYA');
  y -= 18;
  text(margin, y, 8.5, GRAY, 'TAAH. NAK. SAN. VE TIC. LTD. STI.');
  y -= 13;
  text(margin, y, 8.5, LGRAY, 'Kemalpasa OSB / Izmir');

  rightText(pageH - 46, 19, BLUE, 'TEKLIF MEKTUBU');
  rightText(pageH - 66, 9, GRAY, 'Tarih: ' + formatDateTR(q.date));
  rightText(pageH - 79, 9, GRAY, 'Teklif No: ' + quoteReferenceNo(q));

  y = pageH - 96;
  lines.push('q ' + NAVY + ' RG 1.2 w ' + margin + ' ' + y + ' m ' + (pageW - margin) + ' ' + y + ' l S Q');
  y -= 26;

  const konu = q.work || 'Yuzey Kumlama & Koruyucu Boya Uygulamasi';
  const konuLines = wrapTextLines(konu, 66);
  const konuBoxH = 16 + konuLines.length * 14;
  lines.push('q 0.93 0.96 0.99 rg ' + margin + ' ' + (y - konuBoxH) + ' ' + (pageW - 2 * margin) + ' ' + konuBoxH + ' re f Q');
  lines.push('q ' + NAVY + ' rg ' + margin + ' ' + (y - konuBoxH) + ' 3 ' + konuBoxH + ' re f Q');
  let ky = y - 16;
  text(margin + 14, ky, 10, NAVY, 'Konu: ' + konuLines[0]);
  konuLines.slice(1).forEach((ln) => { ky -= 14; text(margin + 14, ky, 10, NAVY, ln); });
  y = y - konuBoxH - 24;

  const colX = [margin, margin + 96, margin + 96 + 218, margin + 96 + 218 + 116];
  const colW = [96, 218, 116, pageW - margin - (margin + 96 + 218 + 116)];
  const headH = 30;
  lines.push('q ' + NAVY + ' rg ' + margin + ' ' + (y - headH) + ' ' + (pageW - 2 * margin) + ' ' + headH + ' re f Q');
  const heads = ['HIZMET KALEMI', 'TEKNIK STANDART & UYGULAMA DETAYI', 'BIRIM FIYAT', 'KDV'];
  heads.forEach((hd, i) => text(colX[i] + 8, y - 19, 8, '1 1 1', hd));
  y -= headH;

  const priceText = (q.price !== undefined && q.price !== '' && !isNaN(parseFloat(q.price))) ? formatMoney(parseFloat(q.price)).replace('₺', 'TL') : 'Talep Uzerine';
  const boyaDetail = (q.work ? q.work : 'Proje sartnamesine uygun') + (q.paintThickness ? ' - Astar + Son Kat (' + q.paintThickness + ')' : ' - Astar + Son Kat homojen kaplama');
  const tableRows = [
    { cells: ['Yuzey Temizleme\n(Kumlama)', 'ISO 8501-1 Sa 2 1/2 metal temizlik derecesi, yuksek aderans saglayan puruzlendirme profili', 'Dahil', 'Haric'] },
    { cells: ['Boya Uygulamasi', boyaDetail, priceText, 'Haric'] },
  ];
  tableRows.forEach((row, ri) => {
    const wrapped = row.cells.map((c, ci) => c.split('\n').flatMap((seg) => wrapTextLines(seg, ci === 1 ? 42 : 16)));
    const lineCount = Math.max.apply(null, wrapped.map((w) => w.length));
    const rowH = Math.max(34, lineCount * 13 + 14);
    if (ri % 2 === 1) lines.push('q 0.95 0.96 0.98 rg ' + margin + ' ' + (y - rowH) + ' ' + (pageW - 2 * margin) + ' ' + rowH + ' re f Q');
    wrapped.forEach((cellLines, ci) => {
      let cy = y - 16;
      cellLines.forEach((ln, li) => { text(colX[ci] + 8, cy, ci === 2 ? 9.5 : 8.7, ci === 0 ? NAVY : (ci === 2 ? '0.15 0.35 0.15' : GRAY), ln); cy -= 13; });
    });
    y -= rowH;
    lines.push('q ' + LGRAY + ' RG 0.6 w ' + margin + ' ' + y + ' m ' + (pageW - margin) + ' ' + y + ' l S Q');
  });
  y -= 24;

  text(margin, y, 12, NAVY, 'Kalite ve Uygulama Ayricaliklari');
  y -= 20;
  const bullets = [
    ['Maksimum Korozyon Direnci: ', 'Yuzeyler pas, tufal ve birikintilerden arindirilir; boyanin metale en yuksek gucte tutunmasi saglanarak uzun omurlu korozyon korumasi sunulur.'],
    ['Hassas Mikron ve Film Kontrolu: ', 'Boya katlari, teknik sartnamedeki Kuru Film Kalinligi (DFT) degerlerine tam uyum ve puruzsuz gorunum icin kalibre edilmis olcum cihazlariyla denetlenir.'],
  ];
  bullets.forEach(([lead, rest]) => {
    lines.push('q ' + NAVY + ' rg ' + margin + ' ' + (y - 6) + ' 4 4 re f Q');
    const wrapped = wrapTextLines(rest, 74);
    text(margin + 12, y, 9, NAVY, lead.replace(':', ':'));
    const leadW = lead.length * 4.9;
    text(margin + 12 + leadW, y, 9, GRAY, wrapped[0] || '');
    y -= 13;
    wrapped.slice(1).forEach((ln) => { text(margin + 12, y, 9, GRAY, ln); y -= 13; });
    y -= 8;
  });

  y -= 4;
  const renkText = 'Verilen birim fiyat standart renkler (ornegin RAL 9002, RAL 7016) icin gecerlidir. Farkli renk tercihi durumunda fiyat tekrar degerlendirilecektir.';
  const renkLines = wrapTextLines(renkText, 78);
  const renkBoxH = 14 + renkLines.length * 13;
  lines.push('q 1 0.98 0.90 rg ' + margin + ' ' + (y - renkBoxH) + ' ' + (pageW - 2 * margin) + ' ' + renkBoxH + ' re f Q');
  lines.push('q 0.80 0.55 0.15 rg ' + margin + ' ' + (y - renkBoxH) + ' 3 ' + renkBoxH + ' re f Q');
  let ry = y - 15;
  text(margin + 14, ry, 8.7, '0.55 0.38 0.10', 'Renk Notu: ' + renkLines[0]);
  renkLines.slice(1).forEach((ln) => { ry -= 13; text(margin + 14, ry, 8.7, GRAY, ln); });
  y = y - renkBoxH - 20;

  if (q.notes) {
    text(margin, y, 9, NAVY, 'Ek Not:');
    y -= 14;
    wrapTextLines(q.notes, 82).slice(0, 3).forEach((ln) => { text(margin, y, 8.7, GRAY, ln); y -= 13; });
  }

  const footerY = 40;
  lines.push('q ' + LGRAY + ' RG 0.8 w ' + margin + ' ' + (footerY + 14) + ' m ' + (pageW - margin) + ' ' + (footerY + 14) + ' l S Q');
  text(margin, footerY, 8, GRAY, 'Iletisim: yildizkumlamaboya@gmail.com  |  Bu teklif bilgi amaclidir; onayinizla birlikte planlama yapilir.');

  return { contentStr: lines.join('\n') + '\n', images: [] };
}
async function buildQuotePDF(q) { return assemblePDF([buildQuotePageContent(q)]); }

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('dönüştürme hatası'));
    reader.readAsDataURL(blob);
  });
}
async function shareOrOpenDataUrl(dataUrl, filename, type) {
  try {
    const res = await fetch(dataUrl);
    const bytes = new Uint8Array(await res.arrayBuffer());
    return await saveOrShareFile(bytes, filename, type || 'image/jpeg', { [type || 'image/jpeg']: ['.jpg', '.jpeg'] });
  } catch (e) {
    const a = document.createElement('a');
    a.href = dataUrl; a.download = filename; a.style.display = 'none';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    return false;
  }
}
async function saveOrShareFile(data, filename, mimeType, pickerAccept) {
  // Her zaman gerçek byte ile çalış, diske yazılanın boş (0 bayt) olmadığını doğrula.
  // Yeni sekme / blob: adresine gitme YOK (APK WebView'de blob:null hatası verir).
  let blob, bytes = null;
  if (data instanceof Blob) blob = data;
  else {
    bytes = (typeof data === 'string') ? new TextEncoder().encode(data) : data;
    blob = new Blob([bytes], { type: mimeType || 'application/octet-stream' });
  }
  if (!blob.size) throw new Error('Kaydedilecek veri boş.');
  if (NATIVE) { await nativePut('file', blob); NATIVE.saveAs(filename, mimeType || 'application/octet-stream'); return 'native'; }
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: pickerAccept ? [{ description: filename, accept: pickerAccept }] : undefined,
      });
      let writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      let size = -1;
      try { size = (await handle.getFile()).size; } catch (e) { size = -1; }
      if (size === 0) {
        if (!bytes) bytes = new Uint8Array(await blob.arrayBuffer());
        writable = await handle.createWritable({ keepExistingData: false });
        await writable.write({ type: 'write', position: 0, data: bytes });
        await writable.close();
        try { size = (await handle.getFile()).size; } catch (e) { size = -1; }
        if (size === 0) throw new Error('Dosya 0 bayt yazıldı. Farklı bir klasör seçip tekrar dene.');
      }
      return 'picker';
    } catch (e) {
      if (e && e.name === 'AbortError') return 'cancelled';
      if (e && /0 bayt/.test(e.message || '')) throw e;
    }
  }
  // Seçici yoksa: sistem paylaşım penceresi, o da yoksa aynı sayfada data: bağlantısıyla indirme.
  try {
    const file = new File([blob], filename, { type: mimeType || 'application/octet-stream' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: filename });
      return 'shared';
    }
  } catch (e) { if (e && e.name === 'AbortError') return 'cancelled'; }
  if (blob.size > 12 * 1024 * 1024) {
    throw new Error('Dosya çok büyük (' + (blob.size / 1024 / 1024).toFixed(1) + ' MB). "Farklı Kaydet" destekleyen bir cihaz/uygulama gerekir.');
  }
  const url = await blobToDataUrl(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  return 'opened';
}
function backupStatusMessage(mode) {
  if (mode === 'picker') return '✓ Yedek, seçtiğin konuma kaydedildi.';
  if (mode === 'shared') return '✓ Yedek paylaşıldı.';
  if (mode === 'cancelled' || mode === 'native') return null;
  return 'Yedek dosyası açıldı — kalıcı kaydetmek için paylaş/kaydet seçeneğini kullan.';
}

/* ============================== app state ============================== */
function emptyForm() {
  return { date: todayISO(), company: '', plate: '', driver: '', driverPhone: '', driverTC: '', paintDetails: '', signature: null, tonnage: '', tonnageUnit: 'kg', invoiced: false, photos: [] };
}
function emptyQuoteForm() {
  return { date: todayISO(), company: '', work: '', paintThickness: '', tonnage: '', tonnageUnit: 'ton', price: '', status: 'bekliyor', notes: '' };
}
const QUOTE_STATUSES = {
  bekliyor: { label: 'Bekliyor', color: 'var(--warn)', bg: 'var(--warn-bg)' },
  kesinlesti: { label: 'Fiyat Kesinleşti', color: 'var(--signed)', bg: 'var(--signed-bg)' },
  reddedildi: { label: 'Reddedildi', color: 'var(--stamp)', bg: 'var(--danger-bg)' },
};
const state = {
  view: 'list', shipments: [], loading: true,
  darkMode: (() => { try { return localStorage.getItem('sevkiyat_dark_mode') === '1'; } catch (e) { return false; } })(),
  query: '', companyFilter: '', tonnageFilter: '', invoicedFilter: '', dateFrom: '', dateTo: '',
  selectedId: null, editingId: null, error: '', successMsg: '',
  saving: false, pdfBusy: false, bulkPdfBusy: false, restoreBusy: false, backupBusy: false, backupProgress: '', excelBackupBusy: false, pdfBackupBusy: false, pdfBackupPending: false,
  pendingRestore: null, form: emptyForm(), storageInfo: { usage: 0, quota: 0, supported: false, persistent: null },
  pendingDelete: null, pendingInvoice: null,
  lastBackupAt: Number(localStorage.getItem('sevkiyat_last_backup')) || null,
  suppressBackupPrompt: localStorage.getItem('sevkiyat_suppress_backup_prompt') === '1',
  pendingBackupPrompt: false,
  pendingExitConfirm: false,
  navStack: [],
  showPasteRestore: false, showBackupReminder: false, navMenuOpen: false, backupDateFrom: '', backupDateTo: '',
  listPage: 1, costPage: 1, listPerPage: 10, costPerPage: 10,
  uiExpanded: { backup: false, filters: false, quickEntry: false, costFilters: false, sumFilters: false, quoteForm: false },
  quickEntryText: '', quickEntryNotice: false,
  pendingCostEdit: null,
  costCompanyFilter: '', costDateFrom: '', costDateTo: '', costQuery: '', costPriceFilter: '',
  quotes: [], quoteForm: emptyQuoteForm(), editingQuoteId: null, quotePage: 1, quotePerPage: 10,
  quoteQuery: '', quoteStatusFilter: '', pendingQuoteDelete: null, quoteSaving: false, quotePdfBusyId: null,
  paintCalc: {
    area: '', tonnage: '', astarMicron: '', sonkatMicron: '', astarVS: '80', sonkatVS: '69',
    lossPct: '', tinerPct: '', astarPrice: '275', sonkatPrice: '290', tinerPrice: '145', profitPct: '15', laborDiscountPct: '0',
  },
  paintCalcPricesOpen: false, paintCalcPdfBusy: false,
  assistantOpen: false, assistantMsgs: [], assistantSpeak: (() => { try { return localStorage.getItem('sevkiyat_ai_ses') !== '0'; } catch (e) { return true; } })(), assistantLive: '', assistantRecorder: null, wa: null, assistantBusy: false, assistantPending: null, assistantInput: '', assistantRec: null, assistantListening: false,
  autoBackups: [], autoBackupBusy: false, autoBackupError: '', autoRestoreDay: '',
  cloudSyncing: false, lastSyncAt: null, cloudLastError: '',
  pendingDeletions: (() => { try { return JSON.parse(localStorage.getItem('sevkiyat_pending_deletions') || '[]'); } catch (e) { return []; } })(),
  vatRate: 20,
  pendingRestores: (() => { try { return JSON.parse(localStorage.getItem('sevkiyat_pending_restores') || '[]'); } catch (e) { return []; } })(),
  trash: [], pendingPurge: null, tasksVisible: 20, priceQuery: '', priceOpen: {}, sumQuery: '', sumCompany: '', sumInvoiced: '', sumPrice: '', sumFrom: '', sumTo: '', sumMode: 'month', sumOpen: {},
  pinEnabled: (() => { try { return localStorage.getItem('sevkiyat_pin_enabled') !== '0'; } catch (e) { return true; } })(),
  locked: false, pinInput: '', pinError: false, pinChangeMsg: '',
};
const PIN_GRACE_MS = 30 * 60 * 1000;
function touchActive() { try { localStorage.setItem('sevkiyat_last_active', String(Date.now())); } catch (e) {} }
function lastActiveAt() { try { return parseInt(localStorage.getItem('sevkiyat_last_active'), 10) || 0; } catch (e) { return 0; } }
state.locked = state.pinEnabled && (Date.now() - lastActiveAt() > PIN_GRACE_MS);
function markBackupDone() {
  state.lastBackupAt = Date.now();
  try { localStorage.setItem('sevkiyat_last_backup', String(state.lastBackupAt)); } catch (e) {}
}
function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}
function setBackupProgressLabel(text) {
  state.backupProgress = text;
  const el = document.getElementById('backup-progress-label');
  if (el) el.textContent = text;
}
function backupRangeFilter(list) {
  if (!state.backupDateFrom && !state.backupDateTo) return list;
  return list.filter((r) => {
    if (!r.date) return false;
    if (state.backupDateFrom && r.date < state.backupDateFrom) return false;
    if (state.backupDateTo && r.date > state.backupDateTo) return false;
    return true;
  });
}
async function runPdfBackup() {
  state.pdfBackupBusy = true; state.error = ''; render();
  try {
    const list = backupRangeFilter(state.shipments);
    if (!list.length) { state.error = 'Seçilen tarih aralığında kayıt yok.'; state.pdfBackupBusy = false; render(); return; }
    const bytes = await buildBulkReceiptPDF(list);
    const suffix = (state.backupDateFrom || state.backupDateTo) ? '-' + (state.backupDateFrom || 'bas') + '_' + (state.backupDateTo || 'son') : '';
    const mode = await saveOrShareFile(bytes, 'sevkiyat-toplu' + suffix + '-' + todayISO() + '.pdf', 'application/pdf', { 'application/pdf': ['.pdf'] });
    const msg = backupStatusMessage(mode);
    if (msg) state.successMsg = msg;
  } catch (e) {
    state.error = 'Toplu PDF oluşturulurken bir sorun oluştu.';
  }
  state.pdfBackupBusy = false;
  render();
}
function collectLocalSettings() {
  const settings = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf('sevkiyat_') === 0 && k.indexOf('sevkiyat_pin') !== 0 && k !== 'sevkiyat_pending_deletions' && k !== 'sevkiyat_pending_restores') settings[k] = localStorage.getItem(k);
    }
  } catch (e) {}
  return settings;
}
function buildTextBackupPayload(lite) {
  // TAM YEDEK: tüm sevkiyatlar (fotoğraf + imza dahil), çöp kutusu, teklifler ve ayarlar.
  const exportedAt = new Date().toISOString();
  const shipments = backupRangeFilter(state.shipments);
  const ranged = !!(state.backupDateFrom || state.backupDateTo);
  const trash = ranged ? [] : state.trash;
  const quotes = backupRangeFilter(state.quotes);
  const all = shipments.concat(trash);
  const parts = ['{"app":"sevkiyat-pwa","version":4,"exportedAt":' + JSON.stringify(exportedAt) + ',"photosIncluded":true,"dateRanged":' + (ranged ? 'true' : 'false') + ',"count":' + shipments.length + ',"shipments":['];
  for (let i = 0; i < all.length; i++) {
    if (i > 0) parts.push(',');
    const rec = Object.assign({}, all[i], { _searchIdx: undefined });
    if (lite && rec.media && rec.media.sum === mediaSum(all[i])) { rec.photos = rec.media.photos; rec.signature = rec.media.sig || null; } // bulut yedeği: görüntüler telefonda, sadece adresleri
    parts.push(JSON.stringify(rec));
  }
  parts.push('],"quotes":' + JSON.stringify(quotes) + ',"settings":' + JSON.stringify(collectLocalSettings()) + '}');
  const blob = new Blob(parts, { type: 'application/json' });
  const rangeSuffix = ranged ? ('-' + (state.backupDateFrom || 'bas') + '_' + (state.backupDateTo || 'son')) : '';
  const filename = 'sevkiyat-tam-yedek' + rangeSuffix + '-' + todayISO() + '.json';
  return { bytes: blob, filename, counts: { shipments: shipments.length, quotes: quotes.length, trash: trash.length } };
}
async function runFullBackup() {
  state.backupBusy = true; state.backupProgress = 'Hazırlanıyor…'; state.error = ''; render();
  await nextFrame();
  try {
    const built = buildTextBackupPayload();
    setBackupProgressLabel('Kaydediliyor…'); await nextFrame();
    const mode = await saveOrShareFile(built.bytes, built.filename, 'application/json', { 'application/json': ['.json'] });
    if (mode !== 'cancelled') markBackupDone();
    const msg = backupStatusMessage(mode);
    if (msg) state.successMsg = msg + ' (' + built.counts.shipments + ' sevkiyat, ' + built.counts.quotes + ' teklif; fotoğraf ve imzalar dahil)';
    if (mode === 'cancelled') state.pdfBackupPending = false;
  } catch (e) {
    state.error = 'Yedekleme başarısız oldu: ' + (e && e.message ? e.message : String(e));
  }
  state.backupBusy = false; state.backupProgress = '';
  render();
}

/* ============================== otomatik günlük yedek (cihaz içi) ============================== */
const AUTOBACKUP_KEEP = 5;
function autoBackupEnabled() { try { return localStorage.getItem('sevkiyat_autobackup') !== '0'; } catch (e) { return true; } }
function abOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('sevkiyat_autobackup', 1);
    req.onupgradeneeded = () => { req.result.createObjectStore('snap', { keyPath: 'day' }); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function abTx(mode, fn) {
  return abOpen().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction('snap', mode);
    const out = fn(tx.objectStore('snap'));
    tx.oncomplete = () => { db.close(); resolve(out && out.result !== undefined ? out.result : undefined); };
    tx.onerror = () => { db.close(); reject(tx.error); };
    tx.onabort = () => { db.close(); reject(tx.error || new Error('abort')); };
  }));
}
async function abLocalList() {
  const all = await abTx('readonly', (st) => st.getAll());
  return (all || []).map((r) => ({ day: r.day, at: r.at, shipments: r.shipments, quotes: r.quotes, size: r.size, src: 'local' }));
}
const AB_BUCKET = 'yedekler', AB_DIR = 'otomatik';
function abCloudParse(f) {
  const m = /^(.+?)__(\d+)_(\d+)\.json$/.exec(f.name || '');
  if (!m) return null;
  return { day: m[1], at: Date.parse(f.updated_at || f.created_at) || 0, shipments: Number(m[2]), quotes: Number(m[3]), size: (f.metadata && f.metadata.size) || 0, src: 'cloud', file: f.name };
}
async function abCloudList() {
  const { data, error } = await supabaseClient.storage.from(AB_BUCKET).list(AB_DIR, { limit: 100 });
  if (error) throw error;
  return (data || []).map(abCloudParse).filter(Boolean);
}
async function abList() {
  let cloud = [], local = [];
  if (supabaseClient) { try { cloud = await abCloudList(); } catch (e) { state.autoBackupError = 'Buluttaki yedekler okunamadı: ' + (e && e.message ? e.message : String(e)); } }
  try { local = await abLocalList(); } catch (e) {}
  const days = new Set(cloud.map((r) => r.day));
  return cloud.concat(local.filter((r) => !days.has(r.day))).sort((a, b) => String(b.day).localeCompare(String(a.day)) || (b.at || 0) - (a.at || 0));
}
async function abGet(day) {
  if (supabaseClient) {
    try {
      const f = (await abCloudList()).find((r) => r.day === day);
      if (f) {
        const { data, error } = await supabaseClient.storage.from(AB_BUCKET).download(AB_DIR + '/' + f.file);
        if (error) throw error;
        return { day, blob: data };
      }
    } catch (e) { if (!(await abTx('readonly', (st) => st.get(day)))) throw e; }
  }
  return abTx('readonly', (st) => st.get(day));
}
async function abPut(rec) {
  if (supabaseClient) {
    try {
      const existing = (await abCloudList()).filter((r) => r.day === rec.day).map((r) => AB_DIR + '/' + r.file);
      const name = rec.day + '__' + rec.shipments + '_' + rec.quotes + '.json';
      const { error } = await supabaseClient.storage.from(AB_BUCKET).upload(AB_DIR + '/' + name, rec.blob, { contentType: 'application/json', upsert: true });
      if (error) throw error;
      const stale = existing.filter((p) => p !== AB_DIR + '/' + name);
      if (stale.length) await supabaseClient.storage.from(AB_BUCKET).remove(stale);
      try { await abTx('readwrite', (st) => st.delete(rec.day)); } catch (e) {}
      return 'cloud';
    } catch (e) { state.autoBackupError = 'Buluta yüklenemedi, yedek cihazda tutuldu: ' + (e && e.message ? e.message : String(e)); }
  }
  await abTx('readwrite', (st) => st.put(rec));
  return 'local';
}
async function abDelete(day) {
  if (supabaseClient) {
    try {
      const files = (await abCloudList()).filter((r) => r.day === day).map((r) => AB_DIR + '/' + r.file);
      if (files.length) await supabaseClient.storage.from(AB_BUCKET).remove(files);
    } catch (e) {}
  }
  try { await abTx('readwrite', (st) => st.delete(day)); } catch (e) {}
}
async function refreshAutoBackups() {
  try { state.autoBackups = await abList(); } catch (e) { state.autoBackups = []; }
  render();
}
async function createAutoBackup(dayKey, force) {
  if (!force && !autoBackupEnabled()) return false;
  if (state.autoBackupBusy) return false;
  if (!state.shipments.length && !state.trash.length && !state.quotes.length) return false;
  state.autoBackupBusy = true;
  try {
    const day = dayKey || todayISO();
    const savedFrom = state.backupDateFrom, savedTo = state.backupDateTo;
    state.backupDateFrom = ''; state.backupDateTo = '';
    let built;
    let lite;
    try { built = buildTextBackupPayload(); lite = mediaOn() && supabaseClient ? buildTextBackupPayload(true) : built; } finally { state.backupDateFrom = savedFrom; state.backupDateTo = savedTo; }
    await abPut({ day, at: Date.now(), shipments: built.counts.shipments, quotes: built.counts.quotes, size: lite.bytes.size, blob: lite.bytes });
    markBackupDone();
    driveUpload(built.bytes).catch(() => {});
    const list = await abList();
    const dated = list.filter((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.day));
    for (const old of dated.slice(AUTOBACKUP_KEEP)) { try { await abDelete(old.day); } catch (e) {} }
    state.autoBackups = await abList();
    state.autoBackupBusy = false;
    return true;
  } catch (e) {
    state.autoBackupBusy = false;
    state.autoBackupError = 'Otomatik yedek alınamadı: ' + (e && e.message ? e.message : String(e));
    return false;
  }
}
async function maybeDailyAutoBackup() {
  if (!autoBackupEnabled() || state.loading || state.autoBackupBusy) return;
  try {
    const list = await abList();
    state.autoBackups = list;
    if (list.some((r) => r.day === todayISO())) return;
    if (await createAutoBackup()) { render(); }
  } catch (e) {}
}
async function restoreFromAutoBackup(day) {
  try {
    const rec = await abGet(day);
    if (!rec || !rec.blob) throw new Error('Yedek bulunamadı.');
    const file = new File([rec.blob], 'Otomatik yedek ' + day + '.json', { type: 'application/json' });
    state.pendingRestore = null;
    state.autoRestoreDay = day;
    await handleJsonFiles([file]);
  } catch (e) { state.error = 'Otomatik yedek açılamadı: ' + (e && e.message ? e.message : String(e)); render(); }
}
async function downloadAutoBackup(day) {
  try {
    const rec = await abGet(day);
    if (!rec || !rec.blob) throw new Error('Yedek bulunamadı.');
    const mode = await saveOrShareFile(rec.blob, 'sevkiyat-otomatik-yedek-' + day + '.json', 'application/json', { 'application/json': ['.json'] });
    const msg = backupStatusMessage(mode);
    if (msg) { state.successMsg = msg; setTimeout(() => { state.successMsg = ''; render(); }, 6000); }
  } catch (e) { state.error = 'Yedek indirilemedi: ' + (e && e.message ? e.message : String(e)); }
  render();
}
/* ============================== Google Drive yedeği (Google Apps Script ile, kendi Drive hesabına) ============================== */
const DRIVE_SCRIPT = `function doPost(e) {
  var data = e.postData.contents;
  var it = DriveApp.getFoldersByName('Sevkiyat Yedekleri');
  var folder = it.hasNext() ? it.next() : DriveApp.createFolder('Sevkiyat Yedekleri');
  var name = 'sevkiyat-yedek-' + Utilities.formatDate(new Date(), 'Europe/Istanbul', 'yyyy-MM-dd') + '.json';
  var ex = folder.getFilesByName(name);
  if (ex.hasNext()) ex.next().setContent(data); else folder.createFile(name, data, 'application/json');
  var files = [], all = folder.getFiles();
  while (all.hasNext()) files.push(all.next());
  files.sort(function (a, b) { return b.getDateCreated() - a.getDateCreated(); });
  for (var i = 30; i < files.length; i++) files[i].setTrashed(true);
  return ContentService.createTextOutput('ok');
}`;
function driveUrl() { try { return localStorage.getItem('sevkiyat_drive_url') || ''; } catch (e) { return ''; } }
/* ---- kendi APK'mızın yerel köprüsü (window.SevkNative) ---- */
const NATIVE = window.SevkNative || null;
async function nativePut(slot, blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (!NATIVE.begin(slot)) throw new Error('Dosya hazırlanamadı');
  const CH = 3 * 256 * 1024;
  for (let i = 0; i < bytes.length; i += CH) {
    const part = bytes.subarray(i, i + CH);
    let str = '';
    for (let j = 0; j < part.length; j += 0x8000) str += String.fromCharCode.apply(null, part.subarray(j, j + 0x8000));
    if (!NATIVE.append(slot, btoa(str))) throw new Error('Dosya yazılamadı');
  }
}
function nativeDriveLinked() { try { return !!(NATIVE && NATIVE.driveLinked()); } catch (e) { return false; } }
let _driveBusy = false, _driveAgain = null;
window.onDriveDone = function (ok, err) {
  _driveBusy = false;
  try {
    if (ok) { localStorage.setItem('sevkiyat_drive_last', String(Date.now())); localStorage.removeItem('sevkiyat_drive_err'); }
    else localStorage.setItem('sevkiyat_drive_err', err || 'Yazılamadı');
  } catch (e) {}
  if (_driveAgain) { const b = _driveAgain; _driveAgain = null; driveUpload(b); }
  renderSafe();
};
window.onDrivePicked = function (ok) {
  if (ok === false) return;
  try { localStorage.removeItem('sevkiyat_drive_err'); } catch (e) {}
  createAutoBackup(todayISO(), true).then(() => {
    state.successMsg = 'Drive bağlandı, ilk yedek yüklendi. Bundan sonra her işlemde otomatik.'; render();
    setTimeout(() => { state.successMsg = ''; render(); }, 5000);
  });
};
async function driveUpload(blob) {
  if (nativeDriveLinked()) {
    if (_driveBusy) { _driveAgain = blob; return false; }
    _driveBusy = true;
    try {
      await nativePut('drive', blob instanceof Blob ? blob : new Blob([String(blob)], { type: 'application/json' }));
      if (!NATIVE.driveWrite()) { _driveBusy = false; return false; }
      return true;
    } catch (e) {
      _driveBusy = false;
      try { localStorage.setItem('sevkiyat_drive_err', e && e.message ? e.message : String(e)); } catch (er) {}
      return false;
    }
  }
  const url = driveUrl();
  if (!url) return false;
  try {
    const text = blob instanceof Blob ? await blob.text() : String(blob);
    await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: text });
    try { localStorage.setItem('sevkiyat_drive_last', String(Date.now())); localStorage.removeItem('sevkiyat_drive_err'); } catch (e) {}
    return true;
  } catch (e) {
    try { localStorage.setItem('sevkiyat_drive_err', e && e.message ? e.message : String(e)); } catch (er) {}
    return false;
  }
}
function buildNativeDriveBox(container) {
  const linked = nativeDriveLinked(), last = Number(localStorage.getItem('sevkiyat_drive_last')) || 0, err = localStorage.getItem('sevkiyat_drive_err') || '';
  const box = h('div', { style: { background: 'var(--cream)', border: '1.5px solid ' + (linked ? 'var(--signed-border)' : 'var(--line)'), borderRadius: '10px', padding: '12px', marginBottom: '12px' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '700', fontSize: '13.5px' } }, [
    ic('uploadcloud', 14, linked ? 'var(--signed)' : 'var(--inkSoft)'), ' Google Drive Yedeği',
    h('span', { style: { marginLeft: 'auto', fontSize: '11px', color: linked ? 'var(--signed)' : 'var(--inkSoft)', fontWeight: '600' } }, linked ? '● Bağlı' : '○ Bağlı değil'),
  ]));
  if (linked) {
    let name = ''; try { name = NATIVE.driveName(); } catch (e) {}
    box.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--ink)', fontWeight: '600', marginBottom: '4px', wordBreak: 'break-all' } }, name));
    box.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', lineHeight: '1.5', marginBottom: '8px' } },
      'Her işlemden sonra yedek kendiliğinden bu dosyaya yazılır (Drive eski sürümleri de saklar). ' + (last ? 'Son yükleme: ' + new Date(last).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Henüz yüklenmedi.')));
    if (err) box.appendChild(h('div', { style: { fontSize: '11.5px', color: 'var(--stamp)', marginBottom: '6px' } }, 'Son deneme başarısız: ' + err));
    const row = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } });
    row.appendChild(btn([ic('uploadcloud', 13), ' Şimdi yükle'], { onclick: async () => { await createAutoBackup(todayISO(), true); state.successMsg = 'Yedek Drive\'a gönderildi.'; render(); setTimeout(() => { state.successMsg = ''; render(); }, 4000); }, style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--ink)', 'var(--cream)'));
    row.appendChild(btn([ic('drive', 13), ' Klasörü değiştir'], { onclick: () => NATIVE.drivePick(), style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--paper2)', 'var(--ink)'));
    row.appendChild(btn(['Kaldır'], { onclick: () => { NATIVE.driveForget(); render(); }, style: { fontSize: '12px', padding: '8px 10px' } }, 'none', 'var(--inkSoft)'));
    box.appendChild(row);
  } else {
    box.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--ink)', lineHeight: '1.6', marginBottom: '10px' } }, [
      h('div', {}, 'Bir kez klasör seç, sonra her işlemden sonra yedek otomatik Drive\'a gider:'),
      h('div', {}, '1) "Drive klasörü seç"e bas.'),
      h('div', {}, '2) Açılan pencerede sol menüden Drive\'ı seç, yedek klasörünü aç.'),
      h('div', {}, '3) "Kaydet"e bas — bitti.'),
    ]));
    box.appendChild(btn([ic('drive', 14), ' Drive klasörü seç'], { onclick: () => NATIVE.drivePick(), style: { fontSize: '13px', padding: '10px 14px' } }, 'var(--ink)', 'var(--cream)'));
  }
  container.appendChild(box);
}
function buildDriveBox(container) {
  if (NATIVE) return buildNativeDriveBox(container);
  const url = driveUrl(), last = Number(localStorage.getItem('sevkiyat_drive_last')) || 0, err = localStorage.getItem('sevkiyat_drive_err') || '';
  const box = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '12px', marginBottom: '12px' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '700', fontSize: '13.5px' } }, [
    ic('uploadcloud', 14, url ? 'var(--signed)' : 'var(--inkSoft)'), ' Google Drive Yedeği',
    h('span', { style: { marginLeft: 'auto', fontSize: '11px', color: url ? 'var(--signed)' : 'var(--inkSoft)', fontWeight: '600' } }, url ? '● Bağlı' : '○ Bağlı değil'),
  ]));
  if (url) {
    box.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', lineHeight: '1.5', marginBottom: '8px' } },
      'Her otomatik yedek Drive\'daki "Sevkiyat Yedekleri" klasörüne de yüklenir (son 30 gün). ' + (last ? 'Son yükleme: ' + new Date(last).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '')));
    if (err) box.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--stamp)', marginBottom: '6px' } }, 'Son deneme başarısız: ' + err));
    const row = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } });
    row.appendChild(btn([ic('uploadcloud', 13), ' Şimdi Drive\'a Yükle'], { onclick: async () => { await createAutoBackup(todayISO(), true); state.successMsg = 'Drive\'a yüklendi.'; render(); setTimeout(() => { state.successMsg = ''; render(); }, 4000); }, style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--ink)', 'var(--cream)'));
    row.appendChild(btn(['Bağlantıyı kaldır'], { onclick: () => { try { localStorage.removeItem('sevkiyat_drive_url'); } catch (e) {} render(); }, style: { fontSize: '12px', padding: '8px 10px' } }, 'none', 'var(--inkSoft)'));
    box.appendChild(row);
  } else {
    box.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--ink)', lineHeight: '1.6', marginBottom: '8px' } }, [
      h('div', {}, 'Tek seferlik kurulum (2 dakika), sonra her şey otomatik:'),
      h('div', {}, '1) "Kodu kopyala"ya bas.'),
      h('div', {}, '2) "Google Script\'i aç"a bas → Yeni proje → içindekileri silip kodu yapıştır → 💾 Kaydet.'),
      h('div', {}, '3) Dağıt → Yeni dağıtım → tür: Web uygulaması → Erişim: "Herkes" → Dağıt → izin ver.'),
      h('div', {}, '4) Çıkan "Web uygulaması URL"sini kopyalayıp aşağıya yapıştır → Bağla.'),
    ]));
    const row = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' } });
    row.appendChild(btn([ic('copy', 13), ' Kodu kopyala'], { onclick: async () => { try { await navigator.clipboard.writeText(DRIVE_SCRIPT); state.successMsg = 'Kod kopyalandı.'; } catch (e) { state.driveShowCode = true; } render(); setTimeout(() => { state.successMsg = ''; render(); }, 3000); }, style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--paper2)', 'var(--ink)'));
    row.appendChild(btn([' Google Script\'i aç'], { onclick: () => { window.open('https://script.google.com/home/projects/create', '_blank'); }, style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--paper2)', 'var(--ink)'));
    box.appendChild(row);
    if (state.driveShowCode) box.appendChild(h('textarea', { readonly: true, style: { width: '100%', height: '120px', fontSize: '10.5px', fontFamily: 'monospace', marginBottom: '8px' } }, DRIVE_SCRIPT));
    const inp = h('input', { placeholder: 'https://script.google.com/macros/s/…/exec', style: { width: '100%', padding: '9px 10px', border: '1.5px solid var(--line)', borderRadius: '8px', fontSize: '12.5px', marginBottom: '8px', background: 'var(--paper)', color: 'var(--ink)' } });
    box.appendChild(inp);
    box.appendChild(btn([ic('check', 13), ' Bağla ve ilk yedeği yükle'], { onclick: async () => {
      const v = (inp.value || '').trim();
      if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(v)) { state.error = 'Geçerli bir Google Script web uygulaması adresi yapıştır (…/exec ile biter).'; render(); return; }
      try { localStorage.setItem('sevkiyat_drive_url', v); } catch (e) {}
      await createAutoBackup(todayISO(), true);
      state.successMsg = 'Drive bağlandı, ilk yedek yüklendi.'; render(); setTimeout(() => { state.successMsg = ''; render(); }, 5000);
    }, style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--ink)', 'var(--cream)'));
  }
  container.appendChild(box);
}
function buildAutoBackupBox(container) {
  buildMediaBox(container);
  buildDriveBox(container);
  if (!state._abLoaded) { state._abLoaded = true; refreshAutoBackups(); }
  const on = autoBackupEnabled();
  const box = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '12px', marginBottom: '12px' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '700', fontSize: '13.5px' } }, [
    ic('drive', 14, on ? 'var(--signed)' : 'var(--inkSoft)'), ' Otomatik Günlük Yedek',
    h('span', { style: { marginLeft: 'auto', fontSize: '11px', color: on ? 'var(--signed)' : 'var(--inkSoft)', fontWeight: '600' } }, on ? '● Açık' : '○ Kapalı'),
  ]));
  const tg = h('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '8px' } });
  tg.appendChild(h('input', { type: 'checkbox', checked: on, style: { width: '16px', height: '16px', cursor: 'pointer' }, onchange: (e) => { try { localStorage.setItem('sevkiyat_autobackup', e.target.checked ? '1' : '0'); } catch (err) {} if (e.target.checked) maybeDailyAutoBackup(); render(); } }));
  tg.appendChild(h('span', {}, 'Her değişiklikten sonra kendiliğinden yedek alınsın (son ' + AUTOBACKUP_KEEP + ' günün yedeği ' + (supabaseClient ? 'bulutta' : 'cihazda') + ' tutulur)'));
  box.appendChild(tg);
  const row = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' } });
  row.appendChild(btn([ic('check', 13), state.autoBackupBusy ? ' Alınıyor…' : ' Şimdi Otomatik Yedek Al'], {
    disabled: state.autoBackupBusy,
    onclick: async () => { state.autoBackupError = ''; render(); await nextFrame(); const ok = await createAutoBackup(todayISO(), true); if (ok) { state.successMsg = 'Otomatik yedek alındı.'; setTimeout(() => { state.successMsg = ''; render(); }, 4000); } render(); },
    style: { fontSize: '12.5px', padding: '8px 12px' },
  }, 'var(--ink)', 'var(--cream)'));
  box.appendChild(row);
  if (state.autoBackupError) box.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--stamp)', marginBottom: '6px' } }, state.autoBackupError));
  const all = state.autoBackups || [];
  const list = all.filter((r) => r.day !== 'geri-yukleme-oncesi').slice(0, AUTOBACKUP_KEEP).concat(all.filter((r) => r.day === 'geri-yukleme-oncesi'));
  if (!list.length) {
    box.appendChild(h('div', { style: { fontSize: '11.5px', color: 'var(--inkSoft)' } }, 'Henüz otomatik yedek yok. Bugünkü yedek uygulama açıkken kendiliğinden alınır.'));
  } else {
    list.forEach((r) => {
      const isSafety = r.day === 'geri-yukleme-oncesi';
      const label = isSafety ? 'Geri yüklemeden önce' : new Date(r.at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
      const item = h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderTop: '1px solid var(--line)' } });
      item.appendChild(h('div', { style: { flex: '1', minWidth: '0' } }, [
        h('div', { style: { fontSize: '12.5px', fontWeight: '700', color: 'var(--ink)' } }, label),
        h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)' } }, (r.src === 'cloud' ? '☁ ' : '📱 ') + new Date(r.at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) + ' · ' + r.shipments + ' sevkiyat, ' + r.quotes + ' teklif · ' + ((r.size || 0) / 1024 / 1024).toFixed(1) + ' MB'),
      ]));
      item.appendChild(btn(['Geri Yükle'], { onclick: () => restoreFromAutoBackup(r.day), style: { fontSize: '12px', padding: '7px 10px' } }, 'var(--paper2)', 'var(--ink)'));
      item.appendChild(btn([ic('filedown', 13)], { title: 'Dosya olarak indir / paylaş', onclick: () => downloadAutoBackup(r.day), style: { fontSize: '12px', padding: '7px 10px' } }, 'none', 'var(--steel)'));
      item.lastChild.style.border = '1.5px solid var(--line)';
      box.appendChild(item);
    });
  }
  box.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)', lineHeight: '1.5', marginTop: '6px' } }, (supabaseClient ? 'Yedekler bulutta saklanır; telefon kaybolsa veya uygulama silinse de kalır. İnternet yokken alınan yedek geçici olarak cihazda tutulur.' : 'Bulut bağlı değil: yedekler telefonun içinde saklanır, uygulama silinirse onlar da gider.')));
  container.appendChild(box);
}


/* ============================== yapay zeka asistanı (Gemini) ============================== */
function assistantData() {
  const R = (v) => Math.round(v * 100) / 100;
  const list = state.shipments;
  const byCo = {}, byMonth = {};
  const unitName = (u) => (u === 'm2' ? 'm²' : (u || 'kg'));
  let noPrice = 0, noSign = 0, noInvoice = 0, noQty = 0;
  list.forEach((s) => {
    const co = s.company || '—';
    const o = byCo[co] || (byCo[co] = { sevkiyat: 0, miktar: {}, tutar: 0, boyaMaliyeti: 0, net: 0, faturasiz: 0 });
    o.sevkiyat++;
    const q = parseFloat(s.tonnage);
    if (!isNaN(q)) { const u = unitName(s.tonnageUnit); o.miktar[u] = R((o.miktar[u] || 0) + q); } else noQty++;
    const a = costAmount(s);
    if (a !== null) { o.tutar = R(o.tutar + a); o.net = R(o.net + netAmount(s)); const p = parseFloat(s.paintCost); if (!isNaN(p)) o.boyaMaliyeti = R(o.boyaMaliyeti + p); } else noPrice++;
    if (!s.invoiced) { o.faturasiz++; noInvoice++; }
    if (!s.signature) noSign++;
    const mk = (s.date || '').slice(0, 7);
    if (mk) { const m = byMonth[mk] || (byMonth[mk] = { sevkiyat: 0, tutar: 0, net: 0 }); m.sevkiyat++; if (a !== null) { m.tutar = R(m.tutar + a); m.net = R(m.net + netAmount(s)); } }
  });
  const months = Object.keys(byMonth).sort().reverse().slice(0, 14);
  const monthObj = {}; months.forEach((k) => { monthObj[k] = byMonth[k]; });
  const coTop = Object.keys(byCo).sort((x, y) => byCo[y].tutar - byCo[x].tutar).slice(0, 60);
  const coObj = {}; coTop.forEach((k) => { coObj[k] = byCo[k]; });
  const recent = list.slice(0, 250).map((s) => [s.seq, s.date, s.company, s.plate, s.driver, s.tonnage === '' || s.tonnage == null ? null : parseFloat(s.tonnage), unitName(s.tonnageUnit), String(s.paintDetails || '').slice(0, 28), hasUnitPrice(s) ? parseFloat(s.unitPrice) : null, isNaN(parseFloat(s.paintCost)) ? null : parseFloat(s.paintCost), costAmount(s) !== null ? R(costAmount(s)) : null, netAmount(s) !== null ? R(netAmount(s)) : null, s.signature ? 1 : 0, s.invoiced ? 1 : 0]);
  const quotes = state.quotes.slice(0, 80).map((q) => ({ tarih: q.date, firma: q.company, is: q.work, miktar: q.tonnage, birim: q.tonnageUnit, fiyat: q.price, durum: q.status, not: q.notes }));
  let tutar = 0, net = 0, boya = 0;
  list.forEach((s) => { const a = costAmount(s); if (a !== null) { tutar += a; net += netAmount(s); } const p = parseFloat(s.paintCost); if (!isNaN(p)) boya += p; });
  return {
    genel: { toplamSevkiyat: list.length, toplamTutarKdvHaric: R(tutar), kdvDahilToplam: R(withVat(tutar)), toplamBoyaMaliyeti: R(boya), toplamNet: R(net), fiyatiGirilmemis: noPrice, miktarsiz: noQty, imzasiz: noSign, faturasiz: noInvoice, copKutusunda: state.trash.length, teklifSayisi: state.quotes.length },
    firmalar: coObj, aylar: monthObj, kayitSutunlari: ['no','tarih','firma','plaka','sofor','miktar','birim','detay','birimFiyat','boyaMaliyeti','tutarKdvHaric','net','imzali','faturaKesildi'], kayitlar: recent, teklifler: quotes,
  };
}
function assistantLog() { try { return JSON.parse(localStorage.getItem('sevkiyat_ai_son') || '[]').filter((x) => x && x.u && x.a).slice(-5); } catch (e) { return []; } }
function assistantSave(u, a) { u = String(u).split('\n[Sesle')[0]; try { const L = assistantLog(); L.push({ u, a }); localStorage.setItem('sevkiyat_ai_son', JSON.stringify(L.slice(-5))); } catch (e) {} }
function openAssistant() {
  state.navMenuOpen = false; state.assistantOpen = true;
  if (!state.assistantMsgs.length) {
    state.assistantMsgs = [{ r: 'a', t: 'Merhaba! Tüm verilerini görüyorum. Soru sorabilir, kayıt ekleyip düzenleyebilir, fiyat/fatura girebilir, silebilir ya da ekran açtırabilirsin.' }];
  }
  render();
}
function assistantOpenTarget(o) {
  const nav = { ekran_liste: 'list', ekran_gorevler: 'tasks', ekran_maliyet: 'cost', ekran_ozet: 'summary', ekran_boya_hesap: 'paintcalc', ekran_fiyatlar: 'prices', ekran_teklifler: 'quotes', ekran_cop: 'trash' };
  if (o.hedef === 'yedekleme') { state.assistantOpen = false; state.uiExpanded.backup = true; render(); return true; }
  if (nav[o.hedef]) { state.assistantOpen = false; gotoTab(nav[o.hedef]); return true; }
  if (o.hedef === 'yeni_sevkiyat') {
    const f = emptyForm();
    const co = o.firma ? (state.shipments.map((s) => s.company).find((c) => trNormalize(c) === trNormalize(o.firma)) || state.shipments.map((s) => s.company).find((c) => c && (trNormalize(c).includes(trNormalize(o.firma)) || trNormalize(o.firma).includes(trNormalize(c)))) || o.firma) : '';
    if (co) f.company = co;
    if (o.plaka) f.plate = String(o.plaka).toLocaleUpperCase('tr-TR');
    if (o.sofor) f.driver = String(o.sofor);
    if (o.tarih && /^\d{4}-\d{2}-\d{2}$/.test(o.tarih)) f.date = o.tarih;
    if (o.miktar && !isNaN(parseFloat(o.miktar)) && parseFloat(o.miktar) > 0) { f.tonnage = String(o.miktar); f.tonnageUnit = ['kg', 'ton', 'm2', 'adet'].indexOf(o.birim) >= 0 ? o.birim : 'kg'; }
    if (o.aciklama) f.paintDetails = String(o.aciklama).toLocaleUpperCase('tr-TR');
    const last = f.company ? lastRecordOfCompany(f.company) : null;
    if (last && !f.paintDetails && last.paintDetails) f.paintDetails = last.paintDetails;
    if (f.plate && !f.driver) {
      const key = trNormalize(f.plate).replace(/\s+/g, '');
      const hit = state.shipments.find((x) => trNormalize(x.plate).replace(/\s+/g, '') === key);
      if (hit) { f.driver = hit.driver || ''; f.driverPhone = hit.driverPhone || ''; f.driverTC = hit.driverTC || ''; if (!f.company) f.company = hit.company || ''; }
    }
    state.form = f; state.editingId = null; state.error = ''; state.assistantOpen = false;
    goTo('form'); render(); window.scrollTo(0, 0);
    return true;
  }
  return false;
}

function assistantOpLabel(o) {
  const f = o.alanlar || {};
  const parts = Object.keys(f).map((k) => k + ': ' + f[k]);
  const nos = Array.isArray(o.no) ? o.no.map((n) => '#' + n).join(', ') : (o.no ? '#' + o.no : '');
  if (o.tip === 'sil') return 'SİL (çöp kutusuna) → ' + nos;
  if (o.tip === 'ekle') return 'EKLE → ' + parts.join(', ');
  return 'GÜNCELLE ' + nos + ' → ' + parts.join(', ');
}
function assistantPatch(base, f) {
  const r = Object.assign({}, base);
  const up = (v) => String(v == null ? '' : v).trim().toLocaleUpperCase('tr-TR');
  if (f.firma != null) r.company = up(f.firma);
  if (f.plaka != null) r.plate = up(f.plaka);
  if (f.sofor != null) r.driver = up(f.sofor);
  if (f.aciklama != null) r.paintDetails = up(f.aciklama);
  if (f.tarih != null && /^\d{4}-\d{2}-\d{2}$/.test(f.tarih)) r.date = f.tarih;
  if (f.miktar != null && f.miktar !== '') r.tonnage = String(f.miktar);
  if (f.birim != null && ['kg', 'ton', 'm2', 'adet'].indexOf(f.birim) >= 0) r.tonnageUnit = f.birim;
  if (f.birimFiyat !== undefined) r.unitPrice = (f.birimFiyat === null || f.birimFiyat === '') ? '' : parseFloat(f.birimFiyat);
  if (f.boyaMaliyeti !== undefined) r.paintCost = (f.boyaMaliyeti === null || f.boyaMaliyeti === '') ? '' : parseFloat(f.boyaMaliyeti);
  if (f.fatura !== undefined) r.invoiced = f.fatura === true || f.fatura === 'true' || f.fatura === 1;
  return r;
}
async function applyAssistantOps() {
  const P = state.assistantPending; if (!P) return;
  state.assistantPending = null; state.assistantBusy = true; render();
  let ok = 0, fail = 0;
  try { await createAutoBackup('asistan-oncesi', true); } catch (e) {}
  for (const o of P.ops) {
    try {
      const nos = (Array.isArray(o.no) ? o.no : [o.no]).filter((n) => n != null).map(Number);
      if (o.tip === 'ekle') {
        const base = Object.assign(emptyForm(), { id: uid(), seq: nextSeq(), createdAt: Date.now(), tonnageUnit: 'kg' });
        const rec = assistantPatch(base, o.alanlar || {});
        rec.updatedAt = Date.now(); delete rec.photos; rec.photos = [];
        await dbPut(rec); if (supabaseClient) cloudPushShipment(rec).catch(() => {});
        rec._searchIdx = computeSearchIndex(rec); state.shipments.unshift(rec); ok++;
      } else if (o.tip === 'guncelle' || o.tip === 'sil') {
        for (const n of nos) {
          const idx = state.shipments.findIndex((x) => Number(x.seq) === n);
          if (idx === -1) { fail++; continue; }
          const cur = state.shipments[idx];
          if (o.tip === 'sil') {
            const rec = Object.assign({}, cur, { deletedAt: Date.now(), updatedAt: Date.now() }); delete rec._searchIdx;
            await dbPut(rec); markDeleted(cur.id);
            if (supabaseClient) { const k = await cloudDeleteShipment(cur.id); if (k) unmarkDeleted(cur.id); }
            state.shipments.splice(idx, 1); state.trash.unshift(rec); ok++;
          } else {
            const rec = assistantPatch(cur, o.alanlar || {}); rec.updatedAt = Date.now(); delete rec._searchIdx;
            await dbPut(rec); if (supabaseClient) cloudPushShipment(rec).catch(() => {});
            rec._searchIdx = computeSearchIndex(rec); state.shipments[idx] = rec; ok++;
          }
        }
      } else fail++;
    } catch (e) { fail++; }
  }
  state.shipments.sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0));
  try { await refreshStorageInfo(); } catch (e) {}
  state.assistantMsgs.push({ r: 'a', t: '✓ ' + ok + ' işlem uygulandı' + (fail ? ', ' + fail + ' işlem yapılamadı.' : '.') + ' (Öncesinde otomatik yedek alındı; silinenler Çöp Kutusu\'nda.)' });
  state.assistantBusy = false; render();
}

let AIX = null, AISRC = [], AIABR = null, AICUR = 0, AIFAIL = 0, AIAUD = null;
const AICACHE = new Map();
function assistantStopSpeak() {
  try { AICUR++; if (AIABR) { AIABR.abort(); AIABR = null; } AISRC.forEach((x) => { try { x.onended = null; x.stop(); } catch (e) {} }); AISRC = []; } catch (e) {}
  try { if (AIAUD) { AIAUD.onended = null; AIAUD.pause(); AIAUD = null; } } catch (e) {}
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
}
function assistantBrowserVoice(t) {
  try {
    const ss = window.speechSynthesis; if (!ss) return;
    ss.cancel();
    const L = (ss.getVoices() || []).filter((v) => /^tr/i.test(v.lang));
    const male = L.find((v) => /tolga|cem\b|ahmet|yusuf|emre|erkek|\bmale\b|-ama-|-tmc-|-tmd-/i.test(v.name + ' ' + v.voiceURI) && !/female|kad[ıi]n|filiz|seda|yelda|emel/i.test(v.name));
    const v = male || L.find((x) => /google|microsoft|enhanced|premium|neural/i.test(x.name)) || L[0];
    const u = new SpeechSynthesisUtterance(t); u.lang = 'tr-TR'; if (v) u.voice = v; u.rate = 1.1; u.pitch = male ? 0.95 : 0.72;
    ss.speak(u);
  } catch (e) {}
}
async function assistantTtsStream(t, my) {
  AIABR = new AbortController();
  const r = await fetch(SUPABASE_URL + '/functions/v1/ai-sevkiyat', { method: 'POST', signal: AIABR.signal, headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: 'Bearer ' + SUPABASE_PUBLISHABLE_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ tts: t, stream: true }) });
  if (!r.ok || !r.body || /json/.test(r.headers.get('content-type') || '')) { let d = ''; try { const j = await r.json(); d = JSON.stringify(j.detay || j.err || '').slice(0, 90); } catch (e) {} throw new Error('tts ' + d); }
  AIX = AIX || new (window.AudioContext || window.webkitAudioContext)();
  if (AIX.state === 'suspended') AIX.resume();
  const rd = r.body.getReader(), dec = new TextDecoder();
  let buf = '', next = 0, got = 0;
  const play = (b64) => {
    const bin = atob(b64), n = bin.length >> 1; if (!n) return;
    const f = new Float32Array(n);
    for (let k = 0; k < n; k++) { let v = bin.charCodeAt(2 * k) | (bin.charCodeAt(2 * k + 1) << 8); if (v > 32767) v -= 65536; f[k] = v / 32768; }
    const ab = AIX.createBuffer(1, n, 24000); ab.copyToChannel(f, 0);
    const sr = AIX.createBufferSource(); sr.buffer = ab; sr.connect(AIX.destination);
    const st = Math.max(next, AIX.currentTime + 0.03); sr.start(st); next = st + ab.duration; AISRC.push(sr); got++;
  };
  for (;;) {
    const { done, value } = await rd.read(); if (done) break;
    if (my !== AICUR) return;
    buf += dec.decode(value, { stream: true });
    let i; while ((i = buf.indexOf('\n')) >= 0) { const ln = buf.slice(0, i).trim(); buf = buf.slice(i + 1); if (ln) play(ln); }
  }
  if (buf.trim()) play(buf.trim());
  if (!got) throw new Error('tts-bos');
}

/* ============================== WhatsApp'tan sevkiyat ekle ============================== */
function waNormCo(x) { return trNormalize(String(x || '')).replace(/[^A-ZÇĞİÖŞÜ0-9]/g, ''); }
function waDayDiff(a, b) { if (!a || !b) return 999; return Math.abs((new Date(a) - new Date(b)) / 86400000); }
function waIsDup(it, others) {
  const co = waNormCo(it.firma), q = parseFloat(it.miktar), pl = waNormCo(it.plaka);
  const same = (s) => {
    const sc = waNormCo(s.company);
    const coOk = co && sc && (sc === co || sc.indexOf(co) >= 0 || co.indexOf(sc) >= 0);
    if (!coOk) return false;
    const dd = waDayDiff(it.tarih, s.date);
    const sq = parseFloat(s.tonnage);
    if (!isNaN(q) && !isNaN(sq) && Math.abs(q - sq) <= Math.max(1, q * 0.005) && dd <= 1) return true;
    if (pl && waNormCo(s.plate) === pl && dd <= 1) return true;
    return false;
  };
  return state.shipments.some(same) || (others || []).some((o) => o !== it && waIsSameItem(it, o));
}
function waIsSameItem(a, b) {
  return waNormCo(a.firma) === waNormCo(b.firma) && (a.tarih || '') === (b.tarih || '') && parseFloat(a.miktar) === parseFloat(b.miktar) && waNormCo(a.plaka) === waNormCo(b.plaka);
}
function openWhatsApp() {
  state.navMenuOpen = false;
  state.wa = { step: 'pick', files: [], text: '', busy: false, err: '', items: [], msg: '' };
  render();
}
function waCompress(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file); const img = new Image();
    img.onload = () => {
      const max = 1500; let w = img.width, h2 = img.height; const k = Math.min(1, max / Math.max(w, h2));
      w = Math.round(w * k); h2 = Math.round(h2 * k);
      const c = document.createElement('canvas'); c.width = w; c.height = h2; c.getContext('2d').drawImage(img, 0, 0, w, h2);
      URL.revokeObjectURL(url); resolve(c.toDataURL('image/jpeg', 0.72).split(',')[1]);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Görsel açılamadı')); };
    img.src = url;
  });
}
async function waAnalyze() {
  const W = state.wa; if (!W || W.busy) return;
  const ta = document.getElementById('wa-text'); if (ta) W.text = ta.value;
  if (!W.files.length && !W.text.trim()) { W.err = 'Ekran görüntüsü seç veya mesajları yapıştır.'; render(); return; }
  W.busy = true; W.err = ''; render();
  try {
    if (!supabaseClient) throw new Error('İnternet ve bulut bağlantısı gerekir.');
    const imgs = []; for (const f of W.files.slice(0, 8)) imgs.push(await waCompress(f));
    const companies = Array.from(new Set(state.shipments.map((x) => x.company).filter(Boolean))).slice(0, 200);
    const res = await supabaseClient.functions.invoke('ai-whatsapp', { body: { gorseller: imgs, metin: W.text, bugun: todayISO(), firmalar: companies } });
    const d = res && res.data;
    if (res.error || !d) throw new Error('Okunamadı, tekrar dene.');
    if (d.err) throw new Error(d.err + (d.detay ? ' · ' + JSON.stringify(d.detay).slice(0, 100) : ''));
    const items = (d.kayitlar || []).map((x) => ({ tarih: /^\d{4}-\d{2}-\d{2}$/.test(x.tarih || '') ? x.tarih : todayISO(), saat: x.saat || '', firma: String(x.firma || '').trim().toLocaleUpperCase('tr-TR'), plaka: String(x.plaka || '').trim().toLocaleUpperCase('tr-TR'), miktar: x.miktar == null || x.miktar === '' ? '' : x.miktar, birim: ['kg', 'ton', 'm2', 'adet'].indexOf(x.birim) >= 0 ? x.birim : 'kg', aciklama: String(x.aciklama || '').trim().toLocaleUpperCase('tr-TR'), not: x.not || '' })).filter((x) => x.firma);
    items.forEach((it) => { it.dup = waIsDup(it, items.filter((o) => o !== it && items.indexOf(o) < items.indexOf(it))); it.sel = !it.dup; });
    W.items = items; W.msg = d.mesaj || ''; W.step = 'review';
  } catch (e) { W.err = (e && e.message) || 'Okunamadı.'; }
  W.busy = false; render();
}
async function waSave() {
  const W = state.wa; if (!W) return;
  const chosen = W.items.filter((x) => x.sel);
  if (!chosen.length) return;
  W.busy = true; render();
  try { await createAutoBackup('whatsapp-oncesi', true); } catch (e) {}
  let ok = 0;
  for (const it of chosen) {
    try {
      const rec = Object.assign(emptyForm(), { id: uid(), seq: nextSeq(), createdAt: Date.now(), updatedAt: Date.now(), photos: [] });
      rec.date = it.tarih; rec.company = it.firma; rec.plate = it.plaka; rec.paintDetails = it.aciklama;
      if (it.miktar !== '') { rec.tonnage = String(it.miktar); rec.tonnageUnit = it.birim || 'kg'; }
      await dbPut(rec); if (supabaseClient) cloudPushShipment(rec).catch(() => {});
      rec._searchIdx = computeSearchIndex(rec); state.shipments.unshift(rec); ok++;
    } catch (e) {}
  }
  state.shipments.sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0));
  try { await refreshStorageInfo(); } catch (e) {}
  state.wa = null; state.successMsg = ok + ' sevkiyat kaydedildi (WhatsApp).'; setTimeout(() => { state.successMsg = ''; render(); }, 6000);
  render();
}
function renderWhatsAppModal() {
  const W = state.wa;
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(17,24,39,.55)', zIndex: '70', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }, onclick: () => { if (!W.busy) { state.wa = null; render(); } } });
  const box = h('div', { onclick: (e) => e.stopPropagation(), style: { background: 'var(--paper)', width: '100%', maxWidth: '560px', borderRadius: '22px 22px 0 0', padding: '14px 14px calc(14px + env(safe-area-inset-bottom))', boxShadow: '0 -12px 40px rgba(0,0,0,.3)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' } }, [
    h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '15px' } }, [ic('whatsapp', 19, '#16A34A'), ' WhatsApp\'tan sevkiyat ekle']),
    h('span', { onclick: () => { if (!W.busy) { state.wa = null; render(); } }, style: { cursor: 'pointer', color: 'var(--inkSoft)', fontWeight: '700', padding: '4px 6px', fontSize: '16px' } }, '✕'),
  ]));
  const body = h('div', { style: { overflowY: 'auto', flex: '1' } });
  if (W.step === 'pick') {
    body.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', lineHeight: '1.5', marginBottom: '10px' } }, 'WhatsApp\'ta "Fabrika giden malzeme" grubunu aç, sevkiyat mesajlarının ekran görüntülerini al, buradan seç (en fazla 8). İstersen mesajları kopyalayıp aşağıya da yapıştırabilirsin.'));
    const fi = h('input', { type: 'file', accept: 'image/*', multiple: true, style: { display: 'none' }, onchange: (e) => { W.files = Array.from(e.target.files || []).slice(0, 8); render(); } });
    body.appendChild(fi);
    body.appendChild(btn([ic('image', 16), W.files.length ? ' ' + W.files.length + ' ekran görüntüsü seçildi (değiştir)' : ' Ekran görüntüsü seç'], { type: 'button', onclick: () => fi.click(), style: { width: '100%', justifyContent: 'center', padding: '13px', marginBottom: '10px' } }, 'var(--accent)', 'var(--on-accent)'));
    const ta = h('textarea', { id: 'wa-text', rows: 4, className: 'input', placeholder: 'veya kopyalanan WhatsApp mesajları…', style: { width: '100%', resize: 'vertical', fontSize: '13.5px', fontFamily: "'Inter',sans-serif" } });
    ta.value = W.text || ''; body.appendChild(ta);
    if (W.err) body.appendChild(h('div', { style: { color: 'var(--stamp)', fontSize: '12.5px', margin: '8px 0 0', fontWeight: '600' } }, W.err));
    if (W.busy) body.appendChild(h('div', { style: { textAlign: 'center', padding: '14px', color: 'var(--inkSoft)', fontSize: '13px' } }, 'Mesajlar okunuyor… (yaklaşık 10-20 saniye)'));
    else body.appendChild(btn(['Mesajları oku'], { type: 'button', onclick: waAnalyze, style: { width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px' } }, 'var(--ink)', 'var(--cream)'));
  } else {
    const n = W.items.filter((x) => x.sel).length;
    body.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '8px', lineHeight: '1.5' } }, W.items.length ? (W.items.length + ' sevkiyat bulundu. Daha önce kayıtlı olanlar işaretsiz geldi. Kontrol edip kaydet.') : (W.msg || 'Sevkiyat bulunamadı.')));
    W.items.forEach((it) => {
      const row = h('label', { style: { display: 'flex', gap: '10px', alignItems: 'flex-start', border: '1.5px solid ' + (it.sel ? 'var(--accent)' : 'var(--line)'), borderRadius: '12px', padding: '10px 12px', marginBottom: '8px', background: it.dup ? 'var(--warn-bg)' : 'var(--cream)', cursor: 'pointer' } });
      const cb = h('input', { type: 'checkbox', style: { width: '20px', height: '20px', marginTop: '2px', flex: '0 0 auto' }, onchange: (e) => { it.sel = e.target.checked; render(); } }); cb.checked = !!it.sel;
      row.appendChild(cb);
      row.appendChild(h('div', { style: { flex: '1', minWidth: '0', fontSize: '13px', lineHeight: '1.45' } }, [
        h('div', { style: { fontWeight: '800', fontSize: '14px' } }, it.firma + (it.miktar !== '' ? ' · ' + fmtNum(parseFloat(it.miktar)) + ' ' + (it.birim === 'm2' ? 'm²' : it.birim) : ' · miktar yok')),
        h('div', { style: { color: 'var(--inkSoft)' } }, formatDateTR(it.tarih) + (it.saat ? ' ' + it.saat : '') + (it.plaka ? ' · ' + it.plaka : '')),
        it.aciklama ? h('div', { style: { color: 'var(--inkSoft)' } }, it.aciklama) : null,
        it.dup ? h('div', { style: { color: 'var(--warn)', fontWeight: '700', fontSize: '12px' } }, 'Zaten kayıtlı görünüyor') : null,
        it.not ? h('div', { style: { color: 'var(--inkSoft)', fontSize: '11.5px' } }, '⚠ ' + it.not) : null,
      ].filter(Boolean)));
      body.appendChild(row);
    });
  }
  box.appendChild(body);
  if (W.step === 'review') {
    const n = W.items.filter((x) => x.sel).length;
    box.appendChild(h('div', { style: { display: 'flex', gap: '8px', marginTop: '10px' } }, [
      btn(['Geri'], { type: 'button', onclick: () => { W.step = 'pick'; render(); }, style: { flex: '1', justifyContent: 'center', padding: '12px' } }, 'var(--paper2)', 'var(--ink)'),
      btn([W.busy ? 'Kaydediliyor…' : 'Seçilenleri kaydet (' + n + ')'], { type: 'button', disabled: !n || W.busy, onclick: waSave, style: { flex: '2', justifyContent: 'center', padding: '12px' } }, 'var(--accent)', 'var(--on-accent)'),
    ]));
  }
  overlay.appendChild(box);
  return overlay;
}
function assistantSpeechText(t) {
  let x = String(t);
  x = x.replace(/\(Gemini sesi[^)]*\)/g, ' ');
  x = x.replace(/(\d{1,3}(?:\.\d{3})+)(,\d+)?/g, (m, a, b) => a.replace(/\./g, '') + (b ? ' virgül ' + b.slice(1) : ''));
  x = x.replace(/(\d+),(\d+)/g, '$1 virgül $2');
  x = x.replace(/₺|\bTL\b/g, ' lira ').replace(/\bkg\b/gi, ' kilogram ').replace(/m²|\bm2\b/gi, ' metrekare ').replace(/%\s*(\d+)/g, ' yüzde $1 ').replace(/%/g, ' yüzde ');
  x = x.replace(/\bKDV\b/g, 'kedeve').replace(/[#*_`•→✓🎤\[\]{}<>|]/g, ' ').replace(/\s*[-–—]\s*/g, ', ');
  x = x.replace(/[A-ZÇĞİÖŞÜ]{2,}/g, (w) => { const l = w.toLocaleLowerCase('tr-TR'); return l.charAt(0).toLocaleUpperCase('tr-TR') + l.slice(1); });
  return x.replace(/\s+/g, ' ').replace(/\s+([.,!?])/g, '$1').trim();
}
function assistantSpeakText(t) {
  if (!state.assistantSpeak || !t) return;
  let clean = assistantSpeechText(t);
  // uzun cevapta sadece ilk cümleleri oku (hızlı başlasın)
  if (clean.length > 230) { const parts = clean.split(/(?<=[.!?])\s+/); let acc = ''; for (const x of parts) { if ((acc + ' ' + x).length > 230 && acc) break; acc += (acc ? ' ' : '') + x; } clean = acc.slice(0, 260); }
  if (!clean) return;
  assistantStopSpeak();
  const my = AICUR;
  const attempt = (n) => assistantTtsStream(clean, my).catch((e) => {
    if (my !== AICUR) return;
    if (n < 1) { return new Promise((res) => setTimeout(res, 500)).then(() => (my === AICUR ? attempt(n + 1) : null)); }
    try { state.assistantMsgs.push({ r: 'a', t: '(Ses şu an açılamadı: ' + String(e && e.message || e).slice(0, 80) + ')' }); render(); } catch (x) {}
  });
  attempt(0);
}
function assistantToggleSpeak() {
  state.assistantSpeak = !state.assistantSpeak;
  try { localStorage.setItem('sevkiyat_ai_ses', state.assistantSpeak ? '1' : '0'); } catch (e) {}
  if (!state.assistantSpeak) assistantStopSpeak();
  render();
}

function assistantFixSpeech(text, alts, companies) {
  const N = (x) => trNormalize(String(x || '')).replace(/[^A-ZÇĞİÖŞÜ0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = (x) => N(x).split(' ').filter(Boolean);
  // firma adının ilk kelimesi (ör. SAY MAKİNA -> SAY) konuşmada geçiyor mu?
  const heads = Array.from(new Set(companies.map((c) => words(c)[0]).filter((w) => w && w.length >= 2)));
  const hit = (x) => { const w = words(x); return heads.find((hd) => w.indexOf(hd) >= 0); };
  let best = text;
  if (!hit(text)) { const a = (alts || []).find((x) => hit(x)); if (a) best = a; }
  // sık yanlış duyumlar: tek başına 'hayır/hay ır' firma adı olabilir
  if (!hit(best) && heads.indexOf('SAY') >= 0) best = best.replace(/\b(hayır|hayir|sey|say ı|sayı)\b/gi, 'say');
  const others = (alts || []).filter((x) => x && x !== best).slice(0, 4);
  return best + (others.length ? '\n[Sesle söylendi, yanlış duyulmuş olabilir. Diğer olası duyumlar: ' + others.join(' | ') + '. Firma adı gibi duyulan kelimeyi Firmalar listesindeki en yakın firmayla eşleştir.]' : '\n[Sesle söylendi; firma adlarını Firmalar listesindeki en yakın yazımla eşleştir.]');
}
function assistantMicSR() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  assistantStopSpeak();
  if (state.assistantRec) { try { state.assistantRec.stop(); } catch (e) {} return; }
  const r = new SR(); r.lang = 'tr-TR'; r.interimResults = true; r.continuous = false; r.maxAlternatives = 5;
  const companies = Array.from(new Set(state.shipments.map((x) => x.company).filter(Boolean)));
  try { if (window.SpeechRecognitionPhrase && 'phrases' in r) r.phrases = companies.slice(0, 200).map((c) => new window.SpeechRecognitionPhrase(c, 6)); } catch (e) {}
  state.assistantRec = r; state.assistantListening = true; state.assistantLive = ''; render();
  let alts = [], last = '';
  r.onresult = (e) => {
    alts = []; let t = '';
    for (let i = 0; i < e.results.length; i++) { t += e.results[i][0].transcript; }
    const lastRes = e.results[e.results.length - 1];
    for (let k = 0; k < lastRes.length; k++) alts.push(lastRes[k].transcript);
    last = t; state.assistantLive = t; const el = document.getElementById('ai-live'); if (el) el.textContent = t || 'Dinliyorum…';
  };
  r.onerror = () => { state.assistantRec = null; state.assistantListening = false; state.assistantLive = ''; render(); };
  r.onend = () => {
    state.assistantRec = null; state.assistantListening = false; state.assistantLive = '';
    if (!last.trim()) { render(); return; }
    askAssistant(assistantFixSpeech(last, alts, companies), true);
  };
  try { r.start(); } catch (e) { state.assistantRec = null; state.assistantListening = false; render(); }
}

function assistantMicToggle() {
  if (state.assistantRecorder) { try { state.assistantRecorder.stop(); } catch (e) {} return; }
  if (state.assistantRec) { try { state.assistantRec.stop(); } catch (e) {} return; }
  if (!(window.MediaRecorder && navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { assistantMicSR(); return; }
  assistantStopSpeak();
  try { AIX = AIX || new (window.AudioContext || window.webkitAudioContext)(); if (AIX.state === 'suspended') AIX.resume(); } catch (e) {}
  navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then((stream) => {
    const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
    const mime = types.find((m) => { try { return MediaRecorder.isTypeSupported(m); } catch (e) { return false; } }) || '';
    let rec; try { rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream); } catch (e) { stream.getTracks().forEach((x) => x.stop()); assistantMicSR(); return; }
    const chunks = []; let spoke = false, lastVoice = 0, t0 = Date.now(), timer = null, an = null, src = null, ctx2 = null, cancelled = false;
    rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = () => {
      clearInterval(timer); stream.getTracks().forEach((x) => x.stop());
      try { src && src.disconnect(); ctx2 && ctx2.close(); } catch (e) {}
      state.assistantRecorder = null; state.assistantListening = false; state.assistantLive = '';
      if (cancelled || !spoke || !chunks.length) { render(); return; }
      const blob = new Blob(chunks, { type: rec.mimeType || mime || 'audio/webm' });
      const fr = new FileReader();
      fr.onload = () => { const b64 = String(fr.result).split(',')[1] || ''; askAssistant('', { ses: b64, tip: blob.type || 'audio/webm' }); };
      fr.readAsDataURL(blob);
    };
    try {
      ctx2 = new (window.AudioContext || window.webkitAudioContext)(); src = ctx2.createMediaStreamSource(stream); an = ctx2.createAnalyser(); an.fftSize = 1024; src.connect(an);
    } catch (e) { an = null; }
    const data = an ? new Uint8Array(an.fftSize) : null;
    let noise = 0, nN = 0, quietSince = 0;
    timer = setInterval(() => {
      const now = Date.now();
      if (an) {
        an.getByteTimeDomainData(data); let sum = 0; for (let k = 0; k < data.length; k++) { const v = (data[k] - 128) / 128; sum += v * v; }
        const rms = Math.sqrt(sum / data.length);
        if (now - t0 < 600) { noise = (noise * nN + rms) / (nN + 1); nN++; return; }
        const hi = Math.max(0.025, noise * 3 + 0.01), lo = Math.max(0.012, noise * 1.8 + 0.006);
        if (rms > hi) { spoke = true; lastVoice = now; }
        else if (rms > lo && spoke) { lastVoice = now; }
        const el = document.getElementById('ai-live'); if (el) el.textContent = !spoke ? 'Dinliyorum… konuş' : (now - lastVoice > 900 ? 'Bitirdiysen mikrofona dokun…' : 'Dinliyorum…');
        if (spoke && now - lastVoice > 2600) { try { rec.stop(); } catch (e) {} }
        else if (!spoke && now - t0 > 9000) { cancelled = true; try { rec.stop(); } catch (e) {} }
      } else if (now - t0 > 6000) { spoke = true; try { rec.stop(); } catch (e) {} }
      if (now - t0 > 30000) { try { rec.stop(); } catch (e) {} }
    }, 100);
    state.assistantRecorder = rec; state.assistantListening = true; state.assistantLive = ''; render();
    rec.start(250);
  }).catch(() => {
    state.assistantMsgs.push({ r: 'a', t: 'Mikrofon izni verilmedi. Ayarlardan bu uygulamaya mikrofon izni ver.' }); render();
  });
}
async function askAssistant(text, fromVoice) {
  text = String(text || '').trim();
  const audio = fromVoice && fromVoice.ses ? fromVoice : null;
  if ((!text && !audio) || state.assistantBusy) return;
  state.assistantMsgs.push({ r: 'u', t: audio ? '🎤 …' : text.split('\n[Sesle')[0] });
  const myMsg = state.assistantMsgs[state.assistantMsgs.length - 1];
  const tStart = Date.now();
  assistantStopSpeak(); try { if (window.speechSynthesis) window.speechSynthesis.getVoices(); AIX = AIX || new (window.AudioContext || window.webkitAudioContext)(); if (AIX.state === 'suspended') AIX.resume(); } catch (e) {}
  state.assistantBusy = true; state.assistantInput = ''; render();
  let reply = '', opened = false;
  try {
    if (!supabaseClient) throw new Error('Asistan için internet ve bulut bağlantısı gerekir.');
    const companies = Array.from(new Set(state.shipments.map((s) => s.company).filter(Boolean))).slice(0, 150);
    const hist = assistantLog().flatMap((x) => [{ r: 'u', t: x.u }, { r: 'a', t: x.a }]);
    if (audio && state.assistantNewHint) { state.assistantNewHint = false; text = 'Yeni sevkiyat girmek istiyorum. Ses kaydında söylediklerimle yeni sevkiyat formunu doldurup aç (islem=ac, hedef=yeni_sevkiyat). Söylemediğim alanları boş bırak.'; }
    const body = { metin: text, firmalar: companies, bugun: todayISO(), veri: assistantData(), gecmis: hist };
    if (audio) { body.ses = audio.ses; body.sesTip = audio.tip; }
    const res = await supabaseClient.functions.invoke('ai-sevkiyat', { body });
    const d = res && res.data;
    if (audio) { text = (d && d.duyulan) ? String(d.duyulan).trim() : ''; myMsg.t = text ? '🎤 ' + text : '🎤 (ses)'; }
    if (res.error || !d) throw new Error('Asistan şu an cevap veremedi.');
    if (d.err) throw new Error(d.err + (d.detay ? ' · ' + (typeof d.detay === 'string' ? d.detay : JSON.stringify(d.detay).slice(0, 120)) : ''));
    reply = d.cevap || d.mesaj || 'Anlayamadım, biraz daha açık yazar mısın?';
    state.assistantMeta = ((Date.now() - tStart) / 1000).toFixed(1) + ' sn' + (d.ms ? ' (yapay zeka ' + (d.ms / 1000).toFixed(1) + ' sn)' : '');
    if (d.islem === 'uygula' && Array.isArray(d.islemler) && d.islemler.length) {
      state.assistantPending = { ops: d.islemler.slice(0, 200), text };
      state.assistantMsgs.push({ r: 'a', t: reply, m: state.assistantMeta || '' }); state.assistantMeta = '';
      assistantSave(text, reply); assistantSpeakText(reply);
      state.assistantBusy = false; render();
      return;
    }
    if (d.islem === 'ac') {
      if (state.pinEnabled === false || true) { /* yetki: sadece form açılır, kayıt kullanıcıdadır */ }
      state.assistantMsgs.push({ r: 'a', t: reply });
      assistantSave(text, reply); assistantSpeakText(reply);
      state.assistantBusy = false;
      opened = assistantOpenTarget(d);
      if (!opened) { state.assistantMsgs.push({ r: 'a', t: 'Bu ekranı açamadım.' }); render(); }
      return;
    }
  } catch (e) { reply = (e && e.message) ? e.message : 'Asistan şu an cevap veremedi.'; if (audio && myMsg.t === '🎤 …') myMsg.t = '🎤 (ses gönderilemedi)'; }
  state.assistantMsgs.push({ r: 'a', t: reply, m: state.assistantMeta || '' }); state.assistantMeta = '';
  assistantSpeakText(reply);
  if (!/cevap veremedi|internet|yoğun|Yetkisiz/.test(reply)) assistantSave(text, reply);
  state.assistantBusy = false; render();
  setTimeout(() => { const L = document.getElementById('ai-log'); if (L) L.scrollTop = L.scrollHeight; }, 30);
}
function renderAssistantModal() {
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(17,24,39,.55)', zIndex: '70', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }, onclick: () => { assistantStopSpeak(); state.assistantOpen = false; state.assistantNewHint = false; render(); } });
  const box = h('div', { onclick: (e) => e.stopPropagation(), style: { background: 'var(--paper)', width: '100%', maxWidth: '560px', borderRadius: '22px 22px 0 0', padding: '14px 14px calc(14px + env(safe-area-inset-bottom))', boxShadow: '0 -12px 40px rgba(0,0,0,.3)', display: 'flex', flexDirection: 'column', maxHeight: '86vh' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' } }, [
    h('div', { style: { display: 'flex', alignItems: 'center', gap: '7px', fontWeight: '800', fontSize: '15px' } }, [ic('sparkle', 17, 'var(--accent)'), ' Asistan']),
    h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, [
      h('span', { onclick: assistantToggleSpeak, title: 'Sesli cevap', style: { cursor: 'pointer', color: state.assistantSpeak ? 'var(--accent)' : 'var(--inkSoft)', padding: '4px', display: 'inline-flex' } }, [ic(state.assistantSpeak ? 'speaker' : 'speakeroff', 22)]),
      h('span', { onclick: () => { assistantStopSpeak(); state.assistantOpen = false; state.assistantNewHint = false; render(); }, style: { cursor: 'pointer', color: 'var(--inkSoft)', fontWeight: '700', padding: '4px 6px', fontSize: '16px' } }, '✕'),
    ]),
  ]));
  const log = h('div', { id: 'ai-log', style: { overflowY: 'auto', flex: '1', minHeight: '28vh', maxHeight: '52vh', padding: '2px', display: 'flex', flexDirection: 'column', gap: '8px' } });
  state.assistantMsgs.forEach((m) => {
    const me = m.r === 'u';
    log.appendChild(h('div', { style: { alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '86%', padding: '9px 12px', borderRadius: me ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: me ? 'var(--accent)' : 'var(--cream)', color: me ? 'var(--on-accent)' : 'var(--ink)', border: me ? 'none' : '1.5px solid var(--line)', fontSize: '13.5px', lineHeight: '1.45', whiteSpace: 'pre-wrap' } }, m.m ? [m.t, h('div', { style: { fontSize: '10px', opacity: '.55', marginTop: '3px' } }, '⏱ ' + m.m)] : m.t));
  });
  if (state.assistantBusy) log.appendChild(h('div', { style: { alignSelf: 'flex-start', padding: '9px 12px', borderRadius: '14px', background: 'var(--cream)', border: '1.5px solid var(--line)', color: 'var(--inkSoft)', fontSize: '13px' } }, 'Düşünüyor…'));
  box.appendChild(log);
  if (state.assistantPending) {
    const card = h('div', { style: { border: '1.5px solid var(--accent)', borderRadius: '12px', padding: '10px', margin: '8px 0 2px', background: 'var(--cream)', maxHeight: '26vh', overflowY: 'auto' } });
    card.appendChild(h('div', { style: { fontWeight: '800', fontSize: '12.5px', marginBottom: '5px' } }, state.assistantPending.ops.length + ' işlem uygulanacak:'));
    state.assistantPending.ops.slice(0, 40).forEach((o) => card.appendChild(h('div', { style: { fontSize: '12px', padding: '2px 0', color: o.tip === 'sil' ? 'var(--stamp)' : 'var(--ink)' } }, '• ' + assistantOpLabel(o))));
    if (state.assistantPending.ops.length > 40) card.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)' } }, '… ve ' + (state.assistantPending.ops.length - 40) + ' işlem daha'));
    box.appendChild(card);
    box.appendChild(h('div', { style: { display: 'flex', gap: '8px', marginTop: '8px' } }, [
      btn(['Uygula'], { type: 'button', onclick: () => applyAssistantOps(), style: { flex: '1', justifyContent: 'center', padding: '11px' } }, 'var(--accent)', 'var(--on-accent)'),
      btn(['Vazgeç'], { type: 'button', onclick: () => { state.assistantPending = null; state.assistantMsgs.push({ r: 'a', t: 'Vazgeçildi, hiçbir şey değişmedi.' }); render(); }, style: { flex: '1', justifyContent: 'center', padding: '11px' } }, 'var(--paper2)', 'var(--ink)'),
    ]));
  }
  if (state.assistantMsgs.length <= 1) {
    const sug = h('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '8px 0 2px' } });
    ['Bu ay toplam tutar ne kadar?', 'En çok iş yaptığımız firma hangisi?', 'Faturası kesilmemiş kaç sevkiyat var?'].forEach((q) => sug.appendChild(h('button', { type: 'button', onclick: () => askAssistant(q), style: { border: '1.5px solid var(--line)', background: 'var(--cream)', color: 'var(--ink)', borderRadius: '999px', padding: '6px 11px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' } }, q)));
    box.appendChild(sug);
  }
  if (state.assistantListening) box.appendChild(h('div', { id: 'ai-live', style: { margin: '8px 0 0', padding: '8px 12px', borderRadius: '12px', background: 'var(--danger-bg)', color: 'var(--stamp)', fontWeight: '700', fontSize: '13.5px', textAlign: 'center' } }, state.assistantLive || 'Dinliyorum… konuş'));
  const row = h('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'flex-end' } });
  const ta = h('textarea', { id: 'ai-input', rows: 2, className: 'input', placeholder: 'Sorunu veya yapmak istediğini yaz…', style: { flex: '1', resize: 'none', fontFamily: "'Inter',sans-serif", fontSize: '14px' }, oninput: (e) => { state.assistantInput = e.target.value; }, onkeydown: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askAssistant(e.target.value); } } });
  ta.value = state.assistantInput || '';
  row.appendChild(ta);
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR || window.MediaRecorder) row.appendChild(h('button', { type: 'button', title: state.assistantListening ? 'Durdur' : 'Konuş', className: state.assistantListening ? 'ai-mic ai-mic-on' : 'ai-mic', onclick: assistantMicToggle }, [ic(state.assistantListening ? 'sparkle' : 'mic', 24)]));
  row.appendChild(btn(['Gönder'], { type: 'button', disabled: state.assistantBusy, onclick: () => { const el = document.getElementById('ai-input'); askAssistant(el ? el.value : state.assistantInput); }, style: { height: '44px', padding: '0 16px', justifyContent: 'center', flex: '0 0 auto' } }, 'var(--accent)', 'var(--on-accent)'));
  box.appendChild(row);
  box.appendChild(h('div', { style: { fontSize: '10.5px', color: 'var(--inkSoft)', marginTop: '6px', textAlign: 'center' } }, 'Değişiklikler sen Uygula\'ya basınca yapılır; öncesinde otomatik yedek alınır.'));
  overlay.appendChild(box);
  setTimeout(() => { const L = document.getElementById('ai-log'); if (L) L.scrollTop = L.scrollHeight; }, 20);
  return overlay;
}

function daysSince(ts) { return Math.floor((Date.now() - ts) / 86400000); }
function formatBackupLabel(ts) {
  const d = daysSince(ts);
  const timeStr = new Date(ts).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  if (d === 0) return 'Son yedek: bugün ' + new Date(ts).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  if (d === 1) return 'Son yedek: dün ' + new Date(ts).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  return 'Son yedek: ' + timeStr + ' (' + d + ' gün önce)';
}

const TRASH_DAYS = 30;
function applyRecords(list) {
  const live = [], trash = [];
  list.forEach((r) => { if (r.deletedAt) trash.push(r); else live.push(r); });
  live.sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0));
  state.shipments = reindexSearch(live);
  state.trash = trash.sort((a, b) => (b.deletedAt || 0) - (a.deletedAt || 0));
}
async function purgeExpiredTrash() {
  const limit = Date.now() - TRASH_DAYS * 86400000;
  const old = state.trash.filter((t) => (t.deletedAt || 0) < limit);
  for (const t of old) { try { await dbDelete(t.id); mediaRemoveRec(t); } catch (e) {} }
  if (old.length) state.trash = state.trash.filter((t) => (t.deletedAt || 0) >= limit);
}
async function loadAll() {
  state.loading = true; render();
  try {
    const list = await dbGetAll();
    applyRecords(list);
    await purgeExpiredTrash();
    const quotes = await dbGetAllQuotes();
    quotes.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.createdAt - a.createdAt);
    state.quotes = quotes;
  } catch (e) { state.error = 'Kayıtlar okunamadı.'; }
  state.loading = false;
  await ensurePersistentStorage();
  await refreshStorageInfo();
  render();
  if (supabaseClient) { syncFromCloud().catch(() => {}); } else mediaAfterSync();
  setTimeout(() => { maybeDailyAutoBackup(); }, 5000);
  setTimeout(() => { window.sevkCheckAct(); }, 50);
}
async function refreshStorageInfo() {
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const est = await navigator.storage.estimate();
      state.storageInfo = { usage: est.usage || 0, quota: est.quota || 0, supported: true, persistent: state.storageInfo.persistent };
    } else {
      state.storageInfo = { usage: 0, quota: 0, supported: false, persistent: state.storageInfo.persistent };
    }
  } catch (e) { state.storageInfo = { usage: 0, quota: 0, supported: false, persistent: state.storageInfo.persistent }; }
}
async function ensurePersistentStorage() {
  try {
    if (navigator.storage && navigator.storage.persist) {
      const already = navigator.storage.persisted ? await navigator.storage.persisted() : false;
      state.storageInfo.persistent = already || (await navigator.storage.persist());
    } else {
      state.storageInfo.persistent = null;
    }
  } catch (e) { state.storageInfo.persistent = null; }
}

function detectCompanyFromText(text) {
  const companies = Array.from(new Set(state.shipments.map((s) => s.company))).filter(Boolean);
  if (!companies.length) return '';
  const tNorm = trNormalize(text);
  const byLen = companies.slice().sort((a, b) => b.length - a.length);
  for (const c of byLen) { const cn = trNormalize(c); if (cn.length >= 3 && tNorm.indexOf(cn) !== -1) return c; }
  const words = text.split(/\s+/).map((w) => w.replace(/[.,!?;:()]/g, ''));
  for (const w of words) {
    if (!w) continue;
    const wNorm = trNormalize(w);
    for (const c of companies) {
      const cNorm = trNormalize(c);
      if (cNorm.length >= 3 && (wNorm === cNorm || wNorm.startsWith(cNorm))) return c;
    }
  }
  return '';
}
function parseQuickEntryText(text) {
  const result = { company: '', tonnage: '', tonnageUnit: '', paintDetails: '', plate: '' };
  const plateMatch = text.toLocaleUpperCase('tr-TR').match(/(?:^|[^0-9A-ZÇĞİÖŞÜ])(0[1-9]|[1-7]\d|8[01])\s*([A-ZÇĞİÖŞÜ]{1,3})\s*(\d{2,4})(?![0-9A-Z])/);
  if (plateMatch && ['KG', 'M2', 'TON', 'ADET'].indexOf(plateMatch[2]) === -1) result.plate = plateMatch[1] + ' ' + plateMatch[2] + ' ' + plateMatch[3];
  result.company = detectCompanyFromText(text);

  const qtyMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(kg|ton|m2|m²|adet)\b/i);
  if (qtyMatch) {
    result.tonnage = qtyMatch[1].replace(',', '.');
    const u = qtyMatch[2].toLowerCase();
    result.tonnageUnit = u === 'kg' ? 'kg' : (u === 'm2' || u === 'm²') ? 'm2' : u === 'ton' ? 'ton' : 'adet';
  }

  const tags = [];
  if (/kumlama/i.test(text)) tags.push('KUMLAMA');
  if (/\bboya/i.test(text)) tags.push('BOYA');
  if (/astar/i.test(text)) tags.push('ASTAR');
  if (/sonkat/i.test(text)) tags.push('SONKAT');
  if (/tiner/i.test(text)) tags.push('TİNER');
  const ralMatch = text.match(/RAL\s?\d{3,4}/i);
  if (ralMatch) tags.push(ralMatch[0].toUpperCase());
  result.paintDetails = tags.join(' ');

  return result;
}

function lastRecordOfCompany(name) {
  return state.shipments.find((s) => s.company === name) || null;
}
function startQuickForm(parsed) {
  const f = emptyForm();
  if (parsed.company) f.company = parsed.company;
  if (parsed.plate) f.plate = parsed.plate;
  if (parsed.tonnage) { f.tonnage = parsed.tonnage; f.tonnageUnit = parsed.tonnageUnit || 'kg'; }
  if (parsed.paintDetails) f.paintDetails = parsed.paintDetails;
  // Firma biliniyorsa boya detayını son kayıttan getir
  const last = f.company ? lastRecordOfCompany(f.company) : null;
  if (last && !f.paintDetails && last.paintDetails) f.paintDetails = last.paintDetails;
  // Plaka biliniyorsa şoför bilgilerini getir
  if (f.plate) {
    const key = trNormalize(f.plate).replace(/\s+/g, '');
    const hit = state.shipments.find((x) => trNormalize(x.plate).replace(/\s+/g, '') === key);
    if (hit) { f.driver = hit.driver || ''; f.driverPhone = hit.driverPhone || ''; f.driverTC = hit.driverTC || ''; if (!f.company) f.company = hit.company || ''; }
  }
  state.form = f; state.editingId = null; state.error = '';
  state.quickEntryNotice = true; state.quickEntryText = '';
  goTo('form'); render();
}
function goTo(view) {
  if (state.view === view) return;
  state.navStack.push(state.view);
  state.view = view;
}
function goBack() {
  state.view = state.navStack.length ? state.navStack.pop() : 'list';
}
function nextSeq() {
  return state.shipments.reduce((max, s) => Math.max(max, s.seq || 0), 0) + 1;
}
function filteredShipments() {
  const q = state.query.trim() ? trNormalize(state.query.trim()) : '';
  const digits = q.replace(/[^0-9]/g, '');
  return state.shipments.filter((s) => {
    if (state.companyFilter && s.company !== state.companyFilter) return false;
    if (state.tonnageFilter === 'missing' && s.tonnage) return false;
    if (state.tonnageFilter === 'filled' && !s.tonnage) return false;
    if (state.invoicedFilter === 'yes' && !s.invoiced) return false;
    if (state.invoicedFilter === 'no' && s.invoiced) return false;
    if (state.dateFrom && s.date && s.date < state.dateFrom) return false;
    if (state.dateTo && s.date && s.date > state.dateTo) return false;
    if (!q) return true;
    const seqStr = String(s.seq).padStart(4, '0');
    return (
      (digits.length > 0 && seqStr.includes(digits)) ||
      (s._searchIdx || computeSearchIndex(s)).includes(q) ||
      (digits.length > 0 && (s.driverTC || '').includes(digits))
    );
  });
}

async function saveShipment() {
  const f = state.form;
  const wasEdit = !!state.editingId;
  state.saving = true; state.error = ''; render();
  const record = state.editingId
    ? Object.assign({}, state.shipments.find((s) => s.id === state.editingId), {
        date: f.date, company: f.company.trim().toUpperCase(), plate: f.plate.trim().toUpperCase(),
        driver: f.driver.trim().toUpperCase(), driverPhone: f.driverPhone.trim().toUpperCase(),
        driverTC: (f.driverTC || '').trim(), paintDetails: f.paintDetails.trim().toUpperCase(), signature: f.signature,
        tonnage: f.tonnage, tonnageUnit: f.tonnageUnit || 'kg', invoiced: !!f.invoiced, photos: f.photos,
      })
    : {
        id: uid(), seq: nextSeq(), date: f.date,
        company: f.company.trim().toUpperCase(), plate: f.plate.trim().toUpperCase(),
        driver: f.driver.trim().toUpperCase(), driverPhone: f.driverPhone.trim().toUpperCase(),
        driverTC: (f.driverTC || '').trim(), paintDetails: f.paintDetails.trim().toUpperCase(), signature: f.signature,
        tonnage: f.tonnage, tonnageUnit: f.tonnageUnit || 'kg', invoiced: !!f.invoiced, photos: f.photos, createdAt: Date.now(),
      };
  record.updatedAt = Date.now();
  try {
    await dbPut(record);
    if (supabaseClient) cloudPushShipment(record).catch(() => {});
    record._searchIdx = computeSearchIndex(record);
    if (state.editingId) { const idx = state.shipments.findIndex((s) => s.id === state.editingId); state.shipments[idx] = record; }
    else state.shipments.unshift(record);
    state.shipments.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.createdAt - a.createdAt);
    state.editingId = null; state.form = emptyForm(); state.navStack = []; state.view = 'list';
    await refreshStorageInfo();
    scheduleAutoBackup(); // hatırlatma yok: değişiklikten sonra kendiliğinden yedeklenir
  } catch (e) { state.error = 'Kayıt cihaza yazılamadı (' + (e && e.message ? e.message : 'bilinmeyen hata') + ').'; }
  state.saving = false; render();
}
function requestDelete(s) { state.pendingDelete = s; render(); }
async function confirmDelete() {
  const s = state.pendingDelete;
  if (!s) return;
  state.error = '';
  try {
    const rec = Object.assign({}, s, { deletedAt: Date.now(), updatedAt: Date.now() });
    delete rec._searchIdx;
    await dbPut(rec);
    unmarkRestored(s.id);
    markDeleted(s.id);
    if (supabaseClient) {
      const ok = await cloudDeleteShipment(s.id);
      if (ok) unmarkDeleted(s.id);
      else state.error = 'Kayıt çöp kutusuna taşındı, ancak bulutta işaretlenemedi — bir sonraki senkronda tekrar denenecek.';
    }
    state.shipments = state.shipments.filter((x) => x.id !== s.id);
    state.trash.unshift(rec);
    state.navStack = []; state.view = 'list'; state.selectedId = null;
    if (!state.error) { state.successMsg = 'Kayıt çöp kutusuna taşındı (' + TRASH_DAYS + ' gün içinde geri alınabilir).'; setTimeout(() => { state.successMsg = ''; render(); }, 6000); }
    await refreshStorageInfo();
  } catch (e) {
    state.error = 'Silme işlemi başarısız oldu.';
  }
  state.pendingDelete = null; render();
}
function openEdit(s) {
  state.form = { date: s.date, company: s.company, plate: s.plate, driver: s.driver, driverPhone: s.driverPhone || '', driverTC: s.driverTC || '', paintDetails: s.paintDetails || '', signature: s.signature || null, tonnage: s.tonnage || '', tonnageUnit: s.tonnageUnit || 'ton', invoiced: !!s.invoiced, photos: s.photos || [] };
  state.editingId = s.id; state.error = ''; goTo('form'); render();
}
function duplicateShipment(s) {
  state.form = Object.assign(emptyForm(), {
    company: s.company || '', plate: s.plate || '', driver: s.driver || '',
    driverPhone: s.driverPhone || '', driverTC: s.driverTC || '',
    paintDetails: s.paintDetails || '', tonnage: s.tonnage || '', tonnageUnit: s.tonnageUnit || 'kg',
  });
  state.editingId = null;
  state.error = '';
  state.quickEntryNotice = false;
  goTo('form');
  render();
}

/* ---- Excel ---- */
function buildCostRows(list) {
  return list.map((s) => ({
    'Sevk Tarihi': formatDateTR(s.date),
    'Firma Adı': s.company,
    'Boya Detayları': s.paintDetails || '',
    'Malzeme Miktarı': s.tonnage ? s.tonnage : '⚠ GİRİLMEMİŞ',
    Birim: s.tonnage ? unitLabel(s.tonnageUnit) : '',
    'Fatura Durumu': s.invoiced ? 'KESİLDİ' : '⚠ KESİLMEDİ',
    'Kullanılan Astar': s.astarUsed || '',
    'Kullanılan Sonkat': s.topcoatUsed || '',
    Tiner: s.thinnerUsed || '',
    'RAL Kodu': s.ralCode || '',
    'Birim Fiyat': (s.unitPrice !== undefined && s.unitPrice !== '' && !isNaN(parseFloat(s.unitPrice))) ? parseFloat(s.unitPrice) : '',
    Tutar: costAmount(s) !== null ? costAmount(s) : '',
    'Boya Maliyeti': (s.paintCost !== undefined && s.paintCost !== '' && !isNaN(parseFloat(s.paintCost))) ? parseFloat(s.paintCost) : '',
    'Net Tutar': netAmount(s) !== null ? netAmount(s) : '',
    ['KDV Tutarı (%' + getVatRate() + ')']: costAmount(s) !== null ? Math.round(vatAmount(costAmount(s)) * 100) / 100 : '',
    'KDV Dahil Tutar': costAmount(s) !== null ? Math.round(withVat(costAmount(s)) * 100) / 100 : '',
  }));
}
function styleCostSheet(ws) {
  ws['!cols'] = [{ wch: 12 }, { wch: 22 }, { wch: 30 }, { wch: 14 }, { wch: 8 }, { wch: 13 }, { wch: 14 }, { wch: 14 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 16 }];
  ws['!margins'] = { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4, header: 0, footer: 0 };
  ws['!pageSetup'] = { fitToWidth: 1, fitToHeight: 1, orientation: 'landscape' };
}
function highlightCostSheet(ws, list) {
  list.forEach((s, i) => {
    if (!s.tonnage) { const ref = XLSX.utils.encode_cell({ r: i + 1, c: 3 }); if (ws[ref]) ws[ref].s = { fill: { patternType: 'solid', fgColor: { rgb: 'FFF3DCD3' } }, font: { color: { rgb: 'FFC1440E' }, bold: true } }; }
    if (!s.invoiced) { const ref2 = XLSX.utils.encode_cell({ r: i + 1, c: 5 }); if (ws[ref2]) ws[ref2].s = { fill: { patternType: 'solid', fgColor: { rgb: 'FFEFE6D2' } }, font: { color: { rgb: 'FFB08A2E' }, bold: true } }; }
  });
}
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
function buildQuoteRows(list) {
  return list.map((q) => ({
    Tarih: formatDateTR(q.date),
    'Firma Adı': q.company,
    'Yapılacak İş': q.work || '',
    'Boya Kalınlığı': q.paintThickness || '',
    'İşin Tonajı': q.tonnage || '',
    Birim: q.tonnage ? (q.tonnageUnit || '') : '',
    'Teklif Fiyatı': (q.price !== undefined && q.price !== '' && !isNaN(parseFloat(q.price))) ? parseFloat(q.price) : '',
    Durum: (QUOTE_STATUSES[q.status] || QUOTE_STATUSES.bekliyor).label,
    Not: q.notes || '',
  }));
}
async function exportQuotesExcel(list) {
  if (!list.length) { state.error = 'Aktarılacak teklif yok.'; render(); return; }
  try {
    const ws = XLSX.utils.json_to_sheet(buildQuoteRows(list));
    ws['!cols'] = [{ wch: 12 }, { wch: 22 }, { wch: 26 }, { wch: 14 }, { wch: 12 }, { wch: 8 }, { wch: 14 }, { wch: 16 }, { wch: 30 }];
    ws['!margins'] = { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4, header: 0, footer: 0 };
    ws['!pageSetup'] = { fitToWidth: 1, fitToHeight: 1, orientation: 'landscape' };
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teklifler');
    const bytes = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
    await saveOrShareFile(bytes, 'teklifler-' + todayISO() + '.xlsx', XLSX_MIME, { [XLSX_MIME]: ['.xlsx'] });
  } catch (e) { state.error = 'Excel dosyası oluşturulurken bir sorun oluştu.'; render(); }
}
async function exportCostExcel(list) {
  if (!list.length) { state.error = 'Aktarılacak kayıt yok.'; render(); return; }
  try {
    const ws = XLSX.utils.json_to_sheet(buildCostRows(list));
    styleCostSheet(ws);
    highlightCostSheet(ws, list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Maliyet');
    const bytes = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
    await saveOrShareFile(bytes, 'maliyet-' + todayISO() + '.xlsx', XLSX_MIME, { [XLSX_MIME]: ['.xlsx'] });
  } catch (e) { state.error = 'Excel dosyası oluşturulurken bir sorun oluştu.'; render(); }
}
async function exportExcel(list, isBackup) {
  if (!list.length) { state.error = 'Aktarılacak kayıt yok.'; render(); return; }
  const rows = list.map((s) => Object.assign(
    isBackup ? { ID: s.id } : {},
    {
      'Sevk No': s.seq, 'Sevk Tarihi': formatDateTR(s.date), 'Firma Adı': s.company,
      'Araç Plakası': s.plate, 'Şoför Adı': s.driver, 'Şoför Telefonu': s.driverPhone || '', 'Şoför TC': s.driverTC || '',
      'Malzeme Miktarı': s.tonnage ? s.tonnage : '⚠ MİKTAR GİRİLMEMİŞ', Birim: s.tonnage ? unitLabel(s.tonnageUnit) : '',
      'Fatura Durumu': s.invoiced ? 'KESİLDİ' : '⚠ KESİLMEDİ',
      'Boya Detayları': s.paintDetails || '', İmza: s.signature ? 'VAR' : 'YOK', 'Görsel Sayısı': s.photos ? s.photos.length : 0,
    }
  ));
  try {
    const ws = XLSX.utils.json_to_sheet(rows);
    const tonnageCol = isBackup ? 8 : 7;
    const invoicedCol = isBackup ? 10 : 9;
    list.forEach((s, i) => {
      if (!s.tonnage) { const ref = XLSX.utils.encode_cell({ r: i + 1, c: tonnageCol }); if (ws[ref]) ws[ref].s = { fill: { patternType: 'solid', fgColor: { rgb: 'FFF3DCD3' } }, font: { color: { rgb: 'FFC1440E' }, bold: true } }; }
      if (!s.invoiced) { const ref2 = XLSX.utils.encode_cell({ r: i + 1, c: invoicedCol }); if (ws[ref2]) ws[ref2].s = { fill: { patternType: 'solid', fgColor: { rgb: 'FFEFE6D2' } }, font: { color: { rgb: 'FFB08A2E' }, bold: true } }; }
    });
    ws['!margins'] = { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4, header: 0, footer: 0 };
    ws['!pageSetup'] = { fitToWidth: 1, fitToHeight: 1, orientation: 'landscape' };
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Sevkiyatlar');
    if (isBackup) {
      const costWs = XLSX.utils.json_to_sheet(buildCostRows(list));
      styleCostSheet(costWs);
      highlightCostSheet(costWs, list);
      XLSX.utils.book_append_sheet(wb, costWs, 'Maliyet');
    }
    const bytes = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
    const filename = isBackup ? 'sevkiyat-excel-yedek.xlsx' : 'sevkiyat-listesi-' + todayISO() + '.xlsx';
    if (isBackup) {
      const mode = await saveOrShareFile(bytes, filename, XLSX_MIME, { [XLSX_MIME]: ['.xlsx'] });
      const msg = backupStatusMessage(mode);
      if (msg) { state.successMsg = msg; setTimeout(() => { state.successMsg = ''; render(); }, 6000); }
    } else {
      await saveOrShareFile(bytes, filename, XLSX_MIME, { [XLSX_MIME]: ['.xlsx'] });
    }
  } catch (e) { state.error = 'Excel dosyası oluşturulurken bir sorun oluştu.'; render(); }
}
async function handleExcelFile(file) {
  try {
    const buf = await readFileAsArrayBuffer(file);
    const data = new Uint8Array(buf);
    const wb = XLSX.read(data, { type: 'array' });
    if (!wb.SheetNames || !wb.SheetNames.length) throw new Error('Dosyada okunabilir bir sayfa (sheet) bulunamadı.');
    let rawRows = [];
    let chosenSheet = '';
    for (const name of wb.SheetNames) {
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' });
      if (!rows.length) continue;
      const looksLikeShipments = 'Araç Plakası' in rows[0] || 'Şoför Adı' in rows[0] || 'Plaka' in rows[0];
      if (looksLikeShipments) { rawRows = rows; chosenSheet = name; break; }
      if (!rawRows.length) { rawRows = rows; chosenSheet = name; }
    }
    if (!rawRows.length) throw new Error('Dosyadaki hiçbir sayfada (' + wb.SheetNames.join(', ') + ') veri satırı bulunamadı.');
    const list = rawRows.map((r, i) => {
      const tonnageRaw = String(r['Malzeme Miktarı'] || r['Malzeme Tonajı'] || r['Tonaj'] || r['Miktar'] || '').trim();
      const missing = !tonnageRaw || tonnageRaw.indexOf('EKSİK') >= 0 || tonnageRaw.indexOf('GİRİLMEMİŞ') >= 0;
      const unitRaw = String(r['Birim'] || '').trim().toLowerCase();
      const tonnageUnit = unitRaw === 'kg' ? 'kg' : (unitRaw === 'm²' || unitRaw === 'm2') ? 'm2' : unitRaw === 'ton' ? 'ton' : unitRaw === 'adet' ? 'adet' : (unitRaw ? 'adet' : 'ton');
      return {
        id: r['ID'] ? String(r['ID']) : uid(), seq: Number(r['Sevk No'] || r['No']) || i + 1,
        date: parseTRDate(r['Sevk Tarihi'] || r['Tarih']) || todayISO(),
        company: String(r['Firma Adı'] || r['Firma'] || '').toLocaleUpperCase('tr-TR'),
        plate: String(r['Araç Plakası'] || r['Plaka'] || '').toLocaleUpperCase('tr-TR'),
        driver: String(r['Şoför Adı'] || r['Şoför'] || '').toLocaleUpperCase('tr-TR'),
        driverPhone: String(r['Şoför Telefonu'] || r['Telefon'] || ''), driverTC: String(r['Şoför TC'] || r['TC'] || '').replace(/[^0-9]/g, ''),
        tonnage: missing ? '' : tonnageRaw, tonnageUnit,
        invoiced: String(r['Fatura Durumu'] || '').indexOf('KESİLDİ') >= 0 && String(r['Fatura Durumu'] || '').indexOf('KESİLMEDİ') < 0,
        paintDetails: String(r['Boya Detayları'] || r['Boya'] || '').toLocaleUpperCase('tr-TR'),
        unitPrice: (r['Birim Fiyat'] !== undefined && r['Birim Fiyat'] !== '' && !isNaN(parseFloat(r['Birim Fiyat']))) ? parseFloat(r['Birim Fiyat']) : '',
        paintCost: (r['Boya Maliyeti'] !== undefined && r['Boya Maliyeti'] !== '' && !isNaN(parseFloat(r['Boya Maliyeti']))) ? parseFloat(r['Boya Maliyeti']) : '',
        signature: null, photos: [], createdAt: Date.now() + i,
      };
    }).filter((r) => r.company || r.plate || r.driver || r.tonnage);
    if (!list.length) throw new Error('"' + chosenSheet + '" sayfasında tanınabilir hiçbir kayıt bulunamadı.');
    state.pendingRestore = { type: 'excel', list, source: file.name };
  } catch (err) {
    state.error = 'Excel dosyası okunamadı: ' + (err && err.message ? err.message : String(err)) + '. Sorun sürerse "Yedek Geri Yükle" (.json) daha güvenilir çalışıyor.';
  }
  render();
}
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(reader.error || new Error('Dosya okunamadı.'));
    reader.readAsText(file);
  });
}
function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(reader.error || new Error('Dosya okunamadı.'));
    reader.readAsArrayBuffer(file);
  });
}
function parseJsonShipmentsText(text, sourceName) {
  const parsed = JSON.parse(text);
  let list = Array.isArray(parsed) ? parsed
    : Array.isArray(parsed.shipments) ? parsed.shipments
    : Array.isArray(parsed.data) ? parsed.data
    : Array.isArray(parsed.records) ? parsed.records
    : null;
  if (!list) throw new Error('Beklenen kayıt listesi bulunamadı (dosya bu formatı desteklemiyor).');
  list = list.filter((r) => r && typeof r === 'object').map((r) => Object.assign({}, r, { id: r.id || uid() }));
  if (!list.length) throw new Error('Dosyada okunabilir hiçbir kayıt bulunamadı.');
  state.pendingRestore = { type: 'json', list, source: sourceName };
}
function pickJsonFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';
  input.onchange = (e) => {
    const files = Array.from(e.target.files || []);
    document.body.removeChild(input);
    if (files.length) handleJsonFiles(files);
  };
  document.body.appendChild(input);
  input.click();
}
async function handleJsonFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;
  try {
    const merged = new Map((state.pendingRestore && state.pendingRestore.type === 'json' ? state.pendingRestore.list : []).map((r) => [r.id, r]));
    const mergedQuotes = new Map((state.pendingRestore && state.pendingRestore.type === 'json' && state.pendingRestore.quotesList ? state.pendingRestore.quotesList : []).map((r) => [r.id, r]));
    const seenParts = new Set(state.pendingRestore && state.pendingRestore.seenParts ? state.pendingRestore.seenParts : []);
    const priorNames = state.pendingRestore && state.pendingRestore.fileNames ? state.pendingRestore.fileNames.slice() : [];
    let totalOf = state.pendingRestore ? state.pendingRestore.totalOf : null;
    let photosIncluded = state.pendingRestore && state.pendingRestore.type === 'json' ? state.pendingRestore.photosIncluded : true;
    let dateRanged = state.pendingRestore && state.pendingRestore.type === 'json' ? state.pendingRestore.dateRanged : false;
    let restoredSettings = state.pendingRestore && state.pendingRestore.settings ? state.pendingRestore.settings : null;
    for (const file of files) {
      const text = await readFileAsText(file);
      const parsed = JSON.parse(text);
      const list = Array.isArray(parsed) ? parsed
        : Array.isArray(parsed.shipments) ? parsed.shipments
        : Array.isArray(parsed.data) ? parsed.data
        : Array.isArray(parsed.records) ? parsed.records
        : null;
      if (!list) throw new Error('"' + file.name + '" beklenen kayıt listesini içermiyor (dosya bu formatı desteklemiyor).');
      if (parsed && typeof parsed === 'object' && parsed.of) totalOf = parsed.of;
      if (parsed && typeof parsed === 'object' && parsed.part) seenParts.add(parsed.part);
      if (parsed && typeof parsed === 'object' && parsed.photosIncluded === false) photosIncluded = false;
      if (parsed && typeof parsed === 'object' && parsed.dateRanged === true) dateRanged = true;
      if (parsed && typeof parsed === 'object' && parsed.settings && typeof parsed.settings === 'object') restoredSettings = Object.assign({}, restoredSettings || {}, parsed.settings);
      list.filter((r) => r && typeof r === 'object').forEach((r) => {
        const rec = Object.assign({}, r, { id: r.id || uid() });
        merged.set(rec.id, rec);
      });
      if (parsed && Array.isArray(parsed.quotes)) {
        parsed.quotes.filter((r) => r && typeof r === 'object').forEach((r) => {
          const rec = Object.assign({}, r, { id: r.id || uid() });
          mergedQuotes.set(rec.id, rec);
        });
      }
      priorNames.push(file.name);
    }
    const all = Array.from(merged.values());
    if (!all.length) throw new Error('Seçilen dosya(lar)da okunabilir hiçbir kayıt bulunamadı.');
    state.pendingRestore = { type: 'json', list: all, quotesList: Array.from(mergedQuotes.values()), source: priorNames.join(', '), fileNames: priorNames, totalOf, seenParts: Array.from(seenParts), photosIncluded, dateRanged, settings: restoredSettings };
  } catch (err) {
    state.error = 'Yedek dosyası okunamadı: ' + (err && err.message ? err.message : String(err)) + '. Bütün okuma yöntemleri başarısız olursa, aşağıdaki "Yapıştırarak Yükle" seçeneğini deneyebilirsin.';
  }
  render();
}
async function confirmRestore() {
  if (!state.pendingRestore) return;
  state.restoreBusy = true; render();
  try {
    let list = state.pendingRestore.list;
    if (state.pendingRestore.type === 'json' && state.pendingRestore.photosIncluded === false) {
      const existingById = new Map(state.shipments.concat(state.trash).map((s) => [s.id, s]));
      list = list.map((r) => {
        const existing = existingById.get(r.id);
        return existing ? Object.assign({}, r, { photos: existing.photos }) : r;
      });
    }
    list = list.map((r) => { const c = Object.assign({}, r); delete c._searchIdx; return c; });
    try { await createAutoBackup('geri-yukleme-oncesi', true); } catch (e) {}
    await dbReplaceAll(list);
    applyRecords(list);
    if (state.pendingRestore.type === 'json' && state.pendingRestore.quotesList && state.pendingRestore.quotesList.length) {
      await dbReplaceAllQuotes(state.pendingRestore.quotesList);
      state.quotes = state.pendingRestore.quotesList.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.createdAt - a.createdAt);
    }
    const rs = state.pendingRestore.settings;
    if (rs) { try { Object.keys(rs).forEach((k) => { if (k.indexOf('sevkiyat_') === 0 && k.indexOf('sevkiyat_pin') !== 0 && k.indexOf('sevkiyat_pending') !== 0 && k !== 'sevkiyat_last_backup') localStorage.setItem(k, rs[k]); }); } catch (e) {} }
    state.successMsg = list.length + ' kayıt geri yüklendi.' + (state.pendingRestore.type === 'json' && state.pendingRestore.photosIncluded === false ? ' (Mevcut fotoğraflar korundu.)' : '');
    setTimeout(() => { state.successMsg = ''; render(); }, 5000);
    await refreshStorageInfo();
    if (supabaseClient) cloudPushAll(state.shipments, state.quotes).catch(() => {});
    mediaAfterSync();
  } catch (e) { state.error = 'Geri yükleme başarısız oldu.'; }
  state.restoreBusy = false; state.pendingRestore = null; render();
}

/* ============================== signature pad ============================== */
function attachSignaturePad(canvas, initialValue, onChange) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr); ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#2B2A28';
  if (initialValue) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height); img.src = initialValue; }
  let drawing = false;
  function getPos(e) { const r = canvas.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return { x: p.clientX - r.left, y: p.clientY - r.top }; }
  function start(e) { e.preventDefault(); drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
  function move(e) { if (!drawing) return; e.preventDefault(); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); }
  function end() { if (!drawing) return; drawing = false; onChange(canvas.toDataURL('image/png')); }
  canvas.addEventListener('mousedown', start); canvas.addEventListener('mousemove', move); canvas.addEventListener('mouseup', end); canvas.addEventListener('mouseleave', end);
  canvas.addEventListener('touchstart', start, { passive: false }); canvas.addEventListener('touchmove', move, { passive: false }); canvas.addEventListener('touchend', end);
  return { clear: () => { const r = canvas.getBoundingClientRect(); ctx.clearRect(0, 0, r.width, r.height); onChange(null); } };
}

/* ============================== shared bits ============================== */
function inputEl(props) { return h('input', Object.assign({ className: 'input' }, props)); }
function field(label, node) { return h('div', { className: 'field' }, [h('div', { className: 'label' }, label), node]); }
function btn(children, props, colorBg, colorFg) {
  props = props || {};
  const style = Object.assign({ background: colorBg || 'var(--ink)', color: colorFg || 'var(--cream)', padding: '10px 14px', fontSize: '13px' }, props.style || {});
  return h('button', Object.assign({ className: 'btn' }, props, { style }), children);
}

function getSyncLabel() {
  return supabaseClient ? (state.cloudSyncing ? 'Bulut senkronize ediliyor…' : 'Bulut bağlı') : 'Cihazda saklanıyor';
}
function renderHeader() {
  return h('div', {
    style: {
      background: 'var(--header-gradient)',
      padding: '22px 20px 26px', position: 'relative', overflow: 'hidden',
      borderBottomLeftRadius: '22px', borderBottomRightRadius: '22px',
      boxShadow: 'var(--header-shadow)',
    },
  }, [
    h('div', { style: { position: 'absolute', right: '-30px', top: '-40px', width: '170px', height: '170px', borderRadius: '50%', background: 'rgba(138,180,255,0.10)' } }),
    h('div', { style: { position: 'absolute', right: '40px', bottom: '-60px', width: '110px', height: '110px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
    h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' } }, [
      h('div', { style: { width: '46px', height: '46px', borderRadius: '14px', background: '#8AB4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', boxShadow: '0 4px 12px rgba(0,0,0,.35)' } }, [h('img', { src: STAR_IMG, alt: 'Yıldız', style: { width: '30px', height: 'auto', display: 'block' } })]),
      h('div', { style: { flex: '1' } }, [
        h('h1', { style: { margin: '0', fontFamily: "'Inter',sans-serif", fontWeight: '800', fontSize: '19px', color: '#8AB4FF', letterSpacing: '0.01em', textTransform: 'uppercase' } }, 'Yıldız Kumlama & Boya'),
        h('div', { style: { fontFamily: "'Inter',sans-serif", fontSize: '12.5px', color: 'rgba(255,255,255,0.85)', marginTop: '3px', fontWeight: '500' } }, 'Sevkiyat Programı · ' + state.shipments.length + ' kayıt'),
      ]),
    ]),
  ]);
}

/* ============================== list view ============================== */
function renderStorageBar() {
  const info = state.storageInfo;
  let pct = 0, label = '';
  if (info.supported && info.quota > 0) {
    pct = Math.min(100, (info.usage / info.quota) * 100);
    label = (info.usage / 1024 / 1024).toFixed(1) + ' MB / ' + (info.quota / 1024 / 1024).toFixed(0) + ' MB (cihaz)';
  } else {
    label = 'Cihaz depolama tahmini bu tarayıcıda desteklenmiyor';
  }
  return h('div', { style: { marginBottom: '16px', background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '6px', padding: '10px 14px' } }, [
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '12px', color: 'var(--inkSoft)' } }, [
      h('span', { style: { display: 'flex', alignItems: 'center', gap: '5px' } }, [ic('drive', 13), ' Cihaz Depolaması']),
      h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: '600', color: 'var(--inkSoft)' } }, label),
    ]),
    info.supported ? h('div', { style: { height: '6px', background: 'var(--paper2)', borderRadius: '3px', overflow: 'hidden' } }, [
      h('div', { style: { height: '100%', width: pct + '%', background: 'var(--steel)' } }),
    ]) : null,
    h('div', { style: { marginTop: '6px', fontSize: '11px', fontWeight: '600', color: info.persistent ? 'var(--signed)' : 'var(--inkSoft)' } },
      info.persistent === null ? 'Kalıcı depolama: bu tarayıcıda desteklenmiyor' : info.persistent ? '✓ Kalıcı depolama açık' : 'Kalıcı depolama: açık değil'
    ),
  ]);
}
function renderListView() {
  const container = h('div', { style: { padding: '18px 16px' } });

  if (state.showBackupReminder) {
    const reminder = h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--warn-bg-solid)', border: '1.5px solid var(--warn-border)', borderRadius: '10px', padding: '10px 12px', marginBottom: '14px' } });
    reminder.appendChild(h('span', { style: { flex: '1', fontSize: '12.5px', color: 'var(--ink)', lineHeight: '1.4' } }, 'Yedek zamanı geldi (fotoğrafsız, hızlı).'));
    reminder.appendChild(btn(['Şimdi Yedekle'], {
      disabled: state.backupBusy,
      onclick: async () => {
        state.showBackupReminder = false;
        await runFullBackup();
        setTimeout(() => { state.successMsg = ''; render(); }, 7000);
        render();
      },
      style: { padding: '7px 12px', fontSize: '12.5px', whiteSpace: 'nowrap' },
    }, 'var(--ink)', 'var(--cream)'));
    reminder.appendChild(h('span', { onclick: () => { state.showBackupReminder = false; render(); }, style: { cursor: 'pointer', color: 'var(--inkSoft)', padding: '4px', fontWeight: '700' } }, '✕'));
    container.appendChild(reminder);
  }

  const taskBanner = buildTaskBanner();
  if (taskBanner) container.appendChild(taskBanner);

  const qeToggle = h('button', {
    onclick: () => { state.uiExpanded.quickEntry = !state.uiExpanded.quickEntry; render(); },
    style: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
      background: 'var(--accent-soft-bg)', border: '1.5px solid var(--accent-soft-border)', borderRadius: '12px',
      padding: '10px 14px', fontSize: '13px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer',
      marginBottom: state.uiExpanded.quickEntry ? '10px' : '12px',
    },
  }, [
    h('span', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [ic('edit', 14), 'Hızlı Kayıt (yaz, otomatik doldursun)']),
    h('span', {}, state.uiExpanded.quickEntry ? '▲' : '▼'),
  ]);
  container.appendChild(qeToggle);
  if (state.uiExpanded.quickEntry) {
    const qeBox = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '14px', padding: '14px', marginBottom: '14px' } });
    const qeTextarea = h('textarea', {
      id: 'qe-text', className: 'input', rows: 2,
      style: { fontFamily: "'Inter',sans-serif", resize: 'vertical', marginBottom: '8px' },
      oninput: (e) => { state.quickEntryText = e.target.value; updateQeSuggestions(); },
    }, state.quickEntryText);
    qeBox.appendChild(qeTextarea);
    qeBox.appendChild(h('div', { id: 'qe-suggest', style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' } }));
    qeBox.appendChild(h('div', { id: 'qe-ocr' }));
    const qeRow = h('div', { style: { display: 'flex', gap: '8px' } });
    qeRow.appendChild(btn([ic('check', 15), ' Sisteme İşle'], {
      onclick: () => {
        const text = state.quickEntryText.trim();
        if (!text) return;
        startQuickForm(parseQuickEntryText(text));
      },
      style: { flex: '1', justifyContent: 'center', padding: '11px', fontSize: '13.5px', boxShadow: '0 4px 12px rgba(138,180,255,.25)' },
    }, 'var(--primary)', 'var(--on-primary)'));
    const plateFile = h('input', { type: 'file', accept: 'image/*', style: { display: 'none' }, onchange: (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) readPlateFromPhoto(f); } });
    plateFile.setAttribute('capture', 'environment');
    qeRow.appendChild(btn([ic('camera', 15), ' Plaka Fotoğrafı'], { onclick: () => plateFile.click(), style: { padding: '11px 14px', fontSize: '13px', border: '1.5px solid var(--line)' } }, 'var(--cream)', 'var(--ink)'));
    qeRow.appendChild(plateFile);
    qeBox.appendChild(qeRow);
    qeBox.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)', marginTop: '8px', lineHeight: '1.5' } }, 'Firma adını yazmaya başla, öneri çıksın. Miktar, birim, plaka ve boya kelimeleri cümleden alınır; firma biliniyorsa boya detayı ve plakadan şoför bilgisi otomatik gelir. Telefonun klavyesindeki mikrofonla da konuşabilirsin.'));
    container.appendChild(qeBox);
    setTimeout(updateQeSuggestions, 0);
  }

  const searchRow = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '12px' } });
  const searchWrap = h('div', { style: { position: 'relative', flex: '1' } });
  searchWrap.appendChild(h('span', { style: { position: 'absolute', left: '10px', top: '12px', color: 'var(--inkSoft)' } }, [ic('search', 16)]));
  const debouncedListSearch = debounce(() => { state.listPage = 1; rerenderResults(); }, 180);
  searchWrap.appendChild(inputEl({ value: state.query, placeholder: 'Sevk no, plaka, firma, şoför ara', style: { paddingLeft: '32px', fontSize: '14px' }, oninput: (e) => { state.query = e.target.value; debouncedListSearch(); } }));
  searchRow.appendChild(searchWrap);
  searchRow.appendChild(btn([ic('refresh', 16)], { onclick: loadAll, title: 'Listeyi yenile', style: { width: '40px', justifyContent: 'center', padding: '0' } }, 'var(--cream)', 'var(--ink)'));
  searchRow.lastChild.style.border = '1.5px solid var(--line)';
  container.appendChild(searchRow);

  const filterToggleLabel = h('span', { id: 'filter-toggle-count-label' }, 'Filtrele');
  const filterToggle = h('button', {
    onclick: () => { state.uiExpanded.filters = !state.uiExpanded.filters; render(); },
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '4px', padding: '9px 12px', fontSize: '13px', fontWeight: '600', color: 'var(--ink)', cursor: 'pointer', marginBottom: '10px' },
  }, [
    h('span', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [ic('search', 13), filterToggleLabel]),
    h('span', { style: { color: 'var(--steel)' } }, state.uiExpanded.filters ? '▲' : '▼'),
  ]);
  container.appendChild(filterToggle);

  container.appendChild(buildListFilterSection());

  return container;
}
function buildListFilterSection() {
  const filtered = filteredShipments();
  const uniqueCompanies = Array.from(new Set(state.shipments.map((s) => s.company))).sort();
  const missingTonnageCount = state.shipments.filter((s) => !s.tonnage).length;
  const notInvoicedCount = state.shipments.filter((s) => !s.invoiced).length;
  const activeFilterCount = [state.companyFilter, state.tonnageFilter, state.invoicedFilter, state.dateFrom, state.dateTo].filter(Boolean).length;
  const section = h('div', { id: 'list-filter-section' });

  if (activeFilterCount > 0) {
    const chips = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' } });
    function chip(text, onRemove) {
      const c = h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--paper2)', color: 'var(--ink)', fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '12px' } }, [text]);
      c.appendChild(h('span', { onclick: onRemove, style: { cursor: 'pointer', color: 'var(--stamp)', fontWeight: '700' } }, ' ✕'));
      return c;
    }
    if (state.companyFilter) chips.appendChild(chip('Firma: ' + state.companyFilter, () => { state.companyFilter = ''; refreshListFilterSection(); }));
    if (state.tonnageFilter) chips.appendChild(chip(state.tonnageFilter === 'missing' ? 'Miktar Girilmemiş' : 'Miktar Girilmiş', () => { state.tonnageFilter = ''; refreshListFilterSection(); }));
    if (state.invoicedFilter) chips.appendChild(chip(state.invoicedFilter === 'no' ? 'Fatura Kesilmemiş' : 'Fatura Kesilmiş', () => { state.invoicedFilter = ''; refreshListFilterSection(); }));
    if (state.dateFrom || state.dateTo) chips.appendChild(chip('Tarih: ' + (state.dateFrom ? formatDateTR(state.dateFrom) : '…') + ' – ' + (state.dateTo ? formatDateTR(state.dateTo) : '…'), () => { state.dateFrom = ''; state.dateTo = ''; refreshListFilterSection(); }));
    if (activeFilterCount > 1) chips.appendChild(h('span', { onclick: () => { state.companyFilter = ''; state.tonnageFilter = ''; state.invoicedFilter = ''; state.dateFrom = ''; state.dateTo = ''; refreshListFilterSection(); }, style: { display: 'inline-flex', alignItems: 'center', fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '12px', cursor: 'pointer', color: 'var(--steel)', textDecoration: 'underline' } }, 'Tümünü Temizle'));
    section.appendChild(chips);
  }

  if (state.uiExpanded.filters) {
    const filterRow = h('div', { className: 'panel-in', style: { display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' } });
    const companySelect = h('select', { className: 'input', style: { flex: '1 1 140px', fontSize: '13.5px' }, onchange: (e) => { state.companyFilter = e.target.value; state.listPage = 1; refreshListFilterSection(); } }, [h('option', { value: '' }, 'Tüm Firmalar')].concat(uniqueCompanies.map((c) => h('option', { value: c }, c))));
    companySelect.value = state.companyFilter;
    filterRow.appendChild(companySelect);
    const tonnageSelect = h('select', { className: 'input', style: { flex: '1 1 140px', fontSize: '13.5px' }, onchange: (e) => { state.tonnageFilter = e.target.value; state.listPage = 1; refreshListFilterSection(); } }, [
      h('option', { value: '' }, 'Miktar: Tümü'),
      h('option', { value: 'filled' }, 'Miktar Girilmiş (' + (state.shipments.length - missingTonnageCount) + ')'),
      h('option', { value: 'missing' }, 'Miktar Girilmemiş (' + missingTonnageCount + ')'),
    ]);
    tonnageSelect.value = state.tonnageFilter;
    filterRow.appendChild(tonnageSelect);
    const invoicedSelect = h('select', { className: 'input', style: { flex: '1 1 140px', fontSize: '13.5px' }, onchange: (e) => { state.invoicedFilter = e.target.value; state.listPage = 1; refreshListFilterSection(); } }, [
      h('option', { value: '' }, 'Fatura: Tümü'),
      h('option', { value: 'yes' }, 'Fatura Kesilmiş (' + (state.shipments.length - notInvoicedCount) + ')'),
      h('option', { value: 'no' }, 'Fatura Kesilmemiş (' + notInvoicedCount + ')'),
    ]);
    invoicedSelect.value = state.invoicedFilter;
    filterRow.appendChild(invoicedSelect);
    section.appendChild(filterRow);

    const dateRow = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' } });
    const fromWrap = h('div', { style: { flex: '1' } }, [h('label', { style: { display: 'block', fontSize: '10.5px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, 'Başlangıç'), inputEl({ type: 'date', value: state.dateFrom, style: { fontSize: '13px' }, onchange: (e) => { state.dateFrom = e.target.value; state.listPage = 1; refreshListFilterSection(); } })]);
    const toWrap = h('div', { style: { flex: '1' } }, [h('label', { style: { display: 'block', fontSize: '10.5px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, 'Bitiş'), inputEl({ type: 'date', value: state.dateTo, style: { fontSize: '13px' }, onchange: (e) => { state.dateTo = e.target.value; state.listPage = 1; refreshListFilterSection(); } })]);
    dateRow.appendChild(fromWrap); dateRow.appendChild(toWrap);
    section.appendChild(dateRow);

    section.appendChild(btn([ic('filedown', 15), ' Filtrelenen ' + filtered.length + ' Kaydı Tek PDF Olarak İndir'], {
      disabled: state.bulkPdfBusy || filtered.length === 0,
      onclick: async () => {
        state.bulkPdfBusy = true; state.error = ''; render();
        try { const bytes = await buildBulkReceiptPDF(filteredShipments()); await saveOrShareFile(bytes, 'sevkiyat-toplu-' + todayISO() + '.pdf', 'application/pdf', { 'application/pdf': ['.pdf'] }); }
        catch (e) { state.error = 'Toplu PDF oluşturulurken bir sorun oluştu.'; }
        state.bulkPdfBusy = false; render();
      },
      style: { width: '100%', justifyContent: 'center', padding: '11px', marginBottom: '4px', fontSize: '13.5px' },
    }, 'var(--ink)', 'var(--cream)'));
  }

  if (state.successMsg) section.appendChild(h('div', { style: { background: 'var(--signed-bg)', color: 'var(--signed)', padding: '10px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '14px', fontWeight: '600' } }, state.successMsg));
  if (state.error) section.appendChild(h('div', { style: { background: 'var(--danger-bg)', color: 'var(--stamp)', padding: '10px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '14px' } }, state.error));

  const resultsWrap = h('div', { id: 'results-wrap' });
  resultsWrap.appendChild(buildResultsList(filtered));
  section.appendChild(resultsWrap);

  return section;
}
function updateQeSuggestions() {
  const box = document.getElementById('qe-suggest');
  if (!box) return;
  box.innerHTML = '';
  const text = state.quickEntryText || '';
  const m = text.match(/(\S+)$/);
  if (!m || /\s$/.test(text)) return;
  const w = trNormalize(m[1]);
  if (w.length < 2 || /^[0-9]/.test(w)) return;
  const companies = Array.from(new Set(state.shipments.map((s) => s.company))).filter(Boolean);
  const hits = companies.filter((c) => { const cn = trNormalize(c); return cn.indexOf(w) === 0 || cn.split(/\s+/).some((p) => p.indexOf(w) === 0); }).slice(0, 5);
  hits.forEach((c) => {
    const last = lastRecordOfCompany(c);
    box.appendChild(h('button', {
      type: 'button',
      onclick: () => {
        const t = state.quickEntryText.replace(/\S+$/, '') + c + ' ';
        state.quickEntryText = t;
        const ta = document.getElementById('qe-text');
        if (ta) { ta.value = t; ta.focus(); }
        updateQeSuggestions();
      },
      style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px', background: 'var(--accent-soft-bg)', border: '1.5px solid var(--accent-soft-border)', borderRadius: '12px', padding: '6px 10px', cursor: 'pointer', color: 'var(--primary)', fontWeight: '700', fontSize: '12.5px', fontFamily: 'inherit' },
    }, [c, last && last.paintDetails ? h('span', { style: { fontSize: '10.5px', fontWeight: '500', color: 'var(--inkSoft)' } }, last.paintDetails.length > 34 ? last.paintDetails.slice(0, 33) + '…' : last.paintDetails) : null]));
  });
}
let _tessPromise = null;
function loadTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (_tessPromise) return _tessPromise;
  _tessPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
    s.onload = () => resolve(window.Tesseract);
    s.onerror = () => { _tessPromise = null; reject(new Error('Okuma modülü indirilemedi (internet gerekir).')); };
    document.head.appendChild(s);
  });
  return _tessPromise;
}
function extractPlates(raw) {
  const out = [];
  const t = String(raw || '').toUpperCase().replace(/[^0-9A-Z\n ]/g, ' ');
  const re = /(\d{2})\s*([A-Z]{1,3})\s*(\d{2,4})/g;
  let m;
  while ((m = re.exec(t))) { const p = m[1] + ' ' + m[2] + ' ' + m[3]; if (parseInt(m[1], 10) >= 1 && parseInt(m[1], 10) <= 81 && out.indexOf(p) === -1) out.push(p); }
  return out;
}
async function readPlateFromPhoto(file) {
  const box = document.getElementById('qe-ocr');
  if (!box) return;
  const setMsg = (t) => { box.innerHTML = ''; box.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '8px' } }, t)); };
  setMsg('Plaka okunuyor… (ilk seferde okuma modülü indirilir)');
  let worker = null;
  try {
    const dataUrl = await compressImage(file, 1600, 0.9);
    const T = await loadTesseract();
    worker = await T.createWorker('eng');
    await worker.setParameters({ tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPRSTUVYZ0123456789 ', tessedit_pageseg_mode: '11' });
    const res = await worker.recognize(dataUrl);
    const cands = extractPlates(res && res.data && res.data.text);
    box.innerHTML = '';
    const row = h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' } });
    const inp = inputEl({ value: cands[0] || '', style: { flex: '1 1 140px', fontSize: '15px', textTransform: 'uppercase' } });
    inp.addEventListener('input', () => { inp.value = inp.value.toLocaleUpperCase('tr-TR'); });
    row.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', flexBasis: '100%' } }, cands.length ? 'Okunan plaka — kontrol edip düzelt:' : 'Plaka net okunamadı, elle yazabilirsin:'));
    row.appendChild(inp);
    row.appendChild(btn(['Forma Aktar'], { onclick: () => { const parsed = parseQuickEntryText(state.quickEntryText || ''); parsed.plate = inp.value.trim(); startQuickForm(parsed); }, style: { padding: '10px 14px', fontSize: '13px' } }, 'var(--primary)', 'var(--on-primary)'));
    box.appendChild(row);
    cands.slice(1, 4).forEach((c) => box.appendChild(h('span', { onclick: () => { inp.value = c; }, style: { display: 'inline-block', marginRight: '6px', marginBottom: '8px', background: 'var(--paper2)', borderRadius: '10px', padding: '4px 9px', fontSize: '12px', cursor: 'pointer' } }, c)));
  } catch (e) {
    setMsg('Plaka okunamadı: ' + (e && e.message ? e.message : e) + ' Plakayı kutuya yazabilirsin.');
  }
  try { if (worker) await worker.terminate(); } catch (e) {}
}
function refreshListFilterSection() {
  const old = document.getElementById('list-filter-section');
  if (!old || !old.parentNode) { render(); return; }
  old.parentNode.replaceChild(buildListFilterSection(), old);
  const activeFilterCount = [state.companyFilter, state.tonnageFilter, state.invoicedFilter, state.dateFrom, state.dateTo].filter(Boolean).length;
  const label = document.getElementById('filter-toggle-count-label');
  if (label) label.textContent = 'Filtrele' + (activeFilterCount ? ' (' + activeFilterCount + ' aktif)' : '');
}
function buildBackupPanelContent(container) {
    const cloudConnected = !!supabaseClient;
    const cloudBox = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '12px', marginBottom: '12px' } });
    cloudBox.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '700', fontSize: '13.5px' } }, [
      ic('drive', 14, cloudConnected ? 'var(--signed)' : 'var(--inkSoft)'),
      ' Bulut Yedekleme (Supabase)',
      h('span', { style: { marginLeft: 'auto', fontSize: '11px', color: cloudConnected ? 'var(--signed)' : 'var(--stamp)', fontWeight: '600' } }, cloudConnected ? '● Bağlı' : '● Bağlı değil'),
    ]));
    const cloudBtnRow = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } });
    cloudBtnRow.appendChild(btn([ic('uploadcloud', 13), state.cloudSyncing ? ' Senkronize ediliyor…' : ' Buluta Gönder'], {
      disabled: state.cloudSyncing || !cloudConnected,
      onclick: pushAllToCloud,
      style: { fontSize: '12.5px', padding: '8px 12px' },
    }, 'var(--signed)', 'var(--cream)'));
    cloudBtnRow.appendChild(btn([ic('filedown', 13), ' Buluttan Çek'], {
      disabled: state.cloudSyncing || !cloudConnected,
      onclick: syncFromCloud,
      style: { fontSize: '12.5px', padding: '8px 12px' },
    }, 'none', 'var(--steel)'));
    cloudBtnRow.lastChild.style.border = '1.5px solid var(--line)';
    cloudBox.appendChild(cloudBtnRow);
    if (state.pendingDeletions.length) {
      cloudBox.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--warn)', marginTop: '4px', fontWeight: '600' } },
        '⚠ ' + state.pendingDeletions.length + ' silme işlemi hâlâ buluta gönderilemedi — bir sonraki senkronda tekrar denenecek.'
      ));
    }
    if (state.lastSyncAt) {
      cloudBox.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)', marginTop: '4px' } },
        'Son senkron: ' + new Date(state.lastSyncAt).toLocaleString('tr-TR')
      ));
    }
    if (state.cloudLastError) {
      cloudBox.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--stamp)', marginTop: '4px', wordBreak: 'break-word' } },
        'Son hata: ' + state.cloudLastError
      ));
    }
    container.appendChild(cloudBox);

    buildAutoBackupBox(container);
    const rangeRow = h('div', { style: { display: 'flex', gap: '8px', marginBottom: '10px' } });
    rangeRow.appendChild(h('div', { style: { flex: '1' } }, [
      h('label', { style: { display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, 'Yedek Başlangıç (ops.)'),
      inputEl({ type: 'date', value: state.backupDateFrom, style: { fontSize: '12.5px' }, onchange: (e) => { state.backupDateFrom = e.target.value; } }),
    ]));
    rangeRow.appendChild(h('div', { style: { flex: '1' } }, [
      h('label', { style: { display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, 'Yedek Bitiş (ops.)'),
      inputEl({ type: 'date', value: state.backupDateTo, style: { fontSize: '12.5px' }, onchange: (e) => { state.backupDateTo = e.target.value; } }),
    ]));
    container.appendChild(rangeRow);
    const backupRow = h('div', { className: 'panel-in', style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' } });
    backupRow.appendChild(btn([
      ic('filedown', 14),
      state.backupBusy ? h('span', {}, [' ', h('span', { id: 'backup-progress-label' }, state.backupProgress)])
        : state.pdfBackupBusy ? ' PDF hazırlanıyor…'
        : state.pdfBackupPending ? ' PDF Yedeğini Gönder'
        : ' Tam Yedek Al (JSON)',
    ], {
      disabled: state.backupBusy || state.pdfBackupBusy,
      title: 'Tüm veri tek JSON dosyasında (fotoğraf, imza, teklif, ayar dahil). Sonra isteğe bağlı fotoğraflı PDF yedeği',
      onclick: async () => {
        if (state.pdfBackupPending) {
          state.pdfBackupPending = false;
          await runPdfBackup();
        } else {
          await runFullBackup();
          state.pdfBackupPending = !state.error && !!state.lastBackupAt && (Date.now() - state.lastBackupAt < 20000);
        }
        setTimeout(() => { state.successMsg = ''; render(); }, 8000);
        render();
      },
      style: { fontSize: '12.5px', padding: '8px 12px' },
    }, 'var(--ink)', 'var(--cream)'));
    backupRow.appendChild(btn([ic('sheet', 14), state.excelBackupBusy ? ' Hazırlanıyor…' : ' Excel\'e Yedek Al'], { disabled: state.excelBackupBusy, onclick: async () => { state.excelBackupBusy = true; render(); await nextFrame(); await exportExcel(state.shipments, true); markBackupDone(); state.excelBackupBusy = false; render(); }, style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--signed)', 'var(--cream)'));
    const excelRestoreInput = h('input', { type: 'file', style: { display: 'none' }, onchange: (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) handleExcelFile(f); } });
    backupRow.appendChild(btn([ic('upload', 14), ' Yedek Geri Yükle'], { onclick: () => pickJsonFile() }, 'none', 'var(--steel)'));
    backupRow.lastChild.style.border = '1.5px solid var(--line)';
    backupRow.appendChild(btn([ic('uploadcloud', 14), ' Excelden Yükle'], { onclick: () => excelRestoreInput.click() }, 'none', 'var(--steel)'));
    backupRow.lastChild.style.border = '1.5px solid var(--line)';
    backupRow.appendChild(excelRestoreInput);
    container.appendChild(backupRow);

    const pasteRow = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '4px', alignItems: 'center' } });
    pasteRow.appendChild(btn([ic('edit', 14), ' Yapıştırarak Yükle'], { onclick: () => { state.showPasteRestore = true; render(); } }, 'none', 'var(--warn)'));
    pasteRow.lastChild.style.border = '1.5px solid var(--warn-border)';
    pasteRow.appendChild(h('span', { style: { fontSize: '11px', color: 'var(--inkSoft)' } }, '← dosya seçici çalışmazsa'));
    container.appendChild(pasteRow);
    container.appendChild(h('div', { style: { marginBottom: '12px' } }));

    const promptToggle = h('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '10px' } });
    const promptCheckbox = h('input', { type: 'checkbox', checked: !state.suppressBackupPrompt, style: { width: '16px', height: '16px', cursor: 'pointer' }, onchange: (e) => { state.suppressBackupPrompt = !e.target.checked; try { localStorage.setItem('sevkiyat_suppress_backup_prompt', state.suppressBackupPrompt ? '1' : '0'); } catch (err) {} } });
    promptToggle.appendChild(promptCheckbox); promptToggle.appendChild(h('span', {}, 'Yeni kayıttan sonra yedek hatırlatması göster'));
    container.appendChild(promptToggle);

    const secBox = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '12px', marginBottom: '12px' } });
    secBox.appendChild(h('div', { style: { fontWeight: '700', fontSize: '13.5px', marginBottom: '8px' } }, '🔒 Güvenlik (PIN kilidi)'));
    const pinToggle = h('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '8px' } });
    pinToggle.appendChild(h('input', { type: 'checkbox', checked: state.pinEnabled, style: { width: '16px', height: '16px' }, onchange: (e) => { state.pinEnabled = e.target.checked; try { localStorage.setItem('sevkiyat_pin_enabled', state.pinEnabled ? '1' : '0'); } catch (err) {} render(); } }));
    pinToggle.appendChild(h('span', {}, 'Uygulama açılırken PIN iste (arka plandan 2 dk sonra dönünce de)'));
    secBox.appendChild(pinToggle);
    if (state.pinEnabled) {
      const pinRow = h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' } });
      const pinInp = h('input', { className: 'input', type: 'tel', maxLength: 4, placeholder: 'Yeni PIN (4 hane)', style: { flex: '1', fontSize: '13px' } });
      pinRow.appendChild(pinInp);
      pinRow.appendChild(btn(['PIN Değiştir'], { onclick: () => { const v = pinInp.value.replace(/[^0-9]/g, ''); if (v.length !== 4) { state.pinChangeMsg = 'PIN 4 haneli olmalı.'; } else { try { localStorage.setItem('sevkiyat_pin', v); state.pinChangeMsg = '✓ PIN değişti.'; } catch (e) { state.pinChangeMsg = 'PIN kaydedilemedi.'; } } render(); }, style: { padding: '9px 12px', fontSize: '12.5px' } }));
      secBox.appendChild(pinRow);
      if (state.pinChangeMsg) secBox.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginBottom: '6px' } }, state.pinChangeMsg));
      secBox.appendChild(btn(['Şimdi kilitle'], { onclick: () => { state.uiExpanded.backup = false; lockApp(); }, style: { padding: '8px 12px', fontSize: '12.5px', marginBottom: '6px' } }, 'var(--paper2)', 'var(--ink)'));
    }
    secBox.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)', lineHeight: '1.5' } }, 'PIN, telefonu eline alan kişiyi uygulamayı açarken durdurur. Veriler şifrelenmez; yedek dosyası PIN ile korunmaz.'));
    container.appendChild(secBox);
}
function renderBackupMenu() {
  const overlay = h('div', { style: { position: 'fixed', inset: '0', zIndex: '50' }, onclick: () => { state.uiExpanded.backup = false; render(); } });
  overlay.appendChild(h('div', { style: { position: 'absolute', inset: '0', background: 'rgba(17,24,39,0.35)' } }));
  const panel = h('div', {
    className: 'panel-in',
    onclick: (e) => e.stopPropagation(),
    style: { position: 'absolute', top: '78px', right: '14px', left: '14px', maxWidth: '440px', marginLeft: 'auto', background: 'var(--paper)', borderRadius: '14px', padding: '16px', boxShadow: '0 16px 40px rgba(17,24,39,.28)', maxHeight: '78vh', overflowY: 'auto' },
  });
  const headRow = h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' } });
  headRow.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '14.5px', color: 'var(--ink)' } }, [ic('drive', 15), ' Yedekleme']));
  headRow.appendChild(h('span', { onclick: () => { state.uiExpanded.backup = false; render(); }, style: { cursor: 'pointer', color: 'var(--inkSoft)', fontWeight: '700', padding: '4px', fontSize: '15px' } }, '✕'));
  panel.appendChild(headRow);
  buildBackupPanelContent(panel);
  overlay.appendChild(panel);
  return overlay;
}
function computeTonnageSums(list) {
  const sums = {};
  list.forEach((s) => {
    const v = parseFloat(s.tonnage);
    if (s.tonnage && !isNaN(v)) { const u = s.tonnageUnit || 'ton'; sums[u] = (sums[u] || 0) + v; }
  });
  return sums;
}
function buildTonnageSummary(filtered) {
  const sums = computeTonnageSums(filtered);
  const parts = Object.keys(sums);
  if (parts.length === 0) return null;
  const text = parts.map((u) => sums[u].toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ' + unitLabel(u)).join(' + ');
  const withData = filtered.filter((s) => s.tonnage && !isNaN(parseFloat(s.tonnage))).length;
  const activeFilterCount = [state.companyFilter, state.tonnageFilter, state.invoicedFilter, state.dateFrom, state.dateTo].filter(Boolean).length;
  return h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', background: 'var(--signed-bg)', border: '1.5px solid var(--signed)', borderRadius: '6px', padding: '10px 14px', marginBottom: '14px' } }, [
    h('span', { style: { fontSize: '12px', color: 'var(--inkSoft)', fontWeight: '600' } },
      (activeFilterCount ? 'Filtrelenen ' : 'Listelenen ') + withData + ' kayıtta toplam miktar:'),
    h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: '700', fontSize: '14px', color: 'var(--signed)' } }, text),
  ]);
}
async function toggleInvoiced(s) {
  const idx = state.shipments.findIndex((x) => x.id === s.id);
  if (idx === -1) return;
  const updated = Object.assign({}, state.shipments[idx], { invoiced: !state.shipments[idx].invoiced, updatedAt: Date.now() });
  try {
    await dbPut(updated);
    if (supabaseClient) cloudPushShipment(updated).catch(() => {});
    updated._searchIdx = computeSearchIndex(updated);
    state.shipments[idx] = updated;
  } catch (e) { state.error = 'Kaydedilemedi.'; render(); return; }
  rerenderResults();
}
function buildPager(totalCount, page, perPage, onPageChange, onPerPageChange) {
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  page = Math.min(Math.max(1, page), totalPages);
  const wrap = h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 0 6px' } });
  const bar = h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' } });
  bar.appendChild(btn(['‹ Önceki'], { disabled: page <= 1, onclick: () => onPageChange(page - 1), style: { padding: '7px 14px', fontSize: '12.5px' } }, 'none', 'var(--steel)'));
  bar.lastChild.style.border = '1.5px solid var(--line)';
  bar.appendChild(h('span', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', fontWeight: '600', minWidth: '76px', textAlign: 'center' } }, 'Sayfa ' + page + ' / ' + totalPages));
  bar.appendChild(btn(['Sonraki ›'], { disabled: page >= totalPages, onclick: () => onPageChange(page + 1), style: { padding: '7px 14px', fontSize: '12.5px' } }, 'none', 'var(--steel)'));
  bar.lastChild.style.border = '1.5px solid var(--line)';
  wrap.appendChild(bar);
  const perPageRow = h('label', { style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--inkSoft)' } });
  perPageRow.appendChild(h('span', {}, 'Sayfa başına:'));
  const perPageSelect = h('select', { className: 'input', style: { fontSize: '12px', padding: '4px 8px', width: 'auto' }, onchange: (e) => onPerPageChange(parseInt(e.target.value, 10)) },
    [10, 20, 50, 100].map((n) => h('option', { value: String(n) }, String(n)))
  );
  perPageSelect.value = String(perPage);
  perPageRow.appendChild(perPageSelect);
  wrap.appendChild(perPageRow);
  wrap.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)' } }, totalCount + ' kayıttan gösteriliyor'));
  return wrap;
}
/* ---- Sevkiyat kartını resim olarak paylaş (muhasebeye WhatsApp'tan) ---- */
function loadImgEl(src) { return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }
async function shipmentImageBlob(s) {
  const W = 1080, P = 64, c = document.createElement('canvas'), x = c.getContext('2d');
  const rows = [];
  rows.push(['Tarih', formatDateTR(s.date)]);
  if (s.plate) rows.push(['Plaka / Araç', s.plate]);
  if (s.driver) rows.push(['Şoför', s.driver + (s.driverPhone ? ' · ' + s.driverPhone : '')]);
  rows.push(['Miktar', s.tonnage ? (s.tonnage + ' ' + unitLabel(s.tonnageUnit)) : 'Girilmedi']);
  if (hasUnitPrice(s)) {
    const amount = costAmount(s);
    rows.push(['Birim Fiyat', formatMoney(parseFloat(s.unitPrice)) + ' / ' + unitLabel(s.tonnageUnit)]);
    if (amount !== null) {
      rows.push(['Tutar (KDV hariç)', formatMoney(amount)]);
      rows.push(['KDV (%' + getVatRate() + ')', formatMoney(withVat(amount) - amount)]);
      rows.push(['TOPLAM (KDV dahil)', formatMoney(withVat(amount)), true]);
    }
  }
  rows.push(['Fatura', s.invoiced ? 'Kesildi ✓' : 'Kesilmedi']);
  const paintH = s.paintDetails ? 110 : 0;
  const H = 260 + 150 + paintH + rows.length * 74 + 140;
  c.width = W; c.height = H;
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, H);
  // üst bant
  const g = x.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#1d4ed8'); g.addColorStop(1, '#0891b2');
  x.fillStyle = g; x.fillRect(0, 0, W, 220);
  const logo = await loadImgEl(LOGO_H);
  if (logo) { const lh = 120, lw = lh * logo.width / logo.height; x.fillStyle = '#fff'; x.beginPath(); x.roundRect ? x.roundRect(P - 14, 50 - 14, Math.min(lw, 560) + 28, lh + 28, 22) : x.rect(P - 14, 36, Math.min(lw, 560) + 28, lh + 28); x.fill(); x.drawImage(logo, P, 50, Math.min(lw, 560), lh); }
  else { x.fillStyle = '#fff'; x.font = '800 54px Inter, sans-serif'; x.fillText('Yıldız Kumlama & Boya', P, 130); }
  x.textAlign = 'right'; x.fillStyle = '#fff'; x.font = '600 34px Inter, sans-serif'; x.fillText('SEVKİYAT', W - P, 100);
  x.font = '800 54px "IBM Plex Mono", monospace'; x.fillText('#' + String(s.seq).padStart(4, '0'), W - P, 165); x.textAlign = 'left';
  // firma
  let y = 220 + 100;
  x.fillStyle = '#0f172a'; x.font = '800 60px Inter, sans-serif';
  let name = String(s.company || ''); while (x.measureText(name).width > W - 2 * P && name.length > 3) name = name.slice(0, -2) + '…';
  x.fillText(name, P, y); y += 40;
  if (s.paintDetails) {
    y += 20; x.fillStyle = '#eff6ff'; x.strokeStyle = '#bfdbfe'; x.lineWidth = 3;
    x.beginPath(); x.roundRect ? x.roundRect(P, y, W - 2 * P, 84, 20) : x.rect(P, y, W - 2 * P, 84); x.fill(); x.stroke();
    x.fillStyle = '#1d4ed8'; x.font = '700 36px Inter, sans-serif';
    let pd = '🎨  ' + s.paintDetails; while (x.measureText(pd).width > W - 2 * P - 48 && pd.length > 3) pd = pd.slice(0, -2) + '…';
    x.fillText(pd, P + 24, y + 56); y += 84;
  }
  y += 30;
  rows.forEach(([k, v, strong], i) => {
    if (strong) { x.fillStyle = '#ecfdf5'; x.fillRect(P - 16, y - 4, W - 2 * P + 32, 70); }
    else if (i % 2 === 0) { x.fillStyle = '#f8fafc'; x.fillRect(P - 16, y - 4, W - 2 * P + 32, 70); }
    x.fillStyle = strong ? '#047857' : '#64748b'; x.font = (strong ? '800 ' : '600 ') + '34px Inter, sans-serif'; x.fillText(k, P, y + 44);
    x.textAlign = 'right'; x.fillStyle = strong ? '#047857' : (k === 'Fatura' ? (s.invoiced ? '#047857' : '#c2410c') : '#0f172a');
    x.font = (strong ? '800 40px ' : '700 36px ') + '"IBM Plex Mono", monospace'; x.fillText(String(v), W - P, y + 46); x.textAlign = 'left';
    y += 74;
  });
  // alt bilgi
  x.fillStyle = '#94a3b8'; x.font = '500 28px Inter, sans-serif';
  x.fillText('Yıldız Kumlama & Boya · ' + new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }), P, H - 56);
  return await new Promise((r) => c.toBlob(r, 'image/png'));
}
async function shareShipmentImage(s) {
  try {
    const blob = await shipmentImageBlob(s);
    const fname = 'sevkiyat-' + String(s.seq).padStart(4, '0') + '-' + String(s.company || '').replace(/[^\wçğıöşüÇĞİÖŞÜ]+/g, '-').slice(0, 30) + '.png';
    if (NATIVE) { await nativePut('share', blob); NATIVE.share(fname, 'image/png', ''); return; }
    const file = new File([blob], fname, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: s.company, text: s.company + ' · #' + String(s.seq).padStart(4, '0') }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }
    }
    // paylaşım desteklenmiyorsa: resmi göster (basılı tutup paylaş/kaydet) + indirmeyi dene
    state.shareImage = await blobToDataUrl(blob); state.shareImageName = fname; render();
  } catch (e) { state.error = 'Resim oluşturulamadı: ' + (e && e.message ? e.message : String(e)); render(); }
}
function renderShareImageModal() {
  const overlay = h('div', { onclick: () => { state.shareImage = null; render(); }, style: { position: 'fixed', inset: '0', background: 'rgba(15,23,42,.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: '70', gap: '12px' } });
  overlay.appendChild(h('img', { src: state.shareImage, onclick: (e) => e.stopPropagation(), style: { maxWidth: '100%', maxHeight: '75vh', borderRadius: '14px', boxShadow: '0 20px 50px rgba(0,0,0,.4)' } }));
  overlay.appendChild(h('div', { style: { color: '#fff', fontSize: '13px', textAlign: 'center' } }, 'Resme basılı tutup "Paylaş" veya "Kaydet" seçebilirsin.'));
  const row = h('div', { style: { display: 'flex', gap: '10px' } });
  row.appendChild(btn([ic('filedown', 14), ' İndir'], { onclick: (e) => { e.stopPropagation(); const a = document.createElement('a'); a.href = state.shareImage; a.download = state.shareImageName || 'sevkiyat.png'; document.body.appendChild(a); a.click(); a.remove(); } }, '#fff', '#0f172a'));
  row.appendChild(btn(['Kapat'], { onclick: () => { state.shareImage = null; render(); } }, 'rgba(255,255,255,.15)', '#fff'));
  overlay.appendChild(row);
  return overlay;
}
function buildResultsList(filtered) {
  if (state.loading) return h('div', { style: { textAlign: 'center', padding: '40px', color: 'var(--inkSoft)' } }, 'Yükleniyor…');
  if (filtered.length === 0) return h('div', { style: { textAlign: 'center', padding: '48px 20px', color: 'var(--inkSoft)', border: '1.5px dashed var(--line)', borderRadius: '6px', fontSize: '14px' } }, state.shipments.length === 0 ? 'Henüz sevkiyat kaydı yok. "Yeni" ile ilk kaydı oluşturun.' : 'Aramanızla eşleşen kayıt bulunamadı.');
  const outer = h('div', {});
  const summary = buildTonnageSummary(filtered);
  if (summary) outer.appendChild(summary);
  const wrap = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });
  const perPage = state.listPerPage;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const page = Math.min(Math.max(1, state.listPage), totalPages);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);
  visible.forEach((s) => {
    const missingTonnage = !s.tonnage;
    const notInvoiced = !s.invoiced;
    const hasIssue = missingTonnage || notInvoiced;
    let bg = 'var(--cream)', borderColor = 'var(--line)';
    if (hasIssue) { bg = 'var(--danger-bg)'; borderColor = 'var(--stamp)'; }
    else if (!missingTonnage) { bg = 'var(--signed-bg)'; borderColor = 'var(--signed)'; }
    const card = h('div', { className: 'card', style: { background: bg, border: '1.5px solid ' + borderColor, borderLeft: '4px solid ' + borderColor }, onclick: () => { state.selectedId = s.id; goTo('detail'); render(); } });
    const titleRow = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' } }, [
      h('div', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '16px' } }, s.company),
    ]);
    const rightWrap = h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', flex: '0 0 auto' } });
    if (missingTonnage && notInvoiced) rightWrap.appendChild(h('span', { title: 'Eksik: Miktar ve Fatura', style: { display: 'flex', alignItems: 'center', color: 'var(--stamp)' } }, [ic('warn', 14)]));
    rightWrap.appendChild(h('button', {
      title: 'Bu kaydı kopyalayarak yeni kayıt oluştur',
      onclick: (e) => { e.stopPropagation(); duplicateShipment(s); },
      style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', border: 'none', borderRadius: '8px', background: 'var(--paper2)', color: 'var(--primary)', cursor: 'pointer' },
    }, [ic('copy', 13)]));
    rightWrap.appendChild(h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: 'var(--steel)', background: 'var(--paper2)', padding: '2px 8px', borderRadius: '3px', whiteSpace: 'nowrap' } }, '#' + String(s.seq).padStart(4, '0')));
    titleRow.appendChild(rightWrap);
    card.appendChild(titleRow);
    const metaRow = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '12.5px', color: 'var(--inkSoft)' } });
    metaRow.appendChild(h('span', {}, formatDateTR(s.date))); metaRow.appendChild(h('span', {}, s.plate)); metaRow.appendChild(h('span', {}, s.driver));
    if (s.driverPhone) metaRow.appendChild(h('span', {}, s.driverPhone));
    metaRow.appendChild(h('span', { style: { color: s.tonnage ? 'var(--inkSoft)' : 'var(--stamp)', fontWeight: s.tonnage ? '400' : '700' } }, s.tonnage ? (s.tonnage + ' ' + unitLabel(s.tonnageUnit)) : 'MİKTAR GİRİLMEMİŞ'));
    card.appendChild(metaRow);
    if (s.paintDetails) card.appendChild(h('div', { style: { display: 'flex', gap: '6px', marginTop: '8px', fontSize: '12.5px', fontWeight: '600', color: 'var(--primary)', background: 'var(--accent-soft-bg)', border: '1px solid var(--accent-soft-border)', borderRadius: '10px', padding: '6px 10px' } }, [h('span', {}, '🎨'), h('span', {}, s.paintDetails)]));

    /* ---- Maliyet sekmesinden girilen birim fiyat ve türevleri ---- */
    if (hasUnitPrice(s)) {
      const amount = costAmount(s);
      const net = netAmount(s);
      const hasPaintCost = s.paintCost !== undefined && s.paintCost !== null && s.paintCost !== '' && !isNaN(parseFloat(s.paintCost));
      const priceRow = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '12.5px', marginTop: '6px', padding: '6px 8px', background: 'var(--paper2)', borderRadius: '6px' } });
      priceRow.appendChild(h('span', { style: { color: 'var(--steel)', fontWeight: '600' } },
        'Birim Fiyat: ' + formatMoney(parseFloat(s.unitPrice)) + '/' + unitLabel(s.tonnageUnit)));
      if (amount !== null) priceRow.appendChild(h('span', { style: { color: 'var(--inkSoft)' } }, 'Tutar (KDV hariç): ' + formatMoney(amount) + ' (KDV dahil ' + formatMoney(withVat(amount)) + ')'));
      if (hasPaintCost) priceRow.appendChild(h('span', { style: { color: 'var(--stamp)' } }, 'Boya: -' + formatMoney(parseFloat(s.paintCost))));
      if (net !== null && hasPaintCost) priceRow.appendChild(h('span', { style: { color: 'var(--signed)', fontWeight: '700' } }, 'Net: ' + formatMoney(net)));
      card.appendChild(priceRow);
    }

    const badgeRow = h('div', { style: { display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' } });
    badgeRow.appendChild(h('span', { className: 'badge', style: { color: s.signature ? 'var(--signed)' : 'var(--inkSoft)', background: s.signature ? 'var(--signed-bg)' : 'rgba(0,0,0,0.05)' } }, s.signature ? 'İmzalı' : 'İmzasız'));
    badgeRow.appendChild(h('span', { className: 'badge', style: { color: (s.photos && s.photos.length) ? 'var(--signed)' : 'var(--inkSoft)', background: (s.photos && s.photos.length) ? 'var(--signed-bg)' : 'rgba(0,0,0,0.05)' } }, (s.photos ? s.photos.length : 0) + ' görsel'));
    const invoicedBadge = h('span', {
      className: 'badge',
      title: 'Fatura durumunu hızlıca değiştir',
      onclick: (e) => { e.stopPropagation(); toggleInvoiced(s); },
      style: { display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: s.invoiced ? 'var(--signed)' : 'var(--warn)', background: s.invoiced ? 'var(--signed-bg)' : 'var(--warn-bg)' },
    }, [
      h('span', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '14px', height: '14px', borderRadius: '3px', border: '1.5px solid currentColor', background: s.invoiced ? 'currentColor' : 'transparent', flexShrink: '0' } }, s.invoiced ? h('span', { style: { display: 'flex', color: 'var(--cream)' } }, [ic('check', 10)]) : ''),
      s.invoiced ? 'Fatura Kesildi' : 'Fatura Kesilmedi',
    ]);
    badgeRow.appendChild(invoicedBadge);
    badgeRow.appendChild(h('button', {
      title: 'Resim olarak paylaş (WhatsApp vb.)',
      onclick: (e) => { e.stopPropagation(); shareShipmentImage(s); },
      style: { marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', border: 'none', borderRadius: '999px', padding: '6px 12px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', color: '#fff', background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 12px rgba(22,163,74,.3)' },
    }, [ic('share', 14, '#fff'), 'Paylaş']));
    card.appendChild(badgeRow);
    wrap.appendChild(card);
  });
  outer.appendChild(wrap);
  if (filtered.length > 10) outer.appendChild(buildPager(filtered.length, page, perPage, (p) => { state.listPage = p; rerenderResults(); }, (n) => { state.listPerPage = n; state.listPage = 1; rerenderResults(); }));
  return outer;
}
function rerenderResults() {
  const wrap = document.getElementById('results-wrap');
  if (!wrap) return;
  wrap.innerHTML = ''; wrap.appendChild(buildResultsList(filteredShipments()));
}

/* ============================== form view ============================== */
function renderFormView() {
  const f = state.form;
  const container = h('div', { style: { padding: '18px 16px' } });
  const topBar = h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' } }, [
    btn([ic('back', 17)], { onclick: () => { state.editingId = null; goBack(); render(); }, style: { width: '34px', height: '34px', justifyContent: 'center', padding: '0' } }, 'var(--cream)', 'var(--ink)'),
    h('h2', { style: { margin: '0', fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '18px', textTransform: 'uppercase' } }, state.editingId ? 'Sevkiyatı Düzenle' : 'Yeni Sevkiyat'),
  ]);
  topBar.firstChild.style.border = '1.5px solid var(--line)';
  container.appendChild(topBar);

  if (state.quickEntryNotice) {
    container.appendChild(h('div', { style: { background: 'var(--accent-soft-bg)', border: '1.5px solid var(--accent-soft-border)', color: 'var(--primary)', padding: '10px 12px', borderRadius: '10px', fontSize: '12.5px', marginBottom: '16px', fontWeight: '600' } }, 'Metinden bulabildiğim alanları doldurdum — lütfen kontrol edip eksikleri tamamla.'));
    state.quickEntryNotice = false;
  }

  container.appendChild(field([ic('calendar', 13), ' Sevk Tarihi'], inputEl({ type: 'date', value: f.date, onchange: (e) => (f.date = e.target.value) })));
  // Önceki kayıtlardan otomatik tamamlama: firma + plaka önerisi; bilinen plakada şoför bilgileri boşsa dolar.
  const companyInp = inputEl({ value: f.company, style: { fontFamily: "'Inter',sans-serif" }, oninput: (e) => (f.company = e.target.value.toLocaleUpperCase('tr-TR')) });
  companyInp.setAttribute('list', 'dl-company'); companyInp.setAttribute('autocomplete', 'off');
  const plateInp = inputEl({ value: f.plate, });
  plateInp.setAttribute('list', 'dl-plate'); plateInp.setAttribute('autocomplete', 'off');
  const driverInp = inputEl({ value: f.driver, style: { fontFamily: "'Inter',sans-serif" }, oninput: (e) => (f.driver = e.target.value.toLocaleUpperCase('tr-TR')) });
  const phoneInp = inputEl({ type: 'tel', value: f.driverPhone, oninput: (e) => (f.driverPhone = e.target.value.toLocaleUpperCase('tr-TR')) });
  const tcInp = inputEl({ type: 'text', inputMode: 'numeric', maxLength: 11, value: f.driverTC, oninput: (e) => (f.driverTC = e.target.value.replace(/[^0-9]/g, '')) });
  function fillFromPlate() {
    const key = trNormalize(f.plate).replace(/\s+/g, '');
    if (key.length < 5) return;
    const hit = state.shipments.find((x) => trNormalize(x.plate).replace(/\s+/g, '') === key);
    if (!hit) return;
    if (!f.driver && hit.driver) { f.driver = hit.driver; driverInp.value = hit.driver; }
    if (!f.driverPhone && hit.driverPhone) { f.driverPhone = hit.driverPhone; phoneInp.value = hit.driverPhone; }
    if (!f.driverTC && hit.driverTC) { f.driverTC = hit.driverTC; tcInp.value = hit.driverTC; }
    if (!f.company && hit.company) { f.company = hit.company; companyInp.value = hit.company; }
  }
  plateInp.addEventListener('input', (e) => { f.plate = e.target.value.toLocaleUpperCase('tr-TR'); fillFromPlate(); });
  plateInp.addEventListener('change', fillFromPlate);
  const dlCompany = h('datalist', { id: 'dl-company' }, Array.from(new Set(state.shipments.map((x) => x.company).filter(Boolean))).sort().map((c) => h('option', { value: c })));
  const seenPlates = {}; const dlPlate = h('datalist', { id: 'dl-plate' });
  state.shipments.forEach((x) => { if (x.plate && !seenPlates[x.plate]) { seenPlates[x.plate] = 1; dlPlate.appendChild(h('option', { value: x.plate, label: [x.plate, x.driver, x.company].filter(Boolean).join(' · ') })); } });
  container.appendChild(dlCompany); container.appendChild(dlPlate);
  container.appendChild(field([ic('building', 13), ' Firma Adı'], companyInp));
  container.appendChild(field('Araç Plakası', plateInp));
  container.appendChild(field([ic('user', 13), ' Şoför Adı'], driverInp));
  container.appendChild(field([ic('phone', 13), ' Şoför Telefonu'], phoneInp));
  container.appendChild(field([ic('user', 13), ' Şoför TC (opsiyonel)'], tcInp));

  const qtyWrap = h('div', { style: { display: 'flex', gap: '8px' } });
  qtyWrap.appendChild(inputEl({ type: 'number', inputMode: 'decimal', step: '0.01', value: f.tonnage, style: { flex: '1' }, oninput: (e) => (f.tonnage = e.target.value) }));
  const unitOptionDefs = [['kg', 'kg'], ['m2', 'm²'], ['adet', 'adet']];
  if (f.tonnageUnit === 'ton') unitOptionDefs.unshift(['ton', 'ton']);
  const unitSel = h('select', { className: 'input', style: { width: '90px', flex: '0 0 90px' }, onchange: (e) => (f.tonnageUnit = e.target.value) }, unitOptionDefs.map(([v, l]) => h('option', { value: v }, l)));
  unitSel.value = f.tonnageUnit; qtyWrap.appendChild(unitSel);
  container.appendChild(field([ic('package', 13), ' Malzeme Miktarı'], qtyWrap));

  container.appendChild(field([ic('palette', 13), ' Boya Detayları'], h('textarea', { className: 'input', rows: 3, style: { fontFamily: "'Inter',sans-serif", resize: 'vertical' }, oninput: (e) => (f.paintDetails = e.target.value.toLocaleUpperCase('tr-TR')) }, f.paintDetails)));

  const invoiceWrap = h('label', { style: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '4px', padding: '12px 14px' } });
  const invoiceCheckbox = h('input', { type: 'checkbox', checked: !!f.invoiced, style: { width: '18px', height: '18px', accentColor: 'var(--signed)', cursor: 'pointer' }, onchange: (e) => (f.invoiced = e.target.checked) });
  invoiceWrap.appendChild(invoiceCheckbox);
  invoiceWrap.appendChild(h('span', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '14px' } }, 'Fatura Kesildi mi?'));
  container.appendChild(field([ic('check', 13), ' Fatura Durumu'], invoiceWrap));

  const sigWrap = h('div', {});
  const sigCanvasBox = h('div', { style: { border: '2px dashed var(--line)', borderRadius: '4px', background: 'var(--cream)', height: '150px', touchAction: 'none', position: 'relative' } });
  const sigCanvas = h('canvas', { style: { width: '100%', height: '100%', display: 'block', cursor: 'crosshair' } });
  sigCanvasBox.appendChild(sigCanvas);
  sigWrap.appendChild(sigCanvasBox);
  const clearBtn = h('button', { type: 'button', style: { marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--steel)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '0' } }, [ic('rotate', 14), ' İmzayı temizle']);
  sigWrap.appendChild(clearBtn);
  container.appendChild(field([ic('edit', 13), ' Şoför İmzası'], sigWrap));

  const photoField = h('div', {});
  const photoGrid = h('div', { id: 'photo-grid', style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } });
  function rebuildPhotoGrid() {
    photoGrid.innerHTML = '';
    f.photos.forEach((p, i) => {
      const box = h('div', { style: { position: 'relative' } });
      box.appendChild(h('img', { src: photoThumb(p), loading: 'lazy', style: { width: '72px', height: '72px', objectFit: 'cover', borderRadius: '4px', border: '1.5px solid var(--line)' } }));
      box.appendChild(h('button', { onclick: () => { f.photos.splice(i, 1); rebuildPhotoGrid(); }, style: { position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, [ic('x', 12)]));
      photoGrid.appendChild(box);
    });
    if (f.photos.length < 6) {
      const addBtn = h('button', { type: 'button', onclick: () => photoFileInput.click(), style: { width: '72px', height: '72px', borderRadius: '4px', border: '2px dashed var(--line)', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--steel)', padding: '0' } }, [ic('camera', 20)]);
      photoGrid.appendChild(addBtn);
    }
  }
  const photoFileInput = h('input', {
    type: 'file', accept: 'image/*', multiple: true, style: { display: 'none' },
    onchange: async (e) => {
      const files = Array.from(e.target.files || []).slice(0, Math.max(0, 6 - f.photos.length));
      e.target.value = '';
      const built = await Promise.all(files.map((file) => compressImage(file, 1400, 0.75)));
      f.photos = f.photos.concat(built);
      rebuildPhotoGrid();
    },
  });
  rebuildPhotoGrid();
  photoField.appendChild(photoGrid); photoField.appendChild(photoFileInput);
  if (window.SevkNative && window.SevkNative.mediaLinked && !mediaOn()) photoField.appendChild(h('div', { onclick: () => window.SevkNative.mediaPick(), style: { marginTop: '8px', fontSize: '12px', color: 'var(--accent)', fontWeight: '600', cursor: 'pointer' } }, '📁 Fotoğraf ve imzalar buluta değil telefona kaydedilsin — klasör seç'));
  photoField.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)', marginTop: '6px' } }, 'En fazla 6 görsel — yazı okunabilir kalitede, tek versiyon olarak saklanır.'));
  container.appendChild(field([ic('camera', 13), ' Yükleme Görselleri'], photoField));

  if (state.error) container.appendChild(h('div', { style: { background: 'var(--danger-bg)', color: 'var(--stamp)', padding: '10px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '14px' } }, state.error));

  container.appendChild(btn([ic('check', 17), ' ' + (state.saving ? 'Kaydediliyor…' : state.editingId ? 'Değişiklikleri Kaydet' : 'Sevkiyatı Kaydet')], { disabled: state.saving, onclick: saveShipment, style: { width: '100%', justifyContent: 'center', padding: '14px', fontFamily: "'Inter',sans-serif", fontSize: '15px', fontWeight: '700', boxShadow: '0 6px 16px rgba(138,180,255,.30)' } }, 'var(--primary)', 'var(--cream)'));

  setTimeout(() => {
    const pad = attachSignaturePad(sigCanvas, f.signature, (val) => { f.signature = val; });
    clearBtn.onclick = () => pad.clear();
  }, 0);

  return container;
}

/* ============================== detail view ============================== */
function renderDetailView() {
  const s = state.shipments.find((x) => x.id === state.selectedId);
  const container = h('div', { style: { padding: '18px 16px' } });
  if (!s) { container.appendChild(h('div', {}, 'Kayıt bulunamadı.')); return container; }

  const topBar = h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' } }, [
    btn([ic('back', 17)], { onclick: () => { goBack(); render(); }, style: { width: '34px', height: '34px', justifyContent: 'center', padding: '0' } }, 'var(--cream)', 'var(--ink)'),
    h('h2', { style: { margin: '0', fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '18px', textTransform: 'uppercase' } }, 'Sevkiyat #' + String(s.seq).padStart(4, '0')),
  ]);
  topBar.firstChild.style.border = '1.5px solid var(--line)';
  container.appendChild(topBar);

  const infoBox = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '6px', padding: '18px', marginBottom: '16px' } });
  function row(label, value) { return h('div', { className: 'detailrow' }, [h('span', {}, label), h('span', {}, value)]); }
  infoBox.appendChild(row('Sevk Tarihi', formatDateTR(s.date)));
  infoBox.appendChild(row('Firma Adı', s.company));
  infoBox.appendChild(row('Araç Plakası', s.plate));
  infoBox.appendChild(row('Şoför Adı', s.driver));
  infoBox.appendChild(row('Şoför Telefonu', s.driverPhone || '—'));
  infoBox.appendChild(row('Şoför TC', s.driverTC || '—'));
  infoBox.appendChild(row('Malzeme Miktarı', s.tonnage ? (s.tonnage + ' ' + unitLabel(s.tonnageUnit)) : '—'));
  infoBox.appendChild(row('Boya Detayları', s.paintDetails || '—'));
  if (hasUnitPrice(s)) {
    infoBox.appendChild(row('Birim Fiyat', formatMoney(parseFloat(s.unitPrice)) + ' / ' + unitLabel(s.tonnageUnit)));
    const amt = costAmount(s);
    if (amt !== null) infoBox.appendChild(row('Tutar', formatMoney(amt)));
    if (s.paintCost !== undefined && s.paintCost !== null && s.paintCost !== '' && !isNaN(parseFloat(s.paintCost))) {
      infoBox.appendChild(row('Boya Maliyeti', '- ' + formatMoney(parseFloat(s.paintCost))));
      const n = netAmount(s);
      if (n !== null) infoBox.appendChild(row('Net Tutar', formatMoney(n)));
    }
  }
  infoBox.appendChild(h('div', { className: 'detailrow', style: { borderBottom: 'none' } }, [
    h('span', {}, 'Fatura Durumu'),
    h('span', { style: { color: s.invoiced ? 'var(--signed)' : 'var(--stamp)', fontWeight: '700', fontFamily: "'Inter',sans-serif" } }, s.invoiced ? 'KESİLDİ' : 'KESİLMEDİ'),
  ]));
  container.appendChild(infoBox);

  container.appendChild(h('div', { style: { fontSize: '11px', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '8px' } }, 'Şoför İmzası'));
  container.appendChild(s.signature
    ? h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '6px', padding: '10px', marginBottom: '16px' } }, [h('img', { src: devSrc(s.signature), style: { height: '100px' } })])
    : h('div', { style: { color: 'var(--inkSoft)', fontSize: '13px', border: '1.5px dashed var(--line)', borderRadius: '6px', padding: '14px 16px', marginBottom: '16px' } }, 'İmza alınmamış'));

  container.appendChild(h('div', { style: { fontSize: '11px', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '8px' } }, 'Yükleme Görselleri'));
  if (s.photos && s.photos.length) {
    const grid = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' } });
    s.photos.forEach((p, i) => {
      const box = h('div', { style: { position: 'relative', width: '110px' } });
      box.appendChild(h('img', { src: photoThumb(p), loading: 'lazy', style: { width: '110px', height: '110px', objectFit: 'cover', borderRadius: '4px', border: '1.5px solid var(--line)', display: 'block' } }));
      box.appendChild(h('button', {
        onclick: () => shareOrOpenDataUrl(photoOriginal(p), photoName(p, i), 'image/jpeg'),
        title: 'Görseli paylaş / görüntüle',
        style: { width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'var(--ink)', color: 'var(--cream)', border: 'none', borderRadius: '4px', padding: '5px 0', fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
      }, [ic('filedown', 12), ' Paylaş']));
      grid.appendChild(box);
    });
    container.appendChild(grid);
  } else {
    container.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--inkSoft)', fontSize: '13px', border: '1.5px dashed var(--line)', borderRadius: '6px', padding: '14px 16px', marginBottom: '20px' } }, [ic('imageoff', 16), ' Görsel eklenmemiş']));
  }

  const btnRow = h('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' } });
  btnRow.appendChild(btn([ic('edit', 14), ' Düzenle'], { onclick: () => openEdit(s) }, 'var(--steel)', 'var(--cream)'));
  btnRow.appendChild(btn([ic('copy', 14), ' Kopyala'], { onclick: () => duplicateShipment(s) }, 'none', 'var(--primary)'));
  btnRow.lastChild.style.border = '1.5px solid var(--accent-soft-border)';
  btnRow.appendChild(btn([ic('sheet', 14), ' Özet Görüntüle'], { onclick: () => { goTo('receipt'); render(); } }, 'var(--primary)', 'var(--cream)'));
  const pdfBtn = btn([ic('filedown', 14), ' ' + (state.pdfBusy ? 'Hazırlanıyor…' : 'PDF Kaydet')], { disabled: state.pdfBusy, onclick: async () => { state.pdfBusy = true; render(); try { const bytes = await buildReceiptPDF(s); await saveOrShareFile(bytes, 'sevkiyat-' + (s.plate || 'kayit').replace(/\s+/g, '') + '-' + s.date + '.pdf', 'application/pdf', { 'application/pdf': ['.pdf'] }); } catch (e) { state.error = 'PDF oluşturulurken bir sorun oluştu.'; } state.pdfBusy = false; render(); } }, 'var(--ink)', 'var(--cream)');
  btnRow.appendChild(pdfBtn);
  btnRow.appendChild(btn([ic('trash', 14), ' Kaydı Sil'], { onclick: () => requestDelete(s) }, 'none', 'var(--stamp)'));
  btnRow.lastChild.style.border = '1.5px solid var(--stamp)';
  container.appendChild(btnRow);

  if (state.error) container.appendChild(h('div', { style: { marginTop: '10px', background: 'var(--danger-bg)', color: 'var(--stamp)', padding: '10px 12px', borderRadius: '4px', fontSize: '13px' } }, state.error));
  return container;
}

/* ============================== receipt view ============================== */
function renderReceiptView() {
  const s = state.shipments.find((x) => x.id === state.selectedId);
  const container = h('div', { style: { padding: '18px 16px' } });
  if (!s) { container.appendChild(h('div', {}, 'Kayıt bulunamadı.')); return container; }

  const topBar = h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' } }, [
    btn([ic('back', 17)], { onclick: () => { goBack(); render(); }, style: { width: '38px', height: '38px', justifyContent: 'center', padding: '0' } }, 'var(--cream)', 'var(--ink)'),
    h('h2', { style: { margin: '0', fontFamily: "'Inter',sans-serif", fontWeight: '800', fontSize: '17px' } }, 'Sevkiyat Özeti'),
  ]);
  topBar.firstChild.style.border = '1.5px solid var(--line)';
  topBar.firstChild.style.borderRadius = '10px';
  container.appendChild(topBar);

  const sheet = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' } });
  sheet.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', marginBottom: '14px', borderBottom: '2px solid var(--ink)' } }, [
    h('span', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '800', fontSize: '16px' } }, 'SEVKİYAT FİŞİ'),
    h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', color: 'var(--steel)' } }, '#' + String(s.seq).padStart(4, '0')),
  ]));

  function row(label, value) { return h('div', { className: 'detailrow' }, [h('span', {}, label), h('span', {}, value || '—')]); }
  sheet.appendChild(row('Sevk Tarihi', formatDateTR(s.date)));
  sheet.appendChild(row('Firma Adı', s.company));
  sheet.appendChild(row('Araç Plakası', s.plate));
  sheet.appendChild(row('Şoför Adı', s.driver));
  sheet.appendChild(row('Şoför Telefonu', s.driverPhone));
  sheet.appendChild(row('Şoför TC', s.driverTC));
  sheet.appendChild(row('Malzeme Miktarı', s.tonnage ? (s.tonnage + ' ' + unitLabel(s.tonnageUnit)) : ''));
  sheet.appendChild(row('Boya Detayları', s.paintDetails));
  if (hasUnitPrice(s)) {
    sheet.appendChild(row('Birim Fiyat', formatMoney(parseFloat(s.unitPrice)) + ' / ' + unitLabel(s.tonnageUnit)));
    const amt = costAmount(s);
    if (amt !== null) sheet.appendChild(row('Tutar', formatMoney(amt)));
    if (s.paintCost !== undefined && s.paintCost !== null && s.paintCost !== '' && !isNaN(parseFloat(s.paintCost))) {
      sheet.appendChild(row('Boya Maliyeti', '- ' + formatMoney(parseFloat(s.paintCost))));
      const n = netAmount(s);
      if (n !== null) sheet.appendChild(row('Net Tutar', formatMoney(n)));
    }
  }
  sheet.appendChild(h('div', { className: 'detailrow', style: { borderBottom: 'none' } }, [
    h('span', {}, 'Fatura Durumu'),
    h('span', { style: { color: s.invoiced ? 'var(--signed)' : 'var(--stamp)', fontWeight: '700', fontFamily: "'Inter',sans-serif" } }, s.invoiced ? 'KESİLDİ' : 'KESİLMEDİ'),
  ]));
  container.appendChild(sheet);

  container.appendChild(h('div', { className: 'label', style: { marginTop: '18px' } }, 'Şoför İmzası'));
  container.appendChild(s.signature
    ? h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '12px', padding: '10px', marginBottom: '16px' } }, [h('img', { src: devSrc(s.signature), style: { height: '100px' } })])
    : h('div', { style: { color: 'var(--inkSoft)', fontSize: '13px', border: '1.5px dashed var(--line)', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' } }, 'İmza alınmamış'));

  container.appendChild(h('div', { className: 'label' }, 'Yükleme Görselleri'));
  if (s.photos && s.photos.length) {
    const grid = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' } });
    s.photos.forEach((p) => grid.appendChild(h('img', { src: photoThumb(p), loading: 'lazy', style: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1.5px solid var(--line)' } })));
    container.appendChild(grid);
  } else {
    container.appendChild(h('div', { style: { color: 'var(--inkSoft)', fontSize: '13px', border: '1.5px dashed var(--line)', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' } }, 'Görsel eklenmemiş'));
  }
  container.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)', textAlign: 'center' } }, 'Bu ekranı müşteriye göstermek için telefonu çevirebilir veya ekran görüntüsü alabilirsin.'));

  return container;
}

/* ============================== modals ============================== */
function renderPasteRestoreModal() {
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(17,24,39,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '55' } });
  const box = h('div', { style: { background: 'var(--cream)', borderRadius: '16px', padding: '20px', maxWidth: '360px', width: '100%', boxShadow: 'var(--shadow-lg)' } });
  box.appendChild(h('div', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '800', fontSize: '16px', marginBottom: '6px' } }, 'Yapıştırarak Yükle'));
  box.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginBottom: '12px', lineHeight: '1.5' } },
    'Dosya seçiciler çalışmıyorsa son çare: yedek .json dosyasını bir dosya yöneticisi veya metin uygulamasıyla aç, tüm içeriğini kopyala (Tümünü Seç → Kopyala), aşağıya yapıştır.'
  ));
  let pastedText = '';
  const textarea = h('textarea', { className: 'input', rows: 8, placeholder: 'JSON içeriğini buraya yapıştır…', style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', marginBottom: '12px' }, oninput: (e) => { pastedText = e.target.value; } });
  box.appendChild(textarea);
  const row = h('div', { style: { display: 'flex', gap: '10px' } });
  row.appendChild(btn(['Vazgeç'], { onclick: () => { state.showPasteRestore = false; render(); }, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'var(--paper2)', 'var(--ink)'));
  row.appendChild(btn(['Yükle'], {
    onclick: () => {
      try {
        parseJsonShipmentsText(pastedText, 'yapıştırılan metin');
        state.showPasteRestore = false;
      } catch (err) {
        state.error = 'Yapıştırılan metin okunamadı: ' + (err && err.message ? err.message : String(err));
      }
      render();
    },
    style: { flex: '1', justifyContent: 'center', padding: '10px' },
  }, 'var(--primary)', 'var(--cream)'));
  box.appendChild(row);
  overlay.appendChild(box);
  return overlay;
}
function renderRestoreModal() {
  const pr = state.pendingRestore;
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(43,42,40,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '70' } });
  const box = h('div', { style: { background: 'var(--cream)', borderRadius: '8px', padding: '22px', maxWidth: '340px', width: '100%', border: '1.5px solid var(--line)' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--stamp)' } }, [ic('warn', 18), h('span', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '16px', textTransform: 'uppercase' } }, 'Yedeği Geri Yükle')]));
  box.appendChild(h('p', { style: { fontSize: '13.5px', lineHeight: '1.5', marginBottom: '8px' }, html: '<strong>' + pr.source + '</strong> dosyasından <strong>' + pr.list.length + ' kayıt</strong> bulundu. Bu işlem, cihazdaki tüm verilerin üzerine yazacak ve geri alınamaz.' }));
  if (pr.type === 'excel') box.appendChild(h('p', { style: { fontSize: '12px', color: 'var(--steel)', lineHeight: '1.5', marginBottom: '8px', background: 'var(--paper2)', padding: '8px 10px', borderRadius: '4px' } }, "Not: Excel dosyaları imza ve fotoğrafları içermez — bu kayıtlar metin verileriyle geri yüklenecek."));
  if (pr.type === 'json' && pr.photosIncluded === false) box.appendChild(h('p', { style: { fontSize: '12px', color: 'var(--steel)', lineHeight: '1.5', marginBottom: '8px', background: 'var(--paper2)', padding: '8px 10px', borderRadius: '4px' } }, "Not: Bu, fotoğrafsız (hızlı) bir yedek. Geri yüklerken cihazdaki mevcut fotoğraflar SİLİNMEYECEK, korunacak."));
  if (pr.type === 'json' && pr.dateRanged) box.appendChild(h('p', { style: { fontSize: '12px', color: 'var(--stamp)', lineHeight: '1.5', marginBottom: '8px', background: 'var(--danger-bg)', padding: '8px 10px', borderRadius: '4px', fontWeight: '600' } }, "DİKKAT: Bu, belirli bir tarih aralığı için alınmış KISMİ bir yedek. Bununla geri yüklersen, bu aralığın dışındaki tüm kayıtlar SİLİNİR."));
  const seenCount = pr.seenParts ? pr.seenParts.length : 0;
  const incomplete = pr.type === 'json' && pr.totalOf && seenCount < pr.totalOf;
  if (incomplete) {
    box.appendChild(h('p', { style: { fontSize: '12px', color: 'var(--stamp)', lineHeight: '1.5', marginBottom: '8px', background: 'var(--danger-bg)', padding: '8px 10px', borderRadius: '4px' } },
      'Bu, çok parçalı bir yedeğin sadece ' + seenCount + '/' + pr.totalOf + ' parçası. Eksik parçalarla devam edersen o parçalardaki kayıtlar SİLİNİR.'
    ));
    box.appendChild(btn([ic('upload', 13), ' Parça Ekle (' + seenCount + '/' + pr.totalOf + ')'], { onclick: () => pickJsonFile(), style: { width: '100%', justifyContent: 'center', padding: '9px', marginBottom: '10px', fontSize: '13px' } }, 'none', 'var(--warn)'));
    box.lastChild.style.border = '1.5px solid var(--warn-border)';
  }
  const btnRow = h('div', { style: { display: 'flex', gap: '10px', marginTop: '14px' } });
  btnRow.appendChild(btn(['Vazgeç'], { disabled: state.restoreBusy, onclick: () => { state.pendingRestore = null; render(); }, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'none', 'var(--inkSoft)'));
  btnRow.lastChild.style.border = '1.5px solid var(--line)';
  btnRow.appendChild(btn([state.restoreBusy ? 'Yükleniyor…' : (incomplete ? 'Önce Tüm Parçaları Ekle' : 'Üzerine Yaz ve Geri Yükle')], { disabled: state.restoreBusy || incomplete, onclick: confirmRestore, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'var(--stamp)', 'var(--cream)'));
  box.appendChild(btnRow);
  overlay.appendChild(box);
  return overlay;
}
function renderDeleteModal() {
  const s = state.pendingDelete;
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(43,42,40,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '50' } });
  const box = h('div', { style: { background: 'var(--cream)', borderRadius: '8px', padding: '22px', maxWidth: '320px', width: '100%', border: '1.5px solid var(--line)' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--stamp)' } }, [ic('warn', 18), h('span', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '16px', textTransform: 'uppercase' } }, 'Çöp Kutusuna Taşı')]));
  box.appendChild(h('p', { style: { fontSize: '13.5px', lineHeight: '1.5', marginBottom: '14px' }, html: '<strong>#' + String(s.seq).padStart(4, '0') + ' — ' + s.company + '</strong> kaydı çöp kutusuna taşınsın mı? ' + TRASH_DAYS + ' gün içinde geri alabilirsiniz.' }));
  const btnRow = h('div', { style: { display: 'flex', gap: '10px' } });
  btnRow.appendChild(btn(['Vazgeç'], { onclick: () => { state.pendingDelete = null; render(); }, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'none', 'var(--inkSoft)'));
  btnRow.lastChild.style.border = '1.5px solid var(--line)';
  btnRow.appendChild(btn(['Evet, Taşı'], { onclick: confirmDelete, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'var(--stamp)', 'var(--cream)'));
  box.appendChild(btnRow);
  overlay.appendChild(box);
  return overlay;
}
function renderBackupPromptModal() {
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(43,42,40,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '50' } });
  const box = h('div', { style: { background: 'var(--cream)', borderRadius: '8px', padding: '22px', maxWidth: '320px', width: '100%', border: '1.5px solid var(--line)' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--signed)' } }, [ic('check', 18), h('span', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '16px', textTransform: 'uppercase' } }, 'Kayıt Tamamlandı')]));
  box.appendChild(h('p', { style: { fontSize: '13.5px', lineHeight: '1.5', marginBottom: '12px' } }, 'Kayıt cihaza yazıldı. Şimdi bir yedek (.json) almak ister misiniz?'));
  const checkWrap = h('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', cursor: 'pointer', fontSize: '12.5px', color: 'var(--inkSoft)' } });
  const checkbox = h('input', { type: 'checkbox', style: { width: '16px', height: '16px', cursor: 'pointer' } });
  checkWrap.appendChild(checkbox); checkWrap.appendChild(h('span', {}, 'Her kayıttan sonra bunu bir daha sorma'));
  box.appendChild(checkWrap);
  function applySuppressChoice() {
    if (checkbox.checked) { state.suppressBackupPrompt = true; try { localStorage.setItem('sevkiyat_suppress_backup_prompt', '1'); } catch (e) {} }
  }
  const btnRow = h('div', { style: { display: 'flex', gap: '10px' } });
  btnRow.appendChild(btn(['Hayır, Sonra'], { onclick: () => { applySuppressChoice(); state.pendingBackupPrompt = false; render(); }, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'none', 'var(--inkSoft)'));
  btnRow.lastChild.style.border = '1.5px solid var(--line)';
  btnRow.appendChild(btn(['Evet, Yedekle'], {
    onclick: async () => {
      applySuppressChoice();
      await runFullBackup();
      setTimeout(() => { state.successMsg = ''; render(); }, 7000);
      state.pendingBackupPrompt = false; render();
    },
    style: { flex: '1', justifyContent: 'center', padding: '10px' },
  }, 'var(--ink)', 'var(--cream)'));
  box.appendChild(btnRow);
  overlay.appendChild(box);
  return overlay;
}
function renderExitConfirmModal() {
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(17,24,39,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '60' } });
  const box = h('div', { style: { background: 'var(--cream)', borderRadius: '16px', padding: '22px', maxWidth: '300px', width: '100%', boxShadow: 'var(--shadow-lg)' } });
  box.appendChild(h('div', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '800', fontSize: '16px', marginBottom: '8px' } }, 'Çıkış yapmak istediğinize emin misiniz?'));
  box.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '16px', lineHeight: '1.5' } }, 'Verileriniz kaydedilmiş durumda, çıkmak veri kaybetmez.'));
  const row = h('div', { style: { display: 'flex', gap: '10px' } });
  row.appendChild(btn(['Hayır, Kal'], { onclick: () => { state.pendingExitConfirm = false; render(); }, style: { flex: '1', justifyContent: 'center', padding: '11px' } }, 'var(--paper2)', 'var(--ink)'));
  row.appendChild(btn(['Evet, Çık'], {
    onclick: () => {
      try { history.back(); } catch (e) {}
      try { window.close(); } catch (e) {}
    },
    style: { flex: '1', justifyContent: 'center', padding: '11px' },
  }, 'var(--stamp)', 'var(--cream)'));
  box.appendChild(row);
  overlay.appendChild(box);
  return overlay;
}

/* ============================== back-button handling ============================== */
function handleBackIntent() {
  if (state.locked) return false;
  if (state.pendingPurge) { state.pendingPurge = null; render(); return true; }
  if (state.pendingQuoteDelete) { state.pendingQuoteDelete = null; render(); return true; }
  if (state.uiExpanded.backup) { state.uiExpanded.backup = false; render(); return true; }
  if (state.navMenuOpen) { state.navMenuOpen = false; render(); return true; }
  if (state.pendingCostEdit) { state.pendingCostEdit = null; render(); return true; }
  if (state.wa && !state.wa.busy) { state.wa = null; render(); return true; }
  if (state.pendingInvoice) { state.pendingInvoice = null; render(); return true; }
  if (state.pendingDelete) { state.pendingDelete = null; render(); return true; }
  if (state.pendingRestore) { state.pendingRestore = null; render(); return true; }
  if (state.pendingBackupPrompt) { state.pendingBackupPrompt = false; render(); return true; }
  if (state.showPasteRestore) { state.showPasteRestore = false; render(); return true; }
  if (state.pendingExitConfirm) return false;
  if (state.view !== 'list') {
    goBack(); render();
    return true;
  }
  state.pendingExitConfirm = true;
  render();
  return true;
}
window.addEventListener('popstate', () => {
  const stay = handleBackIntent();
  if (stay) { try { history.pushState(null, '', ''); } catch (e) {} }
});
try { history.pushState(null, '', ''); } catch (e) {}

/* ============================== cost (maliyet) view ============================== */
function hasUnitPrice(s) { return s.unitPrice !== undefined && s.unitPrice !== null && s.unitPrice !== '' && !isNaN(parseFloat(s.unitPrice)); }
function filteredForCost() {
  const cq = state.costQuery.trim() ? trNormalize(state.costQuery.trim()) : '';
  return state.shipments.filter((s) => {
    if (state.costCompanyFilter && s.company !== state.costCompanyFilter) return false;
    if (state.costDateFrom && s.date && s.date < state.costDateFrom) return false;
    if (state.costDateTo && s.date && s.date > state.costDateTo) return false;
    if (state.costPriceFilter === 'yes' && !hasUnitPrice(s)) return false;
    if (state.costPriceFilter === 'no' && hasUnitPrice(s)) return false;
    if (cq && !trNormalize(s.company).includes(cq)) return false;
    return true;
  });
}
function costAmount(s) {
  const qty = parseFloat(s.tonnage), price = parseFloat(s.unitPrice);
  if (isNaN(qty) || isNaN(price)) return null;
  return qty * price;
}
function netAmount(s) {
  const gross = costAmount(s);
  if (gross === null) return null;
  const paintCost = parseFloat(s.paintCost);
  return gross - (isNaN(paintCost) ? 0 : paintCost);
}
function getVatRate() { return 20; }
function vatAmount(v) { return v * getVatRate() / 100; }
function withVat(v) { return v * (1 + getVatRate() / 100); }
function setVatRate(r) { state.vatRate = r; try { localStorage.setItem('sevkiyat_vat_rate', String(r)); } catch (e) {} }
function formatMoney(v) { return v.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺'; }

/* ============================== quotes ============================== */
function filteredQuotes() {
  const q = state.quoteQuery.trim() ? trNormalize(state.quoteQuery.trim()) : '';
  return state.quotes.filter((qt) => {
    if (state.quoteStatusFilter && qt.status !== state.quoteStatusFilter) return false;
    if (q && !trNormalize(qt.company + ' ' + qt.work).includes(q)) return false;
    return true;
  });
}
async function saveQuote() {
  const f = state.quoteForm;
  if (!f.company.trim()) { state.error = 'Firma adı gerekli.'; render(); return; }
  state.quoteSaving = true; state.error = ''; render();
  const record = Object.assign({}, f, {
    id: state.editingQuoteId || uid(),
    company: f.company.trim(),
    createdAt: state.editingQuoteId ? (state.quotes.find((x) => x.id === state.editingQuoteId) || {}).createdAt || Date.now() : Date.now(),
  });
  record.updatedAt = Date.now();
  try {
    await dbPutQuote(record);
    if (supabaseClient) cloudPushQuote(record).catch(() => {});
    const idx = state.quotes.findIndex((x) => x.id === record.id);
    if (idx === -1) state.quotes.unshift(record); else state.quotes[idx] = record;
    state.quotes.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.createdAt - a.createdAt);
    state.quoteForm = emptyQuoteForm();
    state.editingQuoteId = null;
    state.uiExpanded.quoteForm = false;
    state.successMsg = '✓ Teklif kaydedildi.';
    setTimeout(() => { state.successMsg = ''; render(); }, 4000);
  } catch (e) { state.error = 'Teklif kaydedilemedi.'; }
  state.quoteSaving = false; render();
}
async function confirmDeleteQuote() {
  const id = state.pendingQuoteDelete;
  if (!id) return;
  try {
    await dbDeleteQuote(id);
    markDeleted(id);
    if (supabaseClient) {
      const ok = await cloudDeleteQuote(id);
      if (ok) unmarkDeleted(id);
    }
    state.quotes = state.quotes.filter((q) => q.id !== id);
  } catch (e) { state.error = 'Teklif silinemedi.'; }
  state.pendingQuoteDelete = null; render();
}
function editQuote(q) {
  state.quoteForm = { date: q.date, company: q.company, work: q.work, paintThickness: q.paintThickness, tonnage: q.tonnage, tonnageUnit: q.tonnageUnit, price: q.price, status: q.status, notes: q.notes || '' };
  state.editingQuoteId = q.id;
  state.uiExpanded.quoteForm = true;
  render();
}
function renderQuoteForm() {
  const f = state.quoteForm;
  const box = h('div', { className: 'panel-in', style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '14px', marginBottom: '14px' } });
  const grid = h('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' } });
  function field(label, el, flexBasis) {
    const w = h('div', { style: { flex: flexBasis || '1 1 140px' } });
    w.appendChild(h('label', { style: { display: 'block', fontSize: '10.5px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, label));
    w.appendChild(el);
    return w;
  }
  grid.appendChild(field('Tarih', inputEl({ type: 'date', value: f.date, onchange: (e) => { f.date = e.target.value; } })));
  grid.appendChild(field('Firma Adı', inputEl({ type: 'text', value: f.company, list: 'company-list', placeholder: 'Örn: Alesta A.Ş.', onchange: (e) => { f.company = e.target.value; } }), '1 1 200px'));
  grid.appendChild(field('Yapılacak İş', inputEl({ type: 'text', value: f.work, placeholder: 'Örn: Kumlama + boya', onchange: (e) => { f.work = e.target.value; } }), '1 1 200px'));
  grid.appendChild(field('Boya Kalınlığı', inputEl({ type: 'text', value: f.paintThickness, placeholder: 'Örn: 80 mikron', onchange: (e) => { f.paintThickness = e.target.value; } })));
  const tonnageRow = h('div', { style: { display: 'flex', gap: '6px' } });
  tonnageRow.appendChild(inputEl({ type: 'number', value: f.tonnage, placeholder: 'Miktar', step: '0.01', style: { flex: '1' }, onchange: (e) => { f.tonnage = e.target.value; } }));
  const unitSelect = h('select', { className: 'input', style: { flex: '0 0 80px' }, onchange: (e) => { f.tonnageUnit = e.target.value; } }, ['ton', 'kg', 'm²', 'adet'].map((u) => h('option', { value: u }, u)));
  unitSelect.value = f.tonnageUnit;
  tonnageRow.appendChild(unitSelect);
  grid.appendChild(field('İşin Tonajı', tonnageRow));
  grid.appendChild(field('Teklif Fiyatı (₺)', inputEl({ type: 'number', value: f.price, placeholder: '0.00', step: '0.01', onchange: (e) => { f.price = e.target.value; } })));
  const statusSelect = h('select', { className: 'input' }, Object.keys(QUOTE_STATUSES).map((k) => h('option', { value: k }, QUOTE_STATUSES[k].label)));
  statusSelect.value = f.status;
  statusSelect.onchange = (e) => { f.status = e.target.value; };
  grid.appendChild(field('Durum', statusSelect));
  box.appendChild(grid);
  const notesArea = h('textarea', { className: 'input', rows: '2', placeholder: 'Not (opsiyonel)', style: { width: '100%', marginBottom: '10px', resize: 'vertical' }, onchange: (e) => { f.notes = e.target.value; } }, f.notes || '');
  box.appendChild(notesArea);
  const btnRow = h('div', { style: { display: 'flex', gap: '8px' } });
  btnRow.appendChild(btn([state.quoteSaving ? 'Kaydediliyor…' : (state.editingQuoteId ? 'Teklifi Güncelle' : 'Teklifi Kaydet')], { disabled: state.quoteSaving, onclick: saveQuote, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'var(--primary)', 'var(--on-primary)'));
  if (state.editingQuoteId) {
    btnRow.appendChild(btn(['Vazgeç'], { onclick: () => { state.quoteForm = emptyQuoteForm(); state.editingQuoteId = null; state.uiExpanded.quoteForm = false; render(); }, style: { padding: '10px 16px' } }, 'none', 'var(--inkSoft)'));
    btnRow.lastChild.style.border = '1.5px solid var(--line)';
  }
  box.appendChild(btnRow);
  return box;
}
function buildQuoteCard(q) {
  const st = QUOTE_STATUSES[q.status] || QUOTE_STATUSES.bekliyor;
  const card = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '14px', cursor: 'pointer' }, onclick: () => editQuote(q) });
  const topRow = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' } });
  topRow.appendChild(h('div', { style: { fontWeight: '700', fontSize: '14.5px', color: 'var(--ink)' } }, q.company));
  topRow.appendChild(h('span', { className: 'badge', style: { color: st.color, background: st.bg, flexShrink: '0' } }, st.label));
  card.appendChild(topRow);
  if (q.work) card.appendChild(h('div', { style: { fontSize: '13px', color: 'var(--inkSoft)', marginBottom: '4px' } }, q.work));
  const metaBits = [];
  if (q.paintThickness) metaBits.push('Boya: ' + q.paintThickness);
  if (q.tonnage) metaBits.push('Miktar: ' + q.tonnage + ' ' + (q.tonnageUnit || ''));
  if (q.price) metaBits.push('Fiyat: ' + Number(q.price).toLocaleString('tr-TR') + ' ₺');
  if (metaBits.length) card.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--steel)', marginBottom: '4px' } }, metaBits.join(' · ')));
  const bottomRow = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' } });
  bottomRow.appendChild(h('span', { style: { fontSize: '11.5px', color: 'var(--inkSoft)' } }, formatDateTR(q.date)));
  const actions = h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } });
  actions.appendChild(h('span', {
    onclick: async (e) => {
      e.stopPropagation();
      if (state.quotePdfBusyId) return;
      state.quotePdfBusyId = q.id; render();
      try {
        const bytes = await buildQuotePDF(q);
        await saveOrShareFile(bytes, 'teklif-' + (q.company || 'musteri').replace(/[^a-zA-Z0-9ığüşöçİĞÜŞÖÇ ]/g, '').trim().replace(/\s+/g, '-') + '-' + todayISO() + '.pdf', 'application/pdf', { 'application/pdf': ['.pdf'] });
      } catch (err) { state.error = 'Teklif PDF\'i oluşturulamadı.'; }
      state.quotePdfBusyId = null; render();
    },
    style: { fontSize: '11.5px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' },
  }, [ic('filedown', 12), state.quotePdfBusyId === q.id ? 'Hazırlanıyor…' : 'PDF Gönder']));
  actions.appendChild(h('span', {
    onclick: (e) => { e.stopPropagation(); state.pendingQuoteDelete = q.id; render(); },
    style: { fontSize: '11.5px', color: 'var(--stamp)', cursor: 'pointer', fontWeight: '600' },
  }, 'Sil'));
  bottomRow.appendChild(actions);
  card.appendChild(bottomRow);
  return card;
}
function renderQuotesView() {
  const container = h('div', { style: { padding: '18px 16px' } });
  const toggle = h('button', {
    onclick: () => { state.uiExpanded.quoteForm = !state.uiExpanded.quoteForm; if (!state.uiExpanded.quoteForm) { state.quoteForm = emptyQuoteForm(); state.editingQuoteId = null; } render(); },
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '4px', padding: '9px 12px', fontSize: '13px', fontWeight: '600', color: 'var(--ink)', cursor: 'pointer', marginBottom: state.uiExpanded.quoteForm ? '10px' : '14px' },
  }, [
    h('span', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [ic('plus', 13), state.editingQuoteId ? 'Teklifi Düzenle' : 'Yeni Teklif']),
    h('span', { style: { color: 'var(--steel)' } }, state.uiExpanded.quoteForm ? '▲' : '▼'),
  ]);
  container.appendChild(toggle);
  if (state.uiExpanded.quoteForm) container.appendChild(renderQuoteForm());

  const searchRow = h('div', { style: { display: 'flex', gap: '8px', marginBottom: '10px' } });
  searchRow.appendChild(inputEl({ type: 'text', value: state.quoteQuery, placeholder: 'Firma veya iş ara', style: { flex: '1' }, oninput: debounce((e) => { state.quoteQuery = e.target.value; state.quotePage = 1; render(); }, 180) }));
  const statusFilterSelect = h('select', { className: 'input', style: { flex: '0 0 150px' }, onchange: (e) => { state.quoteStatusFilter = e.target.value; state.quotePage = 1; render(); } },
    [h('option', { value: '' }, 'Tüm Durumlar')].concat(Object.keys(QUOTE_STATUSES).map((k) => h('option', { value: k }, QUOTE_STATUSES[k].label)))
  );
  statusFilterSelect.value = state.quoteStatusFilter;
  searchRow.appendChild(statusFilterSelect);
  container.appendChild(searchRow);

  const filtered0 = filteredQuotes();
  container.appendChild(btn([ic('sheet', 14), ' Excel\'e Aktar (' + filtered0.length + ')'], {
    disabled: filtered0.length === 0,
    onclick: () => exportQuotesExcel(filtered0),
    style: { width: '100%', justifyContent: 'center', padding: '9px', marginBottom: '14px', fontSize: '13px' },
  }, 'var(--signed)', 'var(--cream)'));

  if (state.successMsg) container.appendChild(h('div', { style: { background: 'var(--signed-bg)', color: 'var(--signed)', padding: '10px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '14px', fontWeight: '600' } }, state.successMsg));
  if (state.error) container.appendChild(h('div', { style: { background: 'var(--danger-bg)', color: 'var(--stamp)', padding: '10px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '14px' } }, state.error));

  const filtered = filtered0;
  if (filtered.length === 0) {
    container.appendChild(h('div', { style: { textAlign: 'center', padding: '48px 20px', color: 'var(--inkSoft)', border: '1.5px dashed var(--line)', borderRadius: '6px', fontSize: '14px' } }, state.quotes.length === 0 ? 'Henüz teklif yok. "Yeni Teklif" ile ilk teklifi ekleyin.' : 'Aramanızla eşleşen teklif bulunamadı.'));
  } else {
    const perPage = state.quotePerPage;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const page = Math.min(Math.max(1, state.quotePage), totalPages);
    const visible = filtered.slice((page - 1) * perPage, page * perPage);
    const wrap = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } });
    visible.forEach((q) => wrap.appendChild(buildQuoteCard(q)));
    container.appendChild(wrap);
    if (filtered.length > 10) container.appendChild(buildPager(filtered.length, page, perPage, (p) => { state.quotePage = p; render(); }, (n) => { state.quotePerPage = n; state.quotePage = 1; render(); }));
  }

  if (state.pendingQuoteDelete) {
    const modal = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(17,24,39,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '60' }, onclick: () => { state.pendingQuoteDelete = null; render(); } });
    const box = h('div', { onclick: (e) => e.stopPropagation(), style: { background: 'var(--cream)', borderRadius: '12px', padding: '18px', maxWidth: '320px', width: '100%' } });
    box.appendChild(h('div', { style: { fontWeight: '700', marginBottom: '8px' } }, 'Teklifi sil?'));
    box.appendChild(h('div', { style: { fontSize: '13px', color: 'var(--inkSoft)', marginBottom: '14px' } }, 'Bu işlem geri alınamaz.'));
    const row = h('div', { style: { display: 'flex', gap: '8px' } });
    row.appendChild(btn(['Vazgeç'], { onclick: () => { state.pendingQuoteDelete = null; render(); }, style: { flex: '1', justifyContent: 'center', padding: '9px' } }, 'none', 'var(--inkSoft)'));
    row.lastChild.style.border = '1.5px solid var(--line)';
    row.appendChild(btn(['Sil'], { onclick: confirmDeleteQuote, style: { flex: '1', justifyContent: 'center', padding: '9px' } }, 'var(--stamp)', '#fff'));
    box.appendChild(row);
    modal.appendChild(box);
    container.appendChild(modal);
  }

  return container;
}

/* ============================== boya hesaplama ============================== */
function computePaintCalc() {
  const pc = state.paintCalc;
  const num = (v) => { const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? 0 : n; };
  const area = num(pc.area), tonnage = num(pc.tonnage);
  const lossDivisor = Math.max(0.05, 1 - num(pc.lossPct) / 100);
  const astarL = num(pc.astarVS) > 0 ? (area * num(pc.astarMicron)) / (num(pc.astarVS) * 10) / lossDivisor : 0;
  const sonkatL = num(pc.sonkatVS) > 0 ? (area * num(pc.sonkatMicron)) / (num(pc.sonkatVS) * 10) / lossDivisor : 0;
  const tinerL = (astarL + sonkatL) * (num(pc.tinerPct) / 100);
  const baseCost = astarL * num(pc.astarPrice) + sonkatL * num(pc.sonkatPrice) + tinerL * num(pc.tinerPrice);
  const totalCost = baseCost * (1 + num(pc.profitPct) / 100);
  const costPerM2 = area > 0 ? totalCost / area : 0;
  const costPerKg = tonnage > 0 ? totalCost / (tonnage * 1000) : 0;
  const TENEKE_L = 20;
  const astarTeneke = Math.ceil(astarL / TENEKE_L);
  const sonkatTeneke = Math.ceil(sonkatL / TENEKE_L);
  const tinerTeneke = Math.ceil(tinerL / TENEKE_L);
  const weightKg = tonnage * 1000;
  const laborRatio = tonnage > 0 ? area / tonnage : 0;
  const laborFactor = laborRatio / OFFER_BASE_RATIO;
  const laborDiscountMult = 1 - Math.min(100, Math.max(0, num(pc.laborDiscountPct))) / 100;
  const kumlamaPerKg = OFFER_BASE_PRICES.kumlama * laborFactor * laborDiscountMult;
  const boyaIscilikPerKg = OFFER_BASE_PRICES.boyaIscilik * laborFactor * laborDiscountMult;
  const laborCost = (kumlamaPerKg + boyaIscilikPerKg) * weightKg;
  const grandTotal = totalCost + laborCost;
  const grandTotalPerKg = weightKg > 0 ? grandTotal / weightKg : 0;
  return { astarL, sonkatL, tinerL, totalCost, baseCost, costPerM2, costPerKg, area, tonnage, astarTeneke, sonkatTeneke, tinerTeneke, weightKg, laborRatio, kumlamaPerKg, boyaIscilikPerKg, laborCost, grandTotal, grandTotalPerKg };
}
function renderPaintCalcView() {
  const container = h('div', { style: { padding: '18px 16px' } });
  const pc = state.paintCalc;
  function numField(label, key, placeholder, suffix) {
    const w = h('div', { style: { flex: '1 1 45%' } });
    w.appendChild(h('label', { style: { display: 'block', fontSize: '10.5px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, label));
    const row = h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } });
    row.appendChild(inputEl({ type: 'number', inputMode: 'decimal', value: pc[key], placeholder: placeholder || '', style: { flex: '1' }, oninput: (e) => { pc[key] = e.target.value; rerenderPaintCalc(); } }));
    if (suffix) row.appendChild(h('span', { style: { fontSize: '11.5px', color: 'var(--inkSoft)', flexShrink: '0' } }, suffix));
    w.appendChild(row);
    return w;
  }

  container.appendChild(h('h2', { style: { margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: 'var(--ink)' } }, 'Yıldız Kumlama Boya Maliyet Hesap'));
  container.appendChild(h('div', { style: { fontSize: '13px', color: 'var(--inkSoft)', marginBottom: '14px', lineHeight: '1.5' } }, 'Alan, tonaj ve boya bilgilerini gir — litre sarfiyatı ve maliyet aşağıda otomatik hesaplanır.'));

  const grid = h('div', { id: 'paintcalc-inputs', style: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' } });
  grid.appendChild(numField('Boyanacak Alan', 'area', '', 'm²'));
  grid.appendChild(numField('Proje Tonajı', 'tonnage', '', 'ton'));
  grid.appendChild(numField('Epoksi Astar Kalınlığı', 'astarMicron', '', 'mikron'));
  grid.appendChild(numField('Poliüretan Sonkat Kalınlığı', 'sonkatMicron', '', 'mikron'));
  grid.appendChild(numField('Kayıp Faktörü', 'lossPct', '', '%'));
  grid.appendChild(numField('Tiner Oranı (astar+sonkat üzerinden)', 'tinerPct', '', '%'));
  container.appendChild(grid);
  container.appendChild(buildLossHint());

  const pricesToggle = h('button', {
    onclick: () => { state.paintCalcPricesOpen = !state.paintCalcPricesOpen; render(); },
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '4px', padding: '9px 12px', fontSize: '13px', fontWeight: '600', color: 'var(--ink)', cursor: 'pointer', marginBottom: state.paintCalcPricesOpen ? '10px' : '14px' },
  }, [
    h('span', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [ic('sheet', 13), ' Katı Madde ve Litre Fiyatları']),
    h('span', { style: { color: 'var(--steel)' } }, state.paintCalcPricesOpen ? '▲' : '▼'),
  ]);
  container.appendChild(pricesToggle);
  if (state.paintCalcPricesOpen) {
    const priceGrid = h('div', { className: 'panel-in', id: 'paintcalc-prices', style: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px', background: 'var(--paper2)', borderRadius: '10px', padding: '12px' } });
    priceGrid.appendChild(numField('Astar Katı Madde Oranı', 'astarVS', '80', '%'));
    priceGrid.appendChild(numField('Sonkat Katı Madde Oranı', 'sonkatVS', '69', '%'));
    priceGrid.appendChild(numField('Astar Birim Fiyatı', 'astarPrice', '0.00', '₺/L'));
    priceGrid.appendChild(numField('Sonkat Birim Fiyatı', 'sonkatPrice', '0.00', '₺/L'));
    priceGrid.appendChild(numField('Tiner Birim Fiyatı', 'tinerPrice', '0.00', '₺/L'));
    priceGrid.appendChild(numField('Kâr Oranı', 'profitPct', '20', '%'));
    priceGrid.appendChild(numField('Kumlama+Boya İşçiliği İskontosu', 'laborDiscountPct', '0', '%'));
    container.appendChild(priceGrid);
  }

  container.appendChild(buildPaintCalcResults());

  container.appendChild(btn([ic('filedown', 14), state.paintCalcPdfBusy ? ' Hazırlanıyor…' : ' Yazdır / PDF\'e Aktar'], {
    disabled: state.paintCalcPdfBusy,
    onclick: async () => {
      state.paintCalcPdfBusy = true; state.error = ''; render();
      try {
        const bytes = await buildPaintCalcPDF();
        await saveOrShareFile(bytes, 'boya-hesap-' + todayISO() + '.pdf', 'application/pdf', { 'application/pdf': ['.pdf'] });
      } catch (e) { state.error = 'PDF oluşturulurken bir sorun oluştu.'; }
      state.paintCalcPdfBusy = false; render();
    },
    style: { width: '100%', justifyContent: 'center', padding: '11px', marginTop: '14px', fontSize: '13.5px' },
  }, 'var(--ink)', 'var(--cream)'));
  return container;
}
function buildPaintCalcResults() {
  const r = computePaintCalc();
  const box = h('div', { id: 'paintcalc-results', style: { background: 'var(--signed-bg-soft)', border: '1.5px solid var(--signed-border)', borderRadius: '10px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' } });
  function line(label, value) {
    const row = h('div', { style: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px 10px', fontSize: '13.5px' } });
    row.appendChild(h('span', { style: { color: 'var(--ink)' } }, label));
    row.appendChild(h('span', { style: { fontWeight: '700', color: 'var(--signed)', textAlign: 'right' } }, value));
    return row;
  }
  box.appendChild(line('Epoksi Astar Tahmini Tüketimi', r.astarL.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' litre (~' + r.astarTeneke + ' teneke · 20L)'));
  box.appendChild(line('Poliüretan Sonkat Tahmini Tüketimi', r.sonkatL.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' litre (~' + r.sonkatTeneke + ' teneke · 20L)'));
  box.appendChild(line('Tahmini Tiner Tüketimi', r.tinerL.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' litre (~' + r.tinerTeneke + ' teneke · 20L)'));
  box.appendChild(h('div', { style: { borderTop: '1px solid var(--signed-border-soft)', margin: '4px 0' } }));
  const profitPct = parseFloat(String(state.paintCalc.profitPct).replace(',', '.')) || 0;
  if (profitPct > 0) box.appendChild(line('Malzeme Maliyeti', formatMoney(r.baseCost)));
  box.appendChild(line(profitPct > 0 ? 'Toplam (Kâr Dahil, %' + profitPct + ')' : 'Toplam Boya Maliyeti', formatMoney(r.totalCost)));
  box.appendChild(line('Proje m² Birim Maliyet Tahmini', formatMoney(r.costPerM2) + '/m²'));
  box.appendChild(line('1 kg Çelik Boyama Maliyeti Tahmini', formatMoney(r.costPerKg) + '/kg'));
  if (r.weightKg > 0) {
    const laborDiscount = parseFloat(String(state.paintCalc.laborDiscountPct).replace(',', '.')) || 0;
    const discountSuffix = laborDiscount > 0 ? ' (%' + laborDiscount + ' iskontolu)' : '';
    box.appendChild(h('div', { style: { borderTop: '1px solid var(--signed-border-soft)', margin: '4px 0' } }));
    box.appendChild(line('Kumlama İşçiliği' + discountSuffix, r.kumlamaPerKg.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ₺/kg'));
    box.appendChild(line('Boya İşçiliği' + discountSuffix, r.boyaIscilikPerKg.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ₺/kg'));
    const grandRow = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px', paddingTop: '8px', borderTop: '1.5px dashed var(--signed-border-dash)' } });
    grandRow.appendChild(h('span', { style: { fontSize: '12px', fontWeight: '700', color: 'var(--ink)', textTransform: 'uppercase' } }, 'Kumlama + Boya İşçiliği + Boya Dahil Fiyat'));
    grandRow.appendChild(h('span', { style: { fontSize: '19px', fontWeight: '800', color: 'var(--signed)' } }, formatMoney(r.grandTotal) + ' (' + r.grandTotalPerKg.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ₺/kg)'));
    box.appendChild(grandRow);
  }
  return box;
}
function suggestedLossFactor(area, tonnage) {
  if (!tonnage || tonnage <= 0 || !area || area <= 0) return null;
  const ratio = area / tonnage;
  return Math.round(ratio * 1.8 * 10) / 10;
}
function buildLossHint() {
  const pc = state.paintCalc;
  const area = parseFloat(String(pc.area).replace(',', '.'));
  const tonnage = parseFloat(String(pc.tonnage).replace(',', '.'));
  const suggested = suggestedLossFactor(area, tonnage);
  const wrap = h('div', { id: 'loss-hint' });
  if (suggested !== null) {
    const row = h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '11.5px', color: 'var(--inkSoft)', marginTop: '-6px', marginBottom: '14px' } });
    row.appendChild(h('span', {}, 'm²/ton oranı: ' + (area / tonnage).toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + ' → önerilen kayıp faktörü: %' + suggested));
    row.appendChild(h('span', {
      onclick: () => { pc.lossPct = String(suggested); render(); },
      style: { color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' },
    }, 'Uygula'));
    wrap.appendChild(row);
  }
  return wrap;
}
function rerenderPaintCalc() {
  const oldHint = document.getElementById('loss-hint');
  if (oldHint && oldHint.parentNode) oldHint.parentNode.replaceChild(buildLossHint(), oldHint);
  const old = document.getElementById('paintcalc-results');
  if (old && old.parentNode) old.parentNode.replaceChild(buildPaintCalcResults(), old);
}
function buildPaintCalcPageContent() {
  const pc = state.paintCalc, r = computePaintCalc();
  const pageW = PDF_PAGE_W, pageH = PDF_PAGE_H, margin = 46;
  const lines = [];

  const headerH = 100;
  lines.push('q 0.31 0.27 0.90 rg 0 ' + (pageH - headerH) + ' ' + pageW + ' ' + headerH + ' re f Q');
  lines.push('q 0.55 0.50 0.95 rg 0 ' + (pageH - headerH) + ' ' + pageW + ' 5 re f Q');
  lines.push('q 1 1 1 rg BT /F1 22 Tf ' + margin + ' ' + (pageH - 42) + ' Td (' + pdfEscapeText('YILDIZ KUMLAMA BOYA') + ') Tj ET Q');
  lines.push('q 0.90 0.89 1 rg BT /F1 13.5 Tf ' + margin + ' ' + (pageH - 66) + ' Td (' + pdfEscapeText('Boya Uygulama Teklifi') + ') Tj ET Q');
  const dateText = formatDateTR(todayISO());
  lines.push('q 1 1 1 rg BT /F1 10 Tf ' + (pageW - margin - dateText.length * 5.6) + ' ' + (pageH - 40) + ' Td (' + pdfEscapeText(dateText) + ') Tj ET Q');

  let y = pageH - headerH - 38;
  lines.push('BT /F1 11.5 Tf ' + margin + ' ' + y + ' Td (' + pdfEscapeText('Sayin Yetkili,') + ') Tj ET');
  y -= 20;
  lines.push('q 0.4 0.4 0.45 rg BT /F1 10 Tf ' + margin + ' ' + y + ' Td (' + pdfEscapeText('Projeniz icin hazirlanan boya uygulama teklifi asagida bilgilerinize sunulmustur:') + ') Tj ET Q');
  y -= 34;

  const cardGap = 12, cardW = (pageW - 2 * margin - 2 * cardGap) / 3, cardH = 62, cardTop = y, cardBottom = cardTop - cardH;
  const cards = [
    ['ALAN', (r.area || 0).toLocaleString('tr-TR') + ' m2'],
    ['TONAJ', (r.tonnage || 0).toLocaleString('tr-TR') + ' ton'],
    ['KAPLAMA', (pc.astarMicron || '0') + '+' + (pc.sonkatMicron || '0') + ' mikron'],
  ];
  cards.forEach((c, i) => {
    const cx = margin + i * (cardW + cardGap);
    lines.push('q 0.96 0.96 0.98 rg ' + cx + ' ' + cardBottom + ' ' + cardW + ' ' + cardH + ' re f Q');
    lines.push('q 0.31 0.27 0.90 rg ' + cx + ' ' + (cardTop - 4) + ' ' + cardW + ' 4 re f Q');
    lines.push('q 0.5 0.5 0.55 rg BT /F1 8 Tf ' + (cx + 10) + ' ' + (cardTop - 22) + ' Td (' + pdfEscapeText(c[0]) + ') Tj ET Q');
    lines.push('q 0.15 0.13 0.35 rg BT /F1 14 Tf ' + (cx + 10) + ' ' + (cardTop - 42) + ' Td (' + pdfEscapeText(c[1]) + ') Tj ET Q');
  });
  y = cardBottom - 30;

  lines.push('q 0.31 0.27 0.90 rg BT /F1 11.5 Tf ' + margin + ' ' + y + ' Td (' + pdfEscapeText('UYGULAMA KAPSAMI') + ') Tj ET Q');
  y -= 22;
  const scopeItems = [
    ['Kumlama Islemi', 'dahil'],
    ['Epoksi Astar Uygulamasi', r.astarL.toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + ' litre'],
    ['Poliuretan Sonkat Uygulamasi', r.sonkatL.toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + ' litre'],
    ['Tiner ve Sarf Malzeme', r.tinerL.toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + ' litre'],
    ['Iscilik', 'dahil'],
  ];
  const colors = ['0.70 0.55 0.18', '0.31 0.27 0.90', '0.36 0.46 0.33', '0.70 0.55 0.18', '0.31 0.27 0.90'];
  scopeItems.forEach((it, i) => {
    lines.push('q ' + colors[i] + ' rg ' + margin + ' ' + (y - 8) + ' 9 9 re f Q');
    lines.push('q 0.15 0.15 0.2 rg BT /F1 10.5 Tf ' + (margin + 16) + ' ' + y + ' Td (' + pdfEscapeText(it[0]) + ') Tj ET Q');
    lines.push('q 0.45 0.45 0.5 rg BT /F1 10 Tf ' + (pageW - margin - 90) + ' ' + y + ' Td (' + pdfEscapeText('~' + it[1]) + ') Tj ET Q');
    y -= 24;
  });
  y -= 14;

  const priceBoxH = 84, priceBoxTop = y, priceBoxBottom = y - priceBoxH;
  lines.push('q 0.94 0.96 0.94 rg ' + margin + ' ' + priceBoxBottom + ' ' + (pageW - 2 * margin) + ' ' + priceBoxH + ' re f Q');
  lines.push('q 0.36 0.46 0.33 RG 1.5 w ' + margin + ' ' + priceBoxBottom + ' ' + (pageW - 2 * margin) + ' ' + priceBoxH + ' re S Q');
  const accentSz = 14;
  [[margin, priceBoxTop - accentSz], [pageW - margin - accentSz, priceBoxTop - accentSz], [margin, priceBoxBottom], [pageW - margin - accentSz, priceBoxBottom]].forEach((pos) => {
    lines.push('q 0.36 0.46 0.33 rg ' + pos[0] + ' ' + pos[1] + ' ' + accentSz + ' ' + accentSz + ' re f Q');
  });
  const finalTotal = r.weightKg > 0 ? r.grandTotal : r.totalCost;
  lines.push('q 0.36 0.46 0.33 rg BT /F1 11 Tf ' + (margin + 26) + ' ' + (priceBoxTop - 26) + ' Td (' + pdfEscapeText(r.weightKg > 0 ? 'KUMLAMA + BOYA ISCILIGI + BOYA DAHIL FIYAT' : 'TAHMINI TOPLAM MALIYET') + ') Tj ET Q');
  lines.push('q 0.13 0.28 0.10 rg BT /F1 25 Tf ' + (margin + 26) + ' ' + (priceBoxTop - 58) + ' Td (' + pdfEscapeText(formatMoney(finalTotal).replace('₺', 'TL')) + ') Tj ET Q');
  y = priceBoxBottom - 24;

  lines.push('q 0.5 0.5 0.55 rg BT /F1 8.5 Tf ' + margin + ' ' + y + ' Td (' + pdfEscapeText('Fiyata KDV dahil degildir. Bu teklif bilgi amaclidir; onayinizla birlikte planlama yapilir.') + ') Tj ET Q');

  const footerY = 55;
  lines.push('q 0.75 0.73 0.9 RG ' + margin + ' ' + (footerY + 16) + ' m ' + (pageW - margin) + ' ' + (footerY + 16) + ' l S Q');
  lines.push('q 0.5 0.5 0.55 rg BT /F1 8.5 Tf ' + margin + ' ' + footerY + ' Td (' + pdfEscapeText('Iletisim: yildizkumlamaboya@gmail.com') + ') Tj ET Q');

  return { contentStr: lines.join('\n') + '\n', images: [] };
}
async function buildPaintCalcPDF() { return assemblePDF([buildPaintCalcPageContent()]); }

/* ============================== teklif hazırlama ============================== */
const OFFER_BASE_RATIO = 25;
const OFFER_BASE_PRICES = { kumlama: 4, boyaIscilik: 3, boyaMaliyeti: 2.24 };

function renderCostView() {
  const container = h('div', { style: { padding: '18px 16px' } });
  const uniqueCompanies = Array.from(new Set(state.shipments.map((s) => s.company))).sort();

  const costActive = [state.costCompanyFilter, state.costPriceFilter, (state.costDateFrom || state.costDateTo) ? 'd' : ''].filter(Boolean).length;
  const searchRow = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px' } });
  const searchWrap = h('div', { style: { position: 'relative', flex: '1' } });
  searchWrap.appendChild(h('span', { style: { position: 'absolute', left: '10px', top: '12px', color: 'var(--inkSoft)' } }, [ic('search', 15)]));
  const debouncedCostSearch = debounce(() => { state.costPage = 1; rerenderCostResults(); }, 180);
  searchWrap.appendChild(inputEl({ value: state.costQuery, placeholder: 'Firma ara', style: { paddingLeft: '30px', fontSize: '13.5px' }, oninput: (e) => { state.costQuery = e.target.value; debouncedCostSearch(); } }));
  searchRow.appendChild(searchWrap);
  searchRow.appendChild(btn([ic('search', 14), ' Filtrele' + (costActive ? ' (' + costActive + ')' : ''), h('span', { style: { marginLeft: '4px', fontSize: '10px' } }, state.uiExpanded.costFilters ? '▲' : '▼')], {
    onclick: () => { state.uiExpanded.costFilters = !state.uiExpanded.costFilters; render(); },
    style: { padding: '0 14px', fontSize: '13px', border: '1.5px solid ' + (costActive ? 'var(--primary)' : 'var(--line)') },
  }, 'var(--cream)', costActive ? 'var(--primary)' : 'var(--ink)'));
  container.appendChild(searchRow);

  if (costActive) {
    const chips = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' } });
    const chip = (text, onRemove) => h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--paper2)', color: 'var(--ink)', fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '12px' } }, [text, h('span', { onclick: onRemove, style: { cursor: 'pointer', color: 'var(--stamp)', fontWeight: '700' } }, ' ✕')]);
    if (state.costCompanyFilter) chips.appendChild(chip('Firma: ' + state.costCompanyFilter, () => { state.costCompanyFilter = ''; state.costPage = 1; render(); }));
    if (state.costPriceFilter) chips.appendChild(chip(state.costPriceFilter === 'yes' ? 'Fiyat Girilmiş' : 'Fiyat Girilmemiş', () => { state.costPriceFilter = ''; state.costPage = 1; render(); }));
    if (state.costDateFrom || state.costDateTo) chips.appendChild(chip('Tarih: ' + (state.costDateFrom ? formatDateTR(state.costDateFrom) : '…') + ' – ' + (state.costDateTo ? formatDateTR(state.costDateTo) : '…'), () => { state.costDateFrom = ''; state.costDateTo = ''; state.costPage = 1; render(); }));
    if (costActive > 1) chips.appendChild(h('span', { onclick: () => { state.costCompanyFilter = ''; state.costPriceFilter = ''; state.costDateFrom = ''; state.costDateTo = ''; state.costPage = 1; render(); }, style: { display: 'inline-flex', alignItems: 'center', fontSize: '12px', fontWeight: '600', padding: '4px 8px', cursor: 'pointer', color: 'var(--steel)', textDecoration: 'underline' } }, 'Tümünü Temizle'));
    container.appendChild(chips);
  }

  if (state.uiExpanded.costFilters) {
    const panel = h('div', { className: 'panel-in', style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '14px', padding: '12px', marginBottom: '14px' } });
    const selRow = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' } });
    const companySelect = h('select', { className: 'input', style: { flex: '1 1 140px', fontSize: '13.5px' }, onchange: (e) => { state.costCompanyFilter = e.target.value; state.costPage = 1; render(); } }, [h('option', { value: '' }, 'Tüm Firmalar')].concat(uniqueCompanies.map((c) => h('option', { value: c }, c))));
    companySelect.value = state.costCompanyFilter;
    selRow.appendChild(companySelect);
    const priceSelect = h('select', { className: 'input', style: { flex: '1 1 140px', fontSize: '13.5px' }, onchange: (e) => { state.costPriceFilter = e.target.value; state.costPage = 1; render(); } }, [
      h('option', { value: '' }, 'Tüm Fiyat Durumu'),
      h('option', { value: 'yes' }, 'Fiyat Girilmiş'),
      h('option', { value: 'no' }, 'Fiyat Girilmemiş'),
    ]);
    priceSelect.value = state.costPriceFilter;
    selRow.appendChild(priceSelect);
    panel.appendChild(selRow);
    const dateRow = h('div', { style: { display: 'flex', gap: '10px', alignItems: 'center' } });
    dateRow.appendChild(h('div', { style: { flex: '1' } }, [h('label', { style: { display: 'block', fontSize: '10.5px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, 'Başlangıç'), inputEl({ type: 'date', value: state.costDateFrom, style: { fontSize: '13px' }, onchange: (e) => { state.costDateFrom = e.target.value; state.costPage = 1; render(); } })]));
    dateRow.appendChild(h('div', { style: { flex: '1' } }, [h('label', { style: { display: 'block', fontSize: '10.5px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, 'Bitiş'), inputEl({ type: 'date', value: state.costDateTo, style: { fontSize: '13px' }, onchange: (e) => { state.costDateTo = e.target.value; state.costPage = 1; render(); } })]));
    panel.appendChild(dateRow);
    container.appendChild(panel);
  }


  const resultsWrap = h('div', { id: 'cost-results-wrap' });
  resultsWrap.appendChild(buildCostResults());
  container.appendChild(resultsWrap);

  return container;
}
function rerenderCostResults() {
  const wrap = document.getElementById('cost-results-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  wrap.appendChild(buildCostResults());
}
function buildCostResults() {
  const container = h('div', {});
  const filtered = filteredForCost().sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.createdAt - a.createdAt);

  const qtySummary = buildTonnageSummary(filtered);
  if (qtySummary) container.appendChild(qtySummary);

  const totalAmount = filtered.reduce((sum, s) => { const a = costAmount(s); return sum + (a || 0); }, 0);
  const totalPaintCost = filtered.reduce((sum, s) => { const p = parseFloat(s.paintCost); return sum + (isNaN(p) ? 0 : p); }, 0);
  const totalNet = filtered.reduce((sum, s) => { const n = netAmount(s); return sum + (n || 0); }, 0);
  const pricedCount = filtered.filter((s) => costAmount(s) !== null).length;
  container.appendChild(h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--ink)', borderRadius: '6px', padding: '12px 14px', marginBottom: '16px' } }, [
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' } }, [
      h('span', { style: { fontSize: '12.5px', fontWeight: '600', color: 'var(--inkSoft)' } }, 'Toplam Tutar (' + pricedCount + '/' + filtered.length + ' fiyatlandırılmış):'),
      h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: '600', fontSize: '14px', color: 'var(--inkSoft)' } }, formatMoney(totalAmount)),
    ]),
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' } }, [
      h('span', { style: { fontSize: '12.5px', fontWeight: '600', color: 'var(--inkSoft)' } }, 'Toplam Boya Maliyeti:'),
      h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: '600', fontSize: '14px', color: 'var(--stamp)' } }, '- ' + formatMoney(totalPaintCost)),
    ]),
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', paddingTop: '6px', borderTop: '1.5px solid var(--line)' } }, [
      h('span', { style: { fontSize: '13px', fontWeight: '700', color: 'var(--ink)' } }, 'Toplam Net Tutar:'),
      h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: '700', fontSize: '18px', color: 'var(--signed)' } }, formatMoney(totalNet)),
    ]),
  ]));

  container.appendChild(h('div', { style: { background: 'var(--accent-soft-bg)', border: '1.5px solid var(--accent-soft-border)', borderRadius: '12px', padding: '10px 14px', marginBottom: '14px' } }, [
    h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' } }, [h('span', { style: { color: 'var(--inkSoft)', fontWeight: '600' } }, 'KDV (%' + getVatRate() + ')'), h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", color: 'var(--ink)' } }, formatMoney(vatAmount(totalAmount)))]),
    h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700' } }, [h('span', {}, 'Toplam (KDV dahil)'), h('span', { style: { fontFamily: "'IBM Plex Mono',monospace" } }, formatMoney(withVat(totalAmount)))]),
  ]));
  const exportRow = h('div', { style: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' } });
  exportRow.appendChild(btn([ic('sheet', 15), ' Excel\'e Aktar'], {
    disabled: filtered.length === 0,
    onclick: () => exportCostExcel(filtered),
    style: { flex: '1 1 140px', justifyContent: 'center', padding: '10px', fontSize: '13.5px' },
  }, 'var(--signed)', 'var(--cream)'));
  exportRow.appendChild(btn([ic('filedown', 15), ' Hesap Özeti (PDF)'], {
    disabled: filtered.length === 0,
    title: 'Müşteriye gönderilebilir: boya maliyeti ve net tutar içermez',
    onclick: () => exportStatementPDF(filtered),
    style: { flex: '1 1 140px', justifyContent: 'center', padding: '10px', fontSize: '13.5px' },
  }, 'var(--primary)', 'var(--on-primary)'));
  container.appendChild(exportRow);

  if (filtered.length === 0) {
    container.appendChild(h('div', { style: { textAlign: 'center', padding: '48px 20px', color: 'var(--inkSoft)', border: '1.5px dashed var(--line)', borderRadius: '6px', fontSize: '14px' } }, 'Gösterilecek kayıt yok.'));
    return container;
  }

  const wrap = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } });
  const perPage = state.costPerPage;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const page = Math.min(Math.max(1, state.costPage), totalPages);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);
  visible.forEach((s) => {
    const amount = costAmount(s);
    const net = netAmount(s);
    const hasPaintCost = s.paintCost !== undefined && s.paintCost !== null && s.paintCost !== '' && !isNaN(parseFloat(s.paintCost));
    const hasPrice = hasUnitPrice(s);
    const card = h('div', {
      className: 'card',
      style: { background: hasPrice ? 'var(--cream)' : 'var(--warn-bg-solid)', border: '1.5px solid ' + (hasPrice ? 'var(--line)' : 'var(--warn)'), borderLeft: '4px solid ' + (hasPrice ? 'var(--line)' : 'var(--warn)') },
      onclick: () => { state.pendingCostEdit = Object.assign({}, s, {
        _unitPriceInput: hasPrice ? String(s.unitPrice) : '',
        _paintCostInput: hasPaintCost ? String(s.paintCost) : '',
        _astarInput: s.astarUsed || '', _sonkatInput: s.topcoatUsed || '', _thinnerInput: s.thinnerUsed || '', _ralInput: s.ralCode || '',
      }); render(); },
    });
    card.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' } }, [
      h('div', { style: { flex: '1' } }, [
        h('div', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '15px' } }, s.company),
        h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '11.5px', color: 'var(--inkSoft)', marginTop: '2px' } },
          '#' + String(s.seq || 0).padStart(4, '0')
          + (s.plate ? ' · ' + s.plate : '')
          + (s.driver ? ' · ' + s.driver : '')
        ),
      ]),
      h('div', { style: { textAlign: 'right', flex: '0 0 auto' } }, [
        h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: 'var(--steel)' } }, formatDateTR(s.date)),
        h('span', { className: 'badge', style: {
          display: 'inline-block', marginTop: '4px',
          color: s.invoiced ? 'var(--signed)' : 'var(--warn)',
          background: s.invoiced ? 'var(--signed-bg)' : 'var(--warn-bg)',
        } }, s.invoiced ? 'Fatura Kesildi' : 'Fatura Kesilmedi'),
      ]),
    ]));
    if (s.paintDetails) card.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginBottom: '6px' } }, s.paintDetails));
    const paintMeta = [
      s.astarUsed ? ('Astar: ' + s.astarUsed) : null,
      s.topcoatUsed ? ('Sonkat: ' + s.topcoatUsed) : null,
      s.thinnerUsed ? ('Tiner: ' + s.thinnerUsed) : null,
      s.ralCode ? ('RAL: ' + s.ralCode) : null,
    ].filter(Boolean);
    if (paintMeta.length) card.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--steel)', marginBottom: '6px' } }, paintMeta.join(' · ')));
    const row = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', marginBottom: '4px' } });
    row.appendChild(h('span', { style: { color: 'var(--inkSoft)' } }, 'Miktar: ' + (s.tonnage ? (s.tonnage + ' ' + unitLabel(s.tonnageUnit)) : '—')));
    row.appendChild(h('span', { style: { color: hasPrice ? 'var(--inkSoft)' : 'var(--warn)', fontWeight: hasPrice ? '400' : '700' } }, hasPrice ? ('Birim Fiyat: ' + formatMoney(parseFloat(s.unitPrice))) : 'BİRİM FİYAT GİRİLMEMİŞ'));
    row.appendChild(h('span', { style: { color: 'var(--inkSoft)' } }, 'Tutar: ' + (amount !== null ? formatMoney(amount) : '—')));
    card.appendChild(row);
    const row2 = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px' } });
    row2.appendChild(h('span', { style: { color: 'var(--stamp)' } }, 'Boya Maliyeti: ' + (hasPaintCost ? '- ' + formatMoney(parseFloat(s.paintCost)) : '—')));
    row2.appendChild(h('span', { style: { fontWeight: '700', color: 'var(--signed)' } }, net !== null ? ('Net Tutar: ' + formatMoney(net)) : 'Net Tutar: —'));
    card.appendChild(row2);
    if (amount !== null) card.appendChild(h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: 'var(--steel)', marginTop: '4px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px 12px' } }, [h('span', {}, 'Birim (KDV dahil): ' + formatMoney(withVat(parseFloat(s.unitPrice)))), h('span', { style: { fontWeight: '700' } }, 'KDV dahil tutar: ' + formatMoney(withVat(amount)))]));
    wrap.appendChild(card);
  });
  container.appendChild(wrap);
  if (filtered.length > 10) container.appendChild(buildPager(filtered.length, page, perPage, (p) => { state.costPage = p; rerenderCostResults(); }, (n) => { state.costPerPage = n; state.costPage = 1; rerenderCostResults(); }));
  return container;
}

function renderCostEditModal() {
  const s = state.pendingCostEdit;
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(43,42,40,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '50' } });
  const box = h('div', { style: { background: 'var(--cream)', borderRadius: '8px', padding: '22px', maxWidth: '340px', width: '100%', border: '1.5px solid var(--line)' } });
  box.appendChild(h('div', { style: { fontFamily: "'Inter',sans-serif", fontWeight: '600', fontSize: '16px', textTransform: 'uppercase', marginBottom: '4px' } }, s.company));
  box.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '14px' } },
    '#' + String(s.seq || 0).padStart(4, '0')
    + (s.plate ? ' · ' + s.plate : '')
    + (s.driver ? ' · ' + s.driver : '')
    + ' · ' + formatDateTR(s.date)
    + ' · ' + (s.tonnage ? (s.tonnage + ' ' + unitLabel(s.tonnageUnit)) : 'miktar girilmemiş')
  ));

  s._vatMode = s._vatMode || 'excl';
  function priceExcl() { const v = parseFloat(s._unitPriceInput); if (isNaN(v)) return NaN; return s._vatMode === 'incl' ? v / (1 + getVatRate() / 100) : v; }
  const priceInp = inputEl({ type: 'number', inputMode: 'decimal', step: '0.01', value: s._unitPriceInput, oninput: (e) => { s._unitPriceInput = e.target.value; updatePreview(); } });
  const modeRow = h('div', { style: { display: 'flex', background: 'var(--paper2)', borderRadius: '10px', padding: '3px', marginBottom: '8px' } });
  const priceHint = h('div', { style: { fontSize: '11.5px', color: 'var(--inkSoft)', marginTop: '6px', fontFamily: "'IBM Plex Mono',monospace" } });
  function drawMode() {
    modeRow.innerHTML = '';
    [['excl', 'KDV Hariç'], ['incl', 'KDV Dahil (%' + getVatRate() + ')']].forEach(([v, l]) => modeRow.appendChild(h('button', {
      type: 'button',
      onclick: () => {
        if (s._vatMode === v) return;
        const cur = parseFloat(priceInp.value);
        if (!isNaN(cur)) { const conv = v === 'incl' ? cur * (1 + getVatRate() / 100) : cur / (1 + getVatRate() / 100); priceInp.value = String(Math.round(conv * 10000) / 10000); s._unitPriceInput = priceInp.value; }
        s._vatMode = v; drawMode(); updatePreview();
      },
      style: { flex: '1', border: 'none', borderRadius: '8px', padding: '8px 4px', fontSize: '12.5px', fontWeight: '700', fontFamily: 'inherit', cursor: 'pointer', background: s._vatMode === v ? 'var(--cream)' : 'transparent', color: s._vatMode === v ? 'var(--ink)' : 'var(--inkSoft)' },
    }, l)));
  }
  drawMode();
  box.appendChild(h('div', { className: 'field' }, [h('div', { className: 'label' }, 'Birim Fiyat (₺)'), modeRow, priceInp, priceHint]));

  const priceHistory = state.shipments
    .filter((x) => x.id !== s.id && x.company === s.company && x.unitPrice !== undefined && x.unitPrice !== '' && !isNaN(parseFloat(x.unitPrice)))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 5);
  if (priceHistory.length) {
    const refBox = h('div', { style: { marginTop: '-8px', marginBottom: '16px', background: 'var(--paper2)', borderRadius: '4px', padding: '8px 10px' } });
    refBox.appendChild(h('div', { style: { fontSize: '10px', fontWeight: '700', color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: '4px' } }, 'Bu firmaya daha önce verilen fiyatlar'));
    priceHistory.forEach((r) => {
      const row = h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '10.5px', color: 'var(--inkSoft)', padding: '1.5px 0' } });
      row.appendChild(h('span', {}, formatDateTR(r.date) + (r.tonnage ? ' · ' + r.tonnage + ' ' + unitLabel(r.tonnageUnit) : '')));
      row.appendChild(h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: '600', color: 'var(--ink)', flexShrink: '0' } }, formatMoney(parseFloat(r.unitPrice)) + '/' + unitLabel(r.tonnageUnit)));
      refBox.appendChild(row);
    });
    box.appendChild(refBox);
  }

  box.appendChild(field('Kullanılan Astar', inputEl({ type: 'text', value: s._astarInput, placeholder: 'Örn. 2 teneke', oninput: (e) => (s._astarInput = e.target.value) })));
  box.appendChild(field('Kullanılan Sonkat', inputEl({ type: 'text', value: s._sonkatInput, placeholder: 'Örn. 2 teneke', oninput: (e) => (s._sonkatInput = e.target.value) })));
  box.appendChild(field('Tiner', inputEl({ type: 'text', value: s._thinnerInput, placeholder: 'Örn. 2 lt', oninput: (e) => (s._thinnerInput = e.target.value) })));
  box.appendChild(field('RAL Kodu', inputEl({ type: 'text', value: s._ralInput, placeholder: 'Örn. RAL 7016', oninput: (e) => (s._ralInput = e.target.value.toLocaleUpperCase('tr-TR')) })));
  box.appendChild(field('Boya Maliyeti (₺)', inputEl({ type: 'number', inputMode: 'decimal', step: '0.01', value: s._paintCostInput, placeholder: '0.00', oninput: (e) => { s._paintCostInput = e.target.value; updatePreview(); } })));

  const previewBox = h('div', { style: { background: 'var(--paper2)', borderRadius: '4px', padding: '10px 12px', marginBottom: '16px' } });
  const row1 = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' } });
  const grossLabel = h('span', { style: { fontSize: '12px', color: 'var(--inkSoft)' } }, 'Tutar (KDV hariç):');
  const grossValue = h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', color: 'var(--inkSoft)' } }, '—');
  row1.appendChild(grossLabel); row1.appendChild(grossValue);
  const row2 = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid var(--line)' } });
  const netLabel = h('span', { style: { fontSize: '12.5px', fontWeight: '700', color: 'var(--ink)' } }, 'Net Tutar:');
  const netValue = h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: '700', fontSize: '16px', color: 'var(--signed)' } }, '—');
  row2.appendChild(netLabel); row2.appendChild(netValue);
  const vatLine = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' } });
  const vatLabel = h('span', { style: { fontSize: '12px', color: 'var(--inkSoft)' } }, 'KDV (%' + getVatRate() + '):');
  const vatValue = h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', color: 'var(--inkSoft)' } }, '—');
  vatLine.appendChild(vatLabel); vatLine.appendChild(vatValue);
  const inclLine = h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } });
  const inclValue = h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', fontWeight: '700', color: 'var(--ink)' } }, '—');
  inclLine.appendChild(h('span', { style: { fontSize: '12px', fontWeight: '700', color: 'var(--ink)' } }, 'Toplam (KDV dahil):')); inclLine.appendChild(inclValue);
  previewBox.appendChild(row1); previewBox.appendChild(vatLine); previewBox.appendChild(inclLine); previewBox.appendChild(row2);
  box.appendChild(previewBox);
  function updatePreview() {
    const qty = parseFloat(s.tonnage), price = priceExcl(), paintCost = parseFloat(s._paintCostInput);
    const gross = (!isNaN(qty) && !isNaN(price)) ? qty * price : null;
    grossValue.textContent = gross !== null ? formatMoney(gross) : '—';
    netValue.textContent = gross !== null ? formatMoney(gross - (isNaN(paintCost) ? 0 : paintCost)) : '—';
    vatValue.textContent = gross !== null ? formatMoney(vatAmount(gross)) : '—';
    inclValue.textContent = gross !== null ? formatMoney(withVat(gross)) : '—';
    priceHint.textContent = !isNaN(price) ? ('Hariç ' + formatMoney(price) + ' · Dahil ' + formatMoney(withVat(price))) : '';
  }
  updatePreview();

  const btnRow = h('div', { style: { display: 'flex', gap: '10px' } });
  btnRow.appendChild(btn(['Vazgeç'], { onclick: () => { state.pendingCostEdit = null; render(); }, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'none', 'var(--inkSoft)'));
  btnRow.lastChild.style.border = '1.5px solid var(--line)';
  btnRow.appendChild(btn(['Kaydet'], {
    onclick: async () => {
      const priceRaw = s._unitPriceInput.trim();
      const price = priceRaw === '' || isNaN(priceExcl()) ? '' : String(Math.round(priceExcl() * 10000) / 10000);
      const paintCost = s._paintCostInput.trim();
      const idx = state.shipments.findIndex((x) => x.id === s.id);
      if (idx === -1) { state.pendingCostEdit = null; render(); return; }
      const updated = Object.assign({}, state.shipments[idx], {
        unitPrice: price === '' ? '' : parseFloat(price),
        paintCost: paintCost === '' ? '' : parseFloat(paintCost),
        astarUsed: s._astarInput.trim(), topcoatUsed: s._sonkatInput.trim(),
        thinnerUsed: s._thinnerInput.trim(), ralCode: s._ralInput.trim(),
        updatedAt: Date.now(),
      });
      try {
        await dbPut(updated);
        if (supabaseClient) cloudPushShipment(updated).catch(() => {});
        updated._searchIdx = computeSearchIndex(updated);
        state.shipments[idx] = updated;
      }
      catch (e) { state.error = 'Kaydedilemedi.'; }
      state.pendingCostEdit = null; render();
    },
    style: { flex: '1', justifyContent: 'center', padding: '10px' },
  }, 'var(--ink)', 'var(--cream)'));
  box.appendChild(btnRow);
  overlay.appendChild(box);
  return overlay;
}

/* ============================== tasks / trash / summary / statement / PIN ============================== */
function hasPrice(s) { return s.unitPrice !== undefined && s.unitPrice !== null && s.unitPrice !== '' && !isNaN(parseFloat(s.unitPrice)); }
function hasQty(s) { return !!s.tonnage && !isNaN(parseFloat(s.tonnage)); }
function ageDays(s) { if (!s.date) return 0; const t = new Date(s.date + 'T00:00:00').getTime(); return isNaN(t) ? 0 : Math.max(0, Math.floor((Date.now() - t) / 86400000)); }
function computeTasks() {
  const ready = [], missing = [];
  state.shipments.forEach((s) => {
    if (s.invoiced) return;
    const q = hasQty(s), p = hasPrice(s);
    if (q && p) ready.push(s); else missing.push({ s, noQty: !q, noPrice: !p });
  });
  ready.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  missing.sort((a, b) => (a.s.date || '').localeCompare(b.s.date || ''));
  return { ready, missing };
}
function openCostEdit(s) {
  state.pendingCostEdit = Object.assign({}, s, {
    _unitPriceInput: hasPrice(s) ? String(s.unitPrice) : '',
    _paintCostInput: (s.paintCost !== undefined && s.paintCost !== '' && s.paintCost !== null && !isNaN(parseFloat(s.paintCost))) ? String(s.paintCost) : '',
    _astarInput: s.astarUsed || '', _sonkatInput: s.topcoatUsed || '', _thinnerInput: s.thinnerUsed || '', _ralInput: s.ralCode || '',
  });
  render();
}
function markInvoiced(s) {
  state.pendingInvoice = { ids: [s.id], label: '#' + String(s.seq).padStart(4, '0') + ' — ' + (s.company || '(FİRMASIZ)') };
  render();
}
function markAllInvoiced() {
  const t = computeTasks();
  if (!t.ready.length) return;
  const total = t.ready.reduce((sum, x) => sum + (costAmount(x) || 0), 0);
  state.pendingInvoice = { ids: t.ready.map((x) => x.id), label: t.ready.length + ' kayıt', total };
  render();
}
async function confirmInvoiced() {
  const P = state.pendingInvoice; if (!P) return;
  state.pendingInvoice = null;
  for (const id of P.ids) {
    const idx = state.shipments.findIndex((x) => x.id === id);
    if (idx === -1) continue;
    const updated = Object.assign({}, state.shipments[idx], { invoiced: true, updatedAt: Date.now() });
    try { await dbPut(updated); if (supabaseClient) cloudPushShipment(updated).catch(() => {}); updated._searchIdx = computeSearchIndex(updated); state.shipments[idx] = updated; }
    catch (e) { state.error = 'Kaydedilemedi.'; }
  }
  if (P.ids.length > 1 && !state.error) { state.successMsg = P.ids.length + ' kayıt "fatura kesildi" yapıldı.'; setTimeout(() => { state.successMsg = ''; render(); }, 5000); }
  render();
}
function renderInvoiceModal() {
  const P = state.pendingInvoice;
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(43,42,40,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '50' }, onclick: () => { state.pendingInvoice = null; render(); } });
  const box = h('div', { onclick: (e) => e.stopPropagation(), style: { background: 'var(--cream)', borderRadius: '12px', padding: '22px', maxWidth: '320px', width: '100%', border: '1.5px solid var(--line)' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--signed)' } }, [ic('check', 18), h('span', { style: { fontWeight: '700', fontSize: '16px' } }, 'Faturayı kestin mi?')]));
  const many = P.ids.length > 1;
  box.appendChild(h('p', { style: { fontSize: '13.5px', lineHeight: '1.5', marginBottom: '14px' }, html: '<strong>' + P.label + '</strong> için fatura kesildi mi?' + (many ? ' Hepsi "fatura kesildi" olarak işaretlenecek' + (P.total ? ' (toplam ' + formatMoney(P.total) + ' KDV hariç).' : '.') : '') }));
  const row = h('div', { style: { display: 'flex', gap: '10px' } });
  row.appendChild(btn(['Hayır'], { onclick: () => { state.pendingInvoice = null; render(); }, style: { flex: '1', justifyContent: 'center', padding: '11px' } }, 'none', 'var(--inkSoft)'));
  row.lastChild.style.border = '1.5px solid var(--line)';
  row.appendChild(btn(['Evet, kesildi'], { onclick: confirmInvoiced, style: { flex: '1', justifyContent: 'center', padding: '11px' } }, 'var(--signed)', '#fff'));
  box.appendChild(row); overlay.appendChild(box);
  return overlay;
}
async function restoreFromTrash(s) {
  const rec = Object.assign({}, s, { updatedAt: Date.now() }); delete rec.deletedAt; delete rec._searchIdx;
  try {
    await dbPut(rec);
    unmarkDeleted(rec.id);
    state.trash = state.trash.filter((x) => x.id !== s.id);
    rec._searchIdx = computeSearchIndex(rec);
    state.shipments.push(rec);
    state.shipments.sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0));
    if (supabaseClient) {
      markRestored(rec.id);
      cloudRestoreShipment(rec).then((ok) => { if (ok) unmarkRestored(rec.id); }).catch(() => {});
    }
    state.successMsg = 'Kayıt geri alındı.'; setTimeout(() => { state.successMsg = ''; render(); }, 4000);
  } catch (e) { state.error = 'Geri alınamadı.'; }
  render();
}
async function purgeFromTrash(ids) {
  try { for (const id of ids) { await dbDelete(id); mediaRemoveRec(state.trash.find((x) => x.id === id)); } state.trash = state.trash.filter((x) => ids.indexOf(x.id) === -1); }
  catch (e) { state.error = 'Silinemedi.'; }
  state.pendingPurge = null; render();
}

/* ---- tab bar badge + task banner ---- */
function buildTaskBanner() {
  const bar = h('div', {
    onclick: () => openAssistant(),
    style: { display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--accent-soft-bg)', border: '1.5px solid var(--accent)', borderRadius: '14px', padding: '11px 14px', marginBottom: '12px', cursor: 'pointer' },
  }, [
    h('span', { style: { color: 'var(--accent)', display: 'inline-flex' } }, [ic('sparkle', 22)]),
    h('div', { style: { flex: '1', minWidth: '0' } }, [
      h('div', { style: { fontWeight: '800', fontSize: '14px', color: 'var(--ink)' } }, 'Asistan'),
      h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, 'Sor, konuş, kayıt ekle veya düzenlet…'),
    ]),
    h('span', { onclick: (e) => { e.stopPropagation(); openAssistant(); setTimeout(assistantMicToggle, 60); }, style: { width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } }, [ic('mic', 20)]),
  ]);
  const wa = h('div', {
    onclick: () => openWhatsApp(),
    style: { display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--cream)', border: '1.5px solid #16A34A', borderRadius: '14px', padding: '10px 14px', marginBottom: '12px', cursor: 'pointer' },
  }, [
    h('span', { style: { color: '#16A34A', display: 'inline-flex' } }, [ic('whatsapp', 22)]),
    h('div', { style: { flex: '1', fontWeight: '800', fontSize: '14px' } }, 'WhatsApp\'tan sevkiyat ekle'),
    h('span', { style: { color: 'var(--inkSoft)', fontSize: '18px' } }, '›'),
  ]);
  const wrap = h('div', {}); wrap.appendChild(bar); wrap.appendChild(wa);
  return wrap;
}

/* ---- Görevler view ---- */
function taskCard(s, kind, extra) {
  const card = h('div', { className: 'card', style: { cursor: 'default', borderLeft: '4px solid ' + (kind === 'ready' ? 'var(--signed)' : 'var(--warn)') } });
  card.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' } }, [
    h('div', { style: { fontWeight: '600', fontSize: '15px' } }, s.company || '(FİRMASIZ)'),
    h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: 'var(--steel)' } }, '#' + String(s.seq).padStart(4, '0') + ' · ' + formatDateTR(s.date)),
  ]));
  const amt = costAmount(s);
  card.appendChild(h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12.5px', color: 'var(--inkSoft)', display: 'flex', gap: '4px 14px', flexWrap: 'wrap', marginBottom: '8px' } }, [
    h('span', {}, hasQty(s) ? (s.tonnage + ' ' + unitLabel(s.tonnageUnit)) : 'Miktar yok'),
    h('span', {}, hasPrice(s) ? ('Birim: ' + formatMoney(parseFloat(s.unitPrice))) : 'Fiyat yok'),
    amt !== null ? h('span', { style: { fontWeight: '700', color: 'var(--signed)' } }, 'Tutar: ' + formatMoney(amt)) : null,
  ].filter(Boolean)));
  if (s.paintDetails) card.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginBottom: '8px' } }, s.paintDetails));
  if (extra) card.appendChild(extra);
  return card;
}
function renderTasksView() {
  const container = h('div', { style: { padding: '18px 16px' } });
  const t = computeTasks();
  const stats = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '16px' } }, [
    h('div', { style: { flex: '1', background: 'var(--signed-bg)', borderRadius: '12px', padding: '12px', textAlign: 'center' } }, [h('div', { style: { fontSize: '24px', fontWeight: '700', color: 'var(--signed)' } }, String(t.ready.length)), h('div', { style: { fontSize: '12px', color: 'var(--signed)' } }, 'Fatura kesilebilir')]),
    h('div', { style: { flex: '1', background: 'var(--warn-bg)', borderRadius: '12px', padding: '12px', textAlign: 'center' } }, [h('div', { style: { fontSize: '24px', fontWeight: '700', color: 'var(--warn)' } }, String(t.missing.length)), h('div', { style: { fontSize: '12px', color: 'var(--warn)' } }, 'Eksik bilgi')]),
  ]);
  container.appendChild(stats);
  if (!t.ready.length && !t.missing.length) {
    container.appendChild(h('div', { style: { textAlign: 'center', padding: '40px 20px', color: 'var(--inkSoft)', border: '1.5px dashed var(--line)', borderRadius: '12px', fontSize: '14px' } }, 'Bekleyen görev yok. Faturası kesilmemiş kayıt kalmadı.'));
    return container;
  }
  if (t.ready.length) {
    container.appendChild(h('h3', { style: { fontSize: '15px', margin: '0 0 4px', color: 'var(--signed)' } }, 'Fatura kesilebilir'));
    container.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginBottom: '10px' } }, 'Miktar ve birim fiyat girilmiş. Faturayı kestikten sonra "Fatura kesildi" ile işaretle.'));
    if (t.ready.length > 1) container.appendChild(btn([ic('check', 14), ' Hepsini "Fatura kesildi" yap (' + t.ready.length + ')'], { onclick: markAllInvoiced, style: { width: '100%', justifyContent: 'center', padding: '10px', fontSize: '13px', marginBottom: '10px' } }, 'var(--signed)', '#fff'));
    const list = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' } });
    t.ready.slice(0, state.tasksVisible).forEach((s) => {
      list.appendChild(taskCard(s, 'ready', btn([ic('check', 14), ' Fatura kesildi'], { onclick: () => markInvoiced(s), style: { width: '100%', justifyContent: 'center', padding: '9px', fontSize: '13px' } }, 'var(--signed)', '#fff')));
    });
    container.appendChild(list);
  }
  if (t.missing.length) {
    container.appendChild(h('h3', { style: { fontSize: '15px', margin: '0 0 4px', color: 'var(--warn)' } }, 'Eksik bilgi var'));
    container.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginBottom: '10px' } }, 'Fatura kesilmemiş ve miktarı veya birim fiyatı girilmemiş kayıtlar. En eski olan en üstte.'));
    const list = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } });
    t.missing.slice(0, state.tasksVisible).forEach((m) => {
      const row = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' } });
      const age = ageDays(m.s);
      if (age >= 7) row.appendChild(h('span', { className: 'badge', style: { background: 'var(--danger-bg)', color: 'var(--stamp)' } }, age + ' gündür bekliyor'));
      if (m.noQty) row.appendChild(btn(['Miktar gir'], { onclick: () => openEdit(m.s), style: { padding: '7px 12px', fontSize: '12.5px' } }, 'var(--cream)', 'var(--primary)'));
      if (m.noQty) row.lastChild.style.border = '1px solid var(--primary)';
      if (m.noPrice) row.appendChild(btn(['Fiyat gir'], { onclick: () => openCostEdit(m.s), style: { padding: '7px 12px', fontSize: '12.5px' } }, 'var(--primary)', 'var(--on-primary)'));
      list.appendChild(taskCard(m.s, 'missing', row));
    });
    container.appendChild(list);
  }
  if (Math.max(t.ready.length, t.missing.length) > state.tasksVisible) {
    container.appendChild(btn(['Daha fazla göster'], { onclick: () => { state.tasksVisible += 20; render(); }, style: { width: '100%', justifyContent: 'center', marginTop: '14px', padding: '10px' } }, 'var(--paper2)', 'var(--ink)'));
  }
  return container;
}

/* ---- Aylık özet view ---- */
const AY_ADLARI = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
function monthLabel(key) { const [y, m] = key.split('-'); return AY_ADLARI[Number(m) - 1] + ' ' + y; }
function fmtNum(v) { return v.toLocaleString('tr-TR', { maximumFractionDigits: 2 }); }

/* ---- Özet raporu: aylık / firma bazlı, filtreli ---- */
function filteredForSummary() {
  const q = state.sumQuery.trim() ? trNormalize(state.sumQuery.trim()) : '';
  return state.shipments.filter((s) => {
    if (!s.date) return false;
    if (state.sumCompany && s.company !== state.sumCompany) return false;
    if (state.sumInvoiced === 'yes' && !s.invoiced) return false;
    if (state.sumInvoiced === 'no' && s.invoiced) return false;
    if (state.sumPrice === 'yes' && !hasPrice(s)) return false;
    if (state.sumPrice === 'no' && hasPrice(s)) return false;
    if (state.sumFrom && s.date < state.sumFrom) return false;
    if (state.sumTo && s.date > state.sumTo) return false;
    if (q && trNormalize(s.company).indexOf(q) === -1) return false;
    return true;
  });
}
function emptyAgg(key) { return { key, count: 0, units: {}, amount: 0, paint: 0, net: 0, priced: 0 }; }
function addToAgg(m, s) {
  m.count++;
  if (hasQty(s)) { const u = s.tonnageUnit || 'kg'; m.units[u] = (m.units[u] || 0) + parseFloat(s.tonnage); }
  const a = costAmount(s);
  if (a !== null) { const pc = parseFloat(s.paintCost); const p = isNaN(pc) ? 0 : pc; m.amount += a; m.paint += p; m.net += a - p; m.priced++; }
}
function aggregateSummary(list, mode) {
  const top = {};
  list.forEach((s) => {
    const k1 = mode === 'month' ? s.date.slice(0, 7) : (s.company || '(FİRMASIZ)');
    const k2 = mode === 'month' ? (s.company || '(FİRMASIZ)') : s.date.slice(0, 7);
    const g = top[k1] || (top[k1] = Object.assign(emptyAgg(k1), { sub: {} }));
    addToAgg(g, s);
    addToAgg(g.sub[k2] || (g.sub[k2] = emptyAgg(k2)), s);
  });
  let arr = Object.keys(top).map((k) => { const g = top[k]; g.subList = Object.keys(g.sub).map((x) => g.sub[x]); return g; });
  if (mode === 'month') { arr.sort((a, b) => b.key.localeCompare(a.key)); arr.forEach((g) => g.subList.sort((a, b) => b.net - a.net || b.count - a.count)); }
  else { arr.sort((a, b) => b.net - a.net || b.count - a.count); arr.forEach((g) => g.subList.sort((a, b) => b.key.localeCompare(a.key))); }
  return arr;
}
function qtyText(units) { return Object.keys(units).map((u) => fmtNum(units[u]) + ' ' + unitLabel(u)).join(' + ') || '—'; }
function sumActiveCount() { return [state.sumCompany, state.sumInvoiced, state.sumPrice, (state.sumFrom || state.sumTo) ? 'd' : ''].filter(Boolean).length; }
function sumLabel(g, mode) { return mode === 'month' ? monthLabel(g.key) : g.key; }
function renderSummaryView() {
  const container = h('div', { style: { padding: '14px 16px 18px' } });
  const companies = Array.from(new Set(state.shipments.map((x) => x.company).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'tr'));
  const active = sumActiveCount();

  const searchRow = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px' } });
  const sw = h('div', { style: { position: 'relative', flex: '1' } });
  sw.appendChild(h('span', { style: { position: 'absolute', left: '10px', top: '12px', color: 'var(--inkSoft)' } }, [ic('search', 15)]));
  const deb = debounce(rerenderSummaryResults, 180);
  sw.appendChild(inputEl({ value: state.sumQuery, placeholder: 'Firma ara', style: { paddingLeft: '30px', fontSize: '13.5px' }, oninput: (e) => { state.sumQuery = e.target.value; deb(); } }));
  searchRow.appendChild(sw);
  searchRow.appendChild(btn([ic('search', 14), ' Filtrele' + (active ? ' (' + active + ')' : ''), h('span', { style: { marginLeft: '4px', fontSize: '10px' } }, state.uiExpanded.sumFilters ? '▲' : '▼')], {
    onclick: () => { state.uiExpanded.sumFilters = !state.uiExpanded.sumFilters; render(); },
    style: { padding: '0 14px', fontSize: '13px', border: '1.5px solid ' + (active ? 'var(--primary)' : 'var(--line)') },
  }, 'var(--cream)', active ? 'var(--primary)' : 'var(--ink)'));
  container.appendChild(searchRow);

  if (active) {
    const chips = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' } });
    const chip = (text, rm) => h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--paper2)', color: 'var(--ink)', fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '12px' } }, [text, h('span', { onclick: rm, style: { cursor: 'pointer', color: 'var(--stamp)', fontWeight: '700' } }, ' ✕')]);
    if (state.sumCompany) chips.appendChild(chip('Firma: ' + state.sumCompany, () => { state.sumCompany = ''; render(); }));
    if (state.sumInvoiced) chips.appendChild(chip(state.sumInvoiced === 'yes' ? 'Fatura Kesilmiş' : 'Fatura Kesilmemiş', () => { state.sumInvoiced = ''; render(); }));
    if (state.sumPrice) chips.appendChild(chip(state.sumPrice === 'yes' ? 'Fiyat Girilmiş' : 'Fiyat Girilmemiş', () => { state.sumPrice = ''; render(); }));
    if (state.sumFrom || state.sumTo) chips.appendChild(chip('Tarih: ' + (state.sumFrom ? formatDateTR(state.sumFrom) : '…') + ' – ' + (state.sumTo ? formatDateTR(state.sumTo) : '…'), () => { state.sumFrom = ''; state.sumTo = ''; render(); }));
    if (active > 1) chips.appendChild(h('span', { onclick: () => { state.sumCompany = ''; state.sumInvoiced = ''; state.sumPrice = ''; state.sumFrom = ''; state.sumTo = ''; render(); }, style: { display: 'inline-flex', alignItems: 'center', fontSize: '12px', fontWeight: '600', padding: '4px 8px', cursor: 'pointer', color: 'var(--steel)', textDecoration: 'underline' } }, 'Tümünü Temizle'));
    container.appendChild(chips);
  }

  if (state.uiExpanded.sumFilters) {
    const panel = h('div', { className: 'panel-in', style: { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '14px', padding: '12px', marginBottom: '14px' } });
    const row = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' } });
    const sel = (value, opts, onchange) => { const e = h('select', { className: 'input', style: { flex: '1 1 140px', fontSize: '13.5px' }, onchange }, opts.map(([v, l]) => h('option', { value: v }, l))); e.value = value; return e; };
    row.appendChild(sel(state.sumCompany, [['', 'Tüm Firmalar']].concat(companies.map((c) => [c, c])), (e) => { state.sumCompany = e.target.value; render(); }));
    row.appendChild(sel(state.sumInvoiced, [['', 'Fatura: Tümü'], ['yes', 'Fatura Kesilmiş'], ['no', 'Fatura Kesilmemiş']], (e) => { state.sumInvoiced = e.target.value; render(); }));
    row.appendChild(sel(state.sumPrice, [['', 'Fiyat: Tümü'], ['yes', 'Fiyat Girilmiş'], ['no', 'Fiyat Girilmemiş']], (e) => { state.sumPrice = e.target.value; render(); }));
    panel.appendChild(row);
    const dr = h('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px' } });
    const lab = (t) => h('label', { style: { display: 'block', fontSize: '10.5px', fontWeight: '600', color: 'var(--steel)', marginBottom: '3px', textTransform: 'uppercase' } }, t);
    dr.appendChild(h('div', { style: { flex: '1' } }, [lab('Başlangıç'), inputEl({ type: 'date', value: state.sumFrom, style: { fontSize: '13px' }, onchange: (e) => { state.sumFrom = e.target.value; render(); } })]));
    dr.appendChild(h('div', { style: { flex: '1' } }, [lab('Bitiş'), inputEl({ type: 'date', value: state.sumTo, style: { fontSize: '13px' }, onchange: (e) => { state.sumTo = e.target.value; render(); } })]));
    panel.appendChild(dr);
    const quick = h('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } });
    const setRange = (from, to) => () => { state.sumFrom = from; state.sumTo = to; render(); };
    const now = new Date(), y = now.getFullYear(), mo = now.getMonth();
    const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    [['Bu ay', setRange(iso(new Date(y, mo, 1)), iso(new Date(y, mo + 1, 0)))], ['Geçen ay', setRange(iso(new Date(y, mo - 1, 1)), iso(new Date(y, mo, 0)))], ['Son 3 ay', setRange(iso(new Date(y, mo - 2, 1)), iso(new Date(y, mo + 1, 0)))], ['Bu yıl', setRange(y + '-01-01', y + '-12-31')]].forEach(([t, fn]) => quick.appendChild(h('button', { onclick: fn, style: { background: 'var(--paper2)', border: 'none', borderRadius: '999px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' } }, t)));
    panel.appendChild(quick);
    container.appendChild(panel);
  }

  const seg = h('div', { style: { display: 'flex', background: 'var(--paper2)', borderRadius: '12px', padding: '3px', marginBottom: '12px' } });
  [['month', 'Aylık'], ['company', 'Firma Bazlı']].forEach(([v, l]) => seg.appendChild(h('button', {
    onclick: () => { state.sumMode = v; state.sumOpen = {}; render(); },
    style: { flex: '1', border: 'none', borderRadius: '10px', padding: '9px', fontSize: '13.5px', fontWeight: '700', fontFamily: 'inherit', cursor: 'pointer', background: state.sumMode === v ? 'var(--cream)' : 'transparent', color: state.sumMode === v ? 'var(--primary)' : 'var(--inkSoft)', boxShadow: state.sumMode === v ? 'var(--shadow-sm)' : 'none' },
  }, l)));
  container.appendChild(seg);
  container.appendChild(h('div', { id: 'sum-results' }, [buildSummaryResults()]));
  return container;
}
function rerenderSummaryResults() {
  const w = document.getElementById('sum-results');
  if (!w) return;
  w.innerHTML = ''; w.appendChild(buildSummaryResults());
}
function buildSummaryResults() {
  const out = h('div', {});
  const list = filteredForSummary();
  if (!list.length) { out.appendChild(h('div', { style: { textAlign: 'center', padding: '40px 20px', color: 'var(--inkSoft)', border: '1.5px dashed var(--line)', borderRadius: '12px' } }, 'Bu filtrelerle özetlenecek kayıt yok.')); return out; }
  const mode = state.sumMode;
  const groups = aggregateSummary(list, mode);
  const tot = emptyAgg('all'); list.forEach((x) => addToAgg(tot, x));

  const box = h('div', { style: { background: 'var(--cream)', border: '1.5px solid var(--ink)', borderRadius: '12px', padding: '12px 14px', marginBottom: '14px' } });
  const line = (k, v, color, bold) => h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: bold ? '14px' : '13px', padding: '3px 0', fontWeight: bold ? '700' : '500' } }, [h('span', { style: { color: bold ? 'var(--ink)' : 'var(--inkSoft)' } }, k), h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", color: color || 'var(--ink)', textAlign: 'right' } }, v)]);
  box.appendChild(line(list.length + ' sevkiyat · ' + groups.length + (mode === 'month' ? ' ay' : ' firma'), qtyText(tot.units)));
  box.appendChild(line('Tutar (' + tot.priced + '/' + tot.count + ' fiyatlı) KDV hariç', formatMoney(tot.amount)));
  box.appendChild(line('KDV dahil tutar (%' + getVatRate() + ')', formatMoney(withVat(tot.amount))));
  box.appendChild(line('Boya maliyeti', '- ' + formatMoney(tot.paint), 'var(--stamp)'));
  const nl = line('Net tutar', formatMoney(tot.net), 'var(--signed)', true); nl.style.borderTop = '1.5px solid var(--line)'; nl.style.marginTop = '4px'; nl.style.paddingTop = '8px';
  box.appendChild(nl);
  out.appendChild(box);

  // grafik: aylıkta son 12 ay net, firmada en çok kazandıran 8 firma
  const chartCard = h('div', { className: 'card', style: { cursor: 'default', marginBottom: '14px' } });
  if (mode === 'month') {
    const last = groups.slice(0, 12).reverse();
    const max = Math.max.apply(null, last.map((m) => m.net).concat([1]));
    chartCard.appendChild(h('div', { style: { fontWeight: '600', fontSize: '14px', marginBottom: '2px' } }, 'Aylık net tutar'));
    chartCard.appendChild(h('div', { style: { fontSize: '11.5px', color: 'var(--inkSoft)', marginBottom: '12px' } }, 'Son ' + last.length + ' ay · tutar − boya maliyeti'));
    const bars = h('div', { style: { display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px', borderBottom: '1px solid var(--line)' } });
    last.forEach((m) => bars.appendChild(h('div', { style: { flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', minWidth: '0' } }, [
      h('div', { style: { fontSize: '9px', color: 'var(--inkSoft)', marginBottom: '2px', whiteSpace: 'nowrap' } }, m.net > 0 ? (m.net >= 1000 ? Math.round(m.net / 1000) + 'B' : String(Math.round(m.net))) : ''),
      h('div', { style: { width: '100%', maxWidth: '56px', height: Math.max(2, Math.round((Math.max(m.net, 0) / max) * 100)) + '%', background: 'var(--primary)', borderRadius: '4px 4px 0 0' } }),
    ])));
    chartCard.appendChild(bars);
    const labels = h('div', { style: { display: 'flex', gap: '6px', marginTop: '4px' } });
    last.forEach((m) => labels.appendChild(h('div', { style: { flex: '1', fontSize: '9.5px', textAlign: 'center', color: 'var(--inkSoft)', minWidth: '0' } }, AY_ADLARI[Number(m.key.split('-')[1]) - 1])));
    chartCard.appendChild(labels);
    chartCard.appendChild(h('div', { style: { fontSize: '10.5px', color: 'var(--inkSoft)', marginTop: '6px' } }, 'B = bin ₺'));
  } else {
    const topN = groups.slice(0, 8);
    const max = Math.max.apply(null, topN.map((m) => m.net).concat([1]));
    chartCard.appendChild(h('div', { style: { fontWeight: '600', fontSize: '14px', marginBottom: '10px' } }, 'Firmaya göre net tutar' + (groups.length > 8 ? ' (ilk 8)' : '')));
    topN.forEach((m) => chartCard.appendChild(h('div', { style: { marginBottom: '8px' } }, [
      h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px', gap: '8px' } }, [h('span', { style: { fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, m.key), h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", color: 'var(--signed)', whiteSpace: 'nowrap' } }, formatMoney(m.net))]),
      h('div', { style: { height: '8px', background: 'var(--paper2)', borderRadius: '4px', overflow: 'hidden' } }, [h('div', { style: { height: '100%', width: Math.max(2, Math.round((Math.max(m.net, 0) / max) * 100)) + '%', background: 'var(--primary)' } })]),
    ])));
  }
  out.appendChild(chartCard);

  const exp = h('div', { style: { display: 'flex', gap: '8px', marginBottom: '14px' } });
  exp.appendChild(btn([ic('sheet', 15), ' Excel'], { onclick: exportSummaryExcel, style: { flex: '1', justifyContent: 'center', padding: '10px', fontSize: '13.5px' } }, 'var(--signed)', '#fff'));
  exp.appendChild(btn([ic('filedown', 15), ' PDF'], { onclick: exportSummaryPDF, style: { flex: '1', justifyContent: 'center', padding: '10px', fontSize: '13.5px' } }, 'var(--primary)', 'var(--on-primary)'));
  out.appendChild(exp);

  groups.forEach((g) => {
    const open = !!state.sumOpen[mode + ':' + g.key];
    const card = h('div', { className: 'card', style: { cursor: 'pointer', marginBottom: '10px' }, onclick: () => { state.sumOpen[mode + ':' + g.key] = !open; rerenderSummaryResults(); } });
    card.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' } }, [
      h('div', { style: { fontWeight: '700', fontSize: '15px' } }, sumLabel(g, mode)),
      h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', whiteSpace: 'nowrap' } }, g.count + ' sevkiyat ' + (open ? '▲' : '▼')),
    ]));
    const rows = [['Miktar', qtyText(g.units), null], ['Tutar (KDV hariç)', formatMoney(g.amount), null], ['KDV dahil tutar', formatMoney(withVat(g.amount)), null], ['Boya maliyeti', '- ' + formatMoney(g.paint), 'var(--stamp)'], ['Net tutar', formatMoney(g.net), 'var(--signed)']];
    rows.forEach(([k, v, col], i) => card.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '3px 0', fontWeight: i === rows.length - 1 ? '700' : '400', borderTop: i === rows.length - 1 ? '1px solid var(--line)' : 'none', marginTop: i === rows.length - 1 ? '4px' : '0' } }, [h('span', { style: { color: i === rows.length - 1 ? (col || 'inherit') : 'var(--inkSoft)' } }, k), h('span', { style: { fontFamily: "'IBM Plex Mono',monospace", color: col || 'var(--ink)' } }, v)])));
    if (open) {
      const subBox = h('div', { style: { marginTop: '10px', background: 'var(--paper2)', borderRadius: '10px', padding: '8px 10px' } });
      subBox.appendChild(h('div', { style: { fontSize: '10.5px', fontWeight: '700', color: 'var(--steel)', textTransform: 'uppercase', marginBottom: '6px' } }, mode === 'month' ? 'Firmalara göre' : 'Aylara göre'));
      g.subList.forEach((r) => subBox.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '12.5px', padding: '4px 0', borderTop: '1px solid var(--line)' } }, [
        h('div', { style: { minWidth: '0' } }, [h('div', { style: { fontWeight: '600' } }, mode === 'month' ? r.key : monthLabel(r.key)), h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)' } }, r.count + ' sevk · ' + qtyText(r.units))]),
        h('div', { style: { textAlign: 'right', fontFamily: "'IBM Plex Mono',monospace" } }, [h('div', { style: { color: 'var(--signed)', fontWeight: '700' } }, formatMoney(r.net)), h('div', { style: { fontSize: '11px', color: 'var(--inkSoft)' } }, 'Tutar ' + formatMoney(r.amount))]),
      ])));
      card.appendChild(subBox);
    }
    out.appendChild(card);
  });
  return out;
}
function summaryFilterText() {
  const p = [];
  if (state.sumCompany) p.push('Firma: ' + state.sumCompany);
  if (state.sumInvoiced) p.push(state.sumInvoiced === 'yes' ? 'Fatura kesilmis' : 'Fatura kesilmemis');
  if (state.sumPrice) p.push(state.sumPrice === 'yes' ? 'Fiyati girilmis' : 'Fiyati girilmemis');
  if (state.sumFrom || state.sumTo) p.push((state.sumFrom ? formatDateTR(state.sumFrom) : '...') + ' - ' + (state.sumTo ? formatDateTR(state.sumTo) : '...'));
  if (state.sumQuery.trim()) p.push('Arama: ' + state.sumQuery.trim());
  return p.join(' | ') || 'Tum kayitlar';
}
async function exportSummaryExcel() {
  const list = filteredForSummary();
  if (!list.length) { state.error = 'Aktarılacak kayıt yok.'; render(); return; }
  try {
    const units = ['kg', 'ton', 'm2', 'adet'];
    const cols = (g) => { const o = {}; units.forEach((u) => { if (Object.keys(list.reduce((a, s) => (hasQty(s) ? Object.assign(a, { [s.tonnageUnit || 'kg']: 1 }) : a), {})).indexOf(u) !== -1) o['Miktar (' + unitLabel(u) + ')'] = g.units[u] ? Math.round(g.units[u] * 100) / 100 : 0; }); return o; };
    const base = (label, labelName, g) => Object.assign({ [labelName]: label, 'Sevkiyat': g.count }, cols(g), { 'Fiyatlı Kayıt': g.priced, 'Tutar (KDV Hariç)': Math.round(g.amount * 100) / 100, 'KDV Dahil Tutar': Math.round(withVat(g.amount) * 100) / 100, 'Boya Maliyeti': Math.round(g.paint * 100) / 100, 'Net Tutar': Math.round(g.net * 100) / 100 });
    const byMonth = aggregateSummary(list, 'month'), byCo = aggregateSummary(list, 'company');
    const sheetMonth = byMonth.map((g) => base(monthLabel(g.key), 'Ay', g));
    const sheetCo = byCo.map((g) => base(g.key, 'Firma', g));
    const sheetBoth = [];
    byCo.forEach((g) => g.subList.forEach((r) => sheetBoth.push(base(monthLabel(r.key), 'Ay', r) && Object.assign({ 'Firma': g.key }, base(monthLabel(r.key), 'Ay', r)))));
    const wb = XLSX.utils.book_new();
    [['Aylık Özet', sheetMonth], ['Firma Özeti', sheetCo], ['Firma-Ay Detay', sheetBoth]].forEach(([n, rows]) => { const ws = XLSX.utils.json_to_sheet(rows); ws['!cols'] = Object.keys(rows[0] || {}).map((k) => ({ wch: k === 'Firma' ? 28 : 15 })); XLSX.utils.book_append_sheet(wb, ws, n); });
    const bytes = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const mode = await saveOrShareFile(bytes, 'ozet-raporu-' + todayISO() + '.xlsx', XLSX_MIME, { [XLSX_MIME]: ['.xlsx'] });
    const msg = mode === 'cancelled' ? null : (mode === 'picker' ? '✓ Excel kaydedildi.' : mode === 'shared' ? '✓ Excel paylaşıldı.' : 'Excel hazırlandı.');
    if (msg) { state.successMsg = msg; setTimeout(() => { state.successMsg = ''; render(); }, 4000); }
  } catch (e) { state.error = 'Excel oluşturulamadı: ' + (e && e.message ? e.message : e); }
  render();
}
function buildSummaryPDF(list, mode) {
  const W = PDF_PAGE_W, H = PDF_PAGE_H, m = 36;
  const groups = aggregateSummary(list, mode);
  const tot = emptyAgg('all'); list.forEach((x) => addToAgg(tot, x));
  const X = { cnt: W - m - 235, qty: W - m - 165, amt: W - m - 85, net: W - m };
  const pages = []; let lines, y;
  const txt = (x, yy, t, size) => lines.push('BT /F1 ' + (size || 9) + ' Tf ' + x.toFixed(1) + ' ' + yy.toFixed(1) + ' Td (' + pdfEscapeText(t) + ') Tj ET');
  const txtR = (xr, yy, t, size) => txt(xr - pdfTextWidth(turkishToAscii(t), size || 9), yy, t, size);
  const cut = (t, n) => { t = turkishToAscii(t); return t.length > n ? t.slice(0, n - 1) + '.' : t; };
  const head = () => { txt(m, y, mode === 'month' ? 'Ay / Firma' : 'Firma / Ay', 9); txtR(X.cnt, y, 'Sevk', 9); txtR(X.qty, y, 'Miktar', 9); txtR(X.amt, y, 'Tutar', 9); txtR(X.net, y, 'Net', 9); y -= 5; lines.push(m + ' ' + y + ' m ' + (W - m) + ' ' + y + ' l S'); y -= 13; };
  function newPage(first) {
    lines = []; y = H - 48; pages.push(lines);
    if (first) { txt(m, y, (mode === 'month' ? 'AYLIK' : 'FIRMA BAZLI') + ' OZET RAPORU', 17); y -= 18; txt(m, y, cut(summaryFilterText(), 95), 9); y -= 13; txt(m, y, 'Duzenlenme tarihi: ' + formatDateTR(todayISO()), 9); y -= 22; }
    else { txt(m, y, 'OZET RAPORU (devam)', 10); y -= 20; }
    head();
  }
  const qshort = (u) => Object.keys(u).map((k) => fmtNum(u[k]) + ' ' + pdfUnitLabel(k)).join('+') || '-';
  newPage(true);
  groups.forEach((g) => {
    if (y < 90) newPage(false);
    txt(m, y, mode === 'month' ? monthLabel(g.key) : cut(g.key, 34), 10);
    txtR(X.cnt, y, String(g.count), 9.5); txtR(X.qty, y, cut(qshort(g.units), 18), 9); txtR(X.amt, y, moneyAscii(g.amount), 9); txtR(X.net, y, moneyAscii(g.net), 9.5); y -= 13;
    g.subList.slice(0, 40).forEach((r) => {
      if (y < 60) newPage(false);
      txt(m + 12, y, mode === 'month' ? cut(r.key, 34) : monthLabel(r.key), 8);
      txtR(X.cnt, y, String(r.count), 8); txtR(X.qty, y, cut(qshort(r.units), 18), 8); txtR(X.amt, y, moneyAscii(r.amount), 8); txtR(X.net, y, moneyAscii(r.net), 8); y -= 11;
    });
    y -= 5;
  });
  if (y < 80) newPage(false);
  y -= 2; lines.push(m + ' ' + y + ' m ' + (W - m) + ' ' + y + ' l S'); y -= 15;
  txt(m, y, 'GENEL TOPLAM', 10.5); txtR(X.cnt, y, String(tot.count), 10); txtR(X.qty, y, cut(qshort(tot.units), 18), 9); txtR(X.amt, y, moneyAscii(tot.amount), 9.5); txtR(X.net, y, moneyAscii(tot.net), 10.5); y -= 14;
  txt(m, y, 'KDV (%' + getVatRate() + ') dahil toplam tutar: ' + moneyAscii(withVat(tot.amount)), 8); y -= 11;
  txt(m, y, 'Boya maliyeti toplami: ' + moneyAscii(tot.paint) + '   (Net = Tutar - Boya maliyeti, yalniz fiyati girilmis kayitlar)', 8);
  return assemblePDF(pages.map((ls) => ({ contentStr: ls.join('\n') + '\n', images: [] })));
}
async function exportSummaryPDF() {
  const list = filteredForSummary();
  if (!list.length) return;
  try {
    const bytes = buildSummaryPDF(list, state.sumMode);
    const mode = await saveOrShareFile(bytes, 'ozet-raporu-' + (state.sumMode === 'month' ? 'aylik' : 'firma') + '-' + todayISO() + '.pdf', 'application/pdf', { 'application/pdf': ['.pdf'] });
    const msg = mode === 'cancelled' ? null : (mode === 'picker' ? '✓ Rapor kaydedildi.' : mode === 'shared' ? '✓ Rapor paylaşıldı.' : 'Rapor hazırlandı.');
    if (msg) { state.successMsg = msg; setTimeout(() => { state.successMsg = ''; render(); }, 4000); }
  } catch (e) { state.error = 'Rapor oluşturulamadı: ' + (e && e.message ? e.message : e); }
  render();
}

/* ---- Çöp kutusu view ---- */
/* ---- Fiyat raporu: firma → boya detayı → verilen fiyatlar ---- */
function computePriceReport() {
  const byCo = {};
  state.shipments.forEach((s) => {
    const co = s.company || '(FİRMASIZ)';
    const c = byCo[co] || (byCo[co] = { company: co, groups: {}, priced: 0, unpriced: 0 });
    if (!hasPrice(s)) { c.unpriced++; return; }
    c.priced++;
    const d = (s.paintDetails || '').trim() || '(Boya detayı girilmemiş)';
    const u = s.tonnageUnit || 'kg';
    const key = d + '||' + u;
    const g = c.groups[key] || (c.groups[key] = { detail: d, unit: u, items: [] });
    g.items.push({ date: s.date || '', price: parseFloat(s.unitPrice), seq: s.seq, qty: s.tonnage || '' });
  });
  return Object.keys(byCo).sort((a, b) => a.localeCompare(b, 'tr')).map((k) => {
    const c = byCo[k];
    c.list = Object.keys(c.groups).map((gk) => {
      const g = c.groups[gk];
      g.items.sort((a, b) => b.date.localeCompare(a.date) || (b.seq || 0) - (a.seq || 0));
      const prices = g.items.map((i) => i.price);
      g.last = g.items[0]; g.min = Math.min.apply(null, prices); g.max = Math.max.apply(null, prices);
      g.avg = prices.reduce((x, y) => x + y, 0) / prices.length;
      return g;
    }).sort((a, b) => b.last.date.localeCompare(a.last.date));
    return c;
  }).filter((c) => c.priced > 0 || c.unpriced > 0);
}
function renderPriceReportView() {
  const container = h('div', { style: { padding: '14px 16px 18px' } });
  const searchRow = h('div', { style: { display: 'flex', gap: '8px', marginBottom: '12px' } });
  const sw = h('div', { style: { position: 'relative', flex: '1' } });
  sw.appendChild(h('span', { style: { position: 'absolute', left: '10px', top: '12px', color: 'var(--inkSoft)' } }, [ic('search', 15)]));
  sw.appendChild(inputEl({ value: state.priceQuery, placeholder: 'Firma veya boya detayı ara', style: { paddingLeft: '30px', fontSize: '13.5px' }, oninput: (e) => { state.priceQuery = e.target.value; rerenderPriceReport(); } }));
  searchRow.appendChild(sw);
  searchRow.appendChild(btn([ic('sheet', 15), ' Excel'], { onclick: exportPriceReportExcel, style: { padding: '0 12px', fontSize: '13px' } }, 'var(--signed)', '#fff'));
  searchRow.appendChild(btn([ic('filedown', 15), ' PDF'], { onclick: exportPriceReportPDF, style: { padding: '0 12px', fontSize: '13px' } }, 'var(--primary)', 'var(--on-primary)'));
  container.appendChild(searchRow);
  container.appendChild(h('div', { style: { fontSize: '11.5px', color: 'var(--inkSoft)', marginBottom: '10px' } }, 'Fiyatlar KDV hariçtir; KDV dahil karşılığı (%' + getVatRate() + ') yanında gösterilir.'));
  container.appendChild(h('div', { id: 'price-wrap' }, [buildPriceReportList()]));
  return container;
}
function filteredPriceReport() {
  const q = state.priceQuery.trim() ? trNormalize(state.priceQuery.trim()) : '';
  return computePriceReport().map((c) => {
    if (!q) return c;
    if (trNormalize(c.company).indexOf(q) !== -1) return c;
    const gs = c.list.filter((g) => trNormalize(g.detail).indexOf(q) !== -1);
    return gs.length ? Object.assign({}, c, { list: gs }) : null;
  }).filter(Boolean);
}
function rerenderPriceReport() {
  const w = document.getElementById('price-wrap');
  if (!w) return;
  w.innerHTML = ''; w.appendChild(buildPriceReportList());
}
function buildPriceReportList() {
  const wrap = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } });
  const rows = filteredPriceReport();
  if (!rows.length) return h('div', { style: { textAlign: 'center', padding: '40px 20px', color: 'var(--inkSoft)', border: '1.5px dashed var(--line)', borderRadius: '12px', fontSize: '14px' } }, 'Gösterilecek kayıt yok. Fiyatlar Maliyet sekmesinden girilir.');
  rows.forEach((c) => {
    const open = !!state.priceOpen[c.company] || !!state.priceQuery.trim();
    const card = h('div', { className: 'card', style: { cursor: 'pointer' }, onclick: () => { state.priceOpen[c.company] = !state.priceOpen[c.company]; rerenderPriceReport(); } });
    card.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' } }, [
      h('div', { style: { fontWeight: '700', fontSize: '15px' } }, c.company),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--inkSoft)' } }, [
        h('span', {}, c.priced + ' fiyatlı' + (c.unpriced ? ' · ' + c.unpriced + ' fiyatsız' : '')),
        h('span', {}, open ? '▲' : '▼'),
      ]),
    ]));
    if (!open && c.list.length) {
      const g = c.list[0];
      card.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginTop: '4px' } }, 'Son: ' + formatMoney(g.last.price) + '/' + unitLabel(g.unit) + (c.list.length > 1 ? ' · ' + c.list.length + ' farklı iş' : '')));
    }
    if (open) {
      if (!c.list.length) card.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', marginTop: '8px' } }, 'Bu firmaya henüz fiyat girilmemiş.'));
      c.list.forEach((g) => {
        const box = h('div', { style: { marginTop: '10px', padding: '10px', background: 'var(--paper2)', borderRadius: '10px' } });
        box.appendChild(h('div', { style: { fontWeight: '600', fontSize: '13px', marginBottom: '4px' } }, g.detail));
        box.appendChild(h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12.5px', display: 'flex', flexWrap: 'wrap', gap: '2px 14px', marginBottom: '6px' } }, [
          h('span', { style: { color: 'var(--signed)', fontWeight: '700' } }, 'Son: ' + formatMoney(g.last.price) + '/' + unitLabel(g.unit) + ' (' + formatDateTR(g.last.date) + ')'),
          h('span', { style: { color: 'var(--steel)' } }, 'KDV dahil: ' + formatMoney(withVat(g.last.price)) + '/' + unitLabel(g.unit)),
          g.items.length > 1 ? h('span', { style: { color: 'var(--inkSoft)' } }, 'Aralık: ' + formatMoney(g.min) + ' – ' + formatMoney(g.max)) : null,
          g.items.length > 1 ? h('span', { style: { color: 'var(--inkSoft)' } }, 'Ort: ' + formatMoney(g.avg)) : null,
          h('span', { style: { color: 'var(--inkSoft)' } }, g.items.length + ' sevkiyat'),
        ].filter(Boolean)));
        if (g.items.length > 1) {
          const hist = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '5px' } });
          g.items.slice(0, 6).forEach((i) => hist.appendChild(h('span', { style: { fontSize: '10.5px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '8px', padding: '2px 6px', color: 'var(--inkSoft)' } }, formatDateTR(i.date).slice(0, 5) + ' · ' + fmtNum(i.price))));
          box.appendChild(hist);
        }
        card.appendChild(box);
      });
    }
    wrap.appendChild(card);
  });
  return wrap;
}
function buildPriceReportPDF(rows) {
  const W = PDF_PAGE_W, H = PDF_PAGE_H, m = 40;
  const pages = []; let lines, y;
  const txt = (x, yy, s, size) => lines.push('BT /F1 ' + (size || 9) + ' Tf ' + x.toFixed(1) + ' ' + yy.toFixed(1) + ' Td (' + pdfEscapeText(s) + ') Tj ET');
  const cut = (s, n) => { s = turkishToAscii(s); return s.length > n ? s.slice(0, n - 1) + '.' : s; };
  function newPage(first) {
    lines = []; y = H - 48; pages.push({ contentStr: '', lines });
    if (first) { txt(m, y, 'FIRMA FIYAT RAPORU', 17); y -= 18; txt(m, y, 'Duzenlenme tarihi: ' + formatDateTR(todayISO()), 9); y -= 22; }
    else { txt(m, y, 'FIRMA FIYAT RAPORU (devam)', 10); y -= 20; }
  }
  newPage(true);
  rows.forEach((c) => {
    if (y < 110) newPage(false);
    txt(m, y, cut(c.company, 50), 11); y -= 14;
    if (!c.list.length) { txt(m + 10, y, 'Fiyat girilmemis.', 8.5); y -= 14; }
    c.list.forEach((g) => {
      if (y < 70) newPage(false);
      txt(m + 10, y, cut(g.detail, 58), 9);
      txt(W - m - 200, y, 'Son: ' + moneyAscii(g.last.price) + '/' + pdfUnitLabel(g.unit), 9);
      y -= 12;
      const extra = formatDateTR(g.last.date) + ' - ' + g.items.length + ' sevkiyat' + (g.items.length > 1 ? ' - aralik ' + moneyAscii(g.min) + ' / ' + moneyAscii(g.max) + ' - ort. ' + moneyAscii(g.avg) : '');
      txt(m + 10, y, extra, 8); y -= 14;
    });
    y -= 6;
  });
  return assemblePDF(pages.map((p) => ({ contentStr: p.lines.join('\n') + '\n', images: [] })));
}
async function exportPriceReportExcel() {
  const rows = filteredPriceReport().filter((c) => c.list.length);
  if (!rows.length) { state.error = 'Aktarılacak fiyat kaydı yok.'; render(); return; }
  try {
    const summary = [], history = [];
    rows.forEach((c) => c.list.forEach((g) => {
      summary.push({
        'Firma': c.company, 'Boya Detayı': g.detail, 'Birim': unitLabel(g.unit),
        'Son Fiyat (KDV Hariç)': g.last.price, 'Son Fiyat (KDV Dahil)': Math.round(withVat(g.last.price) * 100) / 100, 'Son Fiyat Tarihi': formatDateTR(g.last.date),
        'En Düşük': g.min, 'En Yüksek': g.max, 'Ortalama': Math.round(g.avg * 100) / 100, 'Sevkiyat Sayısı': g.items.length,
      });
      g.items.forEach((i) => history.push({
        'Firma': c.company, 'Boya Detayı': g.detail, 'Tarih': formatDateTR(i.date), 'Sevk No': '#' + String(i.seq || 0).padStart(4, '0'),
        'Miktar': i.qty !== '' && !isNaN(parseFloat(i.qty)) ? parseFloat(i.qty) : '', 'Birim': unitLabel(g.unit), 'Birim Fiyat (KDV Hariç)': i.price, 'Birim Fiyat (KDV Dahil)': Math.round(withVat(i.price) * 100) / 100,
      }));
    }));
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(summary);
    ws1['!cols'] = [{ wch: 26 }, { wch: 34 }, { wch: 7 }, { wch: 11 }, { wch: 16 }, { wch: 11 }, { wch: 11 }, { wch: 11 }, { wch: 15 }];
    const ws2 = XLSX.utils.json_to_sheet(history);
    ws2['!cols'] = [{ wch: 26 }, { wch: 34 }, { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 7 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Fiyat Özeti');
    XLSX.utils.book_append_sheet(wb, ws2, 'Fiyat Geçmişi');
    const bytes = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const mode = await saveOrShareFile(bytes, 'firma-fiyat-raporu-' + todayISO() + '.xlsx', XLSX_MIME, { [XLSX_MIME]: ['.xlsx'] });
    const msg = mode === 'cancelled' ? null : (mode === 'picker' ? '✓ Excel kaydedildi.' : mode === 'shared' ? '✓ Excel paylaşıldı.' : 'Excel hazırlandı.');
    if (msg) { state.successMsg = msg; setTimeout(() => { state.successMsg = ''; render(); }, 4000); }
  } catch (e) { state.error = 'Excel oluşturulamadı: ' + (e && e.message ? e.message : e); }
  render();
}
async function exportPriceReportPDF() {
  const rows = filteredPriceReport();
  if (!rows.length) return;
  try {
    const bytes = buildPriceReportPDF(rows);
    const mode = await saveOrShareFile(bytes, 'firma-fiyat-raporu-' + todayISO() + '.pdf', 'application/pdf', { 'application/pdf': ['.pdf'] });
    const msg = mode === 'cancelled' ? null : (mode === 'picker' ? '✓ Rapor kaydedildi.' : mode === 'shared' ? '✓ Rapor paylaşıldı.' : 'Rapor hazırlandı.');
    if (msg) { state.successMsg = msg; setTimeout(() => { state.successMsg = ''; render(); }, 4000); }
  } catch (e) { state.error = 'Rapor oluşturulamadı: ' + (e && e.message ? e.message : e); }
  render();
}
function renderTrashView() {
  const container = h('div', { style: { padding: '18px 16px' } });
  container.appendChild(h('h2', { style: { margin: '0 0 8px', fontSize: '18px', fontWeight: '600' } }, 'Çöp Kutusu'));
  container.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '14px' } }, 'Silinen kayıtlar ' + TRASH_DAYS + ' gün burada tutulur, sonra otomatik silinir. Geri alınca eski sevk numarasıyla ana listeye döner.'));
  if (state.successMsg) container.appendChild(h('div', { style: { background: 'var(--signed-bg)', color: 'var(--signed)', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', marginBottom: '12px', fontWeight: '600' } }, state.successMsg));
  if (!state.trash.length) { container.appendChild(h('div', { style: { textAlign: 'center', padding: '40px 20px', color: 'var(--inkSoft)', border: '1.5px dashed var(--line)', borderRadius: '12px' } }, 'Çöp kutusu boş.')); return container; }
  state.trash.forEach((s) => {
    const left = Math.max(0, TRASH_DAYS - Math.floor((Date.now() - s.deletedAt) / 86400000));
    const card = h('div', { className: 'card', style: { cursor: 'default', marginBottom: '10px' } });
    card.appendChild(h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } }, [h('div', { style: { fontWeight: '600' } }, s.company || '(FİRMASIZ)'), h('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: 'var(--steel)' } }, '#' + String(s.seq).padStart(4, '0'))]));
    card.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', marginBottom: '10px' } }, formatDateTR(s.date) + ' · ' + (s.plate || '-') + ' · ' + (hasQty(s) ? s.tonnage + ' ' + unitLabel(s.tonnageUnit) : 'miktar yok') + ' · ' + left + ' gün kaldı'));
    card.appendChild(h('div', { style: { display: 'flex', gap: '8px' } }, [
      btn(['Geri al'], { onclick: () => restoreFromTrash(s), style: { flex: '1', justifyContent: 'center', padding: '9px' } }, 'var(--primary)', 'var(--on-primary)'),
      btn(['Kalıcı sil'], { onclick: () => { state.pendingPurge = [s.id]; render(); }, style: { flex: '1', justifyContent: 'center', padding: '9px', border: '1px solid var(--stamp)' } }, 'var(--cream)', 'var(--stamp)'),
    ]));
    container.appendChild(card);
  });
  container.appendChild(btn(['Çöp kutusunu boşalt'], { onclick: () => { state.pendingPurge = state.trash.map((x) => x.id); render(); }, style: { width: '100%', justifyContent: 'center', padding: '11px', marginTop: '6px' } }, 'var(--stamp)', '#fff'));
  return container;
}
function renderPurgeModal() {
  const ids = state.pendingPurge;
  const overlay = h('div', { style: { position: 'fixed', inset: '0', background: 'rgba(17,24,39,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: '60' } });
  const box = h('div', { style: { background: 'var(--cream)', borderRadius: '16px', padding: '22px', maxWidth: '320px', width: '100%' } });
  box.appendChild(h('div', { style: { fontWeight: '700', fontSize: '16px', marginBottom: '8px', color: 'var(--stamp)' } }, 'Kalıcı olarak silinsin mi?'));
  box.appendChild(h('div', { style: { fontSize: '13px', color: 'var(--inkSoft)', marginBottom: '16px', lineHeight: '1.5' } }, ids.length + ' kayıt tamamen silinecek. Bu işlem geri alınamaz.'));
  box.appendChild(h('div', { style: { display: 'flex', gap: '10px' } }, [
    btn(['Vazgeç'], { onclick: () => { state.pendingPurge = null; render(); }, style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'var(--paper2)', 'var(--ink)'),
    btn(['Evet, sil'], { onclick: () => purgeFromTrash(ids), style: { flex: '1', justifyContent: 'center', padding: '10px' } }, 'var(--stamp)', '#fff'),
  ]));
  overlay.appendChild(box);
  return overlay;
}

/* ---- Firma hesap özeti PDF (müşteriye gidebilir: boya maliyeti/net YOK) ---- */
function pdfTextWidth(str, size) {
  let w = 0;
  for (const ch of String(str)) w += /[0-9]/.test(ch) ? 0.556 : /[.,: ]/.test(ch) ? 0.278 : /[A-Z]/.test(ch) ? 0.68 : /[ilj\-]/.test(ch) ? 0.25 : 0.52;
  return w * size;
}
function moneyAscii(v) { return v.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL'; }
function buildStatementPDF(list, opts) {
  const W = PDF_PAGE_W, H = PDF_PAGE_H, m = 36;
  const rows = list.slice().sort((a, b) => (a.date || '').localeCompare(b.date || '') || (a.seq || 0) - (b.seq || 0));
  const colX = { date: m, no: m + 62, desc: m + 104, qty: W - m - 150, price: W - m - 78, total: W - m };
  const pages = [];
  let lines, y;
  const txt = (x, yy, s, size) => lines.push('BT /F1 ' + (size || 9) + ' Tf ' + x.toFixed(1) + ' ' + yy.toFixed(1) + ' Td (' + pdfEscapeText(s) + ') Tj ET');
  const txtR = (xr, yy, s, size) => txt(xr - pdfTextWidth(turkishToAscii(s), size || 9), yy, s, size);
  const hline = (yy) => lines.push(m + ' ' + yy.toFixed(1) + ' m ' + (W - m) + ' ' + yy.toFixed(1) + ' l S');
  function newPage(first) {
    lines = []; y = H - 50;
    if (first) {
      txt(m, y, 'HESAP OZETI', 18); y -= 22;
      txt(m, y, 'Firma: ' + (opts.company || 'TUM FIRMALAR'), 11); y -= 15;
      txt(m, y, 'Donem: ' + opts.period, 10); y -= 13;
      txt(m, y, 'Duzenlenme tarihi: ' + formatDateTR(todayISO()), 9); y -= 22;
    } else { txt(m, y, 'HESAP OZETI (devam) - ' + (opts.company || 'TUM FIRMALAR'), 10); y -= 22; }
    txt(colX.date, y, 'Tarih', 9); txt(colX.no, y, 'Sevk No', 9); txt(colX.desc, y, 'Aciklama', 9);
    txtR(colX.qty, y, 'Miktar', 9); txtR(colX.price, y, 'Birim Fiyat', 9); txtR(colX.total, y, 'Tutar', 9);
    y -= 5; hline(y); y -= 14;
    pages.push({ lines, images: [] });
  }
  newPage(true);
  const sums = {}; let total = 0, priced = 0;
  rows.forEach((s) => {
    if (y < 90) newPage(false);
    const a = costAmount(s);
    txt(colX.date, y, formatDateTR(s.date), 8.5);
    txt(colX.no, y, '#' + String(s.seq).padStart(4, '0'), 8.5);
    const desc = turkishToAscii(s.paintDetails || s.plate || '-');
    txt(colX.desc, y, desc.length > 30 ? desc.slice(0, 29) + '.' : desc, 8.5);
    txtR(colX.qty, y, hasQty(s) ? (s.tonnage + ' ' + pdfUnitLabel(s.tonnageUnit)) : '-', 8.5);
    txtR(colX.price, y, hasPrice(s) ? moneyAscii(parseFloat(s.unitPrice)) : '-', 8.5);
    txtR(colX.total, y, a !== null ? moneyAscii(a) : '-', 8.5);
    if (hasQty(s)) { const u = pdfUnitLabel(s.tonnageUnit || 'ton'); sums[u] = (sums[u] || 0) + parseFloat(s.tonnage); }
    if (a !== null) { total += a; priced++; }
    y -= 15;
  });
  if (y < 150) newPage(false);
  y -= 4; hline(y); y -= 16;
  txt(m, y, 'Toplam sevkiyat: ' + rows.length + '  (fiyatlandirilmis: ' + priced + ')', 9.5); y -= 15;
  const qtyStr = Object.keys(sums).map((u) => sums[u].toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ' + u).join(' + ');
  if (qtyStr) { txt(m, y, 'Toplam miktar: ' + qtyStr, 9.5); y -= 18; }
  const lbl = (t, sz) => txtR(colX.price - 14, y, t, sz);
  lbl('Ara toplam (KDV haric):', 9.5); txtR(colX.total, y, moneyAscii(total), 9.5); y -= 14;
  lbl('KDV (%' + getVatRate() + '):', 9.5); txtR(colX.total, y, moneyAscii(vatAmount(total)), 9.5); y -= 18;
  lbl('GENEL TOPLAM (KDV dahil):', 11); txtR(colX.total, y, moneyAscii(withVat(total)), 11); y -= 22;
  txt(m, y, 'Not: Birim fiyat ve satir tutarlari KDV haric gosterilmistir.', 8);
  const out = pages.map((p, i) => ({ contentStr: p.lines.join('\n') + '\n', images: [] }));
  return assemblePDF(out);
}
async function exportStatementPDF(list) {
  if (!list.length) return;
  try {
    const from = state.costDateFrom, to = state.costDateTo;
    const period = (from || to) ? ((from ? formatDateTR(from) : '...') + ' - ' + (to ? formatDateTR(to) : '...')) : 'Tum kayitlar';
    const bytes = buildStatementPDF(list, { company: state.costCompanyFilter, period });
    const name = 'hesap-ozeti-' + (state.costCompanyFilter ? turkishToAscii(state.costCompanyFilter).replace(/[^A-Za-z0-9]+/g, '-').toLowerCase() + '-' : '') + todayISO() + '.pdf';
    const mode = await saveOrShareFile(bytes, name, 'application/pdf', { 'application/pdf': ['.pdf'] });
    const msg = mode === 'cancelled' ? null : (mode === 'picker' ? '✓ Hesap özeti kaydedildi.' : mode === 'shared' ? '✓ Hesap özeti paylaşıldı.' : 'Hesap özeti hazırlandı.');
    if (msg) { state.successMsg = msg; setTimeout(() => { state.successMsg = ''; render(); }, 5000); }
  } catch (e) { state.error = 'Hesap özeti oluşturulamadı: ' + (e && e.message ? e.message : e); }
  render();
}

/* ---- PIN kilidi ---- */
function getPin() { try { return localStorage.getItem('sevkiyat_pin') || '1525'; } catch (e) { return '1525'; } }
function lockApp() { if (state.pinEnabled) { state.locked = true; state.pinInput = ''; state.pinError = false; render(); } }
function pressPin(d) {
  if (state.pinInput.length >= 4) return;
  state.pinInput += d; state.pinError = false;
  if (state.pinInput.length === 4) {
    if (state.pinInput === getPin()) { touchActive(); state.locked = false; state.pinInput = ''; render(); setTimeout(() => window.sevkCheckAct(), 50); return; }
    state.pinError = true; render();
    setTimeout(() => { state.pinInput = ''; render(); }, 450);
    return;
  }
  render();
}
function renderLockScreen() {
  const wrap = h('div', { style: { position: 'fixed', inset: '0', background: '#111113', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: '100', color: '#fff' } });
  wrap.appendChild(h('div', { style: { background: '#fff', borderRadius: '16px', padding: '10px 14px', marginBottom: '14px', boxShadow: '0 0 0 3px #8AB4FF' } }, [h('img', { src: LOGO_H, alt: 'Yıldız Kumlama & Boya', style: { width: '260px', maxWidth: '78vw', height: 'auto', display: 'block' } })]));
  wrap.appendChild(h('div', { style: { fontSize: '16px', fontWeight: '700', marginBottom: '4px', color: '#8AB4FF' } }, 'Sevkiyat Programı'));
  wrap.appendChild(h('div', { style: { fontSize: '13px', color: state.pinError ? '#F1AEB5' : 'rgba(255,255,255,.65)', marginBottom: '22px' } }, state.pinError ? 'Yanlış PIN, tekrar dene' : 'PIN kodunu gir'));
  const dots = h('div', { style: { display: 'flex', gap: '14px', marginBottom: '28px' } });
  for (let i = 0; i < 4; i++) dots.appendChild(h('div', { style: { width: '14px', height: '14px', borderRadius: '50%', border: '2px solid ' + (state.pinError ? '#DC3545' : '#8AB4FF'), background: i < state.pinInput.length ? (state.pinError ? '#DC3545' : '#8AB4FF') : 'transparent' } }));
  wrap.appendChild(dots);
  const pad = h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 72px)', gap: '14px' } });
  const key = (label, fn) => h('button', { onclick: fn, style: { width: '72px', height: '72px', borderRadius: '50%', border: '1px solid rgba(255,255,255,.25)', background: label === '' ? 'transparent' : 'rgba(255,255,255,.08)', color: '#fff', fontSize: '26px', fontWeight: '500', cursor: 'pointer', visibility: label === '' ? 'hidden' : 'visible' } }, label);
  ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach((d) => pad.appendChild(key(d, () => pressPin(d))));
  pad.appendChild(key('', () => {}));
  pad.appendChild(key('0', () => pressPin('0')));
  pad.appendChild(key('⌫', () => { state.pinInput = state.pinInput.slice(0, -1); render(); }));
  wrap.appendChild(pad);
  return wrap;
}
let _hiddenAt = 0;
let _lastTouch = 0;
['click', 'touchstart', 'keydown'].forEach((ev) => document.addEventListener(ev, () => { if (!state.locked && Date.now() - _lastTouch > 15000) { _lastTouch = Date.now(); touchActive(); } }, true));
window.addEventListener('pagehide', () => { if (!state.locked) touchActive(); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { _hiddenAt = Date.now(); if (!state.locked) touchActive(); }
  else {
    if (!state.locked && lastActiveAt() && Date.now() - lastActiveAt() > PIN_GRACE_MS) lockApp();
    if (supabaseClient && !state.cloudSyncing && !state.locked && (!state.lastSyncAt || Date.now() - state.lastSyncAt > 60000)) syncFromCloud().catch(() => {});
  }
});


/* ============================== main render ============================== */
function render() {
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  const app = document.getElementById('app');
  app.innerHTML = '';
  if (state.locked) { app.appendChild(renderLockScreen()); return; }
  const companyNames = Array.from(new Set(state.shipments.map((s) => s.company).concat(state.quotes.map((q) => q.company)).filter(Boolean)));
  const datalist = h('datalist', { id: 'company-list' }, companyNames.map((c) => h('option', { value: c })));
  app.appendChild(datalist);
  app.appendChild(renderHeader());
  const showNav = NAV_ITEMS.some((it) => it.view === state.view);
  app.className = showNav ? 'has-nav' : ''; app.setAttribute('data-view', state.view);
  if (showNav) app.appendChild(renderTabBar());
  if (state.view === 'list') app.appendChild(renderListView());
  else if (state.view === 'form') app.appendChild(renderFormView());
  else if (state.view === 'detail') app.appendChild(renderDetailView());
  else if (state.view === 'receipt') app.appendChild(renderReceiptView());
  else if (state.view === 'cost') app.appendChild(renderCostView());
  else if (state.view === 'quotes') app.appendChild(renderQuotesView());
  else if (state.view === 'paintcalc') app.appendChild(renderPaintCalcView());
  else if (state.view === 'tasks') app.appendChild(renderTasksView());
  else if (state.view === 'summary') app.appendChild(renderSummaryView());
  else if (state.view === 'trash') app.appendChild(renderTrashView());
  else if (state.view === 'prices') app.appendChild(renderPriceReportView());
  if (state.pendingPurge) app.appendChild(renderPurgeModal());
  if (state.pendingRestore) app.appendChild(renderRestoreModal());
  if (state.pendingDelete) app.appendChild(renderDeleteModal());
  if (state.pendingInvoice) app.appendChild(renderInvoiceModal());
  if (state.pendingBackupPrompt) app.appendChild(renderBackupPromptModal());
  if (state.shareImage) app.appendChild(renderShareImageModal());
  if (state.pendingExitConfirm) app.appendChild(renderExitConfirmModal());
  if (state.showPasteRestore) app.appendChild(renderPasteRestoreModal());
  if (state.pendingCostEdit) app.appendChild(renderCostEditModal());
  if (state.uiExpanded.backup) app.appendChild(renderBackupMenu());
  if (state.assistantOpen) app.appendChild(renderAssistantModal());
  if (state.shortcutsOpen) app.appendChild(renderShortcutsModal());
  if (state.wa) app.appendChild(renderWhatsAppModal());
  if (showNav) app.appendChild(renderBottomNav());
  if (state.navMenuOpen) app.appendChild(renderNavMenu());
}
const NAV_ITEMS = [
  { view: 'list', label: 'Sevkiyat', icon: 'truck' },
  { view: 'cost', label: 'Maliyet', icon: 'sheet' },
  { view: 'tasks', label: 'Görevler', icon: 'check', badge: () => { const t = computeTasks(); return t.ready.length + t.missing.length; } },
  { view: 'summary', label: 'Özet Raporu', icon: 'package' },
  { view: 'prices', label: 'Fiyat Raporu', icon: 'sheet' },
  { view: 'quotes', label: 'Teklifler', icon: 'edit' },
  { view: 'paintcalc', label: 'Boya Hesap', icon: 'palette' },
  { view: 'trash', label: 'Çöp Kutusu', icon: 'trash', badge: () => state.trash.length },
];
const BOTTOM_VIEWS = ['list', 'tasks', 'cost'];
function gotoTab(view) {
  state.navMenuOpen = false;
  if (state.view === view) { window.scrollTo(0, 0); render(); return; }
  state.navStack = view === 'list' ? [] : ['list'];
  state.view = view; render(); window.scrollTo(0, 0);
}
/* ---- telefon ana ekranı kısayolları (kayan düğmeler, widget, ikon) ---- */
window.sevkCheckAct = function () {
  const N = window.SevkNative;
  if (!N || !N.takeAct || state.loading || state.locked) return;
  const a = N.takeAct();
  if (a) sevkAction(a);
};
function sevkAction(a) {
  state.navMenuOpen = false; state.uiExpanded.backup = false; state.shortcutsOpen = false;
  if (a === 'new') { assistantStopSpeak(); state.assistantOpen = false; newShipment(); window.scrollTo(0, 0); return; }
  if (a === 'voice') {
    if (state.assistantRecorder || state.assistantRec) return;
    state.assistantNewHint = true;
    openAssistant();
    state.assistantMsgs.push({ r: 'a', t: 'Yeni sevkiyatı söyle: firma, plaka, şoför, miktar…' });
    render();
    setTimeout(assistantMicToggle, 250);
  }
}
function renderShortcutsModal() {
  const N = window.SevkNative;
  const overlay = h('div', { onclick: () => { state.shortcutsOpen = false; render(); }, style: { position: 'fixed', inset: '0', background: 'rgba(17,24,39,.55)', zIndex: '70', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' } });
  const sheet = h('div', { className: 'sheet', onclick: (e) => e.stopPropagation(), style: { maxWidth: '520px', width: '100%' } });
  sheet.appendChild(h('div', { style: { fontWeight: '800', fontSize: '17px', marginBottom: '4px' } }, 'Telefon ekranı kısayolları'));
  sheet.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--inkSoft)', lineHeight: '1.5', marginBottom: '14px' } }, 'Yeni sevkiyat ve sesli asistanla sevkiyat girişi tek dokunuşla açılır.'));
  const row = (title, sub, right) => h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderTop: '1px solid var(--line)' } }, [
    h('div', { style: { flex: '1', minWidth: '0' } }, [h('div', { style: { fontWeight: '700', fontSize: '14px' } }, title), h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', marginTop: '2px' } }, sub)]), right]);
  const on = (() => { try { return N.bubbleOn(); } catch (e) { return false; } })();
  sheet.appendChild(row('Ekranda kayan düğmeler', 'Her uygulamanın üstünde duran iki yuvarlak düğme. Sürükleyip kenara taşı; uzun basınca kapanır.',
    h('label', { className: 'switch', style: { display: 'inline-flex', alignItems: 'center', cursor: 'pointer' } }, [h('input', { type: 'checkbox', checked: on, style: { width: '22px', height: '22px' }, onchange: (e) => { N.bubbleSet(e.target.checked); setTimeout(render, 400); } })])));
  const msg = (ok) => { state.successMsg = ok ? 'Telefonun sorduğu pencerede "Ekle"ye bas.' : 'Bu telefon bunu desteklemiyor; widget listesinden "Sevkiyat kısayol"u ekleyebilirsin.'; render(); setTimeout(() => { state.successMsg = ''; render(); }, 5000); };
  sheet.appendChild(row('Ana ekrana: Yeni sevkiyat', 'Ana ekranda ayrı bir simge olur.', btn([ic('plus', 14), ' Ekle'], { onclick: () => msg(N.addShortcut('new')), style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--ink)', 'var(--cream)')));
  sheet.appendChild(row('Ana ekrana: Sesli sevkiyat', 'Basınca asistan dinlemeye başlar, söylediğin sevkiyatı forma doldurur.', btn([ic('mic', 14), ' Ekle'], { onclick: () => msg(N.addShortcut('voice')), style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--ink)', 'var(--cream)')));
  sheet.appendChild(row('Widget (ikisi yan yana)', 'Ana ekrana iki düğmeli küçük bir kutu.', btn(['Ekle'], { onclick: () => msg(N.addWidget()), style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--paper2)', 'var(--ink)')));
  overlay.appendChild(sheet);
  return overlay;
}
function buildMediaBox(container) {
  const N = window.SevkNative;
  if (!N || !N.mediaLinked) return;
  const linked = mediaOn();
  const box = h('div', { style: { background: 'var(--cream)', border: '1.5px solid ' + (linked ? 'var(--signed-border)' : 'var(--accent)'), borderRadius: '10px', padding: '12px', marginBottom: '12px' } });
  box.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '700', fontSize: '13.5px' } }, [
    ic('camera', 14, linked ? 'var(--signed)' : 'var(--accent)'), ' Fotoğraf ve İmzalar (telefonda)',
    h('span', { style: { marginLeft: 'auto', fontSize: '11px', color: linked ? 'var(--signed)' : 'var(--inkSoft)', fontWeight: '600' } }, linked ? '● Klasör seçili' : '○ Seçilmedi'),
  ]));
  if (linked) {
    let nm = ''; try { nm = N.mediaName(); } catch (e) {}
    box.appendChild(h('div', { style: { fontSize: '12.5px', fontWeight: '600', marginBottom: '4px', wordBreak: 'break-all' } }, nm));
    box.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--inkSoft)', lineHeight: '1.5', marginBottom: '8px' } }, 'Her sevkiyatın fotoğraf ve imzası bu klasörde kendi alt klasörüne kaydedilir. Buluta yalnızca yazılar gider.'));
    if (state.mediaMig) box.appendChild(h('div', { style: { fontSize: '12.5px', color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' } }, 'Taşınıyor… ' + state.mediaMig.done + ' / ' + state.mediaMig.total));
    box.appendChild(btn([ic('camera', 13), ' Klasörü değiştir'], { onclick: () => N.mediaPick(), style: { fontSize: '12.5px', padding: '8px 12px' } }, 'var(--paper2)', 'var(--ink)'));
  } else {
    box.appendChild(h('div', { style: { fontSize: '12.5px', lineHeight: '1.6', marginBottom: '10px' } }, 'Fotoğraf ve imzalar buluta gidip yer kaplamasın: telefonda bir klasör seç (örn. "Sevkiyat Fotoğrafları" adında yeni klasör oluştur → "Bu klasörü kullan" → İzin ver). Eski kayıtların fotoğrafları da oraya taşınır, buluttan kaldırılır.'));
    box.appendChild(btn([ic('camera', 14), ' Telefonda klasör seç'], { onclick: () => N.mediaPick(), style: { fontSize: '13px', padding: '10px 14px' } }, 'var(--ink)', 'var(--cream)'));
  }
  container.appendChild(box);
}
function newShipment() {
  state.navMenuOpen = false;
  state.form = emptyForm(); state.editingId = null; state.error = '';
  goTo('form'); render();
}
function renderTabBar() {
  // Üstte sadece küçük bir başlık; asıl gezinme altta (başparmak erişimi)
  const current = NAV_ITEMS.find((it) => it.view === state.view) || NAV_ITEMS[0];
  return h('div', { style: { padding: '16px 18px 0', display: 'flex', alignItems: 'center', gap: '8px' } }, [
    ic(current.icon, 18, 'var(--primary)'),
    h('h2', { style: { margin: '0', fontSize: '18px', fontWeight: '800', letterSpacing: '-0.01em' } }, current.label),
  ]);
}
function renderBottomNav() {
  const bar = h('nav', { className: 'bnav' });
  const t = computeTasks();
  const moreActive = NAV_ITEMS.some((it) => it.view === state.view) && BOTTOM_VIEWS.indexOf(state.view) === -1;
  const tab = (label, iconName, view, badge) => h('button', { className: state.view === view ? 'on' : '', onclick: () => gotoTab(view) }, [ic(iconName, 21), label, badge ? h('span', { className: 'bdg' }, String(badge)) : null]);
  bar.appendChild(tab('Sevkiyat', 'truck', 'list'));
  bar.appendChild(tab('Görevler', 'check', 'tasks', t.ready.length + t.missing.length));
  bar.appendChild(h('button', { className: 'fab', title: 'Yeni sevkiyat', onclick: newShipment }, [ic('plus', 28)]));
  bar.appendChild(tab('Maliyet', 'sheet', 'cost'));
  bar.appendChild(h('button', { className: moreActive || state.navMenuOpen ? 'on' : '', onclick: () => { state.navMenuOpen = !state.navMenuOpen; render(); } }, [ic('menu', 21), 'Daha Fazla', false ? null : (state.trash.length && !moreActive ? h('span', { className: 'bdg', style: { background: 'var(--inkSoft)' } }, String(state.trash.length)) : null)]));
  return bar;
}
function renderNavMenu() {
  const overlay = h('div', { style: { position: 'fixed', inset: '0', zIndex: '55' }, onclick: () => { state.navMenuOpen = false; render(); } });
  overlay.appendChild(h('div', { style: { position: 'absolute', inset: '0', background: 'rgba(17,24,39,0.45)' } }));
  const sheet = h('div', { className: 'sheet', onclick: (e) => e.stopPropagation() });
  sheet.appendChild(h('div', { style: { width: '40px', height: '4px', borderRadius: '4px', background: 'var(--line)', margin: '0 auto 14px' } }));
  sheet.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', fontSize: '12.5px', fontWeight: '600', color: 'var(--inkSoft)', margin: '-2px 0 12px' } }, [h('span', { style: { width: '8px', height: '8px', borderRadius: '50%', background: supabaseClient ? 'var(--signed)' : 'var(--inkSoft)', display: 'inline-block' } }), getSyncLabel()]));
  const grid = h('div', { className: 'sheetgrid' });
  const tile = (label, iconName, onclick, on, badge) => h('div', { className: 'tile' + (on ? ' on' : ''), onclick }, [ic(iconName, 24), label, badge ? h('span', { className: 'bdg' }, String(badge)) : null]);
  grid.appendChild(tile('Asistan', 'sparkle', () => openAssistant(), false));
  grid.appendChild(tile('WhatsApp', 'whatsapp', () => openWhatsApp(), false));
  NAV_ITEMS.filter((it) => ['prices', 'quotes', 'summary', 'paintcalc', 'trash'].indexOf(it.view) >= 0).forEach((it) => {
    grid.appendChild(tile(it.label, it.icon, () => gotoTab(it.view), state.view === it.view, it.badge ? it.badge() : 0));
  });
  if (window.SevkNative && window.SevkNative.bubbleSet) grid.appendChild(tile('Kısayollar', 'plus', () => { state.navMenuOpen = false; state.shortcutsOpen = true; render(); }, false));
  grid.appendChild(tile('Yedekleme', 'drive', () => { state.navMenuOpen = false; state.uiExpanded.backup = true; render(); }, false, 0));
  grid.appendChild(tile(state.darkMode ? 'Açık Mod' : 'Karanlık Mod', 'moon', () => { state.darkMode = !state.darkMode; try { localStorage.setItem('sevkiyat_dark_mode', state.darkMode ? '1' : '0'); } catch (e) {} state.navMenuOpen = false; render(); }, false));
  if (state.pinEnabled) grid.appendChild(tile('Kilitle', 'lock', () => { state.navMenuOpen = false; lockApp(); }, false));
  sheet.appendChild(grid);
  overlay.appendChild(sheet);
  return overlay;
}

/* ============================== boot ============================== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./service-worker.js').catch(() => {}); });
}
loadAll();
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') setTimeout(() => { maybeDailyAutoBackup(); }, 3000); });
