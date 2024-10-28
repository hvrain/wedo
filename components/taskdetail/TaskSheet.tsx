"use client";

import { useState, useEffect, MouseEvent } from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/@common/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/tasksheet";
import { TaskUpdateDto } from "@/dtos/TaskDtos";
import { useGetDetailTask, useUpdateTask } from "@/queries/task";

import TaskCommentForm from "./TaskCommentForm";
import TaskCommentList from "./TaskCommentList";
import TaskDetail from "./TaskDetail";

const INITIAL_TASK_DATA: TaskUpdateDto = {
  name: "",
  description: "",
  done: false,
};

export default function TaskSheet({
  teamid,
  tasklistid,
  taskid,
  userId,
}: {
  teamid: string;
  tasklistid: string;
  taskid: string;
  userId: number;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [taskData, setTaskData] = useState(INITIAL_TASK_DATA);
  const { data, isLoading } = useGetDetailTask(teamid, tasklistid, taskid);
  const { mutate: updateTasks } = useUpdateTask();

  useEffect(() => {
    if (data) {
      setTaskData({
        name: data?.name,
        description: data?.description,
        done: data?.doneAt,
      });
    }
  }, [data]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  const handleCheckTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const requestData = {
      name: taskData?.name,
      description: taskData?.description,
      done: !data.doneAt,
    };

    updateTasks(
      { teamid, tasklistid, taskid, request: requestData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["taskList"],
          });
        },
      },
    );
  };

  const handleRoute = () => {
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <Sheet defaultOpen onOpenChange={handleRoute}>
      <SheetHeader>
        <VisuallyHidden.Root>
          <SheetTitle>할 일 리스트 제목</SheetTitle>
          <SheetDescription className="flex h-[300px] flex-col items-center justify-between">
            할 일 리스트 메모
          </SheetDescription>
        </VisuallyHidden.Root>
      </SheetHeader>
      <SheetContent className="max-[1200px] overflow-y-auto px-4 tab:px-6 pc:px-10">
        <div className="overflow-auto">
          <TaskDetail userId={userId} data={data} />
          <TaskCommentForm taskid={taskid} />
          <TaskCommentList userId={userId} taskid={taskid} />
        </div>
        {data?.doneAt ? (
          <Button
            variant="floating"
            className="fixed bottom-8 right-2 border border-solid border-danger bg-inverse"
            size="low"
            onClick={handleCheckTask}
          >
            <Image
              width={16}
              height={16}
              src="/images/check.png"
              alt="체크 아이콘"
            />
            <span className="text-danger">완료 취소하기</span>
          </Button>
        ) : (
          <Button
            variant="floating"
            className="fixed bottom-8 right-2 bg-brand-check"
            size="low"
            onClick={handleCheckTask}
          >
            <Image
              width={16}
              height={16}
              src="/images/check.png"
              alt="체크 아이콘"
            />
            <span>완료 하기</span>
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
