<script lang="ts">
	import Card from './Card.svelte';

	let { data } = $props();
</script>

<!-- <pre>
  {JSON.stringify(data.products, null, 2)}
</pre> -->

{#if data.products}
	<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each data.products as product}
			<Card {...product} />
		{/each}
	</div>
{/if}
