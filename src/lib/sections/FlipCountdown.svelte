<script lang="ts">
	export type FlipKey = 'd0' | 'd1' | 'h0' | 'h1' | 'm0' | 'm1' | 's0' | 's1';

	const flipGroups: { label: string; keys: FlipKey[] }[] = [
		{ label: 'Days', keys: ['d0', 'd1'] },
		{ label: 'Hours', keys: ['h0', 'h1'] },
		{ label: 'Minutes', keys: ['m0', 'm1'] },
		{ label: 'Seconds', keys: ['s0', 's1'] }
	];

	let {
		flipDigits,
		prevFlipDigits,
		flipVersions
	}: {
		flipDigits: Record<FlipKey, string>;
		prevFlipDigits: Record<FlipKey, string>;
		flipVersions: Record<FlipKey, number>;
	} = $props();
</script>

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
