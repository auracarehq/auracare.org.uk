<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	const roles = [
		{
			title: 'ML / Neuro-symbolic Engineer',
			body: 'Build the reasoning core: a learned graph model paired with an auditable symbolic layer grounded in SNOMED CT and ICD-11.',
			subject: 'Careers: ML / Neuro-symbolic Engineer'
		},
		{
			title: 'Full Stack Engineer',
			body: 'Own the surfaces the patient portal lives on: a shared Kotlin Multiplatform core and Svelte web, from device connections to the daily check-in.',
			subject: 'Careers: Full Stack Engineer'
		},
		{
			title: 'Data / Connectors Engineer',
			body: 'Turn wearables, apps, health platforms and our own devices into clean, comparable signals for the patient portal and the clinical core. Consent and privacy are built in from the start, which means automating data requests and sign-on.',
			subject: 'Careers: Data / Connectors Engineer'
		},
		{
			title: 'Hardware / Firmware Engineer',
			body: 'Build our intake kit: blood pressure, temperature, height and weight devices made in-house, sending readings straight into the CDSS with no manual entry.',
			subject: 'Careers: Hardware / Firmware Engineer'
		},
		{
			title: 'Clinical & Regulatory Advisor',
			body: 'Hold the line between wellness and clinical decision support: safety framing, evidence generation and the regulatory path ahead for Auracare.',
			subject: 'Careers: Clinical & Regulatory Advisor'
		}
	];

	const mailto = (subject: string, body?: string) =>
		`mailto:${CONTACT.general}?subject=${encodeURIComponent(subject)}` +
		(body ? `&body=${encodeURIComponent(body)}` : '');
</script>

<Seo
	title="Careers"
	description="We're a small team building agentic healthcare, and we're hiring across ML, mobile, data, hardware and clinical/regulatory."
	path="/careers"
/>

<!-- 1) Hero -->
<PageHero
	title="Come build the health system that"
	accent="should exist."
	sub="A small team teaching machines to reason about health, for people at home and clinicians in the room. It is early and it is hard, and we will not pretend otherwise."
/>

<!-- 2) Why join -->
<section class="section-y why">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>Small team. Big problem. No org chart to hide in.</h2>
		<p class="why-lede" use:reveal={{ delay: 120 }}>
			You will own real work from day one and ship without collecting sign-offs. We build the hard
			parts ourselves rather than wrapping someone else's model, and we take safety seriously
			because there are real people on the other end.
		</p>
	</div>
</section>

<!-- 3) Open roles -->
<section class="section-y roles" id="roles">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>Where we’re hiring.</h2>
		<p class="roles-note" use:reveal={{ delay: 120 }}>
			Titles are a rough guide, not a checklist. Close enough? Interestingly different? Email us
			anyway. We hire people, not job descriptions.
		</p>
		<!-- A ruled list, like every other list on the site. These were bordered
		     cards in a two-up grid with pill buttons, which is the treatment the
		     rest of the site moved off. -->
		<ol class="role-list">
			{#each roles as role, i}
				<li class="role" use:reveal={{ delay: 100 + i * 60 }}>
					<span class="role-n">{String(i + 1).padStart(2, '0')}</span>
					<div class="role-body">
						<h3>{role.title}</h3>
						<p>{role.body}</p>
					</div>
					<a class="role-apply" href={mailto(role.subject)}>
						Apply <span aria-hidden="true">→</span>
					</a>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- 5) Closing CTA -->
<section class="closing aura-space">
	<div class="container-wide closing-inner">
		<h2 use:reveal>Don’t see your role? Invent it.</h2>
		<p use:reveal={{ delay: 60 }}>
			If you're great at something we forgot to list, tell us the problem you'd want to work on.
			Worst case, we say no and you've written one short email.
		</p>
		<div class="closing-actions" use:reveal={{ delay: 120 }}>
			<a class="btn-solid" href={mailto('Careers: speculative application')}>Get in touch</a>
			<a class="closing-address" href="mailto:{CONTACT.general}">{CONTACT.general}</a>
		</div>
	</div>
</section>

<style>
	/* A hairline between the pitch and the roles. Every other section boundary
	   on the site is ruled; these two ran together as one column of copy. */
	.roles {
		border-top: 1px solid var(--color-rule);
	}

	/* Roles as a ruled list. The apply link sits at the end of the row on a wide
	   screen and under the copy on a narrow one, so the row never has to choose
	   between wrapping the title and wrapping the button. */
	.role-list {
		list-style: none;
		margin: clamp(2.5rem, 5vw, 3.5rem) auto 0;
		padding: 0;
		max-width: 60rem;
		border-top: 1px solid var(--color-ink);
	}
	.role {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 0.75rem 1rem;
		padding-block: 1.6rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.role-n {
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-ink-faint);
		padding-top: 0.3rem;
	}
	.role h3 {
		font-size: 1.1rem;
		letter-spacing: -0.015em;
		margin: 0 0 0.35rem;
	}
	.role-body p {
		font-size: 0.94rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 62ch;
	}
	/* A standalone action, so it carries a real tap height rather than just
	   its line box. */
	.role-apply {
		@media (pointer: coarse) {
			min-height: 44px;
		}
		grid-column: 2;
		justify-self: start;
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
	.role-apply span {
		transition: transform var(--duration-hover) var(--ease-out);
	}

	/* The closing band, matched to the old product-page treatment. */
	.closing {
		padding-block: clamp(4rem, 8vw, 6.5rem);
		border-top: 1px solid var(--color-rule);
	}
	.closing-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.closing h2 {
		font-size: clamp(2.1rem, 4.6vw, 3.4rem);
		line-height: 1.15;
		letter-spacing: -0.035em;
		margin: 0;
		max-width: 20ch;
		color: #fff;
		text-wrap: balance;
	}
	.closing p {
		margin: clamp(1.25rem, 3vw, 1.75rem) 0 0;
		font-size: clamp(1rem, 1.35vw, 1.14rem);
		line-height: 1.7;
		max-width: 48ch;
		text-wrap: pretty;
	}
	.closing-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem 2rem;
		margin-top: clamp(2rem, 4vw, 2.75rem);
	}
	.closing-address {
		font-size: 0.9rem;
		color: rgba(226, 230, 240, 0.7);
		border-bottom: 1px solid rgba(255, 255, 255, 0.28);
		padding-bottom: 0.15rem;
		transition: color var(--duration-hover) ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.role-apply:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
		.role-apply:hover span {
			transform: translateX(3px);
		}
		.closing-address:hover {
			color: #fff;
		}
	}
	@media (min-width: 800px) {
		.role {
			grid-template-columns: 2.5rem minmax(0, 1fr) auto;
			align-items: center;
			gap: 1.5rem;
		}
		.role-apply {
			grid-column: 3;
			justify-self: end;
		}
	}
</style>
