// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User, Session } from '@prisma/client';
import type { ClientUser } from '$lib/types';



declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | ClientUser | null;
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
