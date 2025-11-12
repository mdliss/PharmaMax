/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

// Files to precache (SvelteKit build outputs and static files)
const ASSETS = [
	...build, // App build files
	...files  // Static files
];

// Install event - precache all assets
self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		const keys = await caches.keys();
		for (const key of keys) {
			if (key !== CACHE) {
				await caches.delete(key);
			}
		}
	}

	event.waitUntil(deleteOldCaches());
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
	// Ignore non-GET requests
	if (event.request.method !== 'GET') return;

	// Ignore requests to external APIs (like RxNorm)
	const url = new URL(event.request.url);
	if (!url.origin.startsWith(self.location.origin)) {
		// For external APIs, try network first, no cache
		return;
	}

	async function respond() {
		const cache = await caches.open(CACHE);

		// Try cache first for app assets
		if (ASSETS.includes(url.pathname)) {
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) {
				return cachedResponse;
			}
		}

		// For navigation requests and API routes, try network first
		try {
			const response = await fetch(event.request);

			// Cache successful responses for future offline use
			if (response.ok && response.status === 200) {
				const shouldCache =
					url.pathname.startsWith('/') &&
					!url.pathname.includes('/api/') &&
					!url.searchParams.toString();

				if (shouldCache) {
					cache.put(event.request, response.clone());
				}
			}

			return response;
		} catch (err) {
			// If network fails, try to serve from cache
			const cachedResponse = await cache.match(event.request);

			if (cachedResponse) {
				return cachedResponse;
			}

			// Return a basic offline page for navigation requests
			if (event.request.mode === 'navigate') {
				const offlineResponse = await cache.match('/');
				if (offlineResponse) {
					return offlineResponse;
				}
			}

			// If all else fails, throw the error
			throw err;
		}
	}

	event.respondWith(respond());
});

// Message event - handle messages from the app
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
