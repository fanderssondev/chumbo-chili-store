import { z } from 'zod';

export const userInfoFormSchema = z
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
    newPassword: z
      .string(),
    confirmNewPassword: z.string(),
  })
  .refine(
    (data) =>
      (data.newPassword === "" && data.confirmNewPassword === "") ||
      (data.newPassword !== "" && data.newPassword === data.confirmNewPassword),
    {
      message: "Passwords must match or both be empty.",
      path: ["confirmPassword"], // Point the error at confirmPassword
    }
  )
  .superRefine((data, ctx) => {
    if (data.newPassword === "" && data.confirmNewPassword === "") {
      return; // Allow empty passwords if both are empty
    }

    if (data.newPassword.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Minimum length is 6",
      });
    }

    if (!/[A-Z]/.test(data.newPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least one uppercase letter.",
      });
    }

    if (!/[a-z]/.test(data.newPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least one lowercase letter.",
      });
    }

    if (!/\d/.test(data.newPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least one number.",
      });
    }
  });

export type FormSchema = typeof userInfoFormSchema;
