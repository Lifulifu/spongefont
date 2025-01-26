<script lang="ts">
	import Button from './ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import Gallery from './Gallery.svelte';

	export let data: any[] = [];

	$: if (data.length > 0) {
		randomizeData();
	}

	function randomizeData() {
		data = data.sort(() => Math.random() - 0.5);
	}
</script>

<div class="container text-center">
	<Button variant="ghost" on:click={randomizeData} class="mb-2"
		><Icon icon="material-symbols:refresh-rounded" class="mr-2" />重新隨機</Button
	>
	<Gallery {data} initialItems={10} itemsPerLoad={10} />
</div>
