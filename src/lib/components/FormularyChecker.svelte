<script lang="ts">
	import { onMount } from 'svelte';
	import { checkFormularyCoverage, getCoverageSummary, INSURANCE_PLANS } from '$lib/data/formularyData';
	import type { FormularyDrugInfo } from '$lib/data/formularyData';

	export let rxcui: string = '';
	export let drugName: string = '';
	export let insurancePlanId: string | null = null;

	let coverageInfo: FormularyDrugInfo | null = null;
	let checking = false;
	let insurancePlanName = '';

	$: if (rxcui && insurancePlanId) {
		checkCoverage();
	}

	async function checkCoverage() {
		if (!rxcui || !insurancePlanId) return;

		checking = true;

		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));

		coverageInfo = checkFormularyCoverage(insurancePlanId, rxcui);
		const plan = INSURANCE_PLANS.find((p) => p.id === insurancePlanId);
		insurancePlanName = plan?.name || '';

		checking = false;
	}

	$: summary = insurancePlanId
		? getCoverageSummary(coverageInfo, insurancePlanName)
		: null;
</script>

{#if insurancePlanId && insurancePlanId !== 'no-insurance'}
	<div class="mt-6 rounded-lg p-6" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
		<div class="flex items-center justify-between mb-4">
			<h3 class="text-xl font-semibold" style="color: var(--foreground);">
				Insurance Coverage
			</h3>
			{#if checking}
				<div class="flex items-center gap-2">
					<svg class="animate-spin h-4 w-4" style="color: var(--accent);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<span class="text-sm" style="color: var(--text-secondary);">Checking coverage...</span>
				</div>
			{/if}
		</div>

		{#if summary}
			<div class="space-y-4">
				<!-- Coverage Status Banner -->
				<div
					class="rounded-lg p-4 flex items-start gap-3"
					style="{summary.isCovered
						? 'background-color: var(--success-bg); border: 1px solid var(--success);'
						: 'background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);'}"
				>
					{#if summary.isCovered}
						<svg class="w-6 h-6 flex-shrink-0 mt-0.5" style="color: var(--success);" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
						</svg>
					{:else}
						<svg class="w-6 h-6 flex-shrink-0 mt-0.5" style="color: #ef4444;" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
						</svg>
					{/if}
					<div class="flex-1">
						<p class="font-semibold text-lg" style="color: {summary.isCovered ? 'var(--success)' : '#ef4444'};">
							{summary.isCovered ? 'Covered by ' + insurancePlanName : 'Not Covered'}
						</p>
						<p class="text-sm mt-1" style="color: var(--text-secondary);">
							{drugName} coverage status under your insurance plan
						</p>
					</div>
				</div>

				{#if summary.isCovered}
					<!-- Coverage Details -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<!-- Tier -->
						<div class="rounded-lg p-4" style="background-color: var(--background); border: 1px solid var(--border-color);">
							<div class="text-sm font-medium mb-1" style="color: var(--text-secondary);">
								Formulary Tier
							</div>
							<div class="text-lg font-semibold" style="color: var(--foreground);">
								{summary.tierLabel}
							</div>
							<div class="text-xs mt-1" style="color: var(--text-muted);">
								{coverageInfo?.tier === 1 ? 'Preferred generic' : coverageInfo?.tier === 2 ? 'Generic' : coverageInfo?.tier === 3 ? 'Preferred brand' : 'Specialty'}
							</div>
						</div>

						<!-- Copay -->
						<div class="rounded-lg p-4" style="background-color: var(--background); border: 1px solid var(--border-color);">
							<div class="text-sm font-medium mb-1" style="color: var(--text-secondary);">
								Estimated Copay
							</div>
							<div class="text-lg font-semibold" style="color: var(--accent);">
								{summary.copay}
							</div>
							<div class="text-xs mt-1" style="color: var(--text-muted);">
								May vary by plan
							</div>
						</div>

						<!-- Prior Auth Status -->
						<div class="rounded-lg p-4" style="background-color: var(--background); border: 1px solid var(--border-color);">
							<div class="text-sm font-medium mb-1" style="color: var(--text-secondary);">
								Authorization
							</div>
							<div class="text-lg font-semibold" style="color: {summary.requiresAuth ? '#f59e0b' : 'var(--success)'};">
								{summary.requiresAuth ? 'Required' : 'Not Required'}
							</div>
							<div class="text-xs mt-1" style="color: var(--text-muted);">
								{summary.requiresAuth ? 'Approval needed' : 'No approval needed'}
							</div>
						</div>
					</div>

					<!-- Restrictions -->
					{#if summary.restrictions.length > 0}
						<div class="rounded-lg p-4" style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
							<div class="flex items-start gap-2">
								<svg class="w-5 h-5 flex-shrink-0 mt-0.5" style="color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
								</svg>
								<div class="flex-1">
									<p class="font-semibold text-sm mb-2" style="color: #f59e0b;">
										Coverage Restrictions
									</p>
									<ul class="space-y-1">
										{#each summary.restrictions as restriction}
											<li class="text-sm flex items-start gap-2" style="color: var(--text-secondary);">
												<span>•</span>
												<span>{restriction}</span>
											</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					{/if}

					<!-- Additional Notes -->
					{#if coverageInfo?.notes}
						<div class="text-sm p-3 rounded" style="background-color: var(--background); color: var(--text-secondary);">
							<span class="font-semibold" style="color: var(--foreground);">Note:</span>
							{coverageInfo.notes}
						</div>
					{/if}
				{:else}
					<!-- Not Covered - Show Alternatives -->
					<div class="rounded-lg p-4" style="background-color: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2);">
						<p class="text-sm font-medium mb-2" style="color: #ef4444;">
							This medication is not covered by {insurancePlanName}
						</p>
						<p class="text-sm" style="color: var(--text-secondary);">
							Contact your prescriber to discuss alternative medications that may be covered, or consider using a discount card program for cash pricing.
						</p>
					</div>
				{/if}
			</div>
		{:else}
			<div class="text-center py-4">
				<p class="text-sm" style="color: var(--text-muted);">
					Enter drug information to check insurance coverage
				</p>
			</div>
		{/if}
	</div>
{/if}
