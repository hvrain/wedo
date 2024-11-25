import { TaskList } from "@/dtos/TaskLists";

// User와 Task는 이후에 dto 추가 되면 import해서 사용 예정
interface User {
  id: number;
  nickname: string;
  image: null | string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: null | string;
  updatedAt: string;
  user: null | User;
  recurringId: string;
  deletedAt: null | string;
  displayIndex: number;
  writer: User;
  doneBy: null | User;
  commentCount: number;
  frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
}

// task의 완료 여부를 체크하는 함수
// 이후에 delete와 연관 지어서 어떤식으로 해야할 지는 논의 필요 (삭제되었는데 완료된 경우, 삭제되었는데 완료되지 않은 경우)
export function checkDoneTask(task: Task) {
  if (task.doneAt) return "Done";
  return "notDone";
}

// 각각의 할 일 목록에 대해서 완료된 task의 갯수를 count하는 함수
export function countDoneTaskList(taskList: TaskList) {
  return taskList.tasks.filter((task) => checkDoneTask(task) === "Done").length;
}

// 전체 할 일 목록에 대해서 총 task의 갯수와 완료된 task의 갯수를 count하는 함수
export function countTaskList(taskLists: TaskList[]) {
  return taskLists.reduce(
    (acc, taskList) => {
      const doneTasksCount = countDoneTaskList(taskList);
      const totalTasksCount = taskList.tasks.length;

      return {
        totalDoneTasks: acc.totalDoneTasks + doneTasksCount,
        totalTasks: acc.totalTasks + totalTasksCount,
      };
    },
    { totalDoneTasks: 0, totalTasks: 0 },
  );
}
