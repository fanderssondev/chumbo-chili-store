<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
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

{#snippet navLinks()}
	<li><a href="/products">Products</a></li>
	<li><a href="/about">About Us</a></li>
	<li><a href="/contact">Contact Us</a></li>
	<li><a href="/github.com">Github</a></li>
{/snippet}

<!-- BUG Not responsive -->
<header class="relative flex max-w-full border-b-2 bg-accent text-secondary-foreground">
	<div class="container grid items-center">
		<!-- <img src="/pinata.svg" alt="Pinyata logo" class="mr-auto size-10" /> -->
		<h1 class="font-montserrat mr-auto text-4xl font-semibold tracking-wider">Chumbo</h1>
		<nav class="col-span-2 col-start-2 inline-block lg:col-start-3">
			<ul class="flex items-center justify-end gap-4">
				{@render navLinks()}
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

<main class="container mt-16 min-h-screen">
	{@render children()}
</main>

<!-- BUG Not responsive -->
<footer class="mt-16 border-t-2 bg-accent pt-6 text-secondary-foreground">
	<div class="container flex justify-center gap-36">
		<div>
			<h4 class="text-lg font-semibold text-muted-foreground">Links</h4>
			<nav class="mb-6">
				<ul>
					{@render navLinks()}
				</ul>
			</nav>
		</div>
		<div class="flex flex-col">
			<p class="self-center">Contact links</p>
			<hr class="mb-4 h-px w-40 self-center border-0 bg-primary" />
			<div class="flex gap-12 self-center">
				<a
					href="https://github.com/fanderssondev/chumbo-chili-store"
					aria-label="Github"
					target="_blank"><iconify-icon icon="lucide:github" class="text-4xl"></iconify-icon></a
				>
				<a
					href="https://www.linkedin.com/in/fredrikanderssondev/"
					aria-label="Linkedin"
					target="_blank"><iconify-icon icon="lucide:linkedin" class="text-4xl"></iconify-icon></a
				>
			</div>
			<p class="mt-auto hidden md:inline-block">
				&copy; {new Date().getFullYear()}
				<a href="https://github.com/fanderssondev">Fredrik Andersson</a> | All Rights Reserved
			</p>
		</div>
	</div>
	<p class="text-center md:hidden">
		&copy; {new Date().getFullYear()}
		<a href="https://github.com/fanderssondev">Fredrik Andersson</a> | All Rights Reserved
	</p>
</footer>

<style>
	iconify-icon {
		display: inline-block;
	}
</style>
