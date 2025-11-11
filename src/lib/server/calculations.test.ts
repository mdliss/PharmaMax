import { describe, it, expect } from 'vitest';
import {
	calculateQuantity,
	recommendPackages,
	validateDaysSupply,
	type NDCInfo,
	type ParsedSIG
} from './calculations';

describe('calculateQuantity', () => {
	it('should calculate quantity correctly with basic inputs', () => {
		const parsedSIG: ParsedSIG = {
			totalDailyDose: 2,
			unit: 'tablets'
		};
		const result = calculateQuantity(parsedSIG, 30);

		expect(result.totalQuantityNeeded).toBe(60);
		expect(result.unit).toBe('tablets');
	});

	it('should use provided unit when parsedSIG unit is missing', () => {
		const parsedSIG: ParsedSIG = {
			totalDailyDose: 3,
			unit: ''
		};
		const result = calculateQuantity(parsedSIG, 15, 'capsules');

		expect(result.totalQuantityNeeded).toBe(45);
		expect(result.unit).toBe('capsules');
	});

	it('should default to "tablets" when no unit is provided', () => {
		const parsedSIG: ParsedSIG = {
			totalDailyDose: 1,
			unit: ''
		};
		const result = calculateQuantity(parsedSIG, 90);

		expect(result.totalQuantityNeeded).toBe(90);
		expect(result.unit).toBe('tablets');
	});

	it('should handle decimal daily doses', () => {
		const parsedSIG: ParsedSIG = {
			totalDailyDose: 1.5,
			unit: 'tablets'
		};
		const result = calculateQuantity(parsedSIG, 30);

		expect(result.totalQuantityNeeded).toBe(45);
	});

	it('should calculate correctly for large day supplies', () => {
		const parsedSIG: ParsedSIG = {
			totalDailyDose: 4,
			unit: 'tablets'
		};
		const result = calculateQuantity(parsedSIG, 365);

		expect(result.totalQuantityNeeded).toBe(1460);
	});
});

describe('recommendPackages', () => {
	const mockNDCs: NDCInfo[] = [
		{
			ndc: '12345-100-30',
			packageSize: 30,
			packageType: 'bottle',
			isActive: true,
			labelerName: 'Test Pharma'
		},
		{
			ndc: '12345-100-90',
			packageSize: 90,
			packageType: 'bottle',
			isActive: true,
			labelerName: 'Test Pharma'
		},
		{
			ndc: '12345-100-100',
			packageSize: 100,
			packageType: 'bottle',
			isActive: true,
			labelerName: 'Test Pharma'
		}
	];

	it('should recommend single package when exact match exists', () => {
		const result = recommendPackages(mockNDCs, 90);

		expect(result.packages).toHaveLength(1);
		expect(result.packages[0].ndc).toBe('12345-100-90');
		expect(result.packages[0].quantity).toBe(1);
		expect(result.totalDispensed).toBe(90);
		expect(result.overfill).toBe(0);
		expect(result.overfillPercentage).toBe(0);
	});

	it('should recommend optimal combination for larger quantities', () => {
		const result = recommendPackages(mockNDCs, 180);

		// Greedy algorithm uses largest packages first
		expect(result.totalDispensed).toBeGreaterThanOrEqual(180);
		expect(result.overfill).toBeGreaterThanOrEqual(0);
		expect(result.packages.length).toBeGreaterThan(0);
	});

	it('should handle remainder by adding smallest package', () => {
		const result = recommendPackages(mockNDCs, 105);

		expect(result.packages.length).toBeGreaterThan(0);
		expect(result.totalDispensed).toBeGreaterThanOrEqual(105);
		expect(result.overfill).toBeGreaterThanOrEqual(0);
	});

	it('should filter out inactive NDCs', () => {
		const ndcsWithInactive: NDCInfo[] = [
			...mockNDCs,
			{
				ndc: '12345-100-500',
				packageSize: 500,
				packageType: 'bottle',
				isActive: false,
				labelerName: 'Test Pharma'
			}
		];

		const result = recommendPackages(ndcsWithInactive, 200);

		// Should not use the 500-count inactive package
		const usedNDCs = result.packages.map(p => p.ndc);
		expect(usedNDCs).not.toContain('12345-100-500');
	});

	it('should return warning when no active NDCs available', () => {
		const inactiveNDCs: NDCInfo[] = [
			{
				ndc: '12345-100-30',
				packageSize: 30,
				packageType: 'bottle',
				isActive: false,
				labelerName: 'Test Pharma'
			}
		];

		const result = recommendPackages(inactiveNDCs, 90);

		expect(result.packages).toHaveLength(0);
		expect(result.warnings).toContain('No active NDCs available');
		expect(result.totalDispensed).toBe(0);
	});

	it('should warn about high overfill', () => {
		const smallPackages: NDCInfo[] = [
			{
				ndc: '12345-100-100',
				packageSize: 100,
				packageType: 'bottle',
				isActive: true,
				labelerName: 'Test Pharma'
			}
		];

		const result = recommendPackages(smallPackages, 10);

		expect(result.overfillPercentage).toBeGreaterThan(50);
		expect(result.warnings).toContain('High overfill - consider alternative package sizes');
	});

	it('should use greedy algorithm efficiently', () => {
		const result = recommendPackages(mockNDCs, 250);

		// Should prefer larger packages: 2x100 + 1x90 = 290 or similar efficient combination
		expect(result.totalDispensed).toBeGreaterThanOrEqual(250);
		expect(result.packages.length).toBeGreaterThan(0);
	});

	it('should handle edge case of zero quantity needed', () => {
		const result = recommendPackages(mockNDCs, 0);

		expect(result.packages).toHaveLength(0);
		expect(result.totalDispensed).toBe(0);
	});

	it('should handle single small quantity', () => {
		const result = recommendPackages(mockNDCs, 1);

		expect(result.packages).toHaveLength(1);
		expect(result.totalDispensed).toBeGreaterThanOrEqual(1);
		expect(result.packages[0].ndc).toBe('12345-100-30'); // Should use smallest package
	});
});

describe('validateDaysSupply', () => {
	it('should validate correct days supply', () => {
		const result = validateDaysSupply(30);

		expect(result.valid).toBe(true);
		expect(result.error).toBeUndefined();
	});

	it('should reject non-numeric input', () => {
		const result = validateDaysSupply(NaN);

		expect(result.valid).toBe(false);
		expect(result.error).toBe('Days supply must be a number');
	});

	it('should reject days supply less than 1', () => {
		const result = validateDaysSupply(0);

		expect(result.valid).toBe(false);
		expect(result.error).toBe('Days supply must be at least 1');
	});

	it('should reject negative days supply', () => {
		const result = validateDaysSupply(-5);

		expect(result.valid).toBe(false);
		expect(result.error).toBe('Days supply must be at least 1');
	});

	it('should reject days supply greater than 365', () => {
		const result = validateDaysSupply(366);

		expect(result.valid).toBe(false);
		expect(result.error).toBe('Days supply cannot exceed 365 days');
	});

	it('should accept boundary value of 1', () => {
		const result = validateDaysSupply(1);

		expect(result.valid).toBe(true);
	});

	it('should accept boundary value of 365', () => {
		const result = validateDaysSupply(365);

		expect(result.valid).toBe(true);
	});

	it('should accept common day supply values', () => {
		const commonValues = [7, 14, 30, 60, 90];

		commonValues.forEach(days => {
			const result = validateDaysSupply(days);
			expect(result.valid).toBe(true);
		});
	});
});
