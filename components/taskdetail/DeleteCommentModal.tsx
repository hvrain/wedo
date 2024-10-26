import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/@common/Button";
import Modal from "@/@common/modal/Modal";
import { useToast } from "@/hooks/useToast";
import Warning from "@/public/svg/warning.svg";
import { useDeleteTaskComment } from "@/queries/task";

interface TeamTaskListDelModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  taskid: string;
  commentId: number;
}

export default function DeleteCommentModal({
  isOpen,
  toggleIsOpen,
  taskid,
  commentId,
}: TeamTaskListDelModalProps) {
  const queryClient = useQueryClient();

  const { mutate: removeTaskComment } = useDeleteTaskComment();

  const { toast } = useToast();

  const handleDeleteTaskComment = () => {
    removeTaskComment(
      { taskid, commentId },
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
        },
      },
    );
  };

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={toggleIsOpen}
      title={<VisuallyHidden.Root>댓글 삭제</VisuallyHidden.Root>}
      description={<VisuallyHidden.Root>댓글 삭제</VisuallyHidden.Root>}
      footer={
        <>
          <Button className="flex-1" variant="outlinedSecondary">
            닫기
          </Button>
          <Button
            className="flex-1"
            variant="danger"
            onClick={handleDeleteTaskComment}
          >
            삭제 하기
          </Button>
        </>
      }
    >
      <div className="text-center">
        <Warning width="24" height="24" className="mx-auto mb-4" />
        <h2 className="lg-medium mb-2 text-default-light">
          댓글을 정말 삭제하시겠어요?
        </h2>
        <p className="md-medium text-default-dark">
          삭제 후에는 되돌릴 수 없습니다.
        </p>
      </div>
    </Modal>
  );
}
