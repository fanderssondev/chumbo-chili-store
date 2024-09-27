<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface Props {
		title: string;
		price: number;
		pictures: string[];
		Description: {
			description_short: string;
		};
	}

	let { ...props }: Props = $props();
</script>

<Card.Root class="flex flex-col rounded-lg border-2 bg-accent">
	<Card.Header class="grid justify-center p-0">
		<img src="/productPics/{props.pictures[0]}" class="size-48" alt="product" />
	</Card.Header>
	<Card.Content class="mt-6 flex h-full flex-grow flex-col p-4">
		<Card.Title class="mb-2">{props.title}</Card.Title>
		<p class="flex-grow">{props.Description.description_short}</p>
		<p class="mt-4 self-end">{props.price.toFixed(2)}&#8364</p>
	</Card.Content>
</Card.Root>
