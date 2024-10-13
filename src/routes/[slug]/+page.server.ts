import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async ({ params }) => {
	return {
		product: await prisma.product.findUnique({
			where: {
				slug: params.slug
			},
			select: {
				id: true,
				title: true,
				price: true,
				pictures: true,
				slug: true,
				Description: {
					select: {
						description_short: true,
						description_long: true
					}
				},
				ProductDetails: {
					select: {
						category: true,
						manufacturer: true,
						hotness: true,
						weight: true,
						Rating: {
							select: {
								average: true,
								nr_of_reviews: true
							}
						}
					}
				}
			}
		})
	};
};
