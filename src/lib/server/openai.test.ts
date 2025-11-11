import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateSIG, getOpenAIClient } from './openai';

// Mock OpenAI at the top level
const mockCreateFn = vi.fn();

vi.mock('openai', async () => {
	const { vi } = await import('vitest');
	const mockCreate = vi.fn();

	return {
		default: class MockOpenAI {
			chat = {
				completions: {
					create: mockCreate
				}
			};
		},
		__getMockCreate: () => mockCreate
	};
});

describe('validateSIG', () => {
	it('should validate correct SIG input', () => {
		const result = validateSIG('Take 1 tablet by mouth twice daily');

		expect(result.valid).toBe(true);
		expect(result.error).toBeUndefined();
	});

	it('should reject empty SIG', () => {
		const result = validateSIG('');

		expect(result.valid).toBe(false);
		expect(result.error).toBe('SIG is required');
	});

	it('should reject whitespace-only SIG', () => {
		const result = validateSIG('   ');

		expect(result.valid).toBe(false);
		expect(result.error).toBe('SIG is required');
	});

	it('should reject SIG shorter than 5 characters', () => {
		const result = validateSIG('Take');

		expect(result.valid).toBe(false);
		expect(result.error).toBe('SIG must be at least 5 characters');
	});

	it('should accept SIG with exactly 5 characters', () => {
		const result = validateSIG('1 BID');

		expect(result.valid).toBe(true);
	});

	it('should accept common SIG formats', () => {
		const commonSIGs = [
			'Take 2 tablets by mouth daily',
			'Inject 10 units subcutaneously once daily',
			'Inhale 2 puffs twice daily',
			'Take 5 mL by mouth TID',
			'Apply topically QID'
		];

		commonSIGs.forEach(sig => {
			const result = validateSIG(sig);
			expect(result.valid).toBe(true);
		});
	});
});

describe('getOpenAIClient', () => {
	it('should return an OpenAI client instance', () => {
		const client = getOpenAIClient();
		expect(client).toBeDefined();
		expect(typeof client.chat).toBe('object');
	});
});

describe('parseSIG', () => {
	beforeEach(() => {
		mockCreateFn.mockClear();
	});

	it('should parse valid SIG with OpenAI', async () => {
		const { parseSIG } = await import('./openai');
		const client = getOpenAIClient();

		vi.spyOn(client.chat.completions, 'create').mockResolvedValue({
			choices: [
				{
					message: {
						content: JSON.stringify({
							dosePerAdministration: 2,
							frequencyPerDay: 2,
							route: 'by mouth',
							totalDailyDose: 4,
							unit: 'tablets',
							dosageForm: 'oral_solid'
						})
					}
				}
			]
		} as any);

		const result = await parseSIG('Take 2 tablets by mouth twice daily');

		expect(result.dosePerAdministration).toBe(2);
		expect(result.frequencyPerDay).toBe(2);
		expect(result.totalDailyDose).toBe(4);
		expect(result.route).toBe('by mouth');
		expect(result.unit).toBe('tablets');
		expect(result.dosageForm).toBe('oral_solid');
	});

	it('should throw error when OpenAI returns no content', async () => {
		const { parseSIG } = await import('./openai');
		const client = getOpenAIClient();

		vi.spyOn(client.chat.completions, 'create').mockResolvedValue({
			choices: [
				{
					message: {}
				}
			]
		} as any);

		await expect(parseSIG('Take 1 tablet')).rejects.toThrow('No response from OpenAI');
	});

	it('should throw error for invalid response format', async () => {
		const { parseSIG } = await import('./openai');
		const client = getOpenAIClient();

		vi.spyOn(client.chat.completions, 'create').mockResolvedValue({
			choices: [
				{
					message: {
						content: JSON.stringify({
							dosePerAdministration: 'not a number',
							frequencyPerDay: 2
						})
					}
				}
			]
		} as any);

		await expect(parseSIG('Invalid SIG')).rejects.toThrow('Invalid SIG parsing response format');
	});

	it('should default to "other" for invalid dosageForm', async () => {
		const { parseSIG } = await import('./openai');
		const client = getOpenAIClient();

		vi.spyOn(client.chat.completions, 'create').mockResolvedValue({
			choices: [
				{
					message: {
						content: JSON.stringify({
							dosePerAdministration: 1,
							frequencyPerDay: 1,
							route: 'topical',
							totalDailyDose: 1,
							unit: 'application',
							dosageForm: 'invalid_form'
						})
					}
				}
			]
		} as any);

		const result = await parseSIG('Apply topically once daily');

		expect(result.dosageForm).toBe('other');
	});

	it('should recalculate totalDailyDose correctly', async () => {
		const { parseSIG } = await import('./openai');
		const client = getOpenAIClient();

		vi.spyOn(client.chat.completions, 'create').mockResolvedValue({
			choices: [
				{
					message: {
						content: JSON.stringify({
							dosePerAdministration: 5,
							frequencyPerDay: 3,
							route: 'by mouth',
							totalDailyDose: 0,
							unit: 'mL',
							dosageForm: 'liquid'
						})
					}
				}
			]
		} as any);

		const result = await parseSIG('Take 5 mL by mouth three times daily');

		expect(result.totalDailyDose).toBe(15);
	});

	it('should handle OpenAI API errors', async () => {
		const { parseSIG } = await import('./openai');
		const client = getOpenAIClient();

		vi.spyOn(client.chat.completions, 'create').mockRejectedValue(new Error('API Error'));

		await expect(parseSIG('Test SIG')).rejects.toThrow('Failed to parse SIG: API Error');
	});
});
