import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async () => {
	return {
		products: await prisma.product.findMany({
			include: {
				Picture: true,
				Description: true,
				ProductDetail: true
			}
		})
	};
};
