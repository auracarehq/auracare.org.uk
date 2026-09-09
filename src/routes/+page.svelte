<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Pipeline from '$lib/components/home/Pipeline.svelte';
	import CareLoop from '$lib/components/home/CareLoop.svelte';
	import TechnologyTeaser from '$lib/components/home/TechnologyTeaser.svelte';
	import StoryTimeline from '$lib/components/home/StoryTimeline.svelte';
	import MarketTraction from '$lib/components/home/MarketTraction.svelte';
	import TeamRaise from '$lib/components/home/TeamRaise.svelte';
	import ClosingCTA from '$lib/components/home/ClosingCTA.svelte';
</script>

<Seo
	title="Auracare: a full support system for patient care"
	description="Auracare builds one pipeline for healthcare providers: a patient portal aggregates daily life into coded history, the CDSS reasons over it in the consultation, and the outputs land in the clinic's own systems."
	path="/"
/>

<!-- The homepage states the three-stage pipeline once (Pipeline), shows how the
     stages close into a loop (CareLoop), proves the one live thing
     (TechnologyTeaser), then tells the company story. The raise lives on
     /investors; the engine detail on /technology. -->
<Hero />
<Pipeline />
<CareLoop />
<TechnologyTeaser />
<StoryTimeline />
<MarketTraction />
<TeamRaise />
<ClosingCTA />
