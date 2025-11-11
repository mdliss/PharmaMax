<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import ResultsDisplay from '$lib/components/ResultsDisplay.svelte';
	import HistorySidebar from '$lib/components/HistorySidebar.svelte';
	import BatchProcessor from '$lib/components/BatchProcessor.svelte';
	import { HistoryStore } from '$lib/utils/historyStore';

	let activeTab: 'single' | 'batch' = 'single';
	let drugInput = '';
	let sig = '';
	let daysSupply = 30;
	let loading = false;
	let error = '';
	let result: any = null;
	let historySaveError = '';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		loading = true;
		error = '';
		result = null;
		historySaveError = '';

		try {
			// First, normalize the drug name
			const normalizeResponse = await fetch('/api/normalize', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ input: drugInput })
			});

			const normalizeData = await normalizeResponse.json();

			if (!normalizeData.success) {
				throw new Error(normalizeData.error || 'Failed to normalize drug name');
			}

			// Then, calculate the quantity
			const calculateResponse = await fetch('/api/calculate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rxcui: normalizeData.rxcui,
					drugName: normalizeData.drugName,
					sig,
					daysSupply
				})
			});

			const calculateData = await calculateResponse.json();

			if (!calculateData.success) {
				throw new Error(calculateData.error || 'Failed to calculate quantity');
			}

			result = calculateData;

			// Save to history (only in browser environment)
			if (typeof window !== 'undefined') {
				const saved = HistoryStore.save(drugInput, sig, daysSupply, calculateData);
				if (!saved) {
					historySaveError = 'Unable to save to history. Storage may be full.';
				}
			}
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	function handleReload(reloadDrugInput: string, reloadSig: string, reloadDaysSupply: number) {
		drugInput = reloadDrugInput;
		sig = reloadSig;
		daysSupply = reloadDaysSupply;
		// Scroll to top to show the form
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="min-h-screen" style="background-color: var(--background);">
	<!-- History Sidebar -->
	<HistorySidebar onReload={handleReload} />

	<div class="container mx-auto px-4 py-8 max-w-4xl">
		<!-- Header -->
		<div class="text-center mb-8 drop-in-1">
			<h1 class="text-4xl font-bold mb-2" style="color: var(--accent);">PharmaMax</h1>
			<p class="text-lg" style="color: var(--text-secondary);">NDC Packaging & Quantity Calculator</p>
			<p class="text-sm mt-1" style="color: var(--text-muted);">AI-Accelerated Prescription Fulfillment Tool</p>
		</div>

		<!-- Tab Navigation -->
		<div class="rounded-t-lg shadow-lg overflow-hidden mb-0 drop-in-2" style="background-color: var(--card-bg);">
			<div class="flex" style="border-bottom: 1px solid var(--border-color);">
				<button
					on:click={() => activeTab = 'single'}
					class="flex-1 px-6 py-4 text-sm font-medium transition"
					style="{activeTab === 'single'
						? `background-color: var(--card-bg); color: var(--accent); border-bottom: 2px solid var(--accent);`
						: `background-color: var(--background); color: var(--text-secondary);`}"
				>
					Single Prescription
				</button>
				<button
					on:click={() => activeTab = 'batch'}
					class="flex-1 px-6 py-4 text-sm font-medium transition"
					style="{activeTab === 'batch'
						? `background-color: var(--card-bg); color: var(--accent); border-bottom: 2px solid var(--accent);`
						: `background-color: var(--background); color: var(--text-secondary);`}"
				>
					Batch Processing
				</button>
			</div>
		</div>

		{#if activeTab === 'single'}
		<!-- Main Calculator Card -->
		<div class="card-hover rounded-lg shadow-lg p-8 mb-8 drop-in-3" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
			<h2 class="text-2xl font-semibold mb-6" style="color: var(--foreground);">Calculate Prescription Quantity</h2>

			<form on:submit={handleSubmit} class="space-y-6">
				<!-- Drug Name/NDC Input -->
				<div>
					<label for="drugInput" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
						Drug Name or NDC
					</label>
					<input
						id="drugInput"
						type="text"
						bind:value={drugInput}
						required
						placeholder="e.g., Lisinopril 10mg or 00093-1234-01"
						class="input-text w-full px-4 py-3 rounded-lg transition"
					/>
					<p class="mt-1 text-sm" style="color: var(--text-muted);">Enter a drug name or 11-digit NDC code</p>
				</div>

				<!-- SIG Input -->
				<div>
					<label for="sig" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
						SIG (Prescription Instructions)
					</label>
					<input
						id="sig"
						type="text"
						bind:value={sig}
						required
						placeholder="e.g., Take 2 tablets by mouth twice daily"
						class="input-text w-full px-4 py-3 rounded-lg transition"
					/>
					<p class="mt-1 text-sm" style="color: var(--text-muted);">Enter prescription directions (supports common abbreviations)</p>
				</div>

				<!-- Days' Supply Input -->
				<div>
					<label for="daysSupply" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
						Days' Supply
					</label>
					<input
						id="daysSupply"
						type="number"
						bind:value={daysSupply}
						required
						min="1"
						max="365"
						class="input-text w-full px-4 py-3 rounded-lg transition"
					/>
					<p class="mt-1 text-sm" style="color: var(--text-muted);">Number of days the prescription should last</p>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={loading}
					class="btn-primary w-full font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
				>
					{#if loading}
						<svg class="animate-spin -ml-1 mr-3 h-5 w-5" style="color: var(--background);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Calculating...
					{:else}
						Calculate Quantity
					{/if}
				</button>
			</form>

			<!-- Error Display -->
			{#if error}
				<div class="mt-6 rounded-lg p-4 state-error">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5" style="color: var(--accent);" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium">Error</h3>
							<p class="mt-1 text-sm">{error}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- History Save Warning -->
			{#if historySaveError}
				<div class="mt-4 rounded-lg p-4" style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5" style="color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium" style="color: #f59e0b;">Warning</h3>
							<p class="mt-1 text-sm" style="color: var(--text-secondary);">{historySaveError}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Results Display -->
			{#if result}
				<div class="mt-6">
					<ResultsDisplay {result} />
				</div>
			{/if}
		</div>
		{:else}
		<!-- Batch Processing -->
		<BatchProcessor />
		{/if}

		<!-- Info Section -->
		<div class="rounded-lg p-6 drop-in-4" style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);">
			<h3 class="text-lg font-semibold mb-2" style="color: var(--accent);">How it works</h3>
			<ul class="space-y-2 text-sm" style="color: var(--text-secondary);">
				<li class="flex items-start">
					<span class="mr-2">1.</span>
					<span>Enter a drug name or NDC code to identify the medication</span>
				</li>
				<li class="flex items-start">
					<span class="mr-2">2.</span>
					<span>Provide the prescription instructions (SIG) for AI-powered parsing</span>
				</li>
				<li class="flex items-start">
					<span class="mr-2">3.</span>
					<span>Specify the days' supply to calculate total quantity needed</span>
				</li>
				<li class="flex items-start">
					<span class="mr-2">4.</span>
					<span>Get optimal NDC recommendations and package combinations</span>
				</li>
			</ul>
		</div>
	</div>
</div>
