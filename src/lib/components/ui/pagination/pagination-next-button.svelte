<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = PaginationPrimitive.NextButtonProps;
	type $$Events = PaginationPrimitive.NextButtonEvents;

	interface Props { [key: string]: any }

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<PaginationPrimitive.NextButton asChild let:builder>
	<Button
		variant="ghost"
		class={cn("gap-1 pr-2.5", className)}
		builders={[builder]}
		on:click
		{...rest}
	>
		{#if children}{@render children()}{:else}
			<span>Next</span>
			<ChevronRight class="h-4 w-4" />
		{/if}
	</Button>
</PaginationPrimitive.NextButton>
