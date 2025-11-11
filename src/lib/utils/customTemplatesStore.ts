/**
 * Custom SIG Templates Store
 * Manages user-defined SIG templates in localStorage
 */

import type { SIGTemplate } from '$lib/data/sigTemplates';

const STORAGE_KEY = 'pharmamax_custom_sig_templates';
const MAX_CUSTOM_TEMPLATES = 50;

export interface CustomTemplate extends Omit<SIGTemplate, 'id'> {
	id?: string;
	createdAt: number;
	usageCount: number;
}

export class CustomTemplatesStore {
	/**
	 * Save a new custom template
	 */
	static save(template: Omit<CustomTemplate, 'id' | 'createdAt' | 'usageCount'>): boolean {
		try {
			const templates = this.getAll();

			const newTemplate: CustomTemplate = {
				...template,
				id: `custom-${crypto.randomUUID()}`,
				createdAt: Date.now(),
				usageCount: 0
			};

			templates.unshift(newTemplate);

			// Limit to max templates
			if (templates.length > MAX_CUSTOM_TEMPLATES) {
				templates.splice(MAX_CUSTOM_TEMPLATES);
			}

			localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
			return true;
		} catch (error) {
			console.error('Failed to save custom template:', error);
			return false;
		}
	}

	/**
	 * Get all custom templates
	 */
	static getAll(): CustomTemplate[] {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) return [];
			return JSON.parse(data) as CustomTemplate[];
		} catch (error) {
			console.error('Failed to retrieve custom templates:', error);
			return [];
		}
	}

	/**
	 * Get a template by ID
	 */
	static getById(id: string): CustomTemplate | null {
		const templates = this.getAll();
		return templates.find(t => t.id === id) || null;
	}

	/**
	 * Update a custom template
	 */
	static update(id: string, updates: Partial<CustomTemplate>): boolean {
		try {
			const templates = this.getAll();
			const index = templates.findIndex(t => t.id === id);

			if (index === -1) return false;

			templates[index] = {
				...templates[index],
				...updates
			};

			localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
			return true;
		} catch (error) {
			console.error('Failed to update custom template:', error);
			return false;
		}
	}

	/**
	 * Increment usage count for a template
	 */
	static incrementUsage(id: string): boolean {
		const template = this.getById(id);
		if (!template) return false;

		return this.update(id, {
			usageCount: (template.usageCount || 0) + 1
		});
	}

	/**
	 * Delete a custom template
	 */
	static delete(id: string): boolean {
		try {
			const templates = this.getAll();
			const filtered = templates.filter(t => t.id !== id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
			return true;
		} catch (error) {
			console.error('Failed to delete custom template:', error);
			return false;
		}
	}

	/**
	 * Get most frequently used templates
	 */
	static getMostUsed(limit: number = 5): CustomTemplate[] {
		const templates = this.getAll();
		return templates
			.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
			.slice(0, limit);
	}

	/**
	 * Clear all custom templates
	 */
	static clear(): boolean {
		try {
			localStorage.removeItem(STORAGE_KEY);
			return true;
		} catch (error) {
			console.error('Failed to clear custom templates:', error);
			return false;
		}
	}

	/**
	 * Search custom templates
	 */
	static search(query: string): CustomTemplate[] {
		const lowerQuery = query.toLowerCase();
		return this.getAll().filter(
			t =>
				t.name.toLowerCase().includes(lowerQuery) ||
				t.template.toLowerCase().includes(lowerQuery) ||
				t.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
		);
	}

	/**
	 * Check if a template with similar content already exists
	 */
	static isDuplicate(template: string): boolean {
		const templates = this.getAll();
		return templates.some(t => t.template.toLowerCase() === template.toLowerCase());
	}
}
