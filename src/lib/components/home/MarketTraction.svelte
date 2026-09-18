<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import { TRACTION, FOUNDATION_TITLE, FOUNDATION_POINTS } from '$lib/data/company';

	/* The institutions behind the two points below. Heights are set per logo
	   rather than uniformly: a two-line lockup and a one-line wordmark set to
	   the same height do not read as the same size. All three are recoloured to
	   one navy (--color-primary-900) so they sit as a set rather than as three
	   pasted screenshots in three different brand colours. */
	const crests = [
		{ src: '/logos/imperial-college-london.png', alt: 'Imperial College London', h: '2.6rem' },
		{ src: '/logos/uc-berkeley.png', alt: 'UC Berkeley', h: '1.6rem' },
		{
			src: '/logos/chinese-academy-of-sciences.png',
			alt: 'Chinese Academy of Sciences',
			h: '2.2rem'
		}
	];

	/* Pull the number out of a stat however it is written, so "$134k" and
	   "~$400k" animate too. Previously only a bare integer matched, which is
	   why 28 was the only figure that moved. The prefix and suffix are kept so
	   the currency symbol and the "k" render around the counting digits. */
	/* A date is not a quantity. "Dec 2026" parses as the number 2026, so without
	   this the ledger counted a year up from zero like a score. Anything shaped
	   like a month and a year renders as written. */
	const DATE_STAT = /^[A-Z][a-z]{2}\s+\d{4}$/;

	function parseStat(stat: string): { prefix: string; num: number; suffix: string } | null {
		if (DATE_STAT.test(stat)) return null;
		const m = stat.match(/^([^\d]*)([\d,.]+)(.*)$/);
		if (!m) return null;
		const num = Number(m[2].replace(/,/g, ''));
		return Number.isFinite(num) ? { prefix: m[1], num, suffix: m[3] } : null;
	}
</script>

<!--
  Traction as a ruled ledger rather than a grid of stat tiles.

  Each line is a figure and what it refers to, which is how someone assessing
  the company would want to read it, and it stops four unrelated numbers from
  competing for the same visual weight.
-->
<section class="market section-y">
	<div class="container-wide">
		<h2 use:reveal>Early days, real momentum.</h2>
		<p class="market-sub" use:reveal={{ delay: 60 }}>
			Funding, partnerships and clinical trials lined up.
		</p>

		<dl class="ledger">
			{#each TRACTION as item (item.label)}
				{@const parsed = parseStat(item.stat)}
				<div class="row" use:reveal={{ delay: 40 }}>
					<dt>{item.label}</dt>
					<dd>
						{#if parsed}
							<!-- Seeded with the final value so the figure is present before the
							     count-up runs, and without JavaScript at all. -->
							<span
								use:countUp={{
									value: parsed.num,
									format: (v) => parsed.prefix + Math.round(v).toLocaleString() + parsed.suffix
								}}>{item.stat}</span
							>
						{:else}
							{item.stat}
						{/if}
					</dd>
				</div>
			{/each}
		</dl>

		<div class="foundation">
			<h3 use:reveal>{FOUNDATION_TITLE}</h3>
			<ul class="crests" use:reveal={{ delay: 60 }}>
				{#each crests as crest (crest.src)}
					<li><img src={crest.src} alt={crest.alt} style="--h:{crest.h}" loading="lazy" /></li>
				{/each}
			</ul>
			<div class="points">
				{#each FOUNDATION_POINTS as point, i (point.title)}
					<div class="point" use:reveal={{ delay: 100 + i * 70 }}>
						<h4>{point.title}</h4>
						<p>{point.body}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.market {
		border-top: 1px solid var(--color-rule);
	}
	h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin: 0 0 1.25rem;
	}
	.market-sub {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 52ch;
		margin: 0;
	}

	.ledger {
		margin: clamp(2.5rem, 5vw, 4rem) 0 0;
		border-top: 1px solid var(--color-ink);
	}
	.row {
		display: flex;
		/* Centred, not baseline-aligned. The label is 0.82rem and the figure runs
		   to 2.6rem, so sharing a baseline pinned the label to the bottom of the
		   row and left it sitting well below the middle of its own rule. */
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding-block: 1.35rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.row dt {
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		max-width: 52ch;
	}
	/* Below 375px the longest label is squeezed into 141px beside a date and
	   wraps to four lines, leaving that row half again as tall as every other
	   and breaking the even rhythm the ledger depends on. Stacked, the label
	   gets the full column back and the rows even out. 375px because the rows
	   are already uniform at that width and above: only the genuinely narrow
	   phones need this. */
	@media (max-width: 374px) {
		.row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.4rem;
		}
	}

	.row dd {
		margin: 0;
		font-size: clamp(1.6rem, 3.2vw, 2.6rem);
		font-weight: var(--weight-display);
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	/* Centred as a block under a centred heading. It used to run hard left while
	   everything above it sat on the page's centre line, which read as a section
	   that had come loose. The body copy inside stays left-aligned, because
	   centred prose in two columns is not readable. */
	.foundation {
		margin-top: clamp(3rem, 6vw, 4.5rem);
		padding-top: clamp(2rem, 4vw, 3rem);
		border-top: 1px solid var(--color-ink);
		text-align: center;
	}
	.foundation h3 {
		font-size: clamp(1.15rem, 2vw, 1.5rem);
		letter-spacing: -0.02em;
		margin: 0 auto;
		max-width: 34ch;
	}
	/* The heading and the logo row are one unit: the heading names the
	   institutions and the row shows them. The space between them is therefore
	   tighter than the space separating the pair from the copy below. It used
	   to be a flat 2rem that sat between the two and belonged to neither. */
	.crests {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: clamp(2rem, 5vw, 4rem);
		margin: clamp(1.5rem, 2.5vw, 1.75rem) 0 clamp(2.75rem, 5vw, 3.75rem);
		padding: 0;
	}
	.crests img {
		display: block;
		height: var(--h);
		width: auto;
	}
	.points {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.75rem;
		text-align: left;
		max-width: 62rem;
		margin-inline: auto;
	}
	.point h4 {
		font-size: 0.98rem;
		margin: 0 0 0.4rem;
	}
	.point p {
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 52ch;
	}

	@media (min-width: 860px) {
		.points {
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem;
		}
	}
</style>
