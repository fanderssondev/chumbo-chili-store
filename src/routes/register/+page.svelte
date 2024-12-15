<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { signupSchema, type FormSchema } from './signupSchema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(signupSchema)
	});
	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto flex h-full max-w-xl flex-col rounded-lg border-2 bg-accent">
	<Card.Header class="p-4 lg:pt-8">
		<Card.Title class="mt-2 text-center text-3xl sm:text-4xl md:mb-10 md:mt-6 lg:text-5xl"
			>Create account</Card.Title
		>
	</Card.Header>
	<Card.Content class="flex h-full flex-grow flex-col px-4 pb-10 pt-0 lg:px-20">
		<form method="POST" use:enhance>
			<!-- First name -->
			<Form.Field {form} name="firstName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>First name</Form.Label>
						<Input {...props} bind:value={$formData.firstName} placeholder="First name" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Last name -->
			<Form.Field {form} name="lastName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Last name</Form.Label>
						<Input {...props} bind:value={$formData.lastName} placeholder="Last name" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Email -->
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email address</Form.Label>
						<Input
							{...props}
							bind:value={$formData.email}
							placeholder="email@example.com"
							type="email"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Password -->
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

			<!-- Confirm password -->
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm password</Form.Label>
						<Input
							{...props}
							bind:value={$formData.confirmPassword}
							type="password"
							placeholder="Confirm password"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="my-6 w-full">Create account</Form.Button>
		</form>
		<Separator class="my-4 bg-secondary-foreground" />
		<div class="mb-3">Already have an account?</div>
		<Button href="/login">Login here</Button>
	</Card.Content>
</Card.Root>
