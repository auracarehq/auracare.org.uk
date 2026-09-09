<script lang="ts">
	import { CONTACT, NON_DEVICE_DISCLAIMER, PORTAL_APP_URL } from '$lib/data/company';
	const year = new Date().getFullYear();
</script>

<footer class="footer aura-space aura-space--ink">
	<div class="container-wide">
		<div class="footer-grid">
			<div class="footer-brand">
				<img src="/SVG/auracare-white.svg" alt="Auracare" class="footer-logo" />
				<p class="footer-tag">Revolutionizing frontline care.</p>
				<a class="footer-ontology" href={CONTACT.ontologyUrl} target="_blank" rel="noopener">
					Explore the ontology
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"
						><path
							d="M7 17L17 7M17 7H9M17 7v8"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</a>
			</div>

			<nav class="footer-col" aria-label="Platform">
				<h4>Platform</h4>
				<a href="/technology">Technology</a>
				<a href={CONTACT.ontologyUrl} target="_blank" rel="noopener">Ontology explorer</a>
				<a href={PORTAL_APP_URL}>Patient portal beta</a>
			</nav>

			<nav class="footer-col" aria-label="Company">
				<h4>Company</h4>
				<a href="/careers">Careers</a>
				<a href="/investors">For investors</a>
			</nav>

			<nav class="footer-col" aria-label="Legal">
				<h4>Legal</h4>
				<a href="/privacy-centre">Privacy Centre</a>
				<a href="/privacy">Privacy Policy</a>
				<a href="/privacy/consumer-health-data">Consumer health data</a>
				<a href="/terms">Terms</a>
				<a href="/cookies">Cookies</a>
				<a href="/accessibility">Accessibility</a>
			</nav>

			<div class="footer-col footer-contact">
				<h4>Contact</h4>
				<a href="mailto:{CONTACT.general}">{CONTACT.general}</a>
				<a href="mailto:{CONTACT.seed}">{CONTACT.seed}</a>
				<p class="footer-loc">{CONTACT.locations.join(' · ')}</p>
			</div>
		</div>

		<p class="footer-disclaimer">{NON_DEVICE_DISCLAIMER}</p>

		<div class="footer-bottom">
			<p>© {year} {CONTACT.legalName} · {CONTACT.jurisdiction}</p>
			<button class="footer-top" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>Back to top ↑</button
			>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding-block: clamp(3rem, 6vw, 5rem) 2rem;
		border-top: 1px solid var(--color-border-dark);
	}
	.footer-col h4 {
		font-family: var(--font-family-mono);
		font-weight: 700;
	}
	.footer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem 2rem;
	}
	.footer-brand {
		max-width: 20rem;
	}
	.footer-logo {
		height: 1.5rem;
		width: auto;
		margin-bottom: 1rem;
	}
	.footer-tag {
		color: rgba(226, 232, 255, 0.72) !important;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}
	/* A standalone action, so it carries a real tap height rather than just
	   its line box. */
	.footer-ontology {
		@media (pointer: coarse) {
			min-height: 44px;
		}
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--color-primary-300);
		font-size: 0.85rem;
		font-weight: 600;
	}
	.footer-ontology:hover {
		color: #fff;
	}
	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	/* Where the rows grow their own height, the gap gives way to it rather than
	   stacking both and spreading the column out. */
	@media (pointer: coarse) {
		.footer-col {
			gap: 0.1rem;
		}
	}
	.footer-col h4 {
		color: #fff;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin-bottom: 0.3rem;
	}
	/* This is the site's secondary navigation and it is on every page: a column
	   of block links a thumb has to land on. They were 22px tall — the line box
	   and nothing else. */
	.footer-col a {
		display: flex;
		align-items: center;
		@media (pointer: coarse) {
			min-height: 44px;
		}
		color: rgba(226, 232, 255, 0.7);
		font-size: 0.9rem;
	}
	.footer-col a:hover {
		color: #fff;
	}
	.footer-loc {
		color: rgba(226, 232, 255, 0.55) !important;
		font-size: 0.85rem;
	}
	.footer-disclaimer {
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		color: rgba(226, 232, 255, 0.5) !important;
		font-size: 0.78rem;
		line-height: 1.7;
		max-width: 52rem;
	}
	.footer-bottom {
		margin-top: 1.5rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
	}
	.footer-bottom p {
		color: rgba(226, 232, 255, 0.5) !important;
		font-size: 0.8rem;
	}
	/* A real control, not a line of text: it was 19px tall, which is under any
	   touch guideline and it sits at the very bottom of a long page where a
	   thumb reaches for it. */
	.footer-top {
		display: inline-flex;
		align-items: center;
		@media (pointer: coarse) {
			min-height: 44px;
		}
		color: rgba(226, 232, 255, 0.7);
		font-size: 0.8rem;
		font-weight: 600;
	}
	.footer-top:hover {
		color: #fff;
	}

	@media (min-width: 640px) {
		.footer-grid {
			grid-template-columns: 1.4fr 1fr 1fr;
		}
		.footer-brand {
			grid-column: 1 / -1;
		}
	}
	@media (min-width: 940px) {
		.footer-grid {
			grid-template-columns: 1.6fr 1fr 1fr 1fr 1.1fr;
		}
		.footer-brand {
			grid-column: auto;
		}
	}
</style>
