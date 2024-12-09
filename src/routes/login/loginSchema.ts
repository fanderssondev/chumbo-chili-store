import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Minimum lenght is 6" })
      .refine(
        (val) => /[A-Z]/.test(val),
        { message: "Password must contain at least one uppercase letter." }
      )
      .refine(
        (val) => /[a-z]/.test(val),
        { message: "Password must contain at least one lowercase letter." }
      )
      .refine(
        (val) => /\d/.test(val),
        { message: "Password must contain at least one number." }
      ),
  });


export type FormSchema = typeof loginSchema;