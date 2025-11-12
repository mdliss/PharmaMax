/**
 * Client-side utility for checking controlled substances
 */

export interface ControlledSubstanceInfo {
	isControlled: boolean;
	substance?: {
		genericName: string;
		commonBrandNames: string[];
		schedule: string;
		scheduleBadge: string;
		maxRefills: number;
		typicalMaxDaysSupply: number;
		requiresPrescriberDEA: boolean;
		restrictions: string[];
	};
	warnings?: string[];
}

/**
 * Check if a drug is a controlled substance
 * @param drugName - The drug name to check
 * @param daysSupply - Optional days supply for quantity limit checking
 * @returns Promise<ControlledSubstanceInfo>
 */
export async function checkControlledSubstance(
	drugName: string,
	daysSupply?: number
): Promise<ControlledSubstanceInfo> {
	try {
		const response = await fetch('/api/check-controlled-substance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ drugName, daysSupply })
		});

		if (!response.ok) {
			throw new Error(`Failed to check controlled substance: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error checking controlled substance:', error);
		return {
			isControlled: false
		};
	}
}

/**
 * Get CSS class for schedule badge color
 * @param schedule - DEA schedule ('II', 'III', 'IV', 'V')
 * @returns Tailwind CSS class for badge styling
 */
export function getScheduleBadgeColor(schedule: string): string {
	switch (schedule) {
		case 'II':
			return 'bg-red-600 text-white'; // Highest restriction
		case 'III':
			return 'bg-orange-500 text-white';
		case 'IV':
			return 'bg-yellow-500 text-black';
		case 'V':
			return 'bg-green-600 text-white'; // Lowest restriction
		default:
			return 'bg-gray-500 text-white';
	}
}

/**
 * Format restrictions list for display
 * @param restrictions - Array of restriction strings
 * @returns Formatted HTML list
 */
export function formatRestrictions(restrictions: string[]): string {
	if (!restrictions || restrictions.length === 0) {
		return '';
	}
	return restrictions.map(r => `• ${r}`).join('\n');
}
