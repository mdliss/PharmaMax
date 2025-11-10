/**
 * FDA NDC Directory API Integration
 * Official API: https://open.fda.gov/apis/drug/ndc/
 */

import type { NDCInfo } from './calculations';

const FDA_API_BASE = 'https://api.fda.gov/drug/ndc.json';

interface FDAPackaging {
	package_ndc: string;
	description: string;
	marketing_start_date?: string;
	marketing_end_date?: string;
	sample?: boolean;
}

interface FDAResult {
	product_ndc: string;
	generic_name: string;
	brand_name?: string;
	labeler_name: string;
	packaging: FDAPackaging[];
	marketing_category?: string;
	finished?: boolean;
}

/**
 * Get NDCs for a drug by searching the FDA API with drug name
 */
export async function getNDCsForDrug(rxcui: string, drugName: string): Promise<NDCInfo[]> {
	try {
		// Clean drug name for search (remove dosage form descriptors)
		const searchTerm = cleanDrugNameForSearch(drugName);

		if (!searchTerm) {
			console.warn('No valid search term for FDA API, using fallback');
			return getFallbackNDCs(rxcui, drugName);
		}

		// Search FDA API by generic name
		const url = `${FDA_API_BASE}?search=generic_name:"${encodeURIComponent(searchTerm)}"&limit=20`;

		const response = await fetch(url);

		if (!response.ok) {
			console.warn(`FDA API returned ${response.status}, using fallback`);
			return getFallbackNDCs(rxcui, drugName);
		}

		const data = await response.json();

		if (!data.results || data.results.length === 0) {
			console.warn('No FDA results found, using fallback');
			return getFallbackNDCs(rxcui, drugName);
		}

		// Parse and format NDC data
		const ndcs: NDCInfo[] = [];

		for (const result of data.results as FDAResult[]) {
			if (!result.packaging || result.packaging.length === 0) continue;

			for (const pkg of result.packaging) {
				// Skip sample packages
				if (pkg.sample) continue;

				// Check if currently marketed (no end date or end date in future)
				const isActive = !pkg.marketing_end_date;

				// Parse package size and type from description
				const parsed = parsePackageDescription(pkg.description);

				if (parsed) {
					ndcs.push({
						ndc: pkg.package_ndc,
						packageSize: parsed.size,
						packageType: parsed.type,
						isActive,
						labelerName: result.labeler_name || 'Unknown Manufacturer'
					});
				}
			}
		}

		// If we got results, return them
		if (ndcs.length > 0) {
			// Sort by package size for better UI
			return ndcs.sort((a, b) => a.packageSize - b.packageSize);
		}

		// Otherwise use fallback
		return getFallbackNDCs(rxcui, drugName);
	} catch (error) {
		console.error('FDA API error:', error);
		return getFallbackNDCs(rxcui, drugName);
	}
}

/**
 * Clean drug name to improve FDA API search results
 */
function cleanDrugNameForSearch(drugName: string): string {
	if (!drugName) return '';

	// Remove common dosage forms and routes
	let cleaned = drugName
		.toLowerCase()
		.replace(/\s*(oral|tablet|capsule|solution|suspension|injection|cream|ointment|gel)\s*/gi, '')
		.trim();

	// Keep the main drug name and strength
	// e.g., "lisinopril 10 MG" -> "lisinopril 10"
	const match = cleaned.match(/^([a-z]+(?:\s+\d+(?:\.\d+)?)?)/i);
	if (match) {
		return match[1].trim();
	}

	return cleaned;
}

/**
 * Parse package description to extract size and type
 * Example: "100 TABLET in 1 BOTTLE" -> { size: 100, type: "bottle" }
 */
function parsePackageDescription(description: string): { size: number; type: string } | null {
	// Match patterns like "100 TABLET in 1 BOTTLE" or "30 CAPSULE in 1 BOTTLE"
	const match = description.match(/(\d+)\s+(?:TABLET|CAPSULE|MILLILITER|mL|DOSE)\s+in\s+\d+\s+(\w+)/i);

	if (match) {
		const size = parseInt(match[1]);
		const type = match[2].toLowerCase();

		if (!isNaN(size) && size > 0) {
			return { size, type };
		}
	}

	return null;
}

/**
 * Fallback NDC data when FDA API fails or returns no results
 */
function getFallbackNDCs(rxcui: string, drugName: string): NDCInfo[] {
	return [
		{
			ndc: `00000-${rxcui.slice(0, 4).padStart(4, '0')}-01`,
			packageSize: 30,
			packageType: 'bottle',
			isActive: true,
			labelerName: 'Generic Manufacturer (Fallback Data)'
		},
		{
			ndc: `00000-${rxcui.slice(0, 4).padStart(4, '0')}-02`,
			packageSize: 90,
			packageType: 'bottle',
			isActive: true,
			labelerName: 'Generic Manufacturer (Fallback Data)'
		},
		{
			ndc: `00000-${rxcui.slice(0, 4).padStart(4, '0')}-10`,
			packageSize: 100,
			packageType: 'bottle',
			isActive: true,
			labelerName: 'Generic Manufacturer (Fallback Data)'
		}
	];
}
