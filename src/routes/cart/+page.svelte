<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import Minus from '$lib/icons/minus.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Trash from '$lib/icons/trash.svelte';
	import { currencyFormatter } from '$lib/utils/utils';
	import { storedCart } from '$lib/stores/useLocalStorageCart.svelte';

	let { data } = $props();

	const getNrOfItems = (id: string) => {
		return storedCart.cart.find((item) => item.id === id)?.count;
	};
</script>

<div class="grid grid-cols-2">
	<div>
		<!-- TODO Address form -->
		<pre>
        {JSON.stringify(storedCart.getAllIds, null, 2)}
    </pre>

		<pre>
			 {JSON.stringify(
				data.products.map((i) => i.id),
				null,
				2
			)}
		</pre>
	</div>

	<ul class="space-y-6">
		{#each data.products as item}
			{@const itemCount = getNrOfItems(item.id) ?? 1}

			<li>
				<Card.Root class="rounded-lg border-2 bg-accent">
					<Card.Content class="grid grid-cols-[auto_1fr_auto] grid-rows-2 px-8 py-2">
						<img
							src="/productPics/{item.pictures[0]}"
							class="row-span-2 size-24 self-center"
							alt="product"
						/>
						<div class="ml-8">
							<Card.Title class="text-lg">{item.title}</Card.Title>
							<p>x <span>{itemCount}</span></p>
						</div>
						<div>
							<p class="ml-auto">{currencyFormatter(item.price)}</p>
							<p class="ml-auto">
								Total <span class="text-2xl">{currencyFormatter(item.price * itemCount)}</span>
							</p>
						</div>
						<div>
							<Button onclick={() => storedCart.decrement(item.id)}><Minus /></Button>
							<Button onclick={() => storedCart.increment(item.id)}><Plus /></Button>
							<Button onclick={() => storedCart.delete(item.id)} variant="destructive"
								><Trash /></Button
							>
						</div>
					</Card.Content>
				</Card.Root>
			</li>
		{/each}
	</ul>
</div>
