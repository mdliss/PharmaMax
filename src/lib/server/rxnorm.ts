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

export interface DrugSuggestion {
	rxcui: string;
	name: string;
	synonym: string;
	tty: string;
}

export interface GenericAlternative {
	rxcui: string;
	name: string;
	doseForm: string;
	strength: string;
	tty: string; // Term type (e.g., SCD for Semantic Clinical Drug)
	isABRated?: boolean; // Therapeutic equivalence
	costSavings?: number; // Estimated percentage savings
	estimatedCost?: number; // Estimated cost in dollars
}

/**
 * Search for drug suggestions for autocomplete
 */
export async function searchRxNormDrugs(query: string): Promise<DrugSuggestion[]> {
	if (!query || query.trim().length < 2) {
		return [];
	}

	const processedQuery = preprocessDrugName(query);

	try {
		// Use approximate term search for fuzzy matching
		const response = await fetch(
			`${RXNORM_BASE_URL}/approximateTerm.json?term=${encodeURIComponent(processedQuery)}&maxEntries=20`
		);

		const data = await response.json();

		if (!data.approximateGroup?.candidate) {
			return [];
		}

		// Filter and format suggestions
		const seen = new Map<string, DrugSuggestion>(); // Track unique names (case-insensitive)

		data.approximateGroup.candidate
			.filter((candidate: any) => {
				// Filter out empty/null names
				if (!candidate.name || candidate.name.trim().length === 0) {
					return false;
				}

				// Filter out certain types we don't want (like ingredients, allergenic extracts, etc.)
				const unwantedTypes = ['IN', 'PIN', 'MIN'];
				return !unwantedTypes.includes(candidate.source);
			})
			.forEach((candidate: any) => {
				const normalizedName = candidate.name.toLowerCase().trim();

				// Only add if we haven't seen this name before
				if (!seen.has(normalizedName)) {
					seen.set(normalizedName, {
						rxcui: candidate.rxcui,
						name: candidate.name,
						synonym: candidate.synonym || candidate.name,
						tty: candidate.source || ''
					});
				}
			});

		// Convert map to array and limit to 8 suggestions
		const suggestions = Array.from(seen.values()).slice(0, 8);

		return suggestions;
	} catch (error) {
		console.error('Error searching RxNorm drugs:', error);
		return [];
	}
}

/**
 * Find generic alternatives for a given drug (RXCUI)
 * Uses TTY filtering to find Semantic Clinical Drugs (generic formulations)
 */
export async function findGenericAlternatives(rxcui: string): Promise<GenericAlternative[]> {
	try {
		// First, get the drug properties to understand what we're working with
		const propsResponse = await fetch(`${RXNORM_BASE_URL}/rxcui/${rxcui}/properties.json`);
		const propsData = await propsResponse.json();

		if (!propsData.properties) {
			return [];
		}

		const currentDrug = propsData.properties;
		const currentTty = currentDrug.tty;

		// If this is already a generic (SCD = Semantic Clinical Drug), find related generics
		// If this is a brand (SBD = Semantic Branded Drug), find the generic equivalent
		let genericAlternatives: GenericAlternative[] = [];

		if (currentTty === 'SBD') {
			// This is a brand drug - find the generic equivalent
			// Use the 'has_tradename' relationship to find the generic
			const relatedResponse = await fetch(
				`${RXNORM_BASE_URL}/rxcui/${rxcui}/related.json?tty=SCD`
			);
			const relatedData = await relatedResponse.json();

			if (relatedData.relatedGroup?.conceptGroup) {
				for (const group of relatedData.relatedGroup.conceptGroup) {
					if (group.tty === 'SCD' && group.conceptProperties) {
						for (const concept of group.conceptProperties) {
							// Get detailed properties for each alternative
							const altPropsResponse = await fetch(
								`${RXNORM_BASE_URL}/rxcui/${concept.rxcui}/properties.json`
							);
							const altPropsData = await altPropsResponse.json();

							if (altPropsData.properties) {
								const altProps = altPropsData.properties;
								genericAlternatives.push({
									rxcui: concept.rxcui,
									name: altProps.name,
									doseForm: altProps.doseFormName || 'Unknown',
									strength: altProps.strength || 'Unknown',
									tty: 'SCD',
									isABRated: true, // Assume AB-rated for SCD generics
									costSavings: Math.floor(Math.random() * 30) + 50, // Mock: 50-80% savings
									estimatedCost: Math.floor(Math.random() * 30) + 10 // Mock: $10-40
								});
							}
						}
					}
				}
			}
		} else if (currentTty === 'SCD') {
			// This is already generic - find other generic formulations
			// Get the ingredient and find other SCDs with same ingredient
			const ingredientResponse = await fetch(
				`${RXNORM_BASE_URL}/rxcui/${rxcui}/related.json?tty=IN`
			);
			const ingredientData = await ingredientResponse.json();

			if (ingredientData.relatedGroup?.conceptGroup) {
				// Find the ingredient RXCUI
				let ingredientRxcui: string | null = null;
				for (const group of ingredientData.relatedGroup.conceptGroup) {
					if (group.tty === 'IN' && group.conceptProperties?.[0]) {
						ingredientRxcui = group.conceptProperties[0].rxcui;
						break;
					}
				}

				if (ingredientRxcui) {
					// Find all SCDs with this ingredient
					const alternativesResponse = await fetch(
						`${RXNORM_BASE_URL}/rxcui/${ingredientRxcui}/related.json?tty=SCD`
					);
					const alternativesData = await alternativesResponse.json();

					if (alternativesData.relatedGroup?.conceptGroup) {
						for (const group of alternativesData.relatedGroup.conceptGroup) {
							if (group.tty === 'SCD' && group.conceptProperties) {
								for (const concept of group.conceptProperties) {
									// Skip the current drug
									if (concept.rxcui === rxcui) continue;

									// Get detailed properties
									const altPropsResponse = await fetch(
										`${RXNORM_BASE_URL}/rxcui/${concept.rxcui}/properties.json`
									);
									const altPropsData = await altPropsResponse.json();

									if (altPropsData.properties) {
										const altProps = altPropsData.properties;
										genericAlternatives.push({
											rxcui: concept.rxcui,
											name: altProps.name,
											doseForm: altProps.doseFormName || 'Unknown',
											strength: altProps.strength || 'Unknown',
											tty: 'SCD',
											isABRated: true,
											costSavings: Math.floor(Math.random() * 20) + 10, // Mock: 10-30% savings
											estimatedCost: Math.floor(Math.random() * 40) + 15 // Mock: $15-55
										});
									}
								}
							}
						}
					}
				}
			}
		} else {
			// For other types, try to find any related SCDs
			const relatedResponse = await fetch(
				`${RXNORM_BASE_URL}/rxcui/${rxcui}/related.json?tty=SCD`
			);
			const relatedData = await relatedResponse.json();

			if (relatedData.relatedGroup?.conceptGroup) {
				for (const group of relatedData.relatedGroup.conceptGroup) {
					if (group.tty === 'SCD' && group.conceptProperties) {
						for (const concept of group.conceptProperties) {
							const altPropsResponse = await fetch(
								`${RXNORM_BASE_URL}/rxcui/${concept.rxcui}/properties.json`
							);
							const altPropsData = await altPropsResponse.json();

							if (altPropsData.properties) {
								const altProps = altPropsData.properties;
								genericAlternatives.push({
									rxcui: concept.rxcui,
									name: altProps.name,
									doseForm: altProps.doseFormName || 'Unknown',
									strength: altProps.strength || 'Unknown',
									tty: 'SCD',
									isABRated: true,
									costSavings: Math.floor(Math.random() * 30) + 40,
									estimatedCost: Math.floor(Math.random() * 35) + 12
								});
							}
						}
					}
				}
			}
		}

		// Limit to top 5 alternatives and sort by cost savings
		return genericAlternatives
			.sort((a, b) => (b.costSavings || 0) - (a.costSavings || 0))
			.slice(0, 5);
	} catch (error) {
		console.error('Error finding generic alternatives:', error);
		return [];
	}
}
