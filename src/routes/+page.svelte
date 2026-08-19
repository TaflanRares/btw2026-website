<script lang="ts">
	import '../css/main.css';
	import { eventInfo } from '../lib/site-data';

	import Navbar from '../lib/sections/Navbar.svelte';
	import Hero from '../lib/sections/Hero.svelte';
	import AboutSection from '../lib/sections/AboutSection.svelte';
	import ScheduleSection from '../lib/sections/ScheduleSection.svelte';
	import PartnersSection from '../lib/sections/PartnersSection.svelte';
	import OrganizersSection from '../lib/sections/OrganizersSection.svelte';
	import Footer from '../lib/sections/Footer.svelte';

	const registerNowUrl = 'https://docs.google.com/forms/';
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

	<Navbar {registerNowUrl} />

	<main class="site-main">
		<Hero />
		<AboutSection />
		<ScheduleSection />
		<PartnersSection />
		<OrganizersSection />
	</main>

	<Footer />
</div>
