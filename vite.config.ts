import { sveltekit } from '@sveltejs/kit/vite';
import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		legacy({
			targets: ['defaults', 'not IE 11']
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
