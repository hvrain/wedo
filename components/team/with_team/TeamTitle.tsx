"use client";

import { ChangeEvent, MouseEvent, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/@common/Button";
import Input from "@/@common/Input";
import ActionsDropDown from "@/@common/dropdown/ActionsDropDown";
import Modal from "@/@common/modal/Modal";
import { GetTeamResponse } from "@/dtos/GroupDtos";
import { useToast } from "@/hooks/useToast";
import useToggle from "@/hooks/useToggle";
import { revalidateLayout } from "@/lib/revalidate";
import Sawtooth from "@/public/svg/sawtooth.svg";
import Warning from "@/public/svg/warning.svg";
import { useDelTeam, useEditTeam } from "@/queries/group";

interface TeamTitleProps {
  isAdmin: boolean;
  groupId: number;
  teamData: GetTeamResponse | undefined;
}

export default function TeamTitle({
  isAdmin,
  groupId,
  teamData,
}: TeamTitleProps) {
  const queryClient = useQueryClient();

  const [isEditModalOpen, toggleIsEditModalOpen] = useToggle(false);
  const [isDelModalOpen, toggleIsDelModalOpen] = useToggle(false);

  // string | undefined로 추론되기 때문에 우선은 as string으로 처리하였으나 error처리 이후에 수정 필요
  const imageUrl = teamData?.image as string;
  const currentTeamName = teamData?.name as string;

  const [teamNameInputValue, setTeamNameInputValue] = useState(currentTeamName);
  const [teamNameInputErrorMessage, setTeamNameInputErrorMessage] =
    useState("");

  const { mutate: editTeam } = useEditTeam();
  const { mutate: delTeam } = useDelTeam();

  const { toast } = useToast();
  const router = useRouter();

  // 팀수정하기 모달의 input change 핸들러
  const handleTeamNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamNameInputValue(e.target.value);

    if (teamNameInputErrorMessage) {
      setTeamNameInputErrorMessage("");
    }
  };

  // 팀수정하기 모달의 수정하기 button click 핸들러
  // 1. 팀 이름이 이전과 동일하면 api 요청 x + error message
  // 2. 이외에는 수정하기 요청을 보내고 error message를 띄움 성공시에는 팀 페이지의 이름 변경을 위해 invalidateQuery
  const handleTeamEditButtonClick = (e: MouseEvent) => {
    if (currentTeamName === teamNameInputValue) {
      e.stopPropagation();
      setTeamNameInputErrorMessage("팀 이름이 동일합니다.");
      return;
    }

    editTeam(
      { groupId, image: imageUrl, name: teamNameInputValue },
      {
        onError: (error) => {
          e.stopPropagation();
          setTeamNameInputErrorMessage(error.message);
        },
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["team", groupId] }),
      },
    );
  };

  // 팀 삭제에 성공시 toast를 띄우고 메인 페이지로 이동시킴
  const handleTeamDelButtonClick = () => {
    delTeam(
      { groupId },
      {
        onSuccess: () => {
          (() => toast({ title: "팀 삭제를 완료했습니다!" }))();
          revalidateLayout();
          router.push("/");
        },
      },
    );
  };

  return (
    <div className="xl-bold flex h-[64px] justify-between rounded-xl bg-dropDown-default px-6 py-5 text-default-light">
      {currentTeamName}
      {isAdmin && (
        <>
          <ActionsDropDown
            onEditHandler={toggleIsEditModalOpen}
            onDeleteHandler={toggleIsDelModalOpen}
          >
            <Sawtooth />
          </ActionsDropDown>

          {/* 팀 수정하기 모달 */}
          <Modal
            trigger={isEditModalOpen}
            type="modal"
            title="팀 이름"
            hasCrossCloseIcon
            onOpenChange={toggleIsEditModalOpen}
            footer={
              <Button className="flex-1" onClick={handleTeamEditButtonClick}>
                수정 하기
              </Button>
            }
          >
            <Input
              placeholder="팀 이름을 작성해주세요."
              onChange={handleTeamNameInputChange}
              defaultValue={currentTeamName}
              value={teamNameInputValue}
              Error={!!teamNameInputErrorMessage}
              ErrorMessage={teamNameInputErrorMessage}
            />
          </Modal>

          {/* 팀 삭제하기 모달 */}
          <Modal
            trigger={isDelModalOpen}
            type="modal"
            onOpenChange={toggleIsDelModalOpen}
            footer={
              <>
                <Button className="flex-1" variant="outlinedSecondary">
                  닫기
                </Button>
                <Button
                  className="flex-1"
                  variant="danger"
                  onClick={handleTeamDelButtonClick}
                >
                  삭제 하기
                </Button>
              </>
            }
          >
            <div className="text-center">
              <Warning width="24" height="24" className="mx-auto mb-4" />
              <h2 className="lg-medium mb-2 text-default-light">
                &apos;{currentTeamName}&apos;
                <br />
                팀을 정말 삭제하시겠어요?
              </h2>
              <p className="md-medium text-default-dark">
                삭제 후에는 되돌릴 수 없습니다.
              </p>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
