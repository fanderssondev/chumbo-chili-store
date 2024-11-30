import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
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
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"], // Point the error at confirmPassword
    }
  );


export type FormSchema = typeof signupSchema;