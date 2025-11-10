/**
 * OpenAI Integration for SIG Parsing
 */

import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

// Export the OpenAI client for reuse
export function getOpenAIClient(): OpenAI {
	return openai;
}

export interface ParsedSIG {
	dosePerAdministration: number;
	frequencyPerDay: number;
	route: string;
	totalDailyDose: number;
}

/**
 * Parse a prescription SIG using OpenAI
 */
export async function parseSIG(sig: string): Promise<ParsedSIG> {
	const prompt = `Parse the following prescription instruction (SIG) and extract the key components. Return ONLY a JSON object with no additional text or markdown formatting.

SIG: "${sig}"

Extract and return as JSON:
{
  "dosePerAdministration": (number of units per dose, e.g., 2 for "2 tablets"),
  "frequencyPerDay": (how many times per day, e.g., 2 for "twice daily" or "BID"),
  "route": (administration route, e.g., "by mouth", "topical", "inhaled"),
  "totalDailyDose": (dosePerAdministration × frequencyPerDay)
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
			typeof parsed.route !== 'string'
		) {
			throw new Error('Invalid SIG parsing response format');
		}

		// Ensure totalDailyDose is correctly calculated
		parsed.totalDailyDose = parsed.dosePerAdministration * parsed.frequencyPerDay;

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
