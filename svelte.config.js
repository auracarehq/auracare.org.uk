import adapter from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// The adapter writes build/staticwebapp.config.json itself and ignores any
			// staticwebapp.config.json in the repo root, so the rules that used to live
			// in vercel.json have to be handed to it here. These routes are emitted
			// ahead of the adapter's own, and Static Web Apps takes the first match.
			customStaticWebAppConfig: {
				routes: [
					// Static Web Apps sends anything that looks like a file straight to
					// blob storage and never applies navigationFallback, so /relay
					// requests with an extension (array.js, static/*.js) would bypass the
					// SSR function that proxies PostHog. Force the whole prefix through it.
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
					// Apple's device-management lookup insists on JSON and reads it
					// cross-origin.
					{
						route: '/.well-known/com.apple.remotemanagement',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						}
					}
				],
				// Static Web Apps derives Content-Type from the file extension and a
				// route `headers` block cannot override it, so the Apple lookup has to
				// be mapped by extension or it is served as octet-stream.
				mimeTypes: { '.remotemanagement': 'application/json' },
				// The adapter still defaults to node:20; match .node-version instead.
				platform: { apiRuntime: 'node:22' }
			}
		})
	}
};

export default config;
