<script lang="ts">
	import { base } from '$app/paths';
	import { socialLinks } from '../site-data';
	import '../../css/footer.css';
	import Pumpkin from '../components/Pumpkin.svelte';
</script>

<footer class="site-footer">
	<Pumpkin class="css-pumpkin--footer" />

	<div class="footer-grid">
		<!-- left: socials -->
		<div>
			<span class="follow-us">Follow us</span>
			<div class="social-links">
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				{#each socialLinks as social (social.label)}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="social-button"
						aria-label={social.label}
					>
						{#if social.kind === 'instagram'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
								<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
								<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
							</svg>
						{:else if social.kind === 'facebook'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
							</svg>
						{:else if social.kind === 'linkedin'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
								/>
								<rect x="2" y="9" width="4" height="12" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						{:else if social.kind === 'tiktok'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
							</svg>
						{:else if social.kind === 'email'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
								/>
								<polyline points="22,6 12,13 2,6" />
							</svg>
						{/if}
					</a>
				{/each}
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</div>
		</div>

		<!-- mid: logo -->
		<div class="footer-brand-wrap">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				href="https://bestbrasov.ro/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="BEST Brașov website"
			>
				<img
					src={`${base}/images/logos/BESTBrasovLogoBlack.png`}
					alt="BEST Brașov"
					class="footer-brand"
				/>
			</a>
		</div>

		<!-- right: copyright -->
		<div class="footer-copy">
			<p><a href="https://bestbrasov.ro/"> BEST Brașov </a> © {new Date().getFullYear()}</p>
			<p>All rights reserved</p>
		</div>
	</div>
</footer>
