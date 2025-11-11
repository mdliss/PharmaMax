// Package Optimizer - Generates alternative packaging combinations

export interface PackageOption {
	ndc: string;
	packageSize: number;
	packageType: string;
	labelerName: string;
	isActive: boolean;
}

export interface PackageCombination {
	packages: Array<{
		ndc: string;
		quantity: number;
		packageSize: number;
		totalUnits: number;
		labelerName: string;
	}>;
	totalDispensed: number;
	overfill: number;
	overfillPercentage: number;
	efficiency: number; // 0-100, higher is better
}

/**
 * Generate alternative packaging combinations
 */
export function generatePackageAlternatives(
	totalNeeded: number,
	ndcs: PackageOption[],
	maxAlternatives: number = 5
): PackageCombination[] {
	// Filter only active NDCs
	const activeNDCs = ndcs.filter((n) => n.isActive);

	if (activeNDCs.length === 0 || totalNeeded <= 0) {
		return [];
	}

	const alternatives: PackageCombination[] = [];

	// Strategy 1: Single package type (find the best single package)
	for (const ndc of activeNDCs) {
		const quantity = Math.ceil(totalNeeded / ndc.packageSize);
		const totalDispensed = quantity * ndc.packageSize;
		const overfill = totalDispensed - totalNeeded;
		const overfillPercentage = (overfill / totalNeeded) * 100;

		alternatives.push({
			packages: [
				{
					ndc: ndc.ndc,
					quantity,
					packageSize: ndc.packageSize,
					totalUnits: totalDispensed,
					labelerName: ndc.labelerName
				}
			],
			totalDispensed,
			overfill,
			overfillPercentage,
			efficiency: 100 - Math.min(overfillPercentage, 100)
		});
	}

	// Strategy 2: Combination of two package sizes (smaller + larger)
	const sortedBySize = [...activeNDCs].sort((a, b) => a.packageSize - b.packageSize);

	for (let i = 0; i < sortedBySize.length; i++) {
		for (let j = i + 1; j < sortedBySize.length; j++) {
			const smaller = sortedBySize[i];
			const larger = sortedBySize[j];

			// Try to minimize overfill by using larger packages first
			const largerQty = Math.floor(totalNeeded / larger.packageSize);
			const remaining = totalNeeded - largerQty * larger.packageSize;
			const smallerQty = remaining > 0 ? Math.ceil(remaining / smaller.packageSize) : 0;

			if (smallerQty > 0) {
				const totalDispensed = largerQty * larger.packageSize + smallerQty * smaller.packageSize;
				const overfill = totalDispensed - totalNeeded;
				const overfillPercentage = (overfill / totalNeeded) * 100;

				alternatives.push({
					packages: [
						{
							ndc: larger.ndc,
							quantity: largerQty,
							packageSize: larger.packageSize,
							totalUnits: largerQty * larger.packageSize,
							labelerName: larger.labelerName
						},
						{
							ndc: smaller.ndc,
							quantity: smallerQty,
							packageSize: smaller.packageSize,
							totalUnits: smallerQty * smaller.packageSize,
							labelerName: smaller.labelerName
						}
					].filter((p) => p.quantity > 0),
					totalDispensed,
					overfill,
					overfillPercentage,
					efficiency: 100 - Math.min(overfillPercentage, 100)
				});
			}

			// Also try reverse: use smaller packages first
			const smallerFirst = Math.floor(totalNeeded / smaller.packageSize);
			const remainingAfterSmaller = totalNeeded - smallerFirst * smaller.packageSize;
			const largerAfter =
				remainingAfterSmaller > 0 ? Math.ceil(remainingAfterSmaller / larger.packageSize) : 0;

			if (largerAfter > 0 && smallerFirst > 0) {
				const totalDispensed2 =
					smallerFirst * smaller.packageSize + largerAfter * larger.packageSize;
				const overfill2 = totalDispensed2 - totalNeeded;
				const overfillPercentage2 = (overfill2 / totalNeeded) * 100;

				alternatives.push({
					packages: [
						{
							ndc: smaller.ndc,
							quantity: smallerFirst,
							packageSize: smaller.packageSize,
							totalUnits: smallerFirst * smaller.packageSize,
							labelerName: smaller.labelerName
						},
						{
							ndc: larger.ndc,
							quantity: largerAfter,
							packageSize: larger.packageSize,
							totalUnits: largerAfter * larger.packageSize,
							labelerName: larger.labelerName
						}
					].filter((p) => p.quantity > 0),
					totalDispensed: totalDispensed2,
					overfill: overfill2,
					overfillPercentage: overfillPercentage2,
					efficiency: 100 - Math.min(overfillPercentage2, 100)
				});
			}
		}
	}

	// Remove duplicates (same total dispensed and overfill)
	const unique = alternatives.filter(
		(alt, index, self) =>
			index ===
			self.findIndex(
				(a) => a.totalDispensed === alt.totalDispensed && a.overfill === alt.overfill
			)
	);

	// Sort by efficiency (lowest overfill percentage first)
	unique.sort((a, b) => b.efficiency - a.efficiency);

	// Return top N alternatives
	return unique.slice(0, maxAlternatives);
}

/**
 * Get the best (most efficient) package combination
 */
export function getBestCombination(
	totalNeeded: number,
	ndcs: PackageOption[]
): PackageCombination | null {
	const alternatives = generatePackageAlternatives(totalNeeded, ndcs, 1);
	return alternatives.length > 0 ? alternatives[0] : null;
}
