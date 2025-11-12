<script lang="ts">
	export let sigValue: string;
	export let daysSupply: number = 30;

	interface ParsedSIG {
		dose: number;
		unit: string;
		frequency: number;
		dailyTotal: number;
		route: string;
		confidence: number;
		warnings: string[];
	}

	let parsedResult: ParsedSIG | null = null;
	let isLoading = false;

	// Debounce timer
	let debounceTimer: ReturnType<typeof setTimeout>;

	$: {
		// Parse SIG whenever it changes
		if (sigValue && sigValue.trim().length > 3) {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				parseSIG(sigValue);
			}, 500); // 500ms debounce
		} else {
			parsedResult = null;
		}
	}

	async function parseSIG(sig: string) {
		isLoading = true;
		try {
			// Simulate parsing with basic regex patterns
			const result = parseBasicSIG(sig);
			parsedResult = result;
		} catch (error) {
			console.error('Error parsing SIG:', error);
			parsedResult = null;
		} finally {
			isLoading = false;
		}
	}

	function parseBasicSIG(sig: string): ParsedSIG {
		const warnings: string[] = [];
		let confidence = 100;

		// Extract dose (numbers followed by unit words)
		const doseMatch = sig.match(/(\d+(?:\.\d+)?)\s*(tablet|capsule|ml|mg|mcg|unit|puff|spray|drop)/i);
		const dose = doseMatch ? parseFloat(doseMatch[1]) : 0;
		const unit = doseMatch ? doseMatch[2].toLowerCase() : 'dose';

		if (!doseMatch) {
			warnings.push('Dose amount not clearly specified');
			confidence -= 30;
		}

		// Extract frequency
		let frequency = 0;
		const frequencyPatterns = [
			{ pattern: /(\d+)\s*(?:times?|x)\s*(?:per\s*)?(?:day|daily)/i, multiplier: 1 },
			{ pattern: /(?:once|1x)\s*(?:per\s*)?(?:day|daily)/i, value: 1 },
			{ pattern: /(?:twice|bid|2x)\s*(?:per\s*)?(?:day|daily)?/i, value: 2 },
			{ pattern: /(?:three times|tid|3x)\s*(?:per\s*)?(?:day|daily)?/i, value: 3 },
			{ pattern: /(?:four times|qid|4x)\s*(?:per\s*)?(?:day|daily)?/i, value: 4 },
			{ pattern: /(?:every|q)\s*(\d+)\s*(?:hours?|hrs?)/i, divider: 24 }
		];

		for (const fp of frequencyPatterns) {
			const match = sig.match(fp.pattern);
			if (match) {
				if ('value' in fp) {
					frequency = fp.value;
				} else if ('multiplier' in fp) {
					frequency = parseInt(match[1]) * fp.multiplier;
				} else if ('divider' in fp && match[1]) {
					frequency = fp.divider / parseInt(match[1]);
				}
				break;
			}
		}

		if (frequency === 0) {
			warnings.push('Frequency not clearly specified');
			confidence -= 30;
		}

		// Check for unusual dosing
		if (frequency > 6) {
			warnings.push('Unusually high frequency detected');
			confidence -= 10;
		}

		if (dose > 10 && unit === 'tablet') {
			warnings.push('High dose per administration');
			confidence -= 10;
		}

		// Extract route
		const routeMatch = sig.match(/by\s*(mouth|oral|injection|topical|inhalation|nasal|rectal|ophthalmic)/i);
		const route = routeMatch ? routeMatch[1] : 'mouth';

		// Calculate daily total
		const dailyTotal = dose * frequency;

		// Check for ambiguous wording
		if (sig.match(/as\s*needed|prn/i)) {
			warnings.push('PRN dosing detected - actual quantity may vary');
			confidence -= 20;
		}

		return {
			dose,
			unit,
			frequency,
			dailyTotal,
			route,
			confidence: Math.max(0, confidence),
			warnings
		};
	}

	function getConfidenceColor(confidence: number): string {
		if (confidence >= 80) return '#10b981'; // green
		if (confidence >= 60) return '#f59e0b'; // yellow
		return '#ef4444'; // red
	}

	function getConfidenceLabel(confidence: number): string {
		if (confidence >= 80) return 'High Confidence';
		if (confidence >= 60) return 'Medium Confidence';
		return 'Low Confidence';
	}
</script>

{#if parsedResult && !isLoading}
	<div class="sig-preview rounded-lg p-4 mt-3" style="background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
		<!-- Header with Confidence -->
		<div class="flex items-center justify-between mb-3">
			<h4 class="font-semibold text-sm" style="color: var(--foreground);">
				Real-Time SIG Preview
			</h4>
			<div class="flex items-center gap-2">
				<div class="h-2 w-24 rounded-full" style="background-color: var(--border-color);">
					<div
						class="h-full rounded-full transition-all duration-300"
						style="width: {parsedResult.confidence}%; background-color: {getConfidenceColor(parsedResult.confidence)};"
					></div>
				</div>
				<span class="text-xs font-medium" style="color: {getConfidenceColor(parsedResult.confidence)};">
					{getConfidenceLabel(parsedResult.confidence)}
				</span>
			</div>
		</div>

		<!-- Parsed Interpretation -->
		<div class="rounded p-3" style="background-color: var(--card-bg); border: 1px solid rgba(16, 185, 129, 0.2);">
			<p class="text-sm font-medium" style="color: var(--accent);">
				Detected: <span style="color: var(--foreground);">{parsedResult.dose} {parsedResult.unit}{parsedResult.dose !== 1 ? 's' : ''}</span>,
				<span style="color: var(--foreground);">{parsedResult.frequency}x daily</span> =
				<span class="font-bold" style="color: var(--accent);">{parsedResult.dailyTotal} {parsedResult.unit}{parsedResult.dailyTotal !== 1 ? 's' : ''}/day</span>
			</p>
			<p class="text-xs mt-1" style="color: var(--text-muted);">
				Route: {parsedResult.route} • Total for {daysSupply} days: <span class="font-semibold">{(parsedResult.dailyTotal * daysSupply).toFixed(1)} {parsedResult.unit}{parsedResult.dailyTotal !== 1 ? 's' : ''}</span>
			</p>
		</div>

		<!-- Warnings -->
		{#if parsedResult.warnings.length > 0}
			<div class="mt-3 space-y-1">
				{#each parsedResult.warnings as warning}
					<div class="flex items-start gap-2 text-xs p-2 rounded" style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
						<svg class="w-4 h-4 flex-shrink-0 mt-0.5" style="color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
						</svg>
						<span style="color: var(--text-secondary);">{warning}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{:else if isLoading}
	<div class="sig-preview rounded-lg p-4 mt-3 flex items-center gap-2" style="background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
		<svg class="animate-spin h-4 w-4" style="color: var(--accent);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
		<span class="text-sm" style="color: var(--text-secondary);">Parsing SIG...</span>
	</div>
{/if}

<style>
	.sig-preview {
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
