// Intolearn service worker
// Bump CACHE_VERSION whenever app.js/styles.css/index.html change so the
// new files actually get picked up instead of being served stale forever.
const CACHE_VERSION = "intolearn-v13";
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Core files needed for the app to open at all. Kept relative so this
// works whether the app is hosted at a domain root or a sub-path
// (e.g. GitHub Pages project sites like /intolearn/).
const APP_SHELL_URLS = [
  "./",
  "./index.html",
  "./app.js",
  "./styles.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

// Third-party libraries loaded from jsdelivr. Tesseract also fetches
// worker/wasm/language-data files at runtime from the same CDN — those
// aren't known ahead of time, so they're handled by the runtime
// cache-first rule below rather than precached here.
const CDN_SHELL_URLS = [
  "https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.css",
  "https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.js",
  "https://cdn.jsdelivr.net/npm/@ericblade/quagga2@1.12.1/dist/quagga.min.js",
  "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500;1,9..144,600&family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Petit+Formal+Script&display=swap"
];
const CDN_ORIGINS = ["https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "https://fonts.gstatic.com"];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const shellCache = await caches.open(APP_SHELL_CACHE);
    // Same-origin files: fail loudly if these don't cache, the app shell needs them.
    await shellCache.addAll(APP_SHELL_URLS);

    // Cross-origin CDN files: best-effort. Don't let one blocked/renamed
    // CDN asset stop the whole service worker from installing.
    const runtimeCache = await caches.open(RUNTIME_CACHE);
    await Promise.allSettled(
      CDN_SHELL_URLS.map(async url => {
        try {
          const res = await fetch(url, { mode: "cors" });
          if (res && (res.ok || res.type === "opaque")) {
            await runtimeCache.put(url, res.clone());
          }
        } catch (err) {
          console.warn("SW: could not precache", url, err);
        }
      })
    );
  })());
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key.startsWith("intolearn-") && key !== APP_SHELL_CACHE && key !== RUNTIME_CACHE)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

function isCDNRequest(url) {
  return CDN_ORIGINS.includes(url.origin);
}

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // App shell HTML: network-first so updates are picked up while online,
  // falling back to the cached shell when offline.
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(APP_SHELL_CACHE);
        cache.put("./index.html", fresh.clone());
        return fresh;
      } catch (err) {
        const cache = await caches.open(APP_SHELL_CACHE);
        return (await cache.match("./index.html")) || (await cache.match("./"));
      }
    })());
    return;
  }

  // CDN libraries (Quagga, Tesseract core + its runtime-fetched worker/
  // wasm/lang-data files, CropperJS): cache-first, so once a file has
  // loaded once, scanning/cropping keeps working offline.
  if (isCDNRequest(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const res = await fetch(request, { mode: "cors" });
        if (res && (res.ok || res.type === "opaque")) {
          cache.put(request, res.clone());
        }
        return res;
      } catch (err) {
        // No cached copy and no network — let it fail; the app already
        // shows a friendly "could not load" message for this case.
        throw err;
      }
    })());
    return;
  }

  // Same-origin static assets (app.js, styles.css, icons, manifest):
  // cache-first with a background refresh so edits still show up on
  // the next load while offline use still works.
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(APP_SHELL_CACHE);
      const cached = await cache.match(request);
      const network = fetch(request).then(res => {
        if (res && res.ok) cache.put(request, res.clone());
        return res;
      }).catch(() => null);
      return cached || (await network) || Response.error();
    })());
  }
});
