/**
 * RxNorm API Integration
 * Official API: https://rxnav.nlm.nih.gov/
 */

const RXNORM_BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

export interface DrugInfo {
	rxcui: string;
	drugName: string;
	genericName: string;
	brandNames: string[];
	doseForm: string;
	strength: string;
}

/**
 * Common drug name variations and brand names
 * Maps user input to searchable terms
 */
const DRUG_SYNONYMS: Record<string, string> = {
	// Common abbreviations
	asa: 'aspirin',
	apap: 'acetaminophen',
	hctz: 'hydrochlorothiazide',
	levo: 'levothyroxine',
	metfo: 'metformin',

	// Brand to generic
	tylenol: 'acetaminophen',
	advil: 'ibuprofen',
	motrin: 'ibuprofen',
	aleve: 'naproxen',
	lipitor: 'atorvastatin',
	zestril: 'lisinopril',
	prinivil: 'lisinopril',
	glucophage: 'metformin',
	synthroid: 'levothyroxine',
	nexium: 'esomeprazole',
	prilosec: 'omeprazole',
	zoloft: 'sertraline',
	prozac: 'fluoxetine',
	paxil: 'paroxetine',
	lexapro: 'escitalopram',
	xanax: 'alprazolam',
	ativan: 'lorazepam',
	valium: 'diazepam',
	norvasc: 'amlodipine',
	lasix: 'furosemide',
	coumadin: 'warfarin'
};

/**
 * Normalize input for better search results
 */
function preprocessDrugName(input: string): string {
	let processed = input.toLowerCase().trim();

	// Check if it's a known synonym
	const words = processed.split(/\s+/);
	const firstWord = words[0];
	if (DRUG_SYNONYMS[firstWord]) {
		// Replace first word with generic name, keep rest (like dosage)
		words[0] = DRUG_SYNONYMS[firstWord];
		processed = words.join(' ');
	}

	return processed;
}

/**
 * Normalize a drug name or NDC to RxCUI and get drug information
 */
export async function normalizeDrug(input: string): Promise<DrugInfo> {
	// Preprocess input to handle synonyms and variations
	const processedInput = preprocessDrugName(input);

	// Check if input is an NDC (11 digits with optional hyphens)
	const ndcPattern = /^\d{5}-?\d{4}-?\d{2}$|^\d{4}-?\d{4}-?\d{2}$/;
	const isNDC = ndcPattern.test(input.replace(/-/g, ''));

	let rxcui: string;

	if (isNDC) {
		// Normalize NDC to RxCUI
		const cleanNDC = input.replace(/-/g, '');
		const response = await fetch(`${RXNORM_BASE_URL}/rxcui.json?idtype=NDC&id=${cleanNDC}`);
		const data = await response.json();

		if (!data.idGroup?.rxnormId?.[0]) {
			throw new Error('NDC not found in RxNorm database');
		}

		rxcui = data.idGroup.rxnormId[0];
	} else {
		// Try approximate term search first for better matches (using processed input)
		const approxResponse = await fetch(
			`${RXNORM_BASE_URL}/approximateTerm.json?term=${encodeURIComponent(processedInput)}&maxEntries=1`
		);
		const approxData = await approxResponse.json();

		if (approxData.approximateGroup?.candidate?.[0]?.rxcui) {
			rxcui = approxData.approximateGroup.candidate[0].rxcui;
		} else {
			// Fallback to exact search (with processed input)
			const response = await fetch(
				`${RXNORM_BASE_URL}/rxcui.json?name=${encodeURIComponent(processedInput)}`
			);
			const data = await response.json();

			if (!data.idGroup?.rxnormId?.[0]) {
				// Provide helpful error message
				const suggestion =
					processedInput !== input.toLowerCase().trim()
						? ` (searched for: ${processedInput})`
						: '';
				throw new Error(
					`Drug "${input}"${suggestion} not found in RxNorm database. Please check spelling or try a different drug name.`
				);
			}

			rxcui = data.idGroup.rxnormId[0];
		}
	}

	// Get drug properties
	const propsResponse = await fetch(`${RXNORM_BASE_URL}/rxcui/${rxcui}/properties.json`);
	const propsData = await propsResponse.json();

	if (!propsData.properties) {
		throw new Error('Unable to retrieve drug properties');
	}

	const props = propsData.properties;

	// Get brand names (trade names)
	let brandNames: string[] = [];
	try {
		const relatedResponse = await fetch(
			`${RXNORM_BASE_URL}/rxcui/${rxcui}/related.json?rela=tradename_of`
		);
		const relatedData = await relatedResponse.json();

		if (relatedData.relatedGroup?.conceptGroup) {
			for (const group of relatedData.relatedGroup.conceptGroup) {
				if (group.conceptProperties) {
					brandNames = group.conceptProperties.map((prop: any) => prop.name);
				}
			}
		}
	} catch (error) {
		// Brand names are optional, continue without them
		console.error('Failed to fetch brand names:', error);
	}

	return {
		rxcui: rxcui,
		drugName: props.name || input,
		genericName: props.name || input,
		brandNames: brandNames,
		doseForm: props.doseFormName || 'Unknown',
		strength: props.strength || 'Unknown'
	};
}

/**
 * Validate drug input (NDC or drug name)
 */
export function validateDrugInput(input: string): { valid: boolean; error?: string } {
	if (!input || input.trim().length === 0) {
		return { valid: false, error: 'Drug name or NDC is required' };
	}

	const trimmed = input.trim();

	// Check if it looks like an NDC
	const ndcPattern = /^\d{5}-?\d{4}-?\d{2}$|^\d{4}-?\d{4}-?\d{2}$/;
	if (ndcPattern.test(trimmed.replace(/-/g, ''))) {
		return { valid: true };
	}

	// Check if it's a reasonable drug name (at least 2 characters)
	if (trimmed.length < 2) {
		return { valid: false, error: 'Drug name must be at least 2 characters' };
	}

	return { valid: true };
}
