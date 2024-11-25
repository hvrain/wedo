"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/@common/Button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from "@/@common/modal/NewModal";
import { deleteToken } from "@/lib/cookie";

export default function ResetPasswordModalPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await deleteToken();
    router.refresh();
  };

  return (
    <Modal open>
      <ModalTrigger asChild>
        <Button
          className="absolute bottom-[6px] right-2 tab:bottom-2"
          size="sm"
          type="button"
        >
          변경하기
        </Button>
      </ModalTrigger>
      <ModalContent className="tab:max-w-[450px]" type="alert">
        <ModalTitle className="flex flex-col items-center">
          <span>비밀변호를 변경하기 위해선</span>
          <span>현재 계정에서 로그아웃 해야합니다.</span>
        </ModalTitle>
        <ModalDescription className="flex flex-col items-center">
          <span>로그아웃 하시겠습니까?</span>
          <span>(닫기를 누르면 메인페이지로 이동됩니다.)</span>
        </ModalDescription>
        <div className="flex w-full gap-2">
          <Button
            className="flex-1"
            variant="outlinedSecondary"
            type="button"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button className="flex-1" onClick={handleSignOut}>
            로그아웃
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
