/**
 * Single source of truth for Auracare marketing-site content.
 *
 * Framing (Aug 2026): Auracare sells ONE pipeline to healthcare providers, in
 * three stages. Stage 1 aggregates (the patient-facing data aggregation
 * engine, referred to on the site only as "the patient portal"). Stage 2
 * reasons (the CDSS core, plus our own exam hardware and prescribing reference).
 * Stage 3 outputs (ranked differentials, finished documentation, stock
 * optimisation) and feeds back into stage 1. The portal is a component of the
 * provider package, not a standalone consumer product; never lead with it.
 *
 * Naming: the portal's product name (Auracle) must NOT appear anywhere in
 * rendered copy, only in these comments and in the URLs it lives at. Call it
 * "the patient portal" or "the data aggregation engine".
 *
 * Nothing here should overclaim: the reasoning core is in development, the
 * CDSS regulatory pathway is not yet confirmed, and the portal is a
 * general-wellness product, not a medical device. Live today: the ontology
 * graph, and the portal's public beta. Keep unevidenced deck claims (e.g. CDSS performance percentages)
 * off the site.
 */

export const CONTACT = {
	seed: 'stephen@auracare.org.uk',
	hinlun: 'hinlun@auracare.org.uk',
	tanush: 'tanush@auracare.org.uk',
	general: 'hello@auracare.org.uk',
	clinical: 'clinical@auracare.org.uk',
	privacy: 'privacy@auracare.org.uk',
	legalName: 'Auracare Health Ltd',
	jurisdiction: 'England & Wales',
	ontologyUrl: 'https://ontology.auracare.org.uk',
	locations: ['London', 'Hong Kong', 'San Francisco']
} as const;

/** Where the patient portal's public beta takes sign-ups. */
export const PORTAL_APP_URL = 'https://app.auracle.health';

/** The patient portal's own home, linked from the investor-facing pages. */
export const PORTAL_URL = 'https://auracle.health';

/* ------------------------------------------------------------------ */
/* Investors: who covers which region, and the deck                    */
/* ------------------------------------------------------------------ */

export type InvestorContactKey = 'stephen' | 'hinlun' | 'tanush';

export interface InvestorContact {
	/** id in team.ts, for name/photo/role. */
	teamId: string;
	email: string;
	/** Shown on the founder card. */
	coverage: string;
	basedIn: string;
}

export const INVESTOR_CONTACTS: Record<InvestorContactKey, InvestorContact> = {
	stephen: {
		teamId: 'stephen-okita',
		email: CONTACT.seed,
		coverage: 'North America',
		basedIn: 'San Francisco'
	},
	hinlun: {
		teamId: 'hinlun-chen',
		email: CONTACT.hinlun,
		coverage: 'Asia-Pacific',
		basedIn: 'Hong Kong'
	},
	tanush: {
		teamId: 'tanush-pandey',
		email: CONTACT.tanush,
		coverage: 'Europe',
		basedIn: 'London'
	}
};

/** Flip `ready` to true once the PDF is in static/ under `url`. */
export const DECK = {
	ready: false,
	url: '/auracare-seed-deck.pdf',
	pendingLabel: 'New pitch deck coming soon'
} as const;

/* ------------------------------------------------------------------ */
/* One pipeline, three stages                                          */
/* ------------------------------------------------------------------ */

export type StageStatus = 'live' | 'ships-soon' | 'in-development';

export interface PipelineStage {
	key: string;
	n: string;
	name: string;
	tagline: string;
	blurb: string;
	status: StageStatus;
	statusLabel: string;
}

export const STAGES: PipelineStage[] = [
	{
		key: 'aggregate',
		n: '01',
		name: 'Aggregate',
		tagline: 'The data aggregation engine',
		blurb:
			'A patient-facing portal that learns daily life from the sources a person already has, adds their past records, and encodes all of it into SNOMED CT before the appointment starts.',
		status: 'live',
		statusLabel: 'In public beta'
	},
	{
		key: 'reason',
		n: '02',
		name: 'Reason',
		tagline: 'The CDSS core',
		blurb:
			'Reasons over the aggregated history, live vitals from our own examination devices, and the consultation itself, with prescribing guidance built in.',
		status: 'in-development',
		statusLabel: 'MVP targeted 2027'
	},
	{
		key: 'output',
		n: '03',
		name: 'Output',
		tagline: 'What the clinic gets back',
		blurb:
			'Differentials ranked against the patient’s own history, documentation written into the provider’s existing systems, and prescribing that cuts stock wastage and tailors drug selection. Insights feed back to stage one.',
		status: 'in-development',
		statusLabel: 'Clinics in 2027'
	}
];

/** The closing statement under the pipeline: the shared encoding. */
export const PIPELINE_FOUNDATION =
	'Every stage reads and writes the same terminology: SNOMED CT, ICD-11, LOINC and HPO. The graph is live and explorable today.';

/* ------------------------------------------------------------------ */
/* How the business is sequenced: rendered on /investors               */
/* ------------------------------------------------------------------ */

export interface PipelineRole {
	stat: string;
	title: string;
	body: string;
}

export const PIPELINE_ROLE_EYEBROW = 'How the business is sequenced';
export const PIPELINE_ROLE_HEADING = 'One pipeline, sold to providers.';

export const PIPELINE_ROLE: PipelineRole[] = [
	{
		stat: 'Live',
		title: 'Stage one is shipping',
		body: 'The patient portal is in public beta, open to anyone, and already building coded patient histories: the input everything downstream depends on.'
	},
	{
		stat: 'Dec 2026',
		title: 'The clinical core goes to trial',
		body: 'Clinical trials are signed with EC Healthcare for December 2026 and the Chinese Academy of Sciences for February 2027.'
	},
	{
		stat: '2027',
		title: 'The package reaches clinics',
		body: 'With the hardware certified, providers buy the full pipeline: aggregation, reasoning and outputs, priced on the clinician time it saves.'
	}
];

/* ------------------------------------------------------------------ */
/* One patient-centred care loop: portal + CDSS                        */
/* ------------------------------------------------------------------ */

export interface CareLoopStage {
	/** Uppercase one-word name for the stage, used as the ring label. */
	name: string;
	title: string;
	body: string;
	/** Which side of the pipeline is doing the work at this stage. */
	actor: 'portal' | 'cdss';
	/** The two original steps this stage folds together. */
	steps: string[];
}

export const CARE_LOOP_LINE = 'One continuous loop: the picture keeps getting richer.';

/* Four stages on a closed ring, clockwise from the top. The eight original
   steps survive as the two sub-steps under each stage; folding them into four
   is what lets the shape be a loop rather than a list, and it splits the ring
   diagonally: the portal owns the top and left, the CDSS owns the right and
   bottom. The two lane changes are the two labelled handoffs between them. */
export const CARE_LOOP: CareLoopStage[] = [
	{
		name: 'Live',
		actor: 'portal',
		title: 'The portal builds the picture',
		body: 'Connectors and conversation become one living, SNOMED-encoded bio-psycho-social history, ready before the appointment starts.',
		steps: ['Sources and conversation encoded as you go', 'A complete history, ready to share']
	},
	{
		name: 'Reason',
		actor: 'cdss',
		title: 'The CDSS works the case',
		body: 'Shared history, acute vitals, transcription, labs and records reasoned over together. It asks only what is worth asking.',
		steps: ['Reasons over everything at once', 'A differential, ordered by likelihood']
	},
	{
		name: 'Decide',
		actor: 'cdss',
		title: 'The clinician decides',
		body: 'A lifestyle plan, a referral or a guideline-aligned medication package, matched to the clinician\u2019s jurisdiction. Their judgement makes the call.',
		steps: ['Three outputs, jurisdiction-matched', 'Notes and reasoning chain written for you']
	},
	{
		name: 'Return',
		actor: 'portal',
		title: 'The plan becomes routine',
		body: 'Advice returns to the portal as reminders tuned to how the person actually lives, and the portal watches the follow-through.',
		steps: ['Advice tuned to how you live', 'Change flagged before the next appointment']
	}
];

/* The two places the loop changes hands. They sit on the ring itself, because
   the handoff is the connector, not another stage. */
export const CARE_LOOP_HANDOFFS = {
	toClinic: 'Shared at the appointment',
	toLife: 'Back into daily life'
} as const;

export const REGULATORY_NOTE =
	'The Auracare CDSS is in development. Its regulatory pathway is not yet confirmed and is under continuous review.';

/* ------------------------------------------------------------------ */
/* Our own medical hardware                                            */
/* ------------------------------------------------------------------ */

export interface HardwareDevice {
	name: string;
	note: string;
}

export const HARDWARE: HardwareDevice[] = [
	{
		name: 'Recording stethoscope',
		note: 'Captures heart and lung sounds as data the core can read.'
	},
	{
		name: 'Blood-pressure monitor',
		note: 'Clinical-grade readings, streamed straight into the reasoning core.'
	},
	{
		name: 'Otoscope',
		note: 'Captured and passed to the core automatically.'
	}
];

export const HARDWARE_MORE =
	'More devices are on the way, extending the same closed hardware-to-software link to new measurements.';

/* ------------------------------------------------------------------ */
/* Company timeline (scroll animation, with the May-2026 fork)        */
/* ------------------------------------------------------------------ */

export interface Milestone {
	date: string;
	title: string;
	body: string;
	era: 'nhs' | 'pivot' | 'ai';
	fork?: boolean;
	/** The entry the company is currently in. Exactly one should carry this. */
	now?: boolean;
}

export const TIMELINE: Milestone[] = [
	{
		date: '2025',
		title: 'Auracare is founded',
		body: 'We began inside UK primary care, building NHS data tooling and a pharmacy prescribing product with automated clinical notes.',
		era: 'nhs'
	},
	{
		date: '2025 → early 2026',
		title: '28 pharmacy partnerships',
		body: 'We reached twenty-eight UK pharmacies, including a regional director, and piloted clinical decision support across them. It showed us the structural gaps inside a public health system first-hand.',
		era: 'nhs'
	},
	{
		date: 'Early 2026',
		title: 'We hit the wall',
		body: 'Our aggregation product was built, but the NHS gates its API behind contracts that do not renew until 2028. We shelved that line and kept the foundation.',
		era: 'nhs'
	},
	{
		date: 'May 2026',
		title: 'We pivot to the pipeline',
		body: 'A new direction: a clinical decision support system for providers, with a patient-facing portal as the first stage of the same pipeline.',
		era: 'pivot',
		fork: true
	},
	{
		date: 'Jul 2026',
		title: 'The data aggregation engine',
		body: 'Stage one reached its first build: the patient portal, aggregating daily life and encoding it into SNOMED CT.',
		era: 'ai'
	},
	{
		date: 'Sep 2026',
		title: 'The portal enters public beta',
		body: 'The patient portal opens its beta to the public — anyone can sign up — and the ontology goes live for anyone to explore.',
		era: 'ai',
		now: true
	},
	{
		date: 'Dec 2026',
		title: 'First clinical trial',
		body: 'Trials begin with EC Healthcare in Hong Kong, while our stethoscope, BP monitor and otoscope head toward certification.',
		era: 'ai'
	},
	{
		date: 'Feb 2027',
		title: 'Chinese Academy of Sciences trial',
		body: 'A second trial begins with the CAS, and the CDSS moves toward its MVP.',
		era: 'ai'
	},
	{
		date: '2027',
		title: 'Clinics',
		body: 'With the devices certified, the full pipeline rolls out to providers, China-forward via the Greater Bay Area.',
		era: 'ai'
	}
];

/* ------------------------------------------------------------------ */
/* World map: market rollout waves                                     */
/* Coordinates are [longitude, latitude] for d3-geo projection.        */
/* ------------------------------------------------------------------ */

export type MarketTone = 'launch' | 'clinical' | 'crossover' | 'sea' | 'expansion' | 'deferred';

export interface MarketPoint {
	name: string;
	coords: [number, number];
	tone: MarketTone;
	wave: number;
	label: string;
}

export interface MarketArc {
	from: [number, number];
	to: [number, number];
	label: string;
	wave: number;
}

export interface MarketWave {
	order: number;
	key: string;
	title: string;
	tone: MarketTone;
	caption: string;
}

export const MARKET_WAVES: MarketWave[] = [
	{
		order: 0,
		key: 'launch',
		tone: 'launch',
		title: 'Wellness launch',
		caption: 'The patient portal goes direct-to-consumer across our first four markets.'
	},
	{
		order: 1,
		key: 'clinical',
		tone: 'clinical',
		title: 'Clinical trials',
		caption:
			'Auracare enters clinical trials with hospitals and institutions in Hong Kong and China.'
	},
	{
		order: 2,
		key: 'crossover',
		tone: 'crossover',
		title: 'Product crossover',
		caption:
			'The CDSS follows the portal into its wellness markets; the portal follows the CDSS into the CAS markets.'
	},
	{
		order: 3,
		key: 'sea',
		tone: 'sea',
		title: 'Asia-Pacific',
		caption: 'Approval portability carries both products across the region.'
	},
	{
		order: 4,
		key: 'expansion',
		tone: 'expansion',
		title: 'Europe & Africa',
		caption: 'Expansion into European and African markets.'
	},
	{
		order: 5,
		key: 'deferred',
		tone: 'deferred',
		title: 'Rest of world',
		caption: 'Everywhere else, more to come.'
	}
];

export const MARKET_POINTS: MarketPoint[] = [
	// Wave 1: wellness launch across English-speaking markets
	{
		name: 'United Kingdom',
		coords: [-0.1278, 51.5074],
		tone: 'launch',
		wave: 0,
		label: 'The patient portal launches here'
	},
	{
		name: 'United States',
		coords: [-98.5, 39.5],
		tone: 'launch',
		wave: 0,
		label: 'Wellness launch'
	},
	{
		name: 'Canada',
		coords: [-106.35, 56.13],
		tone: 'launch',
		wave: 0,
		label: 'Wellness launch'
	},
	{
		name: 'Australia',
		coords: [133.7751, -25.2744],
		tone: 'launch',
		wave: 0,
		label: 'Wellness launch'
	},
	// Wave 2: clinical trials in Hong Kong and China (Greater Bay Area)
	{
		name: 'China',
		coords: [113.2644, 23.1291],
		tone: 'clinical',
		wave: 1,
		label: 'Clinical trials with hospitals and institutions, via the Greater Bay Area'
	},
	{
		name: 'Hong Kong',
		coords: [114.1694, 22.3193],
		tone: 'clinical',
		wave: 1,
		label: 'Operations base and gateway to the Greater Bay Area'
	},
	// Wave 3: product crossover, where both products meet in the East Asian hubs
	{
		name: 'Singapore',
		coords: [103.8198, 1.3521],
		tone: 'crossover',
		wave: 2,
		label: 'The CDSS and the portal now both operate here'
	},
	// Wave 4: Southeast Asia
	{
		name: 'Taiwan',
		coords: [121.5654, 25.033],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Malaysia',
		coords: [101.6869, 3.139],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Thailand',
		coords: [100.5018, 13.7563],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Vietnam',
		coords: [106.6297, 10.8231],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Indonesia',
		coords: [106.8456, -6.2088],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Philippines',
		coords: [121.774, 12.8797],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'New Zealand',
		coords: [174.7762, -41.2865],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	// Wave 5: Europe & Africa
	{
		name: 'Ireland',
		coords: [-8.2439, 53.4129],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'France',
		coords: [2.2137, 46.2276],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Germany',
		coords: [10.4515, 51.1657],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Spain',
		coords: [-3.7492, 40.4637],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Italy',
		coords: [12.5674, 41.8719],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Nigeria',
		coords: [8.6753, 9.082],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	{
		name: 'Kenya',
		coords: [37.9062, -0.0236],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	{
		name: 'Egypt',
		coords: [30.8025, 26.8206],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	{
		name: 'South Africa',
		coords: [24.9916, -28.4793],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	// Wave 6: rest of world, more to come
	{
		name: 'India',
		coords: [78.9629, 20.5937],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	},
	{
		name: 'Brazil',
		coords: [-51.9253, -14.235],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	},
	{
		name: 'Japan',
		coords: [138.2529, 36.2048],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	},
	{
		name: 'Saudi Arabia',
		coords: [46.6753, 24.7136],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	}
];

export const MARKET_ARCS: MarketArc[] = [
	{
		from: [114.1694, 22.3193],
		to: [113.2644, 23.1291],
		label: 'Hong Kong → Greater Bay Area',
		wave: 1
	},
	{ from: [114.1694, 22.3193], to: [121.5654, 25.033], label: 'Hong Kong → Taiwan', wave: 3 }
];

/* ------------------------------------------------------------------ */
/* Market & traction                                                   */
/* ------------------------------------------------------------------ */

/* Mirrors the traction slide of the seed deck, row for row, so the two never
   drift apart again. Labels are kept short enough to hold one line at the
   ledger's type size: two of them once ran to 46 and 60 characters and
   wrapped, which put a ragged second line under a figure.

   The two trials are listed separately, by the date each is signed for, rather
   than summed into a single "2". A count says less than the dates do, and the
   dates are the thing an investor is actually reading for. `stat` is free text
   for exactly this reason: the ledger animates a figure that parses as a
   number and renders anything else as it stands. */
export const TRACTION: { stat: string; label: string }[] = [
	{ stat: '28', label: 'UK pharmacy partnerships, CDSS pilot' },
	{ stat: '$134k', label: 'UK government funding awarded' },
	{ stat: '$400k', label: 'Angel investment, Hong Kong' },
	{ stat: 'Dec 2026', label: 'Clinical trial, EC Healthcare' },
	{ stat: 'Feb 2027', label: 'Clinical trial, Chinese Academy of Sciences' },
	{ stat: '2', label: 'Hardware partnerships, Chinese OEMs' }
];

/**
 * The foundation box: who is building this and the partnership that opens the
 * clinical door. Not universities-as-partners, but founders' research background,
 * plus the agreed CAS route to trials.
 */
export interface FoundationPoint {
	title: string;
	body: string;
}

export const FOUNDATION_EYEBROW = 'The foundation';
export const FOUNDATION_TITLE = 'Research pedigree, and a route to trials';

export const FOUNDATION_POINTS: FoundationPoint[] = [
	{
		title: 'Imperial College London & UC Berkeley',
		body: 'Founded out of two of the world’s top-ranked programmes, medicine at Imperial and computer science at Berkeley, pairing frontline clinical training with deep engineering from day one.'
	},
	{
		title: 'Chinese Academy of Sciences',
		body: 'A partnership agreed with the CAS gives us access to clinical trials and the resources to run them, our route into the clinic.'
	}
];

/* ------------------------------------------------------------------ */
/* Technology / ontology                                               */
/* ------------------------------------------------------------------ */

export const ONTOLOGY_STATS: { value: string; label: string }[] = [
	{ value: '532k', label: 'SNOMED CT concepts' },
	{ value: '1.3M', label: 'relationships mapped' },
	{ value: 'ICD-11', label: '31.9k categories' },
	{ value: 'LOINC', label: '217k lab codes' }
];

/* ------------------------------------------------------------------ */
/* Consent & safety                                                    */
/* ------------------------------------------------------------------ */

export const NON_DEVICE_DISCLAIMER =
	'Our patient portal is a general-wellness product, not a medical device. It does not diagnose, treat, cure or prevent any disease. Always seek professional medical advice for health concerns.';
