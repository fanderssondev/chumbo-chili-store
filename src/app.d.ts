// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User, Session } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
