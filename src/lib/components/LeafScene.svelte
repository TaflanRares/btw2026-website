<script lang="ts">
	import { onMount } from 'svelte';
	import { createLeafScene } from '$lib/leaf-scene';
	import '../../css/leaf-scene.css';

	let scene: HTMLDivElement | undefined;
	const leaves = Array.from({ length: 8 }, (_, index) => index + 1);

	onMount(() => {
		if (!scene) {
			return;
		}

		const cleanup = createLeafScene(scene);
		return cleanup;
	});
</script>

<div bind:this={scene} class="leaf-scene" aria-hidden="true">
	{#each leaves as leafIndex (leafIndex)}
		<div class="leaf" data-leaf-index={leafIndex}></div>
	{/each}
</div>
