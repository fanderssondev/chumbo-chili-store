<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { currencyFormatter } from '$lib/utils';

	interface Props {
		title: string;
		slug: string;
		price: number;
		pictures: string[];
		Description: {
			description_short: string;
		};
	}

	let { ...props }: Props = $props();
</script>

<a href="/{props.slug}">
	<Card.Root class="flex h-full flex-col rounded-lg border-2 bg-accent">
		<Card.Header class="grid justify-center p-0">
			<img src="/productPics/{props.pictures[0]}" class="size-48" alt="product" />
		</Card.Header>
		<Card.Content class="mt-6 flex h-full flex-grow flex-col p-4">
			<Card.Title class="mb-2 text-lg">{props.title}</Card.Title>
			<p class="flex-grow">{props.Description.description_short}</p>
			<p class="mt-4 self-end">{currencyFormatter(props.price)}</p>
		</Card.Content>
	</Card.Root>
</a>
