"use client";

import Image from "next/image";

import { Button } from "@/components/@common/Button";
import useToggle from "@/hooks/useToggle";

import AddTaskModal from "../addTask/AddTaskModal";

export default function AddTaskButtton() {
  const [isToggle, toggleState] = useToggle(false);

  return (
    <>
      <Button
        onClick={toggleState}
        variant="floating"
        size="low"
        className="fixed bottom-5 right-[calc(1200px-1150px)]"
      >
        <Image width={16} height={16} src="/svg/plus.svg" alt="플러스 아이콘" />
        할 일 추가
      </Button>
      {isToggle && (
        <AddTaskModal isOpen={isToggle} onOpenChange={toggleState} />
      )}
    </>
  );
}
