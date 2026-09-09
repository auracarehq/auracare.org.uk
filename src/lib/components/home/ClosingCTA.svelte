<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, NON_DEVICE_DISCLAIMER, PORTAL_APP_URL } from '$lib/data/company';
</script>

<!--
  The page's one conversion moment.

  This used to lead with the consumer portal, which is the wrong ask for an
  umbrella site whose audience is clinicians, providers and investors. The
  enquiry leads; the portal stays, in the position it deserves.
-->
<section id="contact" class="closing aura-space">
	<div class="container-wide closing-inner">
		<h2 use:reveal>Talk to us.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			We are raising our seed round, and we are looking for clinical partners as the CDSS moves
			toward its first trials.
		</p>

		<div class="paths">
			<div class="path" use:reveal={{ delay: 100 }}>
				<h3>Investors</h3>
				<p>One founder replies directly, depending on where you invest from.</p>
				<a class="btn-solid" href="/investors#contact">See the investor page</a>
			</div>
			<div class="path" use:reveal={{ delay: 140 }}>
				<h3>Clinical partners</h3>
				<p>Hospitals, practices and pharmacies working on decision support.</p>
				<a
					class="btn-ghost"
					href="mailto:{CONTACT.clinical}?subject=Auracare%3A%20clinical%20partnership"
				>
					Write to our clinical team
				</a>
			</div>
		</div>

		<!-- One foot, one rule, one left edge. The aside carried its own top
		     border but was capped at 62ch, so the rule stopped two-thirds of the
		     way across and read as a broken divider; and the fineprint was a
		     `container-wide` element whose own `max-width` overrode the
		     container's, leaving it centred as a narrow column of left-aligned
		     text that lined up with nothing else in the section. -->
		<div class="closing-foot">
			<p class="aside" use:reveal>
				The patient portal, the first stage of the pipeline, is in public beta and open to anyone. <a
					href={PORTAL_APP_URL}
					rel="noopener">Sign up for the beta</a
				>.
			</p>
			<p class="fineprint" use:reveal={{ delay: 60 }}>{NON_DEVICE_DISCLAIMER}</p>
		</div>
	</div>
</section>

<style>
	.closing {
		padding-block: clamp(4rem, 8vw, 7rem) clamp(2.5rem, 5vw, 4rem);
	}
	h2 {
		font-size: clamp(2.1rem, 4.6vw, 3.6rem);
		line-height: 1.15;
		letter-spacing: -0.035em;
		margin: 0 0 1.25rem;
		color: #fff;
	}
	.lede {
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		line-height: 1.7;
		max-width: 52ch;
		margin: 0;
	}

	.paths {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: clamp(2rem, 4vw, 3rem);
		border-top: 1px solid rgba(255, 255, 255, 0.16);
	}
	.path h3 {
		font-size: 0.74rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-300);
		margin: 0 0 0.75rem;
	}
	.path p {
		font-size: 0.95rem;
		line-height: 1.65;
		margin: 0 0 1.5rem;
		max-width: 40ch;
	}

	.closing-foot {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: clamp(1.75rem, 3vw, 2.25rem);
		border-top: 1px solid rgba(255, 255, 255, 0.16);
	}
	.aside {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.7;
		max-width: 62ch;
	}
	.aside a {
		color: #fff;
		border-bottom: 1px solid rgba(255, 255, 255, 0.35);
		transition: border-color var(--duration-hover) ease;
	}

	.fineprint {
		margin: clamp(1.75rem, 3vw, 2.5rem) 0 0;
		font-size: 0.78rem;
		line-height: 1.65;
		color: rgba(226, 230, 240, 0.45);
		max-width: 72ch;
	}

	@media (hover: hover) and (pointer: fine) {
		.aside a:hover {
			border-color: #fff;
		}
	}
	/* The two cards share one grid track, and a `1fr` track will not shrink
	   below the widest item's min-content. Both CTAs are `white-space: nowrap`
	   with 32px of padding a side, so "Write to our clinical team" demanded
	   297px inside a 273px column at 320px wide and pushed the whole document
	   1px past the viewport — enough for the page to scroll sideways.
	   `minmax(0, …)` lets the track shrink, and the buttons go full width so
	   they have somewhere to shrink to. */
	@media (max-width: 420px) {
		.paths {
			grid-template-columns: minmax(0, 1fr);
		}
		.path :global(.btn-solid),
		.path :global(.btn-ghost) {
			display: flex;
			width: 100%;
			white-space: normal;
			text-align: center;
			padding-inline: 1rem;
		}
	}

	@media (min-width: 800px) {
		.paths {
			grid-template-columns: repeat(2, 1fr);
			gap: 3.5rem;
		}
	}
</style>
