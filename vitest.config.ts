import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
	plugins: [svelte()],
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/lib/server/*.{js,ts}', 'src/routes/api/**/*.{js,ts}'],
			exclude: [
				'**/*.test.{js,ts}',
				'**/*.spec.{js,ts}',
				'**/node_modules/**',
				'**/.svelte-kit/**',
				'**/build/**',
				'**/test-mocks/**',
				'src/lib/server/db.ts',
				'src/lib/server/prescriptionRepository.ts',
				'src/lib/utils/**',
				'src/routes/api/chat/**',
				'src/routes/api/check-interaction/**'
			],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 65,
				statements: 80
			}
		}
	},
	resolve: {
		alias: {
			$lib: resolve('./src/lib'),
			'$env/static/private': resolve('./src/lib/test-mocks/env-mock.ts'),
			'$env/static/public': resolve('./src/lib/test-mocks/env-mock.ts')
		}
	}
});
