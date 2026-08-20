<script lang="ts">
	import type { Component } from 'svelte';
	import { organizers } from '$lib/site-data';

	interface Props {
		LeafSceneComponent?: Component | null;
	}

	let { LeafSceneComponent = null }: Props = $props();

	let activeFlutters = $state<Record<number, { x: number; y: number; rot: number }>>({});

	function triggerFlutter(index: number) {
		const x = (Math.random() - 0.21) * 11;
		const y = (Math.random() - 0.22) * 10;
		const rot = (Math.random() - 0.3) * 9;

		activeFlutters[index] = { x, y, rot };

		setTimeout(() => {
			delete activeFlutters[index];
		}, 850);
	}

	function scrollObserver(node: HTMLElement, index: number) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && window.matchMedia('(max-width: 960px)').matches) {
						triggerFlutter(index);
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<section id="organizers" class="organizers-section">
	<div class="organizers-content">
		<div class="section-heading">
			<h2 class="section-title">Event team</h2>
		</div>
		<div class="organizer-collage">
			{#each organizers as organizer, index (organizer.name)}
				{@const flutter = activeFlutters[index]}
				<article
					use:scrollObserver={index}
					class="collage-card collage-card--{index % 6}"
					class:is-fluttering={!!flutter}
					style:--flutter-x="{flutter?.x ?? 0}px"
					style:--flutter-y="{flutter?.y ?? 0}px"
					style:--flutter-rot="{flutter?.rot ?? 0}deg"
				>
					<button type="button" class="collage-card-button" onclick={() => triggerFlutter(index)}>
						<div class="collage-stamp">
							<img src={organizer.photo} alt={organizer.name} class="collage-photo" />
							<div class="collage-copy">
								<h3 class="collage-name">{organizer.name}</h3>
								<p class="collage-role">{organizer.title}</p>
							</div>
						</div>
					</button>
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
