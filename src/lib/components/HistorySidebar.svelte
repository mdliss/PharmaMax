<script lang="ts">
	import { HistoryStore, type HistoryEntry } from '$lib/utils/historyStore';
	import { exportHistoryToCSV } from '$lib/utils/exportUtils';
	import { onMount } from 'svelte';

	export let onReload: (drugInput: string, sig: string, daysSupply: number) => void;

	let history: HistoryEntry[] = [];
	let filteredHistory: HistoryEntry[] = [];
	let isOpen = false;
	let deletingId: string | null = null;
	let searchQuery = '';
	let filterFavorites = false;
	let selectedIds: Set<string> = new Set();
	let bulkMode = false;
	let quickEditEntry: HistoryEntry | null = null;
	let quickEditDays = 30;

	function loadHistory() {
		history = HistoryStore.getAll();
		applyFilters();
	}

	function applyFilters() {
		let result = [...history];

		// Search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				entry =>
					entry.drugInput.toLowerCase().includes(query) ||
					entry.sig.toLowerCase().includes(query) ||
					entry.result?.prescription?.drugName?.toLowerCase().includes(query)
			);
		}

		// Favorites filter
		if (filterFavorites) {
			result = result.filter(entry => entry.isFavorite);
		}

		filteredHistory = result;
	}

	function handleReload(entry: HistoryEntry) {
		if (bulkMode) return; // Don't reload in bulk mode
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

	function exportToCSV() {
		exportHistoryToCSV(filteredHistory);
	}

	function toggleFavorite(id: string, event: Event) {
		event.stopPropagation();
		HistoryStore.toggleFavorite(id);
		loadHistory();
	}

	function toggleSelection(id: string) {
		if (selectedIds.has(id)) {
			selectedIds.delete(id);
		} else {
			selectedIds.add(id);
		}
		selectedIds = selectedIds; // Trigger reactivity
	}

	function selectAll() {
		filteredHistory.forEach(entry => selectedIds.add(entry.id));
		selectedIds = selectedIds;
	}

	function deselectAll() {
		selectedIds.clear();
		selectedIds = selectedIds;
	}

	function bulkDeleteSelected() {
		if (selectedIds.size === 0) return;
		if (confirm(`Delete ${selectedIds.size} selected entries?`)) {
			HistoryStore.bulkDelete(Array.from(selectedIds));
			selectedIds.clear();
			selectedIds = selectedIds;
			loadHistory();
			bulkMode = false;
		}
	}

	function startQuickEdit(entry: HistoryEntry, event: Event) {
		event.stopPropagation();
		quickEditEntry = entry;
		quickEditDays = entry.daysSupply;
	}

	function saveQuickEdit() {
		if (quickEditEntry && quickEditDays > 0) {
			HistoryStore.update(quickEditEntry.id, { daysSupply: quickEditDays });
			loadHistory();
			quickEditEntry = null;
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

	$: {
		searchQuery;
		filterFavorites;
		applyFilters();
	}
</script>

<!-- Toggle Button -->
<button
	on:click={() => (isOpen = !isOpen)}
	class="fixed top-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out"
	style="background-color: var(--accent); color: var(--background); right: {isOpen ? '336px' : '16px'};"
	aria-label="Toggle history sidebar"
	data-history-toggle
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
			{filteredHistory.length} of {history.length} entries
		</p>
	</div>

	<!-- Search and Filters -->
	<div class="p-4 space-y-2 flex-shrink-0" style="border-bottom: 1px solid var(--border-color);">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search by drug or SIG..."
			class="w-full px-3 py-2 rounded text-sm"
			style="background-color: var(--background); color: var(--foreground); border: 1px solid var(--border-color);"
		/>
		<div class="flex gap-2 items-center">
			<label class="flex items-center gap-2 text-sm cursor-pointer" style="color: var(--foreground);">
				<input type="checkbox" bind:checked={filterFavorites} class="rounded" />
				<span>Favorites only</span>
			</label>
			<button
				on:click={() => (bulkMode = !bulkMode)}
				class="ml-auto text-xs px-2 py-1 rounded"
				style="{bulkMode
					? 'background-color: var(--accent); color: var(--background);'
					: 'background-color: var(--border-color); color: var(--foreground);'}"
			>
				{bulkMode ? 'Cancel' : 'Select'}
			</button>
		</div>
	</div>

	<!-- Bulk Actions Bar -->
	{#if bulkMode && selectedIds.size > 0}
		<div class="p-3 flex items-center gap-2 flex-shrink-0" style="background-color: rgba(16, 185, 129, 0.1); border-bottom: 1px solid rgba(16, 185, 129, 0.3);">
			<span class="text-sm font-medium flex-1" style="color: var(--accent);">
				{selectedIds.size} selected
			</span>
			<button
				on:click={deselectAll}
				class="text-xs px-2 py-1 rounded"
				style="background-color: var(--border-color); color: var(--foreground);"
			>
				Clear
			</button>
			<button
				on:click={bulkDeleteSelected}
				class="text-xs px-2 py-1 rounded"
				style="background-color: #ef4444; color: white;"
			>
				Delete
			</button>
		</div>
	{/if}

	<!-- History List -->
	<div class="flex-1 overflow-y-auto p-4 space-y-3">
		{#if filteredHistory.length === 0}
			<div class="text-center py-8" style="color: var(--text-muted);">
				<svg class="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				<p class="text-sm">{searchQuery || filterFavorites ? 'No matching entries' : 'No prescription history yet'}</p>
				<p class="text-xs mt-2">{searchQuery || filterFavorites ? 'Try adjusting your filters' : 'Calculations will appear here'}</p>
			</div>
		{:else}
			{#each filteredHistory as entry (entry.id)}
				<div
					class="card-hover rounded-lg p-3 transition-all relative group"
					class:opacity-50={deletingId === entry.id}
					class:cursor-pointer={!bulkMode}
					style="background-color: var(--background); border: 1px solid var(--border-color);"
					on:click={() => !bulkMode && handleReload(entry)}
					on:keydown={(e) => e.key === 'Enter' && !bulkMode && handleReload(entry)}
					role="button"
					tabindex="0"
				>
					<!-- Bulk Select Checkbox -->
					{#if bulkMode}
						<input
							type="checkbox"
							checked={selectedIds.has(entry.id)}
							on:click|stopPropagation={() => toggleSelection(entry.id)}
							class="absolute top-3 left-3"
						/>
					{/if}

					<!-- Favorite Star -->
					<button
						on:click={(e) => toggleFavorite(entry.id, e)}
						class="absolute top-2 right-10 transition-opacity"
						style="color: {entry.isFavorite ? '#fbbf24' : 'var(--text-muted)'};"
						aria-label="Toggle favorite"
					>
						<svg class="w-5 h-5" fill={entry.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
						</svg>
					</button>

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

					<div class="{bulkMode ? 'pl-8' : ''} pr-16">
						<p class="font-semibold text-sm mb-1" style="color: var(--foreground);">
							{truncate(entry.result?.prescription?.drugName || entry.drugInput, 25)}
						</p>
						<p class="text-xs mb-1" style="color: var(--text-secondary);">{truncate(entry.sig, 35)}</p>
						<div class="flex justify-between items-center text-xs" style="color: var(--text-muted);">
							<button
								on:click={(e) => startQuickEdit(entry, e)}
								class="hover:underline"
								style="color: var(--accent);"
							>
								{entry.daysSupply} days
							</button>
							<span class="font-medium">{formatTimestamp(entry.timestamp)}</span>
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
		<div class="p-4 flex-shrink-0 space-y-2" style="border-top: 1px solid var(--border-color);">
			<button
				on:click={exportToCSV}
				class="w-full font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
				style="background-color: rgba(16, 185, 129, 0.1); color: var(--accent);"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				Export to CSV
			</button>
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

<!-- Quick Edit Modal -->
{#if quickEditEntry}
	<div
		class="fixed inset-0 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.7); z-index: 99999;"
		on:click={() => (quickEditEntry = null)}
		role="dialog"
	>
		<div
			class="rounded-lg shadow-2xl max-w-md w-full p-6"
			style="background-color: var(--card-bg);"
			on:click|stopPropagation
		>
			<h3 class="text-lg font-semibold mb-4" style="color: var(--foreground);">Quick Edit Days Supply</h3>
			<p class="text-sm mb-4" style="color: var(--text-secondary);">
				{quickEditEntry.result?.prescription?.drugName || quickEditEntry.drugInput}
			</p>
			<div class="mb-4">
				<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">Days Supply</label>
				<input
					type="number"
					bind:value={quickEditDays}
					min="1"
					max="365"
					class="w-full px-4 py-2 rounded"
					style="background-color: var(--background); color: var(--foreground); border: 1px solid var(--border-color);"
				/>
			</div>
			<div class="flex gap-2">
				<button
					on:click={saveQuickEdit}
					class="flex-1 btn-primary py-2 rounded-lg"
				>
					Save
				</button>
				<button
					on:click={() => (quickEditEntry = null)}
					class="flex-1 btn-secondary py-2 rounded-lg"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}
