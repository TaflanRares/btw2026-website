<script lang="ts">
	import type { Component } from 'svelte';
	import { organizers } from '$lib/site-data';

	interface Props {
		LeafSceneComponent?: Component | null;
	}

	let { LeafSceneComponent = null }: Props = $props();

	const organizerPriority: Record<string, number> = {
		'Main Organiser': 0,
		President: 1
	};

	const sortedOrganizers = $derived(
		[...organizers].sort((a, b) => {
			const priorityA = organizerPriority[a.title] ?? 2;
			const priorityB = organizerPriority[b.title] ?? 2;
			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}

			return a.name.localeCompare(b.name);
		})
	);

	const leadOrganizers = $derived(sortedOrganizers.slice(0, 2));
	const teamOrganizers = $derived(sortedOrganizers.slice(2));

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
		<div class="organizer-collage organizer-collage--leads">
			{#each leadOrganizers as organizer, index (organizer.name)}
				{@const cardIndex = index}
				{@const flutter = activeFlutters[cardIndex]}
				<article
					use:scrollObserver={cardIndex}
					class="collage-card collage-card--lead"
					class:is-fluttering={!!flutter}
					style:--flutter-x="{flutter?.x ?? 0}px"
					style:--flutter-y="{flutter?.y ?? 0}px"
					style:--flutter-rot="{flutter?.rot ?? 0}deg"
				>
					<button
						type="button"
						class="collage-card-button"
						onclick={() => triggerFlutter(cardIndex)}
					>
						<div class="collage-stamp">
							<img src={organizer.photo} alt={organizer.name} class="collage-photo" />
							<div class="collage-copy">
								<h3 class="collage-name">{organizer.name}</h3>
								<p class="collage-role">{organizer.title}</p>
								{#if organizer.email}
									<a class="collage-email" href={`mailto:${organizer.email}`}>{organizer.email}</a>
								{/if}
							</div>
						</div>
					</button>
				</article>
			{/each}
		</div>

		<div class="organizer-collage organizer-collage--team">
			{#each teamOrganizers as organizer, index (organizer.name)}
				{@const cardIndex = index + 2}
				{@const flutter = activeFlutters[cardIndex]}
				<article
					use:scrollObserver={cardIndex}
					class="collage-card"
					class:is-fluttering={!!flutter}
					style:--flutter-x="{flutter?.x ?? 0}px"
					style:--flutter-y="{flutter?.y ?? 0}px"
					style:--flutter-rot="{flutter?.rot ?? 0}deg"
				>
					<button
						type="button"
						class="collage-card-button"
						onclick={() => triggerFlutter(cardIndex)}
					>
						<div class="collage-stamp">
							<img src={organizer.photo} alt={organizer.name} class="collage-photo" />
							<div class="collage-copy">
								<h3 class="collage-name">{organizer.name}</h3>
								<p class="collage-role">{organizer.title}</p>
								{#if organizer.email}
									<a class="collage-email" href={`mailto:${organizer.email}`}>{organizer.email}</a>
								{/if}
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
