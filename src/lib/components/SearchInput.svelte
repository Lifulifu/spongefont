<script>
	import Input from './ui/input/input.svelte';
	import Icon from '@iconify/svelte';

	export let value = '';
</script>

<div class="relative w-full">
	<Icon class="absolute h-10 w-10 p-2 text-slate-400" icon="material-symbols:search-rounded" />
	<Input class="pl-9 text-lg" bind:value {...$$props} />
</div>
