import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const resetPasswordSchema = z
  .object({
    code: z.string().min(1).max(10),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
