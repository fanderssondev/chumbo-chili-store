import { browser } from '$app/environment';

export const getCartId = () => {
  if (browser) {
    return localStorage.getItem('cartId');
  }
  return '204404a5-1d5f-4566-ac3f-54357cd5c022';
};

