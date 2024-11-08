"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { z } from "zod";

import { Button } from "@/@common/Button";
import ImageInput from "@/@common/ImageInput";
import { actionEditProfile, State } from "@/apis/action";
import { toast } from "@/hooks/useToast";
import useToggle from "@/hooks/useToggle";

import FormProviderField from "../InputField";

import PasswordEditForm from "./PasswordEditForm";
import SecessionModal from "./SecessionModal";

export interface Props {
  user: {
    image: string;
    nickname: string;
    email: string;
  };
}

const initialState: State = {
  status: "NOT_YET",
};

const schema = z.object({
  image: z.any(),
  nickname: z.string().min(1, "닉네임을 입력해주세요"),
  email: z.string(),
  password: z.string(),
});

export default function ProfileEditInputs({ user }: Props) {
  const { image, email, nickname } = user;
  const [state, formAction] = useFormState(actionEditProfile, initialState);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      image,
      nickname,
      email,
      password: "11111111",
    },
    mode: "onChange",
  });
  const [secessionModalOpen, toggleSecessionModalOpen] = useToggle(false);

  useEffect(() => {
    if (state.status === "SUCCESS")
      toast({ title: "프로필을 변경하였습니다." });
    else if (state.status === "API_ERROR")
      toast({ title: state.message, variant: "danger" });
    else if (state.status === "SAME_AS_BEFORE")
      toast({ title: "프로필이 이전과 동일합니다.", variant: "danger" });
  }, [state]);

  return (
    <>
      <FormProvider {...form}>
        <form action={formAction} className="flex w-full flex-col">
          <div className="mt-6 flex flex-col gap-6">
            <ImageInput
              id="image"
              name="image"
              type="file"
              control={form.control}
              defaultPreview={image}
            />
            <FormProviderField
              label="닉네임"
              id="nickname"
              name="nickname"
              type="text"
              control={form.control}
            />
            <FormProviderField
              label="이메일"
              name="email"
              type="email"
              disabled
              control={form.control}
            />
            <div className="relative">
              <FormProviderField
                label="비밀번호"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                isVisible={false}
                disabled
                control={form.control}
              />

              <PasswordEditForm />
            </div>
          </div>
          <Button className="mt-10" type="submit">
            프로필 수정하기
          </Button>
        </form>
      </FormProvider>
      <button
        className="mt-4 flex items-center gap-1 self-start text-red-500"
        type="button"
        onClick={toggleSecessionModalOpen}
      >
        <Image
          width={24}
          height={24}
          src="/images/secession.png"
          alt="secession"
        />
        <span>회원 탈퇴하기</span>
      </button>

      <SecessionModal
        isOpen={secessionModalOpen}
        toggleOpen={toggleSecessionModalOpen}
      />
    </>
  );
}
