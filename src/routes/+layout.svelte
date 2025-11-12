<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { autoLoadDemoData } from '$lib/utils/autoLoadDemoData';
	import '../app.css';

	// Register service worker for PWA support
	onMount(() => {
		// Auto-load demo data if in production with flag enabled
		autoLoadDemoData();
		if (browser && 'serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/service-worker.js')
				.then((registration) => {
					console.log('Service Worker registered successfully:', registration.scope);

					// Check for updates
					registration.addEventListener('updatefound', () => {
						const newWorker = registration.installing;
						if (newWorker) {
							newWorker.addEventListener('statechange', () => {
								if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
									// New service worker available
									console.log('New service worker available');
									// Optionally prompt user to reload
									if (confirm('A new version is available. Reload to update?')) {
										newWorker.postMessage({ type: 'SKIP_WAITING' });
										window.location.reload();
									}
								}
							});
						}
					});
				})
				.catch((error) => {
					console.error('Service Worker registration failed:', error);
				});

			// Handle service worker updates
			let refreshing = false;
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (!refreshing) {
					refreshing = true;
					window.location.reload();
				}
			});
		}
	});
</script>

<slot />
