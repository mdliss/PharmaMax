<script lang="ts">
	let showWidget = true;
	let selectedRating: number | null = null;
	let feedback = '';
	let submitted = false;
	let submitting = false;
	let error = '';

	async function submitRating() {
		if (selectedRating === null) {
			error = 'Please select a rating';
			return;
		}

		submitting = true;
		error = '';

		try {
			const response = await fetch('/api/satisfaction', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rating: selectedRating,
					feedback: feedback.trim() || null,
					sessionId: null
				})
			});

			const data = await response.json();

			if (data.success) {
				submitted = true;
				setTimeout(() => {
					showWidget = false;
				}, 3000);
			} else {
				error = data.error || 'Failed to submit rating';
			}
		} catch (e: any) {
			error = 'Failed to submit rating. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

{#if showWidget}
	<div
		class="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg shadow-2xl p-4 print:hidden"
		style="background-color: var(--card-bg); border: 2px solid var(--accent);"
	>
		{#if !submitted}
			<div class="flex justify-between items-start mb-3">
				<h4 class="text-sm font-semibold" style="color: var(--foreground);">
					Rate Your Experience
				</h4>
				<button
					on:click={() => (showWidget = false)}
					class="text-sm"
					style="color: var(--text-muted);"
					aria-label="Close"
				>
					✕
				</button>
			</div>

			<p class="text-xs mb-3" style="color: var(--text-secondary);">
				Help us improve PharmaMax by rating your experience
			</p>

			<!-- Star Rating -->
			<div class="flex gap-2 mb-3 justify-center">
				{#each [1, 2, 3, 4, 5] as star}
					<button
						on:click={() => (selectedRating = star)}
						class="text-3xl transition-transform hover:scale-110"
						style="color: {selectedRating !== null && star <= selectedRating
							? '#f59e0b'
							: 'var(--border-color)'};"
						aria-label="{star} star{star > 1 ? 's' : ''}"
					>
						★
					</button>
				{/each}
			</div>

			{#if selectedRating}
				<p class="text-xs text-center mb-3" style="color: var(--text-muted);">
					{selectedRating}/5 stars
				</p>
			{/if}

			<!-- Optional Feedback -->
			<textarea
				bind:value={feedback}
				placeholder="Optional feedback..."
				rows="2"
				class="input-text w-full px-3 py-2 text-sm rounded mb-3"
			></textarea>

			{#if error}
				<p class="text-xs mb-2" style="color: #ef4444;">{error}</p>
			{/if}

			<button
				on:click={submitRating}
				disabled={submitting || selectedRating === null}
				class="btn-primary w-full py-2 text-sm rounded"
			>
				{#if submitting}
					Submitting...
				{:else}
					Submit Rating
				{/if}
			</button>
		{:else}
			<div class="text-center py-2">
				<div class="text-4xl mb-2">✓</div>
				<p class="text-sm font-semibold" style="color: var(--accent);">Thank you!</p>
				<p class="text-xs mt-1" style="color: var(--text-secondary);">
					Your feedback helps us improve
				</p>
			</div>
		{/if}
	</div>
{/if}
