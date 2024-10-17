<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import Minus from '$lib/icons/minus.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Trash from '$lib/icons/trash.svelte';
	import { storedCart } from '$lib/stores/useLocalStorageCart.svelte';
	import { currencyFormatter } from '$lib/utils/utils';

	const { cart, incrementItem, decrementItem, deleteItem, getNrOfItems } = storedCart();

	// $inspect(cart);
</script>

<div class="grid grid-cols-2">
	<div>
		<!-- TODO Address form -->
		<pre>
        {JSON.stringify(getNrOfItems(), null, 2)}
    </pre>
	</div>
	<ul class="space-y-6">
		{#each cart as item}
			<li>
				<Card.Root class="rounded-lg border-2 bg-accent">
					<Card.Content class="grid grid-cols-[auto_1fr_auto] grid-rows-2 px-8 py-2">
						<!-- <img
							src="/productPics/{item.pictures[0]}"
							class="row-span-2 size-24 self-center"
							alt="product"
						/>
						<div class="ml-8">
							<Card.Title class="text-lg">{item.title}</Card.Title>
							<p>x <span>{getItemCount(item.id)}</span></p>
						</div>
						<div>
							<p class="ml-auto">{currencyFormatter(item.price)}</p>
							<p class="ml-auto">
								Total <span class="text-2xl"
									>{currencyFormatter(item.price * getItemCount(item.id))}</span
								>
							</p>
						</div> -->
						<div>
							<Button onclick={() => decrementItem(item.id)}><Minus /></Button>
							<Button onclick={() => incrementItem(item.id)}><Plus /></Button>
							<Button onclick={() => deleteItem(item.id)} variant="destructive"><Trash /></Button>
						</div>
					</Card.Content>
				</Card.Root>
			</li>
		{/each}
	</ul>
</div>
