<script lang="ts">
	import { onMount } from 'svelte';

	export let daysSupply: number;
	export let drugName: string;

	let startDate: string = '';
	let refillDate: Date | null = null;
	let daysRemaining: number = 0;
	let isExpired: boolean = false;
	let mounted = false;

	onMount(() => {
		// Default to today
		startDate = new Date().toISOString().split('T')[0];
		calculateRefillDate();
		mounted = true;
	});

	function calculateRefillDate() {
		if (!startDate) return;

		const start = new Date(startDate);
		const refill = new Date(start);
		refill.setDate(refill.getDate() + daysSupply);

		refillDate = refill;

		// Calculate days remaining from today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		refill.setHours(0, 0, 0, 0);

		const diffTime = refill.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		daysRemaining = diffDays;
		isExpired = diffDays < 0;
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getStatusColor(): string {
		if (isExpired) return '#ef4444'; // Red
		if (daysRemaining <= 3) return '#f59e0b'; // Orange
		if (daysRemaining <= 7) return '#3b82f6'; // Blue
		return '#10b981'; // Green
	}

	function getStatusLabel(): string {
		if (isExpired) return 'Expired';
		if (daysRemaining === 0) return 'Refill Today';
		if (daysRemaining === 1) return 'Refill Tomorrow';
		if (daysRemaining <= 3) return 'Refill Soon';
		if (daysRemaining <= 7) return 'Upcoming Refill';
		return 'On Schedule';
	}

	$: if (startDate) {
		calculateRefillDate();
	}
</script>

{#if mounted}
	<div class="card-hover rounded-lg p-6" style="background-color: rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.3);">
		<div class="flex items-start justify-between mb-4">
			<div>
				<h3 class="text-xl font-semibold" style="color: #a855f7;">Refill Date Calculator</h3>
				<p class="text-sm mt-1" style="color: var(--text-secondary);">
					Track when this prescription will need to be refilled
				</p>
			</div>

			<!-- Status Badge -->
			{#if refillDate}
				<div
					class="px-3 py-1.5 rounded-lg text-sm font-semibold"
					style="background-color: {getStatusColor()}20; color: {getStatusColor()}; border: 2px solid {getStatusColor()};"
				>
					{getStatusLabel()}
				</div>
			{/if}
		</div>

		<!-- Date Picker -->
		<div class="mb-4">
			<label for="startDate" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
				Prescription Start Date
			</label>
			<input
				id="startDate"
				type="date"
				bind:value={startDate}
				class="input-text px-4 py-2 rounded-lg w-full"
				style="background-color: var(--card-bg); border: 1px solid var(--border-color); color: var(--foreground);"
			/>
		</div>

		{#if refillDate}
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Refill Date -->
				<div class="p-4 rounded-lg" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
					<p class="text-xs font-medium mb-1" style="color: var(--text-muted);">Refill Date</p>
					<p class="text-lg font-bold" style="color: #a855f7;">
						{refillDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
					</p>
					<p class="text-xs mt-1" style="color: var(--text-secondary);">
						{refillDate.toLocaleDateString('en-US', { weekday: 'long' })}
					</p>
				</div>

				<!-- Days Remaining -->
				<div class="p-4 rounded-lg" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
					<p class="text-xs font-medium mb-1" style="color: var(--text-muted);">Days Remaining</p>
					<p class="text-3xl font-bold" style="color: {getStatusColor()};">
						{#if isExpired}
							{Math.abs(daysRemaining)}
						{:else}
							{daysRemaining}
						{/if}
					</p>
					<p class="text-xs mt-1" style="color: var(--text-secondary);">
						{#if isExpired}
							days overdue
						{:else if daysRemaining === 0}
							refill today
						{:else if daysRemaining === 1}
							day left
						{:else}
							days left
						{/if}
					</p>
				</div>

				<!-- Supply Duration -->
				<div class="p-4 rounded-lg" style="background-color: var(--card-bg); border: 1px solid var(--border-color);">
					<p class="text-xs font-medium mb-1" style="color: var(--text-muted);">Supply Duration</p>
					<p class="text-3xl font-bold" style="color: var(--foreground);">
						{daysSupply}
					</p>
					<p class="text-xs mt-1" style="color: var(--text-secondary);">
						{daysSupply === 1 ? 'day' : 'days'} supply
					</p>
				</div>
			</div>

			<!-- Timeline Visualization -->
			<div class="mt-6 p-4 rounded-lg" style="background-color: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2);">
				<p class="text-sm font-medium mb-3" style="color: #a855f7;">Prescription Timeline</p>

				<!-- Progress Bar -->
				{#if startDate}
					{@const today = new Date()}
					{@const start = new Date(startDate)}
					{@const elapsed = Math.max(0, Math.min(daysSupply, Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))))}
					{@const progressPercentage = Math.min(100, (elapsed / daysSupply) * 100)}
					<div class="relative h-3 rounded-full overflow-hidden mb-3" style="background-color: var(--border-color);">
						<div
							class="h-full transition-all duration-500"
							style="background: linear-gradient(90deg, #a855f7 0%, {getStatusColor()} 100%); width: {progressPercentage}%;"
						></div>
					</div>
				{/if}

				<!-- Timeline Labels -->
				<div class="flex justify-between text-xs" style="color: var(--text-secondary);">
					<div>
						<p style="color: var(--foreground); font-semibold;">Start</p>
						<p>{new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
					</div>
					<div class="text-center">
						<p style="color: var(--foreground); font-semibold;">Today</p>
						<p>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
					</div>
					<div class="text-right">
						<p style="color: var(--foreground); font-semibold;">Refill</p>
						<p>{refillDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
					</div>
				</div>
			</div>

			<!-- Helpful Information -->
			<div class="mt-4 p-4 rounded-lg" style="background-color: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2);">
				<p class="text-sm font-medium mb-2" style="color: #a855f7;">Refill Reminder</p>
				<p class="text-sm" style="color: var(--text-secondary);">
					{#if isExpired}
						This prescription expired {Math.abs(daysRemaining)} day{Math.abs(daysRemaining) !== 1 ? 's' : ''} ago. Please contact the prescriber for a refill authorization.
					{:else if daysRemaining <= 3}
						It's time to refill this prescription. Contact your pharmacy to ensure continuity of care.
					{:else if daysRemaining <= 7}
						Consider scheduling a refill within the next few days to avoid running out of medication.
					{:else}
						Your prescription is on schedule. You'll need a refill in approximately {daysRemaining} days.
					{/if}
				</p>
			</div>
		{/if}
	</div>
{/if}
