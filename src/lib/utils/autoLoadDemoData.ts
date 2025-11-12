/**
 * Auto-load Demo Data
 * Automatically initializes demo data on first app load in deployed environments
 */

import { initializeDemoData, isDemoDataInitialized } from './initializeDemoData';

const AUTO_LOAD_KEY = 'pharmamax_auto_load_attempted';

/**
 * Check if auto-load should run based on environment variables
 */
function shouldAutoLoad(): boolean {
	// Check if running in browser
	if (typeof window === 'undefined') return false;

	// Check if already attempted auto-load
	if (localStorage.getItem(AUTO_LOAD_KEY) === 'true') return false;

	// Check if demo data already initialized
	if (isDemoDataInitialized()) return false;

	// Check environment variable (set at build time via PUBLIC_ prefix)
	// This will be available as import.meta.env.PUBLIC_AUTO_LOAD_DEMO_DATA
	const envAutoLoad = import.meta.env.PUBLIC_AUTO_LOAD_DEMO_DATA;

	return envAutoLoad === 'true';
}

/**
 * Automatically load demo data if conditions are met
 * Call this in your root layout or main page component
 */
export function autoLoadDemoData(): void {
	if (!shouldAutoLoad()) return;

	try {
		console.log('🚀 Auto-loading demo data for deployed environment...');

		// Mark as attempted to avoid loops
		localStorage.setItem(AUTO_LOAD_KEY, 'true');

		// Initialize the data
		initializeDemoData();

		console.log('✅ Demo data auto-loaded successfully!');
	} catch (error) {
		console.error('❌ Failed to auto-load demo data:', error);
	}
}

/**
 * Reset auto-load flag (useful for testing)
 */
export function resetAutoLoadFlag(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(AUTO_LOAD_KEY);
}
