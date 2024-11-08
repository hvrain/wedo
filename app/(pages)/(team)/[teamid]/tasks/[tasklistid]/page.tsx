import Tasks from "@/components/tasks/taskList/Tasks";

export default function TasksPage({
  params,
}: {
  params: {
    teamid: string;
    tasklistid: string;
  };
}) {
  const { teamid, tasklistid } = params;
  return <Tasks teamid={teamid} tasklistid={tasklistid} />;
}
