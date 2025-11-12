<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount, onDestroy } from 'svelte';
	import ResultsDisplay from '$lib/components/ResultsDisplay.svelte';
	import HistorySidebar from '$lib/components/HistorySidebar.svelte';
	import BatchProcessor from '$lib/components/BatchProcessor.svelte';
	import SatisfactionWidget from '$lib/components/SatisfactionWidget.svelte';
	import DrugAutocomplete from '$lib/components/DrugAutocomplete.svelte';
	import SIGTemplatePicker from '$lib/components/SIGTemplatePicker.svelte';
	import SIGPreview from '$lib/components/SIGPreview.svelte';
	import KeyboardShortcutsHelp from '$lib/components/KeyboardShortcutsHelp.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import MultiDrugManager from '$lib/components/MultiDrugManager.svelte';
	import InventoryManager from '$lib/components/InventoryManager.svelte';
	import InventoryAlerts from '$lib/components/InventoryAlerts.svelte';
	import ControlledSubstanceValidator from '$lib/components/ControlledSubstanceValidator.svelte';
	import PatientProfileManager from '$lib/components/PatientProfileManager.svelte';
	import PatientAllergyAlert from '$lib/components/PatientAllergyAlert.svelte';
	import DemoDataManager from '$lib/components/DemoDataManager.svelte';
	import { HistoryStore } from '$lib/utils/historyStore';
	import { PatientStore, type PatientProfile } from '$lib/utils/patientStore';
	import { getKeyboardManager } from '$lib/utils/keyboardShortcuts';
	import { smartDefaults } from '$lib/utils/smartDefaults';

	let activeTab: 'single' | 'batch' | 'multi' | 'inventory' | 'patients' = 'single';
	let selectedPatient: PatientProfile | null = null;
	let drugInput = '';
	let sig = '';
	let daysSupply = 30;
	let refills = 0;
	let loading = false;
	let error = '';
	let result: any = null;
	let historySaveError = '';
	let showKeyboardHelp = false;
	let formElement: HTMLFormElement;
	let historySidebarToggle: HTMLElement;
	let drugInputElement: HTMLInputElement;
	let hasValidationErrors = false;
	let validationErrorMessages: string[] = [];
	let isPartialFill = false;
	let partialQuantity: number | null = null;

	// Auto-fill days supply based on drug history
	$: if (drugInput && drugInput.length > 3) {
		const rememberedDays = smartDefaults.getDaysSupply(drugInput);
		if (rememberedDays && rememberedDays !== daysSupply) {
			// Only update if different and user hasn't manually changed it recently
			daysSupply = rememberedDays;
		}
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		loading = true;
		error = '';
		result = null;
		historySaveError = '';

		try {
			// First, normalize the drug name
			const normalizeResponse = await fetch('/api/normalize', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ input: drugInput })
			});

			const normalizeData = await normalizeResponse.json();

			if (!normalizeData.success) {
				throw new Error(normalizeData.error || 'Failed to normalize drug name');
			}

			// Then, calculate the quantity
			const calculateResponse = await fetch('/api/calculate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rxcui: normalizeData.rxcui,
					drugName: normalizeData.drugName,
					sig,
					daysSupply
				})
			});

			const calculateData = await calculateResponse.json();

			if (!calculateData.success) {
				throw new Error(calculateData.error || 'Failed to calculate quantity');
			}

			result = calculateData;

			// Save to history (only in browser environment)
			if (typeof window !== 'undefined') {
				const saved = HistoryStore.save(drugInput, sig, daysSupply, calculateData);
				if (!saved) {
					historySaveError = 'Unable to save to history. Storage may be full.';
				}

				// Remember days supply for this drug
				smartDefaults.rememberDaysSupply(normalizeData.drugName, daysSupply);

				// Add to patient's medication history if a patient is selected
				if (selectedPatient) {
					const totalQuantity = calculateData.totalQuantity || 0;
					const dispensedQuantity = isPartialFill && partialQuantity ? partialQuantity : totalQuantity;

					PatientStore.addMedication(selectedPatient.id, {
						drugName: normalizeData.drugName,
						rxcui: normalizeData.rxcui,
						sig: sig,
						daysSupply: daysSupply,
						quantity: totalQuantity,
						prescribedDate: new Date().toISOString(),
						filledDate: new Date().toISOString(),
						refillsRemaining: refills,
						isPartialFill: isPartialFill,
						totalQuantityPrescribed: isPartialFill ? totalQuantity : undefined,
						quantityDispensed: isPartialFill ? dispensedQuantity : undefined,
						quantityRemaining: isPartialFill ? totalQuantity - dispensedQuantity : undefined,
						partialFillNumber: isPartialFill ? 1 : undefined,
						partialFillHistory: isPartialFill ? [{
							fillNumber: 1,
							fillDate: new Date().toISOString(),
							quantityDispensed: dispensedQuantity,
							quantityRemaining: totalQuantity - dispensedQuantity,
							notes: `Initial partial fill of ${dispensedQuantity} out of ${totalQuantity} total`
						}] : undefined
					});
				}
			}
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	function handleReload(reloadDrugInput: string, reloadSig: string, reloadDaysSupply: number) {
		drugInput = reloadDrugInput;
		sig = reloadSig;
		daysSupply = reloadDaysSupply;
		// Scroll to top to show the form
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function resetForm() {
		// Clear form fields
		drugInput = '';
		sig = '';
		daysSupply = 30;
		refills = 0;
		result = null;
		error = '';
		historySaveError = '';
		isPartialFill = false;
		partialQuantity = null;

		// Focus on drug input
		setTimeout(() => {
			if (drugInputElement) {
				drugInputElement.focus();
			}
		}, 100);

		// Scroll to top
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		const manager = getKeyboardManager();

		// Register shortcuts
		manager.register('submit-form', {
			key: 'Enter',
			ctrl: true,
			description: 'Submit prescription form',
			category: 'Form Actions',
			action: () => {
				if (formElement) {
					formElement.requestSubmit();
				}
			}
		});

		manager.register('toggle-history', {
			key: 'h',
			ctrl: true,
			description: 'Toggle history sidebar',
			category: 'Navigation',
			action: () => {
				// Trigger click on history toggle button
				const historyBtn = document.querySelector('[data-history-toggle]') as HTMLElement;
				if (historyBtn) {
					historyBtn.click();
				}
			}
		});

		manager.register('show-help', {
			key: '?',
			description: 'Show keyboard shortcuts help',
			category: 'Help',
			action: () => {
				showKeyboardHelp = true;
			}
		});

		manager.register('reset-form', {
			key: 'r',
			ctrl: true,
			description: 'Reset form (Calculate Another)',
			category: 'Form Actions',
			action: () => {
				resetForm();
			}
		});

		// Start listening
		manager.start();

		return () => {
			manager.stop();
		};
	});
</script>

<div class="min-h-screen" style="background-color: var(--background);">
	<!-- History Sidebar -->
	<HistorySidebar onReload={handleReload} />

	<div class="container mx-auto px-4 py-8 max-w-4xl">
		<!-- Header -->
		<div class="text-center mb-8 drop-in-1 relative">
			<div class="absolute top-0 right-0">
				<ThemeToggle />
			</div>
			<h1 class="text-4xl font-bold mb-2" style="color: var(--accent);">PharmaMax</h1>
			<p class="text-lg" style="color: var(--text-secondary);">NDC Packaging & Quantity Calculator</p>
			<p class="text-sm mt-1" style="color: var(--text-muted);">AI-Accelerated Prescription Fulfillment Tool</p>
		</div>

		<!-- Tab Navigation -->
		<div class="rounded-t-lg shadow-lg overflow-hidden mb-0 drop-in-2" style="background-color: var(--card-bg);">
			<div class="flex" style="border-bottom: 1px solid var(--border-color);">
				<button
					on:click={() => activeTab = 'single'}
					class="flex-1 px-6 py-4 text-sm font-medium transition"
					style="{activeTab === 'single'
						? `background-color: var(--card-bg); color: var(--accent); border-bottom: 2px solid var(--accent);`
						: `background-color: var(--background); color: var(--text-secondary);`}"
				>
					Single Prescription
				</button>
				<button
					on:click={() => activeTab = 'batch'}
					class="flex-1 px-6 py-4 text-sm font-medium transition"
					style="{activeTab === 'batch'
						? `background-color: var(--card-bg); color: var(--accent); border-bottom: 2px solid var(--accent);`
						: `background-color: var(--background); color: var(--text-secondary);`}"
				>
					Batch Processing
				</button>
				<button
					on:click={() => activeTab = 'multi'}
					class="flex-1 px-6 py-4 text-sm font-medium transition"
					style="{activeTab === 'multi'
						? `background-color: var(--card-bg); color: var(--accent); border-bottom: 2px solid var(--accent);`
						: `background-color: var(--background); color: var(--text-secondary);`}"
				>
					Multi-Drug Rx
				</button>
				<button
					on:click={() => activeTab = 'inventory'}
					class="flex-1 px-6 py-4 text-sm font-medium transition"
					style="{activeTab === 'inventory'
						? `background-color: var(--card-bg); color: var(--accent); border-bottom: 2px solid var(--accent);`
						: `background-color: var(--background); color: var(--text-secondary);`}"
				>
					Inventory
				</button>
				<button
					on:click={() => activeTab = 'patients'}
					class="flex-1 px-6 py-4 text-sm font-medium transition"
					style="{activeTab === 'patients'
						? `background-color: var(--card-bg); color: var(--accent); border-bottom: 2px solid var(--accent);`
						: `background-color: var(--background); color: var(--text-secondary);`}"
				>
					Patients
				</button>
			</div>
		</div>

		<!-- Inventory Alerts (show across all tabs) -->
		<InventoryAlerts />

		{#if activeTab === 'single'}
		<!-- Main Calculator Card -->
		<div class="card-hover rounded-lg shadow-lg p-8 mb-8 drop-in-3" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
			<h2 class="text-2xl font-semibold mb-6" style="color: var(--foreground);">
				Calculate Prescription Quantity
				<button
					type="button"
					on:click={() => showKeyboardHelp = true}
					class="ml-2 text-xs px-2 py-1 rounded"
					style="background-color: var(--border-color); color: var(--text-secondary);"
					title="Show keyboard shortcuts (Press ?)"
				>
					?
				</button>
			</h2>

			<form bind:this={formElement} on:submit={handleSubmit} class="space-y-6">
				<!-- Selected Patient Display -->
				{#if selectedPatient}
					<div class="p-4 rounded-lg mb-4" style="background-color: var(--success-bg); border: 1px solid var(--success);">
						<div class="flex justify-between items-center">
							<div>
								<span class="text-sm" style="color: var(--text-secondary);">Selected Patient:</span>
								<span class="font-semibold ml-2" style="color: var(--foreground);">{selectedPatient.name}</span>
								<span class="text-sm ml-2" style="color: var(--text-muted);">
									(DOB: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()})
								</span>
							</div>
							<button
								type="button"
								on:click={() => selectedPatient = null}
								class="text-sm px-3 py-1 rounded"
								style="color: var(--text-muted); hover:color: var(--foreground);"
							>
								Clear
							</button>
						</div>
					</div>
				{/if}

				<!-- Drug Name/NDC Input with Autocomplete -->
				<div>
					<label for="drugInput" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
						Drug Name or NDC
					</label>
					<DrugAutocomplete bind:value={drugInput} bind:inputElement={drugInputElement} required />
					<p class="mt-1 text-sm" style="color: var(--text-muted);">
						Enter a drug name or 11-digit NDC code. Start typing to see suggestions.
					</p>
				</div>

				<!-- Allergy Alert -->
				<PatientAllergyAlert patient={selectedPatient} drugName={drugInput} />

				<!-- SIG Input with Templates -->
				<div>
					<label for="sig" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
						SIG (Prescription Instructions)
					</label>

					<!-- SIG Template Picker -->
					<SIGTemplatePicker onSelect={(template) => (sig = template)} currentValue={sig} />

					<input
						id="sig"
						type="text"
						bind:value={sig}
						required
						placeholder="e.g., Take 2 tablets by mouth twice daily"
						class="input-text w-full px-4 py-3 rounded-lg transition"
					/>

					<!-- Real-Time SIG Preview -->
					<SIGPreview sigValue={sig} daysSupply={daysSupply} />

					<div class="mt-2 p-3 rounded" style="background-color: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2);">
						<p class="text-xs font-medium mb-1" style="color: var(--accent);">Quick tip:</p>
						<p class="text-xs" style="color: var(--text-muted);">
							Use the quick-fill buttons above or click "Templates" to browse pre-built SIG templates
						</p>
					</div>
				</div>

				<!-- Days' Supply Input -->
				<div>
					<label for="daysSupply" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
						Days' Supply
					</label>
					<input
						id="daysSupply"
						type="number"
						bind:value={daysSupply}
						required
						min="1"
						max="365"
						class="input-text w-full px-4 py-3 rounded-lg transition"
					/>
					<p class="mt-1 text-sm" style="color: var(--text-muted);">Number of days the prescription should last</p>
				</div>

				<!-- Refills Input -->
				<div>
					<label for="refills" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
						Refills
					</label>
					<input
						id="refills"
						type="number"
						bind:value={refills}
						required
						min="0"
						max="12"
						class="input-text w-full px-4 py-3 rounded-lg transition"
					/>
					<p class="mt-1 text-sm" style="color: var(--text-muted);">Number of refills allowed (subject to DEA limits for controlled substances)</p>
				</div>

				<!-- Partial Fill Toggle -->
				<div class="p-4 rounded-lg" style="background-color: var(--background); border: 1px solid var(--border-color);">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="partialFill"
								type="checkbox"
								bind:checked={isPartialFill}
								class="h-4 w-4 rounded transition"
								style="accent-color: var(--accent);"
							/>
						</div>
						<div class="ml-3">
							<label for="partialFill" class="font-medium" style="color: var(--foreground);">
								Partial Fill
							</label>
							<p class="text-sm" style="color: var(--text-muted);">
								Enable to dispense only part of the total quantity now, with remaining quantity to be filled later
							</p>
						</div>
					</div>

					{#if isPartialFill}
						<div class="mt-4 transition-all">
							<label for="partialQuantity" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
								Quantity to Dispense Now
							</label>
							<input
								id="partialQuantity"
								type="number"
								bind:value={partialQuantity}
								required={isPartialFill}
								min="1"
								placeholder="Enter quantity to dispense"
								class="input-text w-full px-4 py-3 rounded-lg transition"
							/>
							<p class="mt-1 text-sm" style="color: var(--text-muted);">
								This amount will be dispensed now. Remaining quantity will be tracked for future fills.
							</p>
						</div>
					{/if}
				</div>

				<!-- Controlled Substance Validation -->
				<ControlledSubstanceValidator
					drugName={drugInput}
					daysSupply={daysSupply}
					refills={refills}
					onValidationChange={(isValid, errors) => {
						hasValidationErrors = !isValid;
						validationErrorMessages = errors;
					}}
				/>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={loading || hasValidationErrors}
					class="btn-primary w-full font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
					class:opacity-50={hasValidationErrors}
					class:cursor-not-allowed={hasValidationErrors}
					title={hasValidationErrors ? 'Please fix validation errors before submitting' : ''}
				>
					{#if loading}
						<svg class="animate-spin -ml-1 mr-3 h-5 w-5" style="color: var(--background);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Calculating...
					{:else}
						Calculate Quantity
					{/if}
				</button>
			</form>

			<!-- Error Display -->
			{#if error}
				<div class="mt-6 rounded-lg p-4 state-error">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5" style="color: var(--accent);" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium">Error</h3>
							<p class="mt-1 text-sm">{error}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- History Save Warning -->
			{#if historySaveError}
				<div class="mt-4 rounded-lg p-4" style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5" style="color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium" style="color: #f59e0b;">Warning</h3>
							<p class="mt-1 text-sm" style="color: var(--text-secondary);">{historySaveError}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Results Display -->
			{#if result}
				<div class="mt-6">
					<ResultsDisplay
						{result}
						{isPartialFill}
						{partialQuantity}
						patientInsurancePlanId={selectedPatient?.insuranceProvider || null}
					/>

					<!-- Calculate Another Button -->
					<div class="mt-6 flex justify-center">
						<button
							type="button"
							on:click={resetForm}
							class="btn-primary px-8 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
							title="Reset form (Ctrl+R)"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Calculate Another
						</button>
					</div>
				</div>
			{/if}
		</div>
		{:else if activeTab === 'batch'}
		<!-- Batch Processing -->
		<BatchProcessor />
		{:else if activeTab === 'multi'}
		<!-- Multi-Drug Prescription Manager -->
		<div class="rounded-lg shadow-lg p-8 mb-8 drop-in-3" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
			<MultiDrugManager />
		</div>
		{:else if activeTab === 'inventory'}
		<!-- Inventory Manager -->
		<div class="rounded-lg shadow-lg p-8 mb-8 drop-in-3" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
			<InventoryManager />
		</div>
		{:else if activeTab === 'patients'}
		<!-- Patient Profile Manager -->
		<div class="rounded-lg shadow-lg p-8 mb-8 drop-in-3" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
			<PatientProfileManager
				bind:selectedPatient={selectedPatient}
				onPatientSelect={(patient) => {
					selectedPatient = patient;
					// Switch to single prescription tab when a patient is selected
					if (patient) {
						activeTab = 'single';
					}
				}}
			/>
		</div>
		{/if}
	</div>

	<!-- Satisfaction Widget -->
	<SatisfactionWidget />

	<!-- Info Section -->
	<div class="container mx-auto px-4 py-8 max-w-4xl">
		<div class="rounded-lg p-6" style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);">
			<h3 class="text-lg font-semibold mb-2" style="color: var(--accent);">How it works</h3>
			<ul class="space-y-2 text-sm" style="color: var(--text-secondary);">
				<li class="flex items-start">
					<span class="mr-2">1.</span>
					<span>Enter a drug name or NDC code to identify the medication</span>
				</li>
				<li class="flex items-start">
					<span class="mr-2">2.</span>
					<span>Provide the prescription instructions (SIG) for AI-powered parsing</span>
				</li>
				<li class="flex items-start">
					<span class="mr-2">3.</span>
					<span>Specify the days' supply to calculate total quantity needed</span>
				</li>
				<li class="flex items-start">
					<span class="mr-2">4.</span>
					<span>Get optimal NDC recommendations and package combinations</span>
				</li>
			</ul>
		</div>
	</div>

	<!-- Keyboard Shortcuts Help Modal -->
	<KeyboardShortcutsHelp show={showKeyboardHelp} onClose={() => showKeyboardHelp = false} />

	<!-- Demo Data Manager -->
	<DemoDataManager />
</div>
