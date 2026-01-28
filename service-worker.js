const CACHE_NAME = 'mahmoud-portfolio-admin-v100';
const ASSETS = [
    '/dashboard.html',
    '/logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/dashboard.html')
    );
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'New Alert', body: 'New data received.' };

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/logo.png',
            badge: '/logo.png',
            vibrate: [300, 100, 300]
        })
    );
});

