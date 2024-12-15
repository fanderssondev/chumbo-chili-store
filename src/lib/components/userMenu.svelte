<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import { CloudCog, Settings } from 'lucide-svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import type { User } from '@prisma/client';

	// interface Props {
	// 	firstName: string;
	// 	lastName: string;
	// }

	let { ...user }: User = $props();

	const handleLogout = async () => {
		try {
			const response = await fetch('/logout', {
				method: 'POST'
			});

			if (response.ok) {
				// TODO improve redirect
				goto('/');
				invalidateAll();
			} else {
				console.error('Failed to log out');
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};
</script>

<Menubar.Root class="border-0 bg-transparent">
	<Menubar.Menu>
		<Menubar.Trigger class=" hover:cursor-pointer">
			<Avatar.Root>
				<Avatar.Image
					class="rounded-full border-2 border-secondary-foreground"
					src="/avatar-svgrepo-com.svg"
					alt="avatar"
				/>
				<Avatar.Fallback
					class="border-[3px] border-secondary-foreground bg-secondary text-2xl font-extrabold dark:bg-primary-foreground"
					>{user.firstName[0]}{user.lastName[0]}</Avatar.Fallback
				>
			</Avatar.Root>
		</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item class="flex justify-between">
				<a href={`/profile`}>Profile</a>
				<Settings class="text-slate-400 dark:text-slate-700" />
			</Menubar.Item>
			<Menubar.Item>New Window</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Share</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item onclick={handleLogout}>Logout</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
