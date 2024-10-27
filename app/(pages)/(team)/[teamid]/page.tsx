import { notFound } from "next/navigation";

import { getTeamMember } from "@/apis/group";
import { getUser } from "@/apis/user";
import NoAccess from "@/components/team/unavailable_team/NoAccess";
import NoTeam from "@/components/team/unavailable_team/NoTeam";
import WithTeam from "@/components/team/with_team/WithTeam";

export default async function TeamPage({
  params,
}: {
  params: { teamid: string };
}) {
  const res = await getUser();
  const hasTeam = res.memberships.length !== 0;

  if (!hasTeam) return <NoTeam />;

  const userId = res.id;
  const groupId = Number(params.teamid);

  let isAdmin = false;
  try {
    const { role } = await getTeamMember({ groupId, memberUserId: userId });
    isAdmin = role === "ADMIN";
  } catch (error) {
    const e = error as { message: string };
    if (e.message === "그룹에 소속된 유저가 아닙니다.") {
      return <NoAccess />;
    }
    // 이외의 경우엔 별도의 error page가 없기 때문에 우선은 notFound로 return
    return notFound();
  }

  return <WithTeam isAdmin={isAdmin} groupId={groupId} />;
}
