import { describe, it, expect, vi } from 'vitest';
import { validateDrugInput, normalizeDrug } from './rxnorm';

describe('validateDrugInput', () => {
	it('should validate correct drug name', () => {
		const result = validateDrugInput('lisinopril');

		expect(result.valid).toBe(true);
		expect(result.error).toBeUndefined();
	});

	it('should validate drug name with strength', () => {
		const result = validateDrugInput('lisinopril 10mg');

		expect(result.valid).toBe(true);
	});

	it('should reject empty input', () => {
		const result = validateDrugInput('');

		expect(result.valid).toBe(false);
		expect(result.error).toBe('Drug name or NDC is required');
	});

	it('should reject whitespace-only input', () => {
		const result = validateDrugInput('   ');

		expect(result.valid).toBe(false);
		expect(result.error).toBe('Drug name or NDC is required');
	});

	it('should reject single character drug name', () => {
		const result = validateDrugInput('a');

		expect(result.valid).toBe(false);
		expect(result.error).toBe('Drug name must be at least 2 characters');
	});

	it('should accept 2-character drug name', () => {
		const result = validateDrugInput('ab');

		expect(result.valid).toBe(true);
	});

	it('should validate NDC format with hyphens (11-digit)', () => {
		const result = validateDrugInput('12345-1234-12');

		expect(result.valid).toBe(true);
	});

	it('should validate NDC format without hyphens (11-digit)', () => {
		const result = validateDrugInput('12345123412');

		expect(result.valid).toBe(true);
	});

	it('should validate NDC format with hyphens (10-digit)', () => {
		const result = validateDrugInput('1234-1234-12');

		expect(result.valid).toBe(true);
	});

	it('should validate NDC format without hyphens (10-digit)', () => {
		const result = validateDrugInput('1234123412');

		expect(result.valid).toBe(true);
	});

	it('should accept common drug names', () => {
		const commonDrugs = [
			'aspirin',
			'ibuprofen',
			'acetaminophen',
			'metformin',
			'lisinopril',
			'atorvastatin',
			'levothyroxine'
		];

		commonDrugs.forEach(drug => {
			const result = validateDrugInput(drug);
			expect(result.valid).toBe(true);
		});
	});

	it('should accept brand names', () => {
		const brandNames = ['Lipitor', 'Synthroid', 'Nexium', 'Tylenol', 'Advil'];

		brandNames.forEach(brand => {
			const result = validateDrugInput(brand);
			expect(result.valid).toBe(true);
		});
	});

	it('should trim whitespace before validation', () => {
		const result = validateDrugInput('  lisinopril  ');

		expect(result.valid).toBe(true);
	});

	it('should handle mixed case input', () => {
		const result = validateDrugInput('LiSiNoPrIl');

		expect(result.valid).toBe(true);
	});
});

describe('normalizeDrug', () => {
	it('should normalize drug by name using approximate search', async () => {
		// Mock fetch for approximate search
		global.fetch = vi.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					approximateGroup: {
						candidate: [{ rxcui: '12345' }]
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					properties: {
						name: 'Lisinopril',
						doseFormName: 'Tablet',
						strength: '10 MG'
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					relatedGroup: {
						conceptGroup: [
							{
								conceptProperties: [
									{ name: 'Prinivil' },
									{ name: 'Zestril' }
								]
							}
						]
					}
				})
			});

		const result = await normalizeDrug('lisinopril');

		expect(result.rxcui).toBe('12345');
		expect(result.drugName).toBe('Lisinopril');
		expect(result.genericName).toBe('Lisinopril');
		expect(result.brandNames).toContain('Prinivil');
		expect(result.brandNames).toContain('Zestril');
	});

	it('should handle brand name synonyms', async () => {
		global.fetch = vi.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					approximateGroup: {
						candidate: [{ rxcui: '67890' }]
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					properties: {
						name: 'Atorvastatin',
						doseFormName: 'Tablet',
						strength: '20 MG'
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({})
			});

		const result = await normalizeDrug('lipitor');

		expect(result.genericName).toBe('Atorvastatin');
	});

	it('should throw error when drug not found', async () => {
		global.fetch = vi.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					approximateGroup: {}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					idGroup: {}
				})
			});

		await expect(normalizeDrug('nonexistentdrug')).rejects.toThrow();
	});

	it('should normalize drug by NDC', async () => {
		global.fetch = vi.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					idGroup: {
						rxnormId: ['54321']
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					properties: {
						name: 'Metformin',
						doseFormName: 'Tablet',
						strength: '500 MG'
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({})
			});

		const result = await normalizeDrug('12345-1234-12');

		expect(result.rxcui).toBe('54321');
		expect(result.drugName).toBe('Metformin');
	});

	it('should throw error when NDC not found', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				idGroup: {}
			})
		});

		await expect(normalizeDrug('00000-0000-00')).rejects.toThrow('NDC not found in RxNorm database');
	});

	it('should fall back to exact search when approximate fails', async () => {
		global.fetch = vi.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					approximateGroup: {}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					idGroup: {
						rxnormId: ['99999']
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					properties: {
						name: 'Exact Match Drug',
						doseFormName: 'Capsule',
						strength: '25 MG'
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({})
			});

		const result = await normalizeDrug('exactdrug');

		expect(result.rxcui).toBe('99999');
		expect(result.drugName).toBe('Exact Match Drug');
	});

	it('should throw error when properties are missing', async () => {
		global.fetch = vi.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					approximateGroup: {
						candidate: [{ rxcui: '12345' }]
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({})
			});

		await expect(normalizeDrug('testdrug')).rejects.toThrow('Unable to retrieve drug properties');
	});

	it('should handle brand name fetch errors gracefully', async () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		global.fetch = vi.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					approximateGroup: {
						candidate: [{ rxcui: '12345' }]
					}
				})
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					properties: {
						name: 'Test Drug',
						doseFormName: 'Tablet',
						strength: '10 MG'
					}
				})
			})
			.mockRejectedValueOnce(new Error('Network error'));

		const result = await normalizeDrug('testdrug');

		expect(result.brandNames).toEqual([]);
		expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch brand names:', expect.any(Error));

		consoleSpy.mockRestore();
	});
});
