import type { Actions, PageServerLoad } from '../$types';
import { superValidate } from "sveltekit-superforms";
import { signupSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(signupSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(signupSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    console.log(form);

    return {
      form,
    };
  },
};