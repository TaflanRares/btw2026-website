<script lang="ts">
	import { onMount } from 'svelte';
	import '../css/main.css';
	import { eventInfo } from '../lib/site-data';

	import Navbar from '../lib/sections/Navbar.svelte';
	import Hero from '../lib/sections/Hero.svelte';
	import AboutSection from '../lib/sections/AboutSection.svelte';
	import ScheduleSection from '../lib/sections/ScheduleSection.svelte';
	import PartnersSection from '../lib/sections/PartnersSection.svelte';
	import OrganizersSection from '../lib/sections/OrganizersSection.svelte';
	import Footer from '../lib/sections/Footer.svelte';

	const registerNowUrl = 'https://forms.gle/hMiMbmR2CFPUCUrh8';
	const eventEndedAt = new Date(eventInfo.endedAt);

	let eventEnded = $state(Date.now() >= eventEndedAt.getTime());

	function syncEventEnded() {
		eventEnded = Date.now() >= eventEndedAt.getTime();
	}

	onMount(() => {
		syncEventEnded();
		const timer = setInterval(syncEventEnded, 1000);

		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<title>{eventInfo.name}</title>
	<meta
		name="description"
		content="BEST Training Week 2026 in Brașov, Romania. A student-focused event by BEST Brașov."
	/>
</svelte:head>

<div class="page-shell">
	<div aria-hidden="true" class="page-glow">
		<div class="page-glow-orb"></div>
	</div>

	<Navbar {registerNowUrl} {eventEnded} />

	<main class="site-main">
		<Hero {registerNowUrl} {eventEnded} />
		<AboutSection />
		<ScheduleSection />
		<PartnersSection />
		<OrganizersSection />
	</main>

	<Footer />
</div>
