import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { logUserSatisfactionMetric } from '$lib/server/metricsRepository';

/**
 * POST /api/satisfaction
 * Submit user satisfaction rating
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { rating, feature, feedback, sessionId } = await request.json();

		// Validate rating
		if (rating === undefined || rating === null) {
			return json(
				{
					success: false,
					error: 'Rating is required'
				},
				{ status: 400 }
			);
		}

		if (typeof rating !== 'number' || rating < 1 || rating > 5) {
			return json(
				{
					success: false,
					error: 'Rating must be a number between 1 and 5'
				},
				{ status: 400 }
			);
		}

		// Log the satisfaction metric
		await logUserSatisfactionMetric({
			rating,
			feature: feature || null,
			feedback: feedback || null,
			sessionId: sessionId || null
		});

		return json({
			success: true,
			message: 'Thank you for your feedback!'
		});
	} catch (error: any) {
		console.error('Failed to log satisfaction rating:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to submit rating'
			},
			{ status: 500 }
		);
	}
};
