<script lang="ts">
	import type { Component } from 'svelte';
	import { base } from '$app/paths';
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

	function isDetailedLocation(
		location: unknown
	): location is { venue: string; street: string; mapUrl: string } {
		if (!location || typeof location !== 'object') return false;
		return (
			'venue' in location &&
			'street' in location &&
			'mapUrl' in location &&
			typeof location.venue === 'string' &&
			typeof location.street === 'string' &&
			typeof location.mapUrl === 'string'
		);
	}

	function hasNamedTrainer(trainer: unknown): trainer is string {
		return typeof trainer === 'string' && trainer.trim().length > 0;
	}

	function hasImage(url: unknown): url is string {
		return typeof url === 'string' && url.trim().length > 0;
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

			<div
				class="schedule-card-wrapper"
				style={`--schedule-paper-image: url('${base}/images/material/papers.webp'); --schedule-map-icon: url('${base}/images/material/MapIcon.jpg')`}
			>
				<div class="schedule-carousel" bind:this={scrollContainer} onscrollend={handleScrollEnd}>
					{#each scheduleDays as day, dayIndex (day.title + dayIndex)}
						<article class="schedule-day-card">
							<header class="schedule-day-header">
								<div class="schedule-day-heading-left">
									<h3 class="schedule-day-title">{day.title}</h3>
									<p class="schedule-day-label">{day.label}</p>
								</div>
								<div class="schedule-day-heading-right">
									<span class="schedule-badge">{day.sessions.length} sessions</span>
									{#if isDetailedLocation(day.location)}
										<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
										<a
											href={day.location.mapUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="schedule-day-location-link"
											aria-label={`Open location in Google Maps: ${day.location.venue}, ${day.location.street}`}
										>
											<span class="schedule-location-icon" aria-hidden="true"></span>
											<span class="schedule-location-text">
												<span>{day.location.venue}</span>
												<span>{day.location.street}</span>
											</span>
										</a>
									{/if}
								</div>
							</header>

							<p class="schedule-summary">{day.summary}</p>

							<div class="session-list">
								{#each day.sessions as session (session.time + session.title)}
									<div class="session-item">
										<div class="session-content">
											<div class="session-title-row">
												{#if session.sessionLogo}
													<img
														src={session.sessionLogo}
														alt={`${session.title} logo`}
														class="session-logo"
													/>
												{/if}
												<h4 class="session-title">{session.title}</h4>
											</div>
											{#if session.trainers?.length}
												<div class="trainer-row">
													<div class="trainer-group">
														{#each session.trainers as trainer (trainer.name)}
															<div class="trainer-chip">
																{#if hasImage(trainer.photo)}
																	<img
																		src={trainer.photo}
																		alt={trainer.name}
																		class="trainer-badge"
																	/>
																{/if}
																{#if trainer.social?.url}
																	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
																	<a
																		href={trainer.social.url}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="trainer-name"
																		aria-label={`${trainer.name}: ${trainer.social.label ?? 'Trainer social media'}`}
																	>
																		{trainer.name}
																	</a>
																{:else}
																	<span class="trainer-name">{trainer.name}</span>
																{/if}
															</div>
														{/each}
													</div>
												</div>
											{:else if hasNamedTrainer(session.trainer)}
												<div class="trainer-row">
													{#if hasImage(session.trainerPhoto)}
														<img
															src={session.trainerPhoto}
															alt={session.trainer}
															class="trainer-badge"
														/>
													{/if}
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
											{/if}
											<p class="session-description">{session.description}</p>
										</div>
										<div class="session-meta">
											<p class="session-time">{session.time}</p>
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
