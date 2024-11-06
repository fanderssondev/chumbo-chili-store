import { browser } from '$app/environment';

export const getCartId = () => {
  let cartId;

  if (browser) {
    cartId = localStorage.getItem('cartId');
  }



  return '2fff2af4-df53-481a-bdd8-fa582c90249f';
};

