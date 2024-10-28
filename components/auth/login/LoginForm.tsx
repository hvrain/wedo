/* eslint-disable jsx-a11y/tabindex-no-positive */

"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import z from "zod";

import { Button } from "@/@common/Button";
import { actionSignIn, State } from "@/apis/action";
import FormProviderField from "@/components/auth/InputField";
import useToggle from "@/hooks/useToggle";

import ResetPasswordEmailModal from "./ResetPasswordEmailModal";

const INITIAL_LOGIN_STATE: State = {
  status: "NOT_YET",
};

export const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8글자 이상 입력해주세요" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
      message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
    }),
});

export default function LoginForm() {
  const router = useRouter();
  const [open, toggleOpen] = useToggle(false);
  const [state, formAction] = useFormState(actionSignIn, INITIAL_LOGIN_STATE);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const [isVisible, setIsVisible] = useState(false);
  if (state.status === "SUCCESS") router.push("/");

  return (
    <>
      <FormProvider {...form}>
        <form action={formAction} className="flex w-full flex-col">
          <div className="mt-6 flex flex-col gap-6 tab:mt-[52px] pc:mt-20">
            <FormProviderField
              autoFocus
              tabIndex={1}
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              control={form.control}
            />
            <FormProviderField
              tabIndex={2}
              label="비밀번호"
              name="password"
              type="password"
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              placeholder="비밀번호를 입력해주세요"
              control={form.control}
            />
          </div>
          <button
            type="button"
            onClick={toggleOpen}
            className="mt-2 self-end text-link-light underline underline-offset-1"
          >
            비밀번호를 잊으셨나요?
          </button>
          {state.status === "API_ERROR" && (
            <p className="md-medium mt-4 text-danger">{state.message}</p>
          )}
          <Button
            tabIndex={3}
            className="mt-10 focus:border focus:border-gray-500"
            disabled={!form.formState.isValid}
            type="submit"
          >
            로그인
          </Button>
        </form>
        <div className="mt-4 space-x-2">
          <span>아직 계정이 없으신가요?</span>
          <Link
            href="/signup"
            className="self-end text-link-light underline underline-offset-1"
          >
            가입하기
          </Link>
        </div>
      </FormProvider>
      <ResetPasswordEmailModal isOpen={open} toggleOpen={toggleOpen} />
    </>
  );
}
