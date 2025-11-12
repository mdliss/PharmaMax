<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeDemoData, clearDemoData, resetDemoData, isDemoDataInitialized } from '$lib/utils/initializeDemoData';

	let isInitialized = false;
	let showManager = false;
	let loading = false;

	onMount(() => {
		isInitialized = isDemoDataInitialized();
	});

	async function handleInitialize() {
		loading = true;
		try {
			initializeDemoData();
			isInitialized = true;
			showManager = false;
			// Reload page to show new data
			window.location.reload();
		} catch (error) {
			console.error('Failed to initialize demo data:', error);
			alert('Failed to initialize demo data. Check console for details.');
		} finally {
			loading = false;
		}
	}

	async function handleClear() {
		if (!confirm('Clear all demo data? This will remove all patients, prescriptions, and inventory.')) {
			return;
		}

		loading = true;
		try {
			clearDemoData();
			isInitialized = false;
			window.location.reload();
		} catch (error) {
			console.error('Failed to clear demo data:', error);
			alert('Failed to clear demo data. Check console for details.');
		} finally {
			loading = false;
		}
	}

	async function handleReset() {
		if (!confirm('Reset demo data? This will clear and reload all demo data.')) {
			return;
		}

		loading = true;
		try {
			resetDemoData();
			window.location.reload();
		} catch (error) {
			console.error('Failed to reset demo data:', error);
			alert('Failed to reset demo data. Check console for details.');
		} finally {
			loading = false;
		}
	}
</script>

<!-- Demo Data Toggle Button -->
<button
	on:click={() => (showManager = !showManager)}
	class="fixed bottom-4 left-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300"
	style="background-color: {isInitialized ? 'var(--accent)' : '#f59e0b'}; color: var(--background);"
	title="Demo Data Manager"
>
	<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
		/>
	</svg>
	{#if isInitialized}
		<span
			class="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center"
			style="background-color: #10b981; color: white;"
			title="Demo data loaded"
		>
			✓
		</span>
	{/if}
</button>

<!-- Demo Data Manager Panel -->
{#if showManager}
	<div
		class="fixed bottom-20 left-4 z-50 rounded-lg shadow-2xl p-6 max-w-md"
		style="background-color: var(--card-bg); border: 2px solid var(--border-color);"
	>
		<h3 class="text-lg font-semibold mb-4 flex items-center gap-2" style="color: var(--foreground);">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
				/>
			</svg>
			Demo Data Manager
		</h3>

		<div class="space-y-4">
			<!-- Status -->
			<div
				class="p-3 rounded-lg"
				style="background-color: {isInitialized ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'};"
			>
				<p class="text-sm font-medium" style="color: {isInitialized ? 'var(--accent)' : '#f59e0b'};">
					{#if isInitialized}
						✓ Demo data is loaded
					{:else}
						⚠ No demo data loaded
					{/if}
				</p>
			</div>

			<!-- Info -->
			<div class="text-sm space-y-2" style="color: var(--text-secondary);">
				<p><strong>What is demo data?</strong></p>
				<p>Synthetic data that populates PharmaMax with:</p>
				<ul class="list-disc list-inside space-y-1 ml-2">
					<li>60 realistic patient profiles</li>
					<li>223 prescription history entries</li>
					<li>158 inventory items (NDCs)</li>
					<li>Edge cases (allergies, interactions, etc.)</li>
				</ul>
			</div>

			<!-- Actions -->
			<div class="space-y-2">
				{#if !isInitialized}
					<button
						on:click={handleInitialize}
						disabled={loading}
						class="w-full py-2 px-4 rounded-lg font-medium transition-colors"
						style="background-color: var(--accent); color: var(--background);"
					>
						{loading ? '⏳ Loading...' : '🚀 Load Demo Data'}
					</button>
				{:else}
					<button
						on:click={handleReset}
						disabled={loading}
						class="w-full py-2 px-4 rounded-lg font-medium transition-colors"
						style="background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b;"
					>
						{loading ? '⏳ Resetting...' : '🔄 Reset Demo Data'}
					</button>
					<button
						on:click={handleClear}
						disabled={loading}
						class="w-full py-2 px-4 rounded-lg font-medium transition-colors"
						style="background-color: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444;"
					>
						{loading ? '⏳ Clearing...' : '🗑️ Clear Demo Data'}
					</button>
				{/if}

				<button
					on:click={() => (showManager = false)}
					class="w-full py-2 px-4 rounded-lg font-medium transition-colors"
					style="background-color: var(--border-color); color: var(--foreground);"
				>
					Close
				</button>
			</div>

			<!-- Warning -->
			<div class="text-xs p-2 rounded" style="background-color: rgba(245, 158, 11, 0.1); color: #f59e0b;">
				<strong>Note:</strong> Demo data is stored in browser localStorage. Clearing browser data will remove it.
			</div>
		</div>
	</div>
{/if}
