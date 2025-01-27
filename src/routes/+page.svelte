<script lang="ts">
	import SearchInput from '@/components/SearchInput.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Icon from '@iconify/svelte';
	import SearchTabContent from '@/components/SearchTabContent.svelte';
	import RandomTabContent from '@/components/RandomTabContent.svelte';
	import { onMount } from 'svelte';
	import { SpongebobData } from '@/data';
	import LikesTabContent from '@/components/LikesTabContent.svelte';

	let searchInputValue: string = '';
	let spongebobData: any[] = [];
	let currentTab: string = 'random';

	onMount(async () => {
		let data = await SpongebobData.load();
		data.splice(0, 1); // remove header row
		data = data.filter((row) => {
			return !!row[SpongebobData.columns.img];
		});
		spongebobData = data;
	});

	$: if (searchInputValue) {
		currentTab = 'search';
	}
</script>

<div class="pb-24">
	<div class="container mx-auto my-8 max-w-96">
		<SearchInput placeholder="輸入搜尋文字..." bind:value={searchInputValue} />
	</div>

	<Tabs.Root bind:value={currentTab} class="w-full">
		<Tabs.List class="mx-auto mb-4 grid w-64 grid-cols-3 gap-2">
			<Tabs.Trigger value="search"
				><Icon icon="material-symbols:search-rounded" class="mr-2" />搜尋</Tabs.Trigger
			>
			<Tabs.Trigger value="random"
				><Icon icon="material-symbols:shuffle-rounded" class="mr-2" />隨機</Tabs.Trigger
			>
			<Tabs.Trigger value="likes"
				><Icon icon="material-symbols:favorite-rounded" class="mr-2" />最愛</Tabs.Trigger
			>
		</Tabs.List>
		<Tabs.Content value="search"
			><SearchTabContent data={spongebobData} {searchInputValue} /></Tabs.Content
		>
		<Tabs.Content value="random"><RandomTabContent data={spongebobData} /></Tabs.Content>
		<Tabs.Content value="likes"><LikesTabContent data={spongebobData} /></Tabs.Content>
	</Tabs.Root>
</div>
