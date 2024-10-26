"use client";

import { useGetTaskComment } from "@/queries/task";

import TaskComment from "./TaskComment";

export default function TaskCommentList({
  taskid,
  userId,
}: {
  taskid: string;
  userId: number;
}) {
  const { data, isLoading } = useGetTaskComment(taskid);
  return (
    <div className="mt-[32px]">
      {data &&
        !isLoading &&
        data.map((list) => (
          <TaskComment key={list.id} comment={list} userId={userId} />
        ))}
    </div>
  );
}
