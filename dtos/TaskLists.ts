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

export interface TaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

export interface AddTaskListResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  displayIndex: number;
}

export interface EditTaskListResponse extends AddTaskListResponse {
  groupId: number;
}
