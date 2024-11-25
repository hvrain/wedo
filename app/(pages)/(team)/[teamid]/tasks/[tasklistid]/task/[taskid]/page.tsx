import { getUser } from "@/apis/user";
import TaskSheet from "@/components/taskdetail/TaskSheet";

export default async function TaskDetailSheet({
  params,
}: {
  params: { teamid: string; tasklistid: string; taskid: string };
}) {
  const res = await getUser();
  const userId = res.id;
  const { teamid, tasklistid, taskid } = params;
  return (
    <TaskSheet
      side="full"
      userId={userId}
      teamid={teamid}
      tasklistid={tasklistid}
      taskid={taskid}
    />
  );
}
