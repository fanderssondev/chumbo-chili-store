import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
  const cartId = cookies.get('cartId');

  let totalNrInOrder;

  if (cartId) {
    totalNrInOrder = await prisma.orderItem.aggregate({
      where: {
        orderId: cartId,
      },
      _sum: {
        count: true,
      },
    });
    // return {
    //   totalNrInOrder: totalNrInOrder._sum.count
    // };
  }
  return {
    totalNrInOrder: totalNrInOrder?._sum.count ?? 0,
    user: locals.user,
    session: locals.session
  };
};