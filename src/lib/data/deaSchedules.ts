/**
 * DEA Controlled Substance Schedules
 *
 * Comprehensive mapping of common controlled substances to their DEA schedules,
 * with quantity limits and refill restrictions per federal regulations.
 *
 * Schedule Classifications:
 * - Schedule II (C-II): High potential for abuse, no refills allowed
 * - Schedule III (C-III): Moderate abuse potential, max 5 refills in 6 months
 * - Schedule IV (C-IV): Lower abuse potential, max 5 refills in 6 months
 * - Schedule V (C-V): Lowest abuse potential, max 5 refills in 6 months
 */

export interface DEAScheduleInfo {
	schedule: 'II' | 'III' | 'IV' | 'V';
	displayName: string; // e.g., "C-II", "C-III"
	maxRefills: number;
	typicalMaxDaysSupply: number; // Typical maximum days supply per fill
	requiresPrescriberDEA: boolean;
	additionalRestrictions?: string[];
}

export interface ControlledSubstance {
	genericName: string;
	commonBrandNames: string[];
	scheduleInfo: DEAScheduleInfo;
	// Pattern matching for drug names (case-insensitive)
	searchPatterns: string[];
}

// DEA Schedule Information Templates
const SCHEDULE_II: DEAScheduleInfo = {
	schedule: 'II',
	displayName: 'C-II',
	maxRefills: 0,
	typicalMaxDaysSupply: 30,
	requiresPrescriberDEA: true,
	additionalRestrictions: [
		'No refills allowed',
		'Written or electronic prescription required',
		'Emergency supply limited to 72 hours'
	]
};

const SCHEDULE_III: DEAScheduleInfo = {
	schedule: 'III',
	displayName: 'C-III',
	maxRefills: 5,
	typicalMaxDaysSupply: 30,
	requiresPrescriberDEA: true,
	additionalRestrictions: [
		'Maximum 5 refills in 6 months',
		'Prescription expires after 6 months'
	]
};

const SCHEDULE_IV: DEAScheduleInfo = {
	schedule: 'IV',
	displayName: 'C-IV',
	maxRefills: 5,
	typicalMaxDaysSupply: 30,
	requiresPrescriberDEA: true,
	additionalRestrictions: [
		'Maximum 5 refills in 6 months',
		'Prescription expires after 6 months'
	]
};

const SCHEDULE_V: DEAScheduleInfo = {
	schedule: 'V',
	displayName: 'C-V',
	maxRefills: 5,
	typicalMaxDaysSupply: 30,
	requiresPrescriberDEA: true,
	additionalRestrictions: [
		'Maximum 5 refills in 6 months',
		'Some may be available without prescription with restrictions'
	]
};

/**
 * Comprehensive database of controlled substances
 * Organized by DEA schedule for efficient lookup
 */
export const CONTROLLED_SUBSTANCES: ControlledSubstance[] = [
	// SCHEDULE II - Opioids
	{
		genericName: 'Oxycodone',
		commonBrandNames: ['OxyContin', 'Roxicodone', 'Percocet (with acetaminophen)'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['oxycodone', 'oxycontin', 'roxicodone', 'percocet']
	},
	{
		genericName: 'Hydromorphone',
		commonBrandNames: ['Dilaudid', 'Exalgo'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['hydromorphone', 'dilaudid', 'exalgo']
	},
	{
		genericName: 'Morphine',
		commonBrandNames: ['MS Contin', 'Kadian', 'Avinza'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['morphine', 'ms contin', 'kadian', 'avinza']
	},
	{
		genericName: 'Fentanyl',
		commonBrandNames: ['Duragesic', 'Actiq', 'Sublimaze'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['fentanyl', 'duragesic', 'actiq', 'sublimaze']
	},
	{
		genericName: 'Methadone',
		commonBrandNames: ['Dolophine', 'Methadose'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['methadone', 'dolophine', 'methadose']
	},
	{
		genericName: 'Meperidine',
		commonBrandNames: ['Demerol'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['meperidine', 'demerol']
	},
	{
		genericName: 'Oxymorphone',
		commonBrandNames: ['Opana'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['oxymorphone', 'opana']
	},

	// SCHEDULE II - Stimulants
	{
		genericName: 'Amphetamine/Dextroamphetamine',
		commonBrandNames: ['Adderall', 'Adderall XR'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['amphetamine', 'dextroamphetamine', 'adderall']
	},
	{
		genericName: 'Methylphenidate',
		commonBrandNames: ['Ritalin', 'Concerta', 'Daytrana', 'Methylin'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['methylphenidate', 'ritalin', 'concerta', 'daytrana', 'methylin']
	},
	{
		genericName: 'Dexmethylphenidate',
		commonBrandNames: ['Focalin', 'Focalin XR'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['dexmethylphenidate', 'focalin']
	},
	{
		genericName: 'Lisdexamfetamine',
		commonBrandNames: ['Vyvanse'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['lisdexamfetamine', 'vyvanse']
	},
	{
		genericName: 'Dextroamphetamine',
		commonBrandNames: ['Dexedrine', 'ProCentra'],
		scheduleInfo: SCHEDULE_II,
		searchPatterns: ['dextroamphetamine', 'dexedrine', 'procentra']
	},

	// SCHEDULE III - Opioid Combinations
	{
		genericName: 'Hydrocodone/Acetaminophen',
		commonBrandNames: ['Vicodin', 'Norco', 'Lortab'],
		scheduleInfo: SCHEDULE_III,
		searchPatterns: ['hydrocodone', 'vicodin', 'norco', 'lortab']
	},
	{
		genericName: 'Codeine/Acetaminophen',
		commonBrandNames: ['Tylenol #3', 'Tylenol #4'],
		scheduleInfo: SCHEDULE_III,
		searchPatterns: ['codeine', 'tylenol with codeine', 'tylenol #3', 'tylenol #4']
	},
	{
		genericName: 'Buprenorphine',
		commonBrandNames: ['Suboxone', 'Subutex', 'Buprenex'],
		scheduleInfo: SCHEDULE_III,
		searchPatterns: ['buprenorphine', 'suboxone', 'subutex', 'buprenex']
	},
	{
		genericName: 'Ketamine',
		commonBrandNames: ['Ketalar'],
		scheduleInfo: SCHEDULE_III,
		searchPatterns: ['ketamine', 'ketalar']
	},

	// SCHEDULE III - Anabolic Steroids
	{
		genericName: 'Testosterone',
		commonBrandNames: ['AndroGel', 'Testim', 'Axiron'],
		scheduleInfo: SCHEDULE_III,
		searchPatterns: ['testosterone', 'androgel', 'testim', 'axiron']
	},

	// SCHEDULE IV - Benzodiazepines
	{
		genericName: 'Alprazolam',
		commonBrandNames: ['Xanax', 'Xanax XR'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['alprazolam', 'xanax']
	},
	{
		genericName: 'Clonazepam',
		commonBrandNames: ['Klonopin'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['clonazepam', 'klonopin']
	},
	{
		genericName: 'Diazepam',
		commonBrandNames: ['Valium'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['diazepam', 'valium']
	},
	{
		genericName: 'Lorazepam',
		commonBrandNames: ['Ativan'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['lorazepam', 'ativan']
	},
	{
		genericName: 'Temazepam',
		commonBrandNames: ['Restoril'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['temazepam', 'restoril']
	},
	{
		genericName: 'Triazolam',
		commonBrandNames: ['Halcion'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['triazolam', 'halcion']
	},
	{
		genericName: 'Midazolam',
		commonBrandNames: ['Versed'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['midazolam', 'versed']
	},

	// SCHEDULE IV - Z-Drugs (Non-benzodiazepine hypnotics)
	{
		genericName: 'Zolpidem',
		commonBrandNames: ['Ambien', 'Ambien CR', 'Edluar', 'Intermezzo'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['zolpidem', 'ambien', 'edluar', 'intermezzo']
	},
	{
		genericName: 'Eszopiclone',
		commonBrandNames: ['Lunesta'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['eszopiclone', 'lunesta']
	},
	{
		genericName: 'Zaleplon',
		commonBrandNames: ['Sonata'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['zaleplon', 'sonata']
	},

	// SCHEDULE IV - Stimulants
	{
		genericName: 'Phentermine',
		commonBrandNames: ['Adipex-P', 'Lomaira'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['phentermine', 'adipex']
	},
	{
		genericName: 'Modafinil',
		commonBrandNames: ['Provigil'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['modafinil', 'provigil']
	},
	{
		genericName: 'Armodafinil',
		commonBrandNames: ['Nuvigil'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['armodafinil', 'nuvigil']
	},

	// SCHEDULE IV - Other
	{
		genericName: 'Tramadol',
		commonBrandNames: ['Ultram', 'Ultram ER', 'ConZip'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['tramadol', 'ultram', 'conzip']
	},
	{
		genericName: 'Carisoprodol',
		commonBrandNames: ['Soma'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['carisoprodol', 'soma']
	},
	{
		genericName: 'Pregabalin',
		commonBrandNames: ['Lyrica'],
		scheduleInfo: SCHEDULE_IV,
		searchPatterns: ['pregabalin', 'lyrica']
	},

	// SCHEDULE V - Cough Preparations
	{
		genericName: 'Codeine (low dose)',
		commonBrandNames: ['Robitussin AC', 'Cheratussin AC'],
		scheduleInfo: SCHEDULE_V,
		searchPatterns: ['robitussin ac', 'cheratussin ac', 'codeine cough']
	},
	{
		genericName: 'Promethazine/Codeine',
		commonBrandNames: ['Phenergan with Codeine'],
		scheduleInfo: SCHEDULE_V,
		searchPatterns: ['promethazine with codeine', 'phenergan with codeine']
	},

	// SCHEDULE V - Antidiarrheals
	{
		genericName: 'Diphenoxylate/Atropine',
		commonBrandNames: ['Lomotil'],
		scheduleInfo: SCHEDULE_V,
		searchPatterns: ['diphenoxylate', 'lomotil']
	},

	// SCHEDULE V - Anticonvulsants (Pregabalin in some states)
	{
		genericName: 'Lacosamide',
		commonBrandNames: ['Vimpat'],
		scheduleInfo: SCHEDULE_V,
		searchPatterns: ['lacosamide', 'vimpat']
	}
];

/**
 * Detect if a drug name matches a controlled substance
 * @param drugName - The drug name to check (generic or brand name)
 * @returns The controlled substance info if found, null otherwise
 */
export function detectControlledSubstance(drugName: string): ControlledSubstance | null {
	if (!drugName) return null;

	const normalizedName = drugName.toLowerCase().trim();

	for (const substance of CONTROLLED_SUBSTANCES) {
		for (const pattern of substance.searchPatterns) {
			if (normalizedName.includes(pattern.toLowerCase())) {
				return substance;
			}
		}
	}

	return null;
}

/**
 * Get all controlled substances by schedule
 * @param schedule - The DEA schedule ('II', 'III', 'IV', 'V')
 * @returns Array of controlled substances in that schedule
 */
export function getSubstancesBySchedule(schedule: 'II' | 'III' | 'IV' | 'V'): ControlledSubstance[] {
	return CONTROLLED_SUBSTANCES.filter(s => s.scheduleInfo.schedule === schedule);
}

/**
 * Calculate maximum refills allowed for a controlled substance
 * @param substance - The controlled substance
 * @returns Maximum number of refills allowed
 */
export function getMaxRefills(substance: ControlledSubstance): number {
	return substance.scheduleInfo.maxRefills;
}

/**
 * Check if a quantity exceeds typical maximum for a controlled substance
 * @param substance - The controlled substance
 * @param daysSupply - Days supply being prescribed
 * @returns Warning message if exceeds typical maximum, null otherwise
 */
export function checkQuantityLimit(substance: ControlledSubstance, daysSupply: number): string | null {
	const maxDays = substance.scheduleInfo.typicalMaxDaysSupply;

	if (daysSupply > maxDays) {
		return `⚠️ Days supply (${daysSupply}) exceeds typical maximum of ${maxDays} days for ${substance.scheduleInfo.displayName} substances`;
	}

	return null;
}

/**
 * Get formatted schedule badge text
 * @param substance - The controlled substance
 * @returns Formatted badge text (e.g., "C-II", "C-III")
 */
export function getScheduleBadge(substance: ControlledSubstance): string {
	return substance.scheduleInfo.displayName;
}
