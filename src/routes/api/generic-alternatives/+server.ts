import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findGenericAlternatives } from '$lib/server/rxnorm';

/**
 * Generic Alternatives API Endpoint
 *
 * POST /api/generic-alternatives
 * Finds generic alternatives for a given drug (by RXCUI)
 *
 * Security: Input validation applied, no PHI processed
 */
export const POST: RequestHandler = async ({ request }) => {
	const startTime = performance.now();

	try {
		const { rxcui } = await request.json();

		// Validate input
		if (!rxcui || typeof rxcui !== 'string' || rxcui.trim().length === 0) {
			return json(
				{
					success: false,
					error: 'RXCUI is required'
				},
				{ status: 400 }
			);
		}

		// Find generic alternatives
		const alternatives = await findGenericAlternatives(rxcui);

		const responseTime = performance.now() - startTime;

		return json({
			success: true,
			alternatives,
			responseTime: Math.round(responseTime)
		});
	} catch (error: any) {
		console.error('Generic alternatives error:', error);

		const responseTime = performance.now() - startTime;

		return json(
			{
				success: false,
				error: error.message || 'Failed to find generic alternatives',
				responseTime: Math.round(responseTime)
			},
			{ status: 500 }
		);
	}
};
