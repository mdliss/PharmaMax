import type { DrugCatalogEntry, DrugPackageConfig, PrescriberProfile, PharmacyStaffMember } from './syntheticTypes';

export const REFERENCE_DATE_ISO = '2024-01-01';
export const REFERENCE_DATE = new Date(REFERENCE_DATE_ISO);

export interface Manufacturer {
	name: string;
	labelerCode: string;
}

export const MANUFACTURERS: Manufacturer[] = [
	{ name: 'PharmaTrust Labs', labelerCode: '54868' },
	{ name: 'Wellness Generics', labelerCode: '62037' },
	{ name: 'EverLife Pharma', labelerCode: '43112' },
	{ name: 'Summit Therapeutics', labelerCode: '67205' },
	{ name: 'Harmony Healthcare', labelerCode: '50945' },
	{ name: 'NovaCare Pharmaceuticals', labelerCode: '71384' },
	{ name: 'BlueRiver Biologics', labelerCode: '49245' },
	{ name: 'Crestline Labs', labelerCode: '53905' },
	{ name: 'Trinity Medical Supply', labelerCode: '68021' },
	{ name: 'BrightPath Bioscience', labelerCode: '53672' }
];

export const SHELF_LOCATIONS = [
	'Aisle 1 - Shelf A',
	'Aisle 1 - Shelf B',
	'Aisle 2 - Shelf A',
	'Aisle 2 - Shelf B',
	'Aisle 3 - Shelf A',
	'Aisle 3 - Shelf B',
	'Aisle 4 - Shelf A',
	'Aisle 4 - Shelf B',
	'Controlled Substances Safe',
	'Fridge 1 - Bin 1',
	'Fridge 1 - Bin 2',
	'Fridge 2 - Bin 1',
	'Compounding Room - Drawer 1',
	'High Value Cabinet',
	'Will Call - Locker A'
];

export interface DrugStrengthSeed {
	strength: string;
	rxcui: string;
	packageSizes: number[];
	refrigerated?: boolean;
	customPackageLabels?: string[];
}

export interface DrugSeed {
	key: string;
	drugName: string;
	genericName: string;
	dosageForm: string;
	unit: string;
	defaultSig: string;
	route: string;
	perDose: number;
	frequency: number;
	defaultDaysSupply: number;
	conditions: string[];
	costPerUnit: number;
	isControlled: boolean;
	deaSchedule?: 'C-II' | 'C-III' | 'C-IV' | 'C-V';
	allergyClasses?: string[];
	notes?: string;
	strengths: DrugStrengthSeed[];
}

const toTitleCase = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

let productSequence = 1000;

const selectManufacturer = (index: number) => MANUFACTURERS[index % MANUFACTURERS.length];

const formatNumber = (value: number, length: number) => value.toString().padStart(length, '0');

export const createPackageConfigs = (
	seed: DrugSeed,
	strengthSeed: DrugStrengthSeed,
	strengthIndex: number
): DrugPackageConfig[] => {
	return strengthSeed.packageSizes.map((size, idx) => {
		const manufacturer = selectManufacturer(strengthIndex + idx);
		const productCode = formatNumber(productSequence++, 4);
		const packageCode = formatNumber(idx + 1, 2);
		const ndc = `${manufacturer.labelerCode}-${productCode}-${packageCode}`;
		const packageLabel = strengthSeed.customPackageLabels?.[idx] ?? `${size} ${seed.unit}${size > 1 ? 's' : ''}`;

		const costPerPackage = parseFloat((seed.costPerUnit * size).toFixed(2));
		const wholesalePrice = parseFloat((costPerPackage * 1.4).toFixed(2));

		return {
			ndc,
			packageSize: size,
			packageLabel,
			manufacturer: manufacturer.name,
			costPerPackage,
			wholesalePrice,
			location: strengthSeed.refrigerated ? 'Fridge 1 - Bin 1' : SHELF_LOCATIONS[(strengthIndex + idx) % SHELF_LOCATIONS.length],
			lotNumber: `LOT${formatNumber(2400 + strengthIndex, 4)}${formatNumber(idx + 1, 2)}`,
			expirationDate: strengthSeed.refrigerated ? '2025-10-31' : '2026-03-31',
			refrigerated: strengthSeed.refrigerated,
			isControlled: seed.isControlled,
			deaSchedule: seed.deaSchedule
		};
	});
};

export const DRUG_SEEDS: DrugSeed[] = [
	{
		key: 'lisinopril',
		drugName: 'Lisinopril',
		genericName: 'Lisinopril',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['hypertension', 'heart failure'],
		costPerUnit: 0.28,
		isControlled: false,
		strengths: [
			{ strength: '10 mg', rxcui: '1049633', packageSizes: [30, 90, 500] },
			{ strength: '20 mg', rxcui: '197361', packageSizes: [30, 90] },
			{ strength: '40 mg', rxcui: '206134', packageSizes: [30, 90] }
		]
	},
	{
		key: 'atorvastatin',
		drugName: 'Atorvastatin',
		genericName: 'Atorvastatin',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily in the evening',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['hyperlipidemia', 'cardiovascular risk'],
		costPerUnit: 0.32,
		isControlled: false,
		strengths: [
			{ strength: '10 mg', rxcui: '83367', packageSizes: [30, 90] },
			{ strength: '20 mg', rxcui: '856845', packageSizes: [30, 90] },
			{ strength: '40 mg', rxcui: '861007', packageSizes: [30, 90] },
			{ strength: '80 mg', rxcui: '861010', packageSizes: [30, 90] }
		]
	},
	{
		key: 'simvastatin',
		drugName: 'Simvastatin',
		genericName: 'Simvastatin',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily in the evening',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['hyperlipidemia'],
		costPerUnit: 0.24,
		isControlled: false,
		strengths: [
			{ strength: '10 mg', rxcui: '197312', packageSizes: [30, 90] },
			{ strength: '20 mg', rxcui: '1984403', packageSizes: [30, 90] },
			{ strength: '40 mg', rxcui: '1984404', packageSizes: [30, 90] }
		]
	},
	{
		key: 'metoprolol-tartrate',
		drugName: 'Metoprolol',
		genericName: 'Metoprolol Tartrate',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth twice daily',
		route: 'oral',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 30,
		conditions: ['hypertension', 'arrhythmia', 'migraine prophylaxis'],
		costPerUnit: 0.27,
		isControlled: false,
		strengths: [
			{ strength: '25 mg', rxcui: '866408', packageSizes: [60, 180] },
			{ strength: '50 mg', rxcui: '866409', packageSizes: [60, 180] },
			{ strength: '100 mg', rxcui: '866410', packageSizes: [60, 180] }
		]
	},
	{
		key: 'amlodipine',
		drugName: 'Amlodipine',
		genericName: 'Amlodipine Besylate',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['hypertension', 'angina'],
		costPerUnit: 0.35,
		isControlled: false,
		strengths: [
			{ strength: '5 mg', rxcui: '17767', packageSizes: [30, 90] },
			{ strength: '10 mg', rxcui: '308135', packageSizes: [30, 90] }
		]
	},
	{
		key: 'apixaban',
		drugName: 'Apixaban',
		genericName: 'Apixaban',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth twice daily',
		route: 'oral',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 30,
		conditions: ['atrial fibrillation', 'venous thromboembolism prevention'],
		costPerUnit: 5.2,
		isControlled: false,
		notes: 'High-cost anticoagulant often requiring prior authorization.',
		strengths: [
			{ strength: '5 mg', rxcui: '1364430', packageSizes: [60, 180] }
		]
	},
	{
		key: 'warfarin',
		drugName: 'Warfarin',
		genericName: 'Warfarin Sodium',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily or as directed',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['atrial fibrillation', 'venous thromboembolism'],
		costPerUnit: 0.21,
		isControlled: false,
		notes: 'Monitor INR frequently.',
		strengths: [
			{ strength: '1 mg', rxcui: '855329', packageSizes: [30, 90] },
			{ strength: '2 mg', rxcui: '855334', packageSizes: [30, 90] },
			{ strength: '5 mg', rxcui: '855332', packageSizes: [30, 90] }
		]
	},
	{
		key: 'metformin',
		drugName: 'Metformin',
		genericName: 'Metformin Hydrochloride',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth twice daily with meals',
		route: 'oral',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 30,
		conditions: ['type 2 diabetes'],
		costPerUnit: 0.18,
		isControlled: false,
		notes: 'Assess renal function prior to initiation and periodically.',
		strengths: [
			{ strength: '500 mg', rxcui: '861008', packageSizes: [60, 180] },
			{ strength: '850 mg', rxcui: '860975', packageSizes: [60, 180] },
			{ strength: '1000 mg', rxcui: '860976', packageSizes: [60, 180] }
		]
	},
	{
		key: 'insulin-glargine',
		drugName: 'Insulin Glargine',
		genericName: 'Insulin Glargine',
		dosageForm: 'solution',
		unit: 'unit',
		defaultSig: 'Inject 10 units subcutaneously at bedtime',
		route: 'subcutaneous',
		perDose: 10,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['type 1 diabetes', 'type 2 diabetes'],
		costPerUnit: 0.12,
		isControlled: false,
		notes: 'Keep refrigerated until opened.',
		strengths: [
			{
				strength: '100 units/mL',
				rxcui: '847232',
				packageSizes: [1000, 1500],
				refrigerated: true,
				customPackageLabels: ['1 vial (10 mL = 1000 units)', '5 pens (300 units each, 1500 units total)']
			}
		]
	},
	{
		key: 'insulin-lispro',
		drugName: 'Insulin Lispro',
		genericName: 'Insulin Lispro',
		dosageForm: 'solution',
		unit: 'unit',
		defaultSig: 'Inject 5 units subcutaneously before each meal',
		route: 'subcutaneous',
		perDose: 5,
		frequency: 3,
		defaultDaysSupply: 30,
		conditions: ['type 1 diabetes', 'type 2 diabetes'],
		costPerUnit: 0.13,
		isControlled: false,
		strengths: [
			{
				strength: '100 units/mL',
				rxcui: '1010811',
				packageSizes: [300, 900],
				refrigerated: true,
				customPackageLabels: ['3 mL pen (300 units)', '3 pens (900 units total)']
			}
		]
	},
	{
		key: 'glucagon',
		drugName: 'Glucagon Emergency Kit',
		genericName: 'Glucagon',
		dosageForm: 'kit',
		unit: 'kit',
		defaultSig: 'Inject 1 kit intramuscularly for severe hypoglycemia',
		route: 'intramuscular',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 365,
		conditions: ['severe hypoglycemia'],
		costPerUnit: 45,
		isControlled: false,
		strengths: [
			{
				strength: '1 mg',
				rxcui: '310272',
				packageSizes: [1],
				customPackageLabels: ['Emergency kit with syringe and diluent']
			}
		]
	},
	{
		key: 'sertraline',
		drugName: 'Sertraline',
		genericName: 'Sertraline Hydrochloride',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['depression', 'anxiety disorders'],
		costPerUnit: 0.34,
		isControlled: false,
		strengths: [
			{ strength: '25 mg', rxcui: '312940', packageSizes: [30, 90] },
			{ strength: '50 mg', rxcui: '312941', packageSizes: [30, 90] },
			{ strength: '100 mg', rxcui: '312944', packageSizes: [30, 90] }
		]
	},
	{
		key: 'escitalopram',
		drugName: 'Escitalopram',
		genericName: 'Escitalopram Oxalate',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['depression', 'generalized anxiety disorder'],
		costPerUnit: 0.33,
		isControlled: false,
		strengths: [
			{ strength: '10 mg', rxcui: '352262', packageSizes: [30, 90] },
			{ strength: '20 mg', rxcui: '352263', packageSizes: [30, 90] }
		]
	},
	{
		key: 'fluoxetine',
		drugName: 'Fluoxetine',
		genericName: 'Fluoxetine Hydrochloride',
		dosageForm: 'capsule',
		unit: 'capsule',
		defaultSig: 'Take 1 capsule by mouth once daily in the morning',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['depression'],
		costPerUnit: 0.31,
		isControlled: false,
		strengths: [
			{ strength: '10 mg', rxcui: '313988', packageSizes: [30, 90] },
			{ strength: '20 mg', rxcui: '313989', packageSizes: [30, 90] }
		]
	},
	{
		key: 'alprazolam',
		drugName: 'Alprazolam',
		genericName: 'Alprazolam',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth three times daily as needed for anxiety',
		route: 'oral',
		perDose: 1,
		frequency: 3,
		defaultDaysSupply: 30,
		conditions: ['anxiety disorders'],
		costPerUnit: 0.4,
		isControlled: true,
		deaSchedule: 'C-IV',
		strengths: [
			{ strength: '0.25 mg', rxcui: '308047', packageSizes: [30, 90] },
			{ strength: '0.5 mg', rxcui: '308048', packageSizes: [30, 90] },
			{ strength: '1 mg', rxcui: '308049', packageSizes: [30, 90] }
		]
	},
	{
		key: 'amphetamine-dextroamphetamine',
		drugName: 'Amphetamine/Dextroamphetamine',
		genericName: 'Mixed Amphetamine Salts',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth twice daily',
		route: 'oral',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 30,
		conditions: ['ADHD'],
		costPerUnit: 1.1,
		isControlled: true,
		deaSchedule: 'C-II',
		strengths: [
			{ strength: '10 mg', rxcui: '861012', packageSizes: [60, 120] },
			{ strength: '20 mg', rxcui: '861014', packageSizes: [60, 120] },
			{ strength: '30 mg', rxcui: '861016', packageSizes: [60, 120] }
		]
	},
	{
		key: 'methylphenidate',
		drugName: 'Methylphenidate ER',
		genericName: 'Methylphenidate Hydrochloride',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every morning',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['ADHD'],
		costPerUnit: 0.9,
		isControlled: true,
		deaSchedule: 'C-II',
		strengths: [
			{ strength: '18 mg', rxcui: '1747754', packageSizes: [30, 90] },
			{ strength: '36 mg', rxcui: '1747756', packageSizes: [30, 90] }
		]
	},
	{
		key: 'gabapentin',
		drugName: 'Gabapentin',
		genericName: 'Gabapentin',
		dosageForm: 'capsule',
		unit: 'capsule',
		defaultSig: 'Take 1 capsule by mouth three times daily',
		route: 'oral',
		perDose: 1,
		frequency: 3,
		defaultDaysSupply: 30,
		conditions: ['neuropathic pain', 'seizure disorder'],
		costPerUnit: 0.23,
		isControlled: false,
		notes: 'Adjust dose in renal impairment.',
		strengths: [
			{ strength: '300 mg', rxcui: '310798', packageSizes: [90, 270] },
			{ strength: '600 mg', rxcui: '310800', packageSizes: [90, 270] }
		]
	},
	{
		key: 'omeprazole',
		drugName: 'Omeprazole',
		genericName: 'Omeprazole',
		dosageForm: 'capsule',
		unit: 'capsule',
		defaultSig: 'Take 1 capsule by mouth once daily before breakfast',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['GERD', 'gastric ulcer'],
		costPerUnit: 0.26,
		isControlled: false,
		strengths: [
			{ strength: '20 mg', rxcui: '7646', packageSizes: [30, 90] },
			{ strength: '40 mg', rxcui: '198211', packageSizes: [30, 90] }
		]
	},
	{
		key: 'levothyroxine',
		drugName: 'Levothyroxine',
		genericName: 'Levothyroxine Sodium',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every morning on an empty stomach',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['hypothyroidism'],
		costPerUnit: 0.19,
		isControlled: false,
		strengths: [
			{ strength: '25 mcg', rxcui: '966154', packageSizes: [30, 90] },
			{ strength: '50 mcg', rxcui: '966157', packageSizes: [30, 90] },
			{ strength: '75 mcg', rxcui: '966159', packageSizes: [30, 90] },
			{ strength: '100 mcg', rxcui: '966164', packageSizes: [30, 90] }
		]
	},
	{
		key: 'albuterol',
		drugName: 'Albuterol Inhaler',
		genericName: 'Albuterol Sulfate',
		dosageForm: 'inhaler',
		unit: 'puff',
		defaultSig: 'Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing',
		route: 'inhalation',
		perDose: 2,
		frequency: 4,
		defaultDaysSupply: 30,
		conditions: ['asthma', 'COPD'],
		costPerUnit: 0.15,
		isControlled: false,
		strengths: [
			{
				strength: '90 mcg/actuation',
				rxcui: '7511',
				packageSizes: [200],
				customPackageLabels: ['200-dose metered inhaler']
			}
		]
	},
	{
		key: 'fluticasone-inhaler',
		drugName: 'Fluticasone Inhaler',
		genericName: 'Fluticasone Propionate',
		dosageForm: 'inhaler',
		unit: 'puff',
		defaultSig: 'Inhale 1 puff by mouth twice daily',
		route: 'inhalation',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 30,
		conditions: ['asthma'],
		costPerUnit: 0.35,
		isControlled: false,
		strengths: [
			{
				strength: '110 mcg/actuation',
				rxcui: '1991476',
				packageSizes: [120],
				customPackageLabels: ['120-dose inhaler']
			}
		]
	},
	{
		key: 'montelukast',
		drugName: 'Montelukast',
		genericName: 'Montelukast Sodium',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily in the evening',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['asthma', 'allergic rhinitis'],
		costPerUnit: 0.28,
		isControlled: false,
		strengths: [{ strength: '10 mg', rxcui: '200224', packageSizes: [30, 90] }]
	},
	{
		key: 'prednisone',
		drugName: 'Prednisone',
		genericName: 'Prednisone',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily with food',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 10,
		conditions: ['inflammatory disorders', 'allergic reactions'],
		costPerUnit: 0.24,
		isControlled: false,
		strengths: [
			{ strength: '5 mg', rxcui: '351401', packageSizes: [30, 90] },
			{ strength: '10 mg', rxcui: '1982111', packageSizes: [21, 90] },
			{ strength: '20 mg', rxcui: '312133', packageSizes: [21, 90] }
		]
	},
	{
		key: 'amoxicillin',
		drugName: 'Amoxicillin',
		genericName: 'Amoxicillin',
		dosageForm: 'capsule',
		unit: 'capsule',
		defaultSig: 'Take 1 capsule by mouth three times daily for 10 days',
		route: 'oral',
		perDose: 1,
		frequency: 3,
		defaultDaysSupply: 10,
		conditions: ['bacterial infection'],
		costPerUnit: 0.18,
		isControlled: false,
		allergyClasses: ['penicillin'],
		strengths: [{ strength: '500 mg', rxcui: '833036', packageSizes: [30, 40] }]
	},
	{
		key: 'azithromycin',
		drugName: 'Azithromycin',
		genericName: 'Azithromycin',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 2 tablets on day 1, then 1 tablet daily on days 2-5',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 5,
		conditions: ['respiratory infection'],
		costPerUnit: 1.8,
		isControlled: false,
		allergyClasses: ['macrolide'],
		strengths: [
			{
				strength: '250 mg',
				rxcui: '309362',
				packageSizes: [6],
				customPackageLabels: ['6-tablet dose pack']
			}
		]
	},
	{
		key: 'cephalexin',
		drugName: 'Cephalexin',
		genericName: 'Cephalexin',
		dosageForm: 'capsule',
		unit: 'capsule',
		defaultSig: 'Take 1 capsule by mouth four times daily for 10 days',
		route: 'oral',
		perDose: 1,
		frequency: 4,
		defaultDaysSupply: 10,
		conditions: ['bacterial infection'],
		costPerUnit: 0.22,
		isControlled: false,
		allergyClasses: ['cephalosporin'],
		strengths: [{ strength: '500 mg', rxcui: '309054', packageSizes: [40, 100] }]
	},
	{
		key: 'doxycycline',
		drugName: 'Doxycycline',
		genericName: 'Doxycycline Hyclate',
		dosageForm: 'capsule',
		unit: 'capsule',
		defaultSig: 'Take 1 capsule by mouth twice daily',
		route: 'oral',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 10,
		conditions: ['bacterial infection', 'acne'],
		costPerUnit: 0.75,
		isControlled: false,
		allergyClasses: ['tetracycline'],
		strengths: [{ strength: '100 mg', rxcui: '310429', packageSizes: [20, 60] }]
	},
	{
		key: 'ibuprofen',
		drugName: 'Ibuprofen',
		genericName: 'Ibuprofen',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every 6 hours as needed for pain',
		route: 'oral',
		perDose: 1,
		frequency: 4,
		defaultDaysSupply: 30,
		conditions: ['pain', 'inflammation'],
		costPerUnit: 0.05,
		isControlled: false,
		strengths: [
			{ strength: '200 mg', rxcui: '5640', packageSizes: [100, 500] },
			{ strength: '400 mg', rxcui: '197316', packageSizes: [100, 500] },
			{ strength: '600 mg', rxcui: '197317', packageSizes: [100, 500] },
			{ strength: '800 mg', rxcui: '197318', packageSizes: [100, 500] }
		]
	},
	{
		key: 'acetaminophen',
		drugName: 'Acetaminophen',
		genericName: 'Acetaminophen',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 2 tablets by mouth every 6 hours as needed for pain',
		route: 'oral',
		perDose: 2,
		frequency: 4,
		defaultDaysSupply: 15,
		conditions: ['pain', 'fever'],
		costPerUnit: 0.04,
		isControlled: false,
		strengths: [
			{ strength: '325 mg', rxcui: '198440', packageSizes: [100, 500] },
			{ strength: '500 mg', rxcui: '209459', packageSizes: [100, 500] }
		]
	},
	{
		key: 'tramadol',
		drugName: 'Tramadol',
		genericName: 'Tramadol Hydrochloride',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every 6 hours as needed for pain',
		route: 'oral',
		perDose: 1,
		frequency: 4,
		defaultDaysSupply: 7,
		conditions: ['moderate pain'],
		costPerUnit: 0.52,
		isControlled: true,
		deaSchedule: 'C-IV',
		strengths: [{ strength: '50 mg', rxcui: '845314', packageSizes: [30, 60] }]
	},
	{
		key: 'oxycodone',
		drugName: 'Oxycodone',
		genericName: 'Oxycodone Hydrochloride',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every 4 hours as needed for severe pain',
		route: 'oral',
		perDose: 1,
		frequency: 6,
		defaultDaysSupply: 7,
		conditions: ['severe pain'],
		costPerUnit: 0.75,
		isControlled: true,
		deaSchedule: 'C-II',
		strengths: [
			{ strength: '5 mg', rxcui: '1049624', packageSizes: [30, 60] },
			{ strength: '10 mg', rxcui: '1049628', packageSizes: [30, 60] }
		]
	},
	{
		key: 'hydrocodone-acetaminophen',
		drugName: 'Hydrocodone/Acetaminophen',
		genericName: 'Hydrocodone Bitartrate/Acetaminophen',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every 6 hours as needed for pain',
		route: 'oral',
		perDose: 1,
		frequency: 4,
		defaultDaysSupply: 7,
		conditions: ['moderate to severe pain'],
		costPerUnit: 0.68,
		isControlled: true,
		deaSchedule: 'C-II',
		strengths: [
			{ strength: '5-325 mg', rxcui: '857004', packageSizes: [30, 60] },
			{ strength: '10-325 mg', rxcui: '857001', packageSizes: [30, 60] }
		]
	},
	{
		key: 'naloxone',
		drugName: 'Naloxone Nasal Spray',
		genericName: 'Naloxone Hydrochloride',
		dosageForm: 'spray',
		unit: 'spray',
		defaultSig: 'Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.',
		route: 'intranasal',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 365,
		conditions: ['opioid overdose'],
		costPerUnit: 37,
		isControlled: false,
		strengths: [
			{
				strength: '4 mg/0.1 mL',
				rxcui: '1729615',
				packageSizes: [2],
				customPackageLabels: ['2-device carton']
			}
		]
	},
	{
		key: 'prenatal',
		drugName: 'Prenatal Vitamin with Iron',
		genericName: 'Prenatal Multivitamin',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['prenatal care'],
		costPerUnit: 0.29,
		isControlled: false,
		strengths: [{ strength: '27 mg iron', rxcui: '848076', packageSizes: [30, 90] }]
	},
	{
		key: 'vitamin-d',
		drugName: 'Vitamin D3',
		genericName: 'Cholecalciferol',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['vitamin D deficiency'],
		costPerUnit: 0.08,
		isControlled: false,
		strengths: [
			{ strength: '1000 IU', rxcui: '309142', packageSizes: [90, 180] },
			{ strength: '2000 IU', rxcui: '1984408', packageSizes: [90, 180] }
		]
	},
	{
		key: 'glucose-strips',
		drugName: 'Blood Glucose Test Strips',
		genericName: 'Glucose Test Strips',
		dosageForm: 'supply',
		unit: 'strip',
		defaultSig: 'Use to test blood glucose four times daily',
		route: 'external',
		perDose: 1,
		frequency: 4,
		defaultDaysSupply: 30,
		conditions: ['diabetes monitoring'],
		costPerUnit: 0.75,
		isControlled: false,
		strengths: [
			{ strength: 'Standard', rxcui: '578367', packageSizes: [50, 100] }
		]
	},
	{
		key: 'lancets',
		drugName: '30G Lancets',
		genericName: 'Single-use Lancets',
		dosageForm: 'supply',
		unit: 'lancet',
		defaultSig: 'Use to obtain blood sample four times daily',
		route: 'external',
		perDose: 1,
		frequency: 4,
		defaultDaysSupply: 30,
		conditions: ['diabetes monitoring'],
		costPerUnit: 0.12,
		isControlled: false,
		strengths: [
			{ strength: '30 gauge', rxcui: '998218', packageSizes: [100, 200] }
		]
	},
	{
		key: 'isotretinoin',
		drugName: 'Isotretinoin',
		genericName: 'Isotretinoin',
		dosageForm: 'capsule',
		unit: 'capsule',
		defaultSig: 'Take 1 capsule by mouth twice daily with food',
		route: 'oral',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 30,
		conditions: ['severe nodular acne'],
		costPerUnit: 2.1,
		isControlled: false,
		notes: 'Pregnancy Category X - contraindicated in pregnancy.',
		strengths: [{ strength: '40 mg', rxcui: '40265', packageSizes: [30, 60] }]
	},
	{
		key: 'buprenorphine-naloxone',
		drugName: 'Buprenorphine/Naloxone',
		genericName: 'Buprenorphine/Naloxone',
		dosageForm: 'film',
		unit: 'film',
		defaultSig: 'Place 1 film under the tongue once daily',
		route: 'sublingual',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 30,
		conditions: ['opioid use disorder'],
		costPerUnit: 3.5,
		isControlled: true,
		deaSchedule: 'C-III',
		strengths: [
			{ strength: '8-2 mg', rxcui: '1010607', packageSizes: [14, 30] },
			{ strength: '12-3 mg', rxcui: '1010611', packageSizes: [14, 30] }
		]
	},
	{
		key: 'morphine-er',
		drugName: 'Morphine ER',
		genericName: 'Morphine Sulfate',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every 12 hours',
		route: 'oral',
		perDose: 1,
		frequency: 2,
		defaultDaysSupply: 15,
		conditions: ['chronic severe pain'],
		costPerUnit: 1.2,
		isControlled: true,
		deaSchedule: 'C-II',
		strengths: [{ strength: '30 mg', rxcui: '1049502', packageSizes: [30, 60] }]
	},
	{
		key: 'diazepam',
		drugName: 'Diazepam',
		genericName: 'Diazepam',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth every 8 hours as needed for anxiety',
		route: 'oral',
		perDose: 1,
		frequency: 3,
		defaultDaysSupply: 10,
		conditions: ['anxiety', 'muscle spasm'],
		costPerUnit: 0.42,
		isControlled: true,
		deaSchedule: 'C-IV',
		strengths: [{ strength: '5 mg', rxcui: '197591', packageSizes: [30, 60] }]
	},
	{
		key: 'levofloxacin',
		drugName: 'Levofloxacin',
		genericName: 'Levofloxacin',
		dosageForm: 'tablet',
		unit: 'tablet',
		defaultSig: 'Take 1 tablet by mouth once daily for 7 days',
		route: 'oral',
		perDose: 1,
		frequency: 1,
		defaultDaysSupply: 7,
		conditions: ['bacterial infection'],
		costPerUnit: 1.1,
		isControlled: false,
		notes: 'Use with caution in elderly; not routinely recommended in pediatric patients.',
		allergyClasses: ['fluoroquinolone'],
		strengths: [{ strength: '500 mg', rxcui: '211861', packageSizes: [7, 14] }]
	}
];

export const DRUG_CATALOG: DrugCatalogEntry[] = DRUG_SEEDS.flatMap((seed) =>
	seed.strengths.map((strengthSeed, strengthIndex) => ({
		drugName: `${seed.drugName} ${strengthSeed.strength} ${toTitleCase(seed.dosageForm)}`,
		genericName: seed.genericName,
		rxcui: strengthSeed.rxcui,
		strength: strengthSeed.strength,
		dosageForm: seed.dosageForm,
		unit: seed.unit,
		defaultSig: seed.defaultSig,
		route: seed.route,
		perDose: seed.perDose,
		frequency: seed.frequency,
		defaultDaysSupply: seed.defaultDaysSupply,
		conditions: seed.conditions,
		packageConfigs: createPackageConfigs(seed, strengthSeed, strengthIndex),
		isControlled: seed.isControlled,
		allergyClasses: seed.allergyClasses,
		notes: seed.notes,
		deaSchedule: seed.deaSchedule
	}))
);

export const PRESCRIBER_SEEDS: PrescriberProfile[] = [
	{
		npi: '1760452391',
		name: 'Dr. Alicia Romero',
		specialty: 'Family Medicine',
		deaNumber: 'AR5932841',
		phone: '415-555-0101',
		fax: '415-555-0201',
		address: '125 Market St, Suite 300, San Francisco, CA 94105',
		practiceName: 'Bayview Family Clinic',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1589023145',
		name: 'Dr. Benjamin Hsu',
		specialty: 'Cardiology',
		deaNumber: 'BH2846397',
		phone: '415-555-0102',
		fax: '415-555-0202',
		address: '400 Mission St, Floor 5, San Francisco, CA 94105',
		practiceName: 'Heart & Vascular Associates',
		preferredContactMethod: 'fax',
		electronicallyPrescribes: true
	},
	{
		npi: '1482035690',
		name: 'Dr. Maya Chen',
		specialty: 'Endocrinology',
		deaNumber: 'MC4928573',
		phone: '628-555-0113',
		fax: '628-555-0213',
		address: '785 Montgomery St, Suite 210, San Francisco, CA 94133',
		practiceName: 'Golden Gate Endocrine Center',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1338941206',
		name: 'Dr. Noah Patel',
		specialty: 'Psychiatry',
		deaNumber: 'NP5841203',
		phone: '415-555-0103',
		fax: '415-555-0203',
		address: '690 Van Ness Ave, Suite 500, San Francisco, CA 94102',
		practiceName: 'Pacific Behavioral Health',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1902745632',
		name: 'Dr. Evelyn Brooks',
		specialty: 'Pain Management',
		deaNumber: 'EB6390124',
		phone: '415-555-0104',
		fax: '415-555-0204',
		address: '55 New Montgomery St, Suite 900, San Francisco, CA 94105',
		practiceName: 'Coastal Pain Specialists',
		preferredContactMethod: 'fax',
		electronicallyPrescribes: true
	},
	{
		npi: '1775934021',
		name: 'Dr. Samuel Ortiz',
		specialty: 'Orthopedics',
		deaNumber: 'SO2039841',
		phone: '628-555-0115',
		fax: '628-555-0215',
		address: '310 Divisadero St, Suite 200, San Francisco, CA 94117',
		practiceName: 'Summit Orthopedic Group',
		preferredContactMethod: 'phone',
		electronicallyPrescribes: true
	},
	{
		npi: '1093824756',
		name: 'Dr. Priya Nair',
		specialty: 'Pediatrics',
		deaNumber: 'PN5739401',
		phone: '415-555-0105',
		fax: '415-555-0205',
		address: '2011 16th St, Suite 400, San Francisco, CA 94103',
		practiceName: 'Mission Creek Pediatrics',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1983746502',
		name: 'Dr. Grace Whitman',
		specialty: 'OB/GYN',
		deaNumber: 'GW4829301',
		phone: '415-555-0106',
		fax: '415-555-0206',
		address: '1400 Geary Blvd, Suite 500, San Francisco, CA 94109',
		practiceName: "Harbor Women's Health",
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1567289034',
		name: 'Dr. Michael Tanaka',
		specialty: 'Pulmonology',
		deaNumber: 'MT5938204',
		phone: '628-555-0117',
		fax: '628-555-0217',
		address: '900 Hyde St, Suite 350, San Francisco, CA 94109',
		practiceName: 'Pacific Pulmonary Care',
		preferredContactMethod: 'fax',
		electronicallyPrescribes: true
	},
	{
		npi: '1423089675',
		name: 'Dr. Lauren McKay',
		specialty: 'Infectious Disease',
		deaNumber: 'LM3829045',
		phone: '415-555-0107',
		fax: '415-555-0207',
		address: '501 Cesar Chavez St, Suite 110, San Francisco, CA 94124',
		practiceName: 'Citywide Infectious Disease Clinic',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1304958672',
		name: 'Dr. Henry Caldwell',
		specialty: 'Geriatrics',
		deaNumber: 'HC3950287',
		phone: '415-555-0108',
		fax: '415-555-0208',
		address: '75 Laguna St, Suite 210, San Francisco, CA 94102',
		practiceName: 'Silver Years Medical Group',
		preferredContactMethod: 'phone',
		electronicallyPrescribes: false
	},
	{
		npi: '1295830674',
		name: 'Dr. Fatima Al-Hassan',
		specialty: 'Nephrology',
		deaNumber: 'FA5839206',
		phone: '628-555-0118',
		fax: '628-555-0218',
		address: '2100 Webster St, Suite 410, San Francisco, CA 94115',
		practiceName: 'Bay Renal Associates',
		preferredContactMethod: 'fax',
		electronicallyPrescribes: true
	},
	{
		npi: '1789034521',
		name: 'Dr. Victor Suarez',
		specialty: 'Oncology',
		deaNumber: 'VS5392840',
		phone: '415-555-0109',
		fax: '415-555-0209',
		address: '1825 4th St, Suite 200, San Francisco, CA 94158',
		practiceName: 'Mission Bay Cancer Center',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1669405821',
		name: 'Dr. Rachel Goldstein',
		specialty: 'Dermatology',
		deaNumber: 'RG5920482',
		phone: '628-555-0119',
		fax: '628-555-0219',
		address: '315 Castro St, Suite 220, San Francisco, CA 94114',
		practiceName: 'Bay Skin Institute',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1617082394',
		name: 'Dr. Omar Ibrahim',
		specialty: 'Internal Medicine',
		deaNumber: 'OI5829034',
		phone: '415-555-0110',
		fax: '415-555-0210',
		address: '701 Van Ness Ave, Suite 600, San Francisco, CA 94102',
		practiceName: 'Union Square Medical',
		preferredContactMethod: 'phone',
		electronicallyPrescribes: true
	},
	{
		npi: '1358794206',
		name: 'Dr. Teresa Nguyen',
		specialty: 'Endocrinology',
		deaNumber: 'TN4820395',
		phone: '628-555-0120',
		fax: '628-555-0220',
		address: '1800 Franklin St, Suite 250, San Francisco, CA 94109',
		practiceName: 'North Bay Diabetes Center',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1498052376',
		name: 'Dr. Carlos Mendes',
		specialty: 'Pain Management',
		deaNumber: 'CM5920371',
		phone: '650-555-0131',
		fax: '650-555-0231',
		address: '1200 El Camino Real, Suite 400, San Mateo, CA 94402',
		practiceName: 'Peninsula Spine & Pain',
		preferredContactMethod: 'fax',
		electronicallyPrescribes: true
	},
	{
		npi: '1885042397',
		name: 'Dr. Sofia Martinez',
		specialty: 'Maternal-Fetal Medicine',
		deaNumber: 'SM5932840',
		phone: '415-555-0112',
		fax: '415-555-0212',
		address: '1801 Bush St, Suite 500, San Francisco, CA 94109',
		practiceName: 'Pacific Perinatal Group',
		preferredContactMethod: 'electronic',
		electronicallyPrescribes: true
	},
	{
		npi: '1529083746',
		name: 'Dr. Elliot Harper',
		specialty: 'Sleep Medicine',
		deaNumber: 'EH5829301',
		phone: '510-555-0144',
		fax: '510-555-0244',
		address: '3300 Webster St, Suite 250, Oakland, CA 94609',
		practiceName: 'East Bay Sleep Center',
		preferredContactMethod: 'phone',
		electronicallyPrescribes: false
	}
];

export const PHARMACY_STAFF_SEEDS: PharmacyStaffMember[] = [
	{
		employeeId: 'EMP-001',
		name: 'Jordan Patel',
		role: 'pharmacist',
		licenseNumber: 'RPH76432',
		licenseState: 'CA',
		licenseExpiration: '2025-09-30',
		canVerifyControlled: true,
		shifts: [
			{ day: 'Monday', startTime: '08:00', endTime: '16:30' },
			{ day: 'Tuesday', startTime: '08:00', endTime: '16:30' },
			{ day: 'Friday', startTime: '09:00', endTime: '17:30' }
		]
	},
	{
		employeeId: 'EMP-002',
		name: 'Lisa Hernandez',
		role: 'pharmacist',
		licenseNumber: 'RPH81590',
		licenseState: 'CA',
		licenseExpiration: '2026-02-28',
		canVerifyControlled: true,
		shifts: [
			{ day: 'Wednesday', startTime: '10:00', endTime: '18:30' },
			{ day: 'Thursday', startTime: '10:00', endTime: '18:30' },
			{ day: 'Saturday', startTime: '09:00', endTime: '17:00' }
		]
	},
	{
		employeeId: 'EMP-003',
		name: 'Anthony Kim',
		role: 'pharmacist',
		licenseNumber: 'RPH70315',
		licenseState: 'CA',
		licenseExpiration: '2025-12-31',
		canVerifyControlled: true,
		shifts: [
			{ day: 'Sunday', startTime: '09:00', endTime: '15:00' },
			{ day: 'Monday', startTime: '12:00', endTime: '20:00' },
			{ day: 'Tuesday', startTime: '12:00', endTime: '20:00' }
		]
	},
	{
		employeeId: 'EMP-004',
		name: 'Priyanka Shah',
		role: 'pharmacist',
		licenseNumber: 'RPH68921',
		licenseState: 'CA',
		licenseExpiration: '2024-11-30',
		canVerifyControlled: true,
		shifts: [
			{ day: 'Thursday', startTime: '14:00', endTime: '22:00' },
			{ day: 'Friday', startTime: '14:00', endTime: '22:00' },
			{ day: 'Saturday', startTime: '12:00', endTime: '20:00' }
		]
	},
	{
		employeeId: 'EMP-005',
		name: "Megan O'Connor",
		role: 'pharmacy-technician',
		licenseNumber: 'TCH54321',
		licenseState: 'CA',
		licenseExpiration: '2025-04-30',
		canVerifyControlled: false,
		shifts: [
			{ day: 'Monday', startTime: '07:30', endTime: '16:00' },
			{ day: 'Tuesday', startTime: '07:30', endTime: '16:00' },
			{ day: 'Wednesday', startTime: '07:30', endTime: '16:00' }
		]
	},
	{
		employeeId: 'EMP-006',
		name: 'Samuel Park',
		role: 'pharmacy-technician',
		licenseNumber: 'TCH61234',
		licenseState: 'CA',
		licenseExpiration: '2026-06-30',
		canVerifyControlled: false,
		shifts: [
			{ day: 'Wednesday', startTime: '11:00', endTime: '19:30' },
			{ day: 'Thursday', startTime: '11:00', endTime: '19:30' },
			{ day: 'Friday', startTime: '11:00', endTime: '19:30' }
		]
	},
	{
		employeeId: 'EMP-007',
		name: 'Danielle Rivers',
		role: 'pharmacy-technician',
		licenseNumber: 'TCH70894',
		licenseState: 'CA',
		licenseExpiration: '2025-01-31',
		canVerifyControlled: false,
		shifts: [
			{ day: 'Friday', startTime: '08:00', endTime: '16:30' },
			{ day: 'Saturday', startTime: '09:00', endTime: '17:00' },
			{ day: 'Sunday', startTime: '09:00', endTime: '17:00' }
		]
	},
	{
		employeeId: 'EMP-008',
		name: 'Hector Alvarez',
		role: 'pharmacy-technician',
		licenseNumber: 'TCH73450',
		licenseState: 'CA',
		licenseExpiration: '2024-12-31',
		canVerifyControlled: true,
		shifts: [
			{ day: 'Monday', startTime: '13:00', endTime: '21:30' },
			{ day: 'Tuesday', startTime: '13:00', endTime: '21:30' },
			{ day: 'Wednesday', startTime: '13:00', endTime: '21:30' }
		]
	},
	{
		employeeId: 'EMP-009',
		name: 'Sasha Petrov',
		role: 'pharmacy-intern',
		licenseNumber: 'INT20987',
		licenseState: 'CA',
		licenseExpiration: '2025-08-31',
		canVerifyControlled: false,
		shifts: [
			{ day: 'Tuesday', startTime: '16:00', endTime: '20:00' },
			{ day: 'Thursday', startTime: '16:00', endTime: '20:00' },
			{ day: 'Saturday', startTime: '10:00', endTime: '18:00' }
		]
	},
	{
		employeeId: 'EMP-010',
		name: 'Emily Carter',
		role: 'pharmacy-intern',
		licenseNumber: 'INT31854',
		licenseState: 'CA',
		licenseExpiration: '2026-05-31',
		canVerifyControlled: false,
		shifts: [
			{ day: 'Monday', startTime: '15:00', endTime: '20:00' },
			{ day: 'Wednesday', startTime: '15:00', endTime: '20:00' },
			{ day: 'Friday', startTime: '15:00', endTime: '20:00' }
		]
	},
	{
		employeeId: 'EMP-011',
		name: 'Marcus Lee',
		role: 'pharmacy-technician',
		licenseNumber: 'TCH79204',
		licenseState: 'CA',
		licenseExpiration: '2025-07-31',
		canVerifyControlled: false,
		shifts: [
			{ day: 'Wednesday', startTime: '07:00', endTime: '15:30' },
			{ day: 'Thursday', startTime: '07:00', endTime: '15:30' },
			{ day: 'Friday', startTime: '07:00', endTime: '15:30' }
		]
	},
	{
		employeeId: 'EMP-012',
		name: 'Amelia Johnson',
		role: 'pharmacist',
		licenseNumber: 'RPH81276',
		licenseState: 'CA',
		licenseExpiration: '2026-03-31',
		canVerifyControlled: true,
		shifts: [
			{ day: 'Saturday', startTime: '08:00', endTime: '16:30' },
			{ day: 'Sunday', startTime: '08:00', endTime: '16:30' },
			{ day: 'Monday', startTime: '11:00', endTime: '19:30' }
		]
	}
];
