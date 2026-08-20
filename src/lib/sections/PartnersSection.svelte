<script lang="ts">
    import { sponsors } from '$lib/site-data';

    // Duplicate array to ensure a smooth, seamless infinite scroll
    const displayedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
    
    // Reverse or shift array for the second mobile reel to prevent identical stacked logos
    const row2Sponsors = [...displayedSponsors].reverse();
</script>

<section id="sponsors" class="sponsors-section">
    <div class="sponsors-shell">
        <div class="section-heading">
            <h2 class="section-title">Our Partners</h2>
        </div>
        
        <!-- reel 1 desktop & mobile -->
        <div class="sponsor-band">
            <div class="scroll-track track-left">
                {#each displayedSponsors as sponsor, index (sponsor.name + 'r1-' + index)}
                    <div class="sponsor-card">
                        <img src={sponsor.logo} alt={sponsor.alt} class="sponsor-logo" />
                    </div>
                {/each}
            </div>
        </div>

        <!-- reel 2 mobile only -->
        <div class="sponsor-band mobile-only-band">
            <div class="scroll-track track-right">
                {#each row2Sponsors as sponsor, index (sponsor.name + 'r2-' + index)}
                    <div class="sponsor-card">
                        <img src={sponsor.logo} alt={sponsor.alt} class="sponsor-logo" />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>