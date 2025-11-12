/**
 * Export Utilities for Data Export and Integration
 * Supports CSV/Excel exports and FHIR format generation
 */

/**
 * Export prescription history to CSV
 */
export function exportHistoryToCSV(history: any[]): void {
	if (history.length === 0) {
		alert('No history to export');
		return;
	}

	// CSV headers
	const headers = [
		'Date',
		'Drug Name',
		'RxCUI',
		'SIG',
		'Days Supply',
		'Total Quantity',
		'Unit',
		'NDCs Used',
		'Total Dispensed',
		'Overfill',
		'Overfill %'
	];

	// Convert history to CSV rows
	const rows = history.map((entry) => {
		const ndcs = entry.result?.recommendation?.packages
			? entry.result.recommendation.packages.map((pkg: any) => pkg.ndc).join('; ')
			: '';

		return [
			new Date(entry.timestamp).toLocaleString(),
			entry.drugName || '',
			entry.result?.prescription?.rxcui || '',
			entry.sig || '',
			entry.daysSupply || '',
			entry.result?.calculation?.totalQuantityNeeded || '',
			entry.result?.calculation?.unit || '',
			ndcs,
			entry.result?.recommendation?.totalDispensed || '',
			entry.result?.recommendation?.overfill || '',
			entry.result?.recommendation?.overfillPercentage?.toFixed(1) || ''
		];
	});

	// Combine headers and rows
	const csvContent =
		headers.join(',') + '\n' + rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

	// Create download
	downloadFile(csvContent, 'prescription-history.csv', 'text/csv');
}

/**
 * Export patient medication history to CSV
 */
export function exportPatientMedicationsToCSV(medications: any[], patientName: string): void {
	if (medications.length === 0) {
		alert('No medications to export');
		return;
	}

	// CSV headers
	const headers = [
		'Prescribed Date',
		'Filled Date',
		'Drug Name',
		'RxCUI',
		'SIG',
		'Days Supply',
		'Quantity',
		'Prescriber',
		'Refills Remaining',
		'Partial Fill',
		'Quantity Remaining'
	];

	// Convert medications to CSV rows
	const rows = medications.map((med) => {
		return [
			new Date(med.prescribedDate).toLocaleDateString(),
			med.filledDate ? new Date(med.filledDate).toLocaleDateString() : '',
			med.drugName || '',
			med.rxcui || '',
			med.sig || '',
			med.daysSupply || '',
			med.quantity || '',
			med.prescriber || '',
			med.refillsRemaining !== undefined ? med.refillsRemaining : '',
			med.isPartialFill ? 'Yes' : 'No',
			med.quantityRemaining || ''
		];
	});

	// Combine headers and rows
	const csvContent =
		headers.join(',') + '\n' + rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

	// Create download
	const filename = `${patientName.replace(/\s+/g, '_')}-medications.csv`;
	downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Export inventory to CSV
 */
export function exportInventoryToCSV(inventory: any[]): void {
	if (inventory.length === 0) {
		alert('No inventory to export');
		return;
	}

	// CSV headers
	const headers = [
		'NDC',
		'Drug Name',
		'Quantity',
		'Unit',
		'Package Size',
		'Status',
		'Min Stock Level',
		'Location',
		'Expiration Date',
		'Lot Number',
		'Last Updated'
	];

	// Convert inventory to CSV rows
	const rows = inventory.map((item) => {
		return [
			item.ndc || '',
			item.drugName || '',
			item.quantity || '',
			item.unit || '',
			item.packageSize || '',
			item.status || '',
			item.minStock || '',
			item.location || '',
			item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : '',
			item.lotNumber || '',
			item.lastUpdated ? new Date(item.lastUpdated).toLocaleString() : ''
		];
	});

	// Combine headers and rows
	const csvContent =
		headers.join(',') + '\n' + rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

	// Create download
	downloadFile(csvContent, 'inventory-export.csv', 'text/csv');
}

/**
 * Helper function to trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

/**
 * Export data as JSON
 */
export function exportAsJSON(data: any, filename: string): void {
	const jsonContent = JSON.stringify(data, null, 2);
	downloadFile(jsonContent, filename, 'application/json');
}
