/**
 * Metrics Repository for Success Tracking
 * Tracks: Normalization Accuracy, Claim Rejections, User Satisfaction
 */

import { prisma } from './db';

export interface NormalizationMetricData {
	drugInput: string;
	rxcui?: string | null;
	success: boolean;
	responseTime: number;
	errorMessage?: string | null;
}

export interface ClaimRejectionMetricData {
	prescriptionId: string;
	ndcCode?: string | null;
	rejectionReason?: string | null;
	rejected: boolean;
}

export interface UserSatisfactionMetricData {
	rating: number; // 1-5
	feature?: string | null;
	feedback?: string | null;
	sessionId?: string | null;
}

export interface MetricsSummary {
	normalizationAccuracy: {
		totalAttempts: number;
		successfulAttempts: number;
		accuracyRate: number; // percentage
		averageResponseTime: number;
	};
	claimRejections: {
		totalClaims: number;
		rejectedClaims: number;
		rejectionRate: number; // percentage
	};
	userSatisfaction: {
		totalRatings: number;
		averageRating: number;
		ratingDistribution: { [key: number]: number };
	};
}

/**
 * Log a normalization metric
 */
export async function logNormalizationMetric(data: NormalizationMetricData) {
	return await prisma.normalizationMetric.create({
		data: {
			drugInput: data.drugInput,
			rxcui: data.rxcui,
			success: data.success,
			responseTime: data.responseTime,
			errorMessage: data.errorMessage
		}
	});
}

/**
 * Log a claim rejection metric
 */
export async function logClaimRejectionMetric(data: ClaimRejectionMetricData) {
	return await prisma.claimRejectionMetric.create({
		data: {
			prescriptionId: data.prescriptionId,
			ndcCode: data.ndcCode,
			rejectionReason: data.rejectionReason,
			rejected: data.rejected
		}
	});
}

/**
 * Log a user satisfaction metric
 */
export async function logUserSatisfactionMetric(data: UserSatisfactionMetricData) {
	// Validate rating is between 1-5
	if (data.rating < 1 || data.rating > 5) {
		throw new Error('Rating must be between 1 and 5');
	}

	return await prisma.userSatisfactionMetric.create({
		data: {
			rating: data.rating,
			feature: data.feature,
			feedback: data.feedback,
			sessionId: data.sessionId
		}
	});
}

/**
 * Get metrics summary for a date range
 */
export async function getMetricsSummary(
	startDate?: Date,
	endDate?: Date
): Promise<MetricsSummary> {
	const dateFilter = {
		createdAt: {
			...(startDate && { gte: startDate }),
			...(endDate && { lte: endDate })
		}
	};

	// Normalization Metrics
	const normalizationMetrics = await prisma.normalizationMetric.findMany({
		where: dateFilter
	});

	const totalNormalizationAttempts = normalizationMetrics.length;
	const successfulNormalizations = normalizationMetrics.filter((m) => m.success).length;
	const avgResponseTime =
		totalNormalizationAttempts > 0
			? normalizationMetrics.reduce((sum, m) => sum + m.responseTime, 0) /
			  totalNormalizationAttempts
			: 0;

	// Claim Rejection Metrics
	const claimMetrics = await prisma.claimRejectionMetric.findMany({
		where: dateFilter
	});

	const totalClaims = claimMetrics.length;
	const rejectedClaims = claimMetrics.filter((m) => m.rejected).length;

	// User Satisfaction Metrics
	const satisfactionMetrics = await prisma.userSatisfactionMetric.findMany({
		where: dateFilter
	});

	const totalRatings = satisfactionMetrics.length;
	const avgRating =
		totalRatings > 0
			? satisfactionMetrics.reduce((sum, m) => sum + m.rating, 0) / totalRatings
			: 0;

	const ratingDistribution: { [key: number]: number } = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0
	};
	satisfactionMetrics.forEach((m) => {
		ratingDistribution[m.rating]++;
	});

	return {
		normalizationAccuracy: {
			totalAttempts: totalNormalizationAttempts,
			successfulAttempts: successfulNormalizations,
			accuracyRate:
				totalNormalizationAttempts > 0
					? (successfulNormalizations / totalNormalizationAttempts) * 100
					: 0,
			averageResponseTime: avgResponseTime
		},
		claimRejections: {
			totalClaims,
			rejectedClaims,
			rejectionRate: totalClaims > 0 ? (rejectedClaims / totalClaims) * 100 : 0
		},
		userSatisfaction: {
			totalRatings,
			averageRating: avgRating,
			ratingDistribution
		}
	};
}

/**
 * Get detailed normalization metrics
 */
export async function getNormalizationMetrics(limit: number = 100, offset: number = 0) {
	return await prisma.normalizationMetric.findMany({
		take: limit,
		skip: offset,
		orderBy: {
			createdAt: 'desc'
		}
	});
}

/**
 * Get detailed claim rejection metrics
 */
export async function getClaimRejectionMetrics(limit: number = 100, offset: number = 0) {
	return await prisma.claimRejectionMetric.findMany({
		take: limit,
		skip: offset,
		orderBy: {
			createdAt: 'desc'
		}
	});
}

/**
 * Get detailed user satisfaction metrics
 */
export async function getUserSatisfactionMetrics(limit: number = 100, offset: number = 0) {
	return await prisma.userSatisfactionMetric.findMany({
		take: limit,
		skip: offset,
		orderBy: {
			createdAt: 'desc'
		}
	});
}
