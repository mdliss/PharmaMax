import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parseSIG, validateSIG } from '$lib/server/openai';
import { calculateQuantity, recommendPackages, validateDaysSupply } from '$lib/server/calculations';
import { getNDCsForDrug } from '$lib/server/fda';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { rxcui, sig, daysSupply, drugName } = await request.json();

		// Validate inputs
		if (!rxcui || !sig || daysSupply === undefined) {
			return json(
				{
					success: false,
					error: 'Missing required fields: rxcui, sig, and daysSupply'
				},
				{ status: 400 }
			);
		}

		// Validate SIG
		const sigValidation = validateSIG(sig);
		if (!sigValidation.valid) {
			return json(
				{
					success: false,
					error: sigValidation.error
				},
				{ status: 400 }
			);
		}

		// Validate days' supply
		const daysSupplyValidation = validateDaysSupply(daysSupply);
		if (!daysSupplyValidation.valid) {
			return json(
				{
					success: false,
					error: daysSupplyValidation.error
				},
				{ status: 400 }
			);
		}

		// Parse SIG using OpenAI
		const parsedSIG = await parseSIG(sig);

		// Calculate total quantity needed
		const calculation = calculateQuantity(parsedSIG, daysSupply);

		// Get NDCs from FDA (mock for now)
		const ndcs = await getNDCsForDrug(rxcui, drugName || '');

		// Recommend optimal package combination
		const recommendation = recommendPackages(ndcs, calculation.totalQuantityNeeded);

		// Return complete response
		return json({
			success: true,
			prescription: {
				rxcui,
				drugName: drugName || `Drug with RxCUI ${rxcui}`,
				sig,
				daysSupply
			},
			sigParsed: parsedSIG,
			calculation,
			ndcs,
			recommendation
		});
	} catch (error: any) {
		console.error('Calculation error:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to calculate quantity'
			},
			{ status: 500 }
		);
	}
};
