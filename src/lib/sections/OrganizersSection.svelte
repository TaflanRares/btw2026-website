<script lang="ts">
	import type { Component } from 'svelte';
	import { organizers } from '$lib/site-data';

	interface Props {
		LeafSceneComponent?: Component | null;
	}

	let { LeafSceneComponent = null }: Props = $props();
</script>

<section id="organizers" class="organizers-section">
	<div class="organizers-content">
		<div class="section-heading">
			<h2 class="section-title">Event team</h2>
		</div>
		<div class="organizer-collage">
			{#each organizers as organizer, index (organizer.name)}
				<article class="collage-card collage-card--{index % 6}">
					<div class="collage-stamp">
						<img src={organizer.photo} alt={organizer.name} class="collage-photo" />
						<div class="collage-copy">
							<h3 class="collage-name">{organizer.name}</h3>
							<p class="collage-role">{organizer.title}</p>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
	<div class="team-leaf-overlay" aria-hidden="true">
		{#if LeafSceneComponent}
			<LeafSceneComponent />
		{/if}
	</div>
</section>
