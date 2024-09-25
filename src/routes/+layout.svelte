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

<Button
	on:click={theme.toggleDarkmode}
	variant="outline"
	size="icon"
	class="absolute right-5 top-3 rounded-full border-none bg-slate-600 hover:bg-slate-500"
>
	<Sun
		class="h-[1.5rem] w-[1.5rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100"
	/>
	<Moon
		class="dark:rotate-270 absolute h-[1.5rem] w-[1.5rem] -rotate-90 scale-100 transition-all dark:scale-0"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>

<header class="max-w-full bg-slate-600 py-3 dark:bg-slate-800">
	<div class="lg:grid-cols-header container grid items-center">
		<img src="/pinata.svg" alt="Pinyata logo" class="mr-auto size-10" />
		<h1
			class="font-montserrat mr-auto hidden text-4xl font-semibold tracking-wider lg:inline-block"
		>
			Pinyata Store
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
</header>

<main class="container min-h-screen">
	{@render children()}
</main>
