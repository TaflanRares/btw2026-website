<script lang="ts">
	import { sponsors } from '$lib/site-data';

	const displayedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
</script>

<section id="sponsors" class="sponsors-section">
	<div class="sponsors-shell">
		<div class="section-heading">
			<h2 class="section-title">Our Partners</h2>
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
