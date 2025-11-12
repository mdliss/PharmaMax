<script lang="ts">
	export let sigInput: string;
	export let parsedResult: {
		dose: string;
		frequency: string;
		unit: string;
		confidence?: number;
	};

	let showFeedback = false;
	let feedbackType: 'correct' | 'incorrect' | 'ambiguous' | null = null;
	let feedbackComment = '';
	let submitted = false;

	function submitFeedback() {
		if (!feedbackType) return;

		const feedback = {
			timestamp: new Date().toISOString(),
			sigInput,
			parsedResult,
			feedbackType,
			comment: feedbackComment,
			confidence: parsedResult.confidence
		};

		// Store feedback in localStorage for analytics
		const existingFeedback = JSON.parse(localStorage.getItem('sig-feedback') || '[]');
		existingFeedback.push(feedback);
		localStorage.setItem('sig-feedback', JSON.stringify(existingFeedback));

		// Optional: Send to server
		// await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(feedback) });

		submitted = true;
		setTimeout(() => {
			showFeedback = false;
			submitted = false;
			feedbackType = null;
			feedbackComment = '';
		}, 2000);
	}
</script>

{#if !submitted}
	{#if !showFeedback}
		<button
			on:click={() => (showFeedback = true)}
			class="text-sm px-3 py-1 rounded-lg border transition-colors"
			style="border-color: var(--accent); color: var(--accent);"
		>
			📋 Provide Feedback
		</button>
	{:else}
		<div
			class="p-4 rounded-lg border shadow-sm"
			style="background-color: var(--card-bg); border-color: var(--border);"
		>
			<div class="flex items-center justify-between mb-3">
				<h3 class="font-semibold" style="color: var(--text);">SIG Parsing Feedback</h3>
				<button
					on:click={() => (showFeedback = false)}
					class="text-gray-500 hover:text-gray-700 text-xl"
				>
					×
				</button>
			</div>

			<div class="mb-3">
				<p class="text-sm mb-2" style="color: var(--text-secondary);">
					Was this SIG parsed correctly?
				</p>
				<div class="grid grid-cols-3 gap-2">
					<button
						on:click={() => (feedbackType = 'correct')}
						class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
						style="background-color: {feedbackType === 'correct'
							? '#10b981'
							: '#f3f4f6'}; color: {feedbackType === 'correct' ? 'white' : '#374151'};"
					>
						✓ Correct
					</button>
					<button
						on:click={() => (feedbackType = 'incorrect')}
						class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
						style="background-color: {feedbackType === 'incorrect'
							? '#ef4444'
							: '#f3f4f6'}; color: {feedbackType === 'incorrect' ? 'white' : '#374151'};"
					>
						✗ Incorrect
					</button>
					<button
						on:click={() => (feedbackType = 'ambiguous')}
						class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
						style="background-color: {feedbackType === 'ambiguous'
							? '#f59e0b'
							: '#f3f4f6'}; color: {feedbackType === 'ambiguous' ? 'white' : '#374151'};"
					>
						⚠ Ambiguous
					</button>
				</div>
			</div>

			{#if feedbackType}
				<div class="mb-3">
					<label for="feedback-comment" class="block text-sm font-medium mb-1" style="color: var(--text);">
						Additional Comments (optional)
					</label>
					<textarea
						id="feedback-comment"
						bind:value={feedbackComment}
						placeholder="Please provide any additional details..."
						rows="3"
						class="w-full px-3 py-2 border rounded-lg text-sm"
						style="background-color: var(--background); border-color: var(--border); color: var(--text);"
					/>
				</div>

				<div class="flex gap-2">
					<button
						on:click={submitFeedback}
						class="flex-1 px-4 py-2 rounded-lg font-medium transition-colors"
						style="background-color: var(--accent); color: var(--background);"
					>
						Submit Feedback
					</button>
					<button
						on:click={() => {
							showFeedback = false;
							feedbackType = null;
							feedbackComment = '';
						}}
						class="px-4 py-2 rounded-lg border transition-colors"
						style="border-color: var(--border); color: var(--text-secondary);"
					>
						Cancel
					</button>
				</div>
			{/if}
		</div>
	{/if}
{:else}
	<div
		class="p-3 rounded-lg flex items-center gap-2"
		style="background-color: #d1fae5; border: 1px solid #10b981;"
	>
		<span style="color: #065f46;">✓</span>
		<span class="text-sm font-medium" style="color: #065f46;">Thank you for your feedback!</span>
	</div>
{/if}

<style>
	textarea {
		resize: vertical;
	}

	button:hover {
		opacity: 0.9;
	}
</style>
