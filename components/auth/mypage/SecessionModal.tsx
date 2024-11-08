"use client";

import Image from "next/image";

import { Button } from "@/@common/Button";
import Modal from "@/@common/modal/Modal";
import { deleteUser } from "@/apis/user";
import { toast } from "@/hooks/useToast";

interface ModalOpenProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default function SecessionModal({ isOpen, toggleOpen }: ModalOpenProps) {
  const handleSecession = async () => {
    try {
      await deleteUser();
      toggleOpen();
      toast({ title: "회원탈퇴가 완료되었습니다." });
    } catch (err) {
      if (err instanceof Error)
        return toast({ title: err.message, variant: "danger" });
      throw err;
    }
  };

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={toggleOpen}
      title={
        <div className="flex flex-col items-center gap-3">
          <Image
            width={24}
            height={24}
            src="/images/alert_danger.png"
            alt="secession modal"
          />
          <h2>회원 탈퇴를 진행하시겠어요?</h2>
        </div>
      }
      description={
        <>
          <p>그룹장으로 있는 그룹은 자동으로 삭제되고,</p>
          <p>모든 그룹에서 나가집니다.</p>
        </>
      }
    >
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
          variant="danger"
          className="flex-1"
          type="submit"
          onClick={handleSecession}
        >
          회원 탈퇴
        </Button>
      </div>
    </Modal>
  );
}
