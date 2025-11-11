<script lang="ts">
	import {
		prescriptionStore,
		totalPrescriptionCost,
		isPrescriptionReady,
		type PrescriptionMedication
	} from '$lib/utils/prescriptionStore';
	import DrugAutocomplete from './DrugAutocomplete.svelte';
	import SIGTemplatePicker from './SIGTemplatePicker.svelte';
	import { onMount } from 'svelte';
	import html2canvas from 'html2canvas';
	import jsPDF from 'jspdf';

	let medications: PrescriptionMedication[] = [];
	let showManager = false;
	let interactionResults: any = null;
	let checkingInteractions = false;
	let interactionError = '';

	prescriptionStore.subscribe(value => {
		medications = value;
	});

	onMount(() => {
		// Start with one empty medication
		if (medications.length === 0) {
			prescriptionStore.addMedication();
		}
	});

	function addMedication() {
		prescriptionStore.addMedication();
	}

	function removeMedication(id: string) {
		prescriptionStore.removeMedication(id);
	}

	function handleDrugSelect(id: string, event: CustomEvent) {
		const drugInfo = event.detail;
		prescriptionStore.updateMedication(id, {
			drugName: drugInfo.name,
			drugInfo: drugInfo
		});
	}

	function handleSIGSelect(id: string, event: CustomEvent) {
		const sig = event.detail;
		prescriptionStore.updateMedication(id, { sig });
	}

	function toggleManager() {
		showManager = !showManager;
	}

	function clearAll() {
		if (confirm('Clear all medications?')) {
			prescriptionStore.clear();
			prescriptionStore.addMedication();
			interactionResults = null;
		}
	}

	async function checkInteractions() {
		// Filter out medications without drug names
		const validMeds = medications.filter(med => med.drugName);

		if (validMeds.length < 2) {
			interactionError = 'Please add at least 2 medications to check interactions';
			return;
		}

		checkingInteractions = true;
		interactionError = '';
		interactionResults = null;

		try {
			const response = await fetch('/api/check-interactions-multi', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					medications: validMeds.map(med => med.drugName)
				})
			});

			const data = await response.json();

			if (!data.success) {
				throw new Error(data.error || 'Failed to check interactions');
			}

			interactionResults = data;
		} catch (e: any) {
			interactionError = e.message;
		} finally {
			checkingInteractions = false;
		}
	}

	function getSeverityColor(severity: string): string {
		switch (severity?.toLowerCase()) {
			case 'safe':
				return 'bg-green-100 text-green-800 border-green-300';
			case 'caution':
				return 'bg-yellow-100 text-yellow-800 border-yellow-300';
			case 'dangerous':
				return 'bg-red-100 text-red-800 border-red-300';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-300';
		}
	}

	function getRiskColor(risk: string): string {
		switch (risk?.toLowerCase()) {
			case 'low':
				return 'bg-green-50 border-green-300 text-green-800';
			case 'moderate':
				return 'bg-yellow-50 border-yellow-300 text-yellow-800';
			case 'high':
				return 'bg-red-50 border-red-300 text-red-800';
			default:
				return 'bg-gray-50 border-gray-300 text-gray-800';
		}
	}

	async function exportToPDF() {
		const exportElement = document.getElementById('prescription-export-view');
		if (!exportElement) return;

		try {
			const canvas = await html2canvas(exportElement, {
				scale: 2,
				backgroundColor: '#ffffff'
			});

			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4'
			});

			const imgWidth = 210; // A4 width in mm
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
			pdf.save(`multi-drug-prescription-${Date.now()}.pdf`);
		} catch (error) {
			console.error('Failed to export PDF:', error);
			alert('Failed to export PDF. Please try again.');
		}
	}

	function exportToCSV() {
		const validMeds = medications.filter(m => m.drugName);
		if (validMeds.length === 0) return;

		const headers = ['Drug Name', 'SIG', 'Quantity', 'Days Supply', 'Unit', 'Price'];
		const rows = validMeds.map(med => [
			med.drugName,
			med.sig || '',
			med.quantity.toString(),
			med.daysSupply.toString(),
			med.unit,
			med.price !== undefined ? `$${med.price.toFixed(2)}` : 'Not set'
		]);

		// Add total cost row
		rows.push(['', '', '', '', 'Total:', `$${$totalPrescriptionCost.toFixed(2)}`]);

		// Add interaction summary if available
		if (interactionResults) {
			rows.push([]); // Empty row
			rows.push(['Drug Interactions']);
			rows.push(['Overall Risk:', interactionResults.overallRisk]);
			rows.push(['Summary:', interactionResults.overallSummary]);
			rows.push([]); // Empty row
			rows.push(['Drug 1', 'Drug 2', 'Severity', 'Warning']);
			interactionResults.interactions.forEach((interaction: any) => {
				rows.push([
					interaction.drug1,
					interaction.drug2,
					interaction.severity,
					interaction.warning
				]);
			});
		}

		const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `multi-drug-prescription-${Date.now()}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div class="multi-drug-manager">
	<button
		type="button"
		on:click={toggleManager}
		class="manager-toggle btn-primary px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl font-medium"
	>
		{showManager ? 'Hide' : 'Open'} Multi-Drug Prescription Manager
		{#if medications.length > 0}
			<span class="badge">{medications.length}</span>
		{/if}
	</button>

	{#if showManager}
		<div class="manager-panel rounded-xl shadow-xl p-6 mt-4" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
			<div class="header flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold" style="color: var(--foreground);">
					Multi-Drug Prescription Manager
				</h2>
				<div class="actions flex gap-2">
					<button
						type="button"
						on:click={addMedication}
						class="btn-primary px-4 py-2 rounded-lg font-medium"
					>
						Add Medication
					</button>
					<button
						type="button"
						on:click={clearAll}
						class="px-4 py-2 rounded-lg font-medium"
						style="background-color: #ef4444; color: white;"
					>
						Clear All
					</button>
				</div>
			</div>

			<div class="medications-list space-y-4">
				{#each medications as med, index (med.id)}
					<div class="medication-entry card-hover rounded-lg p-6 transition-all" style="background-color: var(--background); border: 1px solid var(--border-color);">
						<div class="entry-header flex justify-between items-center mb-4">
							<h3 class="text-lg font-semibold" style="color: var(--foreground);">
								Medication #{index + 1}
							</h3>
							{#if medications.length > 1}
								<button
									type="button"
									on:click={() => removeMedication(med.id)}
									class="font-medium"
									style="color: #ef4444;"
								>
									❌ Remove
								</button>
							{/if}
						</div>

						<div class="entry-content grid gap-4">
							<!-- Drug Name Autocomplete -->
							<div class="form-group">
								<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
									Drug Name
								</label>
								<DrugAutocomplete
									on:select={e => handleDrugSelect(med.id, e)}
									placeholder="Search for medication..."
								/>
								{#if med.drugName}
									<p class="text-sm mt-1" style="color: var(--accent);">{med.drugName}</p>
								{/if}
							</div>

							<!-- SIG -->
							<div class="form-group">
								<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
									SIG (Directions)
								</label>
								<div class="sig-input-group flex gap-2">
									<input
										type="text"
										bind:value={med.sig}
										placeholder="e.g., Take 1 tablet by mouth daily"
										class="input-text flex-1 px-4 py-2 rounded-lg transition-all"
									/>
									<SIGTemplatePicker on:select={e => handleSIGSelect(med.id, e)} />
								</div>
							</div>

							<!-- Quantity, Days Supply, Unit -->
							<div class="grid grid-cols-3 gap-4">
								<div class="form-group">
									<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
										Quantity
									</label>
									<input
										type="number"
										bind:value={med.quantity}
										min="0"
										step="0.1"
										class="input-text w-full px-4 py-2 rounded-lg transition-all"
									/>
								</div>

								<div class="form-group">
									<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
										Days Supply
									</label>
									<input
										type="number"
										bind:value={med.daysSupply}
										min="1"
										class="input-text w-full px-4 py-2 rounded-lg transition-all"
									/>
								</div>

								<div class="form-group">
									<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
										Unit
									</label>
									<select
										bind:value={med.unit}
										class="input-select w-full px-4 py-2 rounded-lg transition-all"
									>
										<option value="tablet">Tablet</option>
										<option value="capsule">Capsule</option>
										<option value="ml">mL</option>
										<option value="gram">Gram</option>
										<option value="unit">Unit</option>
										<option value="spray">Spray</option>
										<option value="puff">Puff</option>
										<option value="patch">Patch</option>
										<option value="drop">Drop</option>
									</select>
								</div>
							</div>

							<!-- Price (Optional) -->
							<div class="form-group">
								<label class="block text-sm font-semibold mb-2" style="color: var(--text-secondary);">
									Price (Optional)
								</label>
								<input
									type="number"
									bind:value={med.price}
									min="0"
									step="0.01"
									placeholder="Enter price..."
									class="input-text w-full px-4 py-2 rounded-lg transition-all"
								/>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Summary -->
			<div class="summary rounded-lg p-6 mt-6" style="background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3);">
				<h3 class="text-xl font-bold mb-4" style="color: var(--foreground);">Prescription Summary</h3>
				<div class="summary-grid grid grid-cols-2 gap-4 mb-6">
					<div class="summary-item">
						<span class="label font-medium" style="color: var(--text-secondary);">Total Medications:</span>
						<span class="value text-2xl font-bold" style="color: var(--accent);">{medications.length}</span>
					</div>
					<div class="summary-item">
						<span class="label font-medium" style="color: var(--text-secondary);">Total Cost:</span>
						<span class="value text-2xl font-bold" style="color: #10b981;"
							>${$totalPrescriptionCost.toFixed(2)}</span
						>
					</div>
				</div>

				<!-- Cost Breakdown -->
				{#if medications.some(m => m.price !== undefined && m.price > 0)}
					<div class="cost-breakdown rounded-lg p-4" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
						<h4 class="font-bold mb-3" style="color: var(--foreground);">Cost Breakdown</h4>
						<div class="space-y-2">
							{#each medications.filter(m => m.drugName) as med}
								<div class="flex justify-between items-center py-2" style="border-bottom: 1px solid var(--border-color);">
									<div class="flex-1">
										<span class="font-medium" style="color: var(--foreground);">{med.drugName}</span>
										{#if med.quantity > 0}
											<span class="text-sm ml-2" style="color: var(--text-muted);">
												({med.quantity} {med.unit}{med.quantity !== 1 ? 's' : ''})
											</span>
										{/if}
									</div>
									<div class="font-bold" style="color: var(--foreground);">
										{#if med.price !== undefined && med.price > 0}
											${med.price.toFixed(2)}
										{:else}
											<span style="color: var(--text-muted);">Not set</span>
										{/if}
									</div>
								</div>
							{/each}
							<div class="flex justify-between items-center py-3 mt-2" style="border-top: 2px solid var(--accent);">
								<span class="font-bold text-lg" style="color: var(--foreground);">Total:</span>
								<span class="font-bold text-xl" style="color: #10b981;">
									${$totalPrescriptionCost.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				{/if}
				{#if !$isPrescriptionReady}
					<p class="mt-4 font-medium" style="color: #f59e0b;">
						Complete all medication details to proceed
					</p>
				{:else}
					<p class="mt-4 font-medium" style="color: #10b981;">Prescription is ready to process</p>
				{/if}

				<!-- Interaction Checker Button -->
				{#if medications.filter(m => m.drugName).length >= 2}
					<div class="mt-4">
						<button
							type="button"
							on:click={checkInteractions}
							disabled={checkingInteractions}
							class="btn-primary w-full px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if checkingInteractions}
								Checking Drug Interactions...
							{:else}
								Check Drug Interactions
							{/if}
						</button>
					</div>
				{/if}

				<!-- Export Buttons -->
				{#if medications.filter(m => m.drugName).length > 0}
					<div class="mt-4 flex gap-3">
						<button
							type="button"
							on:click={exportToPDF}
							class="btn-secondary flex-1 px-6 py-3 rounded-lg font-medium"
						>
							Export PDF
						</button>
						<button
							type="button"
							on:click={exportToCSV}
							class="btn-primary flex-1 px-6 py-3 rounded-lg font-medium"
						>
							Export CSV
						</button>
					</div>
				{/if}
			</div>

			<!-- Interaction Results -->
			{#if interactionError}
				<div class="rounded-lg p-4 mt-6" style="background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3);">
					<p class="font-medium" style="color: #ef4444;">❌ {interactionError}</p>
				</div>
			{/if}

			{#if interactionResults}
				<div class="interaction-results mt-6">
					<!-- Overall Risk Summary -->
					<div class="overall-risk rounded-lg p-6" style="{
						interactionResults.overallRisk === 'Low' ? 'background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3);' :
						interactionResults.overallRisk === 'Moderate' ? 'background-color: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3);' :
						'background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3);'
					}">
						<h3 class="text-xl font-bold mb-2" style="color: var(--foreground);">
							Overall Interaction Risk: {interactionResults.overallRisk}
						</h3>
						<p class="text-sm" style="color: var(--text-secondary);">{interactionResults.overallSummary}</p>
					</div>

					<!-- Individual Interactions -->
					<div class="interactions-list mt-6 space-y-4">
						<h3 class="text-xl font-bold mb-4" style="color: var(--foreground);">Drug Pair Interactions</h3>
						{#each interactionResults.interactions as interaction}
							<div class="interaction-card rounded-lg p-4" style="{
								interaction.severity === 'Safe' ? 'background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3);' :
								interaction.severity === 'Caution' ? 'background-color: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3);' :
								'background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3);'
							}">
								<div class="flex items-start justify-between mb-2">
									<div class="flex-1">
										<h4 class="font-bold text-lg" style="color: var(--foreground);">
											{interaction.drug1} ⚡ {interaction.drug2}
										</h4>
										<span class="inline-block px-3 py-1 rounded-full text-xs font-bold mt-1" style="{
											interaction.severity === 'Safe' ? 'background-color: rgba(16, 185, 129, 0.15); color: #10b981;' :
											interaction.severity === 'Caution' ? 'background-color: rgba(245, 158, 11, 0.15); color: #f59e0b;' :
											'background-color: rgba(239, 68, 68, 0.15); color: #ef4444;'
										}">
											{interaction.severity}
										</span>
									</div>
								</div>
								<div class="mt-3">
									<p class="text-sm mb-2" style="color: var(--text-secondary);">
										<strong>Warning:</strong> {interaction.warning}
									</p>
									{#if interaction.recommendation}
										<p class="text-sm" style="color: var(--text-secondary);">
											<strong>Recommendation:</strong> {interaction.recommendation}
										</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>

					<!-- Disclaimer -->
					<div class="disclaimer rounded-lg p-4 mt-6" style="background-color: var(--background); border: 1px solid var(--border-color);">
						<p class="text-xs" style="color: var(--text-secondary);">
							<strong>Disclaimer:</strong> This tool provides general information only. Always consult
							drug interaction databases and use professional judgment. Not a substitute for clinical decision-making.
						</p>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Hidden Export View for PDF -->
	<div id="prescription-export-view" class="export-view" style="position: fixed; left: -9999px; top: 0;">
		<div style="padding: 40px; background: white; width: 800px; font-family: Arial, sans-serif;">
			<h1 style="text-align: center; color: #4f46e5; margin-bottom: 30px;">
				Multi-Drug Prescription Summary
			</h1>

			<div style="margin-bottom: 30px;">
				<h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Medications ({medications.filter(m => m.drugName).length})</h2>
				{#each medications.filter(m => m.drugName) as med, index}
					<div style="border: 1px solid #e5e7eb; padding: 15px; margin-bottom: 15px; border-radius: 8px;">
						<h3 style="color: #1f2937; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
							{index + 1}. {med.drugName}
						</h3>
						<p style="margin: 5px 0;"><strong>SIG:</strong> {med.sig || 'Not specified'}</p>
						<p style="margin: 5px 0;"><strong>Quantity:</strong> {med.quantity} {med.unit}{med.quantity !== 1 ? 's' : ''}</p>
						<p style="margin: 5px 0;"><strong>Days Supply:</strong> {med.daysSupply} days</p>
						{#if med.price !== undefined && med.price > 0}
							<p style="margin: 5px 0;"><strong>Price:</strong> ${med.price.toFixed(2)}</p>
						{/if}
					</div>
				{/each}
			</div>

			{#if medications.some(m => m.price !== undefined && m.price > 0)}
				<div style="margin-bottom: 30px; background: #f3f4f6; padding: 20px; border-radius: 8px;">
					<h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Cost Summary</h2>
					{#each medications.filter(m => m.drugName && m.price !== undefined && m.price > 0) as med}
						<div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
							<span>{med.drugName}</span>
							<span>${med.price.toFixed(2)}</span>
						</div>
					{/each}
					<div style="border-top: 2px solid #4f46e5; padding-top: 10px; margin-top: 10px; display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
						<span>Total:</span>
						<span style="color: #10b981;">${$totalPrescriptionCost.toFixed(2)}</span>
					</div>
				</div>
			{/if}

			{#if interactionResults}
				<div style="margin-bottom: 30px;">
					<h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Drug Interaction Analysis</h2>
					<div style="background: {interactionResults.overallRisk === 'Low' ? '#dcfce7' : interactionResults.overallRisk === 'Moderate' ? '#fef3c7' : '#fee2e2'}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
						<p style="margin: 0; font-weight: bold;">Overall Risk: {interactionResults.overallRisk}</p>
						<p style="margin: 10px 0 0 0;">{interactionResults.overallSummary}</p>
					</div>

					<h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">Individual Interactions:</h3>
					{#each interactionResults.interactions as interaction}
						<div style="border: 1px solid {interaction.severity === 'Safe' ? '#bbf7d0' : interaction.severity === 'Caution' ? '#fde68a' : '#fecaca'}; background: {interaction.severity === 'Safe' ? '#f0fdf4' : interaction.severity === 'Caution' ? '#fefce8' : '#fef2f2'}; padding: 15px; margin-bottom: 15px; border-radius: 8px;">
							<p style="margin: 0 0 10px 0; font-weight: bold;">{interaction.drug1} ⚡ {interaction.drug2}</p>
							<p style="margin: 0; font-size: 12px;"><strong>Severity:</strong> {interaction.severity}</p>
							<p style="margin: 10px 0 0 0; font-size: 14px;"><strong>Warning:</strong> {interaction.warning}</p>
							{#if interaction.recommendation}
								<p style="margin: 10px 0 0 0; font-size: 14px;"><strong>Recommendation:</strong> {interaction.recommendation}</p>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<div style="margin-top: 40px; padding: 15px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
				<p style="margin: 0; font-size: 11px; color: #6b7280;">
					<strong>Disclaimer:</strong> This document is for informational purposes only. Always consult drug interaction databases and use professional clinical judgment. Not a substitute for clinical decision-making.
				</p>
				<p style="margin: 10px 0 0 0; font-size: 11px; color: #6b7280;">
					Generated on: {new Date().toLocaleString()}
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.manager-toggle {
		position: relative;
	}

	.badge {
		position: absolute;
		top: -8px;
		right: -8px;
		background: #ef4444;
		color: white;
		border-radius: 9999px;
		padding: 2px 8px;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.medication-entry {
		transition: all 0.2s;
	}

	.summary-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
