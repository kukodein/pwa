// Install service worker
self.addEventListener('install', function(event) {
	event.waitUntil(
	caches.open('app-cache').then(function(cache) {
		return cache.addAll([
			// '/',
			'index.html',
			'style.css',
			'script.js',
			'image/icon/icon-72.png',
			'image/icon/icon-96.png',
			'image/icon/icon-144.png',
			'image/icon/icon-192.png',
			'image/icon/icon-512.png'
		]);
	})
	);
});

// Intercept network requests
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
