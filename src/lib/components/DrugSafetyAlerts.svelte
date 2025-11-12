<script lang="ts">
	import { onMount } from 'svelte';
	import { checkDrugSafety, getAlertSeverityClasses, getAlertIcon, getPregnancyCategoryColor, getLactationRiskColor } from '$lib/utils/drugSafetyChecker';
	import type { DrugSafetyCheckResult } from '$lib/utils/drugSafetyChecker';

	export let drugName: string = '';
	export let dailyDose: number | undefined = undefined;
	export let doseUnit: string | undefined = undefined;
	export let patientAge: number | undefined = undefined;
	export let isPregnant: boolean = false;
	export let isLactating: boolean = false;
	export let renalImpairment: 'None' | 'Mild' | 'Moderate' | 'Severe' = 'None';
	export let hepaticImpairment: 'None' | 'Mild' | 'Moderate' | 'Severe' = 'None';

	let safetyResult: DrugSafetyCheckResult | null = null;
	let checking = false;
	let showDetails = false;

	$: if (drugName && drugName.length > 2) {
		checkSafety();
	} else {
		safetyResult = null;
	}

	async function checkSafety() {
		checking = true;
		try {
			safetyResult = await checkDrugSafety({
				drugName,
				dailyDose,
				doseUnit,
				patientAge,
				isPregnant,
				isLactating,
				renalImpairment,
				hepaticImpairment
			});
		} catch (error) {
			console.error('Error checking drug safety:', error);
		} finally {
			checking = false;
		}
	}

	function toggleDetails() {
		showDetails = !showDetails;
	}

	$: criticalAlerts = safetyResult?.alerts.filter(a => a.severity === 'critical') || [];
	$: warningAlerts = safetyResult?.alerts.filter(a => a.severity === 'warning') || [];
	$: infoAlerts = safetyResult?.alerts.filter(a => a.severity === 'info') || [];
</script>

{#if checking}
	<div class="safety-checking p-3 bg-gray-100 rounded-lg">
		<div class="flex items-center gap-2">
			<div class="animate-spin h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full"></div>
			<span class="text-sm text-gray-600">Checking drug safety...</span>
		</div>
	</div>
{:else if safetyResult?.hasInfo}
	<div class="drug-safety-container space-y-3" data-testid="drug-safety-alerts">
		<!-- Critical Alerts -->
		{#if criticalAlerts.length > 0}
			<div class="alerts-section">
				{#each criticalAlerts as alert}
					<div class="alert-item {getAlertSeverityClasses(alert.severity)} p-3 rounded-lg border-l-4">
						<div class="flex items-start gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 flex-shrink-0 mt-0.5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path fill-rule="evenodd" d={getAlertIcon(alert.severity)} clip-rule="evenodd" />
							</svg>
							<div class="flex-1">
								<p class="font-semibold text-sm">{alert.category}</p>
								<p class="text-sm mt-1">{alert.message}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Warning Alerts -->
		{#if warningAlerts.length > 0}
			<div class="alerts-section">
				{#each warningAlerts as alert}
					<div class="alert-item {getAlertSeverityClasses(alert.severity)} p-3 rounded-lg border-l-4">
						<div class="flex items-start gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 flex-shrink-0 mt-0.5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path fill-rule="evenodd" d={getAlertIcon(alert.severity)} clip-rule="evenodd" />
							</svg>
							<div class="flex-1">
								<p class="font-semibold text-sm">{alert.category}</p>
								<p class="text-sm mt-1">{alert.message}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Info Alerts -->
		{#if infoAlerts.length > 0}
			<div class="alerts-section">
				{#each infoAlerts as alert}
					<div class="alert-item {getAlertSeverityClasses(alert.severity)} p-3 rounded-lg border-l-4">
						<div class="flex items-start gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 flex-shrink-0 mt-0.5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path fill-rule="evenodd" d={getAlertIcon(alert.severity)} clip-rule="evenodd" />
							</svg>
							<div class="flex-1">
								<p class="font-semibold text-sm">{alert.category}</p>
								<p class="text-sm mt-1">{alert.message}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Safety Information Summary (collapsible) -->
		{#if safetyResult.safetyInfo}
			<div class="safety-summary border border-gray-300 rounded-lg overflow-hidden">
				<button
					on:click={toggleDetails}
					class="w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
				>
					<span class="font-medium text-sm text-gray-800">
						Drug Safety Information - {safetyResult.safetyInfo.genericName}
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-gray-600 transition-transform {showDetails ? 'rotate-180' : ''}"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				{#if showDetails}
					<div class="p-4 bg-white space-y-3 text-sm">
						{#if safetyResult.safetyInfo.brandNames.length > 0}
							<div>
								<span class="font-semibold text-gray-700">Brand Names:</span>
								<span class="text-gray-600">{safetyResult.safetyInfo.brandNames.join(', ')}</span>
							</div>
						{/if}

						<div class="grid grid-cols-2 gap-3">
							<div>
								<span class="font-semibold text-gray-700 block mb-1">Pregnancy:</span>
								<span class="inline-block px-2 py-1 rounded text-xs font-bold {getPregnancyCategoryColor(safetyResult.safetyInfo.pregnancyCategory)}">
									Category {safetyResult.safetyInfo.pregnancyCategory}
								</span>
							</div>

							<div>
								<span class="font-semibold text-gray-700 block mb-1">Lactation:</span>
								<span class="inline-block px-2 py-1 rounded text-xs font-bold {getLactationRiskColor(safetyResult.safetyInfo.lactationRisk)}">
									{safetyResult.safetyInfo.lactationRisk}
								</span>
							</div>
						</div>

						{#if safetyResult.safetyInfo.maxDailyDose}
							<div>
								<span class="font-semibold text-gray-700">Max Daily Dose:</span>
								<span class="text-gray-600">
									{safetyResult.safetyInfo.maxDailyDose.amount} {safetyResult.safetyInfo.maxDailyDose.unit}
									{#if safetyResult.safetyInfo.maxDailyDose.warning}
										<span class="text-xs text-gray-500">({safetyResult.safetyInfo.maxDailyDose.warning})</span>
									{/if}
								</span>
							</div>
						{/if}

						<div class="grid grid-cols-2 gap-3">
							<div>
								<span class="font-semibold text-gray-700">Renal Adjustment:</span>
								<span class="text-gray-600">{safetyResult.safetyInfo.renalAdjustment ? 'Required' : 'Not required'}</span>
							</div>
							<div>
								<span class="font-semibold text-gray-700">Hepatic Adjustment:</span>
								<span class="text-gray-600">{safetyResult.safetyInfo.hepaticAdjustment ? 'Required' : 'Not required'}</span>
							</div>
						</div>

						{#if safetyResult.safetyInfo.blackBoxWarnings && safetyResult.safetyInfo.blackBoxWarnings.length > 0}
							<div>
								<span class="font-semibold text-gray-700 block mb-1">Black Box Warnings:</span>
								<ul class="list-disc list-inside space-y-1 text-gray-600">
									{#each safetyResult.safetyInfo.blackBoxWarnings as warning}
										<li class="text-xs">{warning}</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{/if}

		<!-- No alerts message (if has info but no alerts) -->
		{#if safetyResult.hasInfo && safetyResult.alerts.length === 0}
			<div class="p-3 bg-green-50 border border-green-200 rounded-lg">
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-green-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="text-sm text-green-800">No safety alerts for current parameters</span>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}

	.alerts-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
