import type { Actions, PageServerLoad } from '../$types';
import { superValidate } from "sveltekit-superforms";
import { userInfoFormSchema } from "./userInfoFormSchema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import bcrypt from 'bcrypt';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import type { User } from '@prisma/client';

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
        form,
      });
    }

    const { data: { firstName, lastName, email, password } } = form;

    type newDataType = Pick<typeof form.data, "firstName" | "lastName"> & { passwordHash?: string; };

    let newData: newDataType = {
      firstName,
      lastName
    };
    if (password !== '') {
      newData = {
        ...newData,
        passwordHash: await bcrypt.hash(password, 10)
      };
    }

    const user = await prisma.user.update({
      where: {
        email
      },
      data: {
        ...newData
      }
    });


    // const token = generateSessionToken();
    // const session = await createSession(token, user.id);

    // event.locals.user = user;
    // event.locals.session = session;

    // TODO Redirect back to previous page if on site
    // if (user && session) {
    //   setSessionTokenCookie(event, token, session.expiresAt);
    // }

    return {
      form,
    };
  },
};