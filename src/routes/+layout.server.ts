import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cartId = cookies.get('cartId');

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