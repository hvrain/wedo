import Link from "next/link";

import ActionsDropDown from "@/@common/dropdown/ActionsDropDown";
import { TaskList } from "@/dtos/TaskLists";
import useToggle from "@/hooks/useToggle";
import Kebab from "@/public/svg/kebab.svg";
import ProgressCircle from "@/public/svg/progress.svg";
import ProgressComplete from "@/public/svg/progress_complete.svg";
import { countDoneTaskList } from "@/utils/countDoneTask";

import TeamTaskListDelModal from "./TeamTaskListDelModal";
import TeamTaskListEditModal from "./TeamTaskListEditModal";

interface TeamTaskListCardProps {
  taskList: TaskList;
  isAdmin: boolean;
  groupId: number;
}

export default function TeamTaskListCard({
  taskList,
  isAdmin,
  groupId,
}: TeamTaskListCardProps) {
  const doneTaskCount = countDoneTaskList(taskList);
  const totalTaskCount = taskList.tasks.length;

  // total task가 0이 아니고 완료된 작업이 전체 작업과 같은 경우
  const isCompletedTaskList =
    totalTaskCount && doneTaskCount === totalTaskCount;

  const [isEditModalOpen, toggleIsEditModalOpen] = useToggle(false);
  const [isDelModalOpen, toggleIsDelModalOpen] = useToggle(false);

  // 할 일 목록의 color 값을 바꿔주는 함수
  // 로직은 이후에 다른 방식으로 변경할 수 있을듯
  const taskListColorStylePicker = (id: number) => {
    const COLOR_LIST = ["#a855f7", "#3b82f6", "#5fe8ff", "#ec4899"];

    return { backgroundColor: COLOR_LIST[id % 4] };
  };

  return (
    <div className="relative flex">
      <div
        className="h-10 w-3 shrink-0 rounded-l-[10px]"
        style={taskListColorStylePicker(taskList.id)}
      />
      <div className="md-medium flex h-10 w-full min-w-0 items-center justify-between rounded-r-[10px] bg-dropDown-default pl-3 pr-2 text-default-light">
        <Link
          href={`/${groupId}/tasks/${taskList.id}`}
          className="flex h-full flex-1 items-center truncate pr-2"
        >
          {taskList.name}
        </Link>
        <div className="flex shrink-0 items-center">
          <div className="flex h-[25px] items-center justify-between gap-1 rounded-full bg-brand-secondary-light px-2 py-1">
            {isCompletedTaskList ? <ProgressComplete /> : <ProgressCircle />}
            <div>{`${doneTaskCount}/${totalTaskCount}`}</div>
          </div>
          {isAdmin ? (
            <ActionsDropDown
              onEditHandler={toggleIsEditModalOpen}
              onDeleteHandler={toggleIsDelModalOpen}
            >
              <Kebab width="16" height="16" />
            </ActionsDropDown>
          ) : (
            <Kebab width="16" height="16" />
          )}
        </div>
      </div>

      <TeamTaskListEditModal
        isOpen={isEditModalOpen}
        toggleIsOpen={toggleIsEditModalOpen}
        groupId={groupId}
        taskListId={taskList.id}
        currentName={taskList.name}
      />

      <TeamTaskListDelModal
        isOpen={isDelModalOpen}
        toggleIsOpen={toggleIsDelModalOpen}
        groupId={groupId}
        taskListId={taskList.id}
        currentName={taskList.name}
      />
    </div>
  );
}
