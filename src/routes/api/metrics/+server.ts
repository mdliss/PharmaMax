import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getMetricsSummary } from '$lib/server/metricsRepository';

/**
 * GET /api/metrics
 * Retrieve metrics summary for success tracking
 * Optional query params: startDate, endDate (ISO 8601 format)
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const startDateParam = url.searchParams.get('startDate');
		const endDateParam = url.searchParams.get('endDate');

		let startDate: Date | undefined;
		let endDate: Date | undefined;

		if (startDateParam) {
			startDate = new Date(startDateParam);
			if (isNaN(startDate.getTime())) {
				return json(
					{
						success: false,
						error: 'Invalid startDate format. Use ISO 8601 format.'
					},
					{ status: 400 }
				);
			}
		}

		if (endDateParam) {
			endDate = new Date(endDateParam);
			if (isNaN(endDate.getTime())) {
				return json(
					{
						success: false,
						error: 'Invalid endDate format. Use ISO 8601 format.'
					},
					{ status: 400 }
				);
			}
		}

		const summary = await getMetricsSummary(startDate, endDate);

		return json({
			success: true,
			metrics: summary,
			period: {
				startDate: startDate?.toISOString() || null,
				endDate: endDate?.toISOString() || null
			}
		});
	} catch (error: any) {
		console.error('Failed to retrieve metrics:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to retrieve metrics'
			},
			{ status: 500 }
		);
	}
};
