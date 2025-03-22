import { db } from "@/lib/db";

import { sendEmail } from "@/features/auth/actions";

import { openAPI } from "better-auth/plugins";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  plugins: [openAPI()],
  user: {
    additionalFields: {
      plan: {
        type: "string",
        defaultValue: "FREE",
      },
      projects: {
        type: "string[]",
      },
      invites: {
        type: "string[]",
      },
      ownedProjects: {
        type: "string[]",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.BETTER_AUTH_EMAIL_VERIFICATION_CALLBACK_URL}`;

      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: verificationUrl,
      });
    },
  },
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
