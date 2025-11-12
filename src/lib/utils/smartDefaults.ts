/**
 * Smart Defaults Store
 * Remembers last used days supply per drug
 */

const STORAGE_KEY = 'pharmamax_smart_defaults';
const MAX_ENTRIES = 100;

interface DrugDefault {
	drugName: string;
	daysSupply: number;
	lastUsed: string;
}

export class SmartDefaultsStore {
	private defaults: Map<string, DrugDefault> = new Map();

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadFromStorage();
		}
	}

	/**
	 * Load defaults from localStorage
	 */
	private loadFromStorage(): void {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const data = JSON.parse(stored);
				if (Array.isArray(data)) {
					data.forEach((item: DrugDefault) => {
						this.defaults.set(item.drugName.toLowerCase(), item);
					});
				}
			}
		} catch (error) {
			console.error('Failed to load smart defaults from storage:', error);
		}
	}

	/**
	 * Save defaults to localStorage
	 */
	private saveToStorage(): boolean {
		try {
			const data = Array.from(this.defaults.values());
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			return true;
		} catch (error) {
			console.error('Failed to save smart defaults to storage:', error);
			return false;
		}
	}

	/**
	 * Normalize drug name for consistent lookups
	 */
	private normalizeDrugName(drugName: string): string {
		return drugName.toLowerCase().trim();
	}

	/**
	 * Remember the last used days supply for a drug
	 */
	rememberDaysSupply(drugName: string, daysSupply: number): boolean {
		if (!drugName || daysSupply <= 0) {
			return false;
		}

		const normalized = this.normalizeDrugName(drugName);

		// If we're at capacity, remove the oldest entry
		if (this.defaults.size >= MAX_ENTRIES && !this.defaults.has(normalized)) {
			const oldest = Array.from(this.defaults.values()).sort(
				(a, b) => new Date(a.lastUsed).getTime() - new Date(b.lastUsed).getTime()
			)[0];
			if (oldest) {
				this.defaults.delete(oldest.drugName.toLowerCase());
			}
		}

		this.defaults.set(normalized, {
			drugName,
			daysSupply,
			lastUsed: new Date().toISOString()
		});

		return this.saveToStorage();
	}

	/**
	 * Get the last used days supply for a drug
	 */
	getDaysSupply(drugName: string): number | null {
		if (!drugName) {
			return null;
		}

		const normalized = this.normalizeDrugName(drugName);
		const entry = this.defaults.get(normalized);

		return entry ? entry.daysSupply : null;
	}

	/**
	 * Clear all defaults
	 */
	clearAll(): boolean {
		this.defaults.clear();
		return this.saveToStorage();
	}

	/**
	 * Get all defaults sorted by most recent
	 */
	getAll(): DrugDefault[] {
		return Array.from(this.defaults.values()).sort(
			(a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
		);
	}
}

// Create singleton instance
export const smartDefaults = new SmartDefaultsStore();
