<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	let { data } = $props();
</script>

<Card.Root class="flex h-full flex-col rounded-lg border-2 bg-accent">
	<Card.Header class="p-4 pb-12 lg:p-20 lg:pt-8">
		<Card.Title class="mb-4 mt-2 text-center text-3xl sm:text-4xl md:mb-10 md:mt-6 lg:text-5xl"
			>Login</Card.Title
		>
		<div class="grid gap-12 sm:grid-cols-[1fr_auto]">
			<div></div>
		</div>
		<h3 class="pt-16 text-xl font-bold"></h3>
	</Card.Header>
	<Card.Content class="flex h-full flex-grow flex-col px-4 pb-10 pt-0 lg:px-20"></Card.Content>
</Card.Root>
