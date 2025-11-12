/**
 * Drug Safety Data
 *
 * Comprehensive safety information for commonly prescribed medications including:
 * - Maximum daily dose limits
 * - Pregnancy categories (FDA and newer pregnancy/lactation labeling)
 * - Renal/hepatic dosing adjustments
 * - Age-specific warnings (pediatric/geriatric)
 */

export type PregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X' | 'N/A';
export type LactationRisk = 'Safe' | 'Use Caution' | 'Avoid' | 'Unknown';
export type OrganImpairment = 'None' | 'Mild' | 'Moderate' | 'Severe';

export interface DoseLimit {
	amount: number;
	unit: string;
	frequency: 'per dose' | 'daily' | 'weekly';
	warning?: string;
}

export interface SafetyInfo {
	genericName: string;
	brandNames: string[];

	// Dose limits
	maxDailyDose?: DoseLimit;
	maxSingleDose?: DoseLimit;

	// Pregnancy and lactation
	pregnancyCategory: PregnancyCategory;
	pregnancyWarning?: string;
	lactationRisk: LactationRisk;
	lactationWarning?: string;

	// Organ function warnings
	renalAdjustment: boolean;
	renalWarning?: string;
	hepaticAdjustment: boolean;
	hepaticWarning?: string;

	// Age-specific warnings
	pediatricWarning?: string;
	geriatricWarning?: string;
	minAge?: number; // Minimum age in years, if restricted

	// General warnings
	blackBoxWarnings?: string[];
	commonSideEffects?: string[];

	// Search patterns for matching
	searchPatterns: string[];
}

export const DRUG_SAFETY_DATABASE: SafetyInfo[] = [
	// OPIOIDS
	{
		genericName: 'Oxycodone',
		brandNames: ['OxyContin', 'Roxicodone'],
		maxDailyDose: { amount: 90, unit: 'mg', frequency: 'daily', warning: 'Higher doses increase overdose risk' },
		maxSingleDose: { amount: 30, unit: 'mg', frequency: 'per dose' },
		pregnancyCategory: 'C',
		pregnancyWarning: 'Risk of neonatal opioid withdrawal syndrome if used during pregnancy',
		lactationRisk: 'Use Caution',
		lactationWarning: 'Excreted in breast milk; monitor infant for sedation and respiratory depression',
		renalAdjustment: true,
		renalWarning: 'Reduce dose by 50% in severe renal impairment',
		hepaticAdjustment: true,
		hepaticWarning: 'Start with lower doses in hepatic impairment',
		geriatricWarning: 'Increased sensitivity in elderly; start with lower doses',
		blackBoxWarnings: [
			'Risk of addiction, abuse, and misuse',
			'Life-threatening respiratory depression',
			'Accidental ingestion can cause fatal overdose'
		],
		searchPatterns: ['oxycodone', 'oxycontin', 'roxicodone']
	},
	{
		genericName: 'Hydrocodone',
		brandNames: ['Vicodin', 'Norco', 'Lortab'],
		maxDailyDose: { amount: 60, unit: 'mg', frequency: 'daily', warning: 'Limited by acetaminophen in combination products' },
		pregnancyCategory: 'C',
		pregnancyWarning: 'Prolonged use during pregnancy can result in neonatal opioid withdrawal syndrome',
		lactationRisk: 'Use Caution',
		renalAdjustment: true,
		renalWarning: 'Accumulation may occur with renal dysfunction',
		hepaticAdjustment: true,
		hepaticWarning: 'Use with caution; acetaminophen component hepatotoxic',
		geriatricWarning: 'Increased risk of respiratory depression in elderly',
		blackBoxWarnings: [
			'Addiction, abuse, and misuse',
			'Life-threatening respiratory depression',
			'Acetaminophen hepatotoxicity'
		],
		searchPatterns: ['hydrocodone', 'vicodin', 'norco', 'lortab']
	},

	// ANTIBIOTICS
	{
		genericName: 'Amoxicillin',
		brandNames: ['Amoxil', 'Trimox'],
		maxDailyDose: { amount: 4000, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'B',
		lactationRisk: 'Safe',
		lactationWarning: 'Compatible with breastfeeding',
		renalAdjustment: true,
		renalWarning: 'Extend dosing interval if CrCl <30 mL/min',
		hepaticAdjustment: false,
		pediatricWarning: 'Safe for pediatric use; dose based on weight',
		searchPatterns: ['amoxicillin', 'amoxil', 'trimox']
	},
	{
		genericName: 'Azithromycin',
		brandNames: ['Zithromax', 'Z-Pak'],
		maxDailyDose: { amount: 2000, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'B',
		lactationRisk: 'Safe',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Use with caution in hepatic impairment',
		blackBoxWarnings: ['QT prolongation; avoid in patients with prolonged QT interval'],
		searchPatterns: ['azithromycin', 'zithromax', 'z-pak', 'zpak']
	},
	{
		genericName: 'Ciprofloxacin',
		brandNames: ['Cipro'],
		maxDailyDose: { amount: 1500, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		pregnancyWarning: 'Avoid in pregnancy unless benefit outweighs risk',
		lactationRisk: 'Use Caution',
		renalAdjustment: true,
		renalWarning: 'Reduce dose if CrCl <30 mL/min',
		hepaticAdjustment: false,
		pediatricWarning: 'Generally avoided in children due to risk of cartilage damage',
		geriatricWarning: 'Increased risk of tendon rupture in elderly',
		blackBoxWarnings: [
			'Tendinitis and tendon rupture',
			'Peripheral neuropathy',
			'CNS effects including seizures'
		],
		searchPatterns: ['ciprofloxacin', 'cipro']
	},

	// CARDIOVASCULAR
	{
		genericName: 'Lisinopril',
		brandNames: ['Prinivil', 'Zestril'],
		maxDailyDose: { amount: 80, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'D',
		pregnancyWarning: 'CONTRAINDICATED in pregnancy; can cause fetal harm',
		lactationRisk: 'Use Caution',
		renalAdjustment: true,
		renalWarning: 'Start with lower dose (5mg) if CrCl <30 mL/min',
		hepaticAdjustment: false,
		geriatricWarning: 'Start with lower doses; monitor for hypotension',
		blackBoxWarnings: ['Fetal toxicity - discontinue when pregnancy detected'],
		searchPatterns: ['lisinopril', 'prinivil', 'zestril']
	},
	{
		genericName: 'Metoprolol',
		brandNames: ['Lopressor', 'Toprol-XL'],
		maxDailyDose: { amount: 400, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		lactationRisk: 'Safe',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Start with lower doses in hepatic impairment',
		geriatricWarning: 'Increased risk of bradycardia and hypotension',
		searchPatterns: ['metoprolol', 'lopressor', 'toprol']
	},
	{
		genericName: 'Amlodipine',
		brandNames: ['Norvasc'],
		maxDailyDose: { amount: 10, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		lactationRisk: 'Unknown',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Start with 2.5mg in hepatic impairment',
		geriatricWarning: 'Increased plasma concentrations in elderly; start low',
		searchPatterns: ['amlodipine', 'norvasc']
	},
	{
		genericName: 'Atorvastatin',
		brandNames: ['Lipitor'],
		maxDailyDose: { amount: 80, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'X',
		pregnancyWarning: 'CONTRAINDICATED in pregnancy; may cause fetal harm',
		lactationRisk: 'Avoid',
		lactationWarning: 'Contraindicated during breastfeeding',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Contraindicated in active liver disease',
		searchPatterns: ['atorvastatin', 'lipitor']
	},

	// DIABETES
	{
		genericName: 'Metformin',
		brandNames: ['Glucophage', 'Fortamet'],
		maxDailyDose: { amount: 2550, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'B',
		lactationRisk: 'Safe',
		renalAdjustment: true,
		renalWarning: 'Contraindicated if eGFR <30 mL/min; dose reduce if eGFR 30-45',
		hepaticAdjustment: true,
		hepaticWarning: 'Avoid in hepatic impairment due to lactic acidosis risk',
		blackBoxWarnings: ['Lactic acidosis - rare but serious; increased risk with renal impairment'],
		searchPatterns: ['metformin', 'glucophage', 'fortamet']
	},
	{
		genericName: 'Glipizide',
		brandNames: ['Glucotrol'],
		maxDailyDose: { amount: 40, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		lactationRisk: 'Unknown',
		renalAdjustment: true,
		renalWarning: 'Increased risk of hypoglycemia with renal impairment',
		hepaticAdjustment: true,
		hepaticWarning: 'Use with caution in hepatic disease',
		geriatricWarning: 'Increased risk of severe hypoglycemia in elderly',
		searchPatterns: ['glipizide', 'glucotrol']
	},

	// PSYCHIATRIC
	{
		genericName: 'Sertraline',
		brandNames: ['Zoloft'],
		maxDailyDose: { amount: 200, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		pregnancyWarning: 'Use during pregnancy only if benefit outweighs risk',
		lactationRisk: 'Use Caution',
		lactationWarning: 'Excreted in breast milk; monitor infant',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Use lower doses in hepatic impairment',
		pediatricWarning: 'Approved for OCD in children ≥6 years',
		blackBoxWarnings: ['Increased risk of suicidal thinking in children/adolescents/young adults'],
		searchPatterns: ['sertraline', 'zoloft']
	},
	{
		genericName: 'Escitalopram',
		brandNames: ['Lexapro'],
		maxDailyDose: { amount: 20, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		lactationRisk: 'Use Caution',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Max 10mg daily in hepatic impairment',
		geriatricWarning: 'Max 10mg daily in elderly',
		blackBoxWarnings: ['Suicidal thoughts and behaviors in pediatric and young adult patients'],
		searchPatterns: ['escitalopram', 'lexapro']
	},
	{
		genericName: 'Alprazolam',
		brandNames: ['Xanax'],
		maxDailyDose: { amount: 4, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'D',
		pregnancyWarning: 'May cause fetal harm; neonatal withdrawal possible',
		lactationRisk: 'Use Caution',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Use lower doses in hepatic impairment',
		geriatricWarning: 'Increased risk of sedation, falls, and cognitive impairment',
		blackBoxWarnings: [
			'Concomitant use with opioids may result in respiratory depression and death',
			'Abuse and dependence'
		],
		searchPatterns: ['alprazolam', 'xanax']
	},

	// PAIN/INFLAMMATION
	{
		genericName: 'Ibuprofen',
		brandNames: ['Advil', 'Motrin'],
		maxDailyDose: { amount: 3200, unit: 'mg', frequency: 'daily', warning: 'Max 2400mg/day for OTC use' },
		pregnancyCategory: 'C',
		pregnancyWarning: 'Avoid in third trimester - risk of premature closure of ductus arteriosus',
		lactationRisk: 'Safe',
		lactationWarning: 'Small amounts in breast milk; short-term use acceptable',
		renalAdjustment: true,
		renalWarning: 'Avoid in severe renal impairment; may worsen renal function',
		hepaticAdjustment: true,
		hepaticWarning: 'Use with caution in hepatic impairment',
		geriatricWarning: 'Increased risk of GI bleeding, cardiovascular events, and renal toxicity',
		blackBoxWarnings: [
			'Cardiovascular thrombotic events',
			'GI bleeding, ulceration, and perforation'
		],
		searchPatterns: ['ibuprofen', 'advil', 'motrin']
	},
	{
		genericName: 'Naproxen',
		brandNames: ['Aleve', 'Naprosyn'],
		maxDailyDose: { amount: 1500, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		pregnancyWarning: 'Avoid in third trimester',
		lactationRisk: 'Safe',
		renalAdjustment: true,
		renalWarning: 'Contraindicated if CrCl <30 mL/min',
		hepaticAdjustment: true,
		geriatricWarning: 'Increased GI and cardiovascular risks',
		blackBoxWarnings: [
			'Cardiovascular thrombotic events',
			'GI bleeding, ulceration, and perforation'
		],
		searchPatterns: ['naproxen', 'aleve', 'naprosyn']
	},

	// RESPIRATORY
	{
		genericName: 'Albuterol',
		brandNames: ['ProAir', 'Ventolin', 'Proventil'],
		maxDailyDose: { amount: 32, unit: 'mg', frequency: 'daily', warning: 'Excessive use indicates poor asthma control' },
		pregnancyCategory: 'C',
		lactationRisk: 'Safe',
		renalAdjustment: false,
		hepaticAdjustment: false,
		pediatricWarning: 'Safe for children ≥4 years',
		searchPatterns: ['albuterol', 'proair', 'ventolin', 'proventil']
	},
	{
		genericName: 'Montelukast',
		brandNames: ['Singulair'],
		maxDailyDose: { amount: 10, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'B',
		lactationRisk: 'Unknown',
		renalAdjustment: false,
		hepaticAdjustment: false,
		pediatricWarning: 'Approved for children ≥6 months (dose varies by age)',
		blackBoxWarnings: ['Serious neuropsychiatric events including agitation, aggression, depression, suicidal thoughts'],
		searchPatterns: ['montelukast', 'singulair']
	},

	// PROTON PUMP INHIBITORS
	{
		genericName: 'Omeprazole',
		brandNames: ['Prilosec'],
		maxDailyDose: { amount: 40, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'C',
		lactationRisk: 'Use Caution',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Consider dose reduction in severe hepatic impairment',
		geriatricWarning: 'Increased risk of fractures, C. diff infection with long-term use',
		searchPatterns: ['omeprazole', 'prilosec']
	},
	{
		genericName: 'Pantoprazole',
		brandNames: ['Protonix'],
		maxDailyDose: { amount: 40, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'B',
		lactationRisk: 'Use Caution',
		renalAdjustment: false,
		hepaticAdjustment: true,
		geriatricWarning: 'Risk of fractures and C. diff with prolonged use',
		searchPatterns: ['pantoprazole', 'protonix']
	},

	// ANTICOAGULANTS
	{
		genericName: 'Warfarin',
		brandNames: ['Coumadin'],
		maxDailyDose: { amount: 20, unit: 'mg', frequency: 'daily', warning: 'Highly individualized; requires INR monitoring' },
		pregnancyCategory: 'X',
		pregnancyWarning: 'CONTRAINDICATED in pregnancy; causes fetal bleeding and malformations',
		lactationRisk: 'Safe',
		renalAdjustment: false,
		hepaticAdjustment: true,
		hepaticWarning: 'Use with extreme caution; increased bleeding risk',
		geriatricWarning: 'Increased bleeding risk; may need lower doses',
		blackBoxWarnings: ['Major or fatal bleeding risk; requires regular INR monitoring'],
		searchPatterns: ['warfarin', 'coumadin']
	},
	{
		genericName: 'Apixaban',
		brandNames: ['Eliquis'],
		maxDailyDose: { amount: 10, unit: 'mg', frequency: 'daily' },
		pregnancyCategory: 'B',
		pregnancyWarning: 'Limited data; use if benefit outweighs risk',
		lactationRisk: 'Unknown',
		renalAdjustment: true,
		renalWarning: 'Dose reduction if CrCl 15-29 mL/min; avoid if <15',
		hepaticAdjustment: true,
		hepaticWarning: 'Contraindicated in moderate-severe hepatic impairment',
		blackBoxWarnings: [
			'Premature discontinuation increases stroke risk',
			'Spinal/epidural hematoma risk with neuraxial anesthesia'
		],
		searchPatterns: ['apixaban', 'eliquis']
	}
];

/**
 * Find safety information for a drug by name
 */
export function findSafetyInfo(drugName: string): SafetyInfo | null {
	if (!drugName) return null;

	const normalized = drugName.toLowerCase().trim();

	for (const drug of DRUG_SAFETY_DATABASE) {
		for (const pattern of drug.searchPatterns) {
			if (normalized.includes(pattern.toLowerCase())) {
				return drug;
			}
		}
	}

	return null;
}

/**
 * Check if dose exceeds maximum daily dose
 */
export function checkDoseLimit(
	safetyInfo: SafetyInfo,
	dailyDose: number,
	unit: string
): string | null {
	if (!safetyInfo.maxDailyDose) return null;

	// Simple unit matching (could be enhanced with unit conversion)
	if (safetyInfo.maxDailyDose.unit.toLowerCase() !== unit.toLowerCase()) {
		return null; // Can't compare different units
	}

	if (dailyDose > safetyInfo.maxDailyDose.amount) {
		return `Dose (${dailyDose} ${unit}/day) exceeds maximum recommended (${safetyInfo.maxDailyDose.amount} ${safetyInfo.maxDailyDose.unit}/day)${safetyInfo.maxDailyDose.warning ? ': ' + safetyInfo.maxDailyDose.warning : ''}`;
	}

	return null;
}

/**
 * Get age-specific warnings
 */
export function getAgeWarnings(safetyInfo: SafetyInfo, age?: number): string[] {
	const warnings: string[] = [];

	if (!age) return warnings;

	// Pediatric (under 18)
	if (age < 18 && safetyInfo.pediatricWarning) {
		warnings.push(`PEDIATRIC: ${safetyInfo.pediatricWarning}`);
	}

	// Check minimum age restriction
	if (safetyInfo.minAge && age < safetyInfo.minAge) {
		warnings.push(`Not approved for use in patients under ${safetyInfo.minAge} years`);
	}

	// Geriatric (65+)
	if (age >= 65 && safetyInfo.geriatricWarning) {
		warnings.push(`GERIATRIC: ${safetyInfo.geriatricWarning}`);
	}

	return warnings;
}
