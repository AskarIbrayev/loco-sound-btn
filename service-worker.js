const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
  "/loco-sound-btn/index.html",
  "/loco-sound-btn/loco_sound.mp3"
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
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
