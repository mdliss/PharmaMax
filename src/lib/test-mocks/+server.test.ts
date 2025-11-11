import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './+server';
import * as rxnorm from '$lib/server/rxnorm';

describe('POST /api/normalize', () => {
	let mockRequest: Request;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return 400 for empty input', async () => {
		mockRequest = new Request('http://localhost/api/normalize', {
			method: 'POST',
			body: JSON.stringify({ input: '' })
		});

		const response = await POST({ request: mockRequest } as any);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.success).toBe(false);
		expect(data.error).toBeDefined();
	});

	it('should return 400 for invalid short input', async () => {
		mockRequest = new Request('http://localhost/api/normalize', {
			method: 'POST',
			body: JSON.stringify({ input: 'a' })
		});

		const response = await POST({ request: mockRequest } as any);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.success).toBe(false);
	});

	it('should handle drug normalization success', async () => {
		mockRequest = new Request('http://localhost/api/normalize', {
			method: 'POST',
			body: JSON.stringify({ input: 'lisinopril' })
		});

		// Mock the normalizeDrug function
		vi.spyOn(rxnorm, 'normalizeDrug').mockResolvedValue({
			rxcui: '12345',
			drugName: 'Lisinopril',
			genericName: 'Lisinopril',
			brandNames: [],
			doseForm: 'Tablet',
			strength: '10 MG'
		});

		const response = await POST({ request: mockRequest } as any);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
		expect(data.rxcui).toBe('12345');
		expect(data.drugName).toBe('Lisinopril');
	});

	it('should handle drug normalization failure', async () => {
		mockRequest = new Request('http://localhost/api/normalize', {
			method: 'POST',
			body: JSON.stringify({ input: 'nonexistentdrug123' })
		});

		// Mock the normalizeDrug function to throw error
		vi.spyOn(rxnorm, 'normalizeDrug').mockRejectedValue(
			new Error('Drug not found in RxNorm database')
		);

		const response = await POST({ request: mockRequest } as any);
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data.success).toBe(false);
		expect(data.error).toContain('Drug not found');
	});

	it('should validate NDC format', async () => {
		mockRequest = new Request('http://localhost/api/normalize', {
			method: 'POST',
			body: JSON.stringify({ input: '12345-1234-12' })
		});

		vi.spyOn(rxnorm, 'normalizeDrug').mockResolvedValue({
			rxcui: '67890',
			drugName: 'Test Drug',
			genericName: 'Test Drug',
			brandNames: [],
			doseForm: 'Tablet',
			strength: '20 MG'
		});

		const response = await POST({ request: mockRequest } as any);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
	});
});
