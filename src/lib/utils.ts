import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const currencyFormatter = (value: number) => {
	return new Intl.NumberFormat(undefined, {
		style: 'currency', currency: 'EUR'
	}).format(value);
};