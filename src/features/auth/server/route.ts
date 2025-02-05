import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "@/features/auth/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { AUTH_COOKIE_PREFIX } from "@/features/auth/constants";

const app = new Hono()
  .post("/signin", zValidator("json", signInSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE_PREFIX, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/signup", zValidator("json", signUpSchema), async (c) => {
    const { username, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, username);
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE_PREFIX, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/signout", (c) => {
    deleteCookie(c, AUTH_COOKIE_PREFIX);

    return c.json({ success: true });
  });

export default app;
