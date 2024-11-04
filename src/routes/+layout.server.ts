import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

import { getCartId } from '$lib/stores/useLocalStorageCart.svelte';


// TODO Implement loading of dynamic orders
export const load: LayoutServerLoad = async () => {
  const cartId = getCartId();

  if (cartId) {
    const order = await prisma.order.findUnique({
      where: {
        id: cartId
      },
      include: {
        orderItems: true
      }
    });

    const totalNrInOrder = order?.orderItems.reduce((tot, item) => item.count + tot, 0) ?? 0;

    return {
      totalNrInOrder
    };
  }
};