import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./mailer";
import { ENV } from "@repo/database/config";
import { prisma } from "@repo/database";

export const auth = betterAuth({
  baseURL: ENV.better_auth_url!,
  trustedOrigins: [ENV.better_auth_url!],
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
      clientId: ENV.google_client_id!,
      clientSecret: ENV.google_client_secret!,
    },
    github: {
      clientId: ENV.github_client_id!,
      clientSecret: ENV.github_client_secret!,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  secret: ENV.better_auth_secret!,
  advanced: {
    cookiePrefix: "file_forge",
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
      },
      banned: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
});
