// Theme Store - Manages theme state and localStorage persistence

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'pharmamax_theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

export class ThemeStore {
	/**
	 * Get the current theme from localStorage or system preference
	 */
	static get(): Theme {
		if (typeof window === 'undefined') return 'light';

		try {
			const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
			if (stored === 'light' || stored === 'dark') {
				return stored;
			}

			// Check system preference
			if (window.matchMedia && window.matchMedia(MEDIA_QUERY).matches) {
				return 'dark';
			}

			return 'light';
		} catch {
			return 'light';
		}
	}

	/**
	 * Set and persist theme
	 */
	static set(theme: Theme): boolean {
		if (typeof window === 'undefined') return false;

		try {
			localStorage.setItem(STORAGE_KEY, theme);
			this.apply(theme);
			return true;
		} catch (error) {
			console.error('Failed to save theme:', error);
			return false;
		}
	}

	/**
	 * Toggle between light and dark themes
	 */
	static toggle(): Theme {
		const current = this.get();
		const next = current === 'light' ? 'dark' : 'light';
		this.set(next);
		return next;
	}

	/**
	 * Apply theme to document
	 */
	static apply(theme: Theme): void {
		if (typeof document === 'undefined') return;

		document.documentElement.setAttribute('data-theme', theme);

		// Update meta theme-color for mobile browsers
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', theme === 'dark' ? '#0F172A' : '#FFFFFF');
		}
	}

	/**
	 * Initialize theme system
	 */
	static init(): Theme {
		const theme = this.get();
		this.apply(theme);

		// Listen for system theme changes
		if (typeof window !== 'undefined' && window.matchMedia) {
			const mediaQuery = window.matchMedia(MEDIA_QUERY);
			mediaQuery.addEventListener('change', (e) => {
				// Only apply system preference if user hasn't set a preference
				const stored = localStorage.getItem(STORAGE_KEY);
				if (!stored) {
					const newTheme = e.matches ? 'dark' : 'light';
					this.apply(newTheme);
				}
			});
		}

		return theme;
	}
}
