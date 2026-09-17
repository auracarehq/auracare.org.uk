<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	/* The standing figures. `value` is what counts and `suffix` is carried
	   through the formatter, so "532k" animates as 532 with the k pinned to it
	   rather than being skipped for not parsing as a number. */
	const standings = [
		{ label: 'Clinical trials', value: 2, suffix: '', note: 'Starting December 2026' },
		{ label: 'Pharmacy partnerships', value: 28, suffix: '', note: 'Where we piloted the CDSS' },
		{ label: 'Intake readings', value: 4, suffix: '', note: 'Sent straight into the CDSS' },
		{ label: 'Ontology, live today', value: 532, suffix: 'k', note: 'SNOMED CT concepts' }
	];
</script>

<!--
  Centred, and sized to be the loudest thing on the site.

  There is no product photograph or candid worth showing yet, so the claim has
  to carry the screen on its own. That argues for symmetry and scale rather
  than a left column with empty space beside it: centred, the headline reads as
  a statement of position; left-aligned with nothing to its right, it read as a
  column that lost its image.
-->
<section class="hero">
	<div class="container-wide hero-inner">
		<span class="kicker" use:reveal>Revolutionizing frontline care</span>

		<h1 use:reveal={{ delay: 80 }}>
			Personalized medicine<br />
			<em>needs the full picture.</em>
		</h1>

		<p class="hero-sub" use:reveal={{ delay: 160 }}>
			We build the infrastructure that supplies it: one pipeline that encodes a patient's daily
			life, the exam and the conversation, reasons over all of it, and hands the clinic the output.
		</p>

		<div class="hero-cta" use:reveal={{ delay: 220 }}>
			<a class="cta-primary" href="/investors#contact">We are raising a seed round</a>
			<a
				class="cta-ghost"
				href="mailto:{CONTACT.clinical}?subject=Auracare%3A%20clinical%20enquiry"
			>
				Clinical enquiries <span aria-hidden="true">&rarr;</span>
			</a>
		</div>
	</div>

	<!-- The rail is revealed as a whole, not just cell by cell. Its top rule is
	     the strongest line in the hero and it lands just below the fold on a
	     laptop, so on load it read as a stray divider ruled across the bottom of
	     the screen with nothing under it. Revealing the container means the rule
	     arrives with the figures it belongs to. -->
	<dl class="standings" use:reveal={{ delay: 240 }}>
		{#each standings as s, i (s.label)}
			<div class="standing" use:reveal={{ delay: 260 + i * 40 }}>
				<dt>{s.label}</dt>
				<!-- Seeded with the final value so the figure is present before the
				     count-up runs, and without JavaScript at all. -->
				<dd
					use:countUp={{
						value: s.value,
						format: (v) => Math.round(v).toLocaleString() + s.suffix
					}}
				>
					{s.value}{s.suffix}
				</dd>
				<span class="standing-note">{s.note}</span>
			</div>
		{/each}
	</dl>
</section>

<style>
	.hero {
		--hero-pad: clamp(4rem, 11vw, 9rem);
		position: relative;
		padding-top: var(--hero-pad);
	}
	/* The statement fills the first screen, so the rail below it starts at the
	   fold rather than partway up it. At certain window heights the rail's top
	   rule landed just inside the viewport with its figures below the cut, which
	   read as a stray hairline ruled across the bottom of the page. `svh` rather
	   than `vh` so a mobile toolbar collapsing does not leave a gap. */
	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-height: calc(100svh - var(--header-h, 92px) - var(--hero-pad));
		/* Keeps the buttons off the rule on a short window, where the centred
		   content would otherwise sit flush against it. */
		padding-bottom: clamp(2rem, 4vw, 3.5rem);
	}

	.kicker {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		padding-bottom: clamp(1.75rem, 4vw, 2.75rem);
	}

	/* The largest type on the site by a clear margin. Bold, tight and set on
	   three authored lines so the shape is deliberate at every width. */
	.hero h1 {
		font-size: clamp(2.5rem, 7vw, 5.8rem);
		line-height: 0.98;
		letter-spacing: -0.038em;
		font-weight: 600;
		margin: 0;
		text-wrap: balance;
	}
	/* One line in the brand blue. Nothing else on this screen is coloured. */
	.hero h1 em {
		font-style: normal;
		color: var(--color-primary-600);
	}

	.hero-sub {
		margin: clamp(1.75rem, 3.5vw, 2.5rem) auto 0;
		font-size: clamp(1.02rem, 1.4vw, 1.2rem);
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 52ch;
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1.5rem 2rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		background: var(--color-ink);
		color: var(--color-surface-page);
		font-size: 0.76rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 1.15rem 2.25rem;
		border-radius: 2px;
		transition:
			background var(--duration-hover) ease,
			transform var(--duration-press) var(--ease-out);
	}
	.cta-primary:active {
		transform: scale(0.98);
	}
	/* A standalone action, so it carries a real tap height rather than just
	   its line box. */
	.cta-ghost {
		@media (pointer: coarse) {
			min-height: 44px;
		}
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.76rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink);
		padding-bottom: 0.3rem;
		border-bottom: 1px solid var(--color-ink);
		transition:
			color var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}
	.cta-ghost span {
		transition: transform var(--duration-hover) var(--ease-out);
	}

	@media (hover: hover) and (pointer: fine) {
		.cta-primary:hover {
			background: var(--color-primary-600);
		}
		.cta-ghost:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
		.cta-ghost:hover span {
			transform: translateX(4px);
		}
	}

	/* A ruled rail of standing figures. It closes the hero with something
	   checkable rather than with more claim. */
	.standings {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		/* No top margin: the hero above already fills the screen and centres its
		   own content, so the rule lands exactly on the fold. A margin on top of
		   that just pushed the figures further out of sight. */
		margin: 0;
		border-top: 1px solid var(--color-ink);
		border-bottom: 1px solid var(--color-rule);
	}
	.standing {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.4rem;
		padding: clamp(1.5rem, 3vw, 2.25rem) 1rem;
		border-right: 1px solid var(--color-rule);
		border-bottom: 1px solid var(--color-rule);
	}
	.standing dt {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.standing dd {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		letter-spacing: -0.035em;
		line-height: 1;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}
	.standing-note {
		font-size: 0.78rem;
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 22ch;
	}

	@media (min-width: 760px) {
		.standings {
			grid-template-columns: repeat(4, 1fr);
			border-bottom: 0;
		}
		.standing {
			border-bottom: 0;
		}
		.standing:last-child {
			border-right: 0;
		}
	}
</style>
