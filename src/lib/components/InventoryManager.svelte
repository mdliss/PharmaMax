<script lang="ts">
	import { inventoryStore, inventoryStats, type InventoryItem } from '$lib/utils/inventoryStore';
	import DrugAutocomplete from './DrugAutocomplete.svelte';
	import { onMount } from 'svelte';

	let items: InventoryItem[] = [];
	let showManager = false;
	let activeTab: 'add' | 'manage' | 'stats' = 'add';

	// Add new item form
	let newItem = {
		ndc: '',
		drugName: '',
		packageSize: 1,
		packageUnit: 'bottle',
		currentQuantity: 0,
		minThreshold: 10,
		notes: ''
	};

	// Edit mode
	let editingNdc: string | null = null;
	let editQuantity: number = 0;
	let editThreshold: number = 0;

	// Search
	let searchQuery = '';
	let filteredItems: InventoryItem[] = [];

	inventoryStore.subscribe(value => {
		items = value;
		filterItems();
	});

	onMount(() => {
		filterItems();
	});

	function filterItems() {
		if (searchQuery.trim() === '') {
			filteredItems = items;
		} else {
			filteredItems = inventoryStore.searchByDrugName(searchQuery);
		}
	}

	function handleDrugSelect(event: CustomEvent) {
		const drugInfo = event.detail;
		newItem.drugName = drugInfo.name;
		// Try to extract NDC from drug info if available
		if (drugInfo.ndc) {
			newItem.ndc = drugInfo.ndc;
		}
	}

	function addItem() {
		if (!newItem.ndc || !newItem.drugName) {
			alert('NDC and Drug Name are required');
			return;
		}

		const success = inventoryStore.addItem({
			ndc: newItem.ndc,
			drugName: newItem.drugName,
			packageSize: newItem.packageSize,
			packageUnit: newItem.packageUnit,
			currentQuantity: newItem.currentQuantity,
			minThreshold: newItem.minThreshold,
			notes: newItem.notes
		});

		if (success) {
			// Reset form
			newItem = {
				ndc: '',
				drugName: '',
				packageSize: 1,
				packageUnit: 'bottle',
				currentQuantity: 0,
				minThreshold: 10,
				notes: ''
			};
			activeTab = 'manage';
		} else {
			alert('Failed to add item. Inventory may be full.');
		}
	}

	function startEdit(item: InventoryItem) {
		editingNdc = item.ndc;
		editQuantity = item.currentQuantity;
		editThreshold = item.minThreshold;
	}

	function cancelEdit() {
		editingNdc = null;
	}

	function saveEdit(ndc: string) {
		inventoryStore.updateQuantity(ndc, editQuantity);
		inventoryStore.updateThreshold(ndc, editThreshold);
		editingNdc = null;
	}

	function adjustStock(ndc: string, adjustment: number) {
		inventoryStore.adjustQuantity(ndc, adjustment);
	}

	function deleteItem(ndc: string) {
		if (confirm('Are you sure you want to delete this item from inventory?')) {
			inventoryStore.deleteItem(ndc);
		}
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'out-of-stock':
				return 'bg-red-100 text-red-800';
			case 'low':
				return 'bg-yellow-100 text-yellow-800';
			case 'in-stock':
				return 'bg-green-100 text-green-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function toggleManager() {
		showManager = !showManager;
	}
</script>

<div class="inventory-manager">
	<button
		type="button"
		on:click={toggleManager}
		class="manager-toggle btn-primary px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl font-medium"
	>
		{showManager ? 'Hide' : 'Open'} Inventory Manager
		{#if $inventoryStats.total > 0}
			<span class="badge">{$inventoryStats.total}</span>
		{/if}
	</button>

	{#if showManager}
		<div class="manager-panel rounded-xl shadow-xl p-6 mt-4" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
			<div class="header flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold" style="color: var(--foreground);">
					Smart Inventory Tracker
				</h2>
			</div>

			<!-- Tab Navigation -->
			<div class="tabs flex gap-2 mb-6" style="border-bottom: 1px solid var(--border-color);">
				<button
					type="button"
					on:click={() => activeTab = 'add'}
					class="px-4 py-2 font-medium transition-all"
					style="{activeTab === 'add' ? `color: var(--accent); border-bottom: 2px solid var(--accent);` : `color: var(--text-secondary);`}"
				>
					Add Item
				</button>
				<button
					type="button"
					on:click={() => activeTab = 'manage'}
					class="px-4 py-2 font-medium transition-all"
					style="{activeTab === 'manage' ? `color: var(--accent); border-bottom: 2px solid var(--accent);` : `color: var(--text-secondary);`}"
				>
					Manage Stock
				</button>
				<button
					type="button"
					on:click={() => activeTab = 'stats'}
					class="px-4 py-2 font-medium transition-all"
					style="{activeTab === 'stats' ? `color: var(--accent); border-bottom: 2px solid var(--accent);` : `color: var(--text-secondary);`}"
				>
					Statistics
				</button>
			</div>

			<!-- Add Item Tab -->
			{#if activeTab === 'add'}
				<div class="add-item-form rounded-lg p-6" style="background-color: var(--background);">
					<h3 class="text-lg font-bold mb-4" style="color: var(--foreground);">Add New Inventory Item</h3>
					<div class="grid gap-4">
						<div class="form-group">
							<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
								Drug Name *
							</label>
							<DrugAutocomplete
								on:select={handleDrugSelect}
								placeholder="Search for medication..."
							/>
							{#if newItem.drugName}
								<p class="text-sm mt-1" style="color: var(--accent);">{newItem.drugName}</p>
							{/if}
						</div>

						<div class="form-group">
							<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
								NDC Code *
							</label>
							<input
								type="text"
								bind:value={newItem.ndc}
								placeholder="e.g., 12345-678-90"
								class="input-text w-full px-4 py-2 rounded-lg transition-all"
							/>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="form-group">
								<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
									Package Size
								</label>
								<input
									type="number"
									bind:value={newItem.packageSize}
									min="1"
									class="input-text w-full px-4 py-2 rounded-lg transition-all"
								/>
							</div>

							<div class="form-group">
								<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
									Package Unit
								</label>
								<select
									bind:value={newItem.packageUnit}
									class="input-select w-full px-4 py-2 rounded-lg transition-all"
								>
									<option value="bottle">Bottle</option>
									<option value="box">Box</option>
									<option value="vial">Vial</option>
									<option value="package">Package</option>
									<option value="unit">Unit</option>
								</select>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="form-group">
								<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
									Current Quantity
								</label>
								<input
									type="number"
									bind:value={newItem.currentQuantity}
									min="0"
									class="input-text w-full px-4 py-2 rounded-lg transition-all"
								/>
							</div>

							<div class="form-group">
								<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
									Min Threshold (Low Stock Alert)
								</label>
								<input
									type="number"
									bind:value={newItem.minThreshold}
									min="1"
									class="input-text w-full px-4 py-2 rounded-lg transition-all"
								/>
							</div>
						</div>

						<div class="form-group">
							<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
								Notes (Optional)
							</label>
							<textarea
								bind:value={newItem.notes}
								placeholder="Additional notes..."
								rows="2"
								class="input-textarea w-full px-4 py-2 rounded-lg transition-all"
							/>
						</div>

						<button
							type="button"
							on:click={addItem}
							class="btn-primary w-full px-6 py-3 rounded-lg font-medium"
						>
							Add to Inventory
						</button>
					</div>
				</div>
			{/if}

			<!-- Manage Stock Tab -->
			{#if activeTab === 'manage'}
				<div class="manage-stock">
					<!-- Search -->
					<div class="mb-4">
						<input
							type="text"
							bind:value={searchQuery}
							on:input={filterItems}
							placeholder="🔍 Search by drug name..."
							class="input-text w-full px-4 py-2 rounded-lg transition-all"
						/>
					</div>

					{#if filteredItems.length === 0}
						<div class="text-center py-8" style="color: var(--text-muted);">
							<p class="text-lg">No inventory items found</p>
							<p class="text-sm mt-2">Add items using the "Add Item" tab</p>
						</div>
					{:else}
						<div class="space-y-3">
							{#each filteredItems as item}
								<div class="inventory-item card-hover rounded-lg p-4 transition-all" style="background-color: var(--background); border: 1px solid var(--border-color);">
									<div class="flex justify-between items-start mb-2">
										<div>
											<h4 class="font-bold" style="color: var(--foreground);">{item.drugName}</h4>
											<p class="text-sm" style="color: var(--text-secondary);">NDC: {item.ndc}</p>
											<p class="text-xs mt-1" style="color: var(--text-muted);">
												{item.packageSize} {item.packageUnit}
											</p>
										</div>
										<span class="px-3 py-1 rounded-full text-xs font-bold {getStatusColor(item.status)}">
											{item.status.toUpperCase().replace('-', ' ')}
										</span>
									</div>

									{#if editingNdc === item.ndc}
										<!-- Edit Mode -->
										<div class="edit-mode rounded-lg p-3 mt-3" style="background-color: var(--card-bg); border: 1px solid var(--accent);">
											<div class="grid grid-cols-2 gap-3 mb-3">
												<div>
													<label class="block text-xs font-semibold mb-1" style="color: var(--text-secondary);">
														Quantity
													</label>
													<input
														type="number"
														bind:value={editQuantity}
														min="0"
														class="input-text w-full px-3 py-2 rounded-lg"
													/>
												</div>
												<div>
													<label class="block text-xs font-semibold mb-1" style="color: var(--text-secondary);">
														Threshold
													</label>
													<input
														type="number"
														bind:value={editThreshold}
														min="1"
														class="input-text w-full px-3 py-2 rounded-lg"
													/>
												</div>
											</div>
											<div class="flex gap-2">
												<button
													type="button"
													on:click={() => saveEdit(item.ndc)}
													class="btn-primary flex-1 px-4 py-2 rounded-lg text-sm font-medium"
												>
													Save
												</button>
												<button
													type="button"
													on:click={cancelEdit}
													class="btn-secondary flex-1 px-4 py-2 rounded-lg text-sm font-medium"
												>
													Cancel
												</button>
											</div>
										</div>
									{:else}
										<!-- View Mode -->
										<div class="view-mode mt-3">
											<div class="grid grid-cols-2 gap-2 mb-3 text-sm">
												<div>
													<span style="color: var(--text-secondary);">Quantity:</span>
													<span class="font-bold ml-1" style="color: var(--foreground);">{item.currentQuantity}</span>
												</div>
												<div>
													<span style="color: var(--text-secondary);">Threshold:</span>
													<span class="font-bold ml-1" style="color: var(--foreground);">{item.minThreshold}</span>
												</div>
											</div>

											<!-- Quick Adjust Buttons -->
											<div class="flex gap-2 mb-2">
												<button
													type="button"
													on:click={() => adjustStock(item.ndc, -1)}
													class="flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
													style="background-color: #ef4444; color: white;"
												>
													-1
												</button>
												<button
													type="button"
													on:click={() => adjustStock(item.ndc, -10)}
													class="flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
													style="background-color: #ef4444; color: white;"
												>
													-10
												</button>
												<button
													type="button"
													on:click={() => adjustStock(item.ndc, 10)}
													class="btn-primary flex-1 px-3 py-2 rounded-lg text-sm font-medium"
												>
													+10
												</button>
												<button
													type="button"
													on:click={() => adjustStock(item.ndc, 1)}
													class="btn-primary flex-1 px-3 py-2 rounded-lg text-sm font-medium"
												>
													+1
												</button>
											</div>

											<div class="flex gap-2">
												<button
													type="button"
													on:click={() => startEdit(item)}
													class="btn-primary flex-1 px-4 py-2 rounded-lg text-sm font-medium"
												>
													Edit
												</button>
												<button
													type="button"
													on:click={() => deleteItem(item.ndc)}
													class="btn-secondary flex-1 px-4 py-2 rounded-lg text-sm font-medium"
												>
													Delete
												</button>
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Statistics Tab -->
			{#if activeTab === 'stats'}
				<div class="stats rounded-lg p-6" style="background-color: var(--background);">
					<h3 class="text-lg font-bold mb-4" style="color: var(--foreground);">Inventory Statistics</h3>
					<div class="grid grid-cols-2 gap-4">
						<div class="stat-card rounded-lg p-4" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
							<p class="text-sm" style="color: var(--text-secondary);">Total Items</p>
							<p class="text-3xl font-bold" style="color: var(--accent);">{$inventoryStats.total}</p>
						</div>
						<div class="stat-card rounded-lg p-4" style="background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3);">
							<p class="text-sm" style="color: var(--text-secondary);">In Stock</p>
							<p class="text-3xl font-bold" style="color: #10b981;">{$inventoryStats.inStock}</p>
						</div>
						<div class="stat-card rounded-lg p-4" style="background-color: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3);">
							<p class="text-sm" style="color: var(--text-secondary);">Low Stock</p>
							<p class="text-3xl font-bold" style="color: #f59e0b;">{$inventoryStats.low}</p>
						</div>
						<div class="stat-card rounded-lg p-4" style="background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3);">
							<p class="text-sm" style="color: var(--text-secondary);">Out of Stock</p>
							<p class="text-3xl font-bold" style="color: #ef4444;">{$inventoryStats.outOfStock}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.manager-toggle {
		position: relative;
	}

	.badge {
		position: absolute;
		top: -8px;
		right: -8px;
		background: #ef4444;
		color: white;
		border-radius: 9999px;
		padding: 2px 8px;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.inventory-item {
		transition: all 0.2s;
	}

	.inventory-item:hover {
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
	}
</style>
