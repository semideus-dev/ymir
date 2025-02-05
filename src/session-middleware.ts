import "server-only";

import { createMiddleware } from "hono/factory";
import { createAdminClient } from "@/lib/appwrite";
import { AUTH_COOKIE_PREFIX } from "@/features/auth/constants";

import {
  Account,
  Databases,
  Storage,
  Client,
  Models,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageTypes,
  type Users as UsersType,
} from "node-appwrite";
import { getCookie } from "hono/cookie";

type AdditionalContext = {
    Variables: {
        account: AccountType;
        databases: DatabasesType;
        storage: StorageTypes;
        users: UsersType;
        user: Models.User<Models.Preferences>;
    }
}

export const sessionMiddleware = createMiddleware<AdditionalContext>(async (c, next) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const session = getCookie(c, AUTH_COOKIE_PREFIX);

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  client.setSession(session);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const user = await account.get();

  c.set("account", account);
  c.set("databases", databases);
  c.set("storage", storage);
  c.set("user", user);

  await next();
});
