const CACHE_NAME = 'sevkiyat-cache-v49';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './star.png', './logo-h.jpg', './app1.bin', './app2.bin', './app3.bin', './app4.bin', './app5.bin', './app6.bin', './app7.bin', './app8.bin', './app9.bin', './app10.bin', './app11.bin', './app12.bin'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first for the xlsx CDN script (so it can update); cache-first for everything else.
  if (event.request.url.includes('cdnjs.cloudflare.com')) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => cached))
  );
});
