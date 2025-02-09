const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/loco_sound.mp3"
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate: Delete Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Serve Cached Content When Offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || new Response("Offline content not available", { status: 404 });
    })
  );
});
