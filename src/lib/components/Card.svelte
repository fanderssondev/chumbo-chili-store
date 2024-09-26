<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface Props {
		title: string;
		price: number;
		Description: {
			description_short: string;
		};
		Picture: {
			smallPic: string;
			largePics: string[];
		};
	}

	let { ...props }: Props = $props();
</script>

<Card.Root class="flex flex-col rounded-lg border-2 bg-gray-100 dark:bg-gray-800">
	<Card.Header class="p-0">
		<img src="/pics/lg_pics/{props.Picture.largePics[0]}" alt="product" />
	</Card.Header>
	<Card.Content class="mt-2 flex h-full flex-grow flex-col p-1">
		<Card.Title class="mb-2">{props.title}</Card.Title>
		<p class="flex-grow">{props.Description.description_short}</p>
		<p class="self-end">{props.price}&#8364</p>
	</Card.Content>
</Card.Root>
