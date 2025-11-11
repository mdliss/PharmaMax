<script lang="ts">
	let fileInput: HTMLInputElement;
	let file: File | null = null;
	let processing = false;
	let error = '';
	let results: any[] = [];
	let csvData: any[] = [];

	interface BatchResult {
		rowNumber: number;
		drugName: string;
		sig: string;
		daysSupply: number;
		success: boolean;
		error?: string;
		result?: any;
	}

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const selectedFile = target.files?.[0];

		if (selectedFile) {
			if (!selectedFile.name.endsWith('.csv')) {
				error = 'Please upload a CSV file';
				file = null;
				return;
			}

			file = selectedFile;
			error = '';
		}
	}

	function parseCSV(text: string): any[] {
		const lines = text.trim().split('\n');

		if (lines.length === 0) {
			throw new Error('CSV file is empty');
		}

		// Parse header
		const header = lines[0].split(',').map(h => h.trim().toLowerCase());

		// Validate required columns
		if (!header.includes('drug_name') || !header.includes('sig') || !header.includes('days_supply')) {
			throw new Error('CSV must contain columns: drug_name, sig, days_supply');
		}

		const drugNameIndex = header.indexOf('drug_name');
		const sigIndex = header.indexOf('sig');
		const daysSupplyIndex = header.indexOf('days_supply');

		// Parse data rows
		const data: any[] = [];
		for (let i = 1; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;

			const values = line.split(',').map(v => v.trim());

			if (values.length < 3) {
				throw new Error(`Row ${i + 1} has insufficient columns`);
			}

			const daysSupply = parseInt(values[daysSupplyIndex]);
			if (isNaN(daysSupply) || daysSupply < 1) {
				throw new Error(`Row ${i + 1} has invalid days_supply value`);
			}

			data.push({
				rowNumber: i,
				drugName: values[drugNameIndex],
				sig: values[sigIndex],
				daysSupply: daysSupply
			});
		}

		if (data.length === 0) {
			throw new Error('No data rows found in CSV');
		}

		if (data.length > 10) {
			throw new Error('Maximum 10 prescriptions allowed per batch');
		}

		return data;
	}

	async function processRow(row: any): Promise<BatchResult> {
		try {
			// First normalize drug name
			const normalizeResponse = await fetch('/api/normalize', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ input: row.drugName })
			});

			const normalizeData = await normalizeResponse.json();

			if (!normalizeData.success) {
				return {
					...row,
					success: false,
					error: normalizeData.error || 'Failed to normalize drug name'
				};
			}

			// Then calculate
			const calculateResponse = await fetch('/api/calculate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rxcui: normalizeData.rxcui,
					drugName: normalizeData.drugName,
					sig: row.sig,
					daysSupply: row.daysSupply
				})
			});

			const calculateData = await calculateResponse.json();

			if (!calculateData.success) {
				return {
					...row,
					success: false,
					error: calculateData.error || 'Failed to calculate quantity'
				};
			}

			return {
				...row,
				success: true,
				result: calculateData
			};
		} catch (e: any) {
			return {
				...row,
				success: false,
				error: e.message
			};
		}
	}

	async function handleUpload() {
		if (!file) {
			error = 'Please select a file';
			return;
		}

		processing = true;
		error = '';
		results = [];

		try {
			const text = await file.text();
			csvData = parseCSV(text);

			// Process each row sequentially
			for (const row of csvData) {
				const result = await processRow(row);
				results.push(result);

				// Stop processing if there's an error
				if (!result.success) {
					error = `Error in row ${result.rowNumber + 1}: ${result.error}`;
					break;
				}
			}
		} catch (e: any) {
			error = e.message;
		} finally {
			processing = false;
		}
	}

	function exportToCSV() {
		if (results.length === 0) return;

		const csvLines = [
			'Row,Drug Name,SIG,Days Supply,Status,Total Quantity,Error'
		];

		for (const result of results) {
			const status = result.success ? 'Success' : 'Failed';
			const quantity = result.success ? result.result.calculation.totalQuantityNeeded : '';
			const errorMsg = result.error || '';

			csvLines.push(
				`${result.rowNumber + 1},"${result.drugName}","${result.sig}",${result.daysSupply},${status},${quantity},"${errorMsg}"`
			);
		}

		const csvContent = csvLines.join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `batch-results-${Date.now()}.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}

	function reset() {
		file = null;
		processing = false;
		error = '';
		results = [];
		csvData = [];
		if (fileInput) {
			fileInput.value = '';
		}
	}
</script>

<div class="card-hover rounded-lg shadow-lg p-8 drop-in-3" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
	<h2 class="text-2xl font-semibold mb-6" style="color: var(--foreground);">Batch Prescription Processing</h2>

	<div class="mb-6">
		<p class="text-sm mb-4" style="color: var(--text-secondary);">
			Upload a CSV file with prescription data to process multiple prescriptions at once (max 10).
		</p>
		<div class="rounded-lg p-4 mb-4" style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);">
			<p class="text-sm font-medium mb-2" style="color: var(--accent);">CSV Format Requirements:</p>
			<ul class="text-sm space-y-1" style="color: var(--text-secondary);">
				<li>• Required columns: <code class="px-1 rounded" style="background-color: rgba(16, 185, 129, 0.2);">drug_name</code>, <code class="px-1 rounded" style="background-color: rgba(16, 185, 129, 0.2);">sig</code>, <code class="px-1 rounded" style="background-color: rgba(16, 185, 129, 0.2);">days_supply</code></li>
				<li>• Maximum 10 prescriptions per batch</li>
				<li>• First row should contain column headers</li>
			</ul>
		</div>
	</div>

	{#if results.length === 0}
		<!-- Upload Form -->
		<div class="space-y-4">
			<div>
				<label for="csvFile" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
					Select CSV File
				</label>
				<input
					id="csvFile"
					type="file"
					accept=".csv"
					bind:this={fileInput}
					on:change={handleFileSelect}
					class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:transition"
					style="color: var(--text-muted); file:background-color: rgba(16, 185, 129, 0.1); file:color: var(--accent);"
				/>
				{#if file}
					<p class="mt-2 text-sm" style="color: var(--accent);">
						Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
					</p>
				{/if}
			</div>

			<button
				on:click={handleUpload}
				disabled={!file || processing}
				class="btn-primary w-full font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
			>
				{#if processing}
					<svg class="animate-spin -ml-1 mr-3 h-5 w-5" style="color: var(--background);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					Processing {results.length + 1} of {csvData.length}...
				{:else}
					Upload and Process
				{/if}
			</button>
		</div>

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
	{:else}
		<!-- Results Display -->
		<div class="space-y-4">
			<div class="rounded-lg p-4 state-success">
				<h3 class="text-sm font-medium mb-2">Processing Complete</h3>
				<p class="text-sm">
					Successfully processed {results.filter(r => r.success).length} of {results.length} prescriptions
				</p>
			</div>

			<!-- Results Table -->
			<div class="overflow-x-auto">
				<table class="min-w-full" style="border: 1px solid var(--border-color);">
					<thead style="background-color: var(--background);">
						<tr>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">Row</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">Drug Name</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">SIG</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">Days Supply</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">Total Qty</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">Status</th>
						</tr>
					</thead>
					<tbody style="background-color: var(--card-bg);">
						{#each results as result}
							<tr style="{result.success ? '' : 'background-color: rgba(239, 68, 68, 0.1);'} border-top: 1px solid var(--border-color);">
								<td class="px-4 py-3 whitespace-nowrap text-sm" style="color: var(--foreground);">{result.rowNumber + 1}</td>
								<td class="px-4 py-3 text-sm" style="color: var(--foreground);">{result.drugName}</td>
								<td class="px-4 py-3 text-sm" style="color: var(--text-secondary);">{result.sig}</td>
								<td class="px-4 py-3 whitespace-nowrap text-sm" style="color: var(--foreground);">{result.daysSupply}</td>
								<td class="px-4 py-3 whitespace-nowrap text-sm" style="color: var(--foreground);">
									{result.success ? result.result.calculation.totalQuantityNeeded : '-'}
								</td>
								<td class="px-4 py-3 whitespace-nowrap text-sm">
									{#if result.success}
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style="background-color: rgba(16, 185, 129, 0.2); color: var(--accent);">
											Success
										</span>
									{:else}
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style="background-color: rgba(239, 68, 68, 0.2); color: #ef4444;">
											Failed
										</span>
										<p class="mt-1 text-xs" style="color: #ef4444;">{result.error}</p>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Action Buttons -->
			<div class="flex gap-4">
				<button
					on:click={exportToCSV}
					class="flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200"
					style="background-color: #10b981; color: white;"
				>
					Export Results to CSV
				</button>
				<button
					on:click={reset}
					class="btn-secondary flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200"
				>
					Process Another Batch
				</button>
			</div>
		</div>
	{/if}
</div>
