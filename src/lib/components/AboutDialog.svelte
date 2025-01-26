<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Icon from '@iconify/svelte';
	import Button from '@/components/ui/button/button.svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button size="icon" variant="ghost">
			<Icon icon="material-symbols:question-mark-rounded" class="h-6 w-6" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-center">海綿體 | SpongeFont</Dialog.Title>
			<Dialog.Description class="text-center"
				>美乃滋不是樂器，但海綿寶寶是種文體。</Dialog.Description
			>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
