<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { userInfoFormSchema } from './userInfoFormSchema';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import SuperDebug from 'sveltekit-superforms';

	let { data: pageData } = $props();

	// BUG Form doesn't save state on submit. Should save firstName, lastName and email
	const form = superForm(pageData.form, {
		validators: zodClient(userInfoFormSchema)
	});
	const { form: formData, enhance } = form;

	if (pageData.user) {
		$formData = {
			...$formData,
			email: pageData.user.email,
			firstName: pageData.user.firstName,
			lastName: pageData.user.lastName
		};
	}
</script>

<Tabs.Root value="user">
	<Tabs.List>
		<Tabs.Trigger value="user">User information</Tabs.Trigger>
		<Tabs.Trigger value="password">Password</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="user">
		<div class="flex justify-between gap-4">
			<div class="w-1/3">
				<SuperDebug data={$formData} />
				<p class="mt-8">$formData</p>
				<pre>
					{JSON.stringify($formData, null, 2)}
				</pre>
			</div>
			{@render userInfoForm()}
		</div>
	</Tabs.Content>
	<Tabs.Content value="password">Change your password here.</Tabs.Content>
</Tabs.Root>

<div class="mt-4">
	<SuperDebug data={$formData} />
</div>

{#snippet userInfoForm()}
	<Card.Root class="flex h-full w-full flex-col rounded-lg border-2 bg-accent">
		<Card.Header class="p-4 lg:pt-8">
			<Card.Title class="mt-2 text-center text-3xl sm:text-4xl md:mb-10 md:mt-6 lg:text-5xl"
				>Account information</Card.Title
			>
		</Card.Header>
		<Card.Content class="flex h-full flex-grow flex-col px-4 pb-10 pt-0 lg:px-20">
			<form method="POST" use:enhance>
				<!-- firstName -->
				<Form.Field {form} name="firstName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>First name</Form.Label>
							<Input {...props} bind:value={$formData.firstName} placeholder="First name" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- lastName -->
				<Form.Field {form} name="lastName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Last name</Form.Label>
							<Input {...props} bind:value={$formData.lastName} placeholder="Last name" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- email -->
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email address</Form.Label>
							<Input {...props} bind:value={$formData.email} type="email" readonly />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- password -->
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input
								{...props}
								bind:value={$formData.password}
								type="password"
								placeholder="Enter password"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Separator class="my-6 h-[2px]" />
				<h3 class="text-lg">Change password</h3>
				<p class="mb-4 text-muted-foreground">
					Leave blank if you don't wish to change the password
				</p>

				<!-- newPassword -->
				<Form.Field {form} name="newPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>New password</Form.Label>
							<Input
								{...props}
								bind:value={$formData.newPassword}
								type="password"
								placeholder="Enter new password"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- confirmNewPassword -->
				<Form.Field {form} name="confirmNewPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm new password</Form.Label>
							<Input
								{...props}
								bind:value={$formData.confirmNewPassword}
								type="password"
								placeholder="Confirm new password"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button class="my-6 w-full">Save</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
{/snippet}
