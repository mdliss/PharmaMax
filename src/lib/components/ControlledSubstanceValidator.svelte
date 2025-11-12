<script lang="ts">
	import { checkControlledSubstance } from '$lib/utils/controlledSubstanceChecker';
	import type { ControlledSubstanceInfo } from '$lib/utils/controlledSubstanceChecker';
	import { onMount } from 'svelte';

	export let drugName: string = '';
	export let daysSupply: number = 30;
	export let refills: number = 0;
	export let onValidationChange: ((isValid: boolean, errors: string[]) => void) | null = null;

	let substanceInfo: ControlledSubstanceInfo | null = null;
	let checking = false;
	let validationErrors: string[] = [];
	let validationWarnings: string[] = [];

	$: if (drugName && drugName.length > 2) {
		checkDrug();
	} else {
		substanceInfo = null;
		validationErrors = [];
		validationWarnings = [];
		if (onValidationChange) {
			onValidationChange(true, []);
		}
	}

	// Re-validate when refills or days supply change
	$: if (substanceInfo?.isControlled) {
		validateLimits();
	}

	async function checkDrug() {
		checking = true;
		try {
			substanceInfo = await checkControlledSubstance(drugName, daysSupply);
			if (substanceInfo.isControlled) {
				validateLimits();
			} else {
				validationErrors = [];
				validationWarnings = [];
				if (onValidationChange) {
					onValidationChange(true, []);
				}
			}
		} catch (error) {
			console.error('Error checking controlled substance:', error);
		} finally {
			checking = false;
		}
	}

	function validateLimits() {
		if (!substanceInfo?.isControlled || !substanceInfo.substance) {
			validationErrors = [];
			validationWarnings = [];
			if (onValidationChange) {
				onValidationChange(true, []);
			}
			return;
		}

		const errors: string[] = [];
		const warnings: string[] = [];
		const maxRefills = substanceInfo.substance.maxRefills;
		const maxDays = substanceInfo.substance.typicalMaxDaysSupply;

		// Check refill limits
		if (refills > maxRefills) {
			errors.push(
				`❌ Refills (${refills}) exceed maximum allowed (${maxRefills}) for ${substanceInfo.substance.scheduleBadge} controlled substances`
			);
		} else if (refills === maxRefills && maxRefills > 0) {
			warnings.push(
				`⚠️ At maximum refill limit (${maxRefills}) for ${substanceInfo.substance.scheduleBadge}`
			);
		}

		// Check days supply limits
		if (daysSupply > maxDays) {
			warnings.push(
				`⚠️ Days supply (${daysSupply}) exceeds typical maximum (${maxDays} days) for ${substanceInfo.substance.scheduleBadge}`
			);
		}

		// Schedule II specific validation
		if (substanceInfo.substance.schedule === 'II' && refills > 0) {
			errors.push(
				`❌ Schedule II controlled substances cannot have refills. Prescriber must write new prescription for each fill.`
			);
		}

		validationErrors = errors;
		validationWarnings = warnings;

		if (onValidationChange) {
			onValidationChange(errors.length === 0, errors);
		}
	}
</script>

{#if checking}
	<div class="validation-checking text-sm text-gray-500 mt-2">
		<span class="inline-block animate-pulse">🔍 Checking DEA schedule...</span>
	</div>
{:else if substanceInfo?.isControlled}
	<div class="validation-container mt-3 space-y-2">
		<!-- Errors (blocking) -->
		{#if validationErrors.length > 0}
			<div
				class="validation-errors p-3 rounded-lg border-2 border-red-500 bg-red-50"
				data-testid="validation-errors"
			>
				<div class="flex items-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="flex-1">
						<p class="font-semibold text-red-800 mb-1">Controlled Substance Validation Errors</p>
						<ul class="space-y-1">
							{#each validationErrors as error}
								<li class="text-sm text-red-700">{error}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/if}

		<!-- Warnings (non-blocking) -->
		{#if validationWarnings.length > 0}
			<div
				class="validation-warnings p-3 rounded-lg border border-amber-400 bg-amber-50"
				data-testid="validation-warnings"
			>
				<div class="flex items-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="flex-1">
						<p class="font-semibold text-amber-800 mb-1">Controlled Substance Warnings</p>
						<ul class="space-y-1">
							{#each validationWarnings as warning}
								<li class="text-sm text-amber-700">{warning}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/if}

		<!-- Info badge (no errors or warnings) -->
		{#if validationErrors.length === 0 && validationWarnings.length === 0}
			<div class="validation-info p-2 rounded-lg bg-blue-50 border border-blue-200">
				<div class="flex items-center gap-2 text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-blue-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="text-blue-700">
						✓ Controlled substance limits validated - {substanceInfo.substance?.scheduleBadge}
						(max {substanceInfo.substance?.maxRefills} refills)
					</span>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
