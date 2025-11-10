import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOpenAIClient } from '$lib/server/openai';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { query, prescriptionContext } = await request.json();

		// Validate input
		if (!query || !query.trim()) {
			return json(
				{
					success: false,
					error: 'Query is required'
				},
				{ status: 400 }
			);
		}

		const openai = getOpenAIClient();

		// Build context message if prescription data is available
		let contextMessage = '';
		if (prescriptionContext) {
			contextMessage = `\n\nCurrent prescription context:
- Drug: ${prescriptionContext.drugName}
- RxCUI: ${prescriptionContext.rxcui}
- SIG: ${prescriptionContext.sig}
- Days Supply: ${prescriptionContext.daysSupply} days
- Total Quantity: ${prescriptionContext.totalQuantity} ${prescriptionContext.unit}`;
		}

		const systemPrompt = `You are a knowledgeable pharmacy assistant helping with prescription-related questions. Provide clear, concise, and accurate information about medications, dosing, drug interactions, and pharmacy practices.

Important guidelines:
- Keep responses brief and focused (2-4 sentences max)
- Always recommend consulting a healthcare professional for medical decisions
- Be factual and evidence-based
- If you're unsure, acknowledge uncertainty
- Do not diagnose conditions or prescribe medications
${contextMessage}`;

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content: systemPrompt
				},
				{
					role: 'user',
					content: query
				}
			],
			temperature: 0.7,
			max_tokens: 250
		});

		const response = completion.choices[0]?.message?.content?.trim();

		if (!response) {
			throw new Error('No response from OpenAI');
		}

		return json({
			success: true,
			query,
			response,
			hasContext: !!prescriptionContext
		});
	} catch (error: any) {
		console.error('Chat API error:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to process chat query'
			},
			{ status: 500 }
		);
	}
};
