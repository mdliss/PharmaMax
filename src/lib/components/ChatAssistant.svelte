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

<div class="bg-white border border-teal-200 rounded-lg p-6 mt-6">
	<h3 class="text-xl font-semibold text-teal-900 mb-4 flex items-center gap-2">
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

	<p class="text-sm text-gray-600 mb-4">
		Ask questions about medications, dosing, or pharmacy practices. The assistant is aware of your current prescription.
	</p>

	<!-- Response Display (if available) -->
	{#if response}
		<div class="mb-4 bg-teal-50 border border-teal-200 rounded-lg p-4">
			<div class="flex items-start gap-3">
				<svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					/>
				</svg>
				<div class="flex-1">
					<h4 class="font-semibold text-teal-900 mb-2">AI Response:</h4>
					<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{response}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Input Area -->
	<div class="space-y-3">
		<div>
			<label for="chatQuery" class="block text-sm font-medium text-gray-700 mb-2">
				Your Question
			</label>
			<textarea
				id="chatQuery"
				bind:value={query}
				on:keydown={handleKeyPress}
				placeholder="e.g., What's the typical dosage for adults? Are there any food interactions?"
				rows="3"
				class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
				disabled={loading}
			></textarea>
			<p class="mt-1 text-xs text-gray-500">
				Press Enter to send, Shift+Enter for new line
			</p>
		</div>

		<!-- Error Display -->
		{#if error}
			<div class="bg-red-50 border border-red-200 rounded-lg p-3">
				<p class="text-sm text-red-700">{error}</p>
			</div>
		{/if}

		<!-- Action Buttons -->
		<div class="flex gap-2">
			<button
				on:click={askQuestion}
				disabled={loading || !query.trim()}
				class="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
			>
				{#if loading}
					<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
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
					class="px-4 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
				>
					Clear
				</button>
			{/if}
		</div>
	</div>

	<!-- Disclaimer -->
	<div class="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
		<p class="text-xs text-gray-600">
			<strong>⚠️ AI-Generated Content:</strong> This assistant provides general information only
			and should not replace professional medical or pharmaceutical advice. Always consult with a
			healthcare provider or licensed pharmacist for medical decisions.
		</p>
	</div>
</div>
