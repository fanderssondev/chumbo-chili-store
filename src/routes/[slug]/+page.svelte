<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index';
	import * as Pagination from '$lib/components/ui/pagination';
	import { ChevronLeft, ChevronRight } from 'svelte-radix';

	let { data } = $props();

	let activePicture = $state(0 % (data?.product?.pictures?.length ?? 1));
</script>

{#if data.product}
	<Card.Root class="flex h-full flex-col rounded-lg border-2 bg-accent">
		<Card.Header class="p-20">
			<Card.Title class="mb-12 text-4xl">{data.product.title}</Card.Title>

			<div class="flex justify-between">
				<div>
					<img
						src="/productPics/{data.product.pictures[activePicture]}"
						class="size-full rounded-lg shadow-sm shadow-primary"
						alt="product"
					/>

					<Pagination.Root
						class="mt-2"
						count={data.product.pictures.length}
						perPage={1}
						let:pages
						let:currentPage
					>
						<Pagination.Content>
							<Pagination.Item>
								<Pagination.PrevButton>
									<ChevronLeft onclick={() => activePicture--} />
								</Pagination.PrevButton>
							</Pagination.Item>
							{#each pages as page (page.key)}
								<Pagination.Item>
									<Pagination.Link
										{page}
										isActive={currentPage == page.value}
										onclick={() => (activePicture = page.value - 1)}
									>
										{page.value}
									</Pagination.Link>
								</Pagination.Item>
							{/each}
							<Pagination.Item>
								<Pagination.NextButton>
									<ChevronRight onclick={() => activePicture++} />
								</Pagination.NextButton>
							</Pagination.Item>
						</Pagination.Content>
					</Pagination.Root>
				</div>
				<div>
					{data.product.Description.description_short}
				</div>
				<div>
					<Button variant="default"
						><iconify-icon icon="lucide:shopping-cart" class="mr-2 text-xl"></iconify-icon>Add to
						Cart</Button
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
		</Card.Header>
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
