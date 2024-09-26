<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	let { data } = $props();
</script>

<!-- <pre>
  {JSON.stringify(data.products, null, 2)}
</pre> -->
<div class="mt-8 grid grid-cols-4 gap-4">
	{#each data.products as product}
		<Card {...product} />
	{/each}
</div>
