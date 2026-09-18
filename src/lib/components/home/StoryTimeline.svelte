<script lang="ts">
	import { reveal, scrollProgress } from '$lib/actions/motion';
	import { TIMELINE } from '$lib/data/company';

	let progress = $state(0);

	const eraDot: Record<string, string> = {
		nhs: '#94a3b8',
		pivot: '#6180ff',
		ai: '#387ff5'
	};
</script>

<section class="story section-y" id="timeline" aria-labelledby="story-heading">
	<div class="container-wide">
		<div class="story-head">
			<h2 id="story-heading" use:reveal={{ delay: 60 }}>
				We began at the front line of care.<br />We built on every lesson it taught us.
			</h2>
			<p use:reveal={{ delay: 120 }}>
				Auracare started with twenty-eight pharmacies and an NHS API we could not reach until 2028.
			</p>
		</div>

		<div class="timeline" use:scrollProgress={{ onProgress: (p) => (progress = p) }}>
			<div class="tl-track" aria-hidden="true"></div>
			<div
				class="tl-fill"
				style="transform:scaleY({Math.min(1, progress * 1.18)})"
				aria-hidden="true"
			></div>

			<ol class="tl-list">
				{#each TIMELINE as m, i}
					<li
						class="tl-node"
						class:right={i % 2 === 1}
						class:is-fork={m.fork}
						use:reveal={{ threshold: 0.35 }}
					>
						<span class="tl-dot" style="--dot:{eraDot[m.era]}" aria-hidden="true"></span>
						<div class="tl-card glass-card" class:fork-card={m.fork} class:now-card={m.now}>
							<span class="tl-date">
								{m.date}
								{#if m.now}<span class="tl-now">We are here</span>{/if}
							</span>
							<h3>{m.title}</h3>
							<p>{m.body}</p>
							{#if m.fork}<span class="tl-forklabel">The pivot</span>{/if}
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.story {
		overflow: clip;
		background: var(--color-neutral-0);
	}
	.story-head {
		text-align: center;
		max-width: 46rem;
		margin: 0 auto clamp(2.5rem, 5vw, 4rem);
	}
	.story-head h2 {
		font-size: clamp(1.7rem, 3.6vw, 2.9rem);
		line-height: 1.15;
		margin-block: 0.6rem 0.9rem;
	}
	.story-head p {
		margin-inline: auto;
	}

	.timeline {
		position: relative;
		max-width: 60rem;
		margin: 0 auto;
		/* No trailing padding: it was part of what let the spine run past the
		   final entry. */
		padding-block: 0.5rem 0;
	}
	.tl-track,
	.tl-fill {
		position: absolute;
		top: 0;
		width: 3px;
		border-radius: var(--radius-xs);
	}
	/* The spine stops at the last entry. At `height: 100%` it inherited the
	   container's trailing space and the last node's bottom margin, so the line
	   carried on into empty page below the final entry. */
	/* The spine stops at the last entry, and its last stretch fades out rather
	   than ending on a hard cut: the story keeps going past the final entry, and a
	   line that simply stops reads as the end of it. */
	.tl-track {
		top: 6px;
		bottom: 0;
		height: auto;
		background: var(--color-border-dark);
		-webkit-mask-image: linear-gradient(to bottom, #000 0 82%, transparent 100%);
		mask-image: linear-gradient(to bottom, #000 0 82%, transparent 100%);
	}
	/* Driven by `transform`, not `height`.
	   The spine was resized by writing an inline height on every scroll frame,
	   with a transition running on that height and a mask over the top. Height
	   is a layout property, so each frame of every scroll on the homepage forced
	   a reflow of this element and a re-rasterise of its mask — the single most
	   expensive thing happening during a scroll. A scale is composited: no
	   layout, no repaint, same picture. */
	.tl-fill {
		top: 6px;
		bottom: 0;
		height: auto;
		transform-origin: top center;
		/* The one element on the site that earns this. It is masked, and a scale
		   on a masked element otherwise re-rasterises the mask each frame; its
		   own layer makes the scale purely a compositor operation. One 3px-wide
		   layer, not the 63 this was mistakenly spread across once before. */
		will-change: transform;
		background: var(--color-primary-400);
		-webkit-mask-image: linear-gradient(to bottom, #000 0 82%, transparent 100%);
		mask-image: linear-gradient(to bottom, #000 0 82%, transparent 100%);
	}
	.tl-track,
	.tl-fill {
		left: 18px;
	}

	.tl-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 3vw, 2.5rem);
	}
	.tl-node {
		position: relative;
		padding-left: 48px;
	}
	.tl-node:last-child {
		margin-bottom: 0;
	}
	.tl-dot {
		position: absolute;
		left: 8px;
		top: 6px;
		width: 22px;
		height: 22px;
		border-radius: 999px;
		background: var(--dot);
		border: 4px solid var(--color-neutral-0);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}
	.tl-date {
		display: inline-flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	/* The entry the company is actually in. Without it every date read as
	   equally distant, which made a shipped month look like a projection. */
	.tl-now {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		border: 1px solid var(--color-primary-600);
		padding: 0.15rem 0.45rem;
	}
	.now-card {
		border-color: var(--color-primary-600);
	}
	.tl-node.is-fork .tl-dot {
		width: 28px;
		height: 28px;
		left: 5px;
		top: 3px;
		outline: 1px solid var(--color-primary-400);
		outline-offset: 0px;
	}
	.tl-card {
		padding: 1.25rem 1.4rem;
		position: relative;
	}
	/* The brand blue, not the 300 tint. The tint is the shade meant for dark
	   grounds; on this section's white it came out at 2.08:1, which is the
	   lowest contrast anywhere on the site. */
	.tl-date {
		font-family: var(--font-family-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.tl-card h3 {
		font-size: 1.15rem;
		margin-block: 0.3rem 0.4rem;
	}
	.tl-card p {
		font-size: 0.92rem;
	}
	.fork-card {
		border-color: var(--color-border-strong);
	}
	.tl-forklabel {
		position: absolute;
		top: -0.7rem;
		right: 1.2rem;
		background: var(--color-primary-600);
		color: #fff;
		font-family: var(--font-family-mono);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.22rem 0.55rem;
		border-radius: var(--radius-sm);
	}

	/* Desktop: centre spine with alternating cards */
	@media (min-width: 820px) {
		.tl-track {
			left: 50%;
			transform: translateX(-50%);
		}
		/* The fill's transform carries the scale, so the centring is done with a
		   margin instead of a second transform that would overwrite it. */
		.tl-fill {
			left: 50%;
			margin-left: -1.5px;
		}
		.tl-list {
			gap: 0.5rem;
		}
		.tl-node {
			width: 50%;
			padding-left: 0;
			padding-right: 2.75rem;
			margin-bottom: 1.5rem;
		}
		.tl-node.right {
			margin-left: 50%;
			padding-left: 2.75rem;
			padding-right: 0;
		}
		.tl-dot {
			left: auto;
			right: -11px;
			top: 14px;
		}
		.tl-node.right .tl-dot {
			left: -11px;
			right: auto;
		}
		.tl-node.is-fork .tl-dot {
			right: -14px;
		}
		.tl-node.is-fork.right .tl-dot {
			left: -14px;
		}
	}
</style>
