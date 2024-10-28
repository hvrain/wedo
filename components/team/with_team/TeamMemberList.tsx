"use client";

import { GetTeamResponse } from "@/dtos/GroupDtos";

import { PcMemberCard, MobileMemberCard } from "./MemberCard";
import TeamInviteModalButton from "./TeamInviteModalButton";

interface TeamMemberListProps {
  isAdmin: boolean;
  groupId: number;
  teamData: GetTeamResponse | undefined;
}

export default function TeamMemberList({
  isAdmin,
  groupId,
  teamData,
}: TeamMemberListProps) {
  const teamMembers = teamData?.members || [];
  const numberOfMembers = teamMembers.length;

  return (
    <>
      <h2 className="mb-4 flex items-center justify-between pc:mb-5">
        <div className="text-[18px]/[19px] font-semibold text-default-light">
          멤버
          <span className="lg-normal ml-2 text-default-light opacity-80">
            {`(${numberOfMembers}명)`}
          </span>
        </div>
        {isAdmin && <TeamInviteModalButton groupId={groupId} />}
      </h2>
      <div className="pc-and-tablet-grid hidden grid-cols-3 gap-6 tab:grid">
        {teamMembers.map((member) => (
          <PcMemberCard key={member.userEmail} member={member} />
        ))}
      </div>
      <div className="mobile-grid grid grid-cols-2 gap-6 tab:hidden">
        {teamMembers.map((member) => (
          <MobileMemberCard key={member.userEmail} member={member} />
        ))}
      </div>
    </>
  );
}
