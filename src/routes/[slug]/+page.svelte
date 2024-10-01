<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { ChevronLeft, ChevronRight } from 'svelte-radix';

	let { data } = $props();

	let activePicture = $state(0);

	const setActivePicture = (value: number) => {
		activePicture += value;

		if (data?.product?.pictures?.length && activePicture < 0) {
			activePicture = data.product.pictures.length - 1;
		}

		if (data?.product?.pictures?.length && activePicture > data.product.pictures.length - 1) {
			activePicture = 0;
		}
	};
</script>

{#if data.product}
	<Card.Root class="flex h-full flex-col rounded-lg border-2 bg-accent">
		<Card.Header class="p-20">
			<Card.Title class="mb-12 text-4xl">{data.product.title}</Card.Title>

			<pre>
				 {JSON.stringify(`activePicture: ${activePicture}`, null, 2)}
				 {JSON.stringify(`length:        ${data.product.pictures.length}`, null, 2)}
			</pre>

			<div class="grid grid-cols-[10%_50%_40%] gap-4">
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
						src="/productPics/{data.product.pictures[activePicture]}"
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
				<div>
					<div>
						<div>
							{data.product.Description.description_short}
							<div>
								<Button variant="default"
									><iconify-icon icon="lucide:shopping-cart" class="mr-2 text-xl"></iconify-icon>Add
									to Cart</Button
								>
								<p class="mt-4 self-end">
									PRICE: <span class="text-2xl text-destructive"
										>{data.product.price.toFixed(2)}&#8364</span
									>
								</p>
								<p>Nr of reviews: {data.product.ProductDetails.Rating.nr_of_reviews}</p>
								<p>Average rating: {data.product.ProductDetails.Rating.average.toFixed(2)}</p>
								<p class="">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-star yellow-star"
										><polygon
											points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
										/></svg
									>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div></Card.Header
		>
		<Card.Content class="mt-6 flex h-full flex-grow flex-col px-20 py-10">
			<p class="flex-grow">{@html data.product.Description.description_long}</p>
		</Card.Content>
	</Card.Root>
{/if}

<style>
	iconify-icon {
		display: inline-block;
	}

	.yellow-star {
		color: red;
		/* fill: green; */
		background-color: blue;
		background-clip: text;
	}
</style>
