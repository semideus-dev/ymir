import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})