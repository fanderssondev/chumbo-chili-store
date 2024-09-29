import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async ({ params }) => {
	return {
		product: await prisma.product.findUnique({
			where: {
				slug: params.slug
			},
			select: {
				title: true,
				price: true,
				pictures: true,
				slug: true,
				url: true,
				Description: {
					select: {
						description_short: true,
						description_long: true
					}
				},
				ProductDetail: {
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
