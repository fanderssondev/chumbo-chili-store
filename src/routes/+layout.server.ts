import type { LayoutServerLoad } from './$types';
import { storedCart } from '$lib/stores/useLocalStorageCart.svelte';

export const load: LayoutServerLoad = async () => {
  let { nrOfItems } = storedCart();

  return {
    nrOfItems
  };
};