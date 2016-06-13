// v1.0

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pomodoro').then(cache => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/index.html',
        '/styles/main.css',
        '/assets/pomodoro_256.png',
        '/assets/alarm.mp3'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
