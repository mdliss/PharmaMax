<script lang="ts">
	export let currentDrug: string;
	export let currentRxcui: string;

	let additionalMedication = '';
	let loading = false;
	let error = '';
	let result: any = null;

	async function checkInteraction() {
		if (!additionalMedication.trim()) {
			error = 'Please enter an additional medication';
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			const response = await fetch('/api/check-interaction', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					currentDrug,
					currentRxcui,
					additionalMedication
				})
			});

			const data = await response.json();

			if (!data.success) {
				throw new Error(data.error || 'Failed to check interaction');
			}

			result = data;
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	function getSeverityStyle(severity: string): string {
		switch (severity.toLowerCase()) {
			case 'safe':
			case 'no interaction':
				return 'background-color: rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.3); color: #10b981;';
			case 'caution':
			case 'moderate':
				return 'background-color: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); color: #f59e0b;';
			case 'dangerous':
			case 'severe':
			case 'major':
				return 'background-color: rgba(239, 68, 68, 0.1); border: 2px solid rgba(239, 68, 68, 0.3); color: #ef4444;';
			default:
				return 'background-color: rgba(128, 128, 128, 0.1); border: 2px solid rgba(128, 128, 128, 0.3); color: var(--text-secondary);';
		}
	}

	function getSeverityIcon(severity: string): string {
		switch (severity.toLowerCase()) {
			case 'safe':
			case 'no interaction':
				return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
			case 'caution':
			case 'moderate':
				return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
			case 'dangerous':
			case 'severe':
			case 'major':
				return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
			default:
				return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
		}
	}
</script>

<div class="card-hover rounded-lg p-6 mt-6" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
	<h3 class="text-xl font-semibold mb-4 flex items-center gap-2" style="color: var(--accent);">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
			/>
		</svg>
		Check Drug Interaction
	</h3>

	<p class="text-sm mb-4" style="color: var(--text-secondary);">
		Verify if <strong style="color: var(--foreground);">{currentDrug}</strong> interacts with another medication.
	</p>

	<div class="space-y-4">
		<!-- Input field -->
		<div>
			<label for="additionalMed" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
				Additional Medication
			</label>
			<div class="flex gap-2">
				<input
					id="additionalMed"
					type="text"
					bind:value={additionalMedication}
					placeholder="e.g., Aspirin, Warfarin"
					class="input-text flex-1 px-4 py-2 rounded-lg transition"
					disabled={loading}
				/>
				<button
					on:click={checkInteraction}
					disabled={loading || !additionalMedication.trim()}
					class="btn-primary px-6 py-2 font-medium rounded-lg transition flex items-center gap-2"
				>
					{#if loading}
						<svg class="animate-spin h-5 w-5" style="color: var(--background);" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Checking...
					{:else}
						Check
					{/if}
				</button>
			</div>
		</div>

		<!-- Error display -->
		{#if error}
			<div class="rounded-lg p-3 state-error">
				<p class="text-sm">{error}</p>
			</div>
		{/if}

		<!-- Result display -->
		{#if result}
			<div class="pt-4" style="border-top: 1px solid var(--border-color);">
				<div class="p-4 rounded-lg" style={getSeverityStyle(result.severity)}>
					<div class="flex items-start gap-3">
						<svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d={getSeverityIcon(result.severity)}
							/>
						</svg>
						<div class="flex-1">
							<h4 class="font-semibold text-lg mb-2">
								Interaction Severity: {result.severity}
							</h4>
							<p class="text-sm mb-3 opacity-90">{result.warning}</p>
							{#if result.recommendation}
								<p class="text-sm font-medium">
									<span class="font-semibold">Recommendation:</span>
									{result.recommendation}
								</p>
							{/if}
						</div>
					</div>
				</div>

				<!-- Disclaimer -->
				<div class="mt-4 rounded-lg p-3" style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
					<p class="text-xs" style="color: var(--text-secondary);">
						<strong style="color: #f59e0b;">⚠️ AI-Generated Content Disclaimer:</strong> This interaction check is provided
						by AI and is for informational purposes only. Always consult with a healthcare professional
						or pharmacist before making any decisions about medication combinations. This tool should
						not replace professional medical advice.
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>
