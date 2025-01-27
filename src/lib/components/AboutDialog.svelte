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
			<Dialog.Description class="pt-4 text-center">
				<p class="italic">"美乃滋不是樂器，但海綿寶寶是種文體。"</p>
				<p>
					感謝 VulcandDays 提供 <a
						href="https://forum.gamer.com.tw/C.php?bsn=8063&snA=933"
						class="underline"
						target="_blank">資料來源</a
					>
				</p>
				<a
					href="https://github.com/Lifulifu/spongefont"
					class="flex items-center justify-center gap-2 pt-4"
					target="_blank"><Icon icon="mdi:github" class="h-6 w-6" /><span>Github</span></a
				>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
