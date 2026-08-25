import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';

// PostHog is served from our own origin under /relay so that ad-blockers, which
// match on posthog.com hostnames, cannot silently drop analytics. In production
// src/routes/relay/[...path]/+server.ts does this; locally the dev and preview
// servers proxy instead, so the SSR function does not have to run under Vite.
// Keep these rules in sync with that route's host split.
const posthogProxy = {
	'/relay/static': {
		target: 'https://eu-assets.i.posthog.com',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/relay/, '')
	},
	'/relay/array': {
		target: 'https://eu-assets.i.posthog.com',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/relay/, '')
	},
	'/relay': {
		target: 'https://eu.i.posthog.com',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/relay/, '')
	}
};

export default defineConfig({
	plugins: [sveltekit()],
	// Honour a PORT handed down by tooling (e.g. editor preview launchers that
	// pick a free port when 5173 is taken); fall back to Vite's default.
	server: { proxy: posthogProxy, port: Number(process.env.PORT) || undefined },
	preview: { proxy: posthogProxy },
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	}
});
