/**
 * Client-side utility for checking drug safety
 */

export interface DrugSafetyAlert {
	severity: 'critical' | 'warning' | 'info';
	category: string;
	message: string;
}

export interface DrugSafetyCheckResult {
	hasInfo: boolean;
	safetyInfo?: {
		genericName: string;
		brandNames: string[];
		maxDailyDose?: {
			amount: number;
			unit: string;
			warning?: string;
		};
		maxSingleDose?: {
			amount: number;
			unit: string;
		};
		pregnancyCategory: string;
		pregnancyWarning?: string;
		lactationRisk: string;
		lactationWarning?: string;
		renalAdjustment: boolean;
		renalWarning?: string;
		hepaticAdjustment: boolean;
		hepaticWarning?: string;
		blackBoxWarnings?: string[];
	};
	alerts: DrugSafetyAlert[];
}

export interface DrugSafetyCheckOptions {
	drugName: string;
	dailyDose?: number;
	doseUnit?: string;
	patientAge?: number;
	isPregnant?: boolean;
	isLactating?: boolean;
	renalImpairment?: 'None' | 'Mild' | 'Moderate' | 'Severe';
	hepaticImpairment?: 'None' | 'Mild' | 'Moderate' | 'Severe';
}

/**
 * Check drug safety and get alerts
 */
export async function checkDrugSafety(
	options: DrugSafetyCheckOptions
): Promise<DrugSafetyCheckResult> {
	try {
		const response = await fetch('/api/check-drug-safety', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(options)
		});

		if (!response.ok) {
			throw new Error(`Failed to check drug safety: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error checking drug safety:', error);
		return {
			hasInfo: false,
			alerts: []
		};
	}
}

/**
 * Get CSS classes for alert severity
 */
export function getAlertSeverityClasses(severity: 'critical' | 'warning' | 'info'): string {
	switch (severity) {
		case 'critical':
			return 'bg-red-100 border-red-500 text-red-900';
		case 'warning':
			return 'bg-yellow-100 border-yellow-500 text-yellow-900';
		case 'info':
			return 'bg-blue-100 border-blue-500 text-blue-900';
		default:
			return 'bg-gray-100 border-gray-500 text-gray-900';
	}
}

/**
 * Get icon for alert severity
 */
export function getAlertIcon(severity: 'critical' | 'warning' | 'info'): string {
	switch (severity) {
		case 'critical':
			return 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z';
		case 'warning':
			return 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z';
		case 'info':
			return 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z';
		default:
			return '';
	}
}

/**
 * Get pregnancy category color
 */
export function getPregnancyCategoryColor(category: string): string {
	switch (category) {
		case 'A':
			return 'bg-green-600 text-white';
		case 'B':
			return 'bg-green-500 text-white';
		case 'C':
			return 'bg-yellow-500 text-black';
		case 'D':
			return 'bg-orange-600 text-white';
		case 'X':
			return 'bg-red-600 text-white';
		default:
			return 'bg-gray-500 text-white';
	}
}

/**
 * Get lactation risk color
 */
export function getLactationRiskColor(risk: string): string {
	switch (risk) {
		case 'Safe':
			return 'bg-green-600 text-white';
		case 'Use Caution':
			return 'bg-yellow-500 text-black';
		case 'Avoid':
			return 'bg-red-600 text-white';
		case 'Unknown':
			return 'bg-gray-500 text-white';
		default:
			return 'bg-gray-500 text-white';
	}
}
