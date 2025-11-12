<script lang="ts">
	import { onMount } from 'svelte';
	import { PatientStore, type PatientProfile } from '$lib/utils/patientStore';
	import { INSURANCE_PLANS } from '$lib/data/formularyData';

	export let selectedPatient: PatientProfile | null = null;
	export let onPatientSelect: (patient: PatientProfile | null) => void = () => {};

	let patients: PatientProfile[] = [];
	let showCreateModal = false;
	let showEditModal = false;
	let searchQuery = '';

	// Form fields
	let formData = {
		name: '',
		dateOfBirth: '',
		allergies: [] as string[],
		allergyInput: '',
		insuranceProvider: '',
		insurancePolicyNumber: '',
		insuranceGroupNumber: '',
		notes: ''
	};

	let editingPatient: PatientProfile | null = null;

	onMount(() => {
		loadPatients();
	});

	function loadPatients() {
		patients = PatientStore.getAll();
	}

	function openCreateModal() {
		resetForm();
		showCreateModal = true;
	}

	function openEditModal(patient: PatientProfile) {
		editingPatient = patient;
		formData = {
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
			allergies: [...patient.allergies],
			allergyInput: '',
			insuranceProvider: patient.insuranceProvider || '',
			insurancePolicyNumber: patient.insurancePolicyNumber || '',
			insuranceGroupNumber: patient.insuranceGroupNumber || '',
			notes: patient.notes || ''
		};
		showEditModal = true;
	}

	function resetForm() {
		formData = {
			name: '',
			dateOfBirth: '',
			allergies: [],
			allergyInput: '',
			insuranceProvider: '',
			insurancePolicyNumber: '',
			insuranceGroupNumber: '',
			notes: ''
		};
		editingPatient = null;
	}

	function createPatient() {
		if (!formData.name || !formData.dateOfBirth) {
			alert('Please enter patient name and date of birth');
			return;
		}

		PatientStore.create({
			name: formData.name,
			dateOfBirth: formData.dateOfBirth,
			allergies: formData.allergies,
			insuranceProvider: formData.insuranceProvider,
			insurancePolicyNumber: formData.insurancePolicyNumber,
			insuranceGroupNumber: formData.insuranceGroupNumber,
			notes: formData.notes,
			medicationHistory: []
		});

		loadPatients();
		showCreateModal = false;
		resetForm();
	}

	function updatePatient() {
		if (!editingPatient) return;

		PatientStore.update(editingPatient.id, {
			name: formData.name,
			dateOfBirth: formData.dateOfBirth,
			allergies: formData.allergies,
			insuranceProvider: formData.insuranceProvider,
			insurancePolicyNumber: formData.insurancePolicyNumber,
			insuranceGroupNumber: formData.insuranceGroupNumber,
			notes: formData.notes
		});

		loadPatients();
		showEditModal = false;
		resetForm();

		// Update selected patient if it was the one being edited
		if (selectedPatient?.id === editingPatient.id) {
			selectedPatient = PatientStore.getById(editingPatient.id);
			onPatientSelect(selectedPatient);
		}
	}

	function deletePatient(id: string) {
		if (!confirm('Are you sure you want to delete this patient profile?')) return;

		PatientStore.delete(id);
		loadPatients();

		if (selectedPatient?.id === id) {
			selectedPatient = null;
			onPatientSelect(null);
		}
	}

	function selectPatient(patient: PatientProfile) {
		selectedPatient = patient;
		onPatientSelect(patient);
	}

	function addAllergy() {
		if (!formData.allergyInput.trim()) return;

		formData.allergies = [...formData.allergies, formData.allergyInput.trim()];
		formData.allergyInput = '';
	}

	function removeAllergy(index: number) {
		formData.allergies = formData.allergies.filter((_, i) => i !== index);
	}

	$: filteredPatients = searchQuery
		? patients.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
		: patients;
</script>

<div class="patient-manager">
	<!-- Header -->
	<div class="flex justify-between items-center mb-4">
		<h3 class="text-xl font-semibold" style="color: var(--foreground);">Patient Profiles</h3>
		<button
			type="button"
			on:click={openCreateModal}
			class="btn-primary px-4 py-2 rounded-lg"
			style="background-color: var(--accent); color: white;"
		>
			+ New Patient
		</button>
	</div>

	<!-- Search -->
	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Search patients..."
		class="input-text w-full mb-4 px-4 py-2 rounded-lg"
	/>

	<!-- Patient List -->
	<div class="space-y-2 max-h-96 overflow-y-auto">
		{#if filteredPatients.length === 0}
			<div class="text-center py-8" style="color: var(--text-muted);">
				{searchQuery ? 'No patients found' : 'No patients yet. Create one to get started.'}
			</div>
		{:else}
			{#each filteredPatients as patient}
				<div
					class="patient-card p-4 rounded-lg cursor-pointer transition-all"
					style="background-color: var(--card-bg); border: 1px solid {selectedPatient?.id ===
					patient.id
						? 'var(--accent)'
						: 'var(--border-color)'};"
					on:click={() => selectPatient(patient)}
					on:keydown={(e) => e.key === 'Enter' && selectPatient(patient)}
					role="button"
					tabindex="0"
				>
					<div class="flex justify-between items-start">
						<div class="flex-1">
							<div class="font-semibold" style="color: var(--foreground);">
								{patient.name}
							</div>
							<div class="text-sm mt-1" style="color: var(--text-secondary);">
								DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
							</div>
							{#if patient.allergies.length > 0}
								<div class="text-sm mt-1 flex items-center gap-2">
									<span style="color: var(--error);">Allergies:</span>
									<span style="color: var(--text-secondary);">
										{patient.allergies.join(', ')}
									</span>
								</div>
							{/if}
							{#if patient.insuranceProvider}
								<div class="text-sm mt-1" style="color: var(--text-muted);">
									Insurance: {patient.insuranceProvider}
								</div>
							{/if}
						</div>
						<div class="flex gap-2">
							<button
								type="button"
								on:click|stopPropagation={() => openEditModal(patient)}
								class="p-2 rounded hover:bg-opacity-10"
								style="color: var(--accent);"
								title="Edit patient"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
							</button>
							<button
								type="button"
								on:click|stopPropagation={() => deletePatient(patient.id)}
								class="p-2 rounded hover:bg-opacity-10"
								style="color: var(--error);"
								title="Delete patient"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<!-- Create Patient Modal -->
	{#if showCreateModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4"
			style="background-color: rgba(0, 0, 0, 0.5);"
			on:click={() => (showCreateModal = false)}
			on:keydown={(e) => e.key === 'Escape' && (showCreateModal = false)}
			role="dialog"
			tabindex="-1"
		>
			<div
				class="modal-content rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
				style="background-color: var(--card-bg);"
				on:click|stopPropagation
				on:keydown|stopPropagation
				role="document"
				tabindex="0"
			>
				<h3 class="text-xl font-semibold mb-4" style="color: var(--foreground);">
					Create Patient Profile
				</h3>

				<form on:submit|preventDefault={createPatient} class="space-y-4">
					<!-- Name -->
					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Patient Name *
						</label>
						<input
							type="text"
							bind:value={formData.name}
							required
							class="input-text w-full px-4 py-2 rounded-lg"
							placeholder="John Doe"
						/>
					</div>

					<!-- Date of Birth -->
					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Date of Birth *
						</label>
						<input
							type="date"
							bind:value={formData.dateOfBirth}
							required
							class="input-text w-full px-4 py-2 rounded-lg"
						/>
					</div>

					<!-- Allergies -->
					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Allergies
						</label>
						<div class="flex gap-2 mb-2">
							<input
								type="text"
								bind:value={formData.allergyInput}
								on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
								class="input-text flex-1 px-4 py-2 rounded-lg"
								placeholder="e.g., Penicillin"
							/>
							<button
								type="button"
								on:click={addAllergy}
								class="px-4 py-2 rounded-lg"
								style="background-color: var(--accent); color: white;"
							>
								Add
							</button>
						</div>
						{#if formData.allergies.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each formData.allergies as allergy, index}
									<div
										class="px-3 py-1 rounded-full flex items-center gap-2"
										style="background-color: var(--error-bg); color: var(--error);"
									>
										<span>{allergy}</span>
										<button
											type="button"
											on:click={() => removeAllergy(index)}
											class="hover:opacity-70"
										>
											×
										</button>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Insurance -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
								Insurance Plan
							</label>
							<select
								bind:value={formData.insuranceProvider}
								class="input-text w-full px-4 py-2 rounded-lg"
							>
								<option value="">Select insurance plan...</option>
								{#each INSURANCE_PLANS as plan}
									<option value={plan.id}>
										{plan.name} ({plan.type})
									</option>
								{/each}
							</select>
							<p class="mt-1 text-xs" style="color: var(--text-muted);">
								Formulary checking will use this plan
							</p>
						</div>
						<div>
							<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
								Policy Number
							</label>
							<input
								type="text"
								bind:value={formData.insurancePolicyNumber}
								class="input-text w-full px-4 py-2 rounded-lg"
								placeholder="ABC123456"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
								Group Number
							</label>
							<input
								type="text"
								bind:value={formData.insuranceGroupNumber}
								class="input-text w-full px-4 py-2 rounded-lg"
								placeholder="GRP789"
							/>
						</div>
					</div>

					<!-- Notes -->
					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Notes
						</label>
						<textarea
							bind:value={formData.notes}
							class="input-text w-full px-4 py-2 rounded-lg"
							rows="3"
							placeholder="Additional notes..."
						></textarea>
					</div>

					<!-- Actions -->
					<div class="flex gap-3 justify-end">
						<button
							type="button"
							on:click={() => (showCreateModal = false)}
							class="px-6 py-2 rounded-lg"
							style="background-color: var(--border-color); color: var(--foreground);"
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-6 py-2 rounded-lg"
							style="background-color: var(--accent); color: white;"
						>
							Create Patient
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- Edit Patient Modal (similar structure to create) -->
	{#if showEditModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4"
			style="background-color: rgba(0, 0, 0, 0.5);"
			on:click={() => (showEditModal = false)}
			on:keydown={(e) => e.key === 'Escape' && (showEditModal = false)}
			role="dialog"
			tabindex="-1"
		>
			<div
				class="modal-content rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
				style="background-color: var(--card-bg);"
				on:click|stopPropagation
				on:keydown|stopPropagation
				role="document"
				tabindex="0"
			>
				<h3 class="text-xl font-semibold mb-4" style="color: var(--foreground);">
					Edit Patient Profile
				</h3>

				<form on:submit|preventDefault={updatePatient} class="space-y-4">
					<!-- Same form fields as create modal -->
					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Patient Name *
						</label>
						<input
							type="text"
							bind:value={formData.name}
							required
							class="input-text w-full px-4 py-2 rounded-lg"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Date of Birth *
						</label>
						<input
							type="date"
							bind:value={formData.dateOfBirth}
							required
							class="input-text w-full px-4 py-2 rounded-lg"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Allergies
						</label>
						<div class="flex gap-2 mb-2">
							<input
								type="text"
								bind:value={formData.allergyInput}
								on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
								class="input-text flex-1 px-4 py-2 rounded-lg"
								placeholder="e.g., Penicillin"
							/>
							<button
								type="button"
								on:click={addAllergy}
								class="px-4 py-2 rounded-lg"
								style="background-color: var(--accent); color: white;"
							>
								Add
							</button>
						</div>
						{#if formData.allergies.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each formData.allergies as allergy, index}
									<div
										class="px-3 py-1 rounded-full flex items-center gap-2"
										style="background-color: var(--error-bg); color: var(--error);"
									>
										<span>{allergy}</span>
										<button
											type="button"
											on:click={() => removeAllergy(index)}
											class="hover:opacity-70"
										>
											×
										</button>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
								Insurance Provider
							</label>
							<input
								type="text"
								bind:value={formData.insuranceProvider}
								class="input-text w-full px-4 py-2 rounded-lg"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
								Policy Number
							</label>
							<input
								type="text"
								bind:value={formData.insurancePolicyNumber}
								class="input-text w-full px-4 py-2 rounded-lg"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
								Group Number
							</label>
							<input
								type="text"
								bind:value={formData.insuranceGroupNumber}
								class="input-text w-full px-4 py-2 rounded-lg"
							/>
						</div>
					</div>

					<div>
						<label class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
							Notes
						</label>
						<textarea
							bind:value={formData.notes}
							class="input-text w-full px-4 py-2 rounded-lg"
							rows="3"
						></textarea>
					</div>

					<div class="flex gap-3 justify-end">
						<button
							type="button"
							on:click={() => (showEditModal = false)}
							class="px-6 py-2 rounded-lg"
							style="background-color: var(--border-color); color: var(--foreground);"
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-6 py-2 rounded-lg"
							style="background-color: var(--accent); color: white;"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>

<style>
	.patient-card {
		transition: all 0.2s;
	}

	.patient-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}
</style>
