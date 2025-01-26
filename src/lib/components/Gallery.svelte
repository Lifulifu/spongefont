<script lang="ts">
	import { SpongebobData } from '@/data';
	import { debounce } from '@/utils';
	import GalleryItem from './GalleryItem.svelte';
	import Button from './ui/button/button.svelte';
	import Icon from '@iconify/svelte';

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
			{ threshold: 0 }
		);

		loadMoreObserver.observe(endDom);
	}
</script>

<div class="text-center">
	<div class="flex w-full flex-wrap justify-center gap-1">
		{#each data.slice(0, endIndex) as item (item[SpongebobData.columns.id])}
			<GalleryItem {item} />
		{/each}
	</div>
	<div bind:this={endDom}></div>
	{#if endIndex < data.length}
		<Button on:click={loadMore} variant="ghost" class="mt-4"
			><Icon
				icon="material-symbols:keyboard-double-arrow-down-rounded"
				class="mr-2"
			/>載入更多</Button
		>
	{/if}
</div>
