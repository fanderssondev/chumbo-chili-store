import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

// TODO Implement loading of dynamic orders
export const load: LayoutServerLoad = async ({ cookies }) => {
  const cartId = cookies.get('cartId');

  // if (cartId) {
  //   const order = await prisma.order.findUnique({
  //     where: {
  //       id: cartId
  //     },
  //     include: {
  //       orderItems: true
  //     }
  //   });

  //   const totalNrInOrder = order?.orderItems.reduce((tot, item) => item.count + tot, 0) ?? 0;

  //   return {
  //     totalNrInOrder
  //   };
  // }

  if (cartId) {
    const totalNrInOrder = await prisma.orderItem.aggregate({
      where: {
        orderId: cartId,
      },
      _sum: {
        count: true,
      },
    });
    return {
      totalNrInOrder: totalNrInOrder._sum.count
    };
  }
  return {
    totalNrInOrder: 0
  };
};