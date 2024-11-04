"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PatchUserRequestBody } from "@/dtos/UserDtos";
import { deleteToken } from "@/lib/cookie";

import { postSignIn, postSignUp } from "./auth";
import { uploadImage } from "./image";
import {
  getUser,
  patchUser,
  patchUserPassword,
  patchUserResetPassword,
  postSendResetPasswordEmail,
} from "./user";

export type State = {
  status: string;
  message?: string;
  error?: unknown;
};

export async function actionSignOut() {
  await deleteToken();
  redirect("/");
}

export async function actionSignUp(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const cookieStore = cookies();
  try {
    const email = formData.get("email") as string;
    const nickname = formData.get("nickname") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;
    const res = await postSignUp({
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    cookieStore.set("accessToken", res.accessToken);
    cookieStore.set("refreshToken", res.refreshToken);
  } catch (error) {
    if (error instanceof Error)
      return { status: "API_ERROR", message: error.message };
    throw new Error("unknown");
  }
  return { status: "SUCCESS" };
}

export async function actionSignIn(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const cookieStore = cookies();
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await postSignIn({ email, password });
    cookieStore.set("accessToken", res.accessToken);
    cookieStore.set("refreshToken", res.refreshToken);
  } catch (error) {
    if (error instanceof Error)
      return { status: "API_ERROR", message: error.message };
    throw new Error("unknown");
  }
  return { status: "SUCCESS" };
}

export async function actionEditProfile(prevState: State, formData: FormData) {
  try {
    const { nickname } = await getUser();
    const imageFile = formData.get("image") as File;
    const nicknameData = formData.get("nickname") as string;
    const body: PatchUserRequestBody = {};
    if (imageFile.size !== 0 && imageFile.name !== undefined) {
      const { url } = await uploadImage(imageFile);
      body.image = url;
    }
    if (nickname !== nicknameData) {
      body.nickname = nicknameData;
    }
    if (Object.entries(body).length > 0) await patchUser(body);
    else return { status: "SAME_AS_BEFORE" };
  } catch (err) {
    if (err instanceof Error)
      return { status: "API_ERROR", message: err.message };
    throw new Error("profile edit unknown error");
  }
  revalidateTag("getUser");
  return { status: "SUCCESS" };
}

export async function actionEditPassword(prevState: State, formData: FormData) {
  try {
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;
    await patchUserPassword({ password, passwordConfirmation });
  } catch (err) {
    if (err instanceof Error)
      return { status: "API_ERROR", message: err.message };
    throw new Error("actionEditPassword unknown error");
  }
  return { status: "SUCCESS" };
}

export async function actionSendResetPasswordEmail(
  prevState: State,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    await postSendResetPasswordEmail({
      email,
    });
  } catch (err) {
    if (err instanceof Error)
      return { status: "API_ERROR", message: err.message };
    throw new Error("actionSendResetPasswordEmail unknown error");
  }
  return { status: "SUCCESS" };
}

export async function actionResetPasswordWithToken(
  prevState: State,
  formData: FormData,
) {
  try {
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;
    const token = formData.get("token") as string;
    await patchUserResetPassword({ password, passwordConfirmation, token });
  } catch (err) {
    if (err instanceof Error)
      return { status: "API_ERROR", message: err.message };
    throw new Error("actionEditPassword unknown error");
  }
  return { status: "SUCCESS" };
}
