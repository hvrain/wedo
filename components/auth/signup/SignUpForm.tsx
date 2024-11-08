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
import { actionSignUp, State } from "@/apis/action";
import FormProviderField from "@/components/auth/InputField";

const INITIAL_LOGIN_STATE: State = {
  status: "NOT_YET",
};

export const loginSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
    nickname: z
      .string()
      .min(1, { message: "닉네입을 입력해주세요" })
      .max(30, { message: "닉네임을 30자 이하로 입력해주세요" }),
    password: z
      .string()
      .min(8, { message: "비밀번호를 8글자 이상 입력해주세요" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
        message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
      }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요" }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirmation"],
      });
    }
  });

export default function SignUpForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(actionSignUp, INITIAL_LOGIN_STATE);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  });
  const [isVisible, setIsVisible] = useState(false);
  if (state.status === "SUCCESS") router.push("/");

  return (
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
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            control={form.control}
          />
          <FormProviderField
            tabIndex={3}
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            control={form.control}
          />
          <FormProviderField
            tabIndex={4}
            label="비밀번호 확인"
            name="passwordConfirmation"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            control={form.control}
          />
        </div>
        {state.status === "API_ERROR" && (
          <p className="md-medium mt-4 text-danger">{state.message}</p>
        )}
        <Button
          tabIndex={5}
          className="mt-10"
          disabled={!form.formState.isValid}
          type="submit"
        >
          회원가입
        </Button>
      </form>
      <div className="mt-4 space-x-2">
        <span>이미 회원이신가요?</span>
        <Link
          href="/login"
          className="self-end text-link-light underline underline-offset-1"
        >
          로그인하러 가기
        </Link>
      </div>
    </FormProvider>
  );
}
