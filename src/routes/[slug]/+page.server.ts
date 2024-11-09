import type { Actions, PageServerLoad } from './$types';
import type { Order } from '@prisma/client';

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
				sku: true,
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

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const productId = data.get('productId') as string;

		// cookies.delete('cartId', { path: '/' });
		let cartId = cookies.get('cartId');
		console.log(cartId);
		let order: Order | undefined;


		if (!cartId) {
			console.log('creating order');
			order = await prisma.order.create({
				data: {

				}
			});
			cartId = order.id;
			cookies.set('cartId', order.id, { path: '/' });
		}



		order = await prisma.order.upsert({
			where: {
				id: cartId
			},
			update: {
				orderItems: {
					upsert: {
						where: {
							productId
						},
						update: {
							count: {
								increment: 1
							}
						},
						create: {
							productId
						}
					}
				}
			},
			create: {
				// TODO Implement create new order
				orderItems: {
					create: {
						productId
					}
				}
			}
		});
	}
};