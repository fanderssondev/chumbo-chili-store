<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { ChevronLeft, ChevronRight } from 'svelte-radix';

	let { data } = $props();

	let activePicture = $state(0);
	let starSize = $state(36);
	let maskWidth = $derived(0.5 * starSize);

	const setActivePicture = (value: number) => {
		activePicture += value;

		if (data?.product?.pictures.length && activePicture < 0) {
			activePicture = data.product.pictures.length - 1;
		}

		if (data?.product?.pictures.length && activePicture > data.product.pictures.length - 1) {
			activePicture = 0;
		}
	};
</script>

<Card.Root class="flex h-full flex-col rounded-lg border-2 bg-accent">
	<Card.Header class="p-20">
		<Card.Title class="mb-12 text-4xl">{data?.product?.title}</Card.Title>
		<div class="grid grid-cols-2 gap-8">
			{@render pictures()}
			<div>
				<div class="mb-6">
					{data?.product?.Description.description_short}
				</div>
				{@render sideInfo()}
			</div>
		</div>
	</Card.Header>
	<Card.Content class="mt-6 flex h-full flex-grow flex-col px-20 py-10">
		<p class="flex-grow">{@html data?.product?.Description.description_long}</p>
	</Card.Content>
</Card.Root>

{#snippet pictures()}
	{#if data?.product?.pictures}
		<div class="flex gap-4">
			<ul class="flex flex-col gap-4">
				{#each data.product.pictures as picture, i}
					<li>
						<button aria-label="picture" onclick={() => (activePicture = i)}>
							<img
								src="/productPics/{picture}"
								alt="product"
								class="size-24 rounded-lg shadow-primary"
								class:shadow-sm={i === activePicture}
							/>
						</button>
					</li>
				{/each}
			</ul>
			<div class="group relative">
				<img
					src="/productPics/{data?.product?.pictures[activePicture]}"
					class="size-full rounded-lg shadow-sm shadow-primary"
					alt="product"
				/>
				<Button
					variant="ghost"
					onclick={() => setActivePicture(-1)}
					class="absolute left-0 top-0 hidden h-full rounded-e-none p-0 hover:bg-transparent group-hover:block"
				>
					<ChevronLeft class="size-16" />
				</Button>
				<Button
					variant="ghost"
					onclick={() => setActivePicture(1)}
					class="absolute right-0 top-0 hidden h-full rounded-s-none p-0 hover:bg-transparent group-hover:block"
				>
					<ChevronRight class="size-16" />
				</Button>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet sideInfo()}
	<div class="flex flex-col items-end">
		<div>
			<Button variant="default">Add to Cart</Button>
			<p class="mt-4 self-end">
				PRICE: <span class="text-2xl text-destructive">{data?.product?.price.toFixed(2)}&#8364</span
				>
			</p>
			{#if (data?.product?.ProductDetails?.Rating?.nr_of_reviews ?? 0) > 0}
				<p>Nr of reviews: {data?.product?.ProductDetails.Rating.nr_of_reviews}</p>
				<p>Average rating: {data?.product?.ProductDetails.Rating.average.toFixed(2)}</p>
				{@render stars()}
			{/if}
		</div>
	</div>
{/snippet}

{#snippet stars()}
	<svg width="138" height="26" viewBox="0 0 138 26" fill="none" xmlns="http://www.w3.org/2000/svg">
		{#each [1, 2, 3, 4, 5] as _, i}
			<!-- Define a mask to control partial fill for the star at index {i} -->
			<defs>
				<clipPath id="clip-{i}">
					<rect
						x={i * 28 + 1}
						y="0"
						width={Math.min(
							1,
							Math.max(0, (data?.product?.ProductDetails.Rating.average ?? 0) - i)
						) * 25}
						height="26"
					/>
				</clipPath>
			</defs>

			<!-- Star outline -->
			<path
				d="M{13 + i * 28} 1L{16.708 + i * 28} 8.89905L{25 + i * 28} 10.1735L{19 +
					i * 28} 16.3186L{20.416 + i * 28} 25L{13 + i * 28} 20.8991L{5.584 + i * 28} 25L{7 +
					i * 28} 16.3186L{1 + i * 28} 10.1735L{9.292 + i * 28} 8.89905L{13 + i * 28} 1Z"
				stroke="black"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="transparent"
			/>

			<!-- Star fill using the clipPath for partial fill -->
			<path
				d="M{13 + i * 28} 1L{16.708 + i * 28} 8.89905L{25 + i * 28} 10.1735L{19 +
					i * 28} 16.3186L{20.416 + i * 28} 25L{13 + i * 28} 20.8991L{5.584 + i * 28} 25L{7 +
					i * 28} 16.3186L{1 + i * 28} 10.1735L{9.292 + i * 28} 8.89905L{13 + i * 28} 1Z"
				stroke="none"
				fill="yellow"
				clip-path="url(#clip-{i})"
			/>
		{/each}
	</svg>
{/snippet}
