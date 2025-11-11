<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { SIG_TEMPLATES, FREQUENCY_TEMPLATES, DOSE_AMOUNTS, getCategories, searchTemplates } from '$lib/data/sigTemplates';
	import { CustomTemplatesStore, type CustomTemplate } from '$lib/utils/customTemplatesStore';

	let modalContainer: HTMLElement;

	export let onSelect: (template: string) => void;
	export let currentValue = '';

	let showModal = false;
	let searchQuery = '';
	let selectedCategory = 'All';
	let categories: string[] = [];
	let customTemplates: CustomTemplate[] = [];
	let filteredTemplates: any[] = [];
	let showFrequencyBuilder = false;
	let selectedDose = '1 tablet';
	let selectedFrequency = FREQUENCY_TEMPLATES[0];

	// Custom template form
	let showCustomForm = false;
	let customName = '';
	let customTemplate = '';
	let customCategory = '';

	onMount(() => {
		categories = ['All', ...getCategories(), 'Custom'];
		loadCustomTemplates();
		filterTemplates();

		// Create modal container at body level
		modalContainer = document.createElement('div');
		modalContainer.id = 'sig-modal-portal';
		modalContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 99999;';
		document.body.appendChild(modalContainer);

		return () => {
			if (modalContainer && modalContainer.parentNode) {
				modalContainer.parentNode.removeChild(modalContainer);
			}
		};
	});

	function loadCustomTemplates() {
		customTemplates = CustomTemplatesStore.getAll();
	}

	function filterTemplates() {
		let results = [];

		if (searchQuery.trim()) {
			// Search across all templates
			results = [...searchTemplates(searchQuery), ...CustomTemplatesStore.search(searchQuery)];
		} else if (selectedCategory === 'All') {
			results = SIG_TEMPLATES;
		} else if (selectedCategory === 'Custom') {
			results = customTemplates;
		} else {
			results = SIG_TEMPLATES.filter(t => t.category === selectedCategory);
		}

		filteredTemplates = results;
		console.log('Filtered templates:', filteredTemplates.length, 'Modal open:', showModal);
	}

	function selectTemplate(template: string, id?: string) {
		onSelect(template);
		if (id) {
			CustomTemplatesStore.incrementUsage(id);
		}
		showModal = false;
		searchQuery = '';
	}

	function quickFillFrequency(freq: typeof FREQUENCY_TEMPLATES[0]) {
		const sig = freq.template.replace('{dose}', selectedDose);
		onSelect(sig);
	}

	function buildCustomFrequency() {
		const sig = selectedFrequency.template.replace('{dose}', selectedDose);
		onSelect(sig);
		showFrequencyBuilder = false;
	}

	function saveCustomTemplate() {
		if (!customName.trim() || !customTemplate.trim()) {
			alert('Please enter both name and template');
			return;
		}

		if (CustomTemplatesStore.isDuplicate(customTemplate)) {
			alert('A template with this SIG already exists');
			return;
		}

		const success = CustomTemplatesStore.save({
			name: customName,
			template: customTemplate,
			category: customCategory || 'Custom',
			tags: []
		});

		if (success) {
			loadCustomTemplates();
			customName = '';
			customTemplate = '';
			customCategory = '';
			showCustomForm = false;
			filterTemplates();
		}
	}

	$: {
		searchQuery;
		selectedCategory;
		filterTemplates();
	}
</script>

<!-- Quick-fill Frequency Buttons -->
<div class="mb-4 flex flex-wrap gap-2">
	{#each FREQUENCY_TEMPLATES.slice(0, 6) as freq}
		<button
			type="button"
			on:click={() => quickFillFrequency(freq)}
			class="px-3 py-1.5 text-sm font-medium rounded-lg transition-all hover:scale-105"
			style="background-color: rgba(16, 185, 129, 0.1); color: var(--accent); border: 1px solid rgba(16, 185, 129, 0.3);"
			title="{freq.full} - {freq.template.replace('{dose}', selectedDose)}"
		>
			{freq.label}
		</button>
	{/each}
	<button
		type="button"
		on:click={() => (showFrequencyBuilder = !showFrequencyBuilder)}
		class="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
		style="background-color: var(--border-color); color: var(--foreground);"
		title="Build custom frequency"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
		</svg>
	</button>
	<button
		type="button"
		on:click={() => (showModal = true)}
		class="px-3 py-1.5 text-sm font-medium rounded-lg transition-all hover:scale-105"
		style="background-color: rgba(168, 85, 247, 0.1); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3);"
		title="Browse all templates"
	>
		Templates
	</button>
</div>

<!-- Frequency Builder -->
{#if showFrequencyBuilder}
	<div class="mb-4 p-4 rounded-lg" style="background-color: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2);">
		<h4 class="text-sm font-semibold mb-3" style="color: var(--accent);">Build Custom SIG</h4>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			<div>
				<label class="block text-xs font-medium mb-1" style="color: var(--text-secondary);">Dose Amount</label>
				<select
					bind:value={selectedDose}
					class="w-full px-3 py-2 rounded text-sm"
					style="background-color: var(--card-bg); color: var(--foreground); border: 1px solid var(--border-color);"
				>
					{#each DOSE_AMOUNTS as dose}
						<option value={dose}>{dose}</option>
					{/each}
				</select>
			</div>
			<div>
				<label class="block text-xs font-medium mb-1" style="color: var(--text-secondary);">Frequency</label>
				<select
					bind:value={selectedFrequency}
					class="w-full px-3 py-2 rounded text-sm"
					style="background-color: var(--card-bg); color: var(--foreground); border: 1px solid var(--border-color);"
				>
					{#each FREQUENCY_TEMPLATES as freq}
						<option value={freq}>{freq.label} - {freq.full}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="mt-3">
			<p class="text-sm mb-2" style="color: var(--text-secondary);">
				Preview: <strong style="color: var(--foreground);">{selectedFrequency.template.replace('{dose}', selectedDose)}</strong>
			</p>
			<div class="flex gap-2">
				<button
					type="button"
					on:click={buildCustomFrequency}
					class="btn-primary px-4 py-2 text-sm rounded-lg"
				>
					Use This SIG
				</button>
				<button
					type="button"
					on:click={() => (showFrequencyBuilder = false)}
					class="btn-secondary px-4 py-2 text-sm rounded-lg"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Template Modal -->
{#if showModal && modalContainer}
	<div
		class="fixed inset-0 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.7); z-index: 99999; position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: auto;"
		on:click={() => (showModal = false)}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
			style="background-color: var(--card-bg); position: relative; z-index: 100000;"
			on:click|stopPropagation
			role="document"
		>
			<!-- Header -->
			<div class="flex items-center justify-between p-6" style="border-bottom: 1px solid var(--border-color);">
				<h3 class="text-2xl font-bold" style="color: var(--foreground);">SIG Template Library</h3>
				<button
					on:click={() => (showModal = false)}
					class="p-2 rounded-lg hover:bg-opacity-10"
					style="color: var(--text-secondary);"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Search and Filters -->
			<div class="p-6 space-y-4" style="border-bottom: 1px solid var(--border-color);">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search templates..."
					class="input-text w-full px-4 py-2 rounded-lg"
				/>

				<div class="flex flex-wrap gap-2">
					{#each categories as category}
						<button
							type="button"
							on:click={() => (selectedCategory = category)}
							class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
							style="{selectedCategory === category
								? `background-color: var(--accent); color: var(--background);`
								: `background-color: var(--border-color); color: var(--foreground);`}"
						>
							{category}
							{#if category === 'Custom'}
								({customTemplates.length})
							{/if}
						</button>
					{/each}
				</div>

				<button
					type="button"
					on:click={() => (showCustomForm = !showCustomForm)}
					class="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
					style="background-color: rgba(168, 85, 247, 0.1); color: #a855f7;"
				>
					{showCustomForm ? 'Cancel' : 'Save Current as Template'}
				</button>

				{#if showCustomForm}
					<div class="p-4 rounded-lg space-y-3" style="background-color: rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.2);">
						<input
							type="text"
							bind:value={customName}
							placeholder="Template name"
							class="input-text w-full px-3 py-2 rounded text-sm"
						/>
						<input
							type="text"
							bind:value={customCategory}
							placeholder="Category (optional)"
							class="input-text w-full px-3 py-2 rounded text-sm"
						/>
						<textarea
							bind:value={customTemplate}
							placeholder="SIG template (e.g., Take 1 tablet by mouth twice daily)"
							rows="2"
							class="input-text w-full px-3 py-2 rounded text-sm resize-none"
						></textarea>
						<button
							type="button"
							on:click={saveCustomTemplate}
							class="btn-primary w-full py-2 text-sm rounded-lg"
						>
							Save Template
						</button>
					</div>
				{/if}
			</div>

			<!-- Templates List -->
			<div class="overflow-y-auto p-6" style="max-height: 50vh;">
				{#if filteredTemplates.length === 0}
					<p class="text-center py-8" style="color: var(--text-secondary);">
						No templates found. Try a different search or category.
					</p>
				{:else}
					<div class="grid grid-cols-1 gap-3">
						{#each filteredTemplates as template}
							<button
								type="button"
								on:click={() => selectTemplate(template.template, template.id)}
								class="text-left p-4 rounded-lg transition-all hover:scale-[1.02]"
								style="background-color: var(--background); border: 1px solid var(--border-color);"
							>
								<div class="flex items-start justify-between gap-3">
									<div class="flex-1">
										<div class="flex items-center gap-2 mb-1">
											<h4 class="font-semibold" style="color: var(--foreground);">{template.name}</h4>
											<span class="text-xs px-2 py-0.5 rounded" style="background-color: rgba(16, 185, 129, 0.1); color: var(--accent);">
												{template.category}
											</span>
											{#if template.usageCount}
												<span class="text-xs" style="color: var(--text-muted);">
													Used {template.usageCount}x
												</span>
											{/if}
										</div>
										<p class="text-sm" style="color: var(--text-secondary);">
											{template.template}
										</p>
										{#if template.description}
											<p class="text-xs mt-1" style="color: var(--text-muted);">
												{template.description}
											</p>
										{/if}
									</div>
									<svg class="w-5 h-5 flex-shrink-0" style="color: var(--accent);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
