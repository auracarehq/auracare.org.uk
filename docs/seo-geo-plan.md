# SEO & GEO plan — auracare.org.uk

Last reviewed: 2026-08-03

GEO here means _generative engine optimization_: being found, correctly described,
and cited by AI assistants (ChatGPT, Claude, Perplexity, Google AI Overviews),
alongside classic search SEO.

## Where we already stand (done, keep maintaining)

- Every route prerendered to static HTML (`src/routes/+layout.ts`) — crawlers and
  LLM fetchers get full markup with no JS execution needed.
- Per-page `<title>`, meta description, canonical, OG/Twitter cards via
  `src/lib/components/seo/Seo.svelte`.
- Site-wide Organization + WebSite JSON-LD in `+layout.svelte`; SoftwareApplication
  and BreadcrumbList on product pages.
- `sitemap.xml` (prerendered), `robots.txt` with an explicit AI-crawler policy,
  `llms.txt` site summary.
- Investor deck excluded end-to-end: robots disallow, meta noindex on `/deck`,
  `X-Robots-Tag: noindex` on the PDF (customStaticWebAppConfig in svelte.config.js).

## Phase 1 — technical hygiene (small fixes, this week)

1. **Search Console + Bing Webmaster Tools.** Verify the domain in both and submit
   the sitemap. Bing matters more than it used to: ChatGPT search retrieves via
   Bing's index. Check for crawl errors monthly.
2. **Self-host fonts.** DM Sans and Poppins load from Google Fonts (`app.html`).
   Self-hosting (e.g. `@fontsource` packages) removes a third-party critical-path
   request, improves LCP, and avoids a GDPR grey area. Keep `font-display: swap`.
3. **Real `lastmod` in the sitemap.** All routes currently share the build date.
   Either hardcode a per-route date bumped when a page materially changes, or
   derive from git (`git log -1 --format=%cs -- <file>`) at build time. Search
   engines discount sitemaps whose lastmod is always "today".
4. **Custom 404.** Add `src/routes/+error.svelte` with navigation back into the
   site so mistyped URLs don't dead-end.
5. **OG image check.** Confirm `/og/auracare-og.png` renders well in previews
   (Slack, iMessage, LinkedIn, X) — it's the image most humans and some
   assistants will see first.

## Phase 2 — structured data depth (this month)

1. **FAQPage JSON-LD.** Write a short FAQ on the pages where questions naturally
   arise ("Is Auratwin a medical device?", "Which wearables does it support?",
   "Is my health data shared?", "When does it launch?") and mark it up with
   FAQPage schema. Q&A-shaped content is disproportionately quoted by generative
   engines because it maps directly onto user prompts.
2. **Person schema with `sameAs`.** Extend the founder entries in
   `+layout.svelte` with `jobTitle` and `sameAs` links (LinkedIn, X, Google
   Scholar where relevant). This is how knowledge graphs and LLMs disambiguate
   "Stephen Okita, CTO of Auracare" from anyone else with the name.
3. **Organization `sameAs`.** Add the company's LinkedIn, Crunchbase, and
   Companies House URLs to the Organization node. Entity reconciliation across
   these sources is a core GEO signal.
4. **JobPosting schema on /careers** once roles are formalized — gets listings
   into Google Jobs for free.
5. **MedicalWebPage / claims review.** As clinical claims firm up, keep marketing
   copy and schema aligned with the regulatory position (Auratwin =
   general-wellness product, not a medical device; Auracare = in development).
   Never let schema claim more than the site does.

## Phase 3 — content for non-brand queries (ongoing, highest leverage)

The site currently ranks only for brand terms because every page is a product
page. Non-brand discovery — both search and AI answers — needs content that
answers real questions.

1. **Add a content section** (`/blog` or `/insights`). Target one clear query per
   post. Candidate topics matched to what the product actually does:
   - "What is a health digital twin?" (educational, high GEO citation potential)
   - "AI triage in primary care: what it can and can't do"
   - "Neuro-symbolic AI in clinical decision support" (technical credibility;
     links from /technology)
   - "Wearable data is useless without context" (opinion; the Auratwin thesis)
   - Comparison pages ("Auratwin vs. generic step-count apps") — comparison
     queries are among the most common assistant prompts.
2. **Structure every post for extraction**: a one-paragraph direct answer at the
   top, descriptive H2s phrased as questions, short factual sentences, dates on
   claims and statistics with a source link. Generative engines quote passages,
   not pages.
3. **Keep llms.txt in sync** — add a `## Insights` section listing posts as they
   ship. Consider `llms-full.txt` (full page text inlined) once there's enough
   content to justify it.
4. **Title tuning on existing pages.** Current titles are brand-led. Where it
   reads naturally, work the category term in — e.g. "Auracare: AI clinical
   decision support inside the consultation" — so pages can match non-brand
   queries without losing the brand voice.

## Phase 4 — off-site entity building (GEO's real battleground)

LLMs describe Auracare based on what the wider web says, not just auracare.org.uk.

1. **Consistent one-liner everywhere.** Use the same description (the llms.txt
   blockquote) on LinkedIn, Crunchbase, directories, and press boilerplate.
   Inconsistent descriptions fragment the entity.
2. **Profiles that LLM retrieval actually hits**: LinkedIn company page,
   Crunchbase, relevant UK digital-health directories, G2/Capterra when the
   product launches.
3. **Earned citations.** A handful of quality mentions (UK health-tech press,
   accelerator/university announcements, founder interviews or podcasts) do more
   for AI-answer presence than any on-site change. Prioritize pieces that state
   the facts you want repeated.
4. **Wikipedia/Wikidata** — only when genuinely notable; a Wikidata entity linked
   to Companies House is achievable earlier and feeds knowledge graphs.

## Phase 5 — measure

1. **Segment AI referrals in PostHog**: referrers containing `chatgpt.com`,
   `perplexity.ai`, `claude.ai`, `copilot.microsoft.com`, `gemini.google.com`.
   This is the GEO conversion metric.
2. **Log AI crawler hits** (Static Web Apps / Front Door logs): GPTBot, ClaudeBot,
   PerplexityBot, OAI-SearchBot fetch frequency shows whether the content is
   being retrieved at all.
3. **Monthly prompt audit.** Ask the major assistants: "What is Auracare?",
   "What is Auratwin?", "AI triage startups UK". Record what they say and cite;
   fix wrong facts at the source they cite.
4. **Search Console / Bing**: track non-brand impressions as Phase 3 content
   ships.
