<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card/index';
	import * as Pagination from '$lib/components/ui/pagination';
	import { ChevronLeft, ChevronRight } from 'svelte-radix';

	let { data } = $props();

	let activePicture = $state(0 % (data?.product?.pictures?.length ?? 1));
</script>

{#if data.product}
	<Card.Root class="flex h-full flex-col rounded-lg border-2 bg-accent">
		<Card.Header class="grid p-10">
			<Card.Title class="mb-6 text-4xl">{data.product.title}</Card.Title>

			<div class="grid grid-cols-3 pl-6">
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
			</div>
		</Card.Header>
		<Card.Content class="mt-6 flex h-full flex-grow flex-col p-10">
			<p class="flex-grow">{@html data.product.Description.description_long}</p>
			<p class="mt-4 self-end">{data.product.price.toFixed(2)}&#8364</p>
		</Card.Content>
	</Card.Root>
{/if}
