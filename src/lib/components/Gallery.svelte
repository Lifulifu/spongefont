<script lang="ts">
	import { SpongebobData } from '@/data';
	import { debounce } from '@/utils';

	export let data: any[] = [];
	export let initialItems: number = 20;
	export let itemsPerLoad: number = 10;
	let endIndex = initialItems;
	let endDom: HTMLDivElement;
	let loadMoreObserver: IntersectionObserver;

	let loadMore = debounce(() => {
		if (endIndex >= data.length) return;
		endIndex += itemsPerLoad;
	}, 500);

	$: if (endDom) {
		loadMoreObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{ threshold: 1 }
		);

		loadMoreObserver.observe(endDom);
	}
</script>

<div class="flex w-full flex-wrap justify-center gap-1">
	{#each data.slice(0, endIndex) as item (item[SpongebobData.columns.id])}
		<div class="h-60 w-60 overflow-hidden rounded-md bg-slate-100">
			<img
				class="h-full object-cover"
				src={item[SpongebobData.columns.img]}
				alt={item[SpongebobData.columns.text]}
			/>
		</div>
	{/each}
	<div bind:this={endDom}></div>
</div>
