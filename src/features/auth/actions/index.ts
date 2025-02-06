import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE_PREFIX } from "@/features/auth/constants";

export async function getCurrent() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_PREFIX);

    if (!session) {
      return null;
    }

    client.setSession(session.value);

    const account = new Account(client);

    return await account.get();
  } catch {
    return null;
  }
}
