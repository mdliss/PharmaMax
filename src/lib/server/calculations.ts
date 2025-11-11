/**
 * Quantity Calculation Logic
 */

import type { ParsedSIG } from './openai';

export interface QuantityCalculation {
	totalQuantityNeeded: number;
	unit: string;
}

export interface NDCInfo {
	ndc: string;
	packageSize: number;
	packageType: string;
	isActive: boolean;
	labelerName: string;
}

export interface PackageRecommendation {
	packages: Array<{
		ndc: string;
		quantity: number;
		totalUnits: number;
	}>;
	totalDispensed: number;
	overfill: number;
	overfillPercentage: number;
	warnings: string[];
}

/**
 * Calculate total quantity needed based on parsed SIG and days' supply
 */
export function calculateQuantity(
	parsedSIG: ParsedSIG,
	daysSupply: number,
	unit?: string
): QuantityCalculation {
	const totalQuantityNeeded = parsedSIG.totalDailyDose * daysSupply;

	// Use unit from parsedSIG if available, otherwise use provided unit or default
	const finalUnit = parsedSIG.unit || unit || 'tablets';

	return {
		totalQuantityNeeded,
		unit: finalUnit
	};
}

/**
 * Recommend optimal package combination to fulfill prescription
 */
export function recommendPackages(
	ndcs: NDCInfo[],
	quantityNeeded: number
): PackageRecommendation {
	// Filter to only active NDCs
	const activeNDCs = ndcs.filter((ndc) => ndc.isActive);

	if (activeNDCs.length === 0) {
		return {
			packages: [],
			totalDispensed: 0,
			overfill: 0,
			overfillPercentage: 0,
			warnings: ['No active NDCs available']
		};
	}

	// Sort NDCs by package size (largest first for efficiency)
	const sortedNDCs = [...activeNDCs].sort((a, b) => b.packageSize - a.packageSize);

	// Find optimal combination using greedy algorithm
	const packages: Array<{ ndc: string; quantity: number; totalUnits: number }> = [];
	let remaining = quantityNeeded;

	for (const ndc of sortedNDCs) {
		if (remaining <= 0) break;

		const packagesNeeded = Math.floor(remaining / ndc.packageSize);
		if (packagesNeeded > 0) {
			packages.push({
				ndc: ndc.ndc,
				quantity: packagesNeeded,
				totalUnits: packagesNeeded * ndc.packageSize
			});
			remaining -= packagesNeeded * ndc.packageSize;
		}
	}

	// If there's still a remainder, add one more of the smallest package
	if (remaining > 0 && sortedNDCs.length > 0) {
		const smallestNDC = sortedNDCs[sortedNDCs.length - 1];
		const existing = packages.find((p) => p.ndc === smallestNDC.ndc);

		if (existing) {
			existing.quantity += 1;
			existing.totalUnits += smallestNDC.packageSize;
		} else {
			packages.push({
				ndc: smallestNDC.ndc,
				quantity: 1,
				totalUnits: smallestNDC.packageSize
			});
		}
	}

	const totalDispensed = packages.reduce((sum, pkg) => sum + pkg.totalUnits, 0);
	const overfill = totalDispensed - quantityNeeded;
	const overfillPercentage = (overfill / quantityNeeded) * 100;

	const warnings: string[] = [];
	if (overfillPercentage > 50) {
		warnings.push('High overfill - consider alternative package sizes');
	}
	if (packages.length === 0) {
		warnings.push('Unable to fulfill prescription with available packages');
	}

	return {
		packages,
		totalDispensed,
		overfill: Math.max(0, overfill),
		overfillPercentage: Math.max(0, overfillPercentage),
		warnings
	};
}

/**
 * Validate days' supply input
 */
export function validateDaysSupply(daysSupply: number): { valid: boolean; error?: string } {
	if (typeof daysSupply !== 'number' || isNaN(daysSupply)) {
		return { valid: false, error: 'Days supply must be a number' };
	}

	if (daysSupply < 1) {
		return { valid: false, error: 'Days supply must be at least 1' };
	}

	if (daysSupply > 365) {
		return { valid: false, error: 'Days supply cannot exceed 365 days' };
	}

	return { valid: true };
}
