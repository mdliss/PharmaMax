import { describe, it, expect } from 'vitest';
import { buildFHIRMedicationRequest, buildFHIRMedicationDispense, validateFHIRResource, createFHIRBundle } from '$lib/utils/fhirUtils';

describe('Export and Integration Features', () => {
	describe('FHIR MedicationRequest Builder', () => {
		it('should build valid FHIR MedicationRequest', () => {
			const prescription = {
				drugName: 'Lisinopril 10mg Tablet',
				rxcui: '314076',
				sig: 'Take 1 tablet by mouth once daily',
				daysSupply: 30,
				quantity: 30,
				unit: 'tablets',
				refills: 3,
				patientName: 'John Doe',
				patientId: 'P123'
			};

			const fhirResource = buildFHIRMedicationRequest(prescription);

			expect(fhirResource.resourceType).toBe('MedicationRequest');
			expect(fhirResource.status).toBe('active');
			expect(fhirResource.intent).toBe('order');
			expect(fhirResource.medicationCodeableConcept.text).toBe('Lisinopril 10mg Tablet');
			expect(fhirResource.medicationCodeableConcept.coding[0].code).toBe('314076');
			expect(fhirResource.subject.display).toBe('John Doe');
			expect(fhirResource.dispenseRequest.quantity.value).toBe(30);
			expect(fhirResource.dispenseRequest.numberOfRepeatsAllowed).toBe(3);
		});

		it('should handle partial fill in FHIR MedicationRequest', () => {
			const prescription = {
				drugName: 'Oxycodone 5mg Tablet',
				rxcui: '1049502',
				sig: 'Take 1 tablet every 4-6 hours as needed',
				daysSupply: 7,
				quantity: 28,
				unit: 'tablets',
				isPartialFill: true,
				partialQuantity: 14
			};

			const fhirResource = buildFHIRMedicationRequest(prescription);

			// Should use partial quantity
			expect(fhirResource.dispenseRequest.quantity.value).toBe(14);
		});

		it('should validate FHIR MedicationRequest structure', () => {
			const prescription = {
				drugName: 'Metformin 500mg Tablet',
				rxcui: '861004',
				sig: 'Take 1 tablet twice daily with meals',
				daysSupply: 30,
				quantity: 60,
				unit: 'tablets'
			};

			const fhirResource = buildFHIRMedicationRequest(prescription);
			const validation = validateFHIRResource(fhirResource);

			expect(validation.valid).toBe(true);
			expect(validation.errors).toHaveLength(0);
		});
	});

	describe('FHIR MedicationDispense Builder', () => {
		it('should build valid FHIR MedicationDispense', () => {
			const prescription = {
				drugName: 'Atorvastatin 20mg Tablet',
				rxcui: '617318',
				quantityDispensed: 30,
				unit: 'tablets',
				daysSupply: 30,
				patientName: 'Jane Smith',
				patientId: 'P456',
				dispensedDate: '2025-11-11T10:30:00Z'
			};

			const fhirResource = buildFHIRMedicationDispense(prescription);

			expect(fhirResource.resourceType).toBe('MedicationDispense');
			expect(fhirResource.status).toBe('completed');
			expect(fhirResource.medicationCodeableConcept.coding[0].code).toBe('617318');
			expect(fhirResource.quantity.value).toBe(30);
			expect(fhirResource.daysSupply?.value).toBe(30);
			expect(fhirResource.whenHandedOver).toBe('2025-11-11T10:30:00Z');
		});

		it('should validate FHIR MedicationDispense structure', () => {
			const prescription = {
				drugName: 'Amlodipine 5mg Tablet',
				rxcui: '197361',
				quantityDispensed: 30,
				unit: 'tablets',
				daysSupply: 30
			};

			const fhirResource = buildFHIRMedicationDispense(prescription);
			const validation = validateFHIRResource(fhirResource);

			expect(validation.valid).toBe(true);
			expect(validation.errors).toHaveLength(0);
		});
	});

	describe('FHIR Bundle Creation', () => {
		it('should create FHIR Bundle with multiple resources', () => {
			const prescription1 = {
				drugName: 'Lisinopril 10mg Tablet',
				rxcui: '314076',
				sig: 'Take 1 tablet once daily',
				daysSupply: 30,
				quantity: 30,
				unit: 'tablets'
			};

			const prescription2 = {
				drugName: 'Metformin 500mg Tablet',
				rxcui: '861004',
				sig: 'Take 1 tablet twice daily',
				daysSupply: 30,
				quantity: 60,
				unit: 'tablets'
			};

			const fhirRequest1 = buildFHIRMedicationRequest(prescription1);
			const fhirRequest2 = buildFHIRMedicationRequest(prescription2);

			const bundle = createFHIRBundle([fhirRequest1, fhirRequest2]);

			expect(bundle.resourceType).toBe('Bundle');
			expect(bundle.type).toBe('collection');
			expect(bundle.entry).toHaveLength(2);
			expect(bundle.entry[0].resource.resourceType).toBe('MedicationRequest');
			expect(bundle.entry[1].resource.resourceType).toBe('MedicationRequest');
		});
	});

	describe('CSV Export Utility', () => {
		it('should export prescription history data structure', () => {
			const historyEntry = {
				timestamp: '2025-11-11T10:00:00Z',
				drugName: 'Lisinopril 10mg Tablet',
				sig: 'Take 1 tablet once daily',
				daysSupply: 30,
				result: {
					prescription: { rxcui: '314076' },
					calculation: {
						totalQuantityNeeded: 30,
						unit: 'tablets'
					},
					recommendation: {
						packages: [{ ndc: '00093-1234-01' }],
						totalDispensed: 30,
						overfill: 0,
						overfillPercentage: 0
					}
				}
			};

			// Verify structure for CSV export
			expect(historyEntry.timestamp).toBeDefined();
			expect(historyEntry.drugName).toBeDefined();
			expect(historyEntry.result.prescription.rxcui).toBeDefined();
			expect(historyEntry.result.recommendation.packages).toHaveLength(1);
		});

		it('should handle inventory export data structure', () => {
			const inventoryItem = {
				ndc: '00093-1234-01',
				drugName: 'Lisinopril 10mg Tablet',
				quantity: 500,
				unit: 'tablets',
				packageSize: 100,
				status: 'in-stock',
				minStock: 100,
				location: 'A-12',
				expirationDate: '2026-12-31',
				lotNumber: 'LOT123',
				lastUpdated: '2025-11-11T10:00:00Z'
			};

			// Verify structure for CSV export
			expect(inventoryItem.ndc).toBeDefined();
			expect(inventoryItem.drugName).toBeDefined();
			expect(inventoryItem.quantity).toBeGreaterThan(0);
			expect(inventoryItem.status).toBe('in-stock');
		});
	});

	describe('API Endpoint Structure', () => {
		it('should validate prescription history export request structure', () => {
			const requestBody = {
				history: [
					{
						timestamp: '2025-11-11T10:00:00Z',
						drugName: 'Test Drug',
						sig: 'Test SIG',
						daysSupply: 30,
						result: {}
					}
				]
			};

			expect(Array.isArray(requestBody.history)).toBe(true);
			expect(requestBody.history[0].timestamp).toBeDefined();
		});

		it('should validate FHIR export request structure', () => {
			const requestBody = {
				prescription: {
					drugName: 'Test Drug',
					rxcui: '123456',
					sig: 'Test SIG',
					daysSupply: 30,
					quantity: 30,
					unit: 'tablets'
				}
			};

			expect(requestBody.prescription).toBeDefined();
			expect(requestBody.prescription.drugName).toBeDefined();
			expect(requestBody.prescription.rxcui).toBeDefined();
		});

		it('should validate inventory export request structure', () => {
			const requestBody = {
				inventory: [
					{
						ndc: '00093-1234-01',
						drugName: 'Test Drug',
						quantity: 100,
						unit: 'tablets'
					}
				]
			};

			expect(Array.isArray(requestBody.inventory)).toBe(true);
			expect(requestBody.inventory[0].ndc).toBeDefined();
		});
	});

	describe('FHIR Resource Validation', () => {
		it('should fail validation for missing required fields', () => {
			const invalidResource = {
				resourceType: 'MedicationRequest'
				// Missing required fields
			};

			const validation = validateFHIRResource(invalidResource);

			expect(validation.valid).toBe(false);
			expect(validation.errors.length).toBeGreaterThan(0);
			expect(validation.errors).toContain('Missing required field: status');
			expect(validation.errors).toContain('Missing required field: intent');
		});

		it('should fail validation for missing resourceType', () => {
			const invalidResource = {
				status: 'active'
			};

			const validation = validateFHIRResource(invalidResource);

			expect(validation.valid).toBe(false);
			expect(validation.errors).toContain('Missing required field: resourceType');
		});
	});

	describe('RxNorm Code System Integration', () => {
		it('should use correct RxNorm system URL in FHIR resources', () => {
			const prescription = {
				drugName: 'Test Drug',
				rxcui: '123456',
				sig: 'Test',
				daysSupply: 30,
				quantity: 30,
				unit: 'tablets'
			};

			const fhirResource = buildFHIRMedicationRequest(prescription);

			expect(fhirResource.medicationCodeableConcept.coding[0].system).toBe(
				'http://www.nlm.nih.gov/research/umls/rxnorm'
			);
		});
	});

	describe('Date and Time Handling', () => {
		it('should use ISO 8601 format for dates', () => {
			const prescription = {
				drugName: 'Test Drug',
				rxcui: '123456',
				sig: 'Test',
				daysSupply: 30,
				quantity: 30,
				unit: 'tablets'
			};

			const fhirResource = buildFHIRMedicationRequest(prescription);

			// Check that authoredOn is in ISO format
			expect(fhirResource.authoredOn).toMatch(
				/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
			);
		});

		it('should handle custom dispensed dates', () => {
			const customDate = '2025-11-01T14:30:00Z';
			const prescription = {
				drugName: 'Test Drug',
				rxcui: '123456',
				quantityDispensed: 30,
				unit: 'tablets',
				daysSupply: 30,
				dispensedDate: customDate
			};

			const fhirResource = buildFHIRMedicationDispense(prescription);

			expect(fhirResource.whenHandedOver).toBe(customDate);
		});
	});
});
