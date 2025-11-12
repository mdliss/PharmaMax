import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Export prescription history as CSV
 * POST /api/export/prescription-history
 * Body: { history: Array<PrescriptionHistoryEntry> }
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { history } = await request.json();

		if (!history || !Array.isArray(history)) {
			return json({ error: 'Invalid history data' }, { status: 400 });
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
		const rows = history.map((entry: any) => {
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
			headers.join(',') +
			'\n' +
			rows.map((row: any) => row.map((cell: any) => `"${cell}"`).join(',')).join('\n');

		return new Response(csvContent, {
			status: 200,
			headers: {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename="prescription-history.csv"'
			}
		});
	} catch (error) {
		console.error('Export error:', error);
		return json({ error: 'Failed to export prescription history' }, { status: 500 });
	}
};
