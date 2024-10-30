"use client";

import { GetTeamResponse } from "@/dtos/GroupDtos";

import TeamTaskListAddModalButton from "./TeamTaskListAddModalButton";
import TeamTaskListCard from "./TeamTaskListCard";

interface TeamTodoListProps {
  isAdmin: boolean;
  groupId: number;
  teamData: GetTeamResponse | undefined;
}

export default function TeamTodoList({
  isAdmin,
  groupId,
  teamData,
}: TeamTodoListProps) {
  const taskLists = teamData?.taskLists || [];
  const numberOfTaskLists = taskLists.length;

  return (
    <>
      <h2 className="mb-4 flex items-center justify-between pc:mb-5">
        <div className="text-[18px]/[19px] font-semibold text-default-light">
          할 일 목록
          <span className="lg-normal ml-2 text-default-light opacity-80">
            {`(${numberOfTaskLists}개)`}
          </span>
        </div>
        {isAdmin && <TeamTaskListAddModalButton groupId={groupId} />}
      </h2>
      {numberOfTaskLists ? (
        <div className="flex flex-col gap-4">
          {taskLists.map((taskList) => (
            <TeamTaskListCard
              key={taskList.id}
              taskList={taskList}
              isAdmin={isAdmin}
              groupId={groupId}
            />
          ))}
        </div>
      ) : (
        <div className="md-medium flex h-32 items-center justify-center text-default-light">
          아직 할 일 목록이 없습니다.
        </div>
      )}
    </>
  );
}
