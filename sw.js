// Intolearn service worker
// Bump CACHE_VERSION whenever app.js/styles.css/index.html change so the
// new files actually get picked up instead of being served stale forever.
const CACHE_VERSION = "intolearn-v32";
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

// Third-party libraries loaded from jsdelivr, plus the Google Fonts
// stylesheet. Deliberately NOT included here: Tesseract's own runtime-
// fetched worker script, WASM binary, and language-data files. Those used
// to be caught by a blanket "any request to this CDN origin" rule below,
// and that turned out to be a real bug — if one of those ever got cached
// in a partial or stale state, Tesseract would fail silently on every
// single scan afterward, regardless of photo quality, with no obvious
// cause. They're left completely unintercepted now (normal network +
// the browser's own HTTP cache), which costs full offline OCR support
// but means a scan can't be broken by our own caching layer.
const CDN_SHELL_URLS = [
  "https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.css",
  "https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.js",
  "https://cdn.jsdelivr.net/npm/@ericblade/quagga2@1.12.1/dist/quagga.min.js",
  "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500;1,9..144,600&family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Petit+Formal+Script&display=swap"
];

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

function isKnownCDNShellUrl(requestUrl) {
  return CDN_SHELL_URLS.includes(requestUrl);
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

  // Known top-level CDN scripts/stylesheets only: cache-first, so once
  // loaded once these keep working offline. Everything else these
  // libraries fetch on their own (Tesseract's worker/wasm/language data,
  // actual font binary files, Open Food Facts API calls) is deliberately
  // left alone below — no respondWith, straight to the network.
  if (isKnownCDNShellUrl(request.url)) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const res = await fetch(request, { mode: "cors" });
        if (res && res.ok) {
          cache.put(request, res.clone());
        }
        return res;
      } catch (err) {
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
