<script lang="ts">
	import '../app.css';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { Button } from '$lib/components/ui/button';
	import { useTheme } from '$lib/stores/useTheme.svelte';

	const { children } = $props();

	let theme = useTheme();

	$effect(() => {
		theme.darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	});
</script>

<!-- BUG Container not aligned -->
<header class="relative flex max-w-full border-b-2 bg-accent text-secondary-foreground">
	<div class="container grid items-center">
		<!-- <img src="/pinata.svg" alt="Pinyata logo" class="mr-auto size-10" /> -->
		<h1
			class="font-montserrat mr-auto hidden text-4xl font-semibold tracking-wider lg:inline-block"
		>
			Chumbo
		</h1>
		<nav class="col-span-2 col-start-2 inline-block lg:col-start-3">
			<ul class="flex items-center justify-end gap-4">
				<li><a href="/products">Products</a></li>
				<li><a href="/about">About Us</a></li>
				<li><a href="/contact">Contact Us</a></li>
				<li><a href="/github.com">Github</a></li>
			</ul>
		</nav>
	</div>
	<Button
		on:click={theme.toggleDarkmode}
		variant="outline"
		size="icon"
		class="absolute right-2 top-[0.1rem] rounded-full border-none bg-transparent hover:bg-secondary"
	>
		<Sun class="size-[1.5rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
		<Moon
			class="dark:rotate-270 absolute size-[1.5rem] -rotate-90 scale-100 transition-all dark:scale-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</header>

<main class="container min-h-screen">
	{@render children()}
</main>

<!-- TODO Implement footer -->
<footer class="mt-16 flex max-w-full border-b-2 bg-accent text-secondary-foreground">
	gojdgnoj
</footer>
