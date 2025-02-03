import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema } from "@/features/auth/schemas";

const app = new Hono().post(
  "/signin",
  zValidator("json", signInSchema),
  (c) => {
    const { email, password } = c.req.valid("json");

    return c.json({ email, password });
  }
);

export default app;
