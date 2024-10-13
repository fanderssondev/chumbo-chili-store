import { browser } from '$app/environment';
import type { OrderItem } from '@prisma/client';

type CartItem = Pick<OrderItem, 'id' | 'count'>;

export const storedCart = () => {
  let cart = $state<CartItem[]>([
    { id: '0314e67a-2eca-4796-964a-2d806fd0edf5', count: 1 },
    { id: '052839ec-27c2-4ee8-839c-e2f7ab99b818', count: 1 },
    { id: '780e6f81-1f09-4fe1-b57a-7712f4ce6560', count: 4 },
    { id: '932fc437-8749-43c0-b02e-b859c9bfe89e', count: 3 },
    { id: 'd8456cc6-f4ed-40b6-ab83-74052f1d4f87', count: 2 },
  ]);

  const incrementItem = (id: string) => {
    const item = cart.find((c) => c.id == id);
    if (item) {
      item.count++;
    }
  };

  const decrementItem = (id: string) => {
    const item = cart.find((c) => c.id == id);
    if (item) {
      item.count--;
    }
  };

  const getNrOfItems = () => {
    return cart.reduce((total, item) => item.count + total, 0) ?? 0;
  };

  return {
    cart,
    incrementItem,
    decrementItem,
    getNrOfItems
  };
}



