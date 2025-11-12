<script lang="ts">
	import { onMount } from 'svelte';
	import JsBarcode from 'jsbarcode';
	import QRCode from 'qrcode';
	import jsPDF from 'jspdf';
	import html2canvas from 'html2canvas';

	export let prescription: {
		drugName: string;
		sig: string;
		daysSupply: number;
		calculation: {
			parsedSig: {
				dose: string;
				frequency: string;
				unit: string;
			};
			totalQuantityNeeded: number;
			unit: string;
		};
		recommendation: {
			packages: Array<{
				ndc: string;
				quantity: number;
				packageSize: number;
			}>;
			totalDispensed: number;
		};
		patient?: {
			name: string;
			dateOfBirth?: string;
		};
		prescriber?: {
			name: string;
			npi?: string;
		};
		rxNumber?: string;
		fillDate?: string;
		refills?: number;
		isPartialFill?: boolean;
		partialQuantity?: number;
		isControlledSubstance?: boolean;
		deaSchedule?: string;
	};

	let mounted = false;
	let barcodeCanvas: HTMLCanvasElement;
	let qrCanvas: HTMLCanvasElement;
	let labelElement: HTMLElement;
	let exportingPDF = false;

	onMount(() => {
		mounted = true;
		generateBarcode();
		generateQRCode();
	});

	function generateBarcode() {
		if (barcodeCanvas) {
			try {
				JsBarcode(barcodeCanvas, getRxNumber(), {
					format: 'CODE128',
					width: 2,
					height: 50,
					displayValue: false,
					margin: 5
				});
			} catch (e) {
				console.error('Barcode generation failed:', e);
			}
		}
	}

	async function generateQRCode() {
		if (qrCanvas) {
			try {
				const prescriptionData = JSON.stringify({
					rx: getRxNumber(),
					drug: prescription.drugName,
					quantity: prescription.calculation.totalQuantityNeeded,
					unit: prescription.calculation.unit,
					sig: prescription.sig,
					daysSupply: prescription.daysSupply,
					date: formatDate(prescription.fillDate)
				});

				await QRCode.toCanvas(qrCanvas, prescriptionData, {
					width: 80,
					margin: 1,
					color: {
						dark: '#000000',
						light: '#FFFFFF'
					}
				});
			} catch (e) {
				console.error('QR code generation failed:', e);
			}
		}
	}

	// Format date for display
	function formatDate(dateString?: string): string {
		if (!dateString) {
			return new Date().toLocaleDateString('en-US');
		}
		return new Date(dateString).toLocaleDateString('en-US');
	}

	// Generate a random Rx number if not provided
	function getRxNumber(): string {
		return prescription.rxNumber || `RX${Math.floor(Math.random() * 1000000)}`;
	}

	// Calculate expiration date (typically 1 year from fill date)
	function getExpirationDate(): string {
		const fillDate = prescription.fillDate ? new Date(prescription.fillDate) : new Date();
		const expDate = new Date(fillDate);
		expDate.setFullYear(expDate.getFullYear() + 1);
		return expDate.toLocaleDateString('en-US');
	}

	// Get pharmacist initials (placeholder for actual implementation)
	function getPharmacistInitials(): string {
		return 'RPH';
	}

	// Export label as PDF
	async function exportAsPDF() {
		if (!labelElement) return;

		exportingPDF = true;

		try {
			// Capture the label as canvas
			const canvas = await html2canvas(labelElement, {
				scale: 2,
				useCORS: true,
				backgroundColor: '#ffffff',
				logging: false
			});

			// Create PDF (4x6 inches)
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'in',
				format: [4, 6]
			});

			// Add canvas image to PDF
			const imgData = canvas.toDataURL('image/png');
			pdf.addImage(imgData, 'PNG', 0, 0, 4, 6);

			// Download PDF
			pdf.save(`prescription-label-${getRxNumber()}.pdf`);
		} catch (error) {
			console.error('PDF export failed:', error);
			alert('Failed to export PDF. Please try again.');
		} finally {
			exportingPDF = false;
		}
	}
</script>

{#if mounted}
	<div class="prescription-label-container">
		<!-- Label Preview Card -->
		<div
			class="rounded-lg p-6"
			style="background-color: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3);"
		>
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-xl font-semibold" style="color: var(--accent);">
					Prescription Label
				</h3>
				<div class="flex gap-2">
					<button
						class="btn-secondary px-4 py-2 rounded-lg transition-colors"
						on:click={() => window.print()}
					>
						Print Label
					</button>
					<button
						class="btn-primary px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
						on:click={exportAsPDF}
						disabled={exportingPDF}
					>
						{#if exportingPDF}
							<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Exporting...
						{:else}
							Export PDF
						{/if}
					</button>
				</div>
			</div>

			<!-- Label Content (4" x 6" standard size) -->
			<div
				bind:this={labelElement}
				id="prescription-label"
				class="label-content rounded border-2 border-dashed p-6"
				style="
					width: 4in;
					height: 6in;
					background-color: white;
					color: black;
					font-family: 'Courier New', monospace;
					border-color: var(--border-color);
				"
			>
				<!-- Header -->
				<div class="text-center mb-4 pb-2" style="border-bottom: 2px solid black;">
					<div class="text-lg font-bold">PHARMAMAX PHARMACY</div>
					<div class="text-xs">AI-Accelerated Prescription Fulfillment</div>
				</div>

				<!-- Rx Number and Date -->
				<div class="flex justify-between mb-3 text-sm">
					<div>
						<span class="font-bold">Rx #:</span> {getRxNumber()}
					</div>
					<div>
						<span class="font-bold">Date:</span> {formatDate(prescription.fillDate)}
					</div>
				</div>

				<!-- Patient Information -->
				<div class="mb-3 pb-2" style="border-bottom: 1px solid black;">
					<div class="text-sm">
						<span class="font-bold">Patient:</span>
						{prescription.patient?.name || 'Sample Patient'}
					</div>
					{#if prescription.patient?.dateOfBirth}
						<div class="text-xs">
							DOB: {formatDate(prescription.patient.dateOfBirth)}
						</div>
					{/if}
				</div>

				<!-- Medication Information -->
				<div class="mb-3 pb-2" style="border-bottom: 1px solid black;">
					<div class="flex items-center justify-between mb-1">
						<div class="font-bold text-base">
							{prescription.drugName.toUpperCase()}
						</div>
						{#if prescription.isControlledSubstance && prescription.deaSchedule}
							<div class="text-xs font-bold px-2 py-1 rounded" style="background-color: #ef4444; color: white;">
								C-{prescription.deaSchedule}
							</div>
						{/if}
					</div>

					{#if prescription.isPartialFill && prescription.partialQuantity}
						<div class="text-sm mb-1" style="background-color: #dbeafe; padding: 2px 4px; border: 1px solid #3b82f6;">
							<span class="font-bold" style="color: #1e40af;">⚠ PARTIAL FILL:</span>
							<span style="color: #1e40af;">
								{prescription.partialQuantity} of {prescription.calculation.totalQuantityNeeded} {prescription.calculation.unit}
							</span>
						</div>
						<div class="text-xs mb-1" style="color: #1e40af;">
							Remaining: {prescription.calculation.totalQuantityNeeded - prescription.partialQuantity} {prescription.calculation.unit}
						</div>
					{:else}
						<div class="text-sm">
							<span class="font-bold">Quantity:</span>
							{prescription.calculation.totalQuantityNeeded} {prescription.calculation.unit}
						</div>
					{/if}

					<div class="text-sm">
						<span class="font-bold">Days Supply:</span>
						{prescription.daysSupply} days
					</div>
					{#if prescription.refills !== undefined}
						<div class="text-sm">
							<span class="font-bold">Refills:</span>
							{prescription.refills}
						</div>
					{/if}
					<div class="text-xs mt-1">
						<span class="font-bold">Expires:</span>
						{getExpirationDate()}
					</div>
				</div>

				<!-- SIG (Directions) -->
				<div class="mb-3 pb-2" style="border-bottom: 1px solid black;">
					<div class="text-xs font-bold mb-1">DIRECTIONS:</div>
					<div class="text-sm">
						{prescription.sig}
					</div>
				</div>

				<!-- NDC Information -->
				<div class="mb-3 text-xs">
					<div class="font-bold mb-1">PACKAGE INFORMATION:</div>
					{#each prescription.recommendation.packages as pkg}
						<div class="mb-1">
							• {pkg.quantity}x {pkg.packageSize} {prescription.calculation.unit}
							<span class="text-[10px]">(NDC: {pkg.ndc})</span>
						</div>
					{/each}
					<div class="mt-1">
						<span class="font-bold">Total Dispensed:</span>
						{prescription.recommendation.totalDispensed} {prescription.calculation.unit}
					</div>
				</div>

				<!-- Prescriber Information -->
				{#if prescription.prescriber}
					<div class="text-xs mb-2">
						<span class="font-bold">Prescriber:</span>
						{prescription.prescriber.name}
						{#if prescription.prescriber.npi}
							<span class="text-[10px]">(NPI: {prescription.prescriber.npi})</span>
						{/if}
					</div>
				{/if}

				<!-- Warning Labels -->
				{#if prescription.isControlledSubstance || prescription.isPartialFill}
					<div class="mb-2 text-[10px] border border-black p-1">
						{#if prescription.isControlledSubstance}
							<div class="font-bold mb-1">⚠ CAUTION: Federal law prohibits transfer of this drug to any person other than the patient for whom it was prescribed.</div>
						{/if}
						{#if prescription.isPartialFill}
							<div class="font-bold">• PARTIAL FILL: Complete remaining fill by regulatory deadline.</div>
						{/if}
					</div>
				{/if}

				<!-- Pharmacist Signature -->
				<div class="text-[10px] flex justify-between items-center pb-2" style="border-bottom: 1px solid black;">
					<div>
						<span class="font-bold">Pharmacist:</span>
						<span style="border-bottom: 1px solid black; padding: 0 20px;">_____</span>
					</div>
					<div>
						<span class="font-bold">RPh:</span> {getPharmacistInitials()}
					</div>
				</div>

				<!-- Barcode and QR Code -->
				<div class="mt-4 flex justify-between items-center">
					<!-- Barcode -->
					<div class="flex-1 text-center">
						<canvas bind:this={barcodeCanvas} class="inline-block"></canvas>
						<div class="text-[10px] mt-1">
							{getRxNumber()}
						</div>
					</div>

					<!-- QR Code -->
					<div class="text-center ml-2">
						<canvas bind:this={qrCanvas} class="inline-block"></canvas>
						<div class="text-[8px] mt-1">Scan for details</div>
					</div>
				</div>
			</div>

			<!-- Label Information -->
			<div class="mt-4 p-3 rounded" style="background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
				<p class="text-xs" style="color: var(--text-secondary);">
					<span class="font-semibold" style="color: var(--accent);">Label Size:</span> 4" x 6" (standard prescription label)
				</p>
				<p class="text-xs mt-1" style="color: var(--text-secondary);">
					This label is optimized for printing. Use the Print button to generate a physical label.
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	@media print {
		/* Hide everything except the label during print */
		:global(body *) {
			visibility: hidden;
		}

		#prescription-label, #prescription-label * {
			visibility: visible;
		}

		#prescription-label {
			position: absolute;
			left: 0;
			top: 0;
			width: 4in;
			height: 6in;
			border: none !important;
		}

		/* Ensure black text on white background for print */
		#prescription-label {
			background-color: white !important;
			color: black !important;
		}
	}
</style>
