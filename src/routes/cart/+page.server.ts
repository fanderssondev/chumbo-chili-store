import type { Actions, PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

import { getCartId } from '$lib/stores/useLocalStorageCart.svelte';

const cartId = getCartId();

export const load: PageServerLoad = async () => {


  if (cartId) {
    const order = await prisma.order.findUnique({
      where: {
        id: cartId
      },
      include: {
        orderItems: {
          include: {
            product: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    });

    return {
      order
    };
  }

};

export const actions: Actions = {
  decrement: async ({ request }) => {
    const data = await request.formData();
    const productId = data.get('productId') as string;

    // BUG Doesn't delete when count hits zero, can get negative value
    const order = await prisma.order.update({
      where: {
        id: cartId
      },
      data: {
        orderItems: {
          update: {
            where: {
              productId
            },
            data: {
              count: {
                decrement: 1
              }
            }
          }
        }
      }
    });

    console.log(order);
  },
  increment: async ({ request }) => {
    const data = await request.formData();
    const productId = data.get('productId') as string;

    await prisma.order.update({
      where: {
        id: cartId
      },
      data: {
        orderItems: {
          update: {
            where: {
              productId
            },
            data: {
              count: {
                increment: 1
              }
            }
          }
        }
      }
    });
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const orderItemId = data.get('orderItemId') as string;

    await prisma.order.update({
      where: {
        id: cartId
      },
      data: {
        orderItems: {
          delete: {
            id: orderItemId
          }
        }
      }
    });
  }
};
