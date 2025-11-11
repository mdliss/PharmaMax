import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { HistoryStore } from './historyStore';

// Mock localStorage
class LocalStorageMock {
	private store: Record<string, string> = {};

	getItem(key: string): string | null {
		return this.store[key] || null;
	}

	setItem(key: string, value: string): void {
		this.store[key] = value;
	}

	removeItem(key: string): void {
		delete this.store[key];
	}

	clear(): void {
		this.store = {};
	}

	get length(): number {
		return Object.keys(this.store).length;
	}

	key(index: number): string | null {
		return Object.keys(this.store)[index] || null;
	}
}

const localStorageMock = new LocalStorageMock();

// Mock crypto.randomUUID
const mockUUID = vi.fn(() => 'test-uuid-' + Date.now());
Object.defineProperty(global, 'crypto', {
	value: { randomUUID: mockUUID },
	writable: true
});

describe('HistoryStore', () => {
	beforeEach(() => {
		// Set up localStorage mock
		localStorageMock.clear();
		global.localStorage = localStorageMock as any;
		mockUUID.mockClear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		localStorageMock.clear();
	});

	describe('save', () => {
		it('should save a new entry to history', () => {
			const result = HistoryStore.save('Lisinopril', 'Take 1 tablet daily', 30, { test: 'data' });

			expect(result).toBe(true);

			const history = HistoryStore.getAll();
			expect(history).toHaveLength(1);
			expect(history[0].drugInput).toBe('Lisinopril');
			expect(history[0].sig).toBe('Take 1 tablet daily');
			expect(history[0].daysSupply).toBe(30);
			expect(history[0].result).toEqual({ test: 'data' });
		});

		it('should add new entries at the beginning', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });
			HistoryStore.save('Drug2', 'SIG2', 60, { id: 2 });

			const history = HistoryStore.getAll();
			expect(history).toHaveLength(2);
			expect(history[0].drugInput).toBe('Drug2'); // Most recent first
			expect(history[1].drugInput).toBe('Drug1');
		});

		it('should enforce max entries limit (FIFO)', () => {
			// Save more than MAX_ENTRIES (50)
			for (let i = 0; i < 55; i++) {
				HistoryStore.save(`Drug${i}`, `SIG${i}`, 30, { id: i });
			}

			const history = HistoryStore.getAll();
			expect(history).toHaveLength(50); // Should be capped at 50
			expect(history[0].drugInput).toBe('Drug54'); // Most recent
			expect(history[49].drugInput).toBe('Drug5'); // Oldest kept (0-4 removed)
		});

		it('should handle localStorage quota exceeded', () => {
			// Mock setItem to throw QuotaExceededError
			const originalSetItem = localStorageMock.setItem.bind(localStorageMock);
			let callCount = 0;

			localStorageMock.setItem = (key: string, value: string) => {
				callCount++;
				if (callCount === 1) {
					const error = new DOMException('Quota exceeded', 'QuotaExceededError');
					throw error;
				}
				// Subsequent calls succeed
				originalSetItem(key, value);
			};

			const result = HistoryStore.save('Drug', 'SIG', 30, { test: 'large' });

			expect(result).toBe(true);
			// Called once (failed), then called twice more (reduce history + retry)
			expect(callCount).toBeGreaterThanOrEqual(2);

			// Restore
			localStorageMock.setItem = originalSetItem;
		});

		it('should return false on persistent errors', () => {
			// Mock setItem to always throw
			const originalSetItem = localStorageMock.setItem.bind(localStorageMock);
			localStorageMock.setItem = () => {
				throw new Error('Storage error');
			};

			const result = HistoryStore.save('Drug', 'SIG', 30, { test: 'data' });

			expect(result).toBe(false);

			// Restore
			localStorageMock.setItem = originalSetItem;
		});
	});

	describe('getAll', () => {
		it('should return empty array when no history', () => {
			const history = HistoryStore.getAll();
			expect(history).toEqual([]);
		});

		it('should return all history entries', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });
			HistoryStore.save('Drug2', 'SIG2', 60, { id: 2 });

			const history = HistoryStore.getAll();
			expect(history).toHaveLength(2);
		});

		it('should handle corrupted localStorage data', () => {
			localStorageMock.setItem('pharmamax_history', 'invalid json');

			const history = HistoryStore.getAll();
			expect(history).toEqual([]);
		});

		it('should handle localStorage read errors', () => {
			const originalGetItem = localStorageMock.getItem.bind(localStorageMock);
			localStorageMock.getItem = () => {
				throw new Error('Read error');
			};

			const history = HistoryStore.getAll();
			expect(history).toEqual([]);

			// Restore
			localStorageMock.getItem = originalGetItem;
		});
	});

	describe('getById', () => {
		it('should return entry by ID', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });
			HistoryStore.save('Drug2', 'SIG2', 60, { id: 2 });

			const history = HistoryStore.getAll();
			const entry = HistoryStore.getById(history[0].id);

			expect(entry).not.toBeNull();
			expect(entry?.drugInput).toBe('Drug2');
		});

		it('should return null for non-existent ID', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });

			const entry = HistoryStore.getById('non-existent-id');
			expect(entry).toBeNull();
		});
	});

	describe('clear', () => {
		it('should clear all history', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });
			HistoryStore.save('Drug2', 'SIG2', 60, { id: 2 });

			expect(HistoryStore.getAll()).toHaveLength(2);

			const result = HistoryStore.clear();
			expect(result).toBe(true);
			expect(HistoryStore.getAll()).toEqual([]);
		});

		it('should handle clear errors', () => {
			const originalRemoveItem = localStorageMock.removeItem.bind(localStorageMock);
			localStorageMock.removeItem = () => {
				throw new Error('Remove error');
			};

			const result = HistoryStore.clear();
			expect(result).toBe(false);

			// Restore
			localStorageMock.removeItem = originalRemoveItem;
		});
	});

	describe('delete', () => {
		it('should delete a specific entry', () => {
			// First ensure we have a clean slate
			localStorageMock.clear();

			// Add test data
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });
			HistoryStore.save('Drug2', 'SIG2', 60, { id: 2 });
			HistoryStore.save('Drug3', 'SIG3', 90, { id: 3 });

			let history = HistoryStore.getAll();
			expect(history.length).toBeGreaterThanOrEqual(3);

			// Delete the middle one
			const idToDelete = history[1].id;
			const result = HistoryStore.delete(idToDelete);
			expect(result).toBe(true);

			// Check that it was deleted
			history = HistoryStore.getAll();
			const deletedItem = history.find(h => h.id === idToDelete);
			expect(deletedItem).toBeUndefined();
		});

		it('should handle delete errors', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });

			const originalSetItem = localStorageMock.setItem.bind(localStorageMock);
			localStorageMock.setItem = () => {
				throw new Error('Write error');
			};

			const history = HistoryStore.getAll();
			const result = HistoryStore.delete(history[0].id);
			expect(result).toBe(false);

			// Restore
			localStorageMock.setItem = originalSetItem;
		});

		it('should handle deleting non-existent entry', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });

			const result = HistoryStore.delete('non-existent');
			expect(result).toBe(true); // Still succeeds, just doesn't delete anything

			expect(HistoryStore.getAll()).toHaveLength(1);
		});
	});

	describe('isAvailable', () => {
		it('should return true when localStorage is available', () => {
			expect(HistoryStore.isAvailable()).toBe(true);
		});

		it('should return false when localStorage is not available', () => {
			const originalSetItem = localStorageMock.setItem.bind(localStorageMock);
			localStorageMock.setItem = () => {
				throw new Error('Not available');
			};

			expect(HistoryStore.isAvailable()).toBe(false);

			// Restore
			localStorageMock.setItem = originalSetItem;
		});
	});

	describe('getCount', () => {
		it('should return 0 for empty history', () => {
			expect(HistoryStore.getCount()).toBe(0);
		});

		it('should return correct count', () => {
			HistoryStore.save('Drug1', 'SIG1', 30, { id: 1 });
			HistoryStore.save('Drug2', 'SIG2', 60, { id: 2 });
			HistoryStore.save('Drug3', 'SIG3', 90, { id: 3 });

			expect(HistoryStore.getCount()).toBe(3);
		});
	});
});
