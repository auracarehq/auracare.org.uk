<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { cookieConsent } from '$lib/stores/cookieConsent';
	import { loadPostHog, stopPostHog } from '$lib/analytics/posthog';
	import SeedBanner from '$lib/components/layout/SeedBanner.svelte';
	import Nav from '$lib/components/layout/Nav.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	let { children } = $props();
	let headerEl = $state<HTMLElement | null>(null);

	// Only load analytics once the visitor has actively accepted it. This mirrors
	// the promise on /cookies ("optional and off until you say yes") and keeps us
	// consent-first under UK PECR/GDPR. Guarded so it loads at most once.
	let analyticsLoaded = false;
	$effect(() => {
		if ($cookieConsent === 'accepted' && !analyticsLoaded) {
			analyticsLoaded = true;
			loadPostHog();
		} else if ($cookieConsent === 'rejected') {
			// Only does anything if they accepted earlier in the session and then
			// changed their mind; a straight decline never loads PostHog at all.
			stopPostHog();
		}
	});

	onMount(() => {
		if (!headerEl) return;
		const setH = () =>
			document.documentElement.style.setProperty('--header-h', `${headerEl!.offsetHeight}px`);
		setH();
		const ro = new ResizeObserver(setH);
		ro.observe(headerEl);
		return () => ro.disconnect();
	});
</script>

<svelte:head>
	<!-- Per-page <title>, description, canonical and social tags are set by
	     $lib/components/seo/Seo.svelte on each route. Only site-wide structured
	     data lives here. -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "Organization",
					"@id": "https://auracare.org.uk/#organization",
					"name": "Auracare Health Ltd",
					"alternateName": "Auracare AI",
					"description": "Auracare builds two products on one patient model: Auratwin, a wellness companion that lives in your messages, and Auracare, clinical decision support that works inside the consultation.",
					"url": "https://auracare.org.uk",
					"logo": {
						"@type": "ImageObject",
						"url": "https://auracare.org.uk/icon-512.png",
						"width": 512,
						"height": 512
					},
					"foundingDate": "2025",
					"founder": [
						{ "@type": "Person", "name": "Tanush Pandey" },
						{ "@type": "Person", "name": "Stephen Okita" },
						{ "@type": "Person", "name": "Hinlun Chen" }
					],
					"address": { "@type": "PostalAddress", "addressCountry": "GB" },
					"contactPoint": {
						"@type": "ContactPoint",
						"email": "hello@auracare.org.uk",
						"contactType": "Customer Service"
					}
				},
				{
					"@type": "WebSite",
					"@id": "https://auracare.org.uk/#website",
					"name": "Auracare AI",
					"url": "https://auracare.org.uk",
					"description": "Two products on one patient model: Auratwin, a wellness companion in your messages, and Auracare, clinical decision support inside the consultation.",
					"publisher": { "@id": "https://auracare.org.uk/#organization" },
					"inLanguage": "en-GB"
				}
			]
		}
	</script>
</svelte:head>

<div class="site-header" bind:this={headerEl}>
	<SeedBanner />
	<Nav />
</div>

<main style="padding-top: var(--header-h, 92px)">
	{@render children?.()}
</main>

<SiteFooter />
<CookieBanner />

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
	}
</style>
