import { describe, it, expect, vi } from 'vitest';

// Mock environment
vi.mock('$env/dynamic/private', () => ({
	env: {
		NODE_ENV: 'test'
	}
}));

// Mock PrismaClient
class MockPrismaClient {
	constructor(config?: any) {
		(this as any).config = config;
	}
	$connect = vi.fn();
	$disconnect = vi.fn();
}

vi.mock('@prisma/client', () => ({
	PrismaClient: MockPrismaClient
}));

describe('Database Connection', () => {
	it('should create a PrismaClient instance', async () => {
		const { prisma } = await import('./db');

		expect(prisma).toBeDefined();
		expect(prisma.$connect).toBeDefined();
		expect(prisma.$disconnect).toBeDefined();
	});

	it('should export default prisma instance', async () => {
		const dbModule = await import('./db');

		expect(dbModule.default).toBeDefined();
		expect(dbModule.default).toBe(dbModule.prisma);
	});
});
