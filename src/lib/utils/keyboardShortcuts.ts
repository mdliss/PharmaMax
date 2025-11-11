/**
 * Keyboard Shortcuts Utility
 * Centralized keyboard shortcut management
 */

export interface KeyboardShortcut {
	key: string;
	ctrl?: boolean;
	alt?: boolean;
	shift?: boolean;
	meta?: boolean;
	description: string;
	category: string;
	action: () => void;
}

export class KeyboardShortcutManager {
	private shortcuts: Map<string, KeyboardShortcut> = new Map();
	private listener: ((e: KeyboardEvent) => void) | null = null;

	constructor() {
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	/**
	 * Register a keyboard shortcut
	 */
	register(id: string, shortcut: KeyboardShortcut): void {
		this.shortcuts.set(id, shortcut);
	}

	/**
	 * Unregister a keyboard shortcut
	 */
	unregister(id: string): void {
		this.shortcuts.delete(id);
	}

	/**
	 * Start listening for keyboard events
	 */
	start(): void {
		if (this.listener) return;
		this.listener = this.handleKeyDown;
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', this.listener);
		}
	}

	/**
	 * Stop listening for keyboard events
	 */
	stop(): void {
		if (!this.listener) return;
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', this.listener);
		}
		this.listener = null;
	}

	/**
	 * Get all registered shortcuts
	 */
	getAll(): KeyboardShortcut[] {
		return Array.from(this.shortcuts.values());
	}

	/**
	 * Get shortcuts by category
	 */
	getByCategory(category: string): KeyboardShortcut[] {
		return this.getAll().filter(s => s.category === category);
	}

	/**
	 * Handle keyboard events
	 */
	private handleKeyDown(e: KeyboardEvent): void {
		// Don't trigger shortcuts when user is typing in an input/textarea (except Ctrl+Enter)
		const target = e.target as HTMLElement;
		const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

		// Allow Ctrl+Enter in inputs
		if (isInput && !(e.ctrlKey && e.key === 'Enter')) {
			return;
		}

		for (const shortcut of this.shortcuts.values()) {
			if (this.matchesShortcut(e, shortcut)) {
				e.preventDefault();
				shortcut.action();
				break;
			}
		}
	}

	/**
	 * Check if event matches a shortcut
	 */
	private matchesShortcut(e: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
		const key = e.key.toLowerCase();
		const shortcutKey = shortcut.key.toLowerCase();

		if (key !== shortcutKey) return false;
		if (!!e.ctrlKey !== !!shortcut.ctrl) return false;
		if (!!e.altKey !== !!shortcut.alt) return false;
		if (!!e.shiftKey !== !!shortcut.shift) return false;
		if (!!e.metaKey !== !!shortcut.meta) return false;

		return true;
	}

	/**
	 * Format shortcut for display
	 */
	static formatShortcut(shortcut: KeyboardShortcut): string {
		const parts: string[] = [];
		if (shortcut.ctrl) parts.push('Ctrl');
		if (shortcut.alt) parts.push('Alt');
		if (shortcut.shift) parts.push('Shift');
		if (shortcut.meta) parts.push('Cmd');
		parts.push(shortcut.key.toUpperCase());
		return parts.join('+');
	}
}

// Global instance
let manager: KeyboardShortcutManager | null = null;

export function getKeyboardManager(): KeyboardShortcutManager {
	if (!manager) {
		manager = new KeyboardShortcutManager();
	}
	return manager;
}
