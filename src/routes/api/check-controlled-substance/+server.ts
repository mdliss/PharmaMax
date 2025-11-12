import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	detectControlledSubstance,
	checkQuantityLimit,
	getScheduleBadge,
	getMaxRefills,
	type ControlledSubstance
} from '$lib/data/deaSchedules';

export interface ControlledSubstanceCheckResponse {
	isControlled: boolean;
	substance?: {
		genericName: string;
		commonBrandNames: string[];
		schedule: string;
		scheduleBadge: string;
		maxRefills: number;
		typicalMaxDaysSupply: number;
		requiresPrescriberDEA: boolean;
		restrictions: string[];
	};
	warnings?: string[];
}

/**
 * POST /api/check-controlled-substance
 *
 * Check if a drug is a controlled substance and return DEA schedule information
 *
 * Request body:
 * {
 *   drugName: string,
 *   daysSupply?: number  // Optional, for quantity limit checking
 * }
 *
 * Response:
 * {
 *   isControlled: boolean,
 *   substance?: { ... schedule info ... },
 *   warnings?: string[]
 * }
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { drugName, daysSupply } = await request.json();

		if (!drugName || typeof drugName !== 'string') {
			return json(
				{
					error: 'Drug name is required'
				},
				{ status: 400 }
			);
		}

		// Detect if drug is a controlled substance
		const substance = detectControlledSubstance(drugName);

		if (!substance) {
			return json({
				isControlled: false
			});
		}

		// Build response with substance information
		const response: ControlledSubstanceCheckResponse = {
			isControlled: true,
			substance: {
				genericName: substance.genericName,
				commonBrandNames: substance.commonBrandNames,
				schedule: substance.scheduleInfo.schedule,
				scheduleBadge: getScheduleBadge(substance),
				maxRefills: getMaxRefills(substance),
				typicalMaxDaysSupply: substance.scheduleInfo.typicalMaxDaysSupply,
				requiresPrescriberDEA: substance.scheduleInfo.requiresPrescriberDEA,
				restrictions: substance.scheduleInfo.additionalRestrictions || []
			},
			warnings: []
		};

		// Check quantity limits if days supply provided
		if (daysSupply && typeof daysSupply === 'number') {
			const quantityWarning = checkQuantityLimit(substance, daysSupply);
			if (quantityWarning) {
				response.warnings?.push(quantityWarning);
			}
		}

		// Add schedule-specific warnings
		if (substance.scheduleInfo.schedule === 'II') {
			response.warnings?.push('⚠️ Schedule II: No refills permitted');
			response.warnings?.push('⚠️ Written or electronic prescription required (emergency supply: 72 hours)');
		}

		return json(response);
	} catch (error) {
		console.error('Error checking controlled substance:', error);
		return json(
			{
				error: 'Failed to check controlled substance',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};

/**
 * GET /api/check-controlled-substance?drugName=xyz&daysSupply=30
 *
 * Alternative GET endpoint for simple checks
 */
export const GET: RequestHandler = async ({ url }) => {
	const drugName = url.searchParams.get('drugName');
	const daysSupplyStr = url.searchParams.get('daysSupply');

	if (!drugName) {
		return json(
			{
				error: 'Drug name is required'
			},
			{ status: 400 }
		);
	}

	const daysSupply = daysSupplyStr ? parseInt(daysSupplyStr, 10) : undefined;

	// Reuse POST logic
	return POST({
		request: {
			json: async () => ({ drugName, daysSupply })
		}
	} as any);
};
