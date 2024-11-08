/* eslint-disable jsx-a11y/tabindex-no-positive */

"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import z from "zod";

import { Button } from "@/@common/Button";
import { actionResetPasswordWithToken, State } from "@/apis/action";
import FormProviderField from "@/components/auth/InputField";
import { toast } from "@/hooks/useToast";

const schema = z
  .object({
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

const INITIAL_STATE: State = {
  status: "NOT_YET",
};

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [state, formAction] = useFormState(
    actionResetPasswordWithToken,
    INITIAL_STATE,
  );
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
      token,
    },
    mode: "onChange",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state.status === "SUCCESS") {
      toast({ title: "비밀번호를 변경하였습니다.", variant: "default" });
      router.push("login");
    } else if (state.status === "API_ERROR")
      toast({ title: state.message, variant: "danger" });
  }, [state, router]);

  return (
    <FormProvider {...form}>
      <form action={formAction} className="flex w-full flex-col">
        <div className="mt-6 flex flex-col gap-6 tab:mt-[52px] pc:mt-20">
          <FormProviderField
            className="bg-input-default"
            label="새 비밀번호"
            name="password"
            type="password"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            placeholder="새 비밀번호를 입력해주세요"
            control={form.control}
          />
          <FormProviderField
            className="bg-input-default"
            label="새 비밀번호 확인"
            name="passwordConfirmation"
            type="password"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            placeholder="새 비밀번호를 다시 한번 입력해주세요"
            control={form.control}
          />
          <input
            className="hidden"
            tabIndex={-1}
            name="token"
            defaultValue={token}
          />
          {state.status === "API_ERROR" && (
            <p className="md-medium mt-4 text-danger">{state.message}</p>
          )}
          <Button
            tabIndex={5}
            className="mt-10"
            disabled={!form.formState.isValid}
            type="submit"
          >
            비밀번호 변경
          </Button>
        </div>
      </form>
      <div className="mt-4 space-x-2">
        <span>비밀번호를 변경하지 않으시겠어요?</span>
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
