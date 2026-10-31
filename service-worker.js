// Increment this version string each time you deploy changes to bust the cache
const CACHE_NAME = 'pwa-v1';

// Files to cache on install — add your app's other pages/assets here
const SHELL = [
    './',
    './install.html',
    './welcome.html',
    './manifest.json',
    './assets/js/pwa-config.js',
    './assets/js/pwa-installation.js',
    './assets/css/pwa-installation.css',
    './assets/icons/icon-192x192.png',
    './assets/icons/icon-512x512.png',
];

// Cache shell files on install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL))
    );
    self.skipWaiting();
});

// Remove old caches on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Cache-first: serve from cache, fall back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
