<script lang="ts">
	import { onMount, type Component } from 'svelte';
	import { eventInfo, scheduleDays } from '../site-data';
	import FlipCountdown, { type FlipKey } from './FlipCountdown.svelte';

	interface NetworkInformation {
		saveData?: boolean;
	}

	type CountdownState = {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	};

	interface Props {
		LeafSceneComponent?: Component | null;
	}

	let { LeafSceneComponent: ExternalLeafScene = null }: Props = $props();

	// Flip calculation helpers
	const flipKeyOrder: FlipKey[] = ['d0', 'd1', 'h0', 'h1', 'm0', 'm1', 's0', 's1'];

	function createFlipVersions() {
		return { d0: 0, d1: 0, h0: 0, h1: 0, m0: 0, m1: 0, s0: 0, s1: 0 } satisfies Record<
			FlipKey,
			number
		>;
	}

	function getFlipDigits(value: CountdownState) {
		const d = Math.max(0, value.days).toString().padStart(2, '0').slice(-2);
		const h = Math.max(0, value.hours).toString().padStart(2, '0');
		const m = Math.max(0, value.minutes).toString().padStart(2, '0');
		const s = Math.max(0, value.seconds).toString().padStart(2, '0');

		return {
			d0: d[0],
			d1: d[1],
			h0: h[0],
			h1: h[1],
			m0: m[0],
			m1: m[1],
			s0: s[0],
			s1: s[1]
		} satisfies Record<FlipKey, string>;
	}

	const initialDigits = getFlipDigits({ days: 0, hours: 0, minutes: 0, seconds: 0 });

	// Reactive States
	let flipDigits = $state<Record<FlipKey, string>>({ ...initialDigits });
	let prevFlipDigits = $state<Record<FlipKey, string>>({ ...initialDigits });
	let flipVersions = $state<Record<FlipKey, number>>(createFlipVersions());

	let countdownTitle = $state('BEST TRAINING WEEK');
	let countdownDateLabel = $state(eventInfo.dateLabel);

	let TreeLocationComponent = $state<Component | null>(null);
	let InternalLeafSceneComponent = $state<Component | null>(null);
	let treeLoadStarted = false;

	const ActiveLeafScene = $derived(ExternalLeafScene ?? InternalLeafSceneComponent);

	// Target calculation setup
	const eventStartDate = new Date(eventInfo.countdownTarget);
	const sessionTargets = scheduleDays
		.flatMap((day) => day.sessions.map((session) => ({ session, day })))
		.map(({ session, day }) => ({
			...session,
			date: new Date(session.date.replace(' Europe/Bucharest', '+02:00').replace(' ', 'T')),
			dayLabel: day.label
		}))
		.filter((session) => !Number.isNaN(session.date.getTime()))
		.sort((a, b) => a.date.getTime() - b.date.getTime());

	function updateCountdown() {
		const now = Date.now();
		const nextSession =
			now >= eventStartDate.getTime()
				? sessionTargets.find((session) => session.date.getTime() > now)
				: undefined;
		const targetDate = nextSession?.date ?? eventStartDate;
		const difference = Math.max(targetDate.getTime() - now, 0);

		if (nextSession) {
			countdownTitle = 'NEXT TRAINING';
			countdownDateLabel = new Intl.DateTimeFormat('en-GB', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				timeZone: 'Europe/Bucharest'
			}).format(nextSession.date);
		} else if (now < eventStartDate.getTime()) {
			countdownTitle = 'BEST TRAINING WEEK';
			countdownDateLabel = eventInfo.dateLabel;
		}

		const nextTimeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / (1000 * 60)) % 60),
			seconds: Math.floor((difference / 1000) % 60)
		};
		const nextDigits = getFlipDigits(nextTimeLeft);
		const nextFlipVersions = { ...flipVersions };

		for (const key of flipKeyOrder) {
			if (flipDigits[key] !== nextDigits[key]) {
				nextFlipVersions[key] += 1;
			}
		}

		prevFlipDigits = { ...flipDigits };
		flipDigits = nextDigits;
		flipVersions = nextFlipVersions;
	}

	function scrollToAbout() {
		document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function scheduleLeafSceneLoad() {
		if (ExternalLeafScene) return;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const nav =
			typeof navigator !== 'undefined'
				? (navigator as Navigator & { connection?: NetworkInformation })
				: undefined;
		if (prefersReducedMotion || nav?.connection?.saveData === true) return;

		const load = async () => {
			const leafModule = await import('../components/LeafScene.svelte');
			InternalLeafSceneComponent = leafModule.default;
		};

		if ('requestIdleCallback' in window) {
			(window as any).requestIdleCallback(() => void load(), { timeout: 1500 });
		} else {
			setTimeout(() => void load(), 320);
		}
	}

	async function loadTreeScene() {
		if (treeLoadStarted || TreeLocationComponent) return;
		treeLoadStarted = true;
		const treeModule = await import('../components/TreeLocation.svelte');
		TreeLocationComponent = treeModule.default;
	}

	onMount(() => {
		updateCountdown();
		scheduleLeafSceneLoad();

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobileViewport = window.matchMedia('(max-width: 960px)').matches;
		const nav =
			typeof navigator !== 'undefined'
				? (navigator as Navigator & { connection?: NetworkInformation })
				: undefined;

		const activateTree = () => {
			void loadTreeScene();
			removeTreeActivationListeners();
		};

		const removeTreeActivationListeners = () => {
			window.removeEventListener('pointerdown', activateTree);
			window.removeEventListener('pointermove', activateTree);
			window.removeEventListener('keydown', activateTree);
		};

		if (!prefersReducedMotion && !nav?.connection?.saveData && !isMobileViewport) {
			window.addEventListener('pointerdown', activateTree, { passive: true });
			window.addEventListener('pointermove', activateTree, { passive: true, once: true });
			window.addEventListener('keydown', activateTree);
		}

		const timer = setInterval(updateCountdown, 1000);

		return () => {
			clearInterval(timer);
			removeTreeActivationListeners();
		};
	});
</script>

<section id="home" class="hero-section">
	<div class="hero-tree-background">
		<img
			src="https://raw.githubusercontent.com/ceramicSoda/treeshader/main/assets/preview.png"
			alt=""
			aria-hidden="true"
			class="hero-tree-preview"
			fetchpriority="high"
			decoding="async"
		/>
		{#if TreeLocationComponent}
			<div class="hero-tree-scene"><TreeLocationComponent /></div>
		{/if}
	</div>

	<div class="hero-overlay"></div>

	{#if ActiveLeafScene}
		<div class="hero-leaf-overlay" aria-hidden="true">
			<ActiveLeafScene />
		</div>
	{/if}

	<div class="hero-home-grid">
		<div class="hero-home-copy">
			<div class="hero-title-stack">
				<h1 class="hero-event-title">{countdownTitle}</h1>
			</div>

			<div class="hero-countdown-stack">
				<p class="hero-event-date">{countdownDateLabel}</p>
				<FlipCountdown {flipDigits} {prevFlipDigits} {flipVersions} />
			</div>

			<a
				href="https://docs.google.com/forms/"
				target="_blank"
				rel="noopener noreferrer"
				class="hero-register-cta"
			>
				Register now
			</a>

			<p class="hero-short-description">{eventInfo.description}</p>
		</div>
		<div class="hero-tree-spacer" aria-hidden="true"></div>
	</div>

	<button
		type="button"
		class="hero-scroll-prompt"
		onclick={scrollToAbout}
		aria-label="Scroll to About us"
		title="Scroll to About us"
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="m6 9 6 6 6-6"
				fill="none"
				stroke="currentColor"
				stroke-width="2.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</section>
