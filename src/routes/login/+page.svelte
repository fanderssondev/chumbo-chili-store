<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { loginSchema, type FormSchema } from './loginSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});
	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto flex h-full max-w-xl flex-col rounded-lg border-2 bg-accent">
	<Card.Header class="p-4 lg:pt-8">
		<Card.Title class="mt-2 text-center text-3xl sm:text-4xl md:mb-10 md:mt-6 lg:text-5xl"
			>Login</Card.Title
		>
	</Card.Header>
	<Card.Content class="flex h-full flex-grow flex-col px-4 pb-10 pt-0 lg:px-20">
		<form method="POST" use:enhance>
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
			<Form.Button class="my-6 w-full">Login</Form.Button>
		</form>
		<Separator class="my-4 bg-secondary-foreground" />
		<div class="mb-3">Don't have an account yet?</div>
		<Button href="/login">Sign up here</Button>
	</Card.Content>
</Card.Root>
