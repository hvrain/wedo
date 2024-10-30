import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/@common/Button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalClose,
} from "@/components/@common/modal/NewModal";
import { useToast } from "@/hooks/useToast";
import Warning from "@/public/svg/warning.svg";
import { useDelTaskList } from "@/queries/taskLists";

interface TeamTaskListDelModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  groupId: number;
  taskListId: number;
  currentName: string;
}

export default function TeamTaskListDelModal({
  isOpen,
  toggleIsOpen,
  groupId,
  taskListId,
  currentName,
}: TeamTaskListDelModalProps) {
  const queryClient = useQueryClient();
  const { mutate: delTaskList } = useDelTaskList();
  const { toast } = useToast();

  // 삭제하기 모달 삭제하기 버튼 클릭 핸들러
  // 1. api 요청 후 삭제에 실패하면 삭제 실패 toast를 띄움
  // 2. 성공하면 팀 페이지의 task list 최신화를 위해 invalidate queries
  const handleTaskListDelButtonClick = () => {
    delTaskList(
      { groupId, taskListId },
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
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
        },
      },
    );
  };

  return (
    <Modal open={isOpen} onOpenChange={toggleIsOpen}>
      <ModalContent>
        <ModalHeader>
          <Warning width="24" height="24" className="mx-auto mb-4" />
          <ModalTitle>
            <span className="leading-6">&apos;{currentName}&apos;</span>
            <br />할 일 목록을 정말 삭제하시겠어요?
          </ModalTitle>
          <ModalDescription>삭제 후에는 되돌릴 수 없습니다.</ModalDescription>
        </ModalHeader>
        <div className="flex items-center justify-center gap-2 [&>*]:flex-1">
          <ModalClose asChild>
            <Button variant="outlinedSecondary">닫기</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button onClick={handleTaskListDelButtonClick} variant="danger">
              삭제 하기
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  );
}
