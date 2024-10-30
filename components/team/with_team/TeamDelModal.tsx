import { useRouter } from "next/navigation";

import { Button } from "@/@common/Button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/@common/modal/NewModal";
import { useToast } from "@/hooks/useToast";
import { revalidateLayout } from "@/lib/revalidate";
import Warning from "@/public/svg/warning.svg";
import { useDelTeam } from "@/queries/group";

interface TeamDelModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  groupId: number;
  teamName: string;
}

export default function TeamDelModal({
  isOpen,
  toggleIsOpen,
  groupId,
  teamName,
}: TeamDelModalProps) {
  const router = useRouter();
  const { mutate: delTeam } = useDelTeam();
  const { toast } = useToast();

  // 팀 삭제하기 버튼 클릭 핸들러
  const handleTeamDelButtonClick = () => {
    delTeam(
      { groupId },
      {
        onError: (error) => {
          toast({
            variant: "danger",
            title: "팀 삭제에 실패했습니다.",
            description: error.message,
          });
        },
        onSuccess: () => {
          toast({ title: "팀 삭제를 완료했습니다!" });
          revalidateLayout(); // Header 최신화
          router.push("/");
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
            <span className="leading-6">&apos;{teamName}&apos;</span>
            <br />
            팀을 정말 삭제하시겠어요?
          </ModalTitle>
          <ModalDescription>삭제 후에는 되돌릴 수 없습니다.</ModalDescription>
        </ModalHeader>
        <div className="flex items-center justify-center gap-2 [&>*]:flex-1">
          <ModalClose asChild>
            <Button variant="outlinedSecondary">닫기</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button onClick={handleTeamDelButtonClick} variant="danger">
              삭제 하기
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  );
}
