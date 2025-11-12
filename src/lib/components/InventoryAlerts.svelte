<script lang="ts">
	import { lowStockItems, outOfStockItems, inventoryStats } from '$lib/utils/inventoryStore';
	import { slide } from 'svelte/transition';

	let showAlerts = false;

	function toggleAlerts() {
		showAlerts = !showAlerts;
	}
</script>

{#if $outOfStockItems.length > 0 || $lowStockItems.length > 0}
	<div class="inventory-alerts mt-6 mb-6">
		<button
			type="button"
			on:click={toggleAlerts}
			class="w-full flex items-center justify-between p-4 rounded-lg hover:shadow-md transition-all"
			style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);"
		>
			<div class="flex items-center gap-3">
				<div class="text-left">
					<h3 class="font-bold" style="color: var(--foreground);">Inventory Alerts</h3>
					<p class="text-sm" style="color: var(--text-secondary);">
						{$outOfStockItems.length} out of stock, {$lowStockItems.length} low stock
					</p>
				</div>
			</div>
			<span style="color: var(--text-secondary);">{showAlerts ? '▼' : '▶'}</span>
		</button>

		{#if showAlerts}
			<div class="alerts-content mt-4 space-y-3" transition:slide>
				<!-- Out of Stock Items -->
				{#if $outOfStockItems.length > 0}
					<div class="alert-section">
						<h4 class="font-bold mb-2 flex items-center gap-2" style="color: #ef4444;">
							<span>Out of Stock ({$outOfStockItems.length})</span>
						</h4>
						<div class="space-y-2">
							{#each $outOfStockItems as item}
								<div class="rounded-lg p-3" style="background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3);">
									<div class="flex justify-between items-start">
										<div>
											<p class="font-semibold" style="color: var(--foreground);">{item.drugName}</p>
											<p class="text-xs" style="color: var(--text-secondary);">NDC: {item.ndc}</p>
											<p class="text-xs mt-1" style="color: #ef4444;">
												<strong>Quantity:</strong> {item.currentQuantity} {item.packageUnit}
											</p>
										</div>
										<span class="px-2 py-1 rounded text-xs font-bold" style="background-color: rgba(239, 68, 68, 0.2); color: #ef4444;">
											OUT
										</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Low Stock Items -->
				{#if $lowStockItems.length > 0}
					<div class="alert-section">
						<h4 class="font-bold mb-2 flex items-center gap-2" style="color: #f59e0b;">
							<span>Low Stock ({$lowStockItems.length})</span>
						</h4>
						<div class="space-y-2">
							{#each $lowStockItems as item}
								<div class="rounded-lg p-3" style="background-color: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3);">
									<div class="flex justify-between items-start">
										<div>
											<p class="font-semibold" style="color: var(--foreground);">{item.drugName}</p>
											<p class="text-xs" style="color: var(--text-secondary);">NDC: {item.ndc}</p>
											<p class="text-xs mt-1" style="color: #f59e0b;">
												<strong>Quantity:</strong> {item.currentQuantity} {item.packageUnit}
												<span class="ml-2">(Threshold: {item.minThreshold})</span>
											</p>
										</div>
										<span class="px-2 py-1 rounded text-xs font-bold" style="background-color: rgba(245, 158, 11, 0.2); color: #f59e0b;">
											LOW
										</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.inventory-alerts {
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
