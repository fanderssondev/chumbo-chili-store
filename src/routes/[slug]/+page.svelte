<script lang="ts">
	import StarRating from '$lib/components/StarRating.svelte';
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

	const getStarFillPercentage = (index: number) => {
		// const rating = data?.product?.ProductDetails.Rating.average ?? 0;
		const rating = 2.25;

		if (index + 1 <= rating) {
			console.log('first', index + 1);
			return 1;
		} else if (rating < index + 1 && rating - index > 0) {
			console.log('second', index + 1, rating - (index + 1));
			return rating - index;
		} else {
			console.log('third', index + 1);
			return 0;
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
			<Button variant="default"
				><iconify-icon icon="lucide:shopping-cart" class="mr-2 text-xl"></iconify-icon>Add to Cart</Button
			>
			<p class="mt-4 self-end">
				PRICE: <span class="text-2xl text-destructive">{data?.product?.price.toFixed(2)}&#8364</span
				>
			</p>
			{#if (data?.product?.ProductDetails?.Rating?.nr_of_reviews ?? 0) > 0}
				<p>Nr of reviews: {data?.product?.ProductDetails.Rating.nr_of_reviews}</p>
				<p>Average rating: {data?.product?.ProductDetails.Rating.average.toFixed(2)}</p>
				<StarRating fillPercentage={data.product?.ProductDetails.Rating.average ?? 1} />
			{/if}
		</div>
	</div>
{/snippet}

{#snippet stars()}
	<svg
		width="725"
		height="633"
		viewBox="0 0 725 633"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class=""
	>
		<!-- <rect width="725" height="633" fill="#1E1E1E" /> -->
		<!-- <rect width="725" height="633" fill="white" /> -->

		{#each [1, 2, 3, 4, 5] as _, i}
			<!-- Define a mask to control partial fill for the star at index {i} -->
			<defs>
				<clipPath id="clip-{i}">
					<rect
						x={i * 28 + 250}
						y="272"
						width={Math.min(1, Math.max(0, 2.5 - i)) * 20}
						height="24"
					/>
				</clipPath>
			</defs>

			<!-- Star outline -->
			<path
				d="M{250 + i * 28} 272L{253.708 + i * 28} 279.899L{262 + i * 28} 281.174L{256 +
					i * 28} 287.319L{257.416 + i * 28} 296L{250 + i * 28} 291.899L{242.584 +
					i * 28} 296L{244 + i * 28} 287.319L{238 + i * 28} 281.174L{246.292 +
					i * 28} 279.899L{250 + i * 28} 272Z"
				stroke="black"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="transparent"
			/>

			<!-- Star fill using the clipPath for partial fill -->
			<path
				d="M{250 + i * 28} 272L{253.708 + i * 28} 279.899L{262 + i * 28} 281.174L{256 +
					i * 28} 287.319L{257.416 + i * 28} 296L{250 + i * 28} 291.899L{242.584 +
					i * 28} 296L{244 + i * 28} 287.319L{238 + i * 28} 281.174L{246.292 +
					i * 28} 279.899L{250 + i * 28} 272Z"
				stroke="none"
				fill="yellow"
				clip-path="url(#clip-{i})"
			/>
		{/each}
	</svg>
{/snippet}

<!-- <svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="fill-yellow-400 stroke-background"
			><polygon
				points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
			/></svg
		> -->

<style>
	iconify-icon {
		display: inline-block;
	}
</style>
