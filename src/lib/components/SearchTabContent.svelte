<script lang="ts">
	import Button from './ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import Gallery from './Gallery.svelte';
	import { SpongebobData } from '@/data';
	import { debounce, isSubsequence } from '@/utils';

	export let data: any[] = [];
	export let searchInputValue: string = '';
	let filteredData: any[] = [];

	let updateFilteredData = debounce((value: string) => {
		if (value) {
			filteredData = data.filter((row) => {
				if (!row[SpongebobData.columns.text]) {
					return false;
				}
				const target = row[SpongebobData.columns.text].toString().toLowerCase();
				return isSubsequence(value.toLowerCase(), target);
			});
		} else {
			filteredData = [];
		}
	}, 500);

	$: updateFilteredData(searchInputValue);
</script>

<div class="container text-center">
	<div class="mb-4 mt-6 flex items-center justify-center">
		<Icon icon="material-symbols:search-rounded" class="mr-2" />
		<p>
			<b>{filteredData.length}</b> 個結果
		</p>
	</div>
	<Gallery data={filteredData} initialItems={10} itemsPerLoad={10} />
</div>
