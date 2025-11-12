<script lang="ts">
	import { onMount } from 'svelte';
	import { copyToClipboard } from '$lib/utils/clipboard';

	export let rxcui: string;
	export let currentDrugName: string;
	export let onSubstitute: ((alternative: any) => void) | undefined = undefined;

	interface GenericAlternative {
		rxcui: string;
		name: string;
		doseForm: string;
		strength: string;
		tty: string;
		isABRated?: boolean;
		costSavings?: number;
		estimatedCost?: number;
	}

	let alternatives: GenericAlternative[] = [];
	let loading = true;
	let error = '';
	let expanded = false;
	let copyingAlt: string | null = null;

	onMount(async () => {
		await fetchGenericAlternatives();
	});

	async function fetchGenericAlternatives() {
		loading = true;
		error = '';

		try {
			const response = await fetch('/api/generic-alternatives', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ rxcui })
			});

			const data = await response.json();

			if (data.success) {
				alternatives = data.alternatives || [];
			} else {
				error = data.error || 'Failed to fetch generic alternatives';
			}
		} catch (err: any) {
			console.error('Error fetching generic alternatives:', err);
			error = 'Network error while fetching alternatives';
		} finally {
			loading = false;
		}
	}

	function substituteWith(alternative: GenericAlternative) {
		if (onSubstitute) {
			onSubstitute(alternative);
		}
	}

	async function copyAlternative(alternative: GenericAlternative) {
		const text = `Generic Alternative:
Drug: ${alternative.name}
RxCUI: ${alternative.rxcui}
Strength: ${alternative.strength}
Dose Form: ${alternative.doseForm}
Est. Cost: $${alternative.estimatedCost}
Savings: ${alternative.costSavings}%`;

		const success = await copyToClipboard(text);
		if (success) {
			copyingAlt = alternative.rxcui;
			setTimeout(() => (copyingAlt = null), 1500);
		}
	}
</script>

{#if loading}
	<div class="rounded-lg p-6 print:hidden" style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3);">
		<div class="flex items-center gap-3">
			<svg class="animate-spin h-5 w-5" style="color: #3b82f6;" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			<p style="color: #3b82f6;">Finding generic alternatives...</p>
		</div>
	</div>
{:else if error}
	<div class="rounded-lg p-4 print:hidden" style="background-color: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4);">
		<p class="text-sm" style="color: #ef4444;">{error}</p>
	</div>
{:else if alternatives.length > 0}
	<div class="rounded-lg p-6 print:hidden" style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3);">
		<button
			on:click={() => (expanded = !expanded)}
			class="w-full flex items-center justify-between"
		>
			<div class="flex items-center gap-3">
				<svg class="w-6 h-6" style="color: #10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<div class="text-left">
					<h3 class="text-xl font-semibold" style="color: #10b981;">Generic Alternatives Available</h3>
					<p class="text-sm mt-1" style="color: var(--text-secondary);">
						Save {alternatives[0]?.costSavings || 0}-{alternatives[alternatives.length - 1]?.costSavings || 0}% with AB-rated generic options ({alternatives.length} available)
					</p>
				</div>
			</div>
			<svg
				class="w-6 h-6 transition-transform"
				style="color: #10b981; transform: rotate({expanded ? 180 : 0}deg);"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if expanded}
			<div class="mt-4 space-y-3">
				{#each alternatives as alternative}
					<div
						class="rounded-lg p-4 transition-all hover:shadow-lg"
						style="background-color: var(--card-bg); border: 1px solid rgba(16, 185, 129, 0.3);"
					>
						<div class="flex justify-between items-start gap-4">
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-2">
									<h4 class="text-lg font-semibold" style="color: var(--foreground);">
										{alternative.name}
									</h4>
									{#if alternative.isABRated}
										<span
											class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
											style="background-color: rgba(16, 185, 129, 0.2); color: #10b981;"
											title="AB-rated: Therapeutically equivalent"
										>
											AB-Rated
										</span>
									{/if}
								</div>
								<div class="grid grid-cols-2 gap-2 text-sm">
									<div>
										<span class="font-medium" style="color: var(--text-secondary);">RxCUI:</span>
										<span style="color: var(--text-muted);" class="font-mono ml-1">{alternative.rxcui}</span>
									</div>
									<div>
										<span class="font-medium" style="color: var(--text-secondary);">Strength:</span>
										<span style="color: var(--foreground);" class="ml-1">{alternative.strength}</span>
									</div>
									<div>
										<span class="font-medium" style="color: var(--text-secondary);">Form:</span>
										<span style="color: var(--foreground);" class="ml-1">{alternative.doseForm}</span>
									</div>
									<div>
										<span class="font-medium" style="color: var(--text-secondary);">Type:</span>
										<span style="color: var(--text-muted);" class="ml-1">{alternative.tty}</span>
									</div>
								</div>
							</div>

							<div class="text-right flex-shrink-0">
								<div class="mb-3">
									<p class="text-3xl font-bold" style="color: #10b981;">
										{alternative.costSavings}%
									</p>
									<p class="text-xs" style="color: var(--text-secondary);">savings</p>
								</div>
								<div class="mb-3">
									<p class="text-lg font-semibold" style="color: var(--foreground);">
										${alternative.estimatedCost}
									</p>
									<p class="text-xs" style="color: var(--text-muted);">est. cost</p>
								</div>
							</div>
						</div>

						<div class="mt-4 flex gap-2">
							{#if onSubstitute}
								<button
									on:click={() => substituteWith(alternative)}
									class="btn-primary px-4 py-2 rounded-lg transition-colors flex items-center gap-2 flex-1"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
									</svg>
									Substitute
								</button>
							{/if}
							<button
								on:click={() => copyAlternative(alternative)}
								class="px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
								style="background-color: var(--border-color); color: var(--foreground);"
								title="Copy details"
							>
								{#if copyingAlt === alternative.rxcui}
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								{:else}
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
								{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-4 p-3 rounded" style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3);">
				<p class="text-xs font-semibold" style="color: #3b82f6;">💡 Generic Substitution Note:</p>
				<p class="text-xs mt-1" style="color: var(--text-secondary);">
					AB-rated generics are therapeutically equivalent to brand-name drugs. Cost estimates are approximations and may vary by pharmacy and insurance. Always verify with patient's insurance before substituting.
				</p>
			</div>
		{/if}
	</div>
{/if}
