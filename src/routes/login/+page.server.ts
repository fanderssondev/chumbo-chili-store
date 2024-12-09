import type { Actions, PageServerLoad } from '../$types';
import { setError, superValidate } from "sveltekit-superforms";
import { loginSchema } from "./loginSchema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import bcrypt from 'bcrypt';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginSchema)),
  };
};

// 
// 

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { data: { email, password } } = form;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user === null) {
      return setError(form, 'email', 'Email does not exist');
    }

    if (!await bcrypt.compare(password, user.passwordHash)) {
      return setError(form, 'password', 'Password is incorrect');
    }

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    event.locals.user = user;
    event.locals.session = session;

    if (user && session) {
      setSessionTokenCookie(event, token, session.expiresAt);
      // TODO Redirect back to previous page if on site
      redirect(302, '/');
    }

    return {
      form,
    };
  },
};