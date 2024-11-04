import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

import { getCartId } from '$lib/stores/useLocalStorageCart.svelte';

export const load: PageServerLoad = async () => {

  const cartId = getCartId();

  if (cartId) {
    const order = await prisma.order.findUnique({
      where: {
        id: cartId
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    return {
      order
    };
  }

};
