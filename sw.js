// Milky service worker: lets Scramjet answer requests under the proxy prefix.
importScripts("scram/working-ctrl.sw.js");

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if ($scramjetController.shouldRoute(event)) return $scramjetController.route(event);
      return fetch(event.request);
    })()
  );
});
