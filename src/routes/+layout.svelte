<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { toggleMode } from 'mode-watcher';
	import Icon from '@iconify/svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>海綿體</title>
</svelte:head>

<ModeWatcher />

<nav class="container flex items-center justify-between py-2">
	<h1 class="flex items-center gap-2 text-2xl">
		<Icon icon="material-symbols:feature-search-rounded" />海綿體
	</h1>
	<Button size="icon" variant="ghost" on:click={toggleMode}>
		<Icon icon="material-symbols:light-mode" class="scale-0 dark:scale-100" />
		<Icon icon="material-symbols:dark-mode" class="absolute scale-100 dark:scale-0" />
	</Button>
</nav>
{@render children()}
