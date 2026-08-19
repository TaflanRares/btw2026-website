<script lang="ts">
	import { base, resolve } from '$app/paths';
	import { navItems } from '$lib/site-data';

	let { registerNowUrl }: { registerNowUrl: string } = $props();
	let navOpen = $state(false);
</script>

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
					d="M4 8h16"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					class="nav-toggle-line nav-toggle-line--top"
					class:nav-toggle-line--open={navOpen}
				/>
				<path
					d="M4 16h16"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					class="nav-toggle-line nav-toggle-line--bottom"
					class:nav-toggle-line--open={navOpen}
				/>
			</svg>
		</button>

		<div class="nav-options">
			{#each navItems as item (item.href)}
				<a href={resolve(item.href)} class="nav-link" onclick={() => (navOpen = false)}>
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
				<a
					href={resolve(item.href)}
					class="nav-link mobile-nav-link"
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
