import { z } from 'zod';

export const userInfoFormSchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().email(),
    password: z
      .string(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      (data.password === "" && data.confirmPassword === "") ||
      (data.password !== "" && data.password === data.confirmPassword),
    {
      message: "Passwords must match or both be empty.",
      path: ["confirmPassword"], // Point the error at confirmPassword
    }
  )
  .superRefine((data, ctx) => {
    if (data.password === "" && data.confirmPassword === "") {
      return; // Allow empty passwords if both are empty
    }

    if (data.password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Minimum length is 6",
      });
    }

    if (!/[A-Z]/.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least one uppercase letter.",
      });
    }

    if (!/[a-z]/.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least one lowercase letter.",
      });
    }

    if (!/\d/.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least one number.",
      });
    }
  });

export type FormSchema = typeof userInfoFormSchema;
