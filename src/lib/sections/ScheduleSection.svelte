<script lang="ts">
	import type { Component } from 'svelte';
	import { scheduleDays } from '$lib/site-data';

	interface Props {
		LeafSceneComponent?: Component | null;
	}

	let { LeafSceneComponent = null }: Props = $props();
	let activeScheduleDay = $state(0);
	let scrollContainer = $state<HTMLElement | null>(null);

	function scrollToDay(index: number) {
		if (!scrollContainer) return;
		const normalizedIndex =
			((index % scheduleDays.length) + scheduleDays.length) % scheduleDays.length;
		const targetCard = scrollContainer.children[normalizedIndex] as HTMLElement;

		if (targetCard) {
			targetCard.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
			activeScheduleDay = normalizedIndex;
		}
	}

	function handleScrollEnd() {
		if (!scrollContainer) return;
		const scrollLeft = scrollContainer.scrollLeft;
		const width = scrollContainer.clientWidth;
		const newIndex = Math.round(scrollLeft / width);
		if (newIndex !== activeScheduleDay) {
			activeScheduleDay = newIndex;
		}
	}
</script>

<section id="schedule" class="schedule-section">
	{#if LeafSceneComponent}
		<div class="schedule-leaf-overlay" aria-hidden="true"><LeafSceneComponent /></div>
	{/if}
	<div class="schedule-inner">
		<div class="section-heading">
			<h2 class="section-title">Schedule</h2>
		</div>

		<div class="schedule-stage">
			<button
				type="button"
				class="schedule-edge schedule-edge--previous"
				onclick={() => scrollToDay(activeScheduleDay - 1)}
				aria-label="Show previous schedule day"
			>
				<span aria-hidden="true">‹</span>
			</button>

			<div class="schedule-card-wrapper">
				<div class="schedule-carousel" bind:this={scrollContainer} onscrollend={handleScrollEnd}>
					{#each scheduleDays as day, dayIndex (day.title + dayIndex)}
						<article class="schedule-day-card">
							<header class="schedule-day-header">
								<div>
									<h3 class="schedule-day-title">{day.title}</h3>
									<p class="schedule-day-label">{day.label}</p>
								</div>
								<span class="schedule-badge">{day.sessions.length} sessions</span>
							</header>

							<p class="schedule-summary">{day.summary}</p>

							<div class="session-list">
								{#each day.sessions as session (session.time + session.title)}
									<div class="session-item">
										<div class="session-content">
											<div class="session-heading-row">
												<h4 class="session-title">{session.title}</h4>
												<div class="trainer-row">
													<img
														src={session.trainerPhoto}
														alt={session.trainer}
														class="trainer-badge"
													/>
													{#if session.trainerSocial?.url}
														<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
														<a
															href={session.trainerSocial.url}
															target="_blank"
															rel="noopener noreferrer"
															class="trainer-name"
															aria-label={`${session.trainer}: ${session.trainerSocial.label}`}
														>
															{session.trainer}
														</a>
													{:else}
														<span class="trainer-name">{session.trainer}</span>
													{/if}
												</div>
											</div>
											<p class="session-description">{session.description}</p>
										</div>
										<div class="session-meta">
											<p class="session-time">{session.time}</p>
											<span class="session-tag">{session.location}</span>
										</div>
									</div>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			</div>

			<button
				type="button"
				class="schedule-edge schedule-edge--next"
				onclick={() => scrollToDay(activeScheduleDay + 1)}
				aria-label="Show next schedule day"
			>
				<span aria-hidden="true">›</span>
			</button>
		</div>
	</div>
</section>
