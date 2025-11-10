import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { normalizeDrug, validateDrugInput } from '$lib/server/rxnorm';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { input } = await request.json();

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

		return json({
			success: true,
			...drugInfo
		});
	} catch (error: any) {
		console.error('Drug normalization error:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to normalize drug name'
			},
			{ status: 500 }
		);
	}
};
