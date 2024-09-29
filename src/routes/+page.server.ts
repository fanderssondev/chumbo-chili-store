import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async () => {
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
			}
		})
	};
};
