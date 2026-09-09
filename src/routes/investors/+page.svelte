<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Roster from '$lib/components/layout/Roster.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import WorldMap from '$lib/components/WorldMap.svelte';
	import { reveal, countUp } from '$lib/actions/motion';
	import {
		CONTACT,
		INVESTOR_CONTACTS,
		PIPELINE_ROLE,
		PIPELINE_ROLE_EYEBROW,
		PIPELINE_ROLE_HEADING,
		TRACTION,
		type InvestorContactKey
	} from '$lib/data/company';
	import { getMember } from '$lib/data/team';

	/* Two routes to clinical revenue, moved here from the Auracare CDSS page:
	   route-to-market reasoning is investor material, not product material. */
	const clinicalPaths = [
		{
			key: 'A',
			title: 'Direct to digital services',
			body: 'API access to our CDSS engine for clinical service providers: ambient scribes, telehealth platforms, EMRs, triage tools and more.'
		},
		{
			key: 'B',
			title: 'Direct to service providers',
			body: 'Sold to hospitals, GP practices, pharmacies and other providers, priced on the clinician time our service saves.'
		}
	];

	/* The three founders, as team members, so this list renders through the same
	   roster the homepage uses rather than as a second treatment of the same
	   faces. What each page says beside a person differs; how a person is
	   presented does not. */
	const founders = (['stephen', 'hinlun', 'tanush'] as InvestorContactKey[]).flatMap((key) => {
		const contact = INVESTOR_CONTACTS[key];
		const member = getMember(contact.teamId);
		return member ? [{ member, contact }] : [];
	});
	const founderPeople = founders.map((f) => f.member);
	const contactFor = (id: string) => founders.find((f) => f.member.id === id)?.contact;

	const mailto = (email: string) =>
		`mailto:${email}?subject=${encodeURIComponent('Auracare AI Seed round')}`;

	/* Traction figures arrive as display strings ("$134k", "~$400k", "28"). Split
	   off whatever brackets the number so the digits can be counted up and the
	   prefix and suffix put back around them unchanged. */
	/* A date is not a quantity. "Dec 2026" parses as the number 2026, so without
	   this the ledger counted a year up from zero like a score. Anything shaped
	   like a month and a year renders as written. */
	const DATE_STAT = /^[A-Z][a-z]{2}\s+\d{4}$/;

	function splitStat(stat: string): { prefix: string; num: number; suffix: string } | null {
		if (DATE_STAT.test(stat)) return null;
		const m = stat.match(/^([^\d]*)([\d.,]+)(.*)$/);
		if (!m) return null;
		const num = parseFloat(m[2].replace(/,/g, ''));
		if (Number.isNaN(num)) return null;
		return { prefix: m[1], num, suffix: m[3] };
	}

	const traction = TRACTION.map((t) => ({ ...t, parts: splitStat(t.stat) }));

	const quickLinks = [
		{
			href: '/#pipeline',
			title: 'The pipeline',
			desc: 'The three stages providers buy: aggregation, reasoning and outputs.'
		},
		{
			href: '/technology',
			title: 'How the technology works',
			desc: 'The patient state, the reasoning loop and the safety gates, explained in full.'
		},
		{
			href: CONTACT.ontologyUrl,
			title: 'The live ontology',
			desc: '532,000 clinical concepts you can explore today.',
			external: true
		}
	];

	const faqs = [
		{
			q: 'How much are you raising?',
			a: 'We share the target and terms directly rather than posting them here. Write to the founder for your region and we’ll walk you through the deck.'
		},
		{
			q: 'What’s live today, and what isn’t?',
			a: 'The ontology is live and explorable: 532,000 clinical concepts. The patient portal, the aggregation stage, is in public beta and open to anyone. The CDSS core is in development, with clinical trials signed with EC Healthcare (December 2026) and the Chinese Academy of Sciences (February 2027), and the full pipeline targeted for clinics in 2027.'
		},
		{
			q: 'Who’s already backing you?',
			a: 'A $400k angel investment from Hong Kong, around $400k in resources from the Founders Factory Healthcare accelerator, and $134k in UK government funding. We built 28 UK pharmacy partnerships and piloted the CDSS across them, and two Chinese OEM partnerships build our examination hardware.'
		},
		{
			q: 'How do you handle regulation?',
			a: 'The patient portal ships as a general-wellness product under the FD&C Act §520(o)(1)(B) exclusion, so it never diagnoses or treats. The Auracare CDSS is clinical decision support; its regulatory pathway is under active review.'
		}
	];
</script>

<Seo
	title="Investors"
	description="Auracare is raising its seed round. Stephen Okita covers North America; Hinlun Chen covers Asia-Pacific; Tanush Pandey covers Europe. Write to the founder for your region."
	path="/investors"
/>

<!-- ================= Hero ================= -->
<PageHero
	title="We are raising our"
	accent="seed round."
	sub="The patient portal is in public beta and our first clinical trial begins in December 2026. This round builds the clinical core, certifies the hardware, and takes the portal from beta to scale."
/>

<!-- ================= Who to talk to ================= -->
<section id="contact" class="section-y who">
	<div class="container-wide">
		<h2 use:reveal>Find the founder who covers your region.</h2>
		<p class="lede" use:reveal={{ delay: 80 }}>
			We split coverage three ways and each founder answers their own mail. Whoever you write to is
			the person you will be dealing with, in your timezone, with no inbox in between.
		</p>
		<!-- The address sits under the role, where it belongs to the person, and
		     the right-hand column carries only what this page is saying about
		     them: the region they cover. The roster is capped and centred,
		     because two short lines of detail in a 1200px row left most of the
		     right-hand side empty. -->
		<Roster people={founderPeople} maxWidth="54rem">
			{#snippet under(member)}
				{@const contact = contactFor(member.id)}
				{#if contact}
					<a class="founder-mail" href={mailto(contact.email)}>{contact.email}</a>
				{/if}
			{/snippet}
			{#snippet detail(member)}
				{@const contact = contactFor(member.id)}
				{#if contact}
					<p class="founder-coverage">
						<span class="founder-covers">Covers</span>
						{contact.coverage}
					</p>
					<p class="founder-base">Based in {contact.basedIn}</p>
					<a class="founder-write" href={mailto(contact.email)}>
						Write to {member.name.split(' ')[0]} <span aria-hidden="true">&rarr;</span>
					</a>
				{/if}
			{/snippet}
		</Roster>
	</div>
</section>

<!-- ================= Already behind us ================= -->
<section class="section-y proof">
	<div class="container-wide">
		<h2 use:reveal>What's already behind us</h2>
		<!-- A ruled ledger of four figures. Each figure is seeded with its final
		     text so it is present above the fold and without JavaScript; the
		     count-up overwrites it once the row is scrolled to. -->
		<dl class="proof-grid">
			{#each traction as t, i (t.label)}
				<div class="proof-row" use:reveal={{ delay: 80 + i * 60 }}>
					<dt class="proof-stat">
						{#if t.parts}
							<span
								use:countUp={{
									value: t.parts.num,
									format: (n) => `${t.parts?.prefix ?? ''}${Math.round(n)}${t.parts?.suffix ?? ''}`
								}}>{t.stat}</span
							>
						{:else}
							{t.stat}
						{/if}
					</dt>
					<dd class="proof-label">{t.label}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<!-- ================= Business model ================= -->
<section class="section-y model">
	<div class="container-wide">
		<span class="model-eyebrow" use:reveal>{PIPELINE_ROLE_EYEBROW}</span>
		<h2 use:reveal={{ delay: 60 }}>{PIPELINE_ROLE_HEADING}</h2>
		<!-- A numbered argument, not three columns. These are three steps of one
		     case — revenue starts here, it feeds that, and this is the number to
		     hold us to — and side-by-side columns of equal weight flattened the
		     sequence out of it. Rows carry the order; the stat sits on the right
		     as the fact each step turns on. -->
		<ol class="model-grid">
			{#each PIPELINE_ROLE as role, i (role.title)}
				<li class="model-row" use:reveal={{ delay: 100 + i * 70 }}>
					<span class="model-n">{String(i + 1).padStart(2, '0')}</span>
					<div class="model-text">
						<h3>{role.title}</h3>
						<p>{role.body}</p>
					</div>
					<span class="model-stat">{role.stat}</span>
				</li>
			{/each}
		</ol>

		<h3 class="model-sub" use:reveal>Two routes to clinical revenue</h3>
		<div class="model-paths">
			{#each clinicalPaths as p, i (p.key)}
				<div class="model-path" use:reveal={{ delay: 80 + i * 70 }}>
					<span class="model-badge">Path {p.key}</span>
					<h4>{p.title}</h4>
					<p>{p.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= Rollout ================= -->
<WorldMap />

<!-- ================= Quick links ================= -->
<section class="section-y catchup">
	<div class="container-wide">
		<h2 use:reveal>If you're new to Auracare</h2>
		<p class="lede" use:reveal={{ delay: 80 }}>
			This page assumes you've seen the site. If you haven't, start with these.
		</p>
		<div class="catchup-grid">
			{#each quickLinks as link, i (link.href)}
				<a
					class="catchup-row"
					href={link.href}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener' : undefined}
					use:reveal={{ delay: 120 + i * 60 }}
				>
					<span class="catchup-title">
						{link.title}
						<span aria-hidden="true">{link.external ? '↗' : '→'}</span>
					</span>
					<span class="catchup-desc">{link.desc}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ================= FAQ ================= -->
<section class="section-y faq-sec">
	<div class="container-wide">
		<h2 use:reveal>FAQ</h2>
		<div class="faq-list">
			{#each faqs as f, i (f.q)}
				<details class="faq-item" use:reveal={{ delay: 60 + i * 50 }}>
					<summary>{f.q}</summary>
					<div class="faq-body"><p>{f.a}</p></div>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	/*
	  This page was the last one still built out of the old system: bordered
	  cards with a radius, a mono "Path A" pill, a green price-style chip, and
	  three different grid ratios. It is now ruled like the rest of the site,
	  and the people on it render through the same Roster the homepage uses.
	*/
	h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin: 0 0 1rem;
	}
	.lede {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.7;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 56ch;
	}
	.proof,
	.model,
	.catchup,
	.faq-sec {
		border-top: 1px solid var(--color-rule);
	}

	/* Who to talk to: the detail column beside each founder. The region is the
	   routing information, so it carries the size; the name and role beside it
	   already say who the person is. */
	.founder-coverage {
		margin: 0;
		font-size: clamp(1.05rem, 1.6vw, 1.3rem);
		font-family: var(--font-family-heading);
		font-weight: var(--weight-display);
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--color-ink);
	}
	.founder-covers {
		display: block;
		font-family: var(--font-family-sans);
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin-bottom: 0.35rem;
	}
	.founder-base {
		margin: 0.4rem 0 0;
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}
	/* A standalone action, so it carries a real tap height rather than just
	   its line box. */
	.founder-write {
		@media (pointer: coarse) {
			min-height: 44px;
		}
		margin-top: 0.9rem;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink);
		border-bottom: 1px solid var(--color-ink);
		padding-bottom: 0.25rem;
		transition:
			color var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}
	.founder-write span {
		transition: transform var(--duration-hover) var(--ease-out);
	}
	/* A mailto on its own line under the role, not a link inside a sentence. */
	.founder-mail {
		display: inline-flex;
		align-items: center;
		@media (pointer: coarse) {
			min-height: 44px;
		}
		margin-top: 0.15rem;
		font-size: 0.82rem;
		color: var(--color-ink-faint);
		transition: color var(--duration-hover) ease;
		overflow-wrap: anywhere;
	}

	/* Traction: a ledger, one figure per row. The figure column used to be a
	   fixed 12rem while the numbers themselves are barely half that, so each
	   label sat marooned ~120px to the right of its own number and the whole
	   block ran hard left under a centred heading. The column is now sized to
	   the widest figure, and the ledger is a centred measure like the heading
	   above it. */
	.proof-grid {
		margin: clamp(2.5rem, 5vw, 3.5rem) auto 0;
		max-width: 46rem;
		border-top: 1px solid var(--color-ink);
	}
	.proof-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.35rem;
		padding-block: 1.35rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.proof-stat {
		font-size: clamp(1.7rem, 3vw, 2.3rem);
		font-weight: var(--weight-display);
		font-family: var(--font-family-heading);
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}
	.proof-label {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 52ch;
	}

	/* The business model: three sequenced arguments, divided by rules. */
	/* Centred above the heading it introduces. app.css centres `.eyebrow`
	   specifically; this one carries its own name, so the shared rule never
	   reached it and it sat hard left over a centred h2. */
	.model-eyebrow {
		display: block;
		text-align: center;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin-bottom: 1rem;
	}
	.model-grid {
		list-style: none;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}
	.model-row {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 0.35rem 1rem;
		padding-block: 1.5rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.model-n {
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-ink-faint);
		padding-top: 0.25rem;
	}
	.model-stat {
		grid-column: 2;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.model-row h3,
	.model-path h4 {
		font-size: 1.08rem;
		letter-spacing: -0.015em;
		margin: 0 0 0.4rem;
	}
	.model-row p,
	.model-path p {
		font-size: 0.92rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 68ch;
	}
	.model-sub {
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding-top: clamp(1.75rem, 3vw, 2.5rem);
		border-top: 1px solid var(--color-ink);
		font-size: clamp(1.3rem, 2.4vw, 1.75rem);
		letter-spacing: -0.025em;
	}
	.model-paths {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.25rem;
		margin-top: 2rem;
	}
	.model-badge {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		margin-bottom: 0.75rem;
	}

	/* Quick links: ruled rows, not cards. */
	/* A centred measure rather than the full container. The rows carried a
	   60ch description inside a 1200px grid, so every row ended halfway across
	   and the right half of the block was empty. */
	.catchup-grid {
		display: grid;
		grid-template-columns: 1fr;
		max-width: 52rem;
		margin: clamp(2.5rem, 5vw, 3.5rem) auto 0;
		border-top: 1px solid var(--color-ink);
	}
	.catchup-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.4rem;
		padding-block: 1.35rem;
		border-bottom: 1px solid var(--color-rule);
		transition: color var(--duration-hover) ease;
	}
	.catchup-title {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: -0.015em;
		color: var(--color-ink);
	}
	.catchup-title span {
		color: var(--color-primary-600);
		transition: transform var(--duration-hover) var(--ease-out);
	}
	.catchup-desc {
		font-size: 0.92rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
	}

	/* FAQ: ruled rows with a plus that turns. */
	.faq-list {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		border-top: 1px solid var(--color-ink);
	}
	.faq-item {
		border-bottom: 1px solid var(--color-rule);
	}
	.faq-item summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1.5rem;
		padding-block: 1.25rem;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--color-ink);
		transition: color var(--duration-hover) ease;
	}
	.faq-item summary::-webkit-details-marker {
		display: none;
	}
	.faq-item summary::after {
		content: '+';
		flex: none;
		font-weight: 400;
		font-size: 1.35rem;
		line-height: 1;
		color: var(--color-primary-600);
		transition: transform var(--duration-hover) var(--ease-out);
	}
	.faq-item[open] summary::after {
		transform: rotate(45deg);
	}
	.faq-item summary:focus-visible {
		outline: 2px solid var(--color-primary-600);
		outline-offset: 2px;
	}
	/* The answer opens and closes on a transition rather than snapping. The
	   `interpolate-size` declaration in app.css is what lets `auto` be
	   animated; browsers without it fall back to the instant toggle, and the
	   answer is in the markup either way. */
	.faq-item::details-content {
		block-size: 0;
		overflow: hidden;
		transition:
			block-size 320ms var(--ease-out),
			content-visibility 320ms allow-discrete;
	}
	.faq-item[open]::details-content {
		block-size: auto;
	}
	.faq-item p {
		margin: 0;
		padding: 0 0 1.5rem;
		font-size: 0.95rem;
		line-height: 1.75;
		color: var(--color-ink-soft);
		max-width: 62ch;
	}

	@media (hover: hover) and (pointer: fine) {
		.founder-write:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
		.founder-write:hover span {
			transform: translateX(3px);
		}
		.founder-mail:hover {
			color: var(--color-primary-600);
		}
		.catchup-row:hover .catchup-title {
			color: var(--color-primary-600);
		}
		.catchup-row:hover .catchup-title span {
			transform: translateX(4px);
		}
		.faq-item summary:hover {
			color: var(--color-primary-600);
		}
	}

	@media (min-width: 760px) {
		.proof-row {
			grid-template-columns: minmax(0, 7.5rem) minmax(0, 1fr);
			gap: 1.5rem;
			align-items: baseline;
		}
		.catchup-row {
			grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
			gap: 2rem;
			align-items: baseline;
		}
	}
	@media (min-width: 880px) {
		/* The stat moves out to its own right-hand column, where it lines up
		   down the list and reads as the fact each row turns on. */
		.model-row {
			grid-template-columns: 2.5rem minmax(0, 1fr) 9rem;
			align-items: baseline;
			gap: 1.5rem;
		}
		.model-stat {
			grid-column: 3;
			text-align: right;
		}
		.model-paths {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0;
		}
		.model-path + .model-path {
			border-left: 1px solid var(--color-rule);
			padding-left: 3rem;
		}
		.model-path:first-child {
			padding-right: 3rem;
		}
	}
</style>
