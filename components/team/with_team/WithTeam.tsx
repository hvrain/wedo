"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import Container from "@/components/@common/container/Container";
import { useGetTeam } from "@/queries/group";

import TeamMemberList from "./TeamMemberList";
import TeamReport from "./TeamReport";
import TeamTitle from "./TeamTitle";
import TeamTodoList from "./TeamTodoList";

interface WithTeamProps {
  isAdmin: boolean;
  groupId: number;
}

export default function WithTeam({ isAdmin, groupId }: WithTeamProps) {
  const queryClient = useQueryClient();

  const { data } = useGetTeam(groupId, "always");

  // 팀 페이지에 들어올 때 마다 useEffect를 이용해 쿼리를 무효화
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["team", groupId] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  return (
    <Container background="white">
      <div className="pb-6 pt-6 pc:pb-8 pc:pt-8">
        <TeamTitle isAdmin={isAdmin} groupId={groupId} teamData={data} />
        <div className="mb-12 mt-6 pc:mb-8 pc:mt-8">
          <TeamTodoList isAdmin={isAdmin} groupId={groupId} teamData={data} />
        </div>
        {isAdmin && <TeamReport teamData={data} />}
        <div className="mt-12 pc:mt-8">
          <TeamMemberList isAdmin={isAdmin} groupId={groupId} teamData={data} />
        </div>
      </div>
    </Container>
  );
}
