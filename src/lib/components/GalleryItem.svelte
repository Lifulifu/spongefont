<script lang="ts">
	import { SpongebobData } from '@/data.js';
	import { fade } from 'svelte/transition';

	export let item: any = {};
	let hovering: boolean = false;
</script>

<div
	class="relative h-60 w-60 overflow-hidden rounded-md bg-slate-100"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	role="button"
	tabindex="0"
>
	{#if hovering}
		<div
			transition:fade={{ duration: 100 }}
			class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
		>
			<p class="text-white">hhi</p>
		</div>
	{/if}
	<img
		class="h-full object-cover"
		src={item[SpongebobData.columns.img]}
		alt={item[SpongebobData.columns.text]}
	/>
</div>
