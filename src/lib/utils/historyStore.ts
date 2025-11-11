// History Store - Manages localStorage operations for prescription history
// Maintains a maximum of 50 entries with FIFO removal

export interface HistoryEntry {
	id: string;
	timestamp: number;
	drugInput: string;
	sig: string;
	daysSupply: number;
	result: any; // The full calculation result
	isFavorite?: boolean;
}

const STORAGE_KEY = 'pharmamax_history';
const MAX_ENTRIES = 50;

export class HistoryStore {
	/**
	 * Save a calculation to history
	 */
	static save(drugInput: string, sig: string, daysSupply: number, result: any): boolean {
		try {
			const history = this.getAll();

			const entry: HistoryEntry = {
				id: crypto.randomUUID(),
				timestamp: Date.now(),
				drugInput,
				sig,
				daysSupply,
				result
			};

			// Add new entry at the beginning
			history.unshift(entry);

			// Remove oldest entries if we exceed the limit (FIFO)
			if (history.length > MAX_ENTRIES) {
				history.splice(MAX_ENTRIES);
			}

			// Save to localStorage
			localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
			return true;
		} catch (error) {
			// Handle localStorage quota exceeded or other errors
			console.error('Failed to save to history:', error);

			if (error instanceof DOMException && error.name === 'QuotaExceededError') {
				// Try to make space by removing oldest entries
				try {
					const history = this.getAll();
					// Remove half of the entries to free up space
					const reducedHistory = history.slice(0, Math.floor(MAX_ENTRIES / 2));
					localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedHistory));

					// Try saving again
					return this.save(drugInput, sig, daysSupply, result);
				} catch (retryError) {
					console.error('Failed to save even after clearing space:', retryError);
					return false;
				}
			}
			return false;
		}
	}

	/**
	 * Get all history entries
	 */
	static getAll(): HistoryEntry[] {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) return [];
			return JSON.parse(data) as HistoryEntry[];
		} catch (error) {
			console.error('Failed to retrieve history:', error);
			return [];
		}
	}

	/**
	 * Get a single history entry by ID
	 */
	static getById(id: string): HistoryEntry | null {
		const history = this.getAll();
		return history.find(entry => entry.id === id) || null;
	}

	/**
	 * Clear all history
	 */
	static clear(): boolean {
		try {
			localStorage.removeItem(STORAGE_KEY);
			return true;
		} catch (error) {
			console.error('Failed to clear history:', error);
			return false;
		}
	}

	/**
	 * Delete a specific entry by ID
	 */
	static delete(id: string): boolean {
		try {
			const history = this.getAll();
			const filtered = history.filter(entry => entry.id !== id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
			return true;
		} catch (error) {
			console.error('Failed to delete history entry:', error);
			return false;
		}
	}

	/**
	 * Check if localStorage is available and has space
	 */
	static isAvailable(): boolean {
		try {
			const test = '__storage_test__';
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Get the count of history entries
	 */
	static getCount(): number {
		return this.getAll().length;
	}

	/**
	 * Toggle favorite status for an entry
	 */
	static toggleFavorite(id: string): boolean {
		try {
			const history = this.getAll();
			const entry = history.find(e => e.id === id);

			if (!entry) return false;

			entry.isFavorite = !entry.isFavorite;
			localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
			return true;
		} catch (error) {
			console.error('Failed to toggle favorite:', error);
			return false;
		}
	}

	/**
	 * Get favorite entries
	 */
	static getFavorites(): HistoryEntry[] {
		return this.getAll().filter(entry => entry.isFavorite);
	}

	/**
	 * Update an existing entry
	 */
	static update(id: string, updates: Partial<HistoryEntry>): boolean {
		try {
			const history = this.getAll();
			const index = history.findIndex(e => e.id === id);

			if (index === -1) return false;

			history[index] = { ...history[index], ...updates };
			localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
			return true;
		} catch (error) {
			console.error('Failed to update entry:', error);
			return false;
		}
	}

	/**
	 * Export history to CSV format
	 */
	static exportToCSV(columns: string[] = ['timestamp', 'drugInput', 'sig', 'daysSupply']): string {
		const history = this.getAll();

		if (history.length === 0) {
			return '';
		}

		// Create header row
		const headers = columns.map(col => {
			switch (col) {
				case 'timestamp': return 'Date';
				case 'drugInput': return 'Drug';
				case 'sig': return 'SIG';
				case 'daysSupply': return 'Days Supply';
				case 'isFavorite': return 'Favorite';
				default: return col;
			}
		});

		const csvRows = [headers.join(',')];

		// Create data rows
		history.forEach(entry => {
			const row = columns.map(col => {
				let value: any;
				switch (col) {
					case 'timestamp':
						value = new Date(entry.timestamp).toLocaleString();
						break;
					case 'isFavorite':
						value = entry.isFavorite ? 'Yes' : 'No';
						break;
					default:
						value = entry[col as keyof HistoryEntry] || '';
				}
				// Escape commas and quotes
				const stringValue = String(value);
				return stringValue.includes(',') || stringValue.includes('"')
					? `"${stringValue.replace(/"/g, '""')}"`
					: stringValue;
			});
			csvRows.push(row.join(','));
		});

		return csvRows.join('\n');
	}

	/**
	 * Delete multiple entries by IDs
	 */
	static bulkDelete(ids: string[]): boolean {
		try {
			const history = this.getAll();
			const filtered = history.filter(entry => !ids.includes(entry.id));
			localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
			return true;
		} catch (error) {
			console.error('Failed to bulk delete entries:', error);
			return false;
		}
	}
}
