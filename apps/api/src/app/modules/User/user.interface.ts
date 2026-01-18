import type { IFile } from "../Files/files.interface";

export interface ISession {
  id: string;
  token: string;
  createdAt: string;
  updatedAt?: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}
export type Role = "USER" | "ADMIN";

export interface IAccount {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: string | null;
  refreshTokenExpiresAt?: string | null;
  scope?: string | null;
  password?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
}
export interface IUser {
  // id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
  banned: boolean;
  banReason?: string | null;
  accounts: IAccount[];
  sessions: ISession[];
  files: IFile[];
}
