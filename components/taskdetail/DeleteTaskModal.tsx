import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/@common/Button";
import Modal from "@/@common/modal/Modal";
import { Recurring } from "@/dtos/TaskDtos";
import { useToast } from "@/hooks/useToast";
import Warning from "@/public/svg/warning.svg";
import { useDeleteTask } from "@/queries/task";

interface TeamTaskListDelModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  recurring: Recurring;
  taskId: number;
}

export default function DeleteTaskModal({
  isOpen,
  toggleIsOpen,
  recurring,
  taskId,
}: TeamTaskListDelModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: removeTask } = useDeleteTask();

  const { toast } = useToast();

  const handleDeleteTask = () => {
    removeTask(
      {
        teamid: String(recurring.groupId),
        tasklistid: String(recurring.taskListId),
        taskid: String(taskId),
      },
      {
        onError: (error) => {
          (() =>
            toast({
              variant: "danger",
              title: "삭제에 실패했습니다.",
              description: error.message,
            }))();
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["taskList"] });
          router.back();
        },
      },
    );
  };

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={toggleIsOpen}
      footer={
        <>
          <Button className="flex-1" variant="outlinedSecondary">
            닫기
          </Button>
          <Button
            className="flex-1"
            variant="danger"
            onClick={handleDeleteTask}
          >
            삭제 하기
          </Button>
        </>
      }
    >
      <div className="text-center">
        <Warning width="24" height="24" className="mx-auto mb-4" />
        <h2 className="lg-medium mb-2 text-default-light">
          할 일을 정말 삭제하시겠어요?
        </h2>
        <p className="md-medium text-default-dark">
          삭제 후에는 되돌릴 수 없습니다.
        </p>
      </div>
    </Modal>
  );
}
