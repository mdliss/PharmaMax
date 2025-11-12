/**
 * Initialize Demo Data
 * Populates all stores with synthetic data for demo/testing purposes
 */

import { PatientStore } from './patientStore';
import { HistoryStore } from './historyStore';
import { inventoryStore } from './inventoryStore';
import { SYNTHETIC_PATIENTS } from '$lib/data/syntheticPatients';
import { SYNTHETIC_PRESCRIPTIONS } from '$lib/data/syntheticPrescriptions';
import { SYNTHETIC_INVENTORY } from '$lib/data/syntheticInventory';

const DEMO_FLAG_KEY = 'pharmamax_demo_initialized';

/**
 * Check if demo data has been initialized
 */
export function isDemoDataInitialized(): boolean {
	if (typeof window === 'undefined') return false;
	return localStorage.getItem(DEMO_FLAG_KEY) === 'true';
}

/**
 * Initialize demo data - populates all stores with synthetic data
 */
export function initializeDemoData(): void {
	if (typeof window === 'undefined') return;

	try {
		console.log('🔄 Initializing PharmaMax demo data...');

		// 1. Load patients
		console.log(`📋 Loading ${SYNTHETIC_PATIENTS.length} patients...`);
		SYNTHETIC_PATIENTS.forEach(patient => {
			// Convert synthetic patient format to PatientStore format
			PatientStore.create({
				name: patient.name,
				dateOfBirth: patient.dateOfBirth,
				allergies: patient.allergies.map(a => a.allergen),
				insuranceProvider: patient.insurance.provider,
				insurancePolicyNumber: patient.insurance.memberId,
				insuranceGroupNumber: patient.insurance.groupNumber,
				medicationHistory: [],
				notes: patient.notes || `Conditions: ${patient.conditions.join(', ')}`
			});
		});

		// 2. Load prescription history
		console.log(`💊 Loading ${SYNTHETIC_PRESCRIPTIONS.length} prescription history entries...`);
		SYNTHETIC_PRESCRIPTIONS.forEach(prescription => {
			// Add to history store
			HistoryStore.save(
				prescription.drugInput,
				prescription.sig,
				prescription.daysSupply,
				prescription.result
			);
		});

		// 3. Load inventory
		console.log(`📦 Loading ${SYNTHETIC_INVENTORY.length} inventory items...`);
		SYNTHETIC_INVENTORY.forEach(item => {
			inventoryStore.addItem({
				ndc: item.ndc,
				drugName: item.drugName,
				packageSize: parseInt(item.packageSize) || 1,
				packageUnit: 'units',
				currentQuantity: item.currentStock,
				minThreshold: item.reorderPoint,
				notes: `${item.manufacturer} - Exp: ${item.expirationDate}`
			});
		});

		// Mark as initialized
		localStorage.setItem(DEMO_FLAG_KEY, 'true');

		console.log('✅ Demo data initialized successfully!');
		console.log(`   - ${SYNTHETIC_PATIENTS.length} patients`);
		console.log(`   - ${SYNTHETIC_PRESCRIPTIONS.length} prescriptions`);
		console.log(`   - ${SYNTHETIC_INVENTORY.length} inventory items`);
	} catch (error) {
		console.error('❌ Error initializing demo data:', error);
	}
}

/**
 * Clear all demo data and reset stores
 */
export function clearDemoData(): void {
	if (typeof window === 'undefined') return;

	try {
		console.log('🗑️  Clearing demo data...');

		// Clear all stores
		PatientStore.clear();
		HistoryStore.clear();
		inventoryStore.clearAll();

		// Remove demo flag
		localStorage.removeItem(DEMO_FLAG_KEY);

		console.log('✅ Demo data cleared!');
	} catch (error) {
		console.error('❌ Error clearing demo data:', error);
	}
}

/**
 * Reset and reinitialize demo data
 */
export function resetDemoData(): void {
	clearDemoData();
	initializeDemoData();
}
