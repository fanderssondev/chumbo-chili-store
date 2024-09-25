import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async () => {
	const products = await prisma.product.findMany();

	return {
		products
	};
};

export type ProductsType = Awaited<ReturnType<typeof load>>;
