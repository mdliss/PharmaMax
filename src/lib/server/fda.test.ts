import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNDCsForDrug } from './fda';
import type { NDCInfo } from './calculations';

describe('getNDCsForDrug', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch and parse NDCs from FDA API', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: [
					{
						product_ndc: '12345-100',
						generic_name: 'Lisinopril',
						labeler_name: 'Test Pharma',
						packaging: [
							{
								package_ndc: '12345-100-30',
								description: '30 TABLET in 1 BOTTLE',
								sample: false
							},
							{
								package_ndc: '12345-100-90',
								description: '90 TABLET in 1 BOTTLE',
								sample: false
							}
						]
					}
				]
			})
		});

		const result = await getNDCsForDrug('12345', 'lisinopril');

		expect(result).toHaveLength(2);
		expect(result[0].ndc).toBe('12345-100-30');
		expect(result[0].packageSize).toBe(30);
		expect(result[0].isActive).toBe(true);
		expect(result[1].packageSize).toBe(90);
	});

	it('should filter out sample packages', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: [
					{
						product_ndc: '12345-100',
						generic_name: 'Test Drug',
						labeler_name: 'Test Pharma',
						packaging: [
							{
								package_ndc: '12345-100-30',
								description: '30 TABLET in 1 BOTTLE',
								sample: false
							},
							{
								package_ndc: '12345-100-01',
								description: '10 TABLET in 1 BOTTLE',
								sample: true
							}
						]
					}
				]
			})
		});

		const result = await getNDCsForDrug('12345', 'testdrug');

		expect(result).toHaveLength(1);
		expect(result[0].ndc).toBe('12345-100-30');
	});

	it('should return fallback NDCs on API failure', async () => {
		global.fetch = vi.fn().mockRejectedValueOnce(new Error('API Error'));

		const result = await getNDCsForDrug('12345', 'testdrug');

		expect(result).toHaveLength(3); // Fallback returns 3 NDCs
		expect(result[0].labelerName).toContain('Fallback');
	});

	it('should return fallback NDCs when no results', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: []
			})
		});

		const result = await getNDCsForDrug('12345', 'testdrug');

		expect(result).toHaveLength(3);
		expect(result[0].labelerName).toContain('Fallback');
	});

	it('should sort NDCs by package size', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: [
					{
						product_ndc: '12345-100',
						generic_name: 'Test Drug',
						labeler_name: 'Test Pharma',
						packaging: [
							{
								package_ndc: '12345-100-90',
								description: '90 TABLET in 1 BOTTLE',
								sample: false
							},
							{
								package_ndc: '12345-100-30',
								description: '30 TABLET in 1 BOTTLE',
								sample: false
							},
							{
								package_ndc: '12345-100-60',
								description: '60 TABLET in 1 BOTTLE',
								sample: false
							}
						]
					}
				]
			})
		});

		const result = await getNDCsForDrug('12345', 'testdrug');

		// Should be sorted ascending by package size
		expect(result[0].packageSize).toBe(30);
		expect(result[1].packageSize).toBe(60);
		expect(result[2].packageSize).toBe(90);
	});

	it('should handle API error status codes', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: false,
			status: 404
		});

		const result = await getNDCsForDrug('12345', 'testdrug');

		expect(result).toHaveLength(3);
		expect(result[0].labelerName).toContain('Fallback');
	});

	it('should use fallback when drug name is empty', async () => {
		const result = await getNDCsForDrug('12345', '');

		expect(result).toHaveLength(3);
		expect(result[0].labelerName).toContain('Fallback');
	});

	it('should use fallback when no packages can be parsed', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: [
					{
						product_ndc: '12345-100',
						generic_name: 'Test Drug',
						labeler_name: 'Test Pharma',
						packaging: [
							{
								package_ndc: '12345-100-01',
								description: 'INVALID FORMAT',
								sample: false
							}
						]
					}
				]
			})
		});

		const result = await getNDCsForDrug('12345', 'testdrug');

		expect(result).toHaveLength(3);
		expect(result[0].labelerName).toContain('Fallback');
	});

	it('should skip packages with no description match', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: [
					{
						product_ndc: '12345-100',
						generic_name: 'Test Drug',
						labeler_name: 'Test Pharma',
						packaging: [
							{
								package_ndc: '12345-100-30',
								description: '30 TABLET in 1 BOTTLE',
								sample: false
							},
							{
								package_ndc: '12345-100-99',
								description: 'UNKNOWN FORMAT',
								sample: false
							}
						]
					}
				]
			})
		});

		const result = await getNDCsForDrug('12345', 'testdrug');

		expect(result).toHaveLength(1);
		expect(result[0].ndc).toBe('12345-100-30');
	});

	it('should handle drug names with dosage forms', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: [
					{
						product_ndc: '12345-100',
						generic_name: 'Lisinopril',
						labeler_name: 'Test Pharma',
						packaging: [
							{
								package_ndc: '12345-100-30',
								description: '30 TABLET in 1 BOTTLE',
								sample: false
							}
						]
					}
				]
			})
		});

		const result = await getNDCsForDrug('12345', 'lisinopril 10 MG oral tablet');

		expect(result).toHaveLength(1);
		expect(result[0].ndc).toBe('12345-100-30');
	});

	it('should handle drug names without pattern match', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				results: [
					{
						product_ndc: '12345-100',
						generic_name: 'Test',
						labeler_name: 'Test Pharma',
						packaging: [
							{
								package_ndc: '12345-100-30',
								description: '30 TABLET in 1 BOTTLE',
								sample: false
							}
						]
					}
				]
			})
		});

		const result = await getNDCsForDrug('12345', '!!!@@@###');

		expect(result).toHaveLength(1);
		expect(result[0].ndc).toBe('12345-100-30');
	});
});
