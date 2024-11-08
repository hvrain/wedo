import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import returnFetch, { FetchArgs } from "return-fetch";

import { getServerCookie } from "@/lib/cookie";

import { postRefreshAccessToken } from "./auth";

export async function refreshAccessToken() {
  let refreshToken;
  if (typeof window === "undefined") {
    refreshToken = await getServerCookie("refreshToken");
  } else {
    refreshToken = getCookie("refreshToken");
  }
  try {
    const { accessToken } = await postRefreshAccessToken(refreshToken!);
    return accessToken;
  } catch (error) {
    return {
      error: "RefreshAccessTokenError",
    };
  }
}

const fetchExtended = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
  },
  interceptors: {
    request: async (args: FetchArgs) => {
      if (args[0] instanceof URL) {
        const url = args[0];
        const { pathname } = url;
        url.pathname = `/8-7${pathname}`;
      }

      if (!args[1]?.headers) return args;

      let accessToken;
      if (typeof window === "undefined") {
        accessToken = await getServerCookie("accessToken");
      } else accessToken = getCookie("accessToken");

      if (!accessToken) return args;

      const timeRemaining =
        jwtDecode(accessToken).exp! - Math.floor(new Date().getTime() / 1000);
      if (timeRemaining <= 0) {
        accessToken = await refreshAccessToken();
      }

      const { headers } = args[1];
      const headerInit: HeadersInit = new Headers(headers);
      headerInit.set("Authorization", `Bearer ${accessToken}`);
      const newArgs: FetchArgs = [
        args[0],
        {
          ...args[1],
          headers: headerInit,
        },
      ];
      return newArgs;
    },
  },
});

export const fetchExtendedForm = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    credentials: "include",
  },
  interceptors: {
    request: async (args: FetchArgs) => {
      if (args[0] instanceof URL) {
        const url = args[0];
        const { pathname } = url;
        url.pathname = `/8-7${pathname}`;
      }

      if (!args[1]?.headers) return args;

      let accessToken;
      if (typeof window === "undefined")
        accessToken = await getServerCookie("accessToken");
      else accessToken = getCookie("accessToken");

      if (!accessToken) return args;

      const timeRemaining =
        jwtDecode(accessToken).exp! - Math.floor(new Date().getTime() / 1000);

      if (timeRemaining <= 0) accessToken = await refreshAccessToken();

      const { headers } = args[1];
      const headerInit: HeadersInit = new Headers(headers);
      headerInit.set("Authorization", `Bearer ${accessToken}`);
      const newArgs: FetchArgs = [
        args[0],
        {
          ...args[1],
          headers: headerInit,
        },
      ];
      return newArgs;
    },
  },
});

export default fetchExtended;
