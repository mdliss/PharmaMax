<script lang="ts">
	import type { PartialFillRecord } from '$lib/utils/patientStore';

	export let partialFills: PartialFillRecord[] = [];
	export let totalQuantityPrescribed: number = 0;
	export let drugName: string = '';
</script>

{#if partialFills && partialFills.length > 0}
	<div class="mt-6 p-4 rounded-lg" style="background-color: var(--background); border: 1px solid var(--border-color);">
		<h3 class="text-lg font-semibold mb-4" style="color: var(--foreground);">
			Partial Fill History
		</h3>

		<div class="mb-4 p-3 rounded" style="background-color: var(--card-bg); border: 1px solid var(--accent);">
			<div class="flex justify-between items-center">
				<span class="text-sm" style="color: var(--text-secondary);">Total Quantity Prescribed:</span>
				<span class="font-semibold" style="color: var(--foreground);">{totalQuantityPrescribed}</span>
			</div>
			<div class="flex justify-between items-center mt-2">
				<span class="text-sm" style="color: var(--text-secondary);">Remaining to Fill:</span>
				<span class="font-semibold text-lg" style="color: var(--accent);">
					{partialFills[partialFills.length - 1].quantityRemaining}
				</span>
			</div>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr style="border-bottom: 2px solid var(--border-color);">
						<th class="px-3 py-2 text-left font-semibold" style="color: var(--text-secondary);">Fill #</th>
						<th class="px-3 py-2 text-left font-semibold" style="color: var(--text-secondary);">Date</th>
						<th class="px-3 py-2 text-right font-semibold" style="color: var(--text-secondary);">Qty Dispensed</th>
						<th class="px-3 py-2 text-right font-semibold" style="color: var(--text-secondary);">Remaining</th>
						<th class="px-3 py-2 text-left font-semibold" style="color: var(--text-secondary);">Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each partialFills as fill}
						<tr style="border-bottom: 1px solid var(--border-color);">
							<td class="px-3 py-3" style="color: var(--foreground);">
								<span class="font-medium">#{fill.fillNumber}</span>
							</td>
							<td class="px-3 py-3" style="color: var(--text-secondary);">
								{new Date(fill.fillDate).toLocaleDateString()}
							</td>
							<td class="px-3 py-3 text-right font-medium" style="color: var(--foreground);">
								{fill.quantityDispensed}
							</td>
							<td class="px-3 py-3 text-right font-semibold" style="color: {fill.quantityRemaining > 0 ? 'var(--accent)' : 'var(--success)'};">
								{fill.quantityRemaining}
							</td>
							<td class="px-3 py-3 text-sm" style="color: var(--text-muted);">
								{fill.notes || '-'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if partialFills[partialFills.length - 1].quantityRemaining > 0}
			<div class="mt-4 p-3 rounded" style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
				<div class="flex items-start">
					<svg class="h-5 w-5 mr-2 flex-shrink-0" style="color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
					</svg>
					<div>
						<p class="text-sm font-medium" style="color: #f59e0b;">Partial Fill Alert</p>
						<p class="text-sm mt-1" style="color: var(--text-secondary);">
							This prescription has {partialFills[partialFills.length - 1].quantityRemaining} units remaining to be filled.
							Patient may request the remaining quantity at a later date.
						</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="mt-4 p-3 rounded" style="background-color: var(--success-bg); border: 1px solid var(--success);">
				<div class="flex items-start">
					<svg class="h-5 w-5 mr-2 flex-shrink-0" style="color: var(--success);" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
					</svg>
					<div>
						<p class="text-sm font-medium" style="color: var(--success);">Prescription Complete</p>
						<p class="text-sm mt-1" style="color: var(--text-secondary);">
							All {totalQuantityPrescribed} units have been dispensed across {partialFills.length} fills.
						</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}
