"use client";

import { InputHTMLAttributes, PropsWithChildren, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/@common/Button";
import Modal from "@/@common/modal/Modal";
import { actionSendResetPasswordEmail, State } from "@/apis/action";

import FormProviderField from "../InputField";

const initialState: State = {
  status: "NOT_YET",
};

const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
});

interface ResetPasswordEmailModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

function Submit({
  disabled,
  children,
}: PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={disabled || pending} className="flex-1" type="submit">
      {pending ? "전송중..." : children}
    </Button>
  );
}

export default function ResetPasswordEmailModal({
  isOpen,
  toggleOpen,
}: ResetPasswordEmailModalProps) {
  const [state, formAction] = useFormState(
    actionSendResetPasswordEmail,
    initialState,
  );
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (state.status === "API_ERROR") {
      form.setError("email", { message: state.message });
    }
  }, [state, form]);

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={toggleOpen}
      title="비밀번호 재설정 이메일 전송"
      description={
        <>
          <span>비밀번호를 재설정할 이메일을 입력하면,</span>
          <br />
          <span>비밀번호 재설정 메일을 보내드립니다.</span>
        </>
      }
    >
      <FormProvider {...form}>
        <form action={formAction} className="flex flex-col">
          <FormProviderField
            autoFocus
            className="bg-input-default"
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            control={form.control}
          />
          {state.status === "SUCCESS" && (
            <p className="md-medium mt-4">{`${form.getValues().email}로 비밀번호 재설정 이메일이 전송되었습니다.`}</p>
          )}
          <div className="mt-6 flex w-full gap-2">
            <Button
              className="flex-1"
              variant="outlinedSecondary"
              type="button"
              onClick={toggleOpen}
            >
              닫기
            </Button>
            <Submit disabled={!form.formState.isValid}>전송하기</Submit>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
