<script lang="ts">
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';
	import { flushSync } from 'svelte';
	import { slide } from 'svelte/transition';

	let mobileOpen = $state(false);
	/* Suppresses the slide-out for the one case where it should not play. */
	let closingForNav = $state(false);

	/* Shut the menu before the page changes, not as it changes.
	 *
	 * Each link used to close the menu from its own click handler, which set the
	 * state at the same moment the navigation began. The slide-out then ran
	 * across the page transition: the outgoing frame was captured with the menu
	 * still halfway shut, so it appeared to hang there and collapse over the
	 * incoming page. `flushSync` commits the close before the transition
	 * captures anything, and the outro is skipped because a menu that is closing
	 * because you left the page has nothing to animate to. */
	beforeNavigate(() => {
		if (!mobileOpen) return;
		flushSync(() => {
			closingForNav = true;
			mobileOpen = false;
		});
		closingForNav = false;
	});

	/* The header answers the scroll instead of sitting there as a white slab.
	   At the top it is borderless and lets the paper through; past the fold it
	   takes on the page tone, draws its rule, and carries a brand-blue line
	   showing how far down the document you are. The bar's height never
	   changes: the layout measures it into `--header-h` and feeds that to
	   main's padding, so anything that resized it would shift the whole page
	   under the reader's cursor. */
	let scrolled = $state(false);
	let progress = $state(0);

	$effect(() => {
		/* Reading `scrollY` is cheap; reacting to it is not. This used to run on
		   every scroll event, and each run assigned two pieces of state, so
		   Svelte rewrote the progress bar's inline style and the browser
		   recalculated styles once per event — and scroll events fire faster
		   than frames. Two things fix it: a frame throttle, so the work happens
		   at most once per painted frame, and quantising the progress so state
		   is only assigned when the bar would actually move. The bar is 2px of
		   scaleX, so anything finer than a few hundredths of a percent is
		   invisible and not worth a re-render.

		   The scrollable distance is the one expensive read, and it only changes
		   when the document does, so a ResizeObserver caches it. */
		let max = 0;
		let raf = 0;

		const measure = () => {
			raf = 0;
			const y = window.scrollY;
			const isScrolled = y > 8;
			if (isScrolled !== scrolled) scrolled = isScrolled;
			const next = max > 0 ? Math.round(Math.min(1, Math.max(0, y / max)) * 500) / 500 : 0;
			if (next !== progress) progress = next;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		const remeasure = () => {
			max = document.documentElement.scrollHeight - window.innerHeight;
			measure();
		};

		const ro = new ResizeObserver(remeasure);
		ro.observe(document.documentElement);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', remeasure);
		remeasure();

		return () => {
			ro.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', remeasure);
			if (raf) cancelAnimationFrame(raf);
		};
	});

	const links = [
		{ href: '/technology', label: 'Technology' },
		{ href: '/investors', label: 'Investors' },
		{ href: '/careers', label: 'Careers' }
	];

	const isActive = (href: string) =>
		page.url.pathname === href || (href !== '/' && page.url.pathname.startsWith(href + '/'));
</script>

<nav class="nav" class:nav--scrolled={scrolled} aria-label="Primary">
	<div class="container-wide nav-inner">
		<a href="/" class="nav-logo" aria-label="Auracare home">
			<img src="/SVG/Asset 5.svg" alt="Auracare" />
		</a>

		<div class="nav-links">
			{#each links as link}
				<a href={link.href} class="nav-item" class:active={isActive(link.href)}>{link.label}</a>
			{/each}
		</div>

		<div class="nav-cta">
			<a class="nav-cta" href="/investors#contact">Enquire</a>
		</div>

		<button
			class="nav-burger"
			aria-label="Menu"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			{#if mobileOpen}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
					><path
						d="M6 6l12 12M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/></svg
				>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
					><path
						d="M4 7h16M4 12h16M4 17h16"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/></svg
				>
			{/if}
		</button>
	</div>

	{#if mobileOpen}
		<div class="nav-mobile" transition:slide={{ duration: closingForNav ? 0 : 250 }}>
			<div class="container-wide nav-mobile-inner">
				{#each links as link}
					<a href={link.href} class="nav-mobile-item" onclick={() => (mobileOpen = false)}
						>{link.label}</a
					>
				{/each}
				<div class="nav-mobile-cta">
					<a class="nav-invest" href="/investors" onclick={() => (mobileOpen = false)}
						>For investors</a
					>
					<a class="nav-cta" href="/investors#contact" onclick={() => (mobileOpen = false)}
						>Enquire</a
					>
				</div>
			</div>
		</div>
	{/if}

	<span class="nav-progress" style="--p:{progress}" aria-hidden="true"></span>
</nav>

<style>
	.nav {
		position: relative;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition:
			background var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}
	/* Opaque paper rather than a blurred translucent pane: glassmorphism is
	   explicitly out of the system, and an opaque bar costs nothing to
	   composite while scrolling. */
	.nav--scrolled {
		background: var(--color-surface-page);
		border-bottom-color: var(--color-rule);
	}
	/* How far through the document you are, drawn on the header's own rule. */
	.nav-progress {
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 2px;
		width: 100%;
		transform: scaleX(var(--p, 0));
		transform-origin: left center;
		background: var(--color-primary-600);
		opacity: 0;
		transition: opacity var(--duration-hover) ease;
		pointer-events: none;
	}
	.nav--scrolled .nav-progress {
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.nav,
		.nav-progress {
			transition: none;
		}
	}
	.nav-inner {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding-block: 0.85rem;
	}
	.nav-logo {
		display: inline-flex;
		align-items: center;
		/* Matches the burger's reach, so both ends of the bar are equally
		   tappable without moving the logo. */
		@media (pointer: coarse) {
			min-height: 44px;
		}
	}
	.nav-logo img {
		height: 1.35rem;
		width: auto;
	}
	.nav-links {
		display: none;
		align-items: center;
		gap: 1.4rem;
		margin-left: 0.5rem;
	}
	.nav-item {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
		transition: color var(--duration-hover) ease;
		white-space: nowrap;
	}
	.nav-item:hover {
		color: var(--color-primary-600);
	}
	.nav-item.active {
		color: var(--color-ink);
		font-weight: 600;
	}
	.nav-cta {
		display: none;
		align-items: center;
		gap: 0.6rem;
		margin-left: auto;
	}
	.nav-invest {
		display: inline-flex;
		align-items: center;
		@media (pointer: coarse) {
			min-height: 44px;
		}
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
		padding: 0.5rem 0.4rem;
	}
	.nav-invest:hover {
		color: var(--color-ink);
	}
	.nav-cta {
		display: inline-flex;
		align-items: center;
		@media (pointer: coarse) {
			min-height: 44px;
		}
		font-size: 0.88rem;
		font-weight: 500;
		color: #fff;
		background: var(--color-primary-600);
		padding: 0.7rem 1.4rem;
		border-radius: 2px;
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			var(--shadow-xs);
		transition:
			background var(--duration-hover) ease,
			transform var(--duration-press) var(--ease-out);
		white-space: nowrap;
	}
	.nav-cta:active {
		transform: scale(0.97);
	}
	@media (hover: hover) and (pointer: fine) {
		.nav-cta:hover {
			background: #5971cd;
			color: #fff;
		}
	}
	/* The tap area is the button, not the glyph. This was 24x24 — the bare size
	   of the icon — which is the smallest thing on the page and the one control
	   a phone visitor has to hit first. The negative margin keeps the icon
	   optically where it was while the hit area grows around it. */
	.nav-burger {
		margin-left: auto;
		margin-right: -0.625rem;
		color: var(--color-ink);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		@media (pointer: coarse) {
			min-height: 44px;
		}
	}
	.nav-mobile {
		border-top: 1px solid var(--color-border-default);
		background: rgba(252, 252, 253, 0.98);
	}
	.nav-mobile-inner {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding-block: 1rem;
	}
	.nav-mobile-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		@media (pointer: coarse) {
			min-height: 44px;
		}
		font-size: 0.98rem;
		font-weight: 500;
		color: var(--color-ink-soft);
		padding: 0.6rem 0;
	}
	.nav-mobile-cta {
		display: flex;
		gap: 0.6rem;
		margin-top: 0.6rem;
		padding-top: 0.9rem;
		border-top: 1px solid var(--color-border-default);
	}
	.nav-mobile-cta .nav-cta,
	.nav-mobile-cta .nav-invest {
		text-align: center;
	}

	@media (min-width: 940px) {
		.nav-links,
		.nav-cta {
			display: flex;
		}
		.nav-burger {
			display: none;
		}
	}
</style>
