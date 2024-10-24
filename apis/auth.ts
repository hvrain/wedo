import {
  SignInRequestBody,
  SignInResponse,
  SignUpRequestBody,
} from "@/dtos/AuthDtos";

const AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/8-7`;
const options = {
  credentials: "include",
};

export async function postRefreshAccessToken(refreshToken: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json",
        ...options,
      },
      next: { revalidate: 0 },
    },
  );
  const json: { accessToken: string } = await res.json();
  return json;
}

export async function postSignIn({ email, password }: SignInRequestBody) {
  const res = await fetch(`${AUTH_BASE_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const { message }: { message: string } = await res.json();
    throw new Error(message);
  }
  const json: SignInResponse = await res.json();
  return json;
}

export async function postSignUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpRequestBody) {
  const res = await fetch(`${AUTH_BASE_URL}/auth/signUp`, {
    method: "POST",
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const { message }: { message: string } = await res.json();
    throw new Error(message);
  }
  const json: SignInResponse = await res.json();
  return json;
}

interface PostSignInGoogleRequest {
  token: string;
}

export async function postSignInGoogle({ token }: PostSignInGoogleRequest) {
  const res = await fetch(`${AUTH_BASE_URL}/auth/signIn/GOOGLE`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  const json: SignInResponse = await res.json();
  return json;
}

interface PostSignInKakaoRequest {
  token: string;
  redirectUri: string;
}

export async function postSignInKakao({
  token,
  redirectUri,
}: PostSignInKakaoRequest) {
  const res = await fetch(`${AUTH_BASE_URL}/auth/signIn/KAKAO`, {
    method: "POST",
    body: JSON.stringify({ token, redirectUri }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  const json: SignInResponse = await res.json();
  return json;
}
