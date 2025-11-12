import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	findSafetyInfo,
	checkDoseLimit,
	getAgeWarnings,
	type SafetyInfo
} from '$lib/data/drugSafetyData';

export interface DrugSafetyCheckRequest {
	drugName: string;
	dailyDose?: number;
	doseUnit?: string;
	patientAge?: number;
	isPregnant?: boolean;
	isLactating?: boolean;
	renalImpairment?: 'None' | 'Mild' | 'Moderate' | 'Severe';
	hepaticImpairment?: 'None' | 'Mild' | 'Moderate' | 'Severe';
}

export interface DrugSafetyCheckResponse {
	hasInfo: boolean;
	safetyInfo?: {
		genericName: string;
		brandNames: string[];
		maxDailyDose?: {
			amount: number;
			unit: string;
			warning?: string;
		};
		maxSingleDose?: {
			amount: number;
			unit: string;
		};
		pregnancyCategory: string;
		pregnancyWarning?: string;
		lactationRisk: string;
		lactationWarning?: string;
		renalAdjustment: boolean;
		renalWarning?: string;
		hepaticAdjustment: boolean;
		hepaticWarning?: string;
		blackBoxWarnings?: string[];
	};
	alerts: Array<{
		severity: 'critical' | 'warning' | 'info';
		category: string;
		message: string;
	}>;
}

/**
 * POST /api/check-drug-safety
 *
 * Check drug safety information and generate alerts based on patient conditions
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body: DrugSafetyCheckRequest = await request.json();
		const {
			drugName,
			dailyDose,
			doseUnit,
			patientAge,
			isPregnant,
			isLactating,
			renalImpairment,
			hepaticImpairment
		} = body;

		if (!drugName || typeof drugName !== 'string') {
			return json(
				{
					error: 'Drug name is required'
				},
				{ status: 400 }
			);
		}

		// Find safety info for this drug
		const safetyInfo = findSafetyInfo(drugName);

		if (!safetyInfo) {
			return json({
				hasInfo: false,
				alerts: []
			});
		}

		// Build response
		const response: DrugSafetyCheckResponse = {
			hasInfo: true,
			safetyInfo: {
				genericName: safetyInfo.genericName,
				brandNames: safetyInfo.brandNames,
				maxDailyDose: safetyInfo.maxDailyDose,
				maxSingleDose: safetyInfo.maxSingleDose,
				pregnancyCategory: safetyInfo.pregnancyCategory,
				pregnancyWarning: safetyInfo.pregnancyWarning,
				lactationRisk: safetyInfo.lactationRisk,
				lactationWarning: safetyInfo.lactationWarning,
				renalAdjustment: safetyInfo.renalAdjustment,
				renalWarning: safetyInfo.renalWarning,
				hepaticAdjustment: safetyInfo.hepaticAdjustment,
				hepaticWarning: safetyInfo.hepaticWarning,
				blackBoxWarnings: safetyInfo.blackBoxWarnings
			},
			alerts: []
		};

		// Check dose limits
		if (dailyDose && doseUnit) {
			const doseWarning = checkDoseLimit(safetyInfo, dailyDose, doseUnit);
			if (doseWarning) {
				response.alerts.push({
					severity: 'critical',
					category: 'Dose Limit',
					message: doseWarning
				});
			}
		}

		// Check age-specific warnings
		if (patientAge !== undefined) {
			const ageWarnings = getAgeWarnings(safetyInfo, patientAge);
			for (const warning of ageWarnings) {
				response.alerts.push({
					severity: 'warning',
					category: 'Age-Specific',
					message: warning
				});
			}
		}

		// Pregnancy warnings
		if (isPregnant) {
			const category = safetyInfo.pregnancyCategory;
			if (category === 'D' || category === 'X') {
				response.alerts.push({
					severity: 'critical',
					category: 'Pregnancy',
					message: `PREGNANCY CATEGORY ${category}: ${safetyInfo.pregnancyWarning || 'May cause fetal harm'}`
				});
			} else if (category === 'C' && safetyInfo.pregnancyWarning) {
				response.alerts.push({
					severity: 'warning',
					category: 'Pregnancy',
					message: `Pregnancy Category C: ${safetyInfo.pregnancyWarning}`
				});
			} else if (category === 'B') {
				response.alerts.push({
					severity: 'info',
					category: 'Pregnancy',
					message: 'Pregnancy Category B: Animal studies show no risk, but no adequate human studies'
				});
			}
		}

		// Lactation warnings
		if (isLactating) {
			if (safetyInfo.lactationRisk === 'Avoid') {
				response.alerts.push({
					severity: 'critical',
					category: 'Lactation',
					message: `NOT RECOMMENDED during breastfeeding${safetyInfo.lactationWarning ? ': ' + safetyInfo.lactationWarning : ''}`
				});
			} else if (safetyInfo.lactationRisk === 'Use Caution') {
				response.alerts.push({
					severity: 'warning',
					category: 'Lactation',
					message: `Use caution during breastfeeding${safetyInfo.lactationWarning ? ': ' + safetyInfo.lactationWarning : ''}`
				});
			}
		}

		// Renal impairment warnings
		if (renalImpairment && renalImpairment !== 'None' && safetyInfo.renalAdjustment) {
			response.alerts.push({
				severity: renalImpairment === 'Severe' ? 'critical' : 'warning',
				category: 'Renal Function',
				message: `Renal dose adjustment required (${renalImpairment})${safetyInfo.renalWarning ? ': ' + safetyInfo.renalWarning : ''}`
			});
		}

		// Hepatic impairment warnings
		if (hepaticImpairment && hepaticImpairment !== 'None' && safetyInfo.hepaticAdjustment) {
			response.alerts.push({
				severity: hepaticImpairment === 'Severe' ? 'critical' : 'warning',
				category: 'Hepatic Function',
				message: `Hepatic dose adjustment required (${hepaticImpairment})${safetyInfo.hepaticWarning ? ': ' + safetyInfo.hepaticWarning : ''}`
			});
		}

		// Black box warnings
		if (safetyInfo.blackBoxWarnings && safetyInfo.blackBoxWarnings.length > 0) {
			for (const warning of safetyInfo.blackBoxWarnings) {
				response.alerts.push({
					severity: 'critical',
					category: 'Black Box Warning',
					message: warning
				});
			}
		}

		return json(response);
	} catch (error) {
		console.error('Error checking drug safety:', error);
		return json(
			{
				error: 'Failed to check drug safety',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};

/**
 * GET /api/check-drug-safety?drugName=xyz&patientAge=25
 */
export const GET: RequestHandler = async ({ url }) => {
	const drugName = url.searchParams.get('drugName');
	const dailyDose = url.searchParams.get('dailyDose');
	const doseUnit = url.searchParams.get('doseUnit');
	const patientAge = url.searchParams.get('patientAge');
	const isPregnant = url.searchParams.get('isPregnant') === 'true';
	const isLactating = url.searchParams.get('isLactating') === 'true';
	const renalImpairment = url.searchParams.get('renalImpairment');
	const hepaticImpairment = url.searchParams.get('hepaticImpairment');

	if (!drugName) {
		return json(
			{
				error: 'Drug name is required'
			},
			{ status: 400 }
		);
	}

	const requestBody: DrugSafetyCheckRequest = {
		drugName,
		dailyDose: dailyDose ? parseFloat(dailyDose) : undefined,
		doseUnit: doseUnit || undefined,
		patientAge: patientAge ? parseInt(patientAge, 10) : undefined,
		isPregnant,
		isLactating,
		renalImpairment: (renalImpairment as any) || undefined,
		hepaticImpairment: (hepaticImpairment as any) || undefined
	};

	// Reuse POST logic
	return POST({
		request: {
			json: async () => requestBody
		}
	} as any);
};
