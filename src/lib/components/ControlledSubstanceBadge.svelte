<script lang="ts">
	import type { ControlledSubstanceInfo } from '$lib/utils/controlledSubstanceChecker';
	import { getScheduleBadgeColor, formatRestrictions } from '$lib/utils/controlledSubstanceChecker';

	export let substanceInfo: ControlledSubstanceInfo | null = null;
	export let showDetails: boolean = false;

	let detailsVisible = false;

	function toggleDetails() {
		detailsVisible = !detailsVisible;
	}

	$: badgeColor = substanceInfo?.substance
		? getScheduleBadgeColor(substanceInfo.substance.schedule)
		: '';
</script>

{#if substanceInfo?.isControlled && substanceInfo.substance}
	<div class="controlled-substance-badge-container" data-testid="controlled-substance-badge">
		<!-- Main Badge -->
		<div class="flex items-center gap-2">
			<button
				on:click={toggleDetails}
				class="badge {badgeColor} px-3 py-1 rounded-md font-bold text-sm flex items-center gap-1 hover:opacity-90 transition-opacity cursor-pointer"
				title="Click for details"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
				{substanceInfo.substance.scheduleBadge}
			</button>

			{#if substanceInfo.substance.schedule === 'II'}
				<span class="text-xs text-red-600 font-semibold">NO REFILLS</span>
			{:else}
				<span class="text-xs text-gray-600">
					Max {substanceInfo.substance.maxRefills} refills
				</span>
			{/if}
		</div>

		<!-- Warnings -->
		{#if substanceInfo.warnings && substanceInfo.warnings.length > 0}
			<div class="warnings-container mt-2 space-y-1">
				{#each substanceInfo.warnings as warning}
					<div class="warning-item text-sm text-amber-700 bg-amber-50 px-2 py-1 rounded">
						{warning}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Expandable Details -->
		{#if detailsVisible || showDetails}
			<div
				class="details-panel mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm"
				transition:slide={{ duration: 200 }}
			>
				<h4 class="font-bold text-gray-800 mb-2">Controlled Substance Information</h4>

				<dl class="space-y-2">
					<div>
						<dt class="font-semibold text-gray-700">Generic Name:</dt>
						<dd class="text-gray-600">{substanceInfo.substance.genericName}</dd>
					</div>

					{#if substanceInfo.substance.commonBrandNames.length > 0}
						<div>
							<dt class="font-semibold text-gray-700">Common Brand Names:</dt>
							<dd class="text-gray-600">
								{substanceInfo.substance.commonBrandNames.join(', ')}
							</dd>
						</div>
					{/if}

					<div>
						<dt class="font-semibold text-gray-700">DEA Schedule:</dt>
						<dd class="text-gray-600">
							Schedule {substanceInfo.substance.schedule} ({substanceInfo.substance.scheduleBadge})
						</dd>
					</div>

					<div>
						<dt class="font-semibold text-gray-700">Maximum Refills:</dt>
						<dd class="text-gray-600">
							{substanceInfo.substance.maxRefills}
							{#if substanceInfo.substance.maxRefills === 0}
								<span class="text-red-600 font-semibold">(No refills allowed)</span>
							{/if}
						</dd>
					</div>

					<div>
						<dt class="font-semibold text-gray-700">Typical Max Days Supply:</dt>
						<dd class="text-gray-600">{substanceInfo.substance.typicalMaxDaysSupply} days</dd>
					</div>

					{#if substanceInfo.substance.requiresPrescriberDEA}
						<div>
							<dt class="font-semibold text-gray-700">Prescriber Requirements:</dt>
							<dd class="text-gray-600">Valid DEA number required</dd>
						</div>
					{/if}

					{#if substanceInfo.substance.restrictions.length > 0}
						<div>
							<dt class="font-semibold text-gray-700 mb-1">Additional Restrictions:</dt>
							<dd class="text-gray-600 whitespace-pre-line">
								{formatRestrictions(substanceInfo.substance.restrictions)}
							</dd>
						</div>
					{/if}
				</dl>

				<button
					on:click={toggleDetails}
					class="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
				>
					Hide Details
				</button>
			</div>
		{/if}
	</div>
{/if}

<script context="module">
	import { slide } from 'svelte/transition';
</script>

<style>
	.controlled-substance-badge-container {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.badge {
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		user-select: none;
	}

	.warning-item {
		border-left: 3px solid #f59e0b;
	}

	.details-panel {
		animation: fadeIn 0.2s ease-in;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	dl > div {
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: 0.5rem;
	}

	@media (max-width: 640px) {
		dl > div {
			grid-template-columns: 1fr;
		}
	}
</style>
