/**
 * Mock Insurance Formulary Data
 * In production, this would connect to real formulary APIs from insurance providers
 */

export interface FormularyDrugInfo {
	rxcui: string;
	drugName: string;
	tier: 1 | 2 | 3 | 4 | 'Not Covered';
	priorAuthRequired: boolean;
	quantityLimit?: string;
	stepTherapyRequired: boolean;
	copay?: string;
	notes?: string;
}

export interface InsurancePlan {
	id: string;
	name: string;
	type: 'Commercial' | 'Medicare' | 'Medicaid' | 'Government';
	formulary: Record<string, FormularyDrugInfo>;
}

// Mock formulary data for common drugs
export const FORMULARY_DATABASE: Record<string, InsurancePlan> = {
	'united-healthcare': {
		id: 'united-healthcare',
		name: 'UnitedHealthcare',
		type: 'Commercial',
		formulary: {
			// Lisinopril - Generic ACE Inhibitor
			'104375': {
				rxcui: '104375',
				drugName: 'Lisinopril',
				tier: 1,
				priorAuthRequired: false,
				copay: '$10',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			// Metformin - Generic Diabetes medication
			'6809': {
				rxcui: '6809',
				drugName: 'Metformin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$10',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			// Atorvastatin - Generic Statin
			'83367': {
				rxcui: '83367',
				drugName: 'Atorvastatin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$10',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			// Omeprazole - Generic PPI
			'7646': {
				rxcui: '7646',
				drugName: 'Omeprazole',
				tier: 1,
				priorAuthRequired: false,
				copay: '$10',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			// Levothyroxine - Generic Thyroid medication
			'10582': {
				rxcui: '10582',
				drugName: 'Levothyroxine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$10',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			// Amlodipine - Generic Calcium Channel Blocker
			'17767': {
				rxcui: '17767',
				drugName: 'Amlodipine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$10',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			// Eliquis - Brand name anticoagulant (higher tier)
			'1364430': {
				rxcui: '1364430',
				drugName: 'Eliquis',
				tier: 3,
				priorAuthRequired: true,
				copay: '$150',
				stepTherapyRequired: true,
				quantityLimit: '60 tablets per 30 days',
				notes: 'Requires trial of warfarin first. Prior authorization required.'
			},
			// Humira - Specialty biologic (highest tier)
			'356906': {
				rxcui: '356906',
				drugName: 'Humira',
				tier: 4,
				priorAuthRequired: true,
				copay: '$300+',
				stepTherapyRequired: true,
				quantityLimit: 'As prescribed',
				notes: 'Specialty tier. Requires prior authorization and step therapy.'
			}
		}
	},
	'blue-cross': {
		id: 'blue-cross',
		name: 'Blue Cross Blue Shield',
		type: 'Commercial',
		formulary: {
			'104375': {
				rxcui: '104375',
				drugName: 'Lisinopril',
				tier: 1,
				priorAuthRequired: false,
				copay: '$5',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'6809': {
				rxcui: '6809',
				drugName: 'Metformin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$5',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'83367': {
				rxcui: '83367',
				drugName: 'Atorvastatin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$5',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'7646': {
				rxcui: '7646',
				drugName: 'Omeprazole',
				tier: 2,
				priorAuthRequired: false,
				copay: '$25',
				stepTherapyRequired: false,
				notes: 'Non-preferred generic'
			},
			'10582': {
				rxcui: '10582',
				drugName: 'Levothyroxine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$5',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'17767': {
				rxcui: '17767',
				drugName: 'Amlodipine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$5',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'1364430': {
				rxcui: '1364430',
				drugName: 'Eliquis',
				tier: 3,
				priorAuthRequired: true,
				copay: '$125',
				stepTherapyRequired: true,
				quantityLimit: '60 tablets per 30 days',
				notes: 'Prior authorization required. Must try warfarin first.'
			},
			'356906': {
				rxcui: '356906',
				drugName: 'Humira',
				tier: 4,
				priorAuthRequired: true,
				copay: '$250',
				stepTherapyRequired: true,
				notes: 'Specialty tier. Requires prior authorization.'
			}
		}
	},
	'medicare-part-d': {
		id: 'medicare-part-d',
		name: 'Medicare Part D',
		type: 'Medicare',
		formulary: {
			'104375': {
				rxcui: '104375',
				drugName: 'Lisinopril',
				tier: 1,
				priorAuthRequired: false,
				copay: '$4',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'6809': {
				rxcui: '6809',
				drugName: 'Metformin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$4',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'83367': {
				rxcui: '83367',
				drugName: 'Atorvastatin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$4',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'7646': {
				rxcui: '7646',
				drugName: 'Omeprazole',
				tier: 1,
				priorAuthRequired: false,
				copay: '$9',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'10582': {
				rxcui: '10582',
				drugName: 'Levothyroxine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$4',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'17767': {
				rxcui: '17767',
				drugName: 'Amlodipine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$4',
				stepTherapyRequired: false,
				notes: 'Preferred generic'
			},
			'1364430': {
				rxcui: '1364430',
				drugName: 'Eliquis',
				tier: 3,
				priorAuthRequired: true,
				copay: '$47',
				stepTherapyRequired: true,
				quantityLimit: '60 tablets per 30 days',
				notes: 'Prior authorization required during coverage gap'
			},
			'356906': {
				rxcui: '356906',
				drugName: 'Humira',
				tier: 4,
				priorAuthRequired: true,
				copay: '25% coinsurance',
				stepTherapyRequired: true,
				notes: 'Specialty tier. Covered under Part D specialty pharmacy.'
			}
		}
	},
	'medicaid': {
		id: 'medicaid',
		name: 'Medicaid',
		type: 'Medicaid',
		formulary: {
			'104375': {
				rxcui: '104375',
				drugName: 'Lisinopril',
				tier: 1,
				priorAuthRequired: false,
				copay: '$0-3',
				stepTherapyRequired: false,
				notes: 'Covered'
			},
			'6809': {
				rxcui: '6809',
				drugName: 'Metformin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$0-3',
				stepTherapyRequired: false,
				notes: 'Covered'
			},
			'83367': {
				rxcui: '83367',
				drugName: 'Atorvastatin',
				tier: 1,
				priorAuthRequired: false,
				copay: '$0-3',
				stepTherapyRequired: false,
				notes: 'Covered'
			},
			'7646': {
				rxcui: '7646',
				drugName: 'Omeprazole',
				tier: 1,
				priorAuthRequired: false,
				copay: '$0-3',
				stepTherapyRequired: false,
				notes: 'Covered'
			},
			'10582': {
				rxcui: '10582',
				drugName: 'Levothyroxine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$0-3',
				stepTherapyRequired: false,
				notes: 'Covered'
			},
			'17767': {
				rxcui: '17767',
				drugName: 'Amlodipine',
				tier: 1,
				priorAuthRequired: false,
				copay: '$0-3',
				stepTherapyRequired: false,
				notes: 'Covered'
			},
			'1364430': {
				rxcui: '1364430',
				drugName: 'Eliquis',
				tier: 2,
				priorAuthRequired: true,
				copay: '$0-8',
				stepTherapyRequired: true,
				quantityLimit: '60 tablets per 30 days',
				notes: 'Prior authorization required. Must document warfarin contraindication.'
			},
			'356906': {
				rxcui: '356906',
				drugName: 'Humira',
				tier: 3,
				priorAuthRequired: true,
				copay: '$0-8',
				stepTherapyRequired: true,
				notes: 'Prior authorization required. Step therapy applies.'
			}
		}
	},
	'no-insurance': {
		id: 'no-insurance',
		name: 'No Insurance (Cash Pay)',
		type: 'Government',
		formulary: {}
	}
};

export const INSURANCE_PLANS = Object.values(FORMULARY_DATABASE).map((plan) => ({
	id: plan.id,
	name: plan.name,
	type: plan.type
}));

/**
 * Check formulary coverage for a drug
 */
export function checkFormularyCoverage(
	insurancePlanId: string,
	rxcui: string
): FormularyDrugInfo | null {
	const plan = FORMULARY_DATABASE[insurancePlanId];
	if (!plan) return null;

	return plan.formulary[rxcui] || null;
}

/**
 * Get coverage summary for display
 */
export function getCoverageSummary(
	coverageInfo: FormularyDrugInfo | null,
	insurancePlanName: string
): {
	isCovered: boolean;
	tierLabel: string;
	copay: string;
	requiresAuth: boolean;
	restrictions: string[];
} {
	if (!coverageInfo) {
		return {
			isCovered: false,
			tierLabel: 'Not on formulary',
			copay: 'N/A',
			requiresAuth: false,
			restrictions: ['This medication is not covered by ' + insurancePlanName]
		};
	}

	const restrictions: string[] = [];
	if (coverageInfo.priorAuthRequired) {
		restrictions.push('Prior authorization required');
	}
	if (coverageInfo.stepTherapyRequired) {
		restrictions.push('Step therapy required - must try other medications first');
	}
	if (coverageInfo.quantityLimit) {
		restrictions.push(`Quantity limit: ${coverageInfo.quantityLimit}`);
	}

	return {
		isCovered: coverageInfo.tier !== 'Not Covered',
		tierLabel: `Tier ${coverageInfo.tier}`,
		copay: coverageInfo.copay || 'Varies',
		requiresAuth: coverageInfo.priorAuthRequired,
		restrictions
	};
}
