import type { LayoutServerLoad } from './$types';
import { storedCart } from '$lib/stores/useLocalStorage.svelte';


export const load: LayoutServerLoad = async () => {
  const { getNrOfItems } = storedCart();

  return {
    getNrOfItems
  };

};