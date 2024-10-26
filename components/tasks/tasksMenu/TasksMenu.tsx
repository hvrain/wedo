"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface Task {
  id: string;
  name: string;
}

interface TaskMenu {
  taskMenu: Task[];
}

export default function TasksMenu({ taskMenu }: TaskMenu) {
  const { teamid, tasklistid } = useParams();

  return (
    <ul className="mb-6 flex gap-2 overflow-x-scroll py-[5px] [&::-webkit-scrollbar]:hidden">
      {taskMenu.map((list) => (
        <li
          className={`rounded-full ${tasklistid === String(list.id) ? "bg-brand-active" : "bg-dropDown-default"}`}
          key={list.id}
        >
          <Link
            href={`/${teamid}/tasks/${list.id}`}
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
