<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	export let onScan: (ndc: string) => void;
	export let onClose: () => void;

	let scannerElement: HTMLDivElement;
	let scanner: Html5Qrcode | null = null;
	let scanning = false;
	let error = '';
	let permissionDenied = false;
	let lastScannedCode = '';
	let scanSuccess = false;

	const SCANNER_ID = 'barcode-scanner-region';

	/**
	 * Validate and format NDC code
	 * NDC codes are 11 digits, can be formatted as:
	 * - 5-4-2 (e.g., 12345-6789-01)
	 * - 4-4-2 (e.g., 1234-5678-90)
	 * - 5-3-2 (e.g., 12345-678-90)
	 */
	function validateAndFormatNDC(code: string): string | null {
		// Remove any non-digit characters
		const cleaned = code.replace(/[^\d]/g, '');

		// NDC must be 11 digits
		if (cleaned.length === 11) {
			// Format as 5-4-2 (most common format)
			return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9, 11)}`;
		}

		// Also accept 10-digit codes (sometimes leading zero is missing)
		if (cleaned.length === 10) {
			// Add leading zero and format
			const padded = '0' + cleaned;
			return `${padded.slice(0, 5)}-${padded.slice(5, 9)}-${padded.slice(9, 11)}`;
		}

		return null;
	}

	async function startScanning() {
		if (scanner || scanning) return;

		try {
			scanning = true;
			error = '';
			permissionDenied = false;
			scanSuccess = false;

			// Initialize scanner
			scanner = new Html5Qrcode(SCANNER_ID);

			// Request camera and start scanning
			await scanner.start(
				{ facingMode: 'environment' }, // Use back camera
				{
					fps: 10, // Frames per second
					qrbox: { width: 300, height: 150 }, // Scanning box size
					aspectRatio: 2.0,
					// Support multiple barcode formats commonly used for NDCs
					formatsToSupport: [
						1, // CODE_128
						2, // CODE_39
						8 // EAN_13
					]
				},
				onScanSuccess,
				onScanFailure
			);
		} catch (err: any) {
			console.error('Scanner initialization error:', err);
			scanning = false;

			if (err.name === 'NotAllowedError' || err.message?.includes('Permission')) {
				permissionDenied = true;
				error = 'Camera permission denied. Please allow camera access to scan barcodes.';
			} else if (err.name === 'NotFoundError') {
				error = 'No camera found on this device.';
			} else {
				error = 'Failed to start camera. Please try again.';
			}
		}
	}

	function onScanSuccess(decodedText: string, decodedResult: any) {
		// Prevent duplicate scans
		if (decodedText === lastScannedCode) return;

		const formattedNDC = validateAndFormatNDC(decodedText);

		if (formattedNDC) {
			lastScannedCode = decodedText;
			scanSuccess = true;
			onScan(formattedNDC);

			// Auto-close after successful scan
			setTimeout(() => {
				stopScanning();
				onClose();
			}, 1000);
		}
	}

	function onScanFailure(errorMessage: string) {
		// Scanning failures are normal and frequent - don't show error
		// Only log for debugging if needed
		// console.debug('Scan attempt failed:', errorMessage);
	}

	async function stopScanning() {
		if (scanner && scanning) {
			try {
				await scanner.stop();
				await scanner.clear();
			} catch (err) {
				console.error('Error stopping scanner:', err);
			}
			scanner = null;
			scanning = false;
		}
	}

	function handleClose() {
		stopScanning();
		onClose();
	}

	onMount(() => {
		// Auto-start scanning when component mounts
		setTimeout(() => startScanning(), 100);
	});

	onDestroy(() => {
		stopScanning();
	});
</script>

<div
	class="fixed inset-0 flex items-center justify-center p-4"
	style="background-color: rgba(0, 0, 0, 0.9); z-index: 99999;"
>
	<div
		class="rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden"
		style="background-color: var(--card-bg);"
	>
		<!-- Header -->
		<div class="flex items-center justify-between p-6" style="border-bottom: 1px solid var(--border-color);">
			<div class="flex items-center gap-3">
				<svg class="w-8 h-8" style="color: var(--accent);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
				</svg>
				<div>
					<h3 class="text-2xl font-bold" style="color: var(--foreground);">Scan NDC Barcode</h3>
					<p class="text-sm mt-1" style="color: var(--text-secondary);">
						Position the barcode within the frame
					</p>
				</div>
			</div>
			<button
				on:click={handleClose}
				class="p-2 rounded-lg transition-colors"
				style="color: var(--text-secondary);"
				title="Close scanner"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Scanner Area -->
		<div class="p-6">
			{#if scanSuccess}
				<div class="rounded-lg p-8 text-center" style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3);">
					<svg class="w-16 h-16 mx-auto mb-4" style="color: #10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p class="text-xl font-semibold" style="color: #10b981;">Barcode Scanned!</p>
					<p class="text-sm mt-2" style="color: var(--text-secondary);">Processing NDC information...</p>
				</div>
			{:else if permissionDenied}
				<div class="rounded-lg p-8 text-center" style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);">
					<svg class="w-16 h-16 mx-auto mb-4" style="color: #ef4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<p class="text-lg font-semibold mb-2" style="color: #ef4444;">Camera Permission Required</p>
					<p class="text-sm" style="color: var(--text-secondary);">
						Please allow camera access in your browser settings to use the barcode scanner.
					</p>
					<button
						on:click={startScanning}
						class="btn-primary mt-4 px-6 py-2 rounded-lg"
					>
						Try Again
					</button>
				</div>
			{:else if error}
				<div class="rounded-lg p-8 text-center" style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);">
					<svg class="w-16 h-16 mx-auto mb-4" style="color: #ef4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p class="text-lg font-semibold mb-2" style="color: #ef4444;">Scanner Error</p>
					<p class="text-sm" style="color: var(--text-secondary);">{error}</p>
					<button
						on:click={startScanning}
						class="btn-primary mt-4 px-6 py-2 rounded-lg"
					>
						Retry
					</button>
				</div>
			{:else}
				<!-- Scanner viewport -->
				<div id={SCANNER_ID} bind:this={scannerElement} class="rounded-lg overflow-hidden"></div>

				{#if scanning}
					<div class="mt-4 rounded-lg p-4" style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3);">
						<div class="flex items-center gap-3">
							<div class="animate-pulse">
								<svg class="w-6 h-6" style="color: #3b82f6;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
							</div>
							<div class="flex-1">
								<p class="text-sm font-semibold" style="color: #3b82f6;">Scanning for barcodes...</p>
								<p class="text-xs mt-1" style="color: var(--text-secondary);">
									NDC barcodes are typically 11 digits
								</p>
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>

		<!-- Footer -->
		<div class="p-6 flex justify-end gap-3" style="border-top: 1px solid var(--border-color); background-color: var(--background);">
			<button
				on:click={handleClose}
				class="px-6 py-2 rounded-lg transition-colors"
				style="background-color: var(--border-color); color: var(--foreground);"
			>
				Cancel
			</button>
		</div>
	</div>
</div>

<style>
	:global(#barcode-scanner-region) {
		width: 100%;
		min-height: 300px;
	}

	:global(#barcode-scanner-region video) {
		width: 100% !important;
		border-radius: 0.5rem;
	}

	:global(#barcode-scanner-region canvas) {
		display: none !important;
	}
</style>
