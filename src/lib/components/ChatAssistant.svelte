<script lang="ts">
	export let prescriptionContext: any = null;

	let query = '';
	let loading = false;
	let error = '';
	let response = '';
	let hasAskedQuestion = false;

	async function askQuestion() {
		if (!query.trim()) {
			error = 'Please enter a question';
			return;
		}

		loading = true;
		error = '';
		response = '';

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query,
					prescriptionContext
				})
			});

			const data = await res.json();

			if (!data.success) {
				throw new Error(data.error || 'Failed to get response');
			}

			response = data.response;
			hasAskedQuestion = true;
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	function clearChat() {
		query = '';
		response = '';
		error = '';
		hasAskedQuestion = false;
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			askQuestion();
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
				d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
			/>
		</svg>
		AI Pharmacy Assistant
	</h3>

	<p class="text-sm mb-4" style="color: var(--text-secondary);">
		Ask questions about medications, dosing, or pharmacy practices. The assistant is aware of your current prescription.
	</p>

	<!-- Response Display (if available) -->
	{#if response}
		<div class="mb-4 rounded-lg p-4" style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3);">
			<div class="flex items-start gap-3">
				<svg class="w-6 h-6 flex-shrink-0 mt-1" style="color: var(--accent);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					/>
				</svg>
				<div class="flex-1">
					<h4 class="font-semibold mb-2" style="color: var(--accent);">AI Response:</h4>
					<p class="text-sm leading-relaxed whitespace-pre-wrap" style="color: var(--text-secondary);">{response}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Input Area -->
	<div class="space-y-3">
		<div>
			<label for="chatQuery" class="block text-sm font-medium mb-2" style="color: var(--text-secondary);">
				Your Question
			</label>
			<textarea
				id="chatQuery"
				bind:value={query}
				on:keydown={handleKeyPress}
				placeholder="e.g., What's the typical dosage for adults? Are there any food interactions?"
				rows="3"
				class="input-text w-full px-4 py-3 rounded-lg transition resize-none"
				disabled={loading}
			></textarea>
			<p class="mt-1 text-xs" style="color: var(--text-muted);">
				Press Enter to send, Shift+Enter for new line
			</p>
		</div>

		<!-- Error Display -->
		{#if error}
			<div class="rounded-lg p-3 state-error">
				<p class="text-sm">{error}</p>
			</div>
		{/if}

		<!-- Action Buttons -->
		<div class="flex gap-2">
			<button
				on:click={askQuestion}
				disabled={loading || !query.trim()}
				class="btn-primary flex-1 px-6 py-3 font-medium rounded-lg transition flex items-center justify-center gap-2"
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
					Thinking...
				{:else}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
						/>
					</svg>
					Ask Question
				{/if}
			</button>

			{#if hasAskedQuestion}
				<button
					on:click={clearChat}
					disabled={loading}
					class="btn-secondary px-4 py-3 font-medium rounded-lg transition"
				>
					Clear
				</button>
			{/if}
		</div>
	</div>

	<!-- Disclaimer -->
	<div class="mt-4 rounded-lg p-3" style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
		<p class="text-xs" style="color: var(--text-secondary);">
			<strong style="color: #f59e0b;">⚠️ AI-Generated Content:</strong> This assistant provides general information only
			and should not replace professional medical or pharmaceutical advice. Always consult with a
			healthcare provider or licensed pharmacist for medical decisions.
		</p>
	</div>
</div>
