import prisma from './db';
import type { Prescription } from '@prisma/client';

export interface CreatePrescriptionData {
	drugName: string;
	rxcui?: string;
	sig: string;
	daysSupply: number;
	totalQuantity: number;
	calculationResult?: any;
}

export interface PrescriptionQuery {
	limit?: number;
	offset?: number;
	drugName?: string;
	startDate?: Date;
	endDate?: Date;
}

/**
 * Create a new prescription record
 */
export async function createPrescription(data: CreatePrescriptionData): Promise<Prescription> {
	return prisma.prescription.create({
		data: {
			drugName: data.drugName,
			rxcui: data.rxcui,
			sig: data.sig,
			daysSupply: data.daysSupply,
			totalQuantity: data.totalQuantity,
			calculationResult: data.calculationResult
		}
	});
}

/**
 * Get prescription by ID
 */
export async function getPrescriptionById(id: string): Promise<Prescription | null> {
	return prisma.prescription.findUnique({
		where: { id }
	});
}

/**
 * Get prescriptions with optional filtering
 */
export async function getPrescriptions(query: PrescriptionQuery = {}): Promise<Prescription[]> {
	const { limit = 50, offset = 0, drugName, startDate, endDate } = query;

	return prisma.prescription.findMany({
		where: {
			...(drugName && { drugName: { contains: drugName, mode: 'insensitive' } }),
			...(startDate || endDate
				? {
						createdAt: {
							...(startDate && { gte: startDate }),
							...(endDate && { lte: endDate })
						}
				  }
				: {})
		},
		orderBy: { createdAt: 'desc' },
		take: limit,
		skip: offset
	});
}

/**
 * Get prescription count with optional filtering
 */
export async function getPrescriptionCount(query: PrescriptionQuery = {}): Promise<number> {
	const { drugName, startDate, endDate } = query;

	return prisma.prescription.count({
		where: {
			...(drugName && { drugName: { contains: drugName, mode: 'insensitive' } }),
			...(startDate || endDate
				? {
						createdAt: {
							...(startDate && { gte: startDate }),
							...(endDate && { lte: endDate })
						}
				  }
				: {})
		}
	});
}

/**
 * Delete prescription by ID
 */
export async function deletePrescription(id: string): Promise<Prescription> {
	return prisma.prescription.delete({
		where: { id }
	});
}

/**
 * Get recent prescriptions
 */
export async function getRecentPrescriptions(limit: number = 10): Promise<Prescription[]> {
	return prisma.prescription.findMany({
		orderBy: { createdAt: 'desc' },
		take: limit
	});
}
