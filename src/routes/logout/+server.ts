import { redirect, type Actions, type RequestHandler } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';


// export const load: PageServerLoad = async () => {
//   // api endpoint only
//   // TODO Improve redirect  
//   redirect(302, '/');
// };

// export const actions: Actions = {
//   default(event) {
//     if (event.locals.session) {
//       invalidateSession(event.locals.session.id);
//     }

//     deleteSessionTokenCookie(event);

//     console.log('sgsgsfahgagherahrewah');

//     event.locals.user = null;
//     event.locals.session = null;

//     // TODO Improve redirect
//     redirect(302, '/');
//   }
// };

export const POST: RequestHandler = async (event) => {
  if (event.locals.session) {
    invalidateSession(event.locals.session.id);
  }

  deleteSessionTokenCookie(event);

  console.log('sgsgsfahgagherahrewah');

  event.locals.user = null;
  event.locals.session = null;

  // TODO Improve redirect
  redirect(302, '/');
};