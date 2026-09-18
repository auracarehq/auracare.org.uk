import adapter from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// The adapter writes build/staticwebapp.config.json itself and ignores any
			// staticwebapp.config.json in the repo, so every rule has to be handed to
			// it here. Custom routes are emitted ahead of the adapter's own and Static
			// Web Apps takes the first match.
			customStaticWebAppConfig: {
				routes: [
					// Static Web Apps sends anything that looks like a file straight to
					// blob storage without applying navigationFallback, so PostHog's
					// assets (array.js, static/recorder.js) would never reach the render
					// function. Force the whole prefix through it.
					{ route: '/relay/*', rewrite: '/api/sk_render' },
					// Kept out of search results: the deck is shared by link, not indexed.
					{
						route: '/auracare-deck.pdf',
						headers: { 'X-Robots-Tag': 'noindex, nofollow' }
					},
					{
						route: '/deck',
						headers: { 'X-Robots-Tag': 'noindex, nofollow' }
					},
					// Apple's device-management lookup reads this cross-origin.
					{
						route: '/.well-known/com.apple.remotemanagement',
						headers: { 'Access-Control-Allow-Origin': '*' }
					}
				],
				globalHeaders: {
					'X-Content-Type-Options': 'nosniff',
					'X-Frame-Options': 'SAMEORIGIN',
					'Referrer-Policy': 'strict-origin-when-cross-origin'
				},
				// Content-Type cannot be set from a route `headers` block — Static Web
				// Apps derives it from the extension, so the Apple lookup has to be
				// mapped here or it is served as octet-stream.
				mimeTypes: {
					'.json': 'text/json',
					'.remotemanagement': 'application/json',
					// Not in Static Web Apps' default table, so it was served as octet-stream.
					'.webmanifest': 'application/manifest+json'
				},
				// The adapter still defaults to node:20; match .node-version instead.
				platform: { apiRuntime: 'node:22' }
			}
		})
	}
};

export default config;
