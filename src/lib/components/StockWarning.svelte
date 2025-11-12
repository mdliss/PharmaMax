<script lang="ts">
	import { inventoryStore, type StockStatus } from '$lib/utils/inventoryStore';
	import { onMount } from 'svelte';

	export let ndc: string;
	export let drugName: string = '';
	export let showInline: boolean = false;

	let stockStatus: StockStatus | null = null;
	let quantity: number = 0;
	let threshold: number = 0;

	onMount(() => {
		checkStock();
	});

	function checkStock() {
		const item = inventoryStore.getItem(ndc);
		if (item) {
			stockStatus = item.status;
			quantity = item.currentQuantity;
			threshold = item.minThreshold;
		} else {
			stockStatus = null;
		}
	}

	function getStatusColor(status: StockStatus): string {
		// Using inline styles instead of Tailwind classes for theme consistency
		return '';
	}

	function getStatusStyle(status: StockStatus): string {
		switch (status) {
			case 'out-of-stock':
				return 'background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);';
			case 'low':
				return 'background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);';
			case 'in-stock':
				return 'background-color: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);';
		}
	}

	function getCardStyle(status: StockStatus): string {
		switch (status) {
			case 'out-of-stock':
				return 'background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3);';
			case 'low':
				return 'background-color: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3);';
			case 'in-stock':
				return 'background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3);';
		}
	}

	function getStatusIcon(status: StockStatus): string {
		switch (status) {
			case 'out-of-stock':
				return '';
			case 'low':
				return '';
			case 'in-stock':
				return '';
		}
	}

	function getStatusMessage(status: StockStatus): string {
		switch (status) {
			case 'out-of-stock':
				return `OUT OF STOCK - NDC ${ndc} is currently unavailable`;
			case 'low':
				return `LOW STOCK - Only ${quantity} package${quantity !== 1 ? 's' : ''} remaining (threshold: ${threshold})`;
			case 'in-stock':
				return `In Stock - ${quantity} package${quantity !== 1 ? 's' : ''} available`;
		}
	}
</script>

{#if showInline}
	{#if stockStatus}
		<!-- Inline badge style -->
		<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style="{getStatusStyle(stockStatus)}">
			{getStatusIcon(stockStatus)} {stockStatus.toUpperCase().replace('-', ' ')}
		</span>
	{:else}
		<!-- Not tracked badge -->
		<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--border-color); color: var(--text-muted);">
			Not Tracked
		</span>
	{/if}
{:else if stockStatus === 'out-of-stock' || stockStatus === 'low'}
	<!-- Full warning card for low/out of stock -->
	<div class="stock-warning rounded-lg p-4 my-4" style="{getCardStyle(stockStatus)}">
		<div class="flex items-start">
			<div class="flex-1">
				<h4 class="font-bold text-lg mb-1" style="color: var(--foreground);">
					{stockStatus === 'out-of-stock' ? 'Out of Stock Alert' : 'Low Stock Warning'}
				</h4>
				<p class="text-sm mb-2" style="color: var(--text-secondary);">{getStatusMessage(stockStatus)}</p>
				{#if drugName}
					<p class="text-xs font-medium" style="color: var(--text-secondary);">Drug: {drugName}</p>
				{/if}
				<p class="text-xs font-medium" style="color: var(--text-secondary);">NDC: {ndc}</p>
				{#if stockStatus === 'out-of-stock'}
					<p class="text-xs mt-2 font-semibold" style="color: #ef4444;">
						This package cannot be recommended until restocked
					</p>
				{:else}
					<p class="text-xs mt-2 font-semibold" style="color: #f59e0b;">
						Consider restocking soon to avoid running out
					</p>
				{/if}
			</div>
		</div>
	</div>
{:else if stockStatus}
	<!-- In-stock indicator for recommended packages -->
	<div class="rounded p-2 mt-2 flex items-center gap-2" style="background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
		<svg class="w-4 h-4 flex-shrink-0" style="color: #10b981;" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
		</svg>
		<span class="text-xs font-medium" style="color: #10b981;">
			In Stock: {quantity} package{quantity !== 1 ? 's' : ''} available
		</span>
	</div>
{/if}

<style>
	.stock-warning {
		animation: fadeIn 0.3s ease-in;
	}

	@keyframes fadeIn {
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
