import type { PageServerLoad } from './$types';
import { prisma } from '$lib/db/prisma';
import { storedCart } from '$lib/stores/useLocalStorageCart.svelte';

export const load: PageServerLoad = async ({ depends }) => {

  const products = await prisma.product.findMany({
    where: {
      id: { in: storedCart.getAllIds }
    }
  });

  depends('storedCart');
  console.log(storedCart.getAllIds);

  return {
    products
  };
};
