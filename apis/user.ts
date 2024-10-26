import { SignUpRequestBody } from "@/dtos/AuthDtos";
import {
  PatchUserRequestBody,
  UserGroupsResponse,
  UserResponse,
} from "@/dtos/UserDtos";
import { deleteToken } from "@/lib/cookie";

import fetchExtended from "./fetchExtended";

export async function getUserGroups() {
  const res = await fetchExtended("user/groups");
  if (!res.ok) {
    const json: { message: string } = await res.json();
    throw new Error(json.message);
  }
  const json: UserGroupsResponse[] = await res.json();
  return json;
}

export async function getUser() {
  const res = await fetchExtended("/user", { next: { tags: ["getUser"] } });
  if (!res.ok) {
    const json: { message: string } = await res.json();
    throw new Error(json.message);
  }
  const json: UserResponse = await res.json();
  return json;
}

export async function patchUser(body: PatchUserRequestBody) {
  const res = await fetchExtended("/user", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const json: { message: string } = await res.json();
    throw new Error(json.message);
  }
  const json: { message: string } = await res.json();
  return json;
}

interface PatchUserPasswordRequestBody
  extends Pick<SignUpRequestBody, "password" | "passwordConfirmation"> {}

export async function patchUserPassword(body: PatchUserPasswordRequestBody) {
  const res = await fetchExtended("/user/password", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const json: { message: string } = await res.json();
    throw new Error(json.message);
  }
  const json: { message: string } = await res.json();
  return json;
}

export async function deleteUser() {
  const res = await fetchExtended("/user", {
    method: "DELETE",
  });
  if (!res.ok) {
    const json: { message: string } = await res.json();
    throw new Error(json.message);
  }
  await deleteToken();
}

export async function userHistory() {
  const res = await fetchExtended("/user/history");

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function postSendResetPasswordEmail({ email }: { email: string }) {
  const res = await fetchExtended("/user/send-reset-password-email", {
    method: "POST",
    body: JSON.stringify({
      email,
      redirectUrl: process.env.NEXT_PUBLIC_DEPLOY_URL,
    }),
  });
  if (!res.ok) {
    const json: { message: string } = await res.json();
    throw new Error(json.message);
  }
  const json: { message: string } = await res.json();
  return json;
}

export async function patchUserResetPassword(
  body: PatchUserPasswordRequestBody & { token: string },
) {
  const res = await fetchExtended("/user/reset-password", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const json: { message: string } = await res.json();
    throw new Error(json.message);
  }
  const json: { message: string } = await res.json();
  return json;
}
