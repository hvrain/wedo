export interface AddTaskRequest {
  name: string;
  description: string;
  startDate: Date | null | string;
  frequencyType: string;
  monthDay?: number;
  weekDays?: number[];
}

export interface TasksType {
  doneBy?: {
    user?: {
      image: string;
      nickname: string;
      id: number;
    };
  };
  writer?: {
    image: string | null;
    nickname: string;
    id: number;
  };
  displayIndex: number;
  commentCount: number;
  deletedAt: Date | null;
  recurringId: number;
  frequency: string;
  updatedAt: Date;
  doneAt: Date | null;
  date: Date;
  description: string;
  name: string;
  id: number;
}

export interface DoneTaskType {
  displayIndex: number;
  commentCount: number;
  deletedAt: Date | null;
  recurringId: number;
  frequency: string;
  updatedAt: Date;
  doneAt: Date;
  date: Date;
  description: string;
  name: string;
  id: number;
}

export interface Recurring {
  createdAt: string;
  description: string;
  frequencyType: string;
  groupId: number;
  id: number;
  monthDay: number | null;
  name: string;
  startDate: string;
  taskListId: number;
  updatedAt: string;
}

export type TasksDetailType = TasksType & { recurring: Recurring };

export interface TaskUpdateDto {
  name: string;
  description: string;
  done?: boolean;
}

export interface TaskCommentType {
  content: string;
  updateAt: string;
  createdAt: Date;
  id: number;
  taskId: string;
  user: {
    image: string;
    nickname: string;
    id: number;
  };
}
