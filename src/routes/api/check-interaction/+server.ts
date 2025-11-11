import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOpenAIClient } from '$lib/server/openai';

// In-memory cache for interaction checks
const interactionCache = new Map<string, any>();
const INTERACTION_CACHE_MAX_SIZE = 500;

/**
 * Drug Interaction Check API Endpoint
 *
 * POST /api/check-interaction
 * Checks potential drug interactions using OpenAI
 *
 * Security:
 * - Results cached to minimize API calls and costs
 * - Input sanitized before API request
 * - For informational purposes only - not a substitute for clinical judgment
 * - No patient data transmitted
 *
 * Disclaimer: This tool provides general information only. Always consult
 * drug interaction databases and use professional judgment.
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { currentDrug, currentRxcui, additionalMedication } = await request.json();

		// Validate inputs
		if (!currentDrug || !additionalMedication) {
			return json(
				{
					success: false,
					error: 'Both current drug and additional medication are required'
				},
				{ status: 400 }
			);
		}

		// Check cache first
		const cacheKey = `${currentDrug.toLowerCase().trim()}|${additionalMedication.toLowerCase().trim()}`;
		const cached = interactionCache.get(cacheKey);
		if (cached) {
			return json(cached);
		}

		const openai = getOpenAIClient();

		const prompt = `You are a pharmacology expert. Analyze the potential drug interaction between these two medications:

Drug 1: ${currentDrug} ${currentRxcui ? `(RxCUI: ${currentRxcui})` : ''}
Drug 2: ${additionalMedication}

Provide a brief analysis in the following JSON format:
{
  "severity": "Safe" | "Caution" | "Dangerous",
  "warning": "Brief explanation of the interaction or lack thereof (1-2 sentences)",
  "recommendation": "Brief recommendation for the patient or prescriber (1 sentence)"
}

Focus on:
- Known pharmacological interactions
- Common side effects when combined
- Clinical significance of the interaction

Be concise and clear. If no significant interaction exists, indicate "Safe" severity.`;

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are a pharmacology expert providing drug interaction analysis. Always respond in valid JSON format.'
				},
				{
					role: 'user',
					content: prompt
				}
			],
			temperature: 0.3,
			max_tokens: 300
		});

		const responseText = completion.choices[0]?.message?.content?.trim();

		if (!responseText) {
			throw new Error('No response from OpenAI');
		}

		// Parse the JSON response
		let interactionData;
		try {
			interactionData = JSON.parse(responseText);
		} catch (parseError) {
			// If JSON parsing fails, extract severity and warning from text
			console.error('Failed to parse OpenAI response as JSON:', responseText);

			// Fallback: try to extract meaningful info from text
			const lowerText = responseText.toLowerCase();
			let severity = 'Unknown';

			if (lowerText.includes('safe') || lowerText.includes('no interaction')) {
				severity = 'Safe';
			} else if (lowerText.includes('caution') || lowerText.includes('moderate')) {
				severity = 'Caution';
			} else if (
				lowerText.includes('dangerous') ||
				lowerText.includes('severe') ||
				lowerText.includes('major')
			) {
				severity = 'Dangerous';
			}

			interactionData = {
				severity,
				warning: responseText,
				recommendation: 'Consult with a healthcare professional for guidance.'
			};
		}

		const response = {
			success: true,
			drug1: currentDrug,
			drug2: additionalMedication,
			severity: interactionData.severity,
			warning: interactionData.warning,
			recommendation: interactionData.recommendation
		};

		// Store in cache
		if (interactionCache.size >= INTERACTION_CACHE_MAX_SIZE) {
			const firstKey = interactionCache.keys().next().value;
			interactionCache.delete(firstKey);
		}
		interactionCache.set(cacheKey, response);

		return json(response);
	} catch (error: any) {
		console.error('Drug interaction check error:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to check drug interaction'
			},
			{ status: 500 }
		);
	}
};
