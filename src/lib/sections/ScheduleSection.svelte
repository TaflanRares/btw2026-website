<script lang="ts">
	import type { Component } from 'svelte';
	import { scheduleDays } from '$lib/site-data';

	interface Props {
		LeafSceneComponent?: Component | null;
	}

	let { LeafSceneComponent = null }: Props = $props();
	let activeScheduleDay = $state(0);

	function moveScheduleDay(index: number) {
		activeScheduleDay = ((index % scheduleDays.length) + scheduleDays.length) % scheduleDays.length;
	}

	function showPreviousDay() {
		moveScheduleDay(activeScheduleDay - 1);
	}

	function showNextDay() {
		moveScheduleDay(activeScheduleDay + 1);
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
				onclick={showPreviousDay}
				aria-label="Show previous schedule day"
			>
				<span aria-hidden="true">‹</span>
			</button>
			<article class="schedule-day-card">
				<header class="schedule-day-header">
					<div>
						<h3 class="schedule-day-title">{scheduleDays[activeScheduleDay].title}</h3>
						<p class="schedule-day-label">{scheduleDays[activeScheduleDay].label}</p>
					</div>
					<span class="schedule-badge"
						>{scheduleDays[activeScheduleDay].sessions.length} sessions</span
					>
				</header>

				<p class="schedule-summary">{scheduleDays[activeScheduleDay].summary}</p>

				<div class="session-list">
					{#each scheduleDays[activeScheduleDay].sessions as session (session.time + session.title)}
						<div class="session-item">
							<div class="session-content">
								<div class="session-heading-row">
									<h4 class="session-title">{session.title}</h4>
									<div class="trainer-row">
										<img src={session.trainerPhoto} alt={session.trainer} class="trainer-badge" />
										{#if session.trainerSocial.url}
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
			<button type="button" class="schedule-edge schedule-edge--next" onclick={showNextDay}>
				<span aria-hidden="true">›</span>
			</button>
		</div>
	</div>
</section>
