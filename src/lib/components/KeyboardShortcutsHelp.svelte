<script lang="ts">
	import { getKeyboardManager, KeyboardShortcutManager } from '$lib/utils/keyboardShortcuts';

	export let show = false;
	export let onClose: () => void;

	const manager = getKeyboardManager();
	const shortcuts = manager.getAll();

	// Group shortcuts by category
	const categories = [...new Set(shortcuts.map(s => s.category))];
	const groupedShortcuts: Record<string, typeof shortcuts> = {};

	categories.forEach(cat => {
		groupedShortcuts[cat] = shortcuts.filter(s => s.category === cat);
	});
</script>

{#if show}
	<div
		class="fixed inset-0 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.7); z-index: 99999; position: fixed; top: 0; left: 0; right: 0; bottom: 0;"
		on:click={onClose}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden"
			style="background-color: var(--card-bg); position: relative; z-index: 100000;"
			on:click|stopPropagation
			role="document"
		>
			<!-- Header -->
			<div class="flex items-center justify-between p-6" style="border-bottom: 1px solid var(--border-color);">
				<h3 class="text-2xl font-bold" style="color: var(--foreground);">Keyboard Shortcuts</h3>
				<button
					on:click={onClose}
					class="p-2 rounded-lg hover:bg-opacity-10"
					style="color: var(--text-secondary);"
					aria-label="Close"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Content -->
			<div class="p-6 overflow-y-auto" style="max-height: 70vh;">
				{#each categories as category}
					<div class="mb-6">
						<h4 class="text-lg font-semibold mb-3" style="color: var(--accent);">{category}</h4>
						<div class="space-y-2">
							{#each groupedShortcuts[category] as shortcut}
								<div class="flex items-center justify-between p-3 rounded" style="background-color: var(--background);">
									<span class="text-sm" style="color: var(--text-secondary);">
										{shortcut.description}
									</span>
									<div class="flex gap-1">
										{#if shortcut.ctrl}
											<kbd class="px-2 py-1 text-xs font-semibold rounded" style="background-color: var(--border-color); color: var(--foreground);">
												Ctrl
											</kbd>
											<span style="color: var(--text-muted);">+</span>
										{/if}
										{#if shortcut.alt}
											<kbd class="px-2 py-1 text-xs font-semibold rounded" style="background-color: var(--border-color); color: var(--foreground);">
												Alt
											</kbd>
											<span style="color: var(--text-muted);">+</span>
										{/if}
										{#if shortcut.shift}
											<kbd class="px-2 py-1 text-xs font-semibold rounded" style="background-color: var(--border-color); color: var(--foreground);">
												Shift
											</kbd>
											<span style="color: var(--text-muted);">+</span>
										{/if}
										{#if shortcut.meta}
											<kbd class="px-2 py-1 text-xs font-semibold rounded" style="background-color: var(--border-color); color: var(--foreground);">
												Cmd
											</kbd>
											<span style="color: var(--text-muted);">+</span>
										{/if}
										<kbd class="px-2 py-1 text-xs font-semibold rounded" style="background-color: var(--border-color); color: var(--foreground);">
											{shortcut.key.toUpperCase()}
										</kbd>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}

				<!-- Footer note -->
				<div class="mt-6 p-4 rounded" style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);">
					<p class="text-sm" style="color: var(--text-secondary);">
						Press <kbd class="px-2 py-1 text-xs font-semibold rounded" style="background-color: var(--border-color); color: var(--foreground);">?</kbd> anytime to open this help dialog
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
