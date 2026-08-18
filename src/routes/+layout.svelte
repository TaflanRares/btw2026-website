<script lang="ts">
	import '../css/base.css';
	import '../css/fonts.css';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import favicon32 from '$lib/assets/favicon-32x32.png';
	import favicon16 from '$lib/assets/favicon-16x16.png';
	import siteManifest from '$lib/assets/site.webmanifest';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
	<link rel="manifest" href={siteManifest} />
</svelte:head>

{@render children()}
