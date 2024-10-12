import type { LayoutServerLoad } from './$types';


// TODO Implement Cart item load
const numberOfItemsInCart = 3;

export const load: LayoutServerLoad = async () => {
  return {
    numberOfItemsInCart
  };

};