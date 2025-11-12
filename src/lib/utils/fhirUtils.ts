/**
 * FHIR R4 Utilities for Healthcare Integration
 * Builds FHIR-compliant resources for EHR system integration
 */

export interface FHIRMedicationRequest {
	resourceType: 'MedicationRequest';
	id?: string;
	status: 'active' | 'completed' | 'draft' | 'cancelled';
	intent: 'order' | 'proposal';
	medicationCodeableConcept: {
		coding: Array<{
			system: string;
			code: string;
			display: string;
		}>;
		text: string;
	};
	subject: {
		reference?: string;
		display: string;
	};
	authoredOn: string;
	dosageInstruction: Array<{
		text: string;
		timing?: {
			repeat?: {
				frequency?: number;
				period?: number;
				periodUnit?: string;
			};
		};
		doseAndRate?: Array<{
			doseQuantity?: {
				value: number;
				unit: string;
			};
		}>;
	}>;
	dispenseRequest: {
		numberOfRepeatsAllowed?: number;
		quantity: {
			value: number;
			unit: string;
		};
		expectedSupplyDuration?: {
			value: number;
			unit: string;
		};
	};
}

export interface FHIRMedicationDispense {
	resourceType: 'MedicationDispense';
	id?: string;
	status: 'preparation' | 'in-progress' | 'completed' | 'cancelled';
	medicationCodeableConcept: {
		coding: Array<{
			system: string;
			code: string;
			display: string;
		}>;
		text: string;
	};
	subject: {
		reference?: string;
		display: string;
	};
	whenHandedOver?: string;
	quantity: {
		value: number;
		unit: string;
	};
	daysSupply?: {
		value: number;
		unit: string;
	};
}

/**
 * Build FHIR R4 MedicationRequest from prescription data
 */
export function buildFHIRMedicationRequest(prescription: {
	drugName: string;
	rxcui: string;
	sig: string;
	daysSupply: number;
	quantity: number;
	unit: string;
	refills?: number;
	patientName?: string;
	patientId?: string;
	isPartialFill?: boolean;
	partialQuantity?: number;
}): FHIRMedicationRequest {
	const {
		drugName,
		rxcui,
		sig,
		daysSupply,
		quantity,
		unit,
		refills = 0,
		patientName = 'Unknown Patient',
		patientId,
		isPartialFill,
		partialQuantity
	} = prescription;

	// Determine the actual quantity (partial or full)
	const dispenseQuantity = isPartialFill && partialQuantity ? partialQuantity : quantity;

	return {
		resourceType: 'MedicationRequest',
		status: 'active',
		intent: 'order',
		medicationCodeableConcept: {
			coding: [
				{
					system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
					code: rxcui,
					display: drugName
				}
			],
			text: drugName
		},
		subject: {
			reference: patientId ? `Patient/${patientId}` : undefined,
			display: patientName
		},
		authoredOn: new Date().toISOString(),
		dosageInstruction: [
			{
				text: sig
			}
		],
		dispenseRequest: {
			numberOfRepeatsAllowed: refills,
			quantity: {
				value: dispenseQuantity,
				unit: unit
			},
			expectedSupplyDuration: {
				value: daysSupply,
				unit: 'days'
			}
		}
	};
}

/**
 * Build FHIR R4 MedicationDispense from filled prescription
 */
export function buildFHIRMedicationDispense(prescription: {
	drugName: string;
	rxcui: string;
	quantityDispensed: number;
	unit: string;
	daysSupply: number;
	patientName?: string;
	patientId?: string;
	dispensedDate?: string;
}): FHIRMedicationDispense {
	const {
		drugName,
		rxcui,
		quantityDispensed,
		unit,
		daysSupply,
		patientName = 'Unknown Patient',
		patientId,
		dispensedDate
	} = prescription;

	return {
		resourceType: 'MedicationDispense',
		status: 'completed',
		medicationCodeableConcept: {
			coding: [
				{
					system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
					code: rxcui,
					display: drugName
				}
			],
			text: drugName
		},
		subject: {
			reference: patientId ? `Patient/${patientId}` : undefined,
			display: patientName
		},
		whenHandedOver: dispensedDate || new Date().toISOString(),
		quantity: {
			value: quantityDispensed,
			unit: unit
		},
		daysSupply: {
			value: daysSupply,
			unit: 'days'
		}
	};
}

/**
 * Export FHIR resource as JSON file
 */
export function exportFHIRResource(resource: FHIRMedicationRequest | FHIRMedicationDispense, filename?: string): void {
	const jsonContent = JSON.stringify(resource, null, 2);
	const defaultFilename = `${resource.resourceType}-${Date.now()}.json`;

	const blob = new Blob([jsonContent], { type: 'application/fhir+json' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename || defaultFilename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

/**
 * Validate basic FHIR resource structure
 */
export function validateFHIRResource(resource: any): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	if (!resource.resourceType) {
		errors.push('Missing required field: resourceType');
	}

	if (resource.resourceType === 'MedicationRequest') {
		if (!resource.status) errors.push('Missing required field: status');
		if (!resource.intent) errors.push('Missing required field: intent');
		if (!resource.medicationCodeableConcept) errors.push('Missing required field: medicationCodeableConcept');
		if (!resource.subject) errors.push('Missing required field: subject');
	}

	if (resource.resourceType === 'MedicationDispense') {
		if (!resource.status) errors.push('Missing required field: status');
		if (!resource.medicationCodeableConcept) errors.push('Missing required field: medicationCodeableConcept');
		if (!resource.subject) errors.push('Missing required field: subject');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}

/**
 * Create FHIR Bundle with multiple resources
 */
export function createFHIRBundle(resources: Array<FHIRMedicationRequest | FHIRMedicationDispense>): {
	resourceType: 'Bundle';
	type: 'collection';
	entry: Array<{ resource: FHIRMedicationRequest | FHIRMedicationDispense }>;
} {
	return {
		resourceType: 'Bundle',
		type: 'collection',
		entry: resources.map((resource) => ({ resource }))
	};
}
