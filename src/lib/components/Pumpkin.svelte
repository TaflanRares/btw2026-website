<script lang="ts">
	import '../../css/pumpkin.css';
	interface Props {
		class?: string;
	}
	let { class: className = '' }: Props = $props();
</script>

<div aria-hidden="true" class="css-pumpkin {className}">
	<div class="pumpkin-stem"></div>
	<div class="pumpkin-body">
		<span class="pumpkin-lobe pumpkin-lobe--left"></span>
		<span class="pumpkin-lobe pumpkin-lobe--center"></span>
		<span class="pumpkin-lobe pumpkin-lobe--right"></span>
	</div>

	<div class="pumpkin-eyes">
		<div class="eye eye--left"></div>
		<div class="eye eye--right"></div>
	</div>

	<div class="pumpkin-smile">
		<span class="tooth"></span>
		<span class="tooth"></span>
		<span class="tooth"></span>
		<span class="tooth"></span>
		<span class="tooth"></span>
	</div>
</div>
