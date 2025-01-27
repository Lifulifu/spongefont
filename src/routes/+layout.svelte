<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { toggleMode } from 'mode-watcher';
	import Icon from '@iconify/svelte';
	import AboutDialog from '@/components/AboutDialog.svelte';
	import { Toaster } from '@/components/ui/sonner';
	let { children } = $props();
</script>

<svelte:head>
	<title>海綿體</title>
</svelte:head>

<ModeWatcher />

<nav class="container flex items-center justify-between py-2">
	<h1 class="flex select-none items-center gap-2 text-2xl">
		<Icon icon="material-symbols:feature-search-rounded" />海綿體
	</h1>
	<div class="flex items-center">
		<AboutDialog />

		<Button size="icon" variant="ghost" on:click={toggleMode}>
			<Icon icon="material-symbols:light-mode" class="h-6 w-6 scale-0 dark:scale-100" />
			<Icon icon="material-symbols:dark-mode" class="absolute h-6 w-6 scale-100 dark:scale-0" />
		</Button>
	</div>
</nav>

{@render children()}

<Toaster />
