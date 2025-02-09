import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "@/features/auth/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { AUTH_COOKIE_PREFIX } from "@/features/auth/constants";
import { sessionMiddleware } from "@/session-middleware";

const app = new Hono()
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user");
    return c.json({ data: user });
  })

  .post("/signin", zValidator("json", signInSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    try {
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE_PREFIX, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ success: true });
    } catch (e: any) {
      return c.json({ message: e.message || "Invalid credentials" }, 400);
    }
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

  .post("/signout", sessionMiddleware, async (c) => {
    deleteCookie(c, AUTH_COOKIE_PREFIX);

    const account = c.get("account");
    await account.deleteSession("current");

    return c.json({ success: true });
  });

export default app;
