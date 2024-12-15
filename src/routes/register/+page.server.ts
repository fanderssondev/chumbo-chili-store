import type { Actions, PageServerLoad } from '../$types';
import { superValidate } from "sveltekit-superforms";
import { signupSchema } from "./signupSchema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import bcrypt from 'bcrypt';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

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

    const { data: { firstName, lastName, email, password } } = form;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      redirect(302, '/login');
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash: await bcrypt.hash(password, 10),
      }
    });

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    const { passwordHash, createdAt, updatedAt, ...clientUser } = user;

    event.locals.user = clientUser;
    event.locals.session = session;

    // TODO Redirect back to previous page if on site
    if (user && session) {
      setSessionTokenCookie(event, token, session.expiresAt);
      redirect(302, '/');
    }

    return {
      form,
    };
  },
};