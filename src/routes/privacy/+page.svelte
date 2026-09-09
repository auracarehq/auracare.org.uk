<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
</script>

<Seo
	title="Privacy"
	description="How Auracare handles your data across the UK, US, Canada and Australia: explicit consent, sensitive health data, and the regional privacy rights that apply to you."
	path="/privacy"
	noindex={false}
/>

<PageHero
	title="Your health data,"
	accent="on your terms."
	accentOwnLine
	sub="This policy explains what we collect, why, and the control you keep over it. Our patient portal connects only the sources you choose, and your consent is explicit, per-source and revocable at any time."
	meta="Privacy · Last updated 6 August 2026"
/>

<section class="policy section-y">
	<div class="container-wide">
		<article class="prose">
			<h2 id="who-we-are">Who we are</h2>
			<p>
				{CONTACT.legalName} (“Auracare”, “we”, “us”) is the data controller for the personal data described
				in this policy. We are a company registered in {CONTACT.jurisdiction}, company number
				16747281, with our registered office at Apartment 904, Holmby House, 2 Prospect Way, London
				SW11 8DJ. We are registered with the Information Commissioner’s Office under number
				ZC126946.
			</p>
			<p>
				We have appointed a Data Protection Officer, Mr Ahnaf Kabir, who you can reach directly at
				<a href="mailto:ahnaf@auracare.org.uk">ahnaf@auracare.org.uk</a>. For any privacy question,
				or to exercise your rights, contact
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>. Either route works.
			</p>

			<h2 id="scope">What this policy covers</h2>
			<p>
				This policy covers two things. First, our patient portal (the “Portal”): a consumer product
				that builds a personal health “digital twin” from the wearables and apps you connect, and
				checks in with you over the messaging apps you already use, such as iMessage, WhatsApp or
				RCS. Second, this website itself: visiting it, signing up for the Portal’s public beta,
				writing to us with a question or an investor enquiry, and the optional analytics described
				in our <a href="/cookies">cookie policy</a>.
			</p>
			<p>
				The Portal is a general-wellness product, not a medical device. It is designed to help you
				understand your own patterns. It does not diagnose, treat, dose or clinically interpret your
				data. Aura is an AI companion, and will always tell you so: you are never talking to a
				person.
			</p>
			<p>
				The Portal is offered in the United Kingdom, the United States, Canada and Australia. The
				whole of this policy applies wherever you are; the
				<a href="#regional">regional terms</a> section adds the rights and commitments specific to
				your region, and Washington and Nevada residents also have a dedicated
				<a href="/privacy/consumer-health-data">Consumer Health Data Privacy Policy</a>.
			</p>

			<h2 id="data-we-process">The data we process</h2>
			<h3>Account data</h3>
			<p>
				When you join, we process the details needed to run your account (such as your name, email
				address and the mobile identity you use to message the Portal), together with basic app and
				delivery logs that keep the service reliable and secure.
			</p>
			<h3>Website visitors and beta sign-ups</h3>
			<p>
				You don’t need an account to visit this site, and most visits leave nothing behind. What we
				do process: the email address, and any name or details you choose to add, when you sign up
				for the Portal’s public beta; the contents of your message when you write to
				<a href="mailto:{CONTACT.general}">{CONTACT.general}</a> or
				<a href="mailto:{CONTACT.seed}">{CONTACT.seed}</a>; short-lived server logs that keep the
				site secure; and, only if you accept them from the consent banner, the optional analytics
				described in our <a href="/cookies">cookie policy</a> (Vercel Web Analytics, and PostHog, which
				also records a replay of your visit to this website with anything you type masked). If you decline,
				analytics never loads.
			</p>
			<p>
				We use this data to operate the site, to tell you about the Portal, and to respond to you.
				Sign-up emails are used only for launch and product updates, every one includes an
				unsubscribe, and we delete your address on request, or within 6 months after launch.
			</p>
			<h3>Health &amp; wellness data you connect</h3>
			<p>
				When you connect a source, the Portal processes the general health and wellness information
				it provides, such as sleep, activity and recovery trends from the wearables and apps you
				choose to link. You decide which sources to connect, and you can disconnect any of them at
				any time.
			</p>
			<h3>What you tell Aura in conversation</h3>
			<p>
				Talking to Aura is how the service works, so your conversations are part of the data we
				process: the things you tell it about how you feel, what you ate and your habits, and the
				wellness inferences your twin draws from them (for example, your sleep baseline). Voice
				notes are transcribed and the audio is then discarded; we do not create voiceprints and we
				do not use biometric identification.
			</p>
			<h3>Reproductive and cycle data, only if you tell Aura</h3>
			<p>
				If you choose to tell Aura about your menstrual cycle, such as when a period starts, we
				process that alongside the rest of your data and your twin uses it as context for the
				patterns it already tracks, for example knowing that a higher resting heart rate later in
				your cycle is expected rather than a sign of strain. You are never asked for it and the
				Portal works fully without it. Aura does not predict fertile windows or ovulation, does not
				give contraception or conception guidance, and does not tell you what a change in your cycle
				might mean medically.
			</p>
			<h3>Precise location, only if you opt in</h3>
			<p>
				If you separately opt in, the Portal processes your precise location to give your guidance
				context, such as time zones, travel and where your routines happen. This is optional: the
				Portal works fully without it, and you can turn it off at any time. We never use your
				location to infer visits to healthcare facilities, and we do not geofence health services.
			</p>
			<p>
				Health data, whether it comes from a source you connect or from something you tell Aura, is
				sensitive personal data: special-category data under UK and EU law, and sensitive
				information under US, Canadian and Australian law. This includes reproductive and cycle
				data, which several of these laws single out for the strictest treatment. We treat it with
				the heightened protection that classification requires, wherever you are.
			</p>

			<h2 id="lawful-basis">Our lawful bases</h2>
			<p>
				For your health data, we rely on your consent (Article 6(1)(a) UK GDPR) together with your
				explicit consent under the special-category condition (Article 9(2)(a) UK GDPR, and its
				regional equivalents such as EU GDPR Article 9, US state opt-in rules, Australian Privacy
				Principle 3 and Canadian express consent). That consent is:
			</p>
			<ul>
				<li>Explicit: you actively opt in before any health data is processed.</li>
				<li>
					Per-source: you consent to each connector separately, and can connect or disconnect them
					one at a time.
				</li>
				<li>
					Revocable at any time: withdrawing consent is as easy as giving it, and stops future
					processing of that source.
				</li>
			</ul>
			<p>
				Alongside that, three quieter bases. We process your account data, and run the service you
				signed up for, because our contract with you requires it (Article 6(1)(b)). We keep the site
				and service secure, maintain server logs and improve what we build, where none of that
				involves your health data, under our legitimate interests (Article 6(1)(f)). And beta
				sign-up emails and website analytics run on your consent, which you can withdraw at any
				time.
			</p>

			<h2 id="how-we-use-it">How we use your data</h2>
			<p>We use your data to:</p>
			<ul>
				<li>build and maintain your personal health digital twin;</li>
				<li>learn your baselines and notice meaningful changes;</li>
				<li>
					send you check-ins: a morning brief, an evening wrap, and nudges when your data warrants
					one. You control how present Aura is, and you can quieten or stop check-ins at any time;
				</li>
				<li>operate, secure and improve the service.</li>
			</ul>
			<p>
				We do not use your health data for advertising, and we do not sell data that identifies you.
			</p>

			<h2 id="profiling">Profiling and automated decisions</h2>
			<p>
				Building your twin involves profiling: the Portal analyses the data you share to learn your
				baselines and spot meaningful changes. That is the product doing its job, and it stays under
				your control. We do not make solely automated decisions about you that have legal or
				similarly significant effects. Aura’s nudges are wellness suggestions, nothing more: you can
				ignore any of them, and you can switch them off.
			</p>

			<h2 id="connectors">Wearable connectors</h2>
			<p>
				The Portal only pulls data from the sources you explicitly connect. Nothing is collected
				from a source you have not authorised. Connections use each provider’s standard
				authorisation flow, and the access tokens we hold on your behalf are encrypted at rest. When
				you disconnect a source, we stop pulling new data from it.
			</p>

			<h2 id="residency">Where your data is processed</h2>
			<p>
				Today, your data is processed in the United Kingdom, the European Union and the United
				States, including by US-based AI and infrastructure providers. We are building towards
				processing within our own UK/EU cloud tenant, and we will update this section as that
				infrastructure matures. Where data leaves the UK, we rely on the ICO’s International Data
				Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses, and on
				equivalent safeguards where the laws of other regions apply.
			</p>

			<h2 id="sharing">Sharing your data</h2>
			<p>
				We do not sell personal data that identifies you. We do not share your health data with
				third parties without your consent. We use a small number of service providers, strictly to
				operate the Portal and this site; they act on our instructions under contract and may not
				use your data for their own purposes:
			</p>
			<ul>
				<li>cloud hosting, where the service and your twin run;</li>
				<li>message delivery, so Aura’s check-ins reach you;</li>
				<li>
					AI model providers, which process your conversations to power Aura and are contractually
					prohibited from using your data to train their own models;
				</li>
				<li>
					analytics, for this website only, held in the European Union and never involving health
					data.
				</li>
			</ul>
			<p>
				One honest note on messaging. When you talk to Aura over iMessage, WhatsApp or RCS, delivery
				necessarily passes through that platform (Apple, Meta, or your mobile carrier) and is
				subject to that platform’s own security and terms. We do not control those platforms, and
				you choose the channel.
			</p>
			<p>We may disclose data where we are legally required to do so.</p>

			<h2 id="aggregated">Aggregated &amp; de-identified data</h2>
			<p>
				We may combine and transform the information we hold into aggregated or de-identified form
				that no longer identifies you, or any individual, and cannot reasonably be linked back to a
				person. We take technical and organisational measures to make sure it stays that way, and it
				never includes your precise location or your reproductive and cycle data. Once information
				has been de-identified in this way it is no longer personal data about you. We may use and
				share it, for example to understand health and wellness trends, to carry out research, to
				develop and improve our products and models, and for other business purposes. Whenever we
				do, we publicly commit to maintaining it in de-identified form, we will never attempt to
				re-identify anyone from it, and we contractually require anyone who receives it to commit to
				the same.
			</p>

			<h2 id="retention">Retention &amp; deletion</h2>
			<p>
				We keep your personal data only for as long as we need it to provide the service to you, or
				as required by law. When you delete your account, or ask us to erase your data, we delete or
				irreversibly anonymise it within 30 days, except where we must retain something to meet a
				legal obligation. Backups purge on a rolling cycle of up to 90 days.
			</p>
			<p>
				Aggregated or de-identified data we created before your deletion is no longer personal data
				about you, and it survives account deletion in that form.
			</p>

			<h2 id="children">Children</h2>
			<p>
				The Portal and its beta are for adults: you must be at least 18 to use the Portal or to sign
				up for the beta. The service is not directed at children, we do not knowingly collect data
				from anyone under 18, and if we learn that we have, we will delete it.
			</p>

			<h2 id="your-rights">Your rights</h2>
			<p>Wherever you live, you have the right to:</p>
			<ul>
				<li>access the personal data we hold about you;</li>
				<li>rectify data that is inaccurate or incomplete;</li>
				<li>erase your data (“the right to be forgotten”);</li>
				<li>port your data: receive it in a portable, machine-readable format;</li>
				<li>withdraw consent at any time, per source, without affecting past processing;</li>
				<li>
					complain to your data protection regulator. The regulator for your region, and any
					additional local rights, are set out in
					<a href="#regional">Regional terms</a>
					below.
				</li>
			</ul>
			<p>
				To exercise any of these, email
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>. We would always welcome the chance
				to resolve a concern directly before you approach a regulator.
			</p>

			<h2 id="regional">Regional terms</h2>
			<p>
				Everything above applies wherever you are. This section adds the commitments and rights
				specific to each region we launch in. Whichever region you are in, the way to exercise a
				right is the same: email <a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>.
			</p>

			<h3 id="uk-privacy">United Kingdom</h3>
			<p>
				The UK is our home market, and the policy above is written to UK law: we are the data
				controller, established in {CONTACT.jurisdiction}, processing your health data as
				special-category data under the UK GDPR on the basis of your explicit consent, with the ICO
				as our supervisory authority. A few UK-specific points sit alongside that:
			</p>
			<ul>
				<li>
					Proactive check-ins are part of the service you sign up for. Any purely promotional
					messaging follows PECR: we ask for consent first and include an opt-out in every such
					message.
				</li>
				<li>
					Before launch we complete a Data Protection Impact Assessment covering the large-scale
					processing of health data and location that the Portal involves.
				</li>
				<li>
					You can complain to the
					<a href="https://ico.org.uk/" rel="noopener noreferrer" target="_blank"
						>Information Commissioner's Office</a
					>, though we would always welcome the chance to resolve a concern with you first.
				</li>
			</ul>

			<h3 id="us-privacy">United States</h3>
			<p>
				The Portal is a consumer wellness product and is not covered by HIPAA; your protections come
				from federal consumer law and state privacy law, and from the promises in this policy. Where
				your state treats health data or precise location as sensitive data, we ask for your opt-in
				consent before processing it, whatever state you are in. You have the right to access,
				correct, delete and port your data, to appeal a decision we make about a request, and to
				withdraw consent at any time.
			</p>
			<ul>
				<li>
					We do not sell your personal data, and we do not share it for targeted advertising.
					Because we never do this, there is no need to opt out, but we still honour the Global
					Privacy Control signal.
				</li>
				<li>
					As a vendor of personal health records, we follow the FTC Health Breach Notification Rule:
					if your unsecured health data is ever breached or disclosed without your authorisation, we
					will notify you without unreasonable delay and no later than 60 days after discovery.
				</li>
				<li>
					We never use your location to infer visits to healthcare facilities, and we do not
					geofence health services.
				</li>
				<li>
					Washington and Nevada residents: your consumer health data rights are set out in our
					separate
					<a href="/privacy/consumer-health-data">Consumer Health Data Privacy Policy</a>.
				</li>
			</ul>

			<h3 id="canada-privacy">Canada</h3>
			<p>
				We handle your data under PIPEDA. At launch the Portal is offered in English and is not
				available in Quebec; if we open Quebec, we will first meet the requirements of its
				private-sector privacy law (Law 25), including service in French, and update this section.
				Your health data is sensitive, so we collect it only with your express consent, purpose by
				purpose. You can access and correct your data, withdraw consent, and ask us what we hold
				about you; optional features such as precise location can be switched off at any time.
				Proactive check-ins are part of the service and stay under your control. Promotional
				messages follow CASL: we send them only with your express consent, and every one identifies
				us and includes an unsubscribe. If we ever have a breach creating a real risk of significant
				harm, we will notify you and report it to the Office of the Privacy Commissioner of Canada.
				You may complain to the
				<a href="https://www.priv.gc.ca/" rel="noopener noreferrer" target="_blank">OPC</a>.
			</p>

			<h3 id="australia-privacy">Australia</h3>
			<p>
				We handle your data under the Privacy Act 1988 and the Australian Privacy Principles. Your
				health data is sensitive information, collected only with your consent. Your data is
				processed outside Australia, in the United Kingdom, the European Union and the United States
				by us and the service providers described above; we remain accountable for it under APP 8
				wherever it is processed. Commercial electronic messages follow the Spam Act 2003: consent
				first, clear identification, and a working unsubscribe in every message. Eligible data
				breaches are notified to you and to the OAIC under the Notifiable Data Breaches scheme, and
				you may complain to the
				<a href="https://www.oaic.gov.au/" rel="noopener noreferrer" target="_blank">OAIC</a>.
			</p>

			<h3 id="ireland-privacy">Ireland &amp; the EEA</h3>
			<p>
				The Portal is not currently available in Ireland or the wider EEA. This release does not
				launch there, and we do not offer the service to, or collect data from, people in the EEA.
				When we do open an EEA market, we will appoint and name our EU representative (Article 27 EU
				GDPR) here, set out the EU-specific rights and the relevant supervisory authority (such as
				the Irish
				<a href="https://www.dataprotection.ie/" rel="noopener noreferrer" target="_blank"
					>Data Protection Commission</a
				>), and update this section before any EEA launch.
			</p>

			<h2 id="contact">Contact</h2>
			<p>
				Questions about this policy, or about how we handle your data? Write to us at
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a> and we’ll be glad to help.
			</p>
		</article>
	</div>
</section>
