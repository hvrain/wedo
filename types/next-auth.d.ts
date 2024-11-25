import { SignInResponse } from "@/dtos/AuthDtos";

declare module "next-auth" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User extends SignInResponse {}
  interface Session {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: SignInResponse["user"];
    accessToken: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    error?: string;
  }
}
