import { MouseEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQueryClient } from "@tanstack/react-query";
import z from "zod";

import { Button } from "@/@common/Button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/@common/modal/NewModal";
import FormProviderField from "@/components/auth/InputField";
import { useToast } from "@/hooks/useToast";
import { useEditTaskList } from "@/queries/taskLists";

const taskListNameSchema = z.object({
  taskListName: z
    .string()
    .max(30, { message: "할 일 목록의 이름은 30자 이내입니다." })
    .trim()
    .min(1, { message: "할 일 목록의 이름은 공백을 제외하고 1자 이상입니다." }),
});

interface TeamTaskListEditModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  groupId: number;
  taskListId: number;
  currentName: string;
}

interface UseFormInput {
  taskListName: string;
}

export default function TeamTaskListEditModal({
  isOpen,
  toggleIsOpen,
  groupId,
  taskListId,
  currentName,
}: TeamTaskListEditModalProps) {
  const queryClient = useQueryClient();
  const form = useForm<UseFormInput>({
    mode: "onChange",
    resolver: zodResolver(taskListNameSchema),
    defaultValues: { taskListName: currentName },
  });
  const { toast } = useToast();
  const { mutate: editTaskList } = useEditTaskList();

  // 모달이 열리거나 닫힐때 실행하는 함수
  const handleOpenChange = () => {
    toggleIsOpen();

    // 모달이 열릴때만 input의 value를 reset
    if (!isOpen) {
      form.reset({ taskListName: currentName });
    }
  };

  // Submit Button Click 핸들러
  // input value의 유효성 검사 이후에 문제가 있으면 모달이 닫히지 않고 api 요청을 하지 않도록 함
  // 최초 렌더링 시에만 별도로 수동 에러를 발생 (onChange 이전)
  const handleSubmitButtonClick = (e: MouseEvent) => {
    if (form.watch("taskListName") === currentName) {
      form.setError("taskListName", {
        type: "same_name",
        message: "할 일 목록의 이름이 이전과 동일합니다.",
      });
    }
    if (Object.keys(form.formState.errors).length !== 0) {
      e.preventDefault();
    }
  };

  // Form Submit 핸들러, 서버 에러의 경우에는 토스트를 통해서 에러 메세지를 전달
  const handleFormSubmit = (data: UseFormInput) => {
    editTaskList(
      { groupId, taskListId, taskListName: data.taskListName },
      {
        onError: (error) => {
          toast({
            title: error.message,
            className: "bg-inverse [&_*]:text-danger",
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
        },
      },
    );
  };

  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContent hasCrossCloseIcon>
        <ModalHeader>
          <ModalTitle>할 일 이름</ModalTitle>
          <VisuallyHidden asChild>
            <ModalDescription>할 일 이름을 수정합니다.</ModalDescription>
          </VisuallyHidden>
        </ModalHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-6"
          >
            <FormProviderField
              name="taskListName"
              className="bg-input-default"
              placeholder="할 일 목록 이름을 작성해주세요."
            />
            <ModalClose asChild>
              <Button
                onClick={handleSubmitButtonClick}
                className="w-full"
                type="submit"
              >
                수정 하기
              </Button>
            </ModalClose>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
