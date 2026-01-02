if (typeof window === "undefined") {
  require("dotenv").config({ path: "../../.env.local" });
}

export const ENV = {
  databaseUrl: process.env.DATABASE_URL,
  directURL: process.env.DIRECT_URL,
  node_env: process.env.NODE_ENV,
  server_url: process.env.SERVER_URL,
  server_port: process.env.SERVER_PORT,
  better_auth_url: process.env.BETTER_AUTH_URL,
  better_auth_secret: process.env.BETTER_AUTH_SECRET,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  supabase_url: process.env.SUPABASE_URL,
  supabase_anon_key: process.env.SUPABASE_ANON_KEY,
  supabase_service_key: process.env.SUPABASE_SERVICE_KEY,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  google_app_password: process.env.GOOGLE_APP_PASSWORD,
  google_app_email: process.env.GOOGLE_APP_EMAIL,
  bucket_name: process.env.BUCKET_NAME,
  folder_name: process.env.FOLDER_NAME,
};
