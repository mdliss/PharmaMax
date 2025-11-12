/// <reference types="node" />
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import {
	DRUG_CATALOG,
	DRUG_SEEDS,
	PHARMACY_STAFF_SEEDS,
	PRESCRIBER_SEEDS,
	REFERENCE_DATE,
	REFERENCE_DATE_ISO
} from '../src/lib/data/syntheticSeeds';
import type {
	AuditLogEntry,
	BarcodeScanEntry,
	BatchJob,
	ControlledSubstanceLogEntry,
	DrugCatalogEntry,
	DrugSafetyRecord,
	GenericSubstitutionEntry,
	InsuranceDetails,
	InsuranceFormularyPlan,
	InventoryItem,
	PartialFillDetail,
	PartialFillHistoryEntry,
	PartialFillReason,
	PatientAllergy,
	PatientMedication,
	PatientProfile,
	PharmacyStaffMember,
	PrescriptionHistoryEntry,
	PrescriptionRecommendation,
	PrescriptionRecommendationType,
	PrescriberProfile
} from '../src/lib/data/syntheticTypes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = resolve(process.cwd(), 'src/lib/data');

const ensureDataDir = () => {
	mkdirSync(DATA_DIR, { recursive: true });
};

const pad = (value: number, digits: number) => value.toString().padStart(digits, '0');

const calculateAge = (dob: string, reference: Date = REFERENCE_DATE) => {
	const birth = new Date(dob);
	let age = reference.getFullYear() - birth.getFullYear();
	const monthDiff = reference.getMonth() - birth.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && reference.getDate() < birth.getDate())) {
		age -= 1;
	}
	return age;
};

const toTimestamp = (date: string) => new Date(date).getTime();

const randomPick = <T>(items: T[], index: number) => items[index % items.length];

const DRUG_BY_NAME = new Map(DRUG_CATALOG.map((drug) => [drug.drugName, drug] as const));

interface MedicationSeed {
	key: string;
	strength: string;
	customSig?: string;
	prescriber?: string;
	startDate: string;
	refillsRemaining: number;
}

const getDrugByKey = (key: string, strength: string): DrugCatalogEntry => {
	const seed = DRUG_SEEDS.find((entry) => entry.key === key);
	if (!seed) throw new Error(`Missing drug seed for key ${key}`);
	const drugName = `${seed.drugName} ${strength} ${seed.dosageForm.charAt(0).toUpperCase()}${seed.dosageForm.slice(1)}`;
	const drug = DRUG_BY_NAME.get(drugName);
	if (!drug) throw new Error(`Missing catalog entry for ${drugName}`);
	return drug;
};

const createMedication = (seed: MedicationSeed, prescriberFallback: PrescriberProfile): PatientMedication => {
	const drug = getDrugByKey(seed.key, seed.strength);
	return {
		drugName: drug.drugName,
		sig: seed.customSig ?? drug.defaultSig,
		prescriber: seed.prescriber ?? prescriberFallback.name,
		startDate: seed.startDate,
		refillsRemaining: seed.refillsRemaining
	};
};

interface PatientBlueprint {
	firstName: string;
	lastName: string;
	gender: 'male' | 'female' | 'non-binary';
	dateOfBirth: string;
	insuranceProvider: string;
	planType: string;
	allergies: PatientAllergy[];
	conditions: string[];
	medications: MedicationSeed[];
	notes?: string;
}

interface InsurancePlanSeed {
	provider: string;
	planName: string;
	planType: string;
}

const INSURANCE_SEEDS: InsurancePlanSeed[] = [
	{ provider: 'PharmaMax Commercial PPO', planName: 'PharmaMax Preferred PPO', planType: 'Commercial PPO' },
	{ provider: 'Golden State Medicare Advantage', planName: 'Golden State Medicare Complete', planType: 'Medicare Part D' },
	{ provider: 'CommunityCare Medicaid', planName: 'CommunityCare Essential', planType: 'Medicaid Managed Care' },
	{ provider: 'Sunrise HMO', planName: 'Sunrise Choice HMO', planType: 'Commercial HMO' },
	{ provider: 'MetroPlus Commercial HMO', planName: 'MetroPlus Advantage', planType: 'Commercial HMO' }
];

const areaCodes = ['415', '628', '650', '510'];
const streetNames = [
	'Fulton St',
	'Jackson St',
	'Valencia St',
	'Geary Blvd',
	'Market St',
	'Mission St',
	'3rd Ave',
	'24th St',
	'Potrero Ave',
	'Sutter St',
	'Polk St',
	'Fillmore St'
];
const cities = [
	'San Francisco, CA 94102',
	'San Francisco, CA 94103',
	'San Francisco, CA 94107',
	'San Francisco, CA 94109',
	'San Francisco, CA 94110',
	'San Francisco, CA 94114',
	'Oakland, CA 94607',
	'Daly City, CA 94014',
	'San Mateo, CA 94401'
];

const formatPhone = (index: number) => {
	const area = randomPick(areaCodes, index);
	const base = 1000 + ((index * 73) % 9000);
	return `${area}-555-${pad(base, 4)}`;
};

const formatAddress = (index: number) => {
	const number = 400 + (index * 17) % 500;
	return `${number} ${randomPick(streetNames, index)}, ${randomPick(cities, index)}`;
};

const formatEmail = (first: string, last: string, index: number) => `${first.toLowerCase()}.${last.toLowerCase()}${index}@pharmamax.test`;

const buildInsurance = (provider: string, planType: string, index: number): InsuranceDetails => {
	const prefix = provider
		.split(' ')
		.map((part) => part[0])
		.join('')
		.slice(0, 3)
		.toUpperCase();
	return {
		provider,
		planType,
		memberId: `${prefix}${pad(500000 + index * 7, 6)}`,
		groupNumber: `${prefix}G${pad(210 + (index % 70), 3)}`
	};
};

const SCENARIO_PATIENTS: PatientBlueprint[] = [
	{
		firstName: 'Ethan',
		lastName: 'Nguyen',
		gender: 'male',
		dateOfBirth: '2015-04-12',
		insuranceProvider: 'Sunrise HMO',
		planType: 'Commercial HMO',
		allergies: [
			{ allergen: 'Peanut oil', reaction: 'anaphylaxis', severity: 'severe', dateReported: '2019-08-04' }
		],
		conditions: ['asthma'],
		medications: [
			{ key: 'albuterol', strength: '90 mcg/actuation', startDate: '2023-05-01', refillsRemaining: 3 },
			{ key: 'fluticasone-inhaler', strength: '110 mcg/actuation', startDate: '2023-02-15', refillsRemaining: 2 }
		],
		notes: 'Pediatric asthma patient using spacer with inhalers.'
	},
	{
		firstName: 'Harriet',
		lastName: 'Coleman',
		gender: 'female',
		dateOfBirth: '1944-11-05',
		insuranceProvider: 'Golden State Medicare Advantage',
		planType: 'Medicare Part D',
		allergies: [
			{ allergen: 'Sulfa antibiotics', reaction: 'rash', severity: 'moderate', dateReported: '2002-03-11' }
		],
		conditions: ['hypertension', 'hyperlipidemia', 'type 2 diabetes', 'osteoarthritis'],
		medications: [
			{ key: 'lisinopril', strength: '20 mg', startDate: '2018-01-10', refillsRemaining: 1 },
			{ key: 'atorvastatin', strength: '40 mg', startDate: '2019-05-22', refillsRemaining: 2 },
			{ key: 'metformin', strength: '1000 mg', startDate: '2017-09-01', refillsRemaining: 3 },
			{ key: 'gabapentin', strength: '300 mg', startDate: '2020-04-15', refillsRemaining: 4 }
		],
		notes: 'Uses pill organizer; grandson assists with pickups.'
	},
	{
		firstName: 'Malik',
		lastName: 'Johnson',
		gender: 'male',
		dateOfBirth: '1983-02-18',
		insuranceProvider: 'CommunityCare Medicaid',
		planType: 'Medicaid Managed Care',
		allergies: [
			{ allergen: 'Penicillin', reaction: 'hives', severity: 'moderate', dateReported: '1991-07-03' }
		],
		conditions: ['hypertension', 'type 2 diabetes', 'chronic back pain'],
		medications: [
			{ key: 'amlodipine', strength: '10 mg', startDate: '2021-11-02', refillsRemaining: 2 },
			{ key: 'metformin', strength: '850 mg', startDate: '2020-06-12', refillsRemaining: 1 },
			{ key: 'tramadol', strength: '50 mg', startDate: '2023-09-01', refillsRemaining: 0 }
		],
		notes: 'Flag for antibiotic alternatives due to penicillin allergy.'
	},
	{
		firstName: 'Sofia',
		lastName: 'Martinez',
		gender: 'female',
		dateOfBirth: '1990-06-27',
		insuranceProvider: 'PharmaMax Commercial PPO',
		planType: 'Commercial PPO',
		allergies: [],
		conditions: ['pregnancy', 'iron deficiency anemia'],
		medications: [
			{ key: 'prenatal', strength: '27 mg iron', startDate: '2023-12-01', refillsRemaining: 5 },
			{ key: 'vitamin-d', strength: '2000 IU', startDate: '2023-12-01', refillsRemaining: 3 }
		],
		notes: 'Currently 24 weeks pregnant; avoid Category X medications.'
	},
	{
		firstName: 'Jamal',
		lastName: 'Ferguson',
		gender: 'male',
		dateOfBirth: '1978-09-14',
		insuranceProvider: 'MetroPlus Commercial HMO',
		planType: 'Commercial HMO',
		allergies: [],
		conditions: ['opioid use disorder', 'chronic pain'],
		medications: [
			{ key: 'buprenorphine-naloxone', strength: '8-2 mg', startDate: '2022-05-05', refillsRemaining: 1 },
			{ key: 'naloxone', strength: '4 mg/0.1 mL', startDate: '2022-10-01', refillsRemaining: 1 }
		],
		notes: 'Requires monthly counseling note prior to buprenorphine refill.'
	},
	{
		firstName: 'Avery',
		lastName: 'Chang',
		gender: 'non-binary',
		dateOfBirth: '1998-01-09',
		insuranceProvider: 'PharmaMax Commercial PPO',
		planType: 'Commercial PPO',
		allergies: [
			{ allergen: 'Sertraline', reaction: 'nausea', severity: 'mild', dateReported: '2021-02-18' }
		],
		conditions: ['generalized anxiety disorder', 'major depressive disorder'],
		medications: [
			{ key: 'escitalopram', strength: '20 mg', startDate: '2022-04-10', refillsRemaining: 2 },
			{ key: 'alprazolam', strength: '0.5 mg', startDate: '2023-11-22', refillsRemaining: 0 }
		],
		notes: 'Controlled substance agreement on file; monitor use with therapy notes.'
	},
	{
		firstName: 'Eleanor',
		lastName: 'Price',
		gender: 'female',
		dateOfBirth: '1955-03-03',
		insuranceProvider: 'Golden State Medicare Advantage',
		planType: 'Medicare Part D',
		allergies: [
			{ allergen: 'Warfarin', reaction: 'excessive bruising', severity: 'moderate', dateReported: '2016-08-12' }
		],
		conditions: ['atrial fibrillation', 'type 2 diabetes', 'hypertension'],
		medications: [
			{ key: 'apixaban', strength: '5 mg', startDate: '2021-03-01', refillsRemaining: 2 },
			{ key: 'metformin', strength: '500 mg', startDate: '2020-05-10', refillsRemaining: 2 },
			{ key: 'lisinopril', strength: '40 mg', startDate: '2019-07-24', refillsRemaining: 1 }
		],
		notes: 'Apixaban requires prior authorization renewal each year.'
	},
	{
		firstName: 'Caleb',
		lastName: 'Dawson',
		gender: 'male',
		dateOfBirth: '2005-12-21',
		insuranceProvider: 'CommunityCare Medicaid',
		planType: 'Medicaid Managed Care',
		allergies: [],
		conditions: ['ADHD', 'generalized anxiety disorder'],
		medications: [
			{ key: 'amphetamine-dextroamphetamine', strength: '20 mg', startDate: '2024-01-05', refillsRemaining: 0 },
			{ key: 'alprazolam', strength: '0.25 mg', startDate: '2023-12-15', refillsRemaining: 0 }
		],
		notes: 'Multiple controlled substance prescriptions; monitor for doctor shopping.'
	},
	{
		firstName: 'Imani',
		lastName: 'Rodgers',
		gender: 'female',
		dateOfBirth: '1972-05-18',
		insuranceProvider: 'MetroPlus Commercial HMO',
		planType: 'Commercial HMO',
		allergies: [
			{ allergen: 'Morphine', reaction: 'itching', severity: 'mild', dateReported: '2010-04-08' }
		],
		conditions: ['chronic kidney disease stage 3', 'hypertension'],
		medications: [
			{ key: 'gabapentin', strength: '600 mg', startDate: '2023-02-10', refillsRemaining: 1 },
			{ key: 'lisinopril', strength: '10 mg', startDate: '2022-08-01', refillsRemaining: 2 }
		],
		notes: 'Renal dosing adjustments required for gabapentin.'
	},
	{
		firstName: 'Natalie',
		lastName: 'Hoffman',
		gender: 'female',
		dateOfBirth: '1988-08-29',
		insuranceProvider: 'PharmaMax Commercial PPO',
		planType: 'Commercial PPO',
		allergies: [
			{ allergen: 'Levofloxacin', reaction: 'tendon pain', severity: 'moderate', dateReported: '2019-11-19' }
		],
		conditions: ['recurrent sinusitis', 'migraine'],
		medications: [
			{ key: 'metoprolol-tartrate', strength: '50 mg', startDate: '2022-02-01', refillsRemaining: 2 }
		],
		notes: 'Avoid fluoroquinolones due to previous tendon issues.'
	},
	{
		firstName: 'Robert',
		lastName: 'Ellis',
		gender: 'male',
		dateOfBirth: '1958-01-02',
		insuranceProvider: 'Golden State Medicare Advantage',
		planType: 'Medicare Part D',
		allergies: [],
		conditions: ['COPD', 'hypertension'],
		medications: [
			{ key: 'albuterol', strength: '90 mcg/actuation', startDate: '2021-01-10', refillsRemaining: 2 },
			{ key: 'fluticasone-inhaler', strength: '110 mcg/actuation', startDate: '2022-06-15', refillsRemaining: 3 },
			{ key: 'prednisone', strength: '10 mg', startDate: '2023-10-01', refillsRemaining: 1 }
		],
		notes: 'History of COPD exacerbations requiring steroid tapers.'
	}
];

const GENERAL_PATIENT_NAMES: Array<{ first: string; last: string; gender: 'male' | 'female' | 'non-binary' }> = [
	{ first: 'Liam', last: 'Bennett', gender: 'male' },
	{ first: 'Olivia', last: 'Garcia', gender: 'female' },
	{ first: 'Noah', last: 'Simmons', gender: 'male' },
	{ first: 'Emma', last: 'Lopez', gender: 'female' },
	{ first: 'Aiden', last: 'Harper', gender: 'male' },
	{ first: 'Mia', last: 'Thompson', gender: 'female' },
	{ first: 'Jackson', last: 'Lee', gender: 'male' },
	{ first: 'Amelia', last: 'Clark', gender: 'female' },
	{ first: 'Lucas', last: 'Morgan', gender: 'male' },
	{ first: 'Charlotte', last: 'Diaz', gender: 'female' },
	{ first: 'Elijah', last: 'Wright', gender: 'male' },
	{ first: 'Zoe', last: 'Ng', gender: 'female' },
	{ first: 'Mason', last: 'Foster', gender: 'male' },
	{ first: 'Avery', last: 'Sullivan', gender: 'non-binary' },
	{ first: 'Isabella', last: 'Reed', gender: 'female' },
	{ first: 'Logan', last: 'Kim', gender: 'male' },
	{ first: 'Luna', last: 'Stewart', gender: 'female' },
	{ first: 'Ethan', last: 'Torres', gender: 'male' },
	{ first: 'Sofia', last: 'Ruiz', gender: 'female' },
	{ first: 'Caleb', last: 'Gibson', gender: 'male' }
];

const CONDITION_POOL: string[][] = [
	['hypertension', 'hyperlipidemia'],
	['type 2 diabetes'],
	['asthma'],
	['depression'],
	['anxiety disorders'],
	['chronic pain'],
	['COPD'],
	['migraine'],
	['GERD'],
	['hypothyroidism']
];

const CONDITION_MEDICATIONS: Record<string, MedicationSeed[]> = {
	hypertension: [{ key: 'lisinopril', strength: '20 mg', startDate: '2021-01-10', refillsRemaining: 2 }],
	hyperlipidemia: [{ key: 'atorvastatin', strength: '20 mg', startDate: '2021-01-10', refillsRemaining: 2 }],
	'asthma': [{ key: 'albuterol', strength: '90 mcg/actuation', startDate: '2022-03-01', refillsRemaining: 3 }],
	depression: [{ key: 'sertraline', strength: '50 mg', startDate: '2022-06-01', refillsRemaining: 2 }],
	'anxiety disorders': [{ key: 'escitalopram', strength: '10 mg', startDate: '2023-02-01', refillsRemaining: 3 }],
	'chronic pain': [{ key: 'gabapentin', strength: '300 mg', startDate: '2020-09-10', refillsRemaining: 2 }],
	COPD: [{ key: 'fluticasone-inhaler', strength: '110 mcg/actuation', startDate: '2022-08-01', refillsRemaining: 2 }],
	migraine: [{ key: 'metoprolol-tartrate', strength: '25 mg', startDate: '2023-04-20', refillsRemaining: 3 }],
	GERD: [{ key: 'omeprazole', strength: '20 mg', startDate: '2021-05-01', refillsRemaining: 2 }],
	hypothyroidism: [{ key: 'levothyroxine', strength: '75 mcg', startDate: '2019-03-15', refillsRemaining: 4 }],
	'diabetes supplies': [
		{ key: 'glucose-strips', strength: 'Standard', startDate: '2023-05-01', refillsRemaining: 5 },
		{ key: 'lancets', strength: '30 gauge', startDate: '2023-05-01', refillsRemaining: 5 }
	]
};

const buildPatients = (targetCount = 60) => {
	const patients: PatientProfile[] = [];
	const scenarioIds: Record<string, string> = {};

	SCENARIO_PATIENTS.forEach((scenario, index) => {
		const prescriberFallback = PRESCRIBER_SEEDS[index % PRESCRIBER_SEEDS.length];
		const medications = scenario.medications.map((medication, medIndex) =>
			createMedication(
				{ ...medication, prescriber: medication.prescriber ?? PRESCRIBER_SEEDS[(index + medIndex) % PRESCRIBER_SEEDS.length].name },
				prescriberFallback
			)
		);

		const insurance = buildInsurance(scenario.insuranceProvider, scenario.planType, index);
		const patient: PatientProfile = {
			id: `PT-${pad(index + 1, 6)}`,
			name: `${scenario.firstName} ${scenario.lastName}`,
			dateOfBirth: scenario.dateOfBirth,
			age: calculateAge(scenario.dateOfBirth),
			gender: scenario.gender,
			phone: formatPhone(index),
			email: formatEmail(scenario.firstName, scenario.lastName, index),
			address: formatAddress(index),
			insurance,
			allergies: scenario.allergies,
			conditions: scenario.conditions,
			currentMedications: medications,
			notes: scenario.notes
		};

		patients.push(patient);
		scenarioIds[patient.name] = patient.id;
	});

	let counter = patients.length;
	let nameIndex = 0;

	while (counter < targetCount) {
		const nameSeed = GENERAL_PATIENT_NAMES[nameIndex % GENERAL_PATIENT_NAMES.length];
		const baseIndex = counter + nameIndex;
		const birthYear = 1947 + (baseIndex * 7) % 60;
		const birthMonth = ((baseIndex * 3) % 12) + 1;
		const birthDay = ((baseIndex * 5) % 28) + 1;
		const dob = `${birthYear}-${pad(birthMonth, 2)}-${pad(birthDay, 2)}`;

		const insuranceSeed = INSURANCE_SEEDS[(baseIndex + 1) % INSURANCE_SEEDS.length];
		const insurance = buildInsurance(insuranceSeed.provider, insuranceSeed.planType, baseIndex);

		const conditions = randomPick(CONDITION_POOL, baseIndex);
		const medicationSeeds: MedicationSeed[] = [];
		conditions.forEach((condition) => {
			const meds = CONDITION_MEDICATIONS[condition];
			if (meds) {
				meds.forEach((med, medIndex) => {
					medicationSeeds.push({
						...med,
						prescriber: PRESCRIBER_SEEDS[(baseIndex + medIndex) % PRESCRIBER_SEEDS.length].name
					});
				});
			}
		});

		if (conditions.includes('type 2 diabetes')) {
			medicationSeeds.push({ key: 'metformin', strength: '500 mg', startDate: '2021-10-15', refillsRemaining: 3 });
			medicationSeeds.push(...CONDITION_MEDICATIONS['diabetes supplies']);
		}

		const unique: Record<string, boolean> = {};
		const medicationList = medicationSeeds
			.filter((seed) => {
				const key = `${seed.key}:${seed.strength}`;
				if (unique[key]) return false;
				unique[key] = true;
				return true;
			})
			.slice(0, 5)
			.map((seed, medIndex) => createMedication(seed, PRESCRIBER_SEEDS[(baseIndex + medIndex) % PRESCRIBER_SEEDS.length]));

		const firstName = `${nameSeed.first}${counter}`;
		const lastName = nameSeed.last;

		const allergyPool: PatientAllergy[] = [
			{ allergen: 'Seasonal pollen', reaction: 'sneezing', severity: 'mild', dateReported: '2018-04-12' },
			{ allergen: 'Shellfish', reaction: 'hives', severity: 'moderate', dateReported: '2015-08-22' }
		];
		const allergies = baseIndex % 5 === 0 ? [randomPick(allergyPool, baseIndex)] : [];

		const patient: PatientProfile = {
			id: `PT-${pad(counter + 1, 6)}`,
			name: `${firstName} ${lastName}`,
			dateOfBirth: dob,
			age: calculateAge(dob),
			gender: nameSeed.gender,
			phone: formatPhone(counter),
			email: formatEmail(firstName, lastName, counter),
			address: formatAddress(counter),
			insurance,
			allergies,
			conditions,
			currentMedications: medicationList,
			notes: baseIndex % 7 === 0 ? 'Participating in medication synchronization program.' : undefined
		};

		patients.push(patient);
		counter += 1;
		nameIndex += 1;
	}

	return { patients, scenarioIds };
};

const buildInventory = (): InventoryItem[] => {
	const items: InventoryItem[] = [];

	DRUG_CATALOG.forEach((drug, index) => {
		drug.packageConfigs.forEach((pkg, pkgIndex) => {
			const currentStock = 20 + ((index + pkgIndex) * 13) % 180;
			const reorderPoint = Math.max(10, Math.floor(currentStock / 3));
			const reorderQuantity = pkg.packageSize * (pkgIndex + 1);
			const status = currentStock === 0
				? 'out-of-stock'
				: currentStock < reorderPoint
					? 'low-stock'
					: pkgIndex === 0 && (index + pkgIndex) % 17 === 0
						? 'discontinued'
						: 'in-stock';

			items.push({
				ndc: pkg.ndc,
				drugName: drug.drugName,
				strength: drug.strength,
				dosageForm: drug.dosageForm,
				manufacturer: pkg.manufacturer,
				packageSize: pkg.packageLabel,
				currentStock,
				reorderPoint,
				reorderQuantity,
				costPerPackage: pkg.costPerPackage,
				wholesalePrice: pkg.wholesalePrice,
				lastOrderDate: `2023-${pad(((index + pkgIndex) % 12) + 1, 2)}-${pad(((index + pkgIndex) % 27) + 1, 2)}`,
				expirationDate: pkg.expirationDate,
				lotNumber: pkg.lotNumber,
				location: pkg.location,
				isControlled: pkg.isControlled ?? drug.isControlled,
				deaSchedule: pkg.deaSchedule ?? drug.deaSchedule,
				usage30days: 10 + ((index + 3 * pkgIndex) % 90),
				status,
				refrigerated: pkg.refrigerated
			});
		});
	});

	return items;
};

interface ControlledSeed {
	prescriptionId: string;
	patientId: string;
	drugName: string;
	deaSchedule?: 'C-II' | 'C-III' | 'C-IV' | 'C-V';
	quantity: number;
	ndc: string;
	prescriber: string;
	timestamp: number;
	fillDate?: string;
}

const buildPrescriptions = (
	patients: PatientProfile[],
	inventory: InventoryItem[]
): {
	prescriptions: PrescriptionHistoryEntry[];
	partialFills: PartialFillHistoryEntry[];
	barcodeHistory: BarcodeScanEntry[];
	controlledSeeds: ControlledSeed[];
} => {
	const prescriptions: PrescriptionHistoryEntry[] = [];
	const partialFills: PartialFillHistoryEntry[] = [];
	const barcodeHistory: BarcodeScanEntry[] = [];
	const controlledSeeds: ControlledSeed[] = [];

	const inventoryByDrug = new Map<string, InventoryItem[]>();
	const statusPriority: Record<string, number> = {
		'in-stock': 0,
		'low-stock': 1,
		'out-of-stock': 2,
		'discontinued': 3
	};

	for (const item of inventory) {
		const list = inventoryByDrug.get(item.drugName) ?? [];
		list.push(item);
		list.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
		inventoryByDrug.set(item.drugName, list);
	}

	const selectInventory = (drugName: string): InventoryItem | undefined => {
		const list = inventoryByDrug.get(drugName);
		if (!list || list.length === 0) return undefined;
		return list[0];
	};

	const buildPackageOptions = (drug: DrugCatalogEntry, quantityNeeded: number) => {
		const inventoryItem = selectInventory(drug.drugName);
		if (!inventoryItem) {
			return {
				packages: [],
				totalQuantity: quantityNeeded,
				inventoryItem: undefined
			};
		}

		const numericSize = Math.max(1, parseInt(inventoryItem.packageSize.split(' ')[0], 10) || inventoryItem.reorderQuantity || 1);
		const packagesNeeded = Math.max(1, Math.ceil(quantityNeeded / numericSize));
		const totalQuantity = packagesNeeded * numericSize;

		return {
			packages: [
				{
					ndc: inventoryItem.ndc,
					packageDescription: inventoryItem.packageSize,
					packageSize: numericSize,
					packagesNeeded,
					totalQuantity,
					costPerPackage: inventoryItem.costPerPackage
				}
			],
			totalQuantity,
			inventoryItem
		};
	};

	const pharmacists = PHARMACY_STAFF_SEEDS.filter((staff) => staff.role === 'pharmacist');
	const findPharmacist = (index: number) => pharmacists[index % pharmacists.length];

	let rxCounter = 0;

	const createPrescription = (
		patient: PatientProfile,
		medication: PatientMedication,
		patientIndex: number,
		overrides?: {
			daysSupply?: number;
			refills?: number;
			status?: 'filled' | 'partial-fill' | 'pending' | 'cancelled';
			fillDateOffsetDays?: number;
			recommendation?: PrescriptionRecommendation;
			notes?: string;
			partials?: { totalQuantity: number; fills: Array<Omit<PartialFillDetail, 'fillId'>> };
			barcodeStatus?: 'match' | 'warning' | 'mismatch';
			timestamp?: number;
			fillDate?: string;
		}
	) => {
		const drug = DRUG_BY_NAME.get(medication.drugName);
		if (!drug) return;

		const refills = overrides?.refills ?? Math.max(0, medication.refillsRemaining) + ((rxCounter + patientIndex) % 2);
		const daysSupply = overrides?.daysSupply ?? drug.defaultDaysSupply;
		const totalQuantityNeeded = Math.max(1, Math.round(drug.perDose * drug.frequency * daysSupply));
		const packageInfo = buildPackageOptions(drug, totalQuantityNeeded);

		const recommendation: PrescriptionRecommendation = overrides?.recommendation ?? {
			type: 'optimal',
			message: 'Calculated optimal package combination.'
		};

		const timestamp = overrides?.timestamp ?? REFERENCE_DATE.getTime() - rxCounter * 86400000 - patientIndex * 3600000;
		const prescribedDate = new Date(timestamp).toISOString().split('T')[0];
		const fillDate = overrides?.fillDate ?? new Date(timestamp + (overrides?.fillDateOffsetDays ?? 1) * 86400000)
			.toISOString()
			.split('T')[0];
		const rxId = `RX-${pad(rxCounter + 1, 6)}`;
		const pharmacist = findPharmacist(rxCounter + patientIndex);

		const prescription: PrescriptionHistoryEntry = {
			id: rxId,
			timestamp,
			patientId: patient.id,
			drugInput: medication.drugName,
			sig: medication.sig,
			daysSupply,
			refills,
			prescriber: medication.prescriber,
			prescribedDate,
			isFavorite: (rxCounter + patientIndex) % 11 === 0,
			result: {
				prescription: {
					drugName: drug.drugName,
					rxcui: drug.rxcui,
					sig: medication.sig,
					daysSupply
				},
				calculation: {
					totalQuantityNeeded,
					unit: drug.unit,
					perDose: drug.perDose,
					frequency: drug.frequency,
					dailyAmount: drug.perDose * drug.frequency
				},
				packages: packageInfo.packages,
				recommendation
			},
			status: overrides?.status ?? 'filled',
			fillDate: overrides?.status === 'pending' ? undefined : fillDate,
			pharmacist: pharmacist.name,
			notes: overrides?.notes
		};

		prescriptions.push(prescription);

		if (packageInfo.inventoryItem) {
			barcodeHistory.push({
				id: `BC-${pad(rxCounter + 1, 6)}`,
				timestamp: timestamp - 300000,
				barcodeType: 'NDC',
				barcodeData: packageInfo.inventoryItem.ndc,
				ndc: packageInfo.inventoryItem.ndc,
				drugName: drug.drugName,
				scannedBy: pharmacist.name,
				verificationStatus: overrides?.barcodeStatus ?? (packageInfo.inventoryItem.status === 'out-of-stock' ? 'warning' : 'match'),
				linkedPrescriptionId: prescription.id
			});

			if (drug.isControlled || drug.deaSchedule) {
				controlledSeeds.push({
					prescriptionId: rxId,
					patientId: patient.id,
					drugName: drug.drugName,
					deaSchedule: drug.deaSchedule,
					quantity: packageInfo.totalQuantity,
					ndc: packageInfo.inventoryItem.ndc,
					prescriber: prescription.prescriber,
					timestamp,
					fillDate: prescription.fillDate
				});
			}
		}

		if (overrides?.status === 'partial-fill' && overrides.partials) {
			const fills: PartialFillDetail[] = overrides.partials.fills.map((fill, index) => ({
				...fill,
				fillId: `PF-${pad(rxCounter * 3 + index + 1, 6)}`
			}));
			partialFills.push({
				originalPrescriptionId: rxId,
				patientId: patient.id,
				drugName: drug.drugName,
				totalQuantityPrescribed: overrides.partials.totalQuantity,
				fills
			});
		}

		rxCounter += 1;
	};

	patients.forEach((patient, patientIndex) => {
		const baseMeds = patient.currentMedications.slice(0, 4);
		baseMeds.forEach((medication, medIndex) => {
			createPrescription(patient, medication, patientIndex, {
				fillDateOffsetDays: (medIndex % 3) + 1
			});
		});

		if (baseMeds.length > 0) {
			createPrescription(patient, baseMeds[0], patientIndex, {
				daysSupply: 90,
				refills: Math.max(1, baseMeds[0].refillsRemaining + 1),
				fillDateOffsetDays: 0
			});
		}
		if (baseMeds.length > 1) {
			createPrescription(patient, baseMeds[1], patientIndex, {
				timestamp: REFERENCE_DATE.getTime() - 45 * 86400000 - patientIndex * 5400000,
				fillDate: new Date(REFERENCE_DATE.getTime() - 42 * 86400000 - patientIndex * 5400000).toISOString().split('T')[0],
				recommendation: { type: 'optimal', message: 'Historical refill documented for adherence tracking.' },
				notes: 'Historical record for adherence review.'
			});
		}
		if (baseMeds.length > 0 && patientIndex % 2 === 0) {
			createPrescription(patient, baseMeds[0], patientIndex, {
				status: 'pending',
				timestamp: REFERENCE_DATE.getTime() - 3 * 86400000 + patientIndex * 3600000,
				recommendation: { type: 'inventory', message: 'Awaiting stock replenishment before fill.' },
				barcodeStatus: 'warning',
				notes: 'Pending due to temporary stock shortage.'
			});
		}
		const controlledMedication = baseMeds.find((med) => {
			const drug = DRUG_BY_NAME.get(med.drugName);
			return drug?.isControlled;
		});
		if (controlledMedication && patientIndex % 4 === 0) {
			createPrescription(patient, controlledMedication, patientIndex, {
				status: 'partial-fill',
				daysSupply: 30,
				partials: {
					totalQuantity: 40,
					fills: [
						{
							fillDate: new Date(REFERENCE_DATE.getTime() - 10 * 86400000 + patientIndex * 720000).toISOString().split('T')[0],
							quantityDispensed: 20,
							remainingQuantity: 20,
							pharmacist: findPharmacist(patientIndex).name,
							reason: 'controlled-substance' as PartialFillReason,
							mustCompleteBefore: new Date(REFERENCE_DATE.getTime() + 5 * 86400000).toISOString().split('T')[0]
						},
						{
							fillDate: new Date(REFERENCE_DATE.getTime() - 4 * 86400000 + patientIndex * 810000).toISOString().split('T')[0],
							quantityDispensed: 10,
							remainingQuantity: 10,
							pharmacist: findPharmacist(patientIndex + 1).name,
							reason: 'controlled-substance' as PartialFillReason,
							mustCompleteBefore: new Date(REFERENCE_DATE.getTime() + 12 * 86400000).toISOString().split('T')[0]
						}
					]
				}
			});
		} else if (baseMeds.length > 0 && patientIndex % 5 === 0) {
			createPrescription(patient, baseMeds[0], patientIndex, {
				status: 'partial-fill',
				daysSupply: 14,
				partials: {
					totalQuantity: 28,
					fills: [
						{
							fillDate: new Date(REFERENCE_DATE.getTime() - 6 * 86400000).toISOString().split('T')[0],
							quantityDispensed: 14,
							remainingQuantity: 14,
							pharmacist: findPharmacist(patientIndex + 2).name,
							reason: 'patient-request' as PartialFillReason
						},
						{
							fillDate: new Date(REFERENCE_DATE.getTime() - 2 * 86400000).toISOString().split('T')[0],
							quantityDispensed: 10,
							remainingQuantity: 4,
							pharmacist: findPharmacist(patientIndex + 3).name,
							reason: 'patient-request' as PartialFillReason
						}
					]
				}
			});
		}
	});

	const findPatient = (name: string) => patients.find((p) => p.name === name);

	const pediatricAsthma = findPatient('Ethan Nguyen');
	if (pediatricAsthma) {
		const controller = pediatricAsthma.currentMedications.find((med) => med.drugName.includes('Fluticasone'));
		if (controller) {
			createPrescription(pediatricAsthma, controller, 0, {
				daysSupply: 60,
				recommendation: {
					type: 'manual-review',
					message: 'Verify spacer technique and adherence before extending supply.'
				},
				notes: 'Extended supply for upcoming travel.'
			});
		}
	}

	const penicillinAllergy = findPatient('Malik Johnson');
	const amox = DRUG_BY_NAME.get('Amoxicillin 500 mg Capsule');
	if (penicillinAllergy && amox) {
		const med: PatientMedication = {
			...penicillinAllergy.currentMedications[0],
			drugName: amox.drugName,
			sig: amox.defaultSig,
			startDate: '2024-03-15',
			refillsRemaining: 0
		};
		createPrescription(penicillinAllergy, med, 2, {
			status: 'pending',
			recommendation: {
				type: 'allergy',
				message: 'Allergy alert: patient reports hives with penicillin.',
				notes: 'Contact prescriber for alternative antibiotic.'
			},
			barcodeStatus: 'warning',
			notes: 'On hold due to documented penicillin allergy.'
		});
	}

	const apixabanPatient = findPatient('Eleanor Price');
	const azithro = DRUG_BY_NAME.get('Azithromycin 250 mg Tablet');
	if (apixabanPatient && azithro) {
		const med: PatientMedication = {
			...apixabanPatient.currentMedications[0],
			drugName: azithro.drugName,
			sig: azithro.defaultSig,
			startDate: '2024-02-01',
			refillsRemaining: 0
		};
		createPrescription(apixabanPatient, med, 6, {
			recommendation: {
				type: 'warning',
				message: 'Potential interaction with apixaban. Monitor for bleeding.',
				notes: 'Consider alternative antibiotic if possible.'
			},
			notes: 'Interaction alert generated by clinical decision support.',
			fillDateOffsetDays: 0
		});
	}

	const stimulantPatient = findPatient('Caleb Dawson');
	if (stimulantPatient) {
		const stimulant = stimulantPatient.currentMedications.find((med) => med.drugName.includes('Amphetamine'));
		if (stimulant) {
			createPrescription(stimulantPatient, stimulant, 7, {
				status: 'partial-fill',
				daysSupply: 30,
				partials: {
					totalQuantity: 60,
					fills: [
						{
							fillDate: '2024-02-05',
							quantityDispensed: 20,
							remainingQuantity: 40,
							pharmacist: findPharmacist(3).name,
							reason: 'controlled-substance' as PartialFillReason,
							mustCompleteBefore: '2024-02-20'
						},
						{
							fillDate: '2024-02-18',
							quantityDispensed: 20,
							remainingQuantity: 20,
							pharmacist: findPharmacist(4).name,
							reason: 'controlled-substance' as PartialFillReason,
							mustCompleteBefore: '2024-03-05'
						}
					]
				}
			});
		}
	}

	const opioidPatient = findPatient('Jamal Ferguson');
	const oxy = DRUG_BY_NAME.get('Oxycodone 10 mg Tablet');
	if (opioidPatient && oxy) {
		const med: PatientMedication = {
			...opioidPatient.currentMedications[0],
			drugName: oxy.drugName,
			sig: oxy.defaultSig,
			startDate: '2024-01-20',
			refillsRemaining: 0
		};
		createPrescription(opioidPatient, med, 4, {
			status: 'pending',
			recommendation: {
				type: 'manual-review',
				message: 'Early refill request flagged for review.',
				notes: 'Patient requested refill 10 days early; requires prescriber authorization.'
			},
			barcodeStatus: 'warning',
			notes: 'Hold until prescriber approval is obtained.'
		});
	}

	return { prescriptions, partialFills, barcodeHistory, controlledSeeds };
};

const buildControlledLogs = (
	seeds: ControlledSeed[],
	patients: PatientProfile[],
	prescriptions: PrescriptionHistoryEntry[]
): ControlledSubstanceLogEntry[] => {
	const prescribersByName = new Map(PRESCRIBER_SEEDS.map((prescriber) => [prescriber.name, prescriber] as const));
	const pharmacists = PHARMACY_STAFF_SEEDS.filter((staff) => staff.role === 'pharmacist');

	return seeds.map((seed, index) => {
		const prescriber = prescribersByName.get(seed.prescriber) ?? PRESCRIBER_SEEDS[index % PRESCRIBER_SEEDS.length];
		const pharmacist = pharmacists[index % pharmacists.length];
		const verifier = pharmacists[(index + 2) % pharmacists.length];
		const prescription = prescriptions.find((rx) => rx.id === seed.prescriptionId);

		return {
			id: `CS-${pad(index + 1, 6)}`,
			timestamp: seed.timestamp + 1800000,
			patientId: seed.patientId,
			prescriptionId: seed.prescriptionId,
			drugName: seed.drugName,
			deaSchedule: seed.deaSchedule ?? 'C-II',
			ndc: seed.ndc,
			quantity: seed.quantity,
			prescriber: {
				name: prescriber.name,
				deaNumber: prescriber.deaNumber ?? `PX${pad(index + 1234567, 7)}`,
				npi: prescriber.npi
			},
			dispensedBy: pharmacist.name,
			verifiedBy: verifier.name,
			notes:
				prescription?.status === 'pending'
					? 'Hold for prescriber authorization due to early refill request.'
					: 'Verified in controlled substance log.',
			pmpReported: index % 4 !== 0,
			reportedDate: index % 4 !== 0 ? new Date(seed.timestamp + 2 * 3600000).toISOString().split('T')[0] : undefined,
			flags:
				prescription?.status === 'pending' ? ['early-refill'] : seed.deaSchedule === 'C-II' ? ['requires-hard-copy'] : undefined
		};
	});
};

const buildDrugSafety = (): DrugSafetyRecord[] => [
	{
		drugName: 'Warfarin 5 mg Tablet',
		rxcui: '855332',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'critical',
				title: 'Requires regular INR monitoring',
				description: 'Warfarin has a narrow therapeutic index and interacts with many foods and medications.',
				recommendation: 'Check INR within 3 days of any medication change and every 4 weeks when stable.',
				source: 'Clinical Guidelines'
			},
			{
				type: 'pregnancy-warning',
				severity: 'warning',
				title: 'Contraindicated in pregnancy',
				description: 'Warfarin crosses the placenta and can cause fetal harm.',
				recommendation: 'Use LMWH instead when anticoagulation is required during pregnancy.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Azithromycin 250 mg Tablet',
				severity: 'major',
				effect: 'May increase INR and bleeding risk.',
				recommendation: 'Monitor INR closely and adjust warfarin dose as needed.'
			},
			{
				interactingDrug: 'Ibuprofen 600 mg Tablet',
				severity: 'moderate',
				effect: 'Increased bleeding risk due to platelet inhibition.',
				recommendation: 'Use acetaminophen for pain when possible.'
			}
		]
	},
	{
		drugName: 'Apixaban 5 mg Tablet',
		rxcui: '1364430',
		alerts: [
			{
				type: 'renal-adjustment',
				severity: 'warning',
				title: 'Dose adjustment in renal impairment',
				description: 'Reduce dose to 2.5 mg twice daily if serum creatinine ≥1.5 mg/dL and age ≥80 years or weight ≤60 kg.',
				recommendation: 'Assess renal function at least annually.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Azithromycin 250 mg Tablet',
				severity: 'moderate',
				effect: 'P-gp inhibitors may increase apixaban plasma levels.',
				recommendation: 'Monitor for bleeding and consider temporary dose adjustment.'
			}
		]
	},
	{
		drugName: 'Metformin 1000 mg Tablet',
		rxcui: '860976',
		alerts: [
			{
				type: 'renal-adjustment',
				severity: 'critical',
				title: 'Contraindicated in severe renal impairment',
				description: 'Risk of lactic acidosis increases with declining renal function.',
				recommendation: 'Avoid if eGFR <30 mL/min/1.73m² and reassess dosing if eGFR 30-45.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Gabapentin 600 mg Capsule',
				severity: 'minor',
				effect: 'Both can cause dizziness; counsel patient on fall risk.',
				recommendation: 'Monitor for additive CNS effects.'
			}
		]
	},
	{
		drugName: 'Insulin Glargine 100 units/mL Solution',
		rxcui: '847232',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'critical',
				title: 'Risk of severe hypoglycemia',
				description: 'Basal insulin may cause severe hypoglycemia if meals are skipped or dosing errors occur.',
				recommendation: 'Educate patients on glucose monitoring and hypoglycemia management.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Tramadol 50 mg Tablet',
				severity: 'moderate',
				effect: 'May mask hypoglycemia symptoms due to CNS depression.',
				recommendation: 'Counsel patient to monitor glucose closely.'
			}
		]
	},
	{
		drugName: 'Gabapentin 600 mg Capsule',
		rxcui: '310800',
		alerts: [
			{
				type: 'age-restriction',
				severity: 'warning',
				title: 'Increased fall risk in older adults',
				description: 'Gabapentin may cause dizziness and sedation, increasing fall risk.',
				recommendation: 'Start at lower doses in elderly patients; monitor gait and balance.',
				source: 'Beers Criteria'
			}
		],
		interactions: [
			{
				interactingDrug: 'Naloxone Nasal Spray',
				severity: 'minor',
				effect: 'No clinically significant interaction; ensure availability for opioid therapy.',
				recommendation: 'Document naloxone counseling.'
			}
		]
	},
	{
		drugName: 'Lisinopril 20 mg Tablet',
		rxcui: '197361',
		alerts: [
			{
				type: 'pregnancy-warning',
				severity: 'critical',
				title: 'Contraindicated in pregnancy',
				description: 'ACE inhibitors can cause injury and death to the developing fetus.',
				recommendation: 'Discontinue immediately if pregnancy is detected.',
				source: 'FDA'
			},
			{
				type: 'renal-adjustment',
				severity: 'warning',
				title: 'Monitor renal function and potassium',
				description: 'ACE inhibitors may cause hyperkalemia and reduced renal function.',
				recommendation: 'Check serum creatinine and potassium within 1-2 weeks of initiation.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Ibuprofen 800 mg Tablet',
				severity: 'moderate',
				effect: 'NSAIDs may diminish antihypertensive effect and impair renal function.',
				recommendation: 'Limit NSAID use and monitor blood pressure and renal function.'
			}
		]
	},
	{
		drugName: 'Prednisone 20 mg Tablet',
		rxcui: '312133',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'warning',
				title: 'Risk of immunosuppression',
				description: 'Systemic corticosteroids can increase infection risk and blood glucose.',
				recommendation: 'Monitor blood glucose in diabetic patients and counsel on infection precautions.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Metformin 500 mg Tablet',
				severity: 'moderate',
				effect: 'Prednisone may increase blood glucose, reducing metformin effectiveness.',
				recommendation: 'Monitor blood glucose more frequently during steroid therapy.'
			}
		]
	},
	{
		drugName: 'Amphetamine/Dextroamphetamine 20 mg Tablet',
		rxcui: '861014',
		alerts: [
			{
				type: 'black-box-warning',
				severity: 'critical',
				title: 'Potential for abuse and dependence',
				description: 'CNS stimulants have a high potential for abuse and misuse.',
				recommendation: 'Assess abuse risk prior to prescribing and monitor for misuse.',
				source: 'FDA'
			},
			{
				type: 'monitoring-required',
				severity: 'warning',
				title: 'Monitor cardiovascular status',
				description: 'Stimulants can increase blood pressure and heart rate.',
				recommendation: 'Assess baseline cardiovascular history and monitor periodically.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Escitalopram 20 mg Tablet',
				severity: 'moderate',
				effect: 'May increase risk of serotonin syndrome.',
				recommendation: 'Monitor for agitation, confusion, or tachycardia.'
			}
		]
	},
	{
		drugName: 'Oxycodone 10 mg Tablet',
		rxcui: '1049628',
		alerts: [
			{
				type: 'black-box-warning',
				severity: 'critical',
				title: 'Risk of addiction, abuse, and misuse',
				description: 'Opioids expose patients and users to risks of addiction and overdose.',
				recommendation: 'Use lowest effective dose for shortest duration; monitor for misuse.',
				source: 'FDA'
			},
			{
				type: 'pregnancy-warning',
				severity: 'warning',
				title: 'Neonatal opioid withdrawal syndrome',
				description: 'Prolonged use during pregnancy can result in neonatal withdrawal.',
				recommendation: 'Counsel pregnant patients on risks; coordinate with obstetrics.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Alprazolam 0.5 mg Tablet',
				severity: 'major',
				effect: 'Additive CNS depression and respiratory depression.',
				recommendation: 'Avoid co-prescribing when possible; monitor closely if necessary.'
			}
		]
	},
	{
		drugName: 'Buprenorphine/Naloxone 8-2 mg Film',
		rxcui: '1010607',
		alerts: [
			{
				type: 'black-box-warning',
				severity: 'warning',
				title: 'Risk of misuse and diversion',
				description: 'Buprenorphine combination products can be diverted for misuse.',
				recommendation: 'Use medication agreements and monitor PDMP reports.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Naloxone Nasal Spray',
				severity: 'minor',
				effect: 'No interaction; naloxone is recommended for emergency use.',
				recommendation: 'Ensure patient and family know how to administer naloxone.'
			}
		]
	},
	{
		drugName: 'Isotretinoin 40 mg Capsule',
		rxcui: '40265',
		alerts: [
			{
				type: 'black-box-warning',
				severity: 'critical',
				title: 'Pregnancy Category X',
				description: 'Isotretinoin is teratogenic and contraindicated in pregnancy.',
				recommendation: 'Enroll patient in iPLEDGE program; require two forms of contraception.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Prednisone 10 mg Tablet',
				severity: 'moderate',
				effect: 'Corticosteroids may increase risk of pseudotumor cerebri.',
				recommendation: 'Avoid combination if possible; monitor for headache/visual changes.'
			}
		]
	},
	{
		drugName: 'Hydrocodone/Acetaminophen 10-325 mg Tablet',
		rxcui: '857001',
		alerts: [
			{
				type: 'black-box-warning',
				severity: 'critical',
				title: 'Risk of hepatotoxicity',
				description: 'Acetaminophen doses above 4 grams daily can cause severe liver injury.',
				recommendation: 'Ensure total acetaminophen from all sources is <4 g/day.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Alcohol',
				severity: 'major',
				effect: 'Increased CNS depression and hepatotoxicity risk.',
				recommendation: 'Advise patient to avoid alcohol while taking this medication.'
			}
		]
	},
	{
		drugName: 'Naloxone 4 mg/0.1 mL Spray',
		rxcui: '1729615',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'info',
				title: 'Short duration of action',
				description: 'Naloxone may wear off before opioids; repeat dosing may be necessary.',
				recommendation: 'Call emergency services after administration and monitor patient.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: []
	},
	{
		drugName: 'Levofloxacin 500 mg Tablet',
		rxcui: '211861',
		alerts: [
			{
				type: 'age-restriction',
				severity: 'warning',
				title: 'Use with caution in pediatric patients',
				description: 'Fluoroquinolones associated with musculoskeletal adverse events in pediatrics.',
				recommendation: 'Reserve for situations with no alternative treatment.',
				source: 'FDA'
			},
			{
				type: 'black-box-warning',
				severity: 'warning',
				title: 'Risk of tendon rupture',
				description: 'Fluoroquinolones increase risk of tendonitis and rupture, especially in elderly.',
				recommendation: 'Discontinue at first sign of tendon pain or inflammation.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Warfarin 5 mg Tablet',
				severity: 'major',
				effect: 'May enhance anticoagulant effect leading to bleeding.',
				recommendation: 'Monitor INR closely during therapy.'
			}
		]
	},
	{
		drugName: 'Sertraline 100 mg Tablet',
		rxcui: '312944',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'warning',
				title: 'Risk of serotonin syndrome',
				description: 'Serotonergic agents taken together can precipitate serotonin syndrome.',
				recommendation: 'Monitor for agitation, tachycardia, and hyperreflexia when combined with other serotonergic drugs.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Amphetamine/Dextroamphetamine 20 mg Tablet',
				severity: 'moderate',
				effect: 'Increased risk of serotonin syndrome.',
				recommendation: 'Use lowest effective doses and monitor closely.'
			}
		]
	},
	{
		drugName: 'Omeprazole 40 mg Capsule',
		rxcui: '198211',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'info',
				title: 'Risk of nutrient malabsorption',
				description: 'Long-term PPI therapy can cause vitamin B12 and magnesium deficiency.',
				recommendation: 'Consider periodic monitoring for patients on long-term therapy.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Levothyroxine 75 mcg Tablet',
				severity: 'minor',
				effect: 'Reduced absorption of levothyroxine if taken together.',
				recommendation: 'Separate administration by at least 4 hours.'
			}
		]
	},
	{
		drugName: 'Amlodipine 10 mg Tablet',
		rxcui: '308135',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'info',
				title: 'Risk of peripheral edema',
				description: 'Calcium channel blockers commonly cause dose-related edema.',
				recommendation: 'Monitor for swelling and consider adding ACE inhibitor if edema develops.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: [
			{
				interactingDrug: 'Metoprolol 50 mg Tablet',
				severity: 'minor',
				effect: 'Additive hypotensive effects.',
				recommendation: 'Monitor blood pressure and adjust doses as needed.'
			}
		]
	},
	{
		drugName: 'Montelukast 10 mg Tablet',
		rxcui: '200224',
		alerts: [
			{
				type: 'black-box-warning',
				severity: 'warning',
				title: 'Neuropsychiatric events',
				description: 'Serious behavior and mood changes have been reported.',
				recommendation: 'Counsel patients to report agitation, depression, or suicidal thoughts.',
				source: 'FDA'
			}
		],
		interactions: []
	},
	{
		drugName: 'Fluticasone 110 mcg/actuation Inhaler',
		rxcui: '1991476',
		alerts: [
			{
				type: 'monitoring-required',
				severity: 'info',
				title: 'Rinse mouth after use',
				description: 'Inhaled corticosteroids can cause oral candidiasis.',
				recommendation: 'Advise patients to rinse and spit after each use.',
				source: 'Clinical Guidelines'
			}
		],
		interactions: []
	},
	{
		drugName: 'Hydrocodone/Acetaminophen 5-325 mg Tablet',
		rxcui: '857004',
		alerts: [
			{
				type: 'black-box-warning',
				severity: 'critical',
				title: 'Addiction, abuse, and misuse risk',
				description: 'Combination opioid products carry high risk of misuse.',
				recommendation: 'Limit quantity dispensed and review PDMP before refills.',
				source: 'FDA'
			}
		],
		interactions: [
			{
				interactingDrug: 'Diazepam 5 mg Tablet',
				severity: 'major',
				effect: 'Enhanced respiratory depression.',
				recommendation: 'Avoid combination if possible; monitor closely for sedation.'
			}
		]
	}
];

const buildGenericSubstitutions = (inventory: InventoryItem[]): GenericSubstitutionEntry[] => {
	const inventoryByDrug = new Map<string, InventoryItem[]>(
		inventory.reduce((acc, item) => {
			const list = acc.get(item.drugName) ?? [];
			list.push(item);
			acc.set(item.drugName, list);
			return acc;
		}, new Map<string, InventoryItem[]>())
	);

	const getOptions = (drugName: string) => {
		const items = inventoryByDrug.get(drugName) ?? [];
		return items.slice(0, 3).map((item) => {
			let availability: 'in-stock' | 'special-order' | 'unavailable' = 'in-stock';
			switch (item.status) {
				case 'out-of-stock':
					availability = 'special-order';
					break;
				case 'discontinued':
					availability = 'unavailable';
					break;
			}
			return {
				manufacturer: item.manufacturer,
				ndc: item.ndc,
				price: Number(item.wholesalePrice.toFixed(2)),
				availability
			};
		});
	};

	return [
		{
			brandName: 'Lipitor',
			genericName: 'Atorvastatin',
			rxcui: '861007',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 180,
			averageCostGeneric: 18,
			potentialSavings: 162,
			manufacturerOptions: getOptions('Atorvastatin 40 mg Tablet')
		},
		{
			brandName: 'Zocor',
			genericName: 'Simvastatin',
			rxcui: '1984404',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 140,
			averageCostGeneric: 16,
			potentialSavings: 124,
			manufacturerOptions: getOptions('Simvastatin 40 mg Tablet')
		},
		{
			brandName: 'Norvasc',
			genericName: 'Amlodipine',
			rxcui: '308135',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 120,
			averageCostGeneric: 15,
			potentialSavings: 105,
			manufacturerOptions: getOptions('Amlodipine 10 mg Tablet')
		},
		{
			brandName: 'Synthroid',
			genericName: 'Levothyroxine',
			rxcui: '966164',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 95,
			averageCostGeneric: 12,
			potentialSavings: 83,
			manufacturerOptions: getOptions('Levothyroxine 100 mcg Tablet')
		},
		{
			brandName: 'Zoloft',
			genericName: 'Sertraline',
			rxcui: '312944',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 110,
			averageCostGeneric: 14,
			potentialSavings: 96,
			manufacturerOptions: getOptions('Sertraline 100 mg Tablet')
		},
		{
			brandName: 'Lexapro',
			genericName: 'Escitalopram',
			rxcui: '352263',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 125,
			averageCostGeneric: 16,
			potentialSavings: 109,
			manufacturerOptions: getOptions('Escitalopram 20 mg Tablet')
		},
		{
			brandName: 'Prozac',
			genericName: 'Fluoxetine',
			rxcui: '313989',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 160,
			averageCostGeneric: 18,
			potentialSavings: 142,
			manufacturerOptions: getOptions('Fluoxetine 20 mg Capsule')
		},
		{
			brandName: 'Glucophage',
			genericName: 'Metformin',
			rxcui: '861008',
			therapeuticEquivalent: true,
			abRating: 'AB',
			averageCostBrand: 90,
			averageCostGeneric: 10,
			potentialSavings: 80,
			manufacturerOptions: getOptions('Metformin 500 mg Tablet')
		}
	];
};

const buildInsurancePlans = (): InsuranceFormularyPlan[] => {
	const getRxcui = (drugName: string) => {
		const drug = DRUG_BY_NAME.get(drugName);
		return drug?.rxcui ?? '0000000';
	};

	return [
		{
			insuranceProvider: 'PharmaMax Commercial PPO',
			planName: 'PharmaMax Preferred PPO',
			planType: 'Commercial PPO',
			formulary: [
				{
					drugName: 'Atorvastatin 40 mg Tablet',
					rxcui: getRxcui('Atorvastatin 40 mg Tablet'),
					tier: 1,
					copay: 10,
					priorAuthRequired: false,
					quantityLimits: { quantity: 90, days: 90 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: []
				},
				{
					drugName: 'Apixaban 5 mg Tablet',
					rxcui: getRxcui('Apixaban 5 mg Tablet'),
					tier: 3,
					copay: 145,
					priorAuthRequired: true,
					quantityLimits: { quantity: 60, days: 30 },
					stepTherapyRequired: true,
					stepTherapyAlternatives: ['Warfarin 5 mg Tablet'],
					covered: true,
					restrictions: ['Annual prior authorization renewal']
				},
				{
					drugName: 'Buprenorphine/Naloxone 8-2 mg Film',
					rxcui: getRxcui('Buprenorphine/Naloxone 8-2 mg Film'),
					tier: 2,
					copay: 45,
					priorAuthRequired: true,
					quantityLimits: { quantity: 30, days: 30 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: ['Requires counseling documentation each quarter']
				},
				{
					drugName: 'Isotretinoin 40 mg Capsule',
					rxcui: getRxcui('Isotretinoin 40 mg Capsule'),
					tier: 4,
					copay: 220,
					priorAuthRequired: true,
					quantityLimits: { quantity: 30, days: 30 },
					stepTherapyRequired: true,
					stepTherapyAlternatives: ['Doxycycline 100 mg Capsule'],
					covered: true,
					restrictions: ['iPLEDGE documentation required each fill']
				}
			]
		},
		{
			insuranceProvider: 'Golden State Medicare Advantage',
			planName: 'Golden State Medicare Complete',
			planType: 'Medicare Part D',
			formulary: [
				{
					drugName: 'Lisinopril 20 mg Tablet',
					rxcui: getRxcui('Lisinopril 20 mg Tablet'),
					tier: 1,
					copay: 8,
					priorAuthRequired: false,
					quantityLimits: { quantity: 90, days: 90 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: []
				},
				{
					drugName: 'Metformin 1000 mg Tablet',
					rxcui: getRxcui('Metformin 1000 mg Tablet'),
					tier: 1,
					copay: 6,
					priorAuthRequired: false,
					quantityLimits: { quantity: 180, days: 90 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: ['Requires annual A1c documentation']
				},
				{
					drugName: 'Gabapentin 300 mg Capsule',
					rxcui: getRxcui('Gabapentin 300 mg Capsule'),
					tier: 2,
					copay: 25,
					priorAuthRequired: false,
					quantityLimits: { quantity: 270, days: 90 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: []
				}
			]
		},
		{
			insuranceProvider: 'CommunityCare Medicaid',
			planName: 'CommunityCare Essential',
			planType: 'Medicaid Managed Care',
			formulary: [
				{
					drugName: 'Amphetamine/Dextroamphetamine 20 mg Tablet',
					rxcui: getRxcui('Amphetamine/Dextroamphetamine 20 mg Tablet'),
					tier: 3,
					copay: 5,
					priorAuthRequired: true,
					quantityLimits: { quantity: 60, days: 30 },
					stepTherapyRequired: true,
					stepTherapyAlternatives: ['Methylphenidate ER 18 mg Tablet'],
					covered: true,
					restrictions: ['Requires updated ADHD assessment yearly']
				},
				{
					drugName: 'Naloxone 4 mg/0.1 mL Spray',
					rxcui: getRxcui('Naloxone 4 mg/0.1 mL Spray'),
					tier: 1,
					copay: 0,
					priorAuthRequired: false,
					quantityLimits: { quantity: 2, days: 30 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: ['Mandatory counseling at first fill']
				}
			]
		},
		{
			insuranceProvider: 'Sunrise HMO',
			planName: 'Sunrise Choice HMO',
			planType: 'Commercial HMO',
			formulary: [
				{
					drugName: 'Montelukast 10 mg Tablet',
					rxcui: getRxcui('Montelukast 10 mg Tablet'),
					tier: 1,
					copay: 12,
					priorAuthRequired: false,
					quantityLimits: { quantity: 30, days: 30 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: []
				},
				{
					drugName: 'Fluticasone 110 mcg/actuation Inhaler',
					rxcui: getRxcui('Fluticasone 110 mcg/actuation Inhaler'),
					tier: 2,
					copay: 35,
					priorAuthRequired: false,
					quantityLimits: { quantity: 120, days: 30 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: []
				}
			]
		},
		{
			insuranceProvider: 'MetroPlus Commercial HMO',
			planName: 'MetroPlus Advantage',
			planType: 'Commercial HMO',
			formulary: [
				{
					drugName: 'Buprenorphine/Naloxone 12-3 mg Film',
					rxcui: getRxcui('Buprenorphine/Naloxone 12-3 mg Film'),
					tier: 2,
					copay: 40,
					priorAuthRequired: true,
					quantityLimits: { quantity: 30, days: 30 },
					stepTherapyRequired: false,
					stepTherapyAlternatives: [],
					covered: true,
					restrictions: ['Monthly urine toxicology required']
				},
				{
					drugName: 'Oxycodone 5 mg Tablet',
					rxcui: getRxcui('Oxycodone 5 mg Tablet'),
					tier: 3,
					copay: 60,
					priorAuthRequired: true,
					quantityLimits: { quantity: 30, days: 7 },
					stepTherapyRequired: true,
					stepTherapyAlternatives: ['Hydrocodone/Acetaminophen 5-325 mg Tablet'],
					covered: true,
					restrictions: ['Requires pain management agreement']
				}
			]
		}
	];
};

const buildBatchJobs = (prescriptions: PrescriptionHistoryEntry[], patientsById: Map<string, PatientProfile>): BatchJob[] => {
	const batches: BatchJob[] = [];
	const pharmacists = PHARMACY_STAFF_SEEDS.filter((staff) => staff.role === 'pharmacist');

	const sorted = [...prescriptions].sort((a, b) => a.timestamp - b.timestamp);

	for (let i = 0; i < sorted.length; i += 8) {
		const slice = sorted.slice(i, i + 8);
		if (slice.length === 0) break;
		const pharmacist = pharmacists[i % pharmacists.length];
		const completedCount = slice.filter((rx) => rx.status === 'filled').length;
		const errorCount = slice.filter((rx) => rx.status === 'pending' || rx.status === 'cancelled').length;
		const status: BatchJob['status'] = errorCount > 0 && completedCount < slice.length ? 'errors' : 'completed';

		batches.push({
			batchId: `BATCH-${pad(i / 8 + 1, 4)}`,
			timestamp: slice[0].timestamp - 1800000,
			prescriptions: slice.map((rx) => ({
				patientName: patientsById.get(rx.patientId)?.name ?? 'Unknown Patient',
				drugName: rx.result.prescription.drugName,
				sig: rx.result.prescription.sig,
				daysSupply: rx.result.prescription.daysSupply,
				priority: rx.status === 'pending' ? 'urgent' : 'routine'
			})),
			status,
			totalCount: slice.length,
			completedCount,
			errorCount,
			processingTime: 900 + (slice.length * 45),
			pharmacist: pharmacist.name
		});
	}

	return batches;
};

const buildAuditLogs = (prescriptions: PrescriptionHistoryEntry[], partialFills: PartialFillHistoryEntry[]): AuditLogEntry[] => {
	const users = PHARMACY_STAFF_SEEDS.map((staff) => ({
		id: staff.employeeId,
		name: staff.name,
		role: staff.role
	}));

	const actions = ['login', 'update-prescription', 'override-alert', 'verify-controlled', 'print-label', 'submit-pmp'];
	const resources = ['auth', 'prescription', 'inventory', 'pmp', 'batch-job'];

	const logs: AuditLogEntry[] = [];

	const totalLogs = 80;
	for (let i = 0; i < totalLogs; i += 1) {
		const user = users[i % users.length];
		const action = actions[i % actions.length];
		const resource = resources[i % resources.length];
		const timestamp = REFERENCE_DATE.getTime() - i * 3600000;
		const success = action !== 'override-alert' || i % 5 !== 0;

		const changes = (() => {
			if (action === 'update-prescription') {
				const rx = prescriptions[i % prescriptions.length];
				return {
					prescriptionId: rx.id,
					field: 'status',
					value: success ? rx.status : 'pending'
				};
			}
			if (action === 'verify-controlled') {
				const partial = partialFills[i % Math.max(partialFills.length, 1)];
				return partial
					? { originalPrescriptionId: partial.originalPrescriptionId, verification: 'completed' }
					: {};
			}
			return {};
		})();

		logs.push({
			id: `AUD-${pad(i + 1, 6)}`,
			timestamp,
			userId: user.id,
			action,
			resource,
			changes,
			ipAddress: `192.168.1.${(i % 120) + 10}`,
			success,
			errorMessage: success ? undefined : 'Override denied by supervising pharmacist.'
		});
	}

	return logs;
};

const writeDataFile = <T>(fileName: string, exportName: string, typeName: string, data: T) => {
	const json = JSON.stringify(data, null, 2);
	const content = `import type { ${typeName} } from './syntheticTypes';\n\nexport const ${exportName}: ${typeName}[] = ${json} as const;\n`;
	writeFileSync(join(DATA_DIR, fileName), content);
};

const main = () => {
	ensureDataDir();

	const { patients } = buildPatients();
	const patientsById = new Map(patients.map((patient) => [patient.id, patient] as const));

	const inventory = buildInventory();
	const { prescriptions, partialFills, barcodeHistory, controlledSeeds } = buildPrescriptions(patients, inventory);
	const controlledLogs = buildControlledLogs(controlledSeeds, patients, prescriptions);
	const drugSafety = buildDrugSafety();
	const genericSubstitutions = buildGenericSubstitutions(inventory);
	const insurancePlans = buildInsurancePlans();
	const batchJobs = buildBatchJobs(prescriptions, patientsById);
	const auditLogs = buildAuditLogs(prescriptions, partialFills);

	writeDataFile('syntheticPatients.ts', 'SYNTHETIC_PATIENTS', 'PatientProfile', patients);
	writeDataFile('syntheticInventory.ts', 'SYNTHETIC_INVENTORY', 'InventoryItem', inventory);
	writeDataFile('syntheticPrescriptions.ts', 'SYNTHETIC_PRESCRIPTIONS', 'PrescriptionHistoryEntry', prescriptions);
	writeDataFile('syntheticPartialFills.ts', 'SYNTHETIC_PARTIAL_FILLS', 'PartialFillHistoryEntry', partialFills);
	writeDataFile('syntheticBarcodeHistory.ts', 'SYNTHETIC_BARCODE_HISTORY', 'BarcodeScanEntry', barcodeHistory);
	writeDataFile('syntheticControlledSubstances.ts', 'SYNTHETIC_CONTROLLED_LOGS', 'ControlledSubstanceLogEntry', controlledLogs);
	writeDataFile('syntheticDrugSafety.ts', 'SYNTHETIC_DRUG_SAFETY', 'DrugSafetyRecord', drugSafety);
	writeDataFile('syntheticGenericSubstitutions.ts', 'SYNTHETIC_GENERIC_SUBSTITUTIONS', 'GenericSubstitutionEntry', genericSubstitutions);
	writeDataFile('syntheticInsurancePlans.ts', 'SYNTHETIC_INSURANCE_PLANS', 'InsuranceFormularyPlan', insurancePlans);
	writeDataFile('syntheticBatchJobs.ts', 'SYNTHETIC_BATCH_JOBS', 'BatchJob', batchJobs);
	writeDataFile('syntheticAuditLogs.ts', 'SYNTHETIC_AUDIT_LOGS', 'AuditLogEntry', auditLogs);
	writeDataFile('syntheticPrescribers.ts', 'SYNTHETIC_PRESCRIBERS', 'PrescriberProfile', PRESCRIBER_SEEDS);
	writeDataFile('syntheticPharmacyStaff.ts', 'SYNTHETIC_PHARMACY_STAFF', 'PharmacyStaffMember', PHARMACY_STAFF_SEEDS);
};

main();
