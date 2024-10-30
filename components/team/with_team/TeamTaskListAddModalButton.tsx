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
  ModalTrigger,
} from "@/components/@common/modal/NewModal";
import FormProviderField from "@/components/auth/InputField";
import { useToast } from "@/hooks/useToast";
import { useAddTaskList } from "@/queries/taskLists";

const taskListNameSchema = z.object({
  taskListName: z
    .string()
    .max(30, { message: "할 일 목록의 이름은 30자 이내입니다." })
    .trim()
    .min(1, { message: "할 일 목록의 이름은 공백을 제외하고 1자 이상입니다." }),
});

interface TeamTaskListAddModalButtonProps {
  groupId: number;
}

interface UseFormInput {
  taskListName: string;
}

export default function TeamTaskListAddModalButton({
  groupId,
}: TeamTaskListAddModalButtonProps) {
  const queryClient = useQueryClient();
  const form = useForm<UseFormInput>({
    mode: "onChange",
    resolver: zodResolver(taskListNameSchema),
    defaultValues: { taskListName: "" },
  });
  const { toast } = useToast();
  const { mutate: addTaskList } = useAddTaskList();

  // Submit Button Click 핸들러
  // input value의 유효성 검사 이후에 문제가 있으면 모달이 닫히지 않고 api 요청을 하지 않도록 함
  // 최초 렌더링 시에만 별도로 수동 에러를 발생 (onChange 이전)
  const handleSubmitButtonClick = (e: MouseEvent) => {
    if (form.watch("taskListName") === "") {
      form.setError("taskListName", {
        type: "invalid_string",
        message: "할 일 목록의 이름은 공백을 제외하고 1자 이상입니다.",
      });
    }
    if (Object.keys(form.formState.errors).length !== 0) {
      e.preventDefault();
    }
  };

  // Form Submit 핸들러, 서버 에러의 경우에는 토스트를 통해서 에러 메세지를 전달
  const handleFormSubmit = (data: UseFormInput) => {
    addTaskList(
      { groupId, taskListName: data.taskListName },
      {
        onError: (error) => {
          toast({
            title: error.message,
            className: "bg-inverse [&_*]:text-danger",
          });
        },
        onSuccess: () => {
          toast({ title: `할 일 목록 "${data.taskListName}"를 추가했습니다!` });
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
        },
      },
    );
  };

  return (
    <Modal>
      <ModalTrigger
        onClick={() => form.reset()}
        className="md-medium text-brand-active"
      >
        + 새로운 목록 추가하기
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>할 일 이름</ModalTitle>
          <VisuallyHidden asChild>
            <ModalDescription>할 일 목록을 추가합니다.</ModalDescription>
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
                생성 하기
              </Button>
            </ModalClose>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
