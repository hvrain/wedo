"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/@common/Button";
import Modal from "@/@common/modal/Modal";
import { actionEditPassword, State } from "@/apis/action";
import { toast } from "@/hooks/useToast";

import FormProviderField from "../InputField";

const initialState: State = {
  status: "NOT_YET",
};

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

interface PasswordEditFormProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default function PasswordEditForm({
  isOpen,
  toggleOpen,
}: PasswordEditFormProps) {
  const [state, formAction] = useFormState(actionEditPassword, initialState);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state.status === "SUCCESS") {
      toast({ title: "비밀번호를 변경하였습니다.", variant: "default" });
      form.reset();
    } else if (state.status === "API_ERROR")
      toast({ title: state.message, variant: "danger" });
  }, [state, form]);

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={toggleOpen}
      title="비밀번호 변경하기"
    >
      <FormProvider {...form}>
        <form action={formAction} className="flex flex-col gap-6">
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
            placeholder="다시 한번 입력해주세요"
            control={form.control}
          />
          <div className="flex w-full gap-2">
            <Button
              className="flex-1"
              variant="outlinedSecondary"
              type="button"
              onClick={toggleOpen}
            >
              닫기
            </Button>
            <Button
              disabled={!form.formState.isValid}
              className="flex-1"
              type="submit"
              onClick={toggleOpen}
            >
              변경하기
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
