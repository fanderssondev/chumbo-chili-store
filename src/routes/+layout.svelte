<script lang="ts">
	import '../app.css';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { Button } from '$lib/components/ui/button';
	import { useTheme } from '$lib/stores/useTheme.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	const { data, children } = $props();

	let theme = useTheme();

	$effect(() => {
		theme.darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	});
</script>

<svelte:head>
	<title>Chumbo Chili Store</title>
</svelte:head>

{#snippet navLinks()}
	<li><a class="hover:underline" href="/products">Products</a></li>
	<li><a class="hover:underline" href="/about">About Us</a></li>
	<li><a class="hover:underline" href="/contact">Contact Us</a></li>
	<li>
		<a
			class="hover:underline"
			href="https://github.com/fanderssondev/chumbo-chili-store"
			target="_blank">Github</a
		>
	</li>
{/snippet}

{#snippet hamburgerMenu()}
	<Sheet.Root>
		<Sheet.Trigger>
			<Button variant="ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-menu"
				>
					<line x1="4" x2="20" y1="12" y2="12" />
					<line x1="4" x2="20" y1="6" y2="6" />
					<line x1="4" x2="20" y1="18" y2="18" />
				</svg>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content>
			<Sheet.Header>
				<div>
					<img class="size-8 md:size-12" src="/chumbo-logo.svg" alt="logo" />
					<h1 class="font-dosis text-2xl font-bold tracking-wide text-orange-500 md:text-5xl">
						Chumbo
					</h1>
				</div>
			</Sheet.Header>
			<nav>
				<ul>
					{@render navLinks()}
				</ul>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
{/snippet}

{#snippet headerButtonSection()}
	<Button variant="link" size="icon" class="relative size-14 rounded-full hover:bg-primary/10">
		<a href="/cart">
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
				>
			</svg>
			{#if data.numberOfItemsInCart > 0}
				<div class="absolute right-0 top-1 size-5 rounded-full bg-orange-500 dark:bg-orange-600">
					{data.numberOfItemsInCart}
				</div>
			{/if}
		</a>
	</Button>
	<Button variant="default">Sign in</Button>
	<Button
		on:click={theme.toggleDarkmode}
		variant="outline"
		size="icon"
		class="rounded-full border-none bg-transparent hover:bg-primary/10"
	>
		<Sun class="size-6 rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
		<Moon
			class="dark:rotate-270 absolute size-6 -rotate-90 scale-100 transition-all dark:scale-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
{/snippet}

<header class="border-b-2 bg-accent text-secondary-foreground">
	<div class="container flex items-center justify-between py-1 pl-4 pr-0 md:px-8">
		<a href="/" class="flex items-center gap-2">
			<img class="size-8 md:size-12" src="/chumbo-logo.svg" alt="logo" />
			<h1 class="font-dosis text-2xl font-bold tracking-wide text-orange-500 md:text-5xl">
				Chumbo
			</h1>
		</a>
		<div class="md:hidden">
			{@render hamburgerMenu()}
		</div>
		<div class="hidden items-center gap-8 md:flex">
			{@render headerButtonSection()}
		</div>
	</div>
</header>

<main class=" my-8 min-h-screen px-4 md:container lg:my-16">
	{@render children()}
</main>

<footer class="border-t-2 bg-accent pt-6">
	<div class="flex justify-center gap-16 px-4 md:container md:gap-36">
		<div>
			<h4 class="text-lg font-semibold text-muted-foreground">Links</h4>
			<nav class="mb-6">
				<ul>
					{@render navLinks()}
				</ul>
			</nav>
		</div>
		<div class="flex flex-col">
			<p class="self-center text-xl text-muted-foreground">Contact links</p>
			<Separator class="mx-auto my-3 w-48 bg-secondary-foreground" />
			<div class="flex gap-12 self-center">
				<a
					href="https://github.com/fanderssondev/chumbo-chili-store"
					aria-label="Github"
					target="_blank"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-github"
						><path
							d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
						/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
					></a
				>
				<a
					href="https://www.linkedin.com/in/fredrikanderssondev/"
					aria-label="Linkedin"
					target="_blank"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-linkedin"
						><path
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						/><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg
					></a
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
