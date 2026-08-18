<script lang="ts">
	import '../css/home.css';
	import { base, resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import LeafScene from '$lib/components/LeafScene.svelte';
	import TreeLocation from '$lib/components/TreeLocation.svelte';
	import {
		eventInfo,
		navItems,
		organizers,
		scheduleDays,
		socialLinks,
		sponsors
	} from '$lib/site-data';

	type CountdownState = {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	};

	type FlipKey = 'd0' | 'd1' | 'h0' | 'h1' | 'm0' | 'm1' | 's0' | 's1';

	const flipKeyOrder: FlipKey[] = ['d0', 'd1', 'h0', 'h1', 'm0', 'm1', 's0', 's1'];
	const flipGroups: { label: string; keys: FlipKey[] }[] = [
		{ label: 'Days', keys: ['d0', 'd1'] },
		{ label: 'Hours', keys: ['h0', 'h1'] },
		{ label: 'Minutes', keys: ['m0', 'm1'] },
		{ label: 'Seconds', keys: ['s0', 's1'] }
	];

	function createFlipVersions() {
		return {
			d0: 0,
			d1: 0,
			h0: 0,
			h1: 0,
			m0: 0,
			m1: 0,
			s0: 0,
			s1: 0
		} satisfies Record<FlipKey, number>;
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

	const initialTimeLeft: CountdownState = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	const initialFlipDigits = getFlipDigits(initialTimeLeft);

	let timeLeft = $state(initialTimeLeft);
	let flipDigits = $state<Record<FlipKey, string>>({ ...initialFlipDigits });
	let prevFlipDigits = $state<Record<FlipKey, string>>({ ...initialFlipDigits });
	let flipVersions = $state<Record<FlipKey, number>>(createFlipVersions());

	const targetDate = new Date(eventInfo.countdownTarget);
	const displayedSponsors = [...sponsors, ...sponsors];
	const registerNowUrl = 'https://docs.google.com/forms/';
	let activeScheduleDay = $state(0);
	let navOpen = $state(false);

	function moveScheduleDay(index: number) {
		activeScheduleDay = ((index % scheduleDays.length) + scheduleDays.length) % scheduleDays.length;
	}

	function showPreviousDay() {
		moveScheduleDay(activeScheduleDay - 1);
	}

	function showNextDay() {
		moveScheduleDay(activeScheduleDay + 1);
	}

	function updateCountdown() {
		const difference = Math.max(targetDate.getTime() - Date.now(), 0);
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
		timeLeft = nextTimeLeft;
	}

	onMount(() => {
		updateCountdown();
		const timer = setInterval(updateCountdown, 1000);

		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<title>{eventInfo.name}</title>
	<meta
		name="description"
		content="BEST Training Week 2026 in Brașov, Romania. A student-focused event by BEST Brașov."
	/>
</svelte:head>

<div class="page-shell">
	<div aria-hidden="true" class="page-glow">
		<div class="page-glow-orb"></div>
	</div>
	<LeafScene />
	<header class="site-header">
		<nav class="site-nav">
			<a
				href={resolve('/#home')}
				class="site-brand-link"
				onclick={() => (navOpen = false)}
				aria-label="BEST Training Week home"
			>
				<img
					src={`${base}/images/logos/BTWLogoTransparent.png`}
					alt="BEST Training Week logo"
					class="site-brand"
				/>
			</a>

			<button
				type="button"
				class="nav-toggle"
				onclick={() => (navOpen = !navOpen)}
				aria-expanded={navOpen}
				aria-controls="mobile-nav-options"
				aria-label="Toggle navigation"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" class="nav-menu-icon">
					<path
						d="M4 8h16M4 16h16"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						class:nav-toggle-line-top={navOpen}
					/>
				</svg>
			</button>

			<div class="nav-options">
				{#each navItems as item (item.href)}
					<a
						href={resolve(item.href)}
						class="nav-link"
						onclick={() => (navOpen = false)}
					>
						<span>{item.label}</span>
						<svg viewBox="0 0 24 24" aria-hidden="true" class="nav-arrow-icon">
							<path
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
								fill="none"
								stroke="currentColor"
								stroke-width="1.9"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
				{/each}
			</div>

			<a
				href={registerNowUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="nav-cta"
				onclick={() => (navOpen = false)}
			>
				Register now
			</a>

			<div id="mobile-nav-options" class="mobile-nav" class:mobile-nav--open={navOpen}>
				{#each navItems as item (item.href)}
					<a href={resolve(item.href)} class="nav-link mobile-nav-link" onclick={() => (navOpen = false)}>
						<span>{item.label}</span>
						<svg viewBox="0 0 24 24" aria-hidden="true" class="nav-arrow-icon">
							<path
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
								fill="none"
								stroke="currentColor"
								stroke-width="1.9"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
				{/each}
				<a
					href={registerNowUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="nav-cta mobile-nav-cta"
					onclick={() => (navOpen = false)}
				>
					Register now
				</a>
			</div>
		</nav>
	</header>

	<main class="site-main">
		<section id="home" class="hero-section">
			<div class="hero-tree-background">
				<TreeLocation />
			</div>
			<div class="hero-overlay"></div>
			<div class="hero-home-grid">
				<div class="hero-home-copy">
					<div class="hero-title-stack">
						<h1 class="hero-event-title">BEST TRAINING WEEK</h1>
					</div>

					<div class="cdt-flp" role="timer" aria-live="polite" aria-atomic="true">
						<div class="cdt-flp__clock">
							{#each flipGroups as group, groupIndex (group.label)}
								<div class="cdt-flp__group">
									<div class="cdt-flp__digits">
										{#each group.keys as key (key)}
											{@const current = flipDigits[key]}
											{@const previous = prevFlipDigits[key]}
											{@const changed = current !== previous}
											{#key `${key}-${flipVersions[key]}`}
												<div class={`cdt-flp__flap ${changed ? 'cdt-flp--go' : ''}`}>
													<div class="cdt-flp__card cdt-flp__top"><span>{current}</span></div>
													<div class="cdt-flp__card cdt-flp__bottom"><span>{current}</span></div>
													<div class="cdt-flp__flip-top"><span>{previous}</span></div>
													<div class="cdt-flp__flip-bottom"><span>{current}</span></div>
												</div>
											{/key}
										{/each}
									</div>
									<span class="cdt-flp__glabel">{group.label}</span>
								</div>
								{#if groupIndex > 0 && groupIndex < flipGroups.length - 1}
									<span class="cdt-flp__colon" aria-hidden="true">:</span>
								{/if}
							{/each}
						</div>
					</div>
					<p class="hero-short-description">{eventInfo.description}</p>
				</div>

				<div class="hero-tree-spacer" aria-hidden="true"></div>
			</div>
		</section>

		<section id="about" class="content-section">
			<div class="section-heading">
				<p class="section-kicker">About us</p>
				<h2 class="section-title">Who we are</h2>
			</div>

			<div class="about-layout">
				<div class="about-hero">
					<img
						src={`${base}/images/logos/BESTBrasovLogoBlack.png`}
						alt=""
						aria-hidden="true"
						class="about-hero-image"
					/>
				</div>

				<div class="about-grid">
					<div class="about-story">
						<p class="about-copy">
							BEST Brașov is a student non-profit organisation dedicated to creating meaningful
							opportunities for young people through education, personal development, and
							international collaboration.
						</p>
						<p class="about-copy">
							We bring together students, volunteers, and professionals to build a vibrant community
							where ideas, skills, and friendships flourish across borders.
						</p>
					</div>

					<div class="stats-grid">
						<div class="stat-card stat-card--accent">
							<p class="stat-number">29</p>
							<p class="stat-label">Years of activity</p>
						</div>
						<div class="stat-card stat-card--secondary">
							<p class="stat-number">85</p>
							<p class="stat-label">Active members</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="schedule" class="schedule-section">
			<div class="schedule-inner">
				<div class="section-heading">
					<p class="section-kicker">Schedule</p>
					<h2 class="section-title">Event programme</h2>
				</div>

				<div class="schedule-panel">
					<div class="schedule-header">
						<div>
							<p class="schedule-label">Selected day</p>
							<h3 class="schedule-title">{scheduleDays[activeScheduleDay].title}</h3>
						</div>
						<div class="schedule-nav-group">
							<button type="button" aria-label="Previous day" class="schedule-btn" onclick={showPreviousDay}>
								‹
							</button>
							<button type="button" aria-label="Next day" class="schedule-btn" onclick={showNextDay}>
								›
							</button>
						</div>
					</div>

					<div class="schedule-carousel">
						<div class="schedule-track" style:transform={`translateX(-${activeScheduleDay * 100}%)`}>
							{#each scheduleDays as day, index (day.label)}
								<article
									class={`schedule-day-card ${activeScheduleDay === index ? 'schedule-day-card--active' : ''}`}
								>
									<div class="schedule-day-header">
										<div>
											<p class="schedule-day-label">{day.label}</p>
											<h3 class="schedule-day-title">{day.title}</h3>
										</div>
										<span class="schedule-badge">{day.sessions.length} sessions</span>
									</div>

									<p class="schedule-summary">{day.summary}</p>

									<div class="session-list">
										{#each day.sessions as session (session.time + session.title)}
											<div class="session-item">
												<div class="session-dot"></div>
												<div class="session-content">
													<div class="session-meta">
														<p class="session-time">{session.time}</p>
														<span class="session-tag">{session.location}</span>
													</div>

													<h4 class="session-title">{session.title}</h4>
													<p class="session-description">{session.description}</p>

													<div class="trainer-row">
														<span class="trainer-badge">
															{session.trainer
																.split(' ')
																.map((part) => part[0])
																.slice(0, 2)
																.join('')}
														</span>
														<span class="trainer-name">{session.trainer}</span>
													</div>
												</div>
											</div>
										{/each}
									</div>
								</article>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="sponsors" class="sponsors-section">
			<div class="sponsors-shell">
				<div class="section-heading">
					<p class="section-kicker">Partners</p>
					<h2 class="section-title">Our sponsors</h2>
				</div>

				<div class="sponsor-band">
					<div class="scroll-track">
						{#each displayedSponsors as sponsor, index (sponsor.name + index)}
							<div class="sponsor-card">
								<img src={sponsor.logo} alt={sponsor.alt} class="sponsor-logo" />
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section id="organizers" class="organizers-section">
			<div class="organizers-content">
				<div class="section-heading">
					<p class="section-kicker">Organizers</p>
					<h2 class="section-title">Event team</h2>
				</div>

				<div class="organizer-collage">
					{#each organizers as organizer, index (organizer.name)}
						<article class="collage-card collage-card--{index % 6}">
							<img src={organizer.photo} alt={organizer.name} class="collage-photo" />
							<div class="collage-copy">
								<h3 class="collage-name">{organizer.name}</h3>
								<p class="collage-role">{organizer.title}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
			<div class="team-leaf-overlay" aria-hidden="true">
				<LeafScene />
			</div>
		</section>
	</main>

	<footer class="site-footer">
		<div class="footer-grid">
			<div>
				<p class="section-kicker section-kicker--small">Follow us</p>
				<div class="social-links">
					{#each socialLinks as link (link.label)}
						<button
							type="button"
							aria-label={link.label}
							onclick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
							class="social-button"
						>
							{#if link.kind === 'instagram'}
								<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
									<path
										fill="currentColor"
										d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"
									/>
								</svg>
							{:else if link.kind === 'facebook'}
								<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
									<path
										d="M12.001 2c-5.523 0-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89c1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.344 21.129 22 16.992 22 12c0-5.523-4.477-10-10-10"
										fill="currentColor"
									/>
								</svg>
							{:else if link.kind === 'linkedin'}
								<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
									<path
										d="M18.336 18.339h-2.665v-4.177c0-.996-.02-2.278-1.39-2.278c-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387c2.7 0 3.2 1.778 3.2 4.092v4.714M7.004 8.575a1.546 1.546 0 0 1-1.548-1.549a1.548 1.548 0 1 1 1.547 1.549m1.336 9.764H5.667V9.75H8.34zM19.67 3H4.33C3.594 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.339C20.4 21 21 20.42 21 19.703V4.297C21 3.581 20.4 3 19.666 3z"
										fill="currentColor"
									/>
								</svg>
							{:else if link.kind === 'tiktok'}
								<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
									<path
										d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.97 7.97 0 0 1-5-1.755"
										fill="currentColor"
									/>
								</svg>
							{:else if link.kind === 'email'}
								<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
									<path
										d="M2 5.5V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2zM0 10h5v2H0zm0 5h8v2H0z"
										fill="currentColor"
									/>
								</svg>
							{:else}
								<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
									<path
										d="M3.5 6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 18 18H6a2.5 2.5 0 0 1-2.5-2.5v-11Zm1.7.8 7.3 5.8 7.3-5.8H5.2Zm14.3 10.2V8.1l-6.6 5.2a1 1 0 0 1-1.2 0L4.5 8.1v9.4c0 .5.4.9.9.9h12.2c.5 0 .9-.4.9-.9Z"
										fill="currentColor"
									/>
								</svg>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="footer-brand-wrap">
				<a href="https://bestbrasov.ro/" target="_blank" rel="noopener noreferrer">
					<img
							src={`${base}/images/logos/BESTBrasovLogoBlack.png`}
						alt="BEST Brașov logo"
						class="footer-brand"
					/>
				</a>
			</div>

			<div class="footer-copy">
				<p>
					All right reserved | Copyright © 2026 <br />
					<a href="https://bestbrasov.ro/" target="_blank" rel="noopener noreferrer"
						>Board of European Students of Technology Brasov</a
					>
				</p>
			</div>
		</div>
	</footer>
</div>
