<script lang="ts">
	import { base } from '$app/paths';
</script>

<section id="about" class="content-section">
	<img
		src={`${base}/images/material/pumpkin_i.webp`}
		alt=""
		aria-hidden="true"
		class="decor-pumpkin css-pumpkin--about1"
	/>
	<img
		src={`${base}/images/material/pumpkin_i.webp`}
		alt=""
		aria-hidden="true"
		class="decor-pumpkin css-pumpkin--about2"
	/>

	<div class="section-heading">
		<h2 class="section-title">About us</h2>
	</div>
	<div class="about-layout">
		<div class="about-hero">
			<img
				src={`${base}/images/BESTies/BESTGroupPhoto.jpg`}
				alt="BEST Brașov members"
				class="about-hero-image"
			/>
			<img
				src={`${base}/images/material/cornerstamp.webp`}
				alt=""
				aria-hidden="true"
				class="about-cornerstamp"
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
