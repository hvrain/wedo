"use client";

import { ChangeEvent, MouseEvent, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/@common/Button";
import Input from "@/@common/Input";
import ActionsDropDown from "@/@common/dropdown/ActionsDropDown";
import Modal from "@/@common/modal/Modal";
import { GetTeamResponse } from "@/dtos/GroupDtos";
import useToggle from "@/hooks/useToggle";
import Sawtooth from "@/public/svg/sawtooth.svg";
import { useEditTeam } from "@/queries/group";

import TeamDelModal from "./TeamDelModal";

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

          <TeamDelModal
            isOpen={isDelModalOpen}
            toggleIsOpen={toggleIsDelModalOpen}
            groupId={groupId}
            teamName={currentTeamName}
          />
        </>
      )}
    </div>
  );
}
