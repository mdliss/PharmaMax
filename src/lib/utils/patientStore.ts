/**
 * Patient Profile Store
 * Manages patient information including allergies, insurance, and medication history
 */

export interface PatientProfile {
	id: string;
	name: string;
	dateOfBirth: string;
	allergies: string[];
	insuranceProvider?: string;
	insurancePolicyNumber?: string;
	insuranceGroupNumber?: string;
	medicationHistory: MedicationHistoryEntry[];
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export interface MedicationHistoryEntry {
	id: string;
	drugName: string;
	rxcui?: string;
	sig: string;
	daysSupply: number;
	quantity: number;
	prescribedDate: string;
	filledDate?: string;
	prescriber?: string;
	refillsRemaining?: number;
	lastRefillDate?: string;
	// Partial fill support
	isPartialFill?: boolean;
	partialFillNumber?: number; // Which partial fill this is (1, 2, 3, etc.)
	totalQuantityPrescribed?: number; // Original total quantity prescribed
	quantityDispensed?: number; // Quantity dispensed in this fill
	quantityRemaining?: number; // Remaining quantity to be filled
	parentPrescriptionId?: string; // Links partial fills together
	partialFillHistory?: PartialFillRecord[];
}

export interface PartialFillRecord {
	fillNumber: number;
	fillDate: string;
	quantityDispensed: number;
	quantityRemaining: number;
	pharmacist?: string;
	notes?: string;
}

export interface AllergyCheck {
	hasAllergies: boolean;
	allergyWarnings: string[];
	drugName: string;
}

class PatientStoreManager {
	private readonly STORAGE_KEY = 'pharmamax_patients';

	/**
	 * Get all patient profiles
	 */
	getAll(): PatientProfile[] {
		if (typeof window === 'undefined') return [];
		try {
			const data = localStorage.getItem(this.STORAGE_KEY);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error('Error loading patients:', error);
			return [];
		}
	}

	/**
	 * Get a patient by ID
	 */
	getById(id: string): PatientProfile | null {
		const patients = this.getAll();
		return patients.find((p) => p.id === id) || null;
	}

	/**
	 * Search patients by name
	 */
	searchByName(query: string): PatientProfile[] {
		const patients = this.getAll();
		const lowerQuery = query.toLowerCase();
		return patients.filter((p) => p.name.toLowerCase().includes(lowerQuery));
	}

	/**
	 * Create a new patient profile
	 */
	create(patient: Omit<PatientProfile, 'id' | 'createdAt' | 'updatedAt'>): PatientProfile {
		const patients = this.getAll();
		const now = new Date().toISOString();

		const newPatient: PatientProfile = {
			...patient,
			id: this.generateId(),
			createdAt: now,
			updatedAt: now
		};

		patients.push(newPatient);
		this.save(patients);
		return newPatient;
	}

	/**
	 * Update an existing patient profile
	 */
	update(id: string, updates: Partial<PatientProfile>): PatientProfile | null {
		const patients = this.getAll();
		const index = patients.findIndex((p) => p.id === id);

		if (index === -1) return null;

		const updatedPatient: PatientProfile = {
			...patients[index],
			...updates,
			id: patients[index].id, // Prevent ID change
			createdAt: patients[index].createdAt, // Preserve creation date
			updatedAt: new Date().toISOString()
		};

		patients[index] = updatedPatient;
		this.save(patients);
		return updatedPatient;
	}

	/**
	 * Delete a patient profile
	 */
	delete(id: string): boolean {
		const patients = this.getAll();
		const filtered = patients.filter((p) => p.id !== id);

		if (filtered.length === patients.length) return false;

		this.save(filtered);
		return true;
	}

	/**
	 * Add medication to patient's history
	 */
	addMedication(patientId: string, medication: Omit<MedicationHistoryEntry, 'id'>): boolean {
		const patient = this.getById(patientId);
		if (!patient) return false;

		const newMedication: MedicationHistoryEntry = {
			...medication,
			id: this.generateId()
		};

		patient.medicationHistory.push(newMedication);
		this.update(patientId, patient);
		return true;
	}

	/**
	 * Check if a drug triggers any patient allergies
	 */
	checkAllergies(patientId: string, drugName: string): AllergyCheck {
		const patient = this.getById(patientId);

		if (!patient || patient.allergies.length === 0) {
			return {
				hasAllergies: false,
				allergyWarnings: [],
				drugName
			};
		}

		const allergyWarnings: string[] = [];
		const lowerDrugName = drugName.toLowerCase();

		// Check for exact matches and partial matches
		for (const allergy of patient.allergies) {
			const lowerAllergy = allergy.toLowerCase();

			// Exact match
			if (lowerDrugName.includes(lowerAllergy) || lowerAllergy.includes(lowerDrugName)) {
				allergyWarnings.push(`ALLERGY ALERT: Patient is allergic to ${allergy}`);
			}

			// Check for common drug class allergies
			if (this.isDrugClassMatch(lowerDrugName, lowerAllergy)) {
				allergyWarnings.push(
					`POTENTIAL ALLERGY: Patient is allergic to ${allergy}, which may be related to ${drugName}`
				);
			}
		}

		return {
			hasAllergies: allergyWarnings.length > 0,
			allergyWarnings,
			drugName
		};
	}

	/**
	 * Get patient's medication history
	 */
	getMedicationHistory(patientId: string): MedicationHistoryEntry[] {
		const patient = this.getById(patientId);
		return patient?.medicationHistory || [];
	}

	/**
	 * Update a medication in patient's history
	 */
	updateMedication(
		patientId: string,
		medicationId: string,
		updates: Partial<MedicationHistoryEntry>
	): boolean {
		const patient = this.getById(patientId);
		if (!patient) return false;

		const medIndex = patient.medicationHistory.findIndex((m) => m.id === medicationId);
		if (medIndex === -1) return false;

		patient.medicationHistory[medIndex] = {
			...patient.medicationHistory[medIndex],
			...updates,
			id: medicationId // Preserve ID
		};

		this.update(patientId, patient);
		return true;
	}

	/**
	 * Add a partial fill record to an existing prescription
	 */
	addPartialFill(
		patientId: string,
		prescriptionId: string,
		quantityDispensed: number,
		notes?: string
	): boolean {
		const patient = this.getById(patientId);
		if (!patient) return false;

		const prescription = patient.medicationHistory.find((m) => m.id === prescriptionId);
		if (!prescription) return false;

		// Initialize partial fill tracking if this is the first partial fill
		if (!prescription.partialFillHistory) {
			prescription.partialFillHistory = [];
			prescription.isPartialFill = true;
			prescription.totalQuantityPrescribed = prescription.quantity;
			prescription.quantityRemaining = prescription.quantity;
			prescription.parentPrescriptionId = prescriptionId;
		}

		// Calculate remaining quantity
		const newRemaining = (prescription.quantityRemaining || 0) - quantityDispensed;
		const fillNumber = prescription.partialFillHistory.length + 1;

		// Add the partial fill record
		const partialFill: PartialFillRecord = {
			fillNumber,
			fillDate: new Date().toISOString(),
			quantityDispensed,
			quantityRemaining: newRemaining,
			notes
		};

		prescription.partialFillHistory.push(partialFill);
		prescription.quantityRemaining = newRemaining;
		prescription.quantityDispensed = quantityDispensed;
		prescription.partialFillNumber = fillNumber;

		// Update the prescription
		this.updateMedication(patientId, prescriptionId, prescription);
		return true;
	}

	/**
	 * Get partial fill history for a prescription
	 */
	getPartialFillHistory(patientId: string, prescriptionId: string): PartialFillRecord[] {
		const patient = this.getById(patientId);
		if (!patient) return [];

		const prescription = patient.medicationHistory.find((m) => m.id === prescriptionId);
		return prescription?.partialFillHistory || [];
	}

	/**
	 * Calculate remaining quantity for a prescription
	 */
	calculateRemainingQuantity(prescriptionId: string, patientId: string): number {
		const patient = this.getById(patientId);
		if (!patient) return 0;

		const prescription = patient.medicationHistory.find((m) => m.id === prescriptionId);
		if (!prescription) return 0;

		return prescription.quantityRemaining || prescription.quantity;
	}

	/**
	 * Check for common drug class matches (simple heuristic)
	 */
	private isDrugClassMatch(drugName: string, allergy: string): boolean {
		const drugClasses: { [key: string]: string[] } = {
			penicillin: ['amoxicillin', 'ampicillin', 'penicillin', 'augmentin'],
			sulfa: ['sulfamethoxazole', 'sulfa', 'bactrim', 'septra'],
			cephalosporin: ['cephalexin', 'cefdinir', 'ceftriaxone', 'cefuroxime'],
			nsaid: ['ibuprofen', 'naproxen', 'aspirin', 'diclofenac', 'celecoxib']
		};

		for (const [classKey, drugs] of Object.entries(drugClasses)) {
			if (allergy.includes(classKey) && drugs.some((drug) => drugName.includes(drug))) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Save patients to localStorage
	 */
	private save(patients: PatientProfile[]): void {
		if (typeof window === 'undefined') return;
		try {
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(patients));
		} catch (error) {
			console.error('Error saving patients:', error);
		}
	}

	/**
	 * Generate a unique ID
	 */
	private generateId(): string {
		return `patient_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
	}

	/**
	 * Clear all patient data (for testing/reset)
	 */
	clear(): void {
		if (typeof window === 'undefined') return;
		localStorage.removeItem(this.STORAGE_KEY);
	}

	/**
	 * Export patient data as JSON
	 */
	export(): string {
		return JSON.stringify(this.getAll(), null, 2);
	}

	/**
	 * Import patient data from JSON
	 */
	import(jsonData: string): boolean {
		try {
			const patients = JSON.parse(jsonData) as PatientProfile[];
			// Validate structure
			if (!Array.isArray(patients)) return false;

			this.save(patients);
			return true;
		} catch (error) {
			console.error('Error importing patient data:', error);
			return false;
		}
	}
}

export const PatientStore = new PatientStoreManager();
