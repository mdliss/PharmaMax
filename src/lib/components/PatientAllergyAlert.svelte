<script lang="ts">
	import { PatientStore, type PatientProfile, type AllergyCheck } from '$lib/utils/patientStore';

	export let patient: PatientProfile | null = null;
	export let drugName: string = '';

	let allergyCheck: AllergyCheck | null = null;

	$: if (patient && drugName) {
		allergyCheck = PatientStore.checkAllergies(patient.id, drugName);
	} else {
		allergyCheck = null;
	}
</script>

{#if allergyCheck?.hasAllergies}
	<div
		class="allergy-alert p-4 rounded-lg border-2 mb-4 animate-pulse"
		style="background-color: var(--error-bg); border-color: var(--error); animation-duration: 2s;"
		role="alert"
	>
		<div class="flex items-start gap-3">
			<svg
				class="w-6 h-6 flex-shrink-0 mt-0.5"
				style="color: var(--error);"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<div class="flex-1">
				<h4 class="font-bold text-lg mb-2" style="color: var(--error);">
					⚠️ ALLERGY WARNING ⚠️
				</h4>
				<div class="space-y-1">
					{#each allergyCheck.allergyWarnings as warning}
						<p class="font-semibold" style="color: var(--foreground);">
							{warning}
						</p>
					{/each}
				</div>
				<p class="mt-3 text-sm" style="color: var(--text-secondary);">
					Patient: <span class="font-semibold">{patient?.name}</span>
				</p>
				<p class="text-sm mt-1" style="color: var(--text-secondary);">
					Known Allergies: <span class="font-semibold">{patient?.allergies.join(', ')}</span>
				</p>
			</div>
		</div>
	</div>
{:else if patient}
	<div
		class="p-3 rounded-lg border mb-4"
		style="background-color: var(--success-bg); border-color: var(--success);"
	>
		<div class="flex items-center gap-2">
			<svg class="w-5 h-5" style="color: var(--success);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span style="color: var(--foreground);">
				No known allergies to {drugName || 'this medication'}
			</span>
		</div>
		{#if patient.allergies.length > 0}
			<p class="text-sm mt-2 ml-7" style="color: var(--text-secondary);">
				Patient allergies: {patient.allergies.join(', ')}
			</p>
		{/if}
	</div>
{/if}
