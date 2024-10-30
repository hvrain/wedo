"use client";

import ActionsDropDown from "@/@common/dropdown/ActionsDropDown";
import { GetTeamResponse } from "@/dtos/GroupDtos";
import useToggle from "@/hooks/useToggle";
import Sawtooth from "@/public/svg/sawtooth.svg";

import TeamDelModal from "./TeamDelModal";
import TeamEditModal from "./TeamEditModal";

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
  const [isEditModalOpen, toggleIsEditModalOpen] = useToggle(false);
  const [isDelModalOpen, toggleIsDelModalOpen] = useToggle(false);

  const imageUrl = teamData?.image || "";
  const currentTeamName = teamData?.name || "";

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

          <TeamEditModal
            isOpen={isEditModalOpen}
            toggleIsOpen={toggleIsEditModalOpen}
            groupId={groupId}
            currentTeamImageUrl={imageUrl}
            currentTeamName={currentTeamName}
          />

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
