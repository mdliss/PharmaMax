import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOpenAIClient } from '$lib/server/openai';

// In-memory cache for multi-drug interaction checks
const multiInteractionCache = new Map<string, any>();
const CACHE_MAX_SIZE = 200;

/**
 * Multi-Drug Interaction Check API Endpoint
 *
 * POST /api/check-interactions-multi
 * Checks potential drug interactions among multiple medications using OpenAI
 *
 * Request body: { medications: string[] }
 * Returns: { success: boolean, interactions: Array<{drug1, drug2, severity, warning}> }
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { medications } = await request.json();

		// Validate inputs
		if (!medications || !Array.isArray(medications) || medications.length < 2) {
			return json(
				{
					success: false,
					error: 'At least two medications are required'
				},
				{ status: 400 }
			);
		}

		// Check cache first
		const cacheKey = medications
			.map((m) => m.toLowerCase().trim())
			.sort()
			.join('|');
		const cached = multiInteractionCache.get(cacheKey);
		if (cached) {
			return json(cached);
		}

		const openai = getOpenAIClient();

		// Generate all pairs of medications to check
		const pairs: Array<[string, string]> = [];
		for (let i = 0; i < medications.length; i++) {
			for (let j = i + 1; j < medications.length; j++) {
				pairs.push([medications[i], medications[j]]);
			}
		}

		const medicationList = medications.map((m, i) => `${i + 1}. ${m}`).join('\n');

		const prompt = `You are a pharmacology expert. Analyze potential drug interactions among these medications:

${medicationList}

For each pair of medications, assess their interaction. Respond in the following JSON format:
{
  "interactions": [
    {
      "drug1": "medication name",
      "drug2": "medication name",
      "severity": "Safe" | "Caution" | "Dangerous",
      "warning": "Brief explanation (1-2 sentences)",
      "recommendation": "Brief recommendation (1 sentence)"
    }
  ],
  "overallRisk": "Low" | "Moderate" | "High",
  "overallSummary": "Brief summary of overall interaction risk (2-3 sentences)"
}

Focus on:
- Known pharmacological interactions
- Additive or synergistic effects
- Common side effects when combined
- Clinical significance

Be concise and clear. If no significant interaction exists between a pair, indicate "Safe" severity.`;

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are a pharmacology expert providing drug interaction analysis for multiple medications. Always respond in valid JSON format.'
				},
				{
					role: 'user',
					content: prompt
				}
			],
			temperature: 0.3,
			max_tokens: 1000
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
			console.error('Failed to parse OpenAI response as JSON:', responseText);
			throw new Error('Failed to parse interaction analysis');
		}

		const response = {
			success: true,
			medications,
			interactions: interactionData.interactions || [],
			overallRisk: interactionData.overallRisk || 'Unknown',
			overallSummary: interactionData.overallSummary || 'Unable to assess overall risk'
		};

		// Store in cache
		if (multiInteractionCache.size >= CACHE_MAX_SIZE) {
			const firstKey = multiInteractionCache.keys().next().value;
			multiInteractionCache.delete(firstKey);
		}
		multiInteractionCache.set(cacheKey, response);

		return json(response);
	} catch (error: any) {
		console.error('Multi-drug interaction check error:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to check drug interactions'
			},
			{ status: 500 }
		);
	}
};
