<script lang="ts">
	import { onMount } from 'svelte';
	import { HistoryStore } from '$lib/utils/historyStore';
	import BarcodeScanner from './BarcodeScanner.svelte';

	export let value = '';
	export let placeholder = 'e.g., Lisinopril 10mg or 00093-1234-01';
	export let required = false;
	export let disabled = false;
	export let inputElement: HTMLInputElement | undefined = undefined;

	let suggestions: any[] = [];
	let showSuggestions = false;
	let loading = false;
	let selectedIndex = -1;
	let debounceTimer: ReturnType<typeof setTimeout>;
	let internalInputElement: HTMLInputElement;
	let recentDrugs: string[] = [];
	let showScanner = false;

	// Expose the input element to parent
	$: if (internalInputElement) {
		inputElement = internalInputElement;
	}

	onMount(() => {
		// Load recent drugs from history
		if (typeof window !== 'undefined') {
			const history = HistoryStore.getAll();
			const uniqueDrugs = [...new Set(history.map(h => h.drugInput).filter(Boolean))].slice(0, 5);
			recentDrugs = uniqueDrugs;
		}
	});

	async function fetchSuggestions(query: string) {
		if (query.length < 2) {
			suggestions = [];
			return;
		}

		loading = true;
		try {
			const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`);
			const data = await response.json();

			if (data.success && data.suggestions) {
				suggestions = data.suggestions;
			} else {
				suggestions = [];
			}
		} catch (error) {
			console.error('Autocomplete error:', error);
			suggestions = [];
		} finally {
			loading = false;
		}
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		selectedIndex = -1;

		// Clear existing timer
		clearTimeout(debounceTimer);

		// Show recent drugs if input is empty
		if (!value.trim()) {
			suggestions = [];
			showSuggestions = recentDrugs.length > 0;
			return;
		}

		// Debounce API calls (300ms)
		debounceTimer = setTimeout(() => {
			fetchSuggestions(value);
			showSuggestions = true;
		}, 300);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!showSuggestions) return;

		const displaySuggestions = value.trim() ? suggestions : recentDrugs.map(drug => ({ name: drug }));

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, displaySuggestions.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (event.key === 'Enter' && selectedIndex >= 0) {
			event.preventDefault();
			selectSuggestion(displaySuggestions[selectedIndex]);
		} else if (event.key === 'Escape') {
			showSuggestions = false;
			selectedIndex = -1;
		}
	}

	function selectSuggestion(suggestion: any) {
		value = suggestion.name || suggestion;
		showSuggestions = false;
		selectedIndex = -1;
		suggestions = [];

		// Trigger input event so parent components can react
		if (internalInputElement) {
			internalInputElement.dispatchEvent(new Event('change', { bubbles: true }));
		}
	}

	function handleFocus() {
		if (!value.trim() && recentDrugs.length > 0) {
			showSuggestions = true;
		} else if (value.trim() && suggestions.length > 0) {
			showSuggestions = true;
		}
	}

	function handleBlur() {
		// Delay hiding to allow click on suggestion
		setTimeout(() => {
			showSuggestions = false;
			selectedIndex = -1;
		}, 200);
	}

	function handleScan(ndc: string) {
		// Set the scanned NDC as the value
		value = ndc;
		showScanner = false;

		// Trigger change event
		if (internalInputElement) {
			internalInputElement.dispatchEvent(new Event('change', { bubbles: true }));
		}
	}

	function openScanner() {
		showScanner = true;
	}

	function closeScanner() {
		showScanner = false;
	}
</script>

<div class="relative">
	<input
		bind:this={internalInputElement}
		type="text"
		bind:value
		on:input={handleInput}
		on:keydown={handleKeyDown}
		on:focus={handleFocus}
		on:blur={handleBlur}
		{placeholder}
		{required}
		{disabled}
		class="input-text w-full px-4 py-3 rounded-lg transition"
		style="padding-right: 3rem;"
		autocomplete="off"
		role="combobox"
		aria-expanded={showSuggestions}
		aria-autocomplete="list"
		aria-controls="autocomplete-suggestions"
	/>

	<!-- Barcode Scanner Button -->
	<div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
		{#if loading}
			<svg
				class="animate-spin h-5 w-5"
				style="color: var(--accent);"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{:else}
			<button
				type="button"
				on:click={openScanner}
				class="p-1.5 rounded-lg transition-colors hover:bg-opacity-10"
				style="color: var(--accent);"
				title="Scan NDC barcode"
				{disabled}
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
				</svg>
			</button>
		{/if}
	</div>

	{#if showSuggestions}
		<div
			id="autocomplete-suggestions"
			class="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden"
			style="background-color: var(--card-bg); border: 1px solid var(--border-color); max-height: 320px; overflow-y: auto;"
			role="listbox"
		>
			{#if value.trim()}
				<!-- API suggestions -->
				{#if suggestions.length > 0}
					{#each suggestions as suggestion, index}
						<button
							type="button"
							class="w-full text-left px-4 py-3 transition-colors cursor-pointer"
							style="{selectedIndex === index
								? `background-color: rgba(16, 185, 129, 0.1);`
								: ''} border-bottom: 1px solid var(--border-color);"
							on:click={() => selectSuggestion(suggestion)}
							on:mouseenter={() => (selectedIndex = index)}
							role="option"
							aria-selected={selectedIndex === index}
						>
							<div class="font-medium" style="color: var(--foreground);">
								{suggestion.name}
							</div>
							{#if suggestion.synonym && suggestion.synonym !== suggestion.name}
								<div class="text-sm mt-1" style="color: var(--text-muted);">
									Also known as: {suggestion.synonym}
								</div>
							{/if}
						</button>
					{/each}
				{:else if !loading}
					<div class="px-4 py-3" style="color: var(--text-secondary);">
						No suggestions found
					</div>
				{/if}
			{:else if recentDrugs.length > 0}
				<!-- Recent drugs -->
				<div class="px-4 py-2" style="background-color: var(--background); border-bottom: 1px solid var(--border-color);">
					<span class="text-xs font-semibold" style="color: var(--text-muted);">RECENT DRUGS</span>
				</div>
				{#each recentDrugs as drug, index}
					<button
						type="button"
						class="w-full text-left px-4 py-3 transition-colors cursor-pointer flex items-center gap-2"
						style="{selectedIndex === index
							? `background-color: rgba(16, 185, 129, 0.1);`
							: ''} border-bottom: 1px solid var(--border-color);"
						on:click={() => selectSuggestion(drug)}
						on:mouseenter={() => (selectedIndex = index)}
						role="option"
						aria-selected={selectedIndex === index}
					>
						<svg class="w-4 h-4 flex-shrink-0" style="color: var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div class="font-medium" style="color: var(--foreground);">
							{drug}
						</div>
					</button>
				{/each}
			{/if}
		</div>
	{/if}

	<!-- Barcode Scanner Modal -->
	{#if showScanner}
		<BarcodeScanner onScan={handleScan} onClose={closeScanner} />
	{/if}
</div>
