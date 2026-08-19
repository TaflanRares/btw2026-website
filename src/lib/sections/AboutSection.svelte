<script lang="ts">
	import Pumpkin from '../components/Pumpkin.svelte';
</script>

<section id="about" class="content-section">
	<Pumpkin class="css-pumpkin--about1" />
	<Pumpkin class="css-pumpkin--about2" />

	<div class="section-heading">
		<h2 class="section-title">About us</h2>
	</div>
	<div class="about-layout">
		<div class="about-hero">
			<img
				src="/images/BESTies/BESTGroupPhoto.webp"
				alt="BEST Brașov members"
				class="about-hero-image"
			/>
		</div>
		<div class="about-grid">
			<div class="about-story">
				<p class="about-copy">
					BEST Brașov is a student-run non-profit organisation dedicated to developing students,
					through educational involvement, complementary education and career support.
				</p>
				<p class="about-copy">
					BEST Training Week, now on its XIX-th edition brings together students and professionals
					with the goal of covering areas of interest.
				</p>
			</div>
			<div class="stats-grid">
				<div class="stat-card stat-card--accent">
					<p class="stat-number">29</p>
					<p class="stat-label"><span>Years of</span><span>activity</span></p>
				</div>
				<div class="stat-card stat-card--secondary">
					<p class="stat-number">85</p>
					<p class="stat-label">Active members</p>
				</div>
			</div>
		</div>
	</div>
</section>
