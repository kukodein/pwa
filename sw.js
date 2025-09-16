var cacheName = "pwa-hybrid-v1";
var filesToCache = [
	"/",
	"index.html",
	"offline.html",
	"manifest.json",
	"app.js",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
	self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});

// const CACHE_NAME = "pwa-hybrid-v1";
// const urlsToCache = [
// 	"index.html",
// 	"offline.html",
// 	"manifest.json",
// 	"app.js",
// 	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
// 	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
// ];

// // Install → cache asset
// self.addEventListener("install", event => {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
// 	);
// });

// // Activate → bersihkan cache lama
// self.addEventListener("activate", event => {
// 	event.waitUntil(
// 		caches.keys().then(keys =>
// 			Promise.all(keys.map(key => {
// 				if (key !== CACHE_NAME) return caches.delete(key);
// 			}))
// 		)
// 	);
// });

// // Fetch → Offline-first untuk asset
// self.addEventListener("fetch", event => {
// 	if (event.request.mode === "navigate") {
// 		// Untuk halaman utama → offline fallback
// 		event.respondWith(
// 			fetch(event.request).catch(() => caches.match("offline.html"))
// 		);
// 	} else {
// 		// Untuk asset lain → cache-first
// 		event.respondWith(
// 			caches.match(event.request).then(response => {
// 				return response || fetch(event.request);
// 			})
// 		);
// 	}
// });
