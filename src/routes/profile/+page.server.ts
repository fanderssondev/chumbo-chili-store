import type { Actions, PageServerLoad } from '../$types';
import { setError, superValidate } from "sveltekit-superforms";
import { userInfoFormSchema } from "./userInfoFormSchema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import bcrypt from 'bcrypt';

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if not logged in
  if (!locals.user) {
    redirect(302, '/login');
  }

  return {
    form: await superValidate(zod(userInfoFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(userInfoFormSchema));
    if (!form.valid) {
      return fail(400, {
        inputForm: form,
      });
    }

    const { data: { firstName, lastName, email, password, newPassword } } = form;

    if (!event.locals.user) {
      redirect(302, '/login');
    }

    if (!await bcrypt.compare(password, event.locals.user.passwordHash)) {
      return setError(form, 'password', 'Password is incorrect');
    }

    // Check if change password
    type newDataType = Pick<typeof form.data, "firstName" | "lastName"> & { passwordHash?: string; };

    let newData: newDataType = {
      firstName,
      lastName
    };
    if (newPassword !== '') {
      newData = {
        ...newData,
        passwordHash: await bcrypt.hash(newPassword, 10)
      };
    }

    const user = await prisma.user.update({ where: { email }, data: { ...newData } });

    return {
      form: await superValidate(event.locals.user, zod(userInfoFormSchema))
    };
  },
};