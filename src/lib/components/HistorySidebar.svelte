<script lang="ts">
	import { HistoryStore, type HistoryEntry } from '$lib/utils/historyStore';
	import { onMount } from 'svelte';

	export let onReload: (drugInput: string, sig: string, daysSupply: number) => void;

	let history: HistoryEntry[] = [];
	let isOpen = false;
	let deletingId: string | null = null;

	function loadHistory() {
		history = HistoryStore.getAll();
	}

	function handleReload(entry: HistoryEntry) {
		onReload(entry.drugInput, entry.sig, entry.daysSupply);
		isOpen = false;
	}

	// Auto-refresh history every 2 seconds to detect new entries
	let refreshInterval: number;

	onMount(() => {
		loadHistory();
		refreshInterval = setInterval(() => {
			loadHistory();
		}, 2000);

		return () => {
			clearInterval(refreshInterval);
		};
	});

	function handleDelete(id: string) {
		deletingId = id;
		HistoryStore.delete(id);
		loadHistory();
		setTimeout(() => (deletingId = null), 300);
	}

	function handleClearAll() {
		if (confirm('Are you sure you want to clear all prescription history?')) {
			HistoryStore.clear();
			loadHistory();
		}
	}

	function formatTimestamp(timestamp: number): string {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);

		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString();
	}

	function truncate(text: string, maxLength: number): string {
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	}

</script>

<!-- Toggle Button -->
<button
	on:click={() => (isOpen = !isOpen)}
	class="fixed top-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out"
	style="background-color: var(--accent); color: var(--background); right: {isOpen ? '336px' : '16px'};"
	aria-label="Toggle history sidebar"
>
	<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		{#if isOpen}
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		{:else}
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		{/if}
	</svg>
	{#if history.length > 0 && !isOpen}
		<span
			class="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center"
			style="background-color: #ef4444; color: white;"
		>
			{history.length}
		</span>
	{/if}
</button>

<!-- Sidebar -->
<div
	class="fixed top-0 right-0 h-screen w-80 shadow-2xl transform transition-all duration-300 ease-in-out z-40 overflow-hidden flex flex-col"
	class:translate-x-0={isOpen}
	class:translate-x-full={!isOpen}
	style="background-color: var(--card-bg);"
>
	<!-- Header -->
	<div class="p-4 flex-shrink-0" style="background-color: var(--accent); color: var(--background);">
		<h2 class="text-lg font-semibold flex items-center gap-2 mb-2">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			History
		</h2>
		<p class="text-sm" style="opacity: 0.9;">
			{history.length} of {50} entries
		</p>
	</div>

	<!-- History List -->
	<div class="flex-1 overflow-y-auto p-4 space-y-3">
		{#if history.length === 0}
			<div class="text-center py-8" style="color: var(--text-muted);">
				<svg class="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				<p class="text-sm">No prescription history yet</p>
				<p class="text-xs mt-2">Calculations will appear here</p>
			</div>
		{:else}
			{#each history as entry (entry.id)}
				<div
					class="card-hover rounded-lg p-3 transition-all cursor-pointer relative group"
					class:opacity-50={deletingId === entry.id}
					style="background-color: var(--background); border: 1px solid var(--border-color);"
					on:click={() => handleReload(entry)}
					on:keydown={(e) => e.key === 'Enter' && handleReload(entry)}
					role="button"
					tabindex="0"
				>
					<!-- Delete button -->
					<button
						on:click|stopPropagation={() => handleDelete(entry.id)}
						class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded p-1"
						style="background-color: #ef4444; color: white;"
						aria-label="Delete entry"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>

					<div class="pr-8">
						<p class="font-semibold text-sm mb-1" style="color: var(--foreground);">
							{truncate(entry.result?.prescription?.drugName || entry.drugInput, 30)}
						</p>
						<p class="text-xs mb-1" style="color: var(--text-secondary);">{truncate(entry.sig, 40)}</p>
						<div class="flex justify-between items-center text-xs" style="color: var(--text-muted);">
							<span>{entry.daysSupply} days</span>
							<span class="font-medium" style="color: var(--accent);">{formatTimestamp(entry.timestamp)}</span>
						</div>
						{#if entry.result?.calculation}
							<p class="text-xs font-medium mt-1" style="color: var(--accent);">
								{entry.result.calculation.totalQuantityNeeded}
								{entry.result.calculation.unit}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<!-- Footer Actions -->
	{#if history.length > 0}
		<div class="p-4 flex-shrink-0" style="border-top: 1px solid var(--border-color);">
			<button
				on:click={handleClearAll}
				class="w-full font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
				style="background-color: rgba(239, 68, 68, 0.1); color: #ef4444;"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
				Clear All History
			</button>
		</div>
	{/if}
</div>
