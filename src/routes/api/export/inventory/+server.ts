import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Export inventory as CSV
 * POST /api/export/inventory
 * Body: { inventory: Array<InventoryItem> }
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { inventory } = await request.json();

		if (!inventory || !Array.isArray(inventory)) {
			return json({ error: 'Invalid inventory data' }, { status: 400 });
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
		const rows = inventory.map((item: any) => {
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
			headers.join(',') +
			'\n' +
			rows.map((row: any) => row.map((cell: any) => `"${cell}"`).join(',')).join('\n');

		return new Response(csvContent, {
			status: 200,
			headers: {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename="inventory-export.csv"'
			}
		});
	} catch (error) {
		console.error('Export error:', error);
		return json({ error: 'Failed to export inventory' }, { status: 500 });
	}
};
