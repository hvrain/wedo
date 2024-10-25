"use client";

import Image from "next/image";

import { useGetTeam } from "@/queries/group";
import { countTaskList } from "@/utils/countDoneTask";

import TodoReportChartSide from "./TodoReportChartSide";

interface TeamTodoReportBoxProps {
  title: string;
  count: number;
  imgSrc: string;
}

function TeamTodoReportBox({ title, count, imgSrc }: TeamTodoReportBoxProps) {
  return (
    <div className="flex w-[142px] items-center justify-between rounded-xl bg-brand-secondary-light px-4 py-4 tab:w-[280px] pc:w-[400px]">
      <div>
        <div className="xs-medium mb-1 text-default-light tab:md-medium">
          {title}
        </div>
        <div className="2xl-bold text-default-light">{count}개</div>
      </div>
      <Image width={44} height={44} src={imgSrc} alt={title} />
    </div>
  );
}

interface TeamReportProps {
  groupId: number;
}

export default function TeamReport({ groupId }: TeamReportProps) {
  const { data } = useGetTeam(groupId);

  const taskLists = data?.taskLists || [];
  const { totalDoneTasks: doneTasksCount, totalTasks: tasksCount } =
    countTaskList(taskLists);

  return (
    <>
      <h2 className="mb-4 text-[18px]/[19px] font-semibold text-default-light">
        리포트
      </h2>
      <div className="flex h-[224px] items-center justify-between rounded-[20px] bg-dropDown-default px-6 py-4">
        <div className="flex items-center justify-center gap-11">
          <TodoReportChartSide
            tasksCount={tasksCount}
            doneTasksCount={doneTasksCount}
          />
        </div>
        <div className="flex flex-col gap-4">
          <TeamTodoReportBox
            title="오늘의 할 일"
            count={tasksCount}
            imgSrc="/images/team_page_default_user_pfp.png"
          />
          <TeamTodoReportBox
            title="한 일"
            count={doneTasksCount}
            imgSrc="/images/team_page_done.png"
          />
        </div>
      </div>
    </>
  );
}
