import type { Actions, PageServerLoad } from './$types';

import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
  const cartId = cookies.get('cartId');

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
  decrement: async ({ request, cookies }) => {
    const data = await request.formData();
    const productId = data.get('productId') as string;

    const cartId = cookies.get('cartId');

    const res = await prisma.$transaction([
      prisma.order.update({
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
      }),
      prisma.orderItem.deleteMany({
        where: {
          orderId: cartId,
          productId: productId,
          count: {
            lte: 0
          }
        }
      }),
      prisma.order.deleteMany({
        where: {
          id: cartId,
          orderItems: {
            none: {} // Checks if there are no order items left in the order
          }
        },
      })
    ]);
    if (res[2].count > 0) {
      cookies.delete('cartId', { path: '/' });
    }
  },
  increment: async ({ request, cookies }) => {
    const data = await request.formData();
    const productId = data.get('productId') as string;

    await prisma.order.update({
      where: {
        id: cookies.get('cartId')
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
  delete: async ({ request, cookies }) => {
    const data = await request.formData();
    const orderItemId = data.get('orderItemId') as string;

    const cartId = cookies.get('cartId');

    const res = await prisma.$transaction([
      prisma.order.update({
        where: {
          id: cartId,
        },
        data: {
          orderItems: {
            delete: {
              id: orderItemId
            }
          }
        }
      }),
      prisma.order.deleteMany({
        where: {
          id: cartId,
          orderItems: {
            none: {} // Checks if there are no order items left in the order
          }
        },
      })
    ]);
    if (res[1].count > 0) {
      cookies.delete('cartId', { path: '/' });
    }
  }
};
