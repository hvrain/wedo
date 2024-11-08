import React from "react";

import fetchExtended from "@/apis/fetchExtended";
import Container from "@/components/@common/container/Container";
import AddTaskButtton from "@/components/tasks/addTaskButton/AddTaskButton";
import TasksDate from "@/components/tasks/tasksMenu/TasksDate";
import TasksMenu from "@/components/tasks/tasksMenu/TasksMenu";

interface TasksProps {
  children: React.ReactNode;
  params: { teamid: string };
}

export default async function TasksLayout({ children, params }: TasksProps) {
  const { teamid } = params;
  const res = await fetchExtended(`/groups/${teamid}`);
  const data = await res.json();
  const taskList = data.taskLists;

  return (
    <Container background="white">
      <div className="mt-10">
        <h2 className="mb-6 text-xl font-bold">할 일 리스트</h2>
        <TasksDate />
        <TasksMenu taskMenu={taskList} />
        {children}
      </div>
      <AddTaskButtton />
    </Container>
  );
}
