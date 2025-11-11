<script lang="ts">
	import { onMount } from 'svelte';

	export let prescription: any;
	export let sigParsed: any;
	export let calculation: any;
	export let ndcs: any[];
	export let recommendation: any;

	let currentStep = 0;
	let showDetails = false;
	let activeTooltip: string | null = null;

	const steps = [
		{
			id: 'normalize',
			label: 'Normalize',
			description: 'Drug name is validated and converted to a standardized RxCUI identifier',
			details: `Converted "${prescription.drugName}" to RxCUI ${prescription.rxcui} using the RxNorm API for consistent drug identification.`
		},
		{
			id: 'parse',
			label: 'Parse SIG',
			description: 'Prescription instructions are analyzed using AI to extract dosing information',
			details: `Extracted: ${sigParsed.dosePerAdministration} ${sigParsed.unit} per dose, ${sigParsed.frequencyPerDay}x daily via ${sigParsed.route} route. Detected ${sigParsed.dosageForm} dosage form.`
		},
		{
			id: 'calculate',
			label: 'Calculate',
			description: 'Total quantity needed is computed from daily dose and days supply',
			details: `Computed: ${sigParsed.totalDailyDose} ${calculation.unit}/day × ${prescription.daysSupply} days = ${calculation.totalQuantityNeeded} ${calculation.unit} total.`
		},
		{
			id: 'recommend',
			label: 'Recommend',
			description: 'Available NDC packages are analyzed to find the optimal combination',
			details: recommendation.packages.length > 0
				? `Found ${ndcs.length} available NDCs, selected ${recommendation.packages.length} package(s) totaling ${recommendation.totalDispensed} ${calculation.unit} with ${recommendation.overfill} ${calculation.unit} (${recommendation.overfillPercentage.toFixed(1)}%) overfill.`
				: 'No active NDC packages available for this medication.'
		}
	];

	onMount(() => {
		// Animate progress bar on mount
		const interval = setInterval(() => {
			if (currentStep < steps.length - 1) {
				currentStep++;
			} else {
				clearInterval(interval);
			}
		}, 400);

		return () => clearInterval(interval);
	});

	function toggleTooltip(stepId: string) {
		if (activeTooltip === stepId) {
			activeTooltip = null;
		} else {
			activeTooltip = stepId;
		}
	}

	// Calculate math components
	const mathSteps = [
		{
			label: 'Dose per administration',
			value: `${sigParsed.dosePerAdministration} ${sigParsed.unit}`,
			highlight: true
		},
		{
			label: 'Frequency',
			value: `${sigParsed.frequencyPerDay}x/day`,
			highlight: true
		},
		{
			label: 'Daily total',
			value: `${sigParsed.totalDailyDose} ${calculation.unit}/day`,
			highlight: false
		},
		{
			label: 'Days supply',
			value: `${prescription.daysSupply} days`,
			highlight: true
		},
		{
			label: 'Total needed',
			value: `${calculation.totalQuantityNeeded} ${calculation.unit}`,
			highlight: false
		}
	];
</script>

<div class="card-hover rounded-lg p-6" style="background-color: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.3);">
	<div class="flex items-center justify-between mb-6">
		<h3 class="text-xl font-semibold" style="color: #3b82f6;">Calculation Breakdown</h3>
		<button
			on:click={() => showDetails = !showDetails}
			class="text-sm px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
			style="background-color: rgba(59, 130, 246, 0.15); color: #3b82f6;"
		>
			{showDetails ? 'Hide Details' : 'Show Details'}
			<svg
				class="w-4 h-4 transition-transform"
				style="transform: rotate({showDetails ? '180deg' : '0deg'});"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>

	<!-- Progress Bar -->
	<div class="mb-8">
		<div class="flex justify-between items-center mb-3">
			{#each steps as step, i}
				<div class="flex flex-col items-center flex-1 relative">
					<!-- Step Circle -->
					<div class="relative">
						<div
							class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer"
							style="background-color: {i <= currentStep ? '#3b82f6' : 'var(--border-color)'}; color: {i <= currentStep ? 'white' : 'var(--text-muted)'}; transform: scale({i === currentStep ? '1.15' : '1'});"
							on:click={() => toggleTooltip(step.id)}
							on:keydown={(e) => e.key === 'Enter' && toggleTooltip(step.id)}
							role="button"
							tabindex="0"
							aria-label="{step.label} - {step.description}"
						>
							{#if i < currentStep}
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							{:else}
								<span class="font-semibold">{i + 1}</span>
							{/if}
						</div>

						<!-- Tooltip -->
						{#if activeTooltip === step.id}
							<div
								class="absolute z-10 px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
								style="background-color: var(--card-bg); border: 1px solid rgba(59, 130, 246, 0.3); color: var(--foreground); top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px; max-width: 250px; white-space: normal;"
							>
								<div class="font-semibold mb-1" style="color: #3b82f6;">{step.label}</div>
								<div style="color: var(--text-secondary);">{step.description}</div>
								<!-- Arrow -->
								<div
									class="absolute"
									style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid rgba(59, 130, 246, 0.3); bottom: 100%; left: 50%; transform: translateX(-50%);"
								></div>
							</div>
						{/if}
					</div>

					<!-- Step Label -->
					<p
						class="text-xs mt-2 font-medium transition-colors"
						style="color: {i <= currentStep ? '#3b82f6' : 'var(--text-muted)'};"
					>
						{step.label}
					</p>

					<!-- Connection Line -->
					{#if i < steps.length - 1}
						<div
							class="absolute h-0.5 transition-all duration-500"
							style="background-color: {i < currentStep ? '#3b82f6' : 'var(--border-color)'}; width: calc(100% - 3rem); left: calc(50% + 1.5rem); top: 1.5rem;"
						></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Visual Math Representation -->
	<div class="mb-6 p-4 rounded-lg" style="background-color: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2);">
		<p class="text-sm font-medium mb-3" style="color: #3b82f6;">Calculation Formula</p>
		<div class="flex flex-wrap items-center gap-3 text-sm">
			<!-- Dose per administration -->
			<div
				class="px-3 py-2 rounded font-semibold"
				style="background-color: rgba(59, 130, 246, 0.2); color: #3b82f6;"
				title="Dose per administration"
			>
				{sigParsed.dosePerAdministration} {sigParsed.unit}
			</div>

			<span style="color: var(--text-muted);">×</span>

			<!-- Frequency -->
			<div
				class="px-3 py-2 rounded font-semibold"
				style="background-color: rgba(59, 130, 246, 0.2); color: #3b82f6;"
				title="Frequency per day"
			>
				{sigParsed.frequencyPerDay}x/day
			</div>

			<span style="color: var(--text-muted);">=</span>

			<!-- Daily Total -->
			<div
				class="px-3 py-2 rounded"
				style="background-color: var(--card-bg); border: 1px solid rgba(59, 130, 246, 0.3); color: var(--foreground);"
				title="Total daily dose"
			>
				{sigParsed.totalDailyDose} {calculation.unit}/day
			</div>

			<span style="color: var(--text-muted);">×</span>

			<!-- Days Supply -->
			<div
				class="px-3 py-2 rounded font-semibold"
				style="background-color: rgba(59, 130, 246, 0.2); color: #3b82f6;"
				title="Days supply"
			>
				{prescription.daysSupply} days
			</div>

			<span style="color: var(--text-muted);">=</span>

			<!-- Total Needed -->
			<div
				class="px-4 py-2 rounded font-bold text-base"
				style="background-color: rgba(16, 185, 129, 0.2); color: #10b981; border: 2px solid #10b981;"
				title="Total quantity needed"
			>
				{calculation.totalQuantityNeeded} {calculation.unit}
			</div>
		</div>

		<!-- Human-readable explanation -->
		<p class="text-xs mt-3" style="color: var(--text-secondary);">
			Taking {sigParsed.dosePerAdministration} {sigParsed.unit} {sigParsed.frequencyPerDay} time{sigParsed.frequencyPerDay > 1 ? 's' : ''} daily
			for {prescription.daysSupply} days requires {calculation.totalQuantityNeeded} {calculation.unit} total.
		</p>
	</div>

	<!-- Expandable Detailed Breakdown -->
	{#if showDetails}
		<div class="space-y-3 animate-in">
			{#each steps as step, i}
				<div
					class="p-4 rounded-lg transition-all"
					style="background-color: {i <= currentStep ? 'rgba(59, 130, 246, 0.08)' : 'var(--background)'}; border: 1px solid {i <= currentStep ? 'rgba(59, 130, 246, 0.3)' : 'var(--border-color)'};"
				>
					<div class="flex items-start gap-3">
						<!-- Step number -->
						<div
							class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm"
							style="background-color: {i <= currentStep ? '#3b82f6' : 'var(--border-color)'}; color: white;"
						>
							{i + 1}
						</div>

						<div class="flex-1">
							<!-- Step title -->
							<h4 class="font-semibold mb-1" style="color: {i <= currentStep ? '#3b82f6' : 'var(--foreground)'};">
								{step.label}
							</h4>

							<!-- Description -->
							<p class="text-sm mb-2" style="color: var(--text-secondary);">
								{step.description}
							</p>

							<!-- Details -->
							<div
								class="text-sm p-3 rounded"
								style="background-color: var(--card-bg); border-left: 3px solid {i <= currentStep ? '#3b82f6' : 'var(--border-color)'};"
							>
								<p style="color: var(--foreground);">{step.details}</p>
							</div>
						</div>

						<!-- Check icon for completed steps -->
						{#if i < currentStep}
							<svg
								class="w-6 h-6 flex-shrink-0"
								style="color: #3b82f6;"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.animate-in {
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
