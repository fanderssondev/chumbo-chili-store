<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Table from '$lib/components/ui/table';
	import { ChevronLeft, ChevronRight } from 'svelte-radix';
	import { currencyFormatter } from '$lib/utils/utils';

	let { data } = $props();

	let activePicture = $state(0);

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

<!-- BUG fix responsiveness -->
{#snippet sideInfo()}
	<div class="mb-8 items-center justify-between text-center">
		<div class="mb-4 text-4xl md:text-5xl">
			{currencyFormatter(data?.product?.price ?? 0)}
		</div>
		<Button size="lg" class="w-full text-xl">Add to Cart</Button>
	</div>
	{#if (data?.product?.ProductDetails?.Rating?.nr_of_reviews ?? 0) > 0}
		<div class="mb-4">
			{@render stars()}

			<p class="text-sm text-muted-foreground">
				{data?.product?.ProductDetails.Rating.nr_of_reviews}
				{data?.product?.ProductDetails?.Rating?.nr_of_reviews === 1 ? 'review' : 'reviews'}
			</p>
		</div>
	{/if}
	<div class="">
		<Table.Root>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="py-1 pl-0 pr-4 text-lg">Hotness</Table.Cell>
					<Table.Cell class="px-0 py-1 text-lg"
						>{data?.product?.ProductDetails.hotness}/10</Table.Cell
					>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="py-1 pl-0 pr-4 text-lg">Category</Table.Cell>
					<Table.Cell class="px-0 py-1 text-lg">{data?.product?.ProductDetails.category}</Table.Cell
					>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="py-1 pl-0 pr-4 text-lg">Manufacturer</Table.Cell>
					<Table.Cell class="px-0 py-1 text-lg"
						>{data?.product?.ProductDetails.manufacturer}</Table.Cell
					>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="py-1 pl-0 pr-4 text-lg">Weight</Table.Cell>
					<Table.Cell class="px-0 py-1 text-lg"
						>{data?.product?.ProductDetails.weight.toFixed(2)}kg</Table.Cell
					>
				</Table.Row>
			</Table.Body>
		</Table.Root>
		<!-- <p>Hotness: {data?.product?.ProductDetails.hotness}/10</p>
		<p>Category: {data?.product?.ProductDetails.category}</p>
		<p>Manufacturer: {data?.product?.ProductDetails.manufacturer}</p>
		<p>Weight: {data?.product?.ProductDetails.weight.toFixed(2)}kg</p> -->
	</div>
{/snippet}

<Card.Root class="flex h-full flex-col rounded-lg border-2 bg-accent">
	<Card.Header class="p-4 lg:p-20">
		<Card.Title class="mb-10 text-center text-3xl sm:text-4xl md:text-5xl"
			>{data?.product?.title}</Card.Title
		>
		<div class="grid gap-16 sm:grid-cols-[1fr_auto] lg:gap-24">
			{@render pictures()}
			<div class="flex flex-col justify-between">
				<!-- <div class="hidden text-lg xl:block">
					{data?.product?.Description.description_short}
				</div> -->
				<div class="">
					{@render sideInfo()}
				</div>
			</div>
		</div>
		<div class="pt-6 text-lg xl:hidden">
			{data?.product?.Description.description_short}
		</div>
	</Card.Header>
	<Card.Content class="flex h-full flex-grow flex-col px-10 pb-10 pt-0 lg:px-20">
		<p class="flex-grow">{@html data?.product?.Description.description_long}</p>
	</Card.Content>
</Card.Root>

{#snippet pictures()}
	{#if data?.product?.pictures}
		<div class="flex flex-col-reverse gap-4 sm:flex-row">
			<ul class="flex gap-4 sm:flex-col">
				{#each data.product.pictures as picture, i}
					<li>
						<button aria-label="picture" onclick={() => (activePicture = i)}>
							<img
								src="/productPics/{picture}"
								alt="product"
								class="size-16 rounded-lg shadow-primary"
								class:shadow-sm={i === activePicture}
							/>
						</button>
					</li>
				{/each}
			</ul>
			<div class="group relative flex-grow">
				<div class="relative">
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
		</div>
	{/if}
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
				stroke="currentColor"
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
				fill="hsl(var(--star))"
				clip-path="url(#clip-{i})"
			/>
		{/each}
	</svg>
{/snippet}
