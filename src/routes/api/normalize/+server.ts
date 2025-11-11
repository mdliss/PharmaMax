import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { normalizeDrug, validateDrugInput } from '$lib/server/rxnorm';
import { logNormalizationMetric } from '$lib/server/metricsRepository';

/**
 * Drug Normalization API Endpoint
 *
 * POST /api/normalize
 * Normalizes drug names to RxCUI using the RxNorm API
 *
 * Security: Input validation applied, no PHI processed
 * Metrics: Logs normalization success rate and response times
 */
export const POST: RequestHandler = async ({ request }) => {
	const startTime = performance.now();
	let drugInput = '';

	try {
		const { input } = await request.json();
		drugInput = input;

		// Validate input
		const validation = validateDrugInput(input);
		if (!validation.valid) {
			return json(
				{
					success: false,
					error: validation.error || 'Invalid input'
				},
				{ status: 400 }
			);
		}

		// Normalize drug using RxNorm API
		const drugInfo = await normalizeDrug(input);

		// Log success metric
		const responseTime = performance.now() - startTime;
		await logNormalizationMetric({
			drugInput: input,
			rxcui: drugInfo.rxcui,
			success: true,
			responseTime: Math.round(responseTime)
		}).catch(err => console.error('Failed to log normalization metric:', err));

		return json({
			success: true,
			...drugInfo
		});
	} catch (error: any) {
		console.error('Drug normalization error:', error);

		// Log failure metric
		const responseTime = performance.now() - startTime;
		await logNormalizationMetric({
			drugInput: drugInput || 'unknown',
			rxcui: null,
			success: false,
			responseTime: Math.round(responseTime),
			errorMessage: error.message || 'Failed to normalize drug name'
		}).catch(err => console.error('Failed to log normalization metric:', err));

		return json(
			{
				success: false,
				error: error.message || 'Failed to normalize drug name'
			},
			{ status: 500 }
		);
	}
};
