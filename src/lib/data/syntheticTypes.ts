export type Gender = 'male' | 'female' | 'non-binary';

export type AllergySeverity = 'mild' | 'moderate' | 'severe';

export interface InsuranceDetails {
	provider: string;
	memberId: string;
	groupNumber: string;
	planType: string;
}

export interface PatientAllergy {
	allergen: string;
	reaction: string;
	severity: AllergySeverity;
	dateReported: string;
}

export interface PatientMedication {
	drugName: string;
	sig: string;
	prescriber: string;
	startDate: string;
	refillsRemaining: number;
}

export interface PatientProfile {
	id: string;
	name: string;
	dateOfBirth: string;
	age: number;
	gender: Gender;
	phone: string;
	email: string;
	address: string;
	insurance: InsuranceDetails;
	allergies: PatientAllergy[];
	conditions: string[];
	currentMedications: PatientMedication[];
	notes?: string;
}

export interface PrescriptionCalculation {
	totalQuantityNeeded: number;
	unit: string;
	perDose: number;
	frequency: number;
	dailyAmount: number;
}

export interface PrescriptionPackageOption {
	ndc: string;
	packageDescription: string;
	packageSize: number;
	packagesNeeded: number;
	totalQuantity: number;
	costPerPackage: number;
}

export type PrescriptionRecommendationType =
	| 'optimal'
	| 'substitution'
	| 'warning'
	| 'not-covered'
	| 'manual-review'
	| 'insurance'
	| 'inventory'
	| 'allergy';

export interface PrescriptionRecommendation {
	type: PrescriptionRecommendationType;
	message: string;
	notes?: string;
}

export interface PrescriptionResult {
	prescription: {
		drugName: string;
		rxcui: string;
		sig: string;
		daysSupply: number;
	};
	calculation: PrescriptionCalculation;
	packages: PrescriptionPackageOption[];
	recommendation: PrescriptionRecommendation;
}

export type PrescriptionStatus = 'filled' | 'partial-fill' | 'pending' | 'cancelled';

export interface PrescriptionHistoryEntry {
	id: string;
	timestamp: number;
	patientId: string;
	drugInput: string;
	sig: string;
	daysSupply: number;
	refills: number;
	prescriber: string;
	prescribedDate: string;
	isFavorite: boolean;
	result: PrescriptionResult;
	status: PrescriptionStatus;
	fillDate?: string;
	pharmacist: string;
	notes?: string;
}

export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';

export interface InventoryItem {
	ndc: string;
	drugName: string;
	strength: string;
	dosageForm: string;
	manufacturer: string;
	packageSize: string;
	currentStock: number;
	reorderPoint: number;
	reorderQuantity: number;
	costPerPackage: number;
	wholesalePrice: number;
	lastOrderDate: string;
	expirationDate: string;
	lotNumber: string;
	location: string;
	isControlled: boolean;
	deaSchedule?: 'C-II' | 'C-III' | 'C-IV' | 'C-V';
	usage30days: number;
	status: InventoryStatus;
	refrigerated?: boolean;
}

export interface ControlledSubstancePrescriber {
	name: string;
	deaNumber: string;
	npi: string;
}

export interface ControlledSubstanceLogEntry {
	id: string;
	timestamp: number;
	patientId: string;
	prescriptionId: string;
	drugName: string;
	deaSchedule: 'C-II' | 'C-III' | 'C-IV' | 'C-V';
	ndc: string;
	quantity: number;
	prescriber: ControlledSubstancePrescriber;
	dispensedBy: string;
	verifiedBy: string;
	notes: string;
	pmpReported: boolean;
	reportedDate?: string;
	flags?: string[];
}

export type DrugSafetyAlertType =
	| 'black-box-warning'
	| 'pregnancy-warning'
	| 'renal-adjustment'
	| 'hepatic-adjustment'
	| 'age-restriction'
	| 'monitoring-required';

export type DrugSafetySeverity = 'critical' | 'warning' | 'info';

export interface DrugSafetyAlert {
	type: DrugSafetyAlertType;
	severity: DrugSafetySeverity;
	title: string;
	description: string;
	recommendation: string;
	source: string;
}

export type DrugInteractionSeverity = 'major' | 'moderate' | 'minor';

export interface DrugInteraction {
	interactingDrug: string;
	severity: DrugInteractionSeverity;
	effect: string;
	recommendation: string;
}

export interface DrugSafetyRecord {
	drugName: string;
	rxcui: string;
	alerts: DrugSafetyAlert[];
	interactions: DrugInteraction[];
}

export interface ManufacturerOption {
	manufacturer: string;
	ndc: string;
	price: number;
	availability: 'in-stock' | 'special-order' | 'unavailable';
}

export interface GenericSubstitutionEntry {
	brandName: string;
	genericName: string;
	rxcui: string;
	therapeuticEquivalent: boolean;
	abRating: string;
	averageCostBrand: number;
	averageCostGeneric: number;
	potentialSavings: number;
	manufacturerOptions: ManufacturerOption[];
}

export interface QuantityLimit {
	quantity: number;
	days: number;
}

export interface FormularyEntry {
	drugName: string;
	rxcui: string;
	tier: 1 | 2 | 3 | 4 | 5;
	copay: number;
	priorAuthRequired: boolean;
	quantityLimits?: QuantityLimit;
	stepTherapyRequired: boolean;
	stepTherapyAlternatives: string[];
	covered: boolean;
	restrictions: string[];
	notes?: string;
}

export interface InsuranceFormularyPlan {
	insuranceProvider: string;
	planName: string;
	planType: string;
	formulary: FormularyEntry[];
}

export type BatchStatus = 'pending' | 'processing' | 'completed' | 'errors';
export type BatchPriority = 'routine' | 'urgent' | 'stat';

export interface BatchPrescriptionItem {
	patientName: string;
	drugName: string;
	sig: string;
	daysSupply: number;
	priority: BatchPriority;
}

export interface BatchJob {
	batchId: string;
	timestamp: number;
	prescriptions: BatchPrescriptionItem[];
	status: BatchStatus;
	totalCount: number;
	completedCount: number;
	errorCount: number;
	processingTime: number;
	pharmacist: string;
}

export type BarcodeType = 'NDC' | 'UPC' | 'GS1';
export type BarcodeVerification = 'match' | 'mismatch' | 'warning';

export interface BarcodeScanEntry {
	id: string;
	timestamp: number;
	barcodeType: BarcodeType;
	barcodeData: string;
	ndc: string;
	drugName: string;
	scannedBy: string;
	verificationStatus: BarcodeVerification;
	linkedPrescriptionId?: string;
	notes?: string;
}

export type PartialFillReason = 'shortage' | 'patient-request' | 'controlled-substance';

export interface PartialFillDetail {
	fillId: string;
	fillDate: string;
	quantityDispensed: number;
	remainingQuantity: number;
	pharmacist: string;
	reason: PartialFillReason;
	mustCompleteBefore?: string;
}

export interface PartialFillHistoryEntry {
	originalPrescriptionId: string;
	patientId: string;
	drugName: string;
	totalQuantityPrescribed: number;
	fills: PartialFillDetail[];
}

export interface PrescriberProfile {
	npi: string;
	name: string;
	specialty: string;
	deaNumber?: string;
	phone: string;
	fax: string;
	address: string;
	practiceName: string;
	preferredContactMethod: 'phone' | 'fax' | 'electronic';
	electronicallyPrescribes: boolean;
}

export type StaffRole = 'pharmacist' | 'pharmacy-technician' | 'pharmacy-intern';

export interface StaffShift {
	day: string;
	startTime: string;
	endTime: string;
}

export interface PharmacyStaffMember {
	employeeId: string;
	name: string;
	role: StaffRole;
	licenseNumber: string;
	licenseState: string;
	licenseExpiration: string;
	canVerifyControlled: boolean;
	shifts: StaffShift[];
}

export interface AuditLogEntry {
	id: string;
	timestamp: number;
	userId: string;
	action: string;
	resource: string;
	changes: Record<string, unknown>;
	ipAddress: string;
	success: boolean;
	errorMessage?: string;
}

export interface DrugPackageConfig {
	ndc: string;
	packageSize: number;
	packageLabel: string;
	manufacturer: string;
	costPerPackage: number;
	wholesalePrice: number;
	location: string;
	lotNumber: string;
	expirationDate: string;
	refrigerated?: boolean;
	isControlled?: boolean;
	deaSchedule?: 'C-II' | 'C-III' | 'C-IV' | 'C-V';
}

export interface DrugCatalogEntry {
	drugName: string;
	genericName: string;
	rxcui: string;
	strength: string;
	dosageForm: string;
	unit: string;
	defaultSig: string;
	route: string;
	perDose: number;
	frequency: number;
	defaultDaysSupply: number;
	conditions: string[];
	packageConfigs: DrugPackageConfig[];
	isControlled: boolean;
	allergyClasses?: string[];
	notes?: string;
	deaSchedule?: 'C-II' | 'C-III' | 'C-IV' | 'C-V';
}
