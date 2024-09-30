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
<header class="flex border-b-2 bg-accent p-2 text-secondary-foreground">
	<div class="flex-1"></div>
	<div class="container mx-auto flex items-center justify-between">
		<!-- <img src="/pinata.svg" alt="Pinyata logo" class="mr-auto size-10" /> -->
		<h1 class="font-montserrat mr-auto text-4xl font-semibold tracking-wider">Chumbo</h1>
		<nav class="col-span-2 col-start-2 inline-block lg:col-start-3">
			<ul class="flex items-center justify-end gap-4">
				{@render navLinks()}
			</ul>
		</nav>
	</div>
	<div class="flex flex-1 items-center justify-end gap-8">
		<Button variant="default">Sign in</Button>
		<svg class="size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><g
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path
					d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
				/></g
			></svg
		>
		<Button
			on:click={theme.toggleDarkmode}
			variant="outline"
			size="icon"
			class="rounded-full border-none bg-transparent hover:bg-secondary"
		>
			<Sun class="size-6 rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
			<Moon
				class="dark:rotate-270 absolute size-6 -rotate-90 scale-100 transition-all dark:scale-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
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
		width: 2rem;
		height: 2rem;
	}
</style>
