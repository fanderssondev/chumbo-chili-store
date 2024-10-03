export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency', currency: 'EUR'
  }).format(value);
};