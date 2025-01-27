<script lang="ts">
	import { SpongebobData } from '@/data.js';
	import Button from './ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import { user } from '$lib/store';

	export let item: any = {};
	let showFullImage: boolean = false;
	$: liked = $user.likes?.[item[SpongebobData.columns.id]] || false;

	async function copyImage(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		try {
			const response = await fetch(item[SpongebobData.columns.img]);
			const blob = await response.blob();
			const imageBitmap = await createImageBitmap(blob);
			const canvas = document.createElement('canvas');
			canvas.width = imageBitmap.width;
			canvas.height = imageBitmap.height;
			const context = canvas.getContext('2d') as CanvasRenderingContext2D;
			context.drawImage(imageBitmap, 0, 0);
			canvas.toBlob(async (pngBlob) => {
				try {
					await navigator.clipboard.write([
						new ClipboardItem({
							'image/png': pngBlob as Blob
						})
					]);
					toast.success('圖片已複製', { position: 'bottom-center' });
				} catch (err) {
					console.error('Failed to copy image: ', err);
					toast.error(`複製圖片失敗。請嘗試長按複製圖片。`, {
						position: 'bottom-center'
					});
				}
			}, 'image/png');
		} catch (err) {
			console.error('Failed to copy image: ', err);
			toast.error(`複製圖片失敗: ${err}`, { position: 'bottom-center' });
		}
	}

	async function downloadImage(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		const response = await fetch(item[SpongebobData.columns.img]);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'image.png';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function openFullImage(e: MouseEvent) {
		showFullImage = true;
	}

	function onLike() {
		if (liked) {
			delete $user.likes[item[SpongebobData.columns.id]];
		} else {
			$user.likes[item[SpongebobData.columns.id]] = true;
		}
		$user.likes = $user.likes;
	}
</script>

<div
	class="relative h-60 w-60 cursor-pointer overflow-hidden rounded-md bg-slate-100 transition-all hover:brightness-75"
	on:click={openFullImage}
>
	<img
		class="h-full object-cover transition-all"
		src={item[SpongebobData.columns.img]}
		alt={item[SpongebobData.columns.text]}
		loading="lazy"
	/>
	{#if liked}
		<div class="absolute right-2 top-2 rounded-md bg-black/50 p-1">
			<Icon icon="material-symbols:favorite-rounded" class="h-6 w-6 text-white" />
		</div>
	{/if}
</div>

<Dialog.Root bind:open={showFullImage}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Description class="text-center">{item[SpongebobData.columns.text]}</Dialog.Description
			>
		</Dialog.Header>
		<div class="flex items-center justify-center gap-2">
			<Button on:click={copyImage} size="icon" variant="ghost">
				<Icon icon="material-symbols:content-copy-outline" class="h-6 w-6" />
			</Button>
			<Button on:click={downloadImage} size="icon" variant="ghost">
				<Icon icon="material-symbols:download" class="h-6 w-6" />
			</Button>
			<Button on:click={onLike} size="icon" variant="ghost">
				{#if liked}
					<Icon icon="material-symbols:favorite-rounded" class="h-6 w-6" />
				{:else}
					<Icon icon="material-symbols:heart-plus-outline-rounded" class="h-6 w-6" />
				{/if}
			</Button>
		</div>
		<img
			class="w-full"
			src={item[SpongebobData.columns.img]}
			alt={item[SpongebobData.columns.text]}
		/>
	</Dialog.Content>
</Dialog.Root>
