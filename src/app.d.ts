// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
