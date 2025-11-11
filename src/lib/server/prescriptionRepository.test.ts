import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	createPrescription,
	getPrescriptionById,
	getPrescriptions,
	getPrescriptionCount,
	deletePrescription,
	getRecentPrescriptions
} from './prescriptionRepository';

// Mock Prisma client
vi.mock('./db', () => {
	const mockPrisma = {
		prescription: {
			create: vi.fn(),
			findUnique: vi.fn(),
			findMany: vi.fn(),
			count: vi.fn(),
			delete: vi.fn()
		}
	};

	return {
		default: mockPrisma
	};
});

describe('PrescriptionRepository', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('createPrescription', () => {
		it('should create a new prescription', async () => {
			const { default: prisma } = await import('./db');
			const mockData = {
				drugName: 'Lisinopril',
				rxcui: '12345',
				sig: 'Take 1 tablet daily',
				daysSupply: 30,
				totalQuantity: 30,
				calculationResult: { test: 'data' }
			};

			const mockPrescription = {
				id: 'test-id',
				...mockData,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			vi.spyOn(prisma.prescription, 'create').mockResolvedValue(mockPrescription as any);

			const result = await createPrescription(mockData);

			expect(result).toEqual(mockPrescription);
			expect(prisma.prescription.create).toHaveBeenCalledWith({
				data: mockData
			});
		});

		it('should create prescription without optional fields', async () => {
			const { default: prisma } = await import('./db');
			const mockData = {
				drugName: 'Aspirin',
				sig: 'Take as needed',
				daysSupply: 30,
				totalQuantity: 100
			};

			const mockPrescription = {
				id: 'test-id-2',
				...mockData,
				rxcui: null,
				calculationResult: null,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			vi.spyOn(prisma.prescription, 'create').mockResolvedValue(mockPrescription as any);

			const result = await createPrescription(mockData);

			expect(result).toEqual(mockPrescription);
		});
	});

	describe('getPrescriptionById', () => {
		it('should return prescription by ID', async () => {
			const { default: prisma } = await import('./db');
			const mockPrescription = {
				id: 'test-id',
				drugName: 'Metformin',
				rxcui: '67890',
				sig: 'Take twice daily',
				daysSupply: 90,
				totalQuantity: 180,
				calculationResult: null,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			vi.spyOn(prisma.prescription, 'findUnique').mockResolvedValue(mockPrescription as any);

			const result = await getPrescriptionById('test-id');

			expect(result).toEqual(mockPrescription);
			expect(prisma.prescription.findUnique).toHaveBeenCalledWith({
				where: { id: 'test-id' }
			});
		});

		it('should return null for non-existent ID', async () => {
			const { default: prisma } = await import('./db');

			vi.spyOn(prisma.prescription, 'findUnique').mockResolvedValue(null);

			const result = await getPrescriptionById('non-existent');

			expect(result).toBeNull();
		});
	});

	describe('getPrescriptions', () => {
		it('should get prescriptions with default params', async () => {
			const { default: prisma } = await import('./db');
			const mockPrescriptions = [
				{
					id: '1',
					drugName: 'Drug1',
					sig: 'sig1',
					daysSupply: 30,
					totalQuantity: 30,
					createdAt: new Date()
				}
			];

			vi.spyOn(prisma.prescription, 'findMany').mockResolvedValue(mockPrescriptions as any);

			const result = await getPrescriptions();

			expect(result).toEqual(mockPrescriptions);
			expect(prisma.prescription.findMany).toHaveBeenCalledWith({
				where: {},
				orderBy: { createdAt: 'desc' },
				take: 50,
				skip: 0
			});
		});

		it('should filter by drug name', async () => {
			const { default: prisma } = await import('./db');
			const mockPrescriptions = [
				{
					id: '1',
					drugName: 'Lisinopril',
					sig: 'Take 1 tablet daily',
					daysSupply: 30,
					totalQuantity: 30,
					createdAt: new Date()
				}
			];

			vi.spyOn(prisma.prescription, 'findMany').mockResolvedValue(mockPrescriptions as any);

			const result = await getPrescriptions({ drugName: 'Lisinopril' });

			expect(result).toEqual(mockPrescriptions);
			expect(prisma.prescription.findMany).toHaveBeenCalledWith({
				where: {
					drugName: { contains: 'Lisinopril', mode: 'insensitive' }
				},
				orderBy: { createdAt: 'desc' },
				take: 50,
				skip: 0
			});
		});

		it('should filter by date range', async () => {
			const { default: prisma } = await import('./db');
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-12-31');

			vi.spyOn(prisma.prescription, 'findMany').mockResolvedValue([] as any);

			await getPrescriptions({ startDate, endDate });

			expect(prisma.prescription.findMany).toHaveBeenCalledWith({
				where: {
					createdAt: {
						gte: startDate,
						lte: endDate
					}
				},
				orderBy: { createdAt: 'desc' },
				take: 50,
				skip: 0
			});
		});

		it('should filter by start date only', async () => {
			const { default: prisma } = await import('./db');
			const startDate = new Date('2024-01-01');

			vi.spyOn(prisma.prescription, 'findMany').mockResolvedValue([] as any);

			await getPrescriptions({ startDate });

			expect(prisma.prescription.findMany).toHaveBeenCalledWith({
				where: {
					createdAt: {
						gte: startDate
					}
				},
				orderBy: { createdAt: 'desc' },
				take: 50,
				skip: 0
			});
		});

		it('should apply limit and offset', async () => {
			const { default: prisma } = await import('./db');

			vi.spyOn(prisma.prescription, 'findMany').mockResolvedValue([] as any);

			await getPrescriptions({ limit: 10, offset: 20 });

			expect(prisma.prescription.findMany).toHaveBeenCalledWith({
				where: {},
				orderBy: { createdAt: 'desc' },
				take: 10,
				skip: 20
			});
		});
	});

	describe('getPrescriptionCount', () => {
		it('should count all prescriptions', async () => {
			const { default: prisma } = await import('./db');

			vi.spyOn(prisma.prescription, 'count').mockResolvedValue(42);

			const result = await getPrescriptionCount();

			expect(result).toBe(42);
			expect(prisma.prescription.count).toHaveBeenCalledWith({
				where: {}
			});
		});

		it('should count with filters', async () => {
			const { default: prisma } = await import('./db');
			const startDate = new Date('2024-01-01');

			vi.spyOn(prisma.prescription, 'count').mockResolvedValue(10);

			const result = await getPrescriptionCount({ drugName: 'Aspirin', startDate });

			expect(result).toBe(10);
			expect(prisma.prescription.count).toHaveBeenCalledWith({
				where: {
					drugName: { contains: 'Aspirin', mode: 'insensitive' },
					createdAt: {
						gte: startDate
					}
				}
			});
		});
	});

	describe('deletePrescription', () => {
		it('should delete prescription by ID', async () => {
			const { default: prisma } = await import('./db');
			const mockPrescription = {
				id: 'test-id',
				drugName: 'Test Drug',
				sig: 'Test SIG',
				daysSupply: 30,
				totalQuantity: 30,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			vi.spyOn(prisma.prescription, 'delete').mockResolvedValue(mockPrescription as any);

			const result = await deletePrescription('test-id');

			expect(result).toEqual(mockPrescription);
			expect(prisma.prescription.delete).toHaveBeenCalledWith({
				where: { id: 'test-id' }
			});
		});
	});

	describe('getRecentPrescriptions', () => {
		it('should get recent prescriptions with default limit', async () => {
			const { default: prisma } = await import('./db');
			const mockPrescriptions = Array(10)
				.fill(null)
				.map((_, i) => ({
					id: `id-${i}`,
					drugName: `Drug${i}`,
					sig: `sig${i}`,
					daysSupply: 30,
					totalQuantity: 30,
					createdAt: new Date()
				}));

			vi.spyOn(prisma.prescription, 'findMany').mockResolvedValue(mockPrescriptions as any);

			const result = await getRecentPrescriptions();

			expect(result).toHaveLength(10);
			expect(prisma.prescription.findMany).toHaveBeenCalledWith({
				orderBy: { createdAt: 'desc' },
				take: 10
			});
		});

		it('should get recent prescriptions with custom limit', async () => {
			const { default: prisma } = await import('./db');
			const mockPrescriptions = Array(5)
				.fill(null)
				.map((_, i) => ({
					id: `id-${i}`,
					drugName: `Drug${i}`,
					sig: `sig${i}`,
					daysSupply: 30,
					totalQuantity: 30,
					createdAt: new Date()
				}));

			vi.spyOn(prisma.prescription, 'findMany').mockResolvedValue(mockPrescriptions as any);

			const result = await getRecentPrescriptions(5);

			expect(result).toHaveLength(5);
			expect(prisma.prescription.findMany).toHaveBeenCalledWith({
				orderBy: { createdAt: 'desc' },
				take: 5
			});
		});
	});
});
