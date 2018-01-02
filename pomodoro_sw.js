// v1.5

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pomodoro').then(cache => {
      return cache.addAll([
        '',
        'manifest.json',
        'index.html',
        'scripts/main.js',
        'styles/main.css',
        'assets/fonts/gotham-medium.woff',
        'assets/images/pomodoro_144.png',
        'assets/images/pomodoro_256.png',
        'assets/images/pomodoro_512.png',
        'assets/images/volume_on.svg',
        'assets/images/volume_muted.svg',
        'assets/media/alarm.mp3'
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
