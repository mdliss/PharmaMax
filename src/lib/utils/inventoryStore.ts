import { writable, derived } from 'svelte/store';

export type StockStatus = 'in-stock' | 'low' | 'out-of-stock';

export interface InventoryItem {
	ndc: string;
	drugName: string;
	packageSize: number;
	packageUnit: string;
	currentQuantity: number;
	minThreshold: number;
	status: StockStatus;
	lastUpdated: string;
	notes?: string;
}

const STORAGE_KEY = 'pharmamax_inventory';
const MAX_ITEMS = 1000;

/**
 * Inventory Store for tracking NDC package stock levels
 *
 * Features:
 * - Persistent storage using localStorage
 * - Automatic status calculation based on thresholds
 * - Low stock and out of stock warnings
 * - Stock adjustment history
 */
class InventoryStore {
	private items: Map<string, InventoryItem> = new Map();

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadFromStorage();
			this.initializeDemoData();
		}
	}

	/**
	 * Load inventory from localStorage
	 */
	private loadFromStorage(): void {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const data = JSON.parse(stored);
				if (Array.isArray(data)) {
					data.forEach((item: InventoryItem) => {
						this.items.set(item.ndc, item);
					});
				}
			}
		} catch (error) {
			console.error('Failed to load inventory from storage:', error);
		}
	}

	/**
	 * Initialize with demo data if inventory is empty
	 * Only runs once when inventory is first created
	 */
	private initializeDemoData(): void {
		// Only initialize if inventory is empty
		if (this.items.size > 0) return;

		const demoItems: Omit<InventoryItem, 'status' | 'lastUpdated'>[] = [
			// IN STOCK items (healthy quantities)
			{
				ndc: '00093-3147-01',
				drugName: 'Lisinopril 10mg Tablets',
				packageSize: 100,
				packageUnit: 'tablets',
				currentQuantity: 15,
				minThreshold: 5,
				notes: 'Common ACE inhibitor for blood pressure'
			},
			{
				ndc: '00378-0781-93',
				drugName: 'Metformin 500mg Tablets',
				packageSize: 100,
				packageUnit: 'tablets',
				currentQuantity: 20,
				minThreshold: 8,
				notes: 'Type 2 diabetes medication'
			},
			{
				ndc: '00071-0155-23',
				drugName: 'Atorvastatin 20mg Tablets',
				packageSize: 90,
				packageUnit: 'tablets',
				currentQuantity: 12,
				minThreshold: 4,
				notes: 'Cholesterol-lowering statin'
			},
			{
				ndc: '00093-0058-01',
				drugName: 'Amlodipine 5mg Tablets',
				packageSize: 100,
				packageUnit: 'tablets',
				currentQuantity: 18,
				minThreshold: 6,
				notes: 'Calcium channel blocker for hypertension'
			},

			// LOW STOCK items (at or near threshold)
			{
				ndc: '00378-6205-77',
				drugName: 'Omeprazole 20mg Capsules',
				packageSize: 30,
				packageUnit: 'capsules',
				currentQuantity: 3,
				minThreshold: 3,
				notes: 'Proton pump inhibitor for GERD'
			},
			{
				ndc: '00093-7214-56',
				drugName: 'Sertraline 50mg Tablets',
				packageSize: 100,
				packageUnit: 'tablets',
				currentQuantity: 2,
				minThreshold: 4,
				notes: 'SSRI antidepressant'
			},
			{
				ndc: '68180-0513-06',
				drugName: 'Levothyroxine 50mcg Tablets',
				packageSize: 90,
				packageUnit: 'tablets',
				currentQuantity: 5,
				minThreshold: 5,
				notes: 'Thyroid hormone replacement'
			},

			// OUT OF STOCK items
			{
				ndc: '00378-1805-93',
				drugName: 'Gabapentin 300mg Capsules',
				packageSize: 100,
				packageUnit: 'capsules',
				currentQuantity: 0,
				minThreshold: 5,
				notes: 'Nerve pain medication - NEEDS REORDER'
			},
			{
				ndc: '50111-0333-01',
				drugName: 'Hydrochlorothiazide 25mg Tablets',
				packageSize: 100,
				packageUnit: 'tablets',
				currentQuantity: 0,
				minThreshold: 6,
				notes: 'Diuretic for blood pressure - OUT OF STOCK'
			}
		];

		// Add all demo items
		demoItems.forEach(item => {
			const status = this.calculateStatus(item.currentQuantity, item.minThreshold);
			const inventoryItem: InventoryItem = {
				...item,
				status,
				lastUpdated: new Date().toISOString()
			};
			this.items.set(item.ndc, inventoryItem);
		});

		// Save to localStorage
		this.saveToStorage();
	}

	/**
	 * Save inventory to localStorage
	 */
	private saveToStorage(): boolean {
		try {
			const data = Array.from(this.items.values());
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			return true;
		} catch (error) {
			console.error('Failed to save inventory to storage:', error);
			return false;
		}
	}

	/**
	 * Calculate stock status based on current quantity and threshold
	 */
	private calculateStatus(quantity: number, threshold: number): StockStatus {
		if (quantity <= 0) return 'out-of-stock';
		if (quantity <= threshold) return 'low';
		return 'in-stock';
	}

	/**
	 * Add or update an inventory item
	 */
	addItem(item: Omit<InventoryItem, 'status' | 'lastUpdated'>): boolean {
		if (this.items.size >= MAX_ITEMS && !this.items.has(item.ndc)) {
			console.error('Inventory limit reached');
			return false;
		}

		const status = this.calculateStatus(item.currentQuantity, item.minThreshold);
		const inventoryItem: InventoryItem = {
			...item,
			status,
			lastUpdated: new Date().toISOString()
		};

		this.items.set(item.ndc, inventoryItem);
		return this.saveToStorage();
	}

	/**
	 * Update stock quantity for an NDC
	 */
	updateQuantity(ndc: string, quantity: number): boolean {
		const item = this.items.get(ndc);
		if (!item) return false;

		item.currentQuantity = Math.max(0, quantity);
		item.status = this.calculateStatus(item.currentQuantity, item.minThreshold);
		item.lastUpdated = new Date().toISOString();

		this.items.set(ndc, item);
		return this.saveToStorage();
	}

	/**
	 * Adjust stock quantity (add or subtract)
	 */
	adjustQuantity(ndc: string, adjustment: number): boolean {
		const item = this.items.get(ndc);
		if (!item) return false;

		return this.updateQuantity(ndc, item.currentQuantity + adjustment);
	}

	/**
	 * Update minimum threshold for low stock warning
	 */
	updateThreshold(ndc: string, threshold: number): boolean {
		const item = this.items.get(ndc);
		if (!item) return false;

		item.minThreshold = Math.max(0, threshold);
		item.status = this.calculateStatus(item.currentQuantity, item.minThreshold);
		item.lastUpdated = new Date().toISOString();

		this.items.set(ndc, item);
		return this.saveToStorage();
	}

	/**
	 * Get a specific inventory item by NDC
	 */
	getItem(ndc: string): InventoryItem | undefined {
		return this.items.get(ndc);
	}

	/**
	 * Get all inventory items
	 */
	getAllItems(): InventoryItem[] {
		return Array.from(this.items.values());
	}

	/**
	 * Get items by status
	 */
	getItemsByStatus(status: StockStatus): InventoryItem[] {
		return this.getAllItems().filter(item => item.status === status);
	}

	/**
	 * Search items by drug name
	 */
	searchByDrugName(query: string): InventoryItem[] {
		const lowerQuery = query.toLowerCase();
		return this.getAllItems().filter(item =>
			item.drugName.toLowerCase().includes(lowerQuery)
		);
	}

	/**
	 * Delete an inventory item
	 */
	deleteItem(ndc: string): boolean {
		const deleted = this.items.delete(ndc);
		if (deleted) {
			this.saveToStorage();
		}
		return deleted;
	}

	/**
	 * Clear all inventory items
	 */
	clearAll(): boolean {
		this.items.clear();
		return this.saveToStorage();
	}

	/**
	 * Get inventory statistics
	 */
	getStats() {
		const items = this.getAllItems();
		return {
			total: items.length,
			inStock: items.filter(i => i.status === 'in-stock').length,
			low: items.filter(i => i.status === 'low').length,
			outOfStock: items.filter(i => i.status === 'out-of-stock').length
		};
	}
}

// Create singleton instance
const inventoryStoreInstance = new InventoryStore();

// Create writable store for reactive updates
function createInventoryStore() {
	const { subscribe, set, update } = writable<InventoryItem[]>(
		inventoryStoreInstance.getAllItems()
	);

	// Helper function to trigger reactivity
	const triggerUpdate = () => {
		set(inventoryStoreInstance.getAllItems());
	};

	return {
		subscribe,
		addItem: (item: Omit<InventoryItem, 'status' | 'lastUpdated'>) => {
			const success = inventoryStoreInstance.addItem(item);
			if (success) triggerUpdate();
			return success;
		},
		updateQuantity: (ndc: string, quantity: number) => {
			const success = inventoryStoreInstance.updateQuantity(ndc, quantity);
			if (success) triggerUpdate();
			return success;
		},
		adjustQuantity: (ndc: string, adjustment: number) => {
			const success = inventoryStoreInstance.adjustQuantity(ndc, adjustment);
			if (success) triggerUpdate();
			return success;
		},
		updateThreshold: (ndc: string, threshold: number) => {
			const success = inventoryStoreInstance.updateThreshold(ndc, threshold);
			if (success) triggerUpdate();
			return success;
		},
		getItem: (ndc: string) => inventoryStoreInstance.getItem(ndc),
		getAllItems: () => inventoryStoreInstance.getAllItems(),
		getItemsByStatus: (status: StockStatus) => inventoryStoreInstance.getItemsByStatus(status),
		searchByDrugName: (query: string) => inventoryStoreInstance.searchByDrugName(query),
		deleteItem: (ndc: string) => {
			const success = inventoryStoreInstance.deleteItem(ndc);
			if (success) triggerUpdate();
			return success;
		},
		clearAll: () => {
			const success = inventoryStoreInstance.clearAll();
			if (success) triggerUpdate();
			return success;
		},
		getStats: () => inventoryStoreInstance.getStats(),
		refresh: triggerUpdate
	};
}

export const inventoryStore = createInventoryStore();

// Derived stores for specific statuses
export const lowStockItems = derived(inventoryStore, $items =>
	$items.filter(item => item.status === 'low')
);

export const outOfStockItems = derived(inventoryStore, $items =>
	$items.filter(item => item.status === 'out-of-stock')
);

export const inventoryStats = derived(inventoryStore, $items => {
	return {
		total: $items.length,
		inStock: $items.filter(i => i.status === 'in-stock').length,
		low: $items.filter(i => i.status === 'low').length,
		outOfStock: $items.filter(i => i.status === 'out-of-stock').length
	};
});
