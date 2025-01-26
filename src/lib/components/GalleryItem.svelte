<script lang="ts">
	import { SpongebobData } from '@/data.js';
	import { fade } from 'svelte/transition';
	import Button from './ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Description } from './ui/card';

	export let item: any = {};
	let showFullImage: boolean = false;

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
					toast.error(`複製圖片失敗。請嘗試打開圖片後再長按複製圖片。`, {
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
		e.preventDefault();
		e.stopPropagation();
		showFullImage = true;
	}
</script>

<div class="group relative h-60 w-60 cursor-pointer overflow-hidden rounded-md bg-slate-100">
	<img
		class="h-full object-cover"
		src={item[SpongebobData.columns.img]}
		data-src={item[SpongebobData.columns.img]}
	/>
	<!-- overlay -->
	<div
		class="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center gap-4 bg-black/50 p-4 opacity-0 transition-opacity group-hover:opacity-100"
	>
		<Button
			size="icon"
			variant="ghost"
			class="pointer-events-auto absolute right-2 top-2 select-none text-white"
			on:click={openFullImage}
		>
			<Icon icon="material-symbols:fullscreen-rounded" class="h-6 w-6" />
		</Button>
		<p class="text-white opacity-80">{item[SpongebobData.columns.text]}</p>
		<div class="pointer-events-auto flex items-center gap-2">
			<Button size="icon" variant="ghost" class="text-white" on:click={copyImage}>
				<Icon class="h-8 w-8 select-none" icon="material-symbols:content-copy-outline" />
			</Button>
			<Button size="icon" variant="ghost" class="text-white" on:click={downloadImage}>
				<Icon class="h-8 w-8 select-none" icon="material-symbols:download" />
			</Button>
		</div>
	</div>
</div>

<Dialog.Root bind:open={showFullImage}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Description class="text-center">{item[SpongebobData.columns.text]}</Dialog.Description
			>
		</Dialog.Header>
		<img
			class="w-full"
			src={item[SpongebobData.columns.img]}
			alt={item[SpongebobData.columns.text]}
		/>
	</Dialog.Content>
</Dialog.Root>
