import { error } from "@sveltejs/kit";
import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie
} from "$lib/server/session";
import { prisma } from '$lib/db/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// NOTE Not implemented
	// const token = event.cookies.get("session") ?? null;
	// if (token === null) {
	// 	return error(401, 'No token');
	// }

	// const { session, user } = await validateSessionToken(token);
	// if (session === null) {
	// 	deleteSessionTokenCookie(event);
	// 	return error(401, 'No session');
	// }
	// setSessionTokenCookie(event, token, session.expiresAt);



	return {
		products: await prisma.product.findMany({
			select: {
				title: true,
				price: true,
				pictures: true,
				slug: true,
				Description: {
					select: {
						description_short: true
					}
				}
			},
			orderBy: {
				title: 'asc'
			}
		})
	};
};
