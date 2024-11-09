import { browser } from '$app/environment';

export const getCartId = () => {
  let cartId;

  if (browser) {
    cartId = localStorage.getItem('cartId');
  }



  return 'a4bdfc98-c0ce-4da7-92b3-691a45421121';
};

