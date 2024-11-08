"use client";

import Image from "next/image";

import ActionsDropDown from "@/@common/dropdown/ActionsDropDown";
import { getFrequencyType } from "@/constants/frequencyType";
import { TasksDetailType } from "@/dtos/TaskDtos";
import useToggle from "@/hooks/useToggle";
import {
  formatToDotDate,
  formatToKorDate,
  formatKorStartTime,
} from "@/utils/convertDate";

import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";

interface TaskDetailProps {
  data: TasksDetailType;
  userId: number;
}

export default function TaskDetail({ data, userId }: TaskDetailProps) {
  const [isEditModelOpen, toggleEditModalOpen] = useToggle(false);
  const [isDeleteModelOpen, toggleDeleteModalOpen] = useToggle(false);
  return (
    <>
      <div className="mb-[24px] mt-[56px] flex-row">
        {data?.doneAt && (
          <div className="mb-4 flex">
            <div className="flex items-center gap-[6px] rounded-full bg-brand-check px-3 py-1">
              <Image
                width={16}
                height={16}
                src="/images/check.png"
                alt="체크 아이콘"
              />
              <span className="text-md text-placeHolder">완료</span>
            </div>
          </div>
        )}
        <div className="mb-[16px] flex items-center justify-between">
          <h2 className={`${data?.doneAt && "line-through"}`}>{data?.name}</h2>
          {userId === data.writer?.id && (
            <ActionsDropDown
              onEditHandler={toggleEditModalOpen}
              onDeleteHandler={toggleDeleteModalOpen}
            >
              <Image
                width={16}
                height={16}
                src="/images/kebab.png"
                alt="케밥 아이콘"
              />
            </ActionsDropDown>
          )}
        </div>
        <div className="mb-[16px] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            {data.writer?.image ? (
              <Image
                width={32}
                height={32}
                src={data.writer.image}
                alt={`${data.writer.nickname} 프로필`}
                className="rounded-full"
              />
            ) : (
              <Image
                width={32}
                height={32}
                src="/images/default_userImage.png"
                alt={`${data.writer?.nickname} 프로필`}
                className="rounded-full"
              />
            )}
            <span>{data?.writer?.nickname}</span>
          </div>
          <span>{formatToDotDate(data?.date)}</span>
        </div>
        <div>
          <div className="flex items-center gap-[10px] text-xs">
            <div className="flex items-center gap-[6px]">
              <Image
                width={16}
                height={16}
                src="/images/icon_calendar.png"
                alt="달력 아이콘"
              />
              <span>{formatToKorDate(data?.updatedAt)}</span>
            </div>
            <span className="block h-[9px] w-[1px] bg-primary-dark" />
            <div className="flex items-center gap-[6px]">
              <Image
                width={16}
                height={16}
                src="/images/icon_time.png"
                alt="시계 아이콘"
              />
              <span>{formatKorStartTime(data?.updatedAt)}</span>
            </div>
            <span className="block h-[9px] w-[1px] bg-primary-dark" />
            <div className="flex items-center gap-[6px]">
              <Image
                width={16}
                height={16}
                src="/images/icon_repeat.png"
                alt="반복 아이콘"
              />
              <span>{getFrequencyType(data?.frequency)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[20px] min-h-[183px]">
        <p className="text-md">{data?.description}</p>
      </div>
      <DeleteTaskModal
        isOpen={isDeleteModelOpen}
        toggleIsOpen={toggleDeleteModalOpen}
        recurring={data?.recurring}
        taskId={data?.id}
      />
      <EditTaskModal
        isOpen={isEditModelOpen}
        toggleIsOpen={toggleEditModalOpen}
        task={data.recurring}
        taskId={data.id}
        taskName={data?.name}
        description={data?.description}
        done={data?.doneAt}
      />
    </>
  );
}
