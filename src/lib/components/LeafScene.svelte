<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { createLeafScene } from '$lib/leaf-scene';
	import '../../css/leaf-scene.css';

	let scene: HTMLDivElement | undefined;
	const leaves = Array.from({ length: 3 }, (_, index) => index + 1);
	const leafAssetNames = [
		'piece_1_r1c1.png',
		'piece_2_r1c2.png',
		'piece_4_r1c4.png',
		'piece_6_r2c2.png',
		'piece_7_r2c3.png',
		'piece_8_r2c4.png'
	];

	function pickLeafImageUrls(count: number) {
		const shuffled = [...leafAssetNames].sort(() => Math.random() - 0.5);
		return shuffled
			.slice(0, count)
			.map((fileName) => `${base}/images/leaves/${fileName}`);
	}

	onMount(() => {
		if (!scene) {
			return;
		}

		const cleanup = createLeafScene(scene, pickLeafImageUrls(leaves.length));
		return cleanup;
	});
</script>

<div bind:this={scene} class="leaf-scene" aria-hidden="true">
	{#each leaves as leafIndex (leafIndex)}
		<div class="leaf" data-leaf-index={leafIndex}></div>
	{/each}
</div>
