import { ChangeEvent, MouseEvent, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/@common/Button";
import Input from "@/@common/Input";
import Modal from "@/@common/modal/Modal";
import { useToast } from "@/hooks/useToast";
import {
  useGenerateInviteToken,
  useInviteMemberWithEmail,
} from "@/queries/group";

interface TeamInviteModalButtonProps {
  groupId: number;
}

export default function TeamInviteModalButton({
  groupId,
}: TeamInviteModalButtonProps) {
  const queryClient = useQueryClient();

  const [userEmailValue, setUserEmailValue] = useState("");
  const [emailInputErrorMessage, setEmailInputErrorMessage] = useState("");

  const { data: inviteToken } = useGenerateInviteToken(groupId);
  const { mutate: inviteMemberWithEmail } = useInviteMemberWithEmail();

  const { toast } = useToast();

  // 팀 초대하기 모달의 email input change 핸들러
  const handleUserEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmailValue(e.target.value);

    if (emailInputErrorMessage) {
      setEmailInputErrorMessage("");
    }
  };

  // 이메일 초대 button click 핸들러
  // 1. 이메일 입력이 없는 경우 api 요청 x + error message
  // 2. 이외에는 api 요청을 하고 error message를 띄움
  // 3. 성공시에는 toast를 띄우고 팀 페이지의 팀 멤버 목록 최신화를 위해 invalidateQuery
  const handleEmailInviteButtonClick = (e: MouseEvent) => {
    if (!userEmailValue) {
      e.stopPropagation();
      setEmailInputErrorMessage("이메일을 입력해주세요.");
    }

    inviteMemberWithEmail(
      { groupId, email: userEmailValue },
      {
        onError: (error) => {
          e.stopPropagation(); // error 발생시에 안닫히게 하고 싶으나 동작하지 않음 (이후에 bug fix)
          setEmailInputErrorMessage(error.message);
        },
        onSuccess: () => {
          (() => toast({ title: "초대에 성공하였습니다." }))();
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
        },
      },
    );
  };

  // 초대 링크를 복사 button handler, 복사 후 토스트를 띄움
  const handleInviteTokenCopyButton = () => {
    (() => toast({ title: "초대 링크를 복사하였습니다." }))();

    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DEPLOY_URL}/jointeam?invite=${inviteToken}`,
    );
  };

  return (
    <Modal
      trigger={
        <button className="md-medium text-brand-active">
          + 새로운 멤버 초대하기
        </button>
      }
      title="멤버 초대"
      description={
        <>
          초대 받을 유저의 email을 입력합니다.
          <br />
          또는 그룹에 참여할 수 있는 링크를 복사합니다.
        </>
      }
      type="modal"
      hasCrossCloseIcon
      footer={
        <div className="flex w-full flex-col gap-2">
          <Button className="flex-1" onClick={handleEmailInviteButtonClick}>
            이메일로 초대하기
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleInviteTokenCopyButton}
          >
            링크 복사하기
          </Button>
        </div>
      }
    >
      <Input
        value={userEmailValue}
        onChange={handleUserEmailInputChange}
        Error={!!emailInputErrorMessage}
        ErrorMessage={emailInputErrorMessage}
      />
    </Modal>
  );
}
