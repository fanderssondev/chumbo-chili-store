<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLLIElement>;
	interface Props { [key: string]: any }

	let { class: className = undefined, children, ...rest }: Props = $props();

	
</script>

<li class={cn("", className)} {...rest}>
	{@render children?.()}
</li>
