import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./mailer";
import { prisma } from "@repo/database";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    resetPasswordTokenExpiresIn: 60 * 60,

    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your File Forge password",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Password Reset Request</h2>
            <p>Hello ${user.email},</p>
            <p>Click the button below to reset your password:</p>
            <p>
              <a href="${url}"
                 style="
                   display:inline-block;
                   padding:10px 16px;
                   background:#f97316;
                   color:#fff;
                   border-radius:6px;
                   text-decoration:none;
                 ">
                Reset Password
              </a>
            </p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn’t request this, you can safely ignore this email.</p>
          </div>
        `,
        text: `Reset your password using this link: ${url}`,
      });
    },

    onPasswordReset: async ({ user }) => {
      console.log(`Password reset successful for ${user.email}`);
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  advanced: {
    cookiePrefix: "file_forge",
  },
});
