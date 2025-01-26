<script lang="ts">
	import { SpongebobData } from '@/data.js';
	import { fade } from 'svelte/transition';
	import Button from './ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';

	export let item: any = {};
	let hovering: boolean = false;

	async function copyImage(e: MouseEvent) {
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
				await navigator.clipboard.write([
					new ClipboardItem({
						'image/png': pngBlob as Blob
					})
				]);
				toast.success('圖片已複製', { position: 'bottom-center' });
			}, 'image/png');
		} catch (err) {
			console.error('Failed to copy image: ', err);
			toast.error(`複製圖片失敗: ${err}`, { position: 'bottom-center' });
		}
	}

	async function downloadImage(e: MouseEvent) {
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
</script>

<div
	class="relative h-60 w-60 overflow-hidden rounded-md bg-slate-100"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	role="button"
	tabindex="0"
>
	{#if hovering}
		<!-- overlay -->
		<div
			transition:fade={{ duration: 100 }}
			class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black bg-opacity-60 p-4"
		>
			<p class="text-white opacity-80">{item[SpongebobData.columns.text]}</p>
			<div class="gap2 flex items-center">
				<Button size="icon" variant="ghost" class="text-white" on:click={copyImage}>
					<Icon class="h-8 w-8" icon="material-symbols:content-copy-outline" />
				</Button>
				<Button size="icon" variant="ghost" class="text-white" on:click={downloadImage}>
					<Icon class="h-8 w-8" icon="material-symbols:download" />
				</Button>
			</div>
		</div>
	{/if}
	<img
		class="h-full object-cover"
		src={item[SpongebobData.columns.img]}
		alt={item[SpongebobData.columns.text]}
	/>
</div>
