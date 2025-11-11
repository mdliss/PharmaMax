import { writable, derived } from 'svelte/store';
import type { DrugInfo } from '../server/rxnorm';

export interface PrescriptionMedication {
	id: string;
	drugName: string;
	drugInfo: DrugInfo | null;
	sig: string;
	quantity: number;
	daysSupply: number;
	unit: string;
	price?: number;
	calculationResult?: any;
}

function createPrescriptionStore() {
	const { subscribe, set, update } = writable<PrescriptionMedication[]>([]);

	return {
		subscribe,
		addMedication: () => {
			update(meds => [
				...meds,
				{
					id: crypto.randomUUID(),
					drugName: '',
					drugInfo: null,
					sig: '',
					quantity: 0,
					daysSupply: 30,
					unit: 'tablet',
					price: undefined,
					calculationResult: undefined
				}
			]);
		},
		removeMedication: (id: string) => {
			update(meds => meds.filter(med => med.id !== id));
		},
		updateMedication: (id: string, updates: Partial<PrescriptionMedication>) => {
			update(meds =>
				meds.map(med => (med.id === id ? { ...med, ...updates } : med))
			);
		},
		clear: () => set([]),
		reset: () => set([])
	};
}

export const prescriptionStore = createPrescriptionStore();

// Derived store for total cost
export const totalPrescriptionCost = derived(prescriptionStore, $meds => {
	return $meds.reduce((total, med) => {
		return total + (med.price || 0);
	}, 0);
});

// Derived store for checking if prescription is ready
export const isPrescriptionReady = derived(prescriptionStore, $meds => {
	if ($meds.length === 0) return false;
	return $meds.every(
		med => med.drugName && med.sig && med.quantity > 0 && med.daysSupply > 0
	);
});
