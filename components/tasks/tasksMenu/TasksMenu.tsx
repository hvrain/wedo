"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatToHyphenDate } from "@/utils/convertDate";

interface Task {
  id: string;
  name: string;
}

interface TaskMenu {
  taskMenu: Task[];
}

export default function TasksMenu({ taskMenu }: TaskMenu) {
  const { teamid, tasklistid } = useParams();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") ?? formatToHyphenDate(dayjs());
  return (
    <ul className="pc:[&::-webkit-scrollbar] mb-6 flex gap-2 overflow-x-scroll py-[5px] pc:flex-wrap [&::-webkit-scrollbar]:hidden">
      {taskMenu.map((list) => (
        <li
          className={`rounded-full ${tasklistid === String(list.id) ? "bg-brand-active" : "bg-dropDown-default"}`}
          key={list.id}
        >
          <Link
            replace
            href={`/${teamid}/tasks/${list.id}?date=${date}`}
            className={`block w-full min-w-[60px] whitespace-nowrap px-2.5 py-1 text-center text-lg ${tasklistid === String(list.id) ? "font-bold text-default-light" : "font-medium text-placeHolder"}`}
          >
            {list.name}
          </Link>
        </li>
      ))}
      <li />
    </ul>
  );
}
