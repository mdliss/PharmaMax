/**
 * SIG Template Library
 * Pre-built templates for common medications and dosing patterns
 */

export interface SIGTemplate {
	id: string;
	name: string;
	category: string;
	template: string;
	description?: string;
	tags?: string[];
}

export const SIG_TEMPLATES: SIGTemplate[] = [
	// Antibiotics
	{
		id: 'antibiotic-bid-7d',
		name: 'Antibiotic - BID 7 days',
		category: 'Antibiotics',
		template: 'Take 1 tablet by mouth twice daily for 7 days',
		description: 'Standard antibiotic course',
		tags: ['antibiotic', 'BID', '7 days']
	},
	{
		id: 'antibiotic-tid-10d',
		name: 'Antibiotic - TID 10 days',
		category: 'Antibiotics',
		template: 'Take 1 tablet by mouth three times daily for 10 days',
		description: 'Extended antibiotic course',
		tags: ['antibiotic', 'TID', '10 days']
	},
	{
		id: 'antibiotic-suspension',
		name: 'Antibiotic Suspension - BID',
		category: 'Antibiotics',
		template: 'Take 5 mL by mouth twice daily for 10 days',
		description: 'Liquid antibiotic for pediatrics',
		tags: ['antibiotic', 'liquid', 'BID']
	},

	// Cardiovascular
	{
		id: 'statin-qd',
		name: 'Statin - QD',
		category: 'Cardiovascular',
		template: 'Take 1 tablet by mouth once daily at bedtime',
		description: 'Standard statin dosing',
		tags: ['statin', 'QD', 'cardiovascular']
	},
	{
		id: 'ace-inhibitor-qd',
		name: 'ACE Inhibitor - QD',
		category: 'Cardiovascular',
		template: 'Take 1 tablet by mouth once daily',
		description: 'Blood pressure medication',
		tags: ['ACE', 'blood pressure', 'QD']
	},
	{
		id: 'beta-blocker-bid',
		name: 'Beta Blocker - BID',
		category: 'Cardiovascular',
		template: 'Take 1 tablet by mouth twice daily',
		description: 'Beta blocker dosing',
		tags: ['beta blocker', 'BID', 'cardiovascular']
	},
	{
		id: 'diuretic-qd-morning',
		name: 'Diuretic - QD Morning',
		category: 'Cardiovascular',
		template: 'Take 1 tablet by mouth once daily in the morning',
		description: 'Water pill',
		tags: ['diuretic', 'QD', 'morning']
	},

	// Diabetes
	{
		id: 'metformin-bid',
		name: 'Metformin - BID',
		category: 'Diabetes',
		template: 'Take 1 tablet by mouth twice daily with meals',
		description: 'Oral diabetes medication',
		tags: ['diabetes', 'metformin', 'BID']
	},
	{
		id: 'insulin-basal-qd',
		name: 'Basal Insulin - QD',
		category: 'Diabetes',
		template: 'Inject 10 units subcutaneously once daily at bedtime',
		description: 'Long-acting insulin',
		tags: ['insulin', 'basal', 'QD']
	},
	{
		id: 'insulin-mealtime',
		name: 'Mealtime Insulin',
		category: 'Diabetes',
		template: 'Inject 5 units subcutaneously before each meal',
		description: 'Rapid-acting insulin',
		tags: ['insulin', 'rapid', 'mealtime']
	},

	// Pain Management
	{
		id: 'nsaid-prn',
		name: 'NSAID - PRN',
		category: 'Pain',
		template: 'Take 1 tablet by mouth every 6 hours as needed for pain',
		description: 'Pain reliever as needed',
		tags: ['NSAID', 'PRN', 'pain']
	},
	{
		id: 'acetaminophen-q4h',
		name: 'Acetaminophen - Q4H PRN',
		category: 'Pain',
		template: 'Take 2 tablets by mouth every 4 hours as needed for pain or fever',
		description: 'Tylenol dosing',
		tags: ['acetaminophen', 'PRN', 'pain']
	},
	{
		id: 'opioid-prn',
		name: 'Opioid - PRN',
		category: 'Pain',
		template: 'Take 1 tablet by mouth every 4-6 hours as needed for severe pain',
		description: 'Narcotic pain reliever',
		tags: ['opioid', 'PRN', 'pain']
	},

	// Respiratory
	{
		id: 'inhaler-bid',
		name: 'Maintenance Inhaler - BID',
		category: 'Respiratory',
		template: 'Inhale 2 puffs twice daily',
		description: 'Controller inhaler',
		tags: ['inhaler', 'BID', 'respiratory']
	},
	{
		id: 'rescue-inhaler-prn',
		name: 'Rescue Inhaler - PRN',
		category: 'Respiratory',
		template: 'Inhale 1-2 puffs every 4 hours as needed for shortness of breath',
		description: 'Albuterol rescue inhaler',
		tags: ['inhaler', 'PRN', 'rescue']
	},

	// Mental Health
	{
		id: 'ssri-qd',
		name: 'SSRI - QD',
		category: 'Mental Health',
		template: 'Take 1 tablet by mouth once daily in the morning',
		description: 'Antidepressant',
		tags: ['SSRI', 'QD', 'depression']
	},
	{
		id: 'benzodiazepine-prn',
		name: 'Benzodiazepine - PRN',
		category: 'Mental Health',
		template: 'Take 1 tablet by mouth as needed for anxiety, up to 3 times daily',
		description: 'Anti-anxiety PRN',
		tags: ['benzodiazepine', 'PRN', 'anxiety']
	},

	// GI
	{
		id: 'ppi-qd',
		name: 'PPI - QD',
		category: 'Gastrointestinal',
		template: 'Take 1 capsule by mouth once daily 30 minutes before breakfast',
		description: 'Proton pump inhibitor',
		tags: ['PPI', 'QD', 'GERD']
	},
	{
		id: 'h2-blocker-bid',
		name: 'H2 Blocker - BID',
		category: 'Gastrointestinal',
		template: 'Take 1 tablet by mouth twice daily',
		description: 'Acid reducer',
		tags: ['H2', 'BID', 'GERD']
	},

	// Thyroid
	{
		id: 'levothyroxine-qd',
		name: 'Levothyroxine - QD',
		category: 'Thyroid',
		template: 'Take 1 tablet by mouth once daily on empty stomach, 30 minutes before breakfast',
		description: 'Thyroid hormone replacement',
		tags: ['thyroid', 'QD', 'levothyroxine']
	}
];

export const FREQUENCY_TEMPLATES = [
	{ label: 'QD', full: 'once daily', template: 'Take {dose} by mouth once daily' },
	{ label: 'BID', full: 'twice daily', template: 'Take {dose} by mouth twice daily' },
	{ label: 'TID', full: 'three times daily', template: 'Take {dose} by mouth three times daily' },
	{ label: 'QID', full: 'four times daily', template: 'Take {dose} by mouth four times daily' },
	{ label: 'Q4H', full: 'every 4 hours', template: 'Take {dose} by mouth every 4 hours' },
	{ label: 'Q6H', full: 'every 6 hours', template: 'Take {dose} by mouth every 6 hours' },
	{ label: 'Q8H', full: 'every 8 hours', template: 'Take {dose} by mouth every 8 hours' },
	{ label: 'Q12H', full: 'every 12 hours', template: 'Take {dose} by mouth every 12 hours' },
	{ label: 'QHS', full: 'at bedtime', template: 'Take {dose} by mouth at bedtime' },
	{ label: 'PRN', full: 'as needed', template: 'Take {dose} by mouth as needed' }
];

export const DOSE_AMOUNTS = [
	'1 tablet',
	'2 tablets',
	'1/2 tablet',
	'1 capsule',
	'2 capsules',
	'5 mL',
	'10 mL',
	'15 mL',
	'1 teaspoon',
	'2 teaspoons',
	'1 tablespoon'
];

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
	const categories = new Set(SIG_TEMPLATES.map(t => t.category));
	return Array.from(categories).sort();
}

/**
 * Filter templates by category
 */
export function getTemplatesByCategory(category: string): SIGTemplate[] {
	return SIG_TEMPLATES.filter(t => t.category === category);
}

/**
 * Search templates by name or tags
 */
export function searchTemplates(query: string): SIGTemplate[] {
	const lowerQuery = query.toLowerCase();
	return SIG_TEMPLATES.filter(
		t =>
			t.name.toLowerCase().includes(lowerQuery) ||
			t.template.toLowerCase().includes(lowerQuery) ||
			t.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
	);
}
