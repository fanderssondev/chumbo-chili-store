import type { PageServerLoad } from './$types';
import { storedCart } from '$lib/stores/useLocalStorage.svelte';

import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async () => {
  const { cart } = storedCart();

  const cartItemIds = cart.map((item) => item.id);

  const cartItems = await prisma.product.findMany({
    where: {
      id: {
        in: cartItemIds
      }
    }
  });

  // const cartItems = result.map((item) => {
  //   return {
  //     ...item,
  //     count: cart.find((c) => c.id === item.id)?.count ?? 0
  //   };
  // });

  return {
    cart,
    cartItems
  };
};
