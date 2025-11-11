import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { searchRxNormDrugs } from '$lib/server/rxnorm';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const query = url.searchParams.get('q');

		if (!query || query.trim().length < 2) {
			return json({
				success: true,
				suggestions: []
			});
		}

		const suggestions = await searchRxNormDrugs(query.trim());

		return json({
			success: true,
			suggestions
		});
	} catch (error: any) {
		console.error('Autocomplete API error:', error);

		return json(
			{
				success: false,
				error: error.message || 'Failed to fetch suggestions',
				suggestions: []
			},
			{ status: 500 }
		);
	}
};
