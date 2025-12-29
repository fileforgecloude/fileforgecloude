import { createAuthClient } from "better-auth/react";
import { ENV } from "@repo/database/config";

// Create the auth client instance with proper baseURL
export const authClient = createAuthClient({
  baseURL: ENV.better_auth_url!,
});

// Export the methods from the SAME configured instance
export const { signIn, signUp, useSession, signOut } = authClient;
