import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { buildFHIRMedicationDispense } from '$lib/utils/fhirUtils';

/**
 * Generate FHIR R4 MedicationDispense resource
 * POST /api/export/fhir-medication-dispense
 * Body: { prescription: DispensingData }
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { prescription } = await request.json();

		if (!prescription) {
			return json({ error: 'Invalid prescription data' }, { status: 400 });
		}

		// Build FHIR resource
		const fhirResource = buildFHIRMedicationDispense(prescription);

		// Return as JSON with FHIR content type
		return new Response(JSON.stringify(fhirResource, null, 2), {
			status: 200,
			headers: {
				'Content-Type': 'application/fhir+json',
				'Content-Disposition': `attachment; filename="MedicationDispense-${Date.now()}.json"`
			}
		});
	} catch (error) {
		console.error('FHIR export error:', error);
		return json({ error: 'Failed to generate FHIR MedicationDispense' }, { status: 500 });
	}
};
