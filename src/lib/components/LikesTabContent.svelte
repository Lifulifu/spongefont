<script lang="ts">
	import Gallery from './Gallery.svelte';
	import { user } from '$lib/store';
	import { SpongebobData } from '@/data';
	import Icon from '@iconify/svelte';

	export let data: any[] = [];
	$: likedData = data.filter((row) => $user.likes?.[row[SpongebobData.columns.id]] || false);
	$: console.log(likedData);
</script>

<div class="container text-center">
	<div class="mb-4 mt-6 flex items-center justify-center">
		<Icon icon="material-symbols:favorite-rounded" class="mr-2" />
		<p class="text-sm">
			<b>{likedData.length}</b> 個最愛
		</p>
	</div>
	<Gallery data={likedData} initialItems={10} itemsPerLoad={10} />
</div>
