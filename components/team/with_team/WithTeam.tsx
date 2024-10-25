import Container from "@/components/@common/container/Container";

import TeamMemberList from "./TeamMemberList";
import TeamReport from "./TeamReport";
import TeamTitle from "./TeamTitle";
import TeamTodoList from "./TeamTodoList";

interface WithTeamProps {
  isAdmin: boolean;
  groupId: number;
}

export default function WithTeam({ isAdmin, groupId }: WithTeamProps) {
  return (
    <Container background="white">
      <div className="pb-6 pt-6 pc:pb-8 pc:pt-8">
        <TeamTitle isAdmin={isAdmin} groupId={groupId} />
        <div className="mb-12 mt-6 pc:mb-8 pc:mt-8">
          <TeamTodoList isAdmin={isAdmin} groupId={groupId} />
        </div>
        {isAdmin && <TeamReport groupId={groupId} />}
        <div className="mt-12 pc:mt-8">
          <TeamMemberList isAdmin={isAdmin} groupId={groupId} />
        </div>
      </div>
    </Container>
  );
}
