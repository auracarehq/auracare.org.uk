import { dev } from '$app/environment';
import type { PostHog } from 'posthog-js';

// Project "Auracare.org.uk" on PostHog EU Cloud (project 238564). This is the
// write-only ingestion token, which PostHog documents as safe to ship in public
// apps, so it lives here rather than in a PUBLIC_* env var that would have to be
// mirrored into Vercel and every contributor's .env.
const POSTHOG_KEY = 'phc_xyiseSxRC7ukuXf2nEJ3bappbBBAUa3wpMbdL4Jxdtet';

// First-party path that vercel.json rewrites to PostHog's EU hosts in production
// and vite.config.ts proxies in dev. Keeping ingestion on our own origin means
// ad-blockers and locked-down NHS or corporate networks do not silently drop the
// traffic — Brave, for one, blocks the session-replay script outright when it is
// requested from posthog.com. Deliberately not named /analytics or /posthog,
// which blocklists match on too.
const PROXY_PATH = '/relay';

let client: PostHog | null = null;
let loading: Promise<void> | null = null;

/**
 * Load and initialise PostHog. Only ever called once the visitor has accepted
 * analytics from the consent banner, so the SDK is a dynamic import: decline it
 * and the bundle is never downloaded. Safe to call repeatedly.
 */
export function loadPostHog(): Promise<void> {
	if (loading) return loading;

	loading = import('posthog-js').then(({ default: posthog }) => {
		posthog.init(POSTHOG_KEY, {
			api_host: PROXY_PATH,
			// Without this, toolbar and session-replay links generated behind the
			// proxy would point at our own domain instead of the PostHog app.
			ui_host: 'https://eu.posthog.com',
			// Staying on '2026-05-30' rather than the newer '2026-06-25', which turns
			// on network-body streaming in session replay. We do not want request
			// bodies from this site leaving the browser.
			defaults: '2026-05-30',
			// Explicit rather than inherited from `defaults`: SvelteKit navigates
			// client-side, so pageviews have to come from history changes, and that
			// must not quietly change under us on an SDK upgrade.
			capture_pageview: 'history_change',
			person_profiles: 'identified_only',
			capture_exceptions: true,
			capture_heatmaps: true,
			// A visitor's email address must never reach a session replay.
			session_recording: { maskAllInputs: true },
			debug: dev
		});

		// Lets local traffic be filtered out of every PostHog view, and mirrors the
		// `mode` we already pass to Vercel Analytics.
		posthog.register({ environment: dev ? 'development' : 'production' });

		client = posthog;
	});

	return loading;
}

/**
 * Record a custom event. A no-op until PostHog has been initialised, which only
 * happens after the visitor accepts analytics — so callers must gate on consent
 * (and typically `await loadPostHog()`) before relying on this firing.
 */
export function capture(event: string, props?: Record<string, unknown>): void {
	client?.capture(event, props);
}

/**
 * Stop capturing for a visitor who withdraws consent after having accepted it.
 * Resets first so the stored ids are cleared, then records the opt-out, which
 * lives outside the persistence `reset` wipes.
 */
export function stopPostHog(): void {
	if (!client) return;
	client.reset(true);
	client.opt_out_capturing();
}
