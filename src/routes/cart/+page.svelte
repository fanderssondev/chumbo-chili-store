<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Minus, Plus, Trash2 } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index';
	import { currencyFormatter } from '$lib/utils';

	let { data } = $props();
</script>

<div class="grid grid-cols-2">
	<div>
		<!-- TODO Address form -->
		<pre>
        {JSON.stringify(data, null, 2)}
    </pre>

		<!-- <pre>
			{JSON.stringify(
				data.products.map((i) => i.id),
				null,
				2
			)}
		</pre> -->
	</div>

	<ul class="space-y-6">
		{#if data.order}
			{#each data.order.orderItems as item}
				<li>
					<Card.Root class="rounded-lg border-2 bg-accent">
						<Card.Content class="grid grid-cols-[auto_1fr_auto] grid-rows-2 px-8 py-2">
							<img
								src="/productPics/{item.product.pictures[0]}"
								class="row-span-2 size-24 self-center"
								alt="product"
							/>
							<div class="ml-8">
								<Card.Title class="text-lg">{item.product.title}</Card.Title>
								<p>x <span>{item.count}</span></p>
							</div>
							<div>
								<p class="ml-auto">{currencyFormatter(item.product.price)}</p>
								<p class="ml-auto">
									Total <span class="text-2xl"
										>{currencyFormatter(item.product.price * item.count)}</span
									>
								</p>
							</div>
							<div>
								<form method="post" use:enhance>
									<Button
										type="submit"
										formaction="?/decrement"
										name={'productId'}
										value={item.productId}><Minus /></Button
									>
									<Button
										type="submit"
										formaction="?/increment"
										name={'productId'}
										value={item.productId}><Plus /></Button
									>
									<Button
										type="submit"
										formaction="?/delete"
										variant="destructive"
										name={'orderItemId'}
										value={item.id}><Trash2 /></Button
									>
								</form>
							</div>
						</Card.Content>
					</Card.Root>
				</li>
			{/each}
		{/if}
	</ul>
</div>
