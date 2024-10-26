"use client";

import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

import { useGetTaskList } from "@/queries/task";
import { formatToHyphenDate } from "@/utils/convertDate";

import TaskCard from "./TaskCard";

export default function Tasks({
  teamid,
  tasklistid,
}: {
  teamid: string;
  tasklistid: string;
}) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const today = formatToHyphenDate(dayjs());
  const datePrams = date || today;

  const { data, isLoading, isError, error } = useGetTaskList(
    teamid,
    tasklistid,
    datePrams,
  );

  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      {data && data.length > 0 ? (
        data.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className="flex h-full items-center justify-center pt-40 text-center">
          아직 할 일이 없습니다. <br /> 할 일을 추가해보세요.
        </p>
      )}
    </div>
  );
}
