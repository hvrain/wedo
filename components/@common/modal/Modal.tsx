"use client";

import { ReactElement, useEffect, cloneElement, ReactNode } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/@common/modal/Dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/@common/modal/Sheet";
import useDeviceType from "@/hooks/useDeviceType";
import useToggle from "@/hooks/useToggle";

interface ModalProps {
  type: "modal" | "alert";
  children: ReactNode;
  trigger: boolean | ReactElement;
  title?: string | ReactElement;
  description?: string | ReactElement;
  footer?: ReactNode;
  hasCrossCloseIcon?: boolean;
  onOpenChange?: () => void;
  contentClassName?: string;
}

/**
 * 공통 Modal 컴포넌트
 * @param type alert(외부 클릭시 닫히지 않음), modal(외부 클릭시 닫힘)을 선택
 * @param trigger trigger를 boolean state로 전달하는 경우, 해당 state값이 변경될 때 마다 modal이 true일때 open, false일때 close / ReactElement로 전달하는 경우 onClick 이벤트로 open 상태를 toggle함
 * @param title modal의 title, <h2> 태그 사용
 * @param description modal의 description, <p> 태그 사용
 * @param footer modal의 footer, footer에 onClick이벤트로 modal을 close하도록 하기 때문에 내부에 모달이 종료될때 눌러야 하는 버튼을 배치
 * @param hasCrossCloseIcon modal의 우측 상단에 X 모양 닫힘 Icon을 표시할지 안할지 결정
 * @param onOpenChange trigger를 boolean값으로 쓰는 경우 닫힐때 실행할 toggleState 함수 등을 전달 혹은 닫을때 추가로 하고싶은 동작
 * @param contentClassName 모달 내부의 content의 padding값 등을 수정하는데 사용, tailwind className으로 전달
 */
export default function Modal({
  type,
  children,
  trigger,
  title,
  description,
  footer,
  hasCrossCloseIcon,
  onOpenChange,
  contentClassName,
}: ModalProps) {
  const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false);
  const [isMobile] = useDeviceType();

  // open 상태를 toggle하는 함수
  const handleOpenChange = () => {
    toggleIsOpen();
    if (onOpenChange) onOpenChange(); // open 상태가 바뀔때마다 외부에서 받은 onOpenChange도 실행
  };

  // alert인 경우 외부와 상호작용 했을 때 닫히지 않도록 하는 함수
  const handleInteractOutside = (e: Event) => {
    if (type === "modal") return;
    e.preventDefault();
  };

  // trigger 값이 boolean 상태로 관리되는 경우에 useEffect를 통해 isOpen값을 변경
  useEffect(() => {
    if (typeof trigger !== "boolean") return;
    setIsOpen(trigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <>
      {typeof trigger !== "boolean" &&
        cloneElement(trigger, {
          onClick: handleOpenChange,
        })}
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetContent
            hasCrossCloseIcon={type === "alert" ? false : hasCrossCloseIcon}
            onInteractOutside={handleInteractOutside}
            className={contentClassName}
          >
            {title ? (
              <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                {description ? (
                  <SheetDescription>{description}</SheetDescription>
                ) : (
                  <VisuallyHidden asChild>
                    <SheetDescription />
                  </VisuallyHidden>
                )}
              </SheetHeader>
            ) : (
              <>
                <VisuallyHidden asChild>
                  <SheetTitle>제목이 없습니다</SheetTitle>
                </VisuallyHidden>
                <VisuallyHidden asChild>
                  <SheetDescription>설명이 없습니다</SheetDescription>
                </VisuallyHidden>
              </>
            )}
            {children}
            {footer && (
              <SheetFooter onClick={handleOpenChange}>{footer}</SheetFooter>
            )}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent
            hasCrossCloseIcon={type === "alert" ? false : hasCrossCloseIcon}
            onInteractOutside={handleInteractOutside}
            className={contentClassName}
          >
            {title ? (
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {description ? (
                  <DialogDescription>{description}</DialogDescription>
                ) : (
                  <VisuallyHidden asChild>
                    <DialogDescription />
                  </VisuallyHidden>
                )}
              </DialogHeader>
            ) : (
              <>
                <VisuallyHidden asChild>
                  <DialogTitle>제목이 없습니다</DialogTitle>
                </VisuallyHidden>
                <VisuallyHidden asChild>
                  <DialogDescription>설명이 없습니다</DialogDescription>
                </VisuallyHidden>
              </>
            )}
            {children}
            {footer && (
              <DialogFooter onClick={handleOpenChange}>{footer}</DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
