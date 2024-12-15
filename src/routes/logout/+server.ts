import { redirect, type RequestHandler } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';

export const POST: RequestHandler = async (event) => {
  if (event.locals.session) {
    invalidateSession(event.locals.session.id);
  }

  deleteSessionTokenCookie(event);

  event.locals.user = null;
  event.locals.session = null;

  // TODO Improve redirect
  redirect(302, '/');
};