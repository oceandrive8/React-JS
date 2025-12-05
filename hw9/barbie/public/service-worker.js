const CACHE_NAME = "app-shell-v1";
const API_CACHE = "api-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/static/js/bundle.js",
  "/static/js/main.*.js",
  "/static/css/main.*.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (![CACHE_NAME, API_CACHE].includes(key)) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const { request } = event;

  
  if (request.method !== "GET") return;

  const url = new URL(request.url);


  if (url.origin === "https://your-public-api.com") {
    event.respondWith(
      caches.open(API_CACHE).then(async cache => {
        try {
          const response = await fetch(request);
          if (response.status === 200) cache.put(request, response.clone());
          return response;
        } catch (err) {
          const cached = await caches.match(request);
          return cached || new Response(JSON.stringify({ error: "Offline" }), { headers: { "Content-Type": "application/json" }});
        }
      })
    );
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then(cached => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});


