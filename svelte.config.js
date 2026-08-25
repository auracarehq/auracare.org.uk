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
				// The adapter still defaults to node:20; match .node-version instead.
				platform: { apiRuntime: 'node:22' }
			}
		})
	}
};

export default config;
