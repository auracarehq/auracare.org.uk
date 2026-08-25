import type { RequestHandler } from './$types';

// PostHog is served from our own origin under /relay so that ad-blockers, which
// match on posthog.com hostnames, cannot silently drop analytics — Brave blocks
// the session-replay script outright when it is requested from posthog.com.
//
// On Vercel this was three `rewrites` in vercel.json. Azure Static Web Apps
// cannot rewrite to an external host (staticwebapp.config.json rewrites only
// resolve to paths inside the app or a linked backend), so the proxy has to run
// in our own SSR function instead. Keep the host split in sync with the dev-time
// proxy in vite.config.ts.
const ASSET_HOST = 'https://eu-assets.i.posthog.com';
const INGEST_HOST = 'https://eu.i.posthog.com';

// Headers that describe our hop to Azure, not the request we are forwarding.
// `authorization` matters more than it looks: Static Web Apps invokes the SSR
// function with its own `Bearer` token, and PostHog's asset host sits behind
// Azure Blob Storage, which rejects that token outright with a 400. Forwarding
// it breaks every /relay/static/* asset — recorder.js and surveys.js included —
// while leaving the extensionless ingestion endpoints working, so it fails in a
// way that is easy to miss.
const STRIP_REQUEST_HEADERS = new Set([
	'host',
	'authorization',
	'connection',
	'content-length',
	'accept-encoding',
	'x-forwarded-host',
	'x-forwarded-proto',
	'x-forwarded-for',
	'x-azure-fdid',
	'x-ms-original-url',
	'x-ms-auth-token'
]);

// Hop-by-hop and transport headers that must not be replayed to the browser.
const STRIP_RESPONSE_HEADERS = new Set([
	'connection',
	'content-encoding',
	'content-length',
	'transfer-encoding',
	'keep-alive'
]);

function upstreamFor(path: string): string {
	return path.startsWith('static/') || path.startsWith('array/') ? ASSET_HOST : INGEST_HOST;
}

const proxy: RequestHandler = async ({ params, request, url, fetch }) => {
	const path = params.path ?? '';
	const target = new URL(`${upstreamFor(path)}/${path}${url.search}`);

	const headers = new Headers();
	for (const [key, value] of request.headers) {
		if (!STRIP_REQUEST_HEADERS.has(key.toLowerCase())) headers.set(key, value);
	}
	// changeOrigin, as the Vite dev proxy does: PostHog routes on Host.
	headers.set('host', target.host);

	const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

	const upstream = await fetch(target, {
		method: request.method,
		headers,
		body: hasBody ? await request.arrayBuffer() : undefined,
		redirect: 'manual'
	});

	const responseHeaders = new Headers();
	for (const [key, value] of upstream.headers) {
		if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) responseHeaders.set(key, value);
	}

	return new Response(upstream.body, {
		status: upstream.status,
		statusText: upstream.statusText,
		headers: responseHeaders
	});
};

export const GET = proxy;
export const POST = proxy;
export const OPTIONS = proxy;
