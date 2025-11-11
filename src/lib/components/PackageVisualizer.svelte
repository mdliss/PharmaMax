<script lang="ts">
	import { generatePackageAlternatives, type PackageOption, type PackageCombination } from '$lib/utils/packageOptimizer';

	export let totalNeeded: number;
	export let unit: string;
	export let ndcs: PackageOption[];
	export let currentRecommendation: any;

	let showAlternatives = false;
	let alternatives: PackageCombination[] = [];
	let selectedIndex: number = 0;

	$: if (totalNeeded && ndcs.length > 0) {
		alternatives = generatePackageAlternatives(totalNeeded, ndcs, 5);
	}

	function toggleAlternatives() {
		showAlternatives = !showAlternatives;
	}

	function getEfficiencyColor(efficiency: number): string {
		if (efficiency >= 95) return '#10b981'; // Excellent - green
		if (efficiency >= 85) return '#3b82f6'; // Good - blue
		if (efficiency >= 70) return '#f59e0b'; // Fair - orange
		return '#ef4444'; // Poor - red
	}

	function getEfficiencyLabel(efficiency: number): string {
		if (efficiency >= 95) return 'Excellent';
		if (efficiency >= 85) return 'Good';
		if (efficiency >= 70) return 'Fair';
		return 'Poor';
	}
</script>

{#if alternatives.length > 1}
	<div class="card-hover rounded-lg p-6" style="background-color: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.3);">
		<div class="flex items-center justify-between mb-4">
			<div>
				<h3 class="text-xl font-semibold" style="color: #3b82f6;">Package Options</h3>
				<p class="text-sm mt-1" style="color: var(--text-secondary);">
					{alternatives.length} alternative packaging combinations available
				</p>
			</div>
			<button
				on:click={toggleAlternatives}
				class="px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
				style="background-color: rgba(59, 130, 246, 0.15); color: #3b82f6;"
			>
				{showAlternatives ? 'Hide' : 'Compare'} Options
				<svg
					class="w-4 h-4 transition-transform"
					style="transform: rotate({showAlternatives ? '180deg' : '0deg'});"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
		</div>

		{#if showAlternatives}
			<div class="space-y-3 animate-in">
				{#each alternatives as alt, index}
					<div
						class="rounded-lg p-4 transition-all cursor-pointer"
						style="background-color: {index === selectedIndex ? 'rgba(59, 130, 246, 0.15)' : 'var(--card-bg)'}; border: 2px solid {index === selectedIndex ? '#3b82f6' : 'var(--border-color)'};"
						on:click={() => (selectedIndex = index)}
						on:keydown={(e) => e.key === 'Enter' && (selectedIndex = index)}
						role="button"
						tabindex="0"
					>
						<div class="flex items-start justify-between mb-3">
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-1">
									<span class="text-sm font-semibold" style="color: var(--foreground);">
										Option {index + 1}
										{#if index === 0}
											<span class="ml-2 px-2 py-0.5 text-xs rounded" style="background-color: rgba(16, 185, 129, 0.2); color: #10b981;">
												Best Match
											</span>
										{/if}
									</span>
								</div>

								<!-- Packages -->
								<div class="space-y-1">
									{#each alt.packages as pkg}
										<div class="text-sm" style="color: var(--text-secondary);">
											<span class="font-mono font-semibold">{pkg.quantity}x</span>
											{pkg.packageSize} {unit} package
											<span class="text-xs" style="color: var(--text-muted);">
												(NDC: {pkg.ndc})
											</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Efficiency Badge -->
							<div class="text-center ml-4">
								<div
									class="px-3 py-2 rounded-lg text-xs font-bold"
									style="background-color: {getEfficiencyColor(alt.efficiency)}20; color: {getEfficiencyColor(alt.efficiency)}; border: 2px solid {getEfficiencyColor(alt.efficiency)};"
								>
									{getEfficiencyLabel(alt.efficiency)}
								</div>
								<p class="text-xs mt-1" style="color: var(--text-muted);">
									{alt.efficiency.toFixed(1)}% efficient
								</p>
							</div>
						</div>

						<!-- Stats -->
						<div class="grid grid-cols-3 gap-3 pt-3" style="border-top: 1px solid var(--border-color);">
							<div>
								<p class="text-xs font-medium" style="color: var(--text-muted);">Total</p>
								<p class="text-lg font-bold" style="color: var(--foreground);">
									{alt.totalDispensed} {unit}
								</p>
							</div>
							<div>
								<p class="text-xs font-medium" style="color: var(--text-muted);">Needed</p>
								<p class="text-lg font-bold" style="color: #10b981;">
									{totalNeeded} {unit}
								</p>
							</div>
							<div>
								<p class="text-xs font-medium" style="color: var(--text-muted);">Overfill</p>
								<p class="text-lg font-bold" style="color: {alt.overfillPercentage > 20 ? '#f59e0b' : 'var(--foreground)'};">
									{alt.overfill} {unit}
								</p>
								<p class="text-xs" style="color: var(--text-muted);">
									({alt.overfillPercentage.toFixed(1)}%)
								</p>
							</div>
						</div>

						<!-- Number of Packages -->
						<div class="mt-3 p-2 rounded" style="background-color: rgba(59, 130, 246, 0.08);">
							<p class="text-xs" style="color: var(--text-secondary);">
								<span class="font-semibold">Packages to dispense:</span>
								{alt.packages.reduce((sum, p) => sum + p.quantity, 0)} total
								{#if alt.packages.length > 1}
									<span style="color: var(--text-muted);">
										({alt.packages.length} different sizes)
									</span>
								{/if}
							</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Comparison Summary -->
			<div class="mt-4 p-4 rounded-lg" style="background-color: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2);">
				<p class="text-sm font-medium mb-2" style="color: #3b82f6;">How to choose:</p>
				<ul class="text-sm space-y-1" style="color: var(--text-secondary);">
					<li class="flex items-start gap-2">
						<span style="color: #10b981;">•</span>
						<span><strong>Excellent</strong> options have minimal waste (&lt;5% overfill)</span>
					</li>
					<li class="flex items-start gap-2">
						<span style="color: #3b82f6;">•</span>
						<span><strong>Good</strong> options balance efficiency and simplicity</span>
					</li>
					<li class="flex items-start gap-2">
						<span style="color: #f59e0b;">•</span>
						<span><strong>Fair</strong> options may require multiple package sizes</span>
					</li>
					<li class="flex items-start gap-2">
						<span style="color: var(--text-muted);">•</span>
						<span>Consider inventory availability when selecting</span>
					</li>
				</ul>
			</div>
		{/if}
	</div>
{/if}

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
