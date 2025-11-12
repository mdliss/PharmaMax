/**
 * OpenAI Integration for SIG Parsing
 */

import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY
});

// In-memory cache for SIG parsing results
const sigCache = new Map<string, ParsedSIG>();
const SIG_CACHE_MAX_SIZE = 1000; // Limit cache size

// Export the OpenAI client for reuse
export function getOpenAIClient(): OpenAI {
	return openai;
}

export interface ParsedSIG {
	dosePerAdministration: number;
	frequencyPerDay: number;
	route: string;
	totalDailyDose: number;
	unit: string; // e.g., "tablets", "mL", "units", "puffs", "doses"
	dosageForm: DosageFormType; // Type of dosage form
}

export type DosageFormType =
	| 'oral_solid' // tablets, capsules, pills
	| 'liquid' // solutions, suspensions, syrups (measured in mL)
	| 'insulin' // insulin injections (measured in units)
	| 'inhaler' // inhalers, nebulizers (measured in puffs/doses)
	| 'other'; // other forms

/**
 * Parse a prescription SIG using OpenAI with caching
 */
export async function parseSIG(sig: string): Promise<ParsedSIG> {
	// Check cache first
	const cacheKey = sig.toLowerCase().trim();
	const cached = sigCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	const prompt = `Parse the following prescription instruction (SIG) and extract the key components. Return ONLY a JSON object with no additional text or markdown formatting.

SIG: "${sig}"

Extract and return as JSON:
{
  "dosePerAdministration": (number of units per dose, e.g., 2 for "2 tablets", 10 for "10 mL", 5 for "5 units", 1 for "1 puff"),
  "frequencyPerDay": (how many times per day, e.g., 2 for "twice daily" or "BID"),
  "route": (administration route, e.g., "by mouth", "subcutaneous", "inhaled", "topical"),
  "totalDailyDose": (dosePerAdministration × frequencyPerDay),
  "unit": (unit of measurement: "tablets", "capsules", "mL", "units", "puffs", "doses", "sprays", etc.),
  "dosageForm": (type: "oral_solid" for tablets/capsules, "liquid" for solutions/syrups, "insulin" for insulin injections, "inhaler" for inhalers/nebulizers, "other" for everything else)
}

Common abbreviations:
- QD/Daily = 1x/day
- BID = 2x/day
- TID = 3x/day
- QID = 4x/day
- Q4H = every 4 hours = 6x/day
- Q6H = every 6 hours = 4x/day
- Q8H = every 8 hours = 3x/day
- Q12H = every 12 hours = 2x/day

Examples:
- "Take 2 tablets by mouth twice daily" → unit: "tablets", dosageForm: "oral_solid"
- "Inject 10 units subcutaneously once daily" → unit: "units", dosageForm: "insulin"
- "Inhale 2 puffs twice daily" → unit: "puffs", dosageForm: "inhaler"
- "Take 5 mL by mouth three times daily" → unit: "mL", dosageForm: "liquid"

Return ONLY the JSON object, nothing else.`;

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are a pharmacy assistant that parses prescription instructions. Always respond with valid JSON only, no markdown or additional text.'
				},
				{
					role: 'user',
					content: prompt
				}
			],
			temperature: 0.1,
			response_format: { type: 'json_object' }
		});

		const content = response.choices[0]?.message?.content;
		if (!content) {
			throw new Error('No response from OpenAI');
		}

		const parsed = JSON.parse(content) as ParsedSIG;

		// Validate the parsed data
		if (
			typeof parsed.dosePerAdministration !== 'number' ||
			typeof parsed.frequencyPerDay !== 'number' ||
			typeof parsed.totalDailyDose !== 'number' ||
			typeof parsed.route !== 'string' ||
			typeof parsed.unit !== 'string' ||
			typeof parsed.dosageForm !== 'string'
		) {
			throw new Error('Invalid SIG parsing response format');
		}

		// Validate dosageForm is one of the allowed types
		const validDosageForms: DosageFormType[] = [
			'oral_solid',
			'liquid',
			'insulin',
			'inhaler',
			'other'
		];
		if (!validDosageForms.includes(parsed.dosageForm as DosageFormType)) {
			// Default to 'other' if invalid
			parsed.dosageForm = 'other';
		}

		// Ensure totalDailyDose is correctly calculated
		parsed.totalDailyDose = parsed.dosePerAdministration * parsed.frequencyPerDay;

		// Store in cache
		if (sigCache.size >= SIG_CACHE_MAX_SIZE) {
			// Remove oldest entry (first key)
			const firstKey = sigCache.keys().next().value;
			sigCache.delete(firstKey);
		}
		sigCache.set(cacheKey, parsed);

		return parsed;
	} catch (error: any) {
		console.error('SIG parsing error:', error);
		throw new Error(`Failed to parse SIG: ${error.message}`);
	}
}

/**
 * Validate SIG input
 */
export function validateSIG(sig: string): { valid: boolean; error?: string } {
	if (!sig || sig.trim().length === 0) {
		return { valid: false, error: 'SIG is required' };
	}

	if (sig.trim().length < 5) {
		return { valid: false, error: 'SIG must be at least 5 characters' };
	}

	return { valid: true };
}
