import Image from "next/image";

import { DoneTaskType } from "@/dtos/TaskDtos";

interface DonTaskProps {
  task: DoneTaskType;
}

export default function DoneTask({ task }: DonTaskProps) {
  return (
    <article className="flex w-full flex-col gap-2.5 rounded-xl bg-dropDown-default px-3.5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Image
            width={24}
            height={24}
            src="/images/checkbox_on.png"
            alt="체크박스"
          />
          <h2 className={`text-md ${task.doneAt && "line-through"}`}>
            {task.name}
          </h2>
        </div>
      </div>
    </article>
  );
}
