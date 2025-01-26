<script lang="ts">
	import Button from './ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import Gallery from './Gallery.svelte';
	import { SpongebobData } from '@/data';

	export let data: any[] = [];
	export let searchInputValue: string = '';
	let filteredData: any[] = [];

	$: {
		if (searchInputValue) {
			filteredData = data.filter((row) => {
				if (!row[SpongebobData.columns.text]) {
					return false;
				}
				return row[SpongebobData.columns.text]
					.toString()
					.toLowerCase()
					.includes(searchInputValue.toLowerCase());
			});
		} else {
			filteredData = [];
		}
	}
</script>

<div class="container text-center">
	<div class="mb-2 flex items-center justify-center">
		<Icon icon="material-symbols:search-rounded" class="mr-2" />
		<p>
			<b>{filteredData.length}</b> 個結果
		</p>
	</div>
	<Gallery data={filteredData} initialItems={10} itemsPerLoad={10} />
</div>
