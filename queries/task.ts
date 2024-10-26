import { useQuery, useMutation } from "@tanstack/react-query";

import {
  addTask,
  getTask,
  getDetailTask,
  getTaskComment,
  addTaskComment,
  updateTask,
  removeTaskComment,
  removeTask,
  updateTaskComment,
} from "@/apis/task";
import { AddTaskRequest, TaskUpdateDto } from "@/dtos/TaskDtos";

export function useAddTask() {
  return useMutation({
    mutationFn: ({
      teamid,
      tasklistid,
      request,
    }: {
      teamid: string;
      tasklistid: string;
      request: AddTaskRequest;
    }) => addTask({ teamid, tasklistid, request }),
  });
}

export function useGetTaskList(
  teamid: string,
  tasklistid: string,
  date: string | Date,
) {
  return useQuery({
    queryKey: ["taskList", teamid, tasklistid, date],
    queryFn: () => getTask({ teamid, tasklistid, date }),
  });
}

export function useGetDetailTask(
  teamid: string,
  tasklistid: string,
  taskid: string,
) {
  return useQuery({
    queryKey: ["taskList"],
    queryFn: () => getDetailTask({ teamid, tasklistid, taskid }),
  });
}

export function useGetTaskComment(taskid: string) {
  return useQuery({
    queryKey: ["taskList", taskid],
    queryFn: () => getTaskComment(taskid),
  });
}

export function useAddTaskComment() {
  return useMutation({
    mutationFn: ({ taskid, content }: { taskid: string; content: string }) =>
      addTaskComment(taskid, content),
  });
}

export function useUpdateTask() {
  return useMutation({
    mutationFn: ({
      teamid,
      tasklistid,
      taskid,
      request,
    }: {
      teamid: string;
      tasklistid: string;
      taskid: string;
      request: TaskUpdateDto;
    }) => updateTask({ teamid, tasklistid, taskid, request }),
  });
}

export function useUpdateTaskComment() {
  return useMutation({
    mutationFn: ({
      taskid,
      commentId,
      content,
    }: {
      taskid: string;
      commentId: string;
      content: string;
    }) => updateTaskComment({ taskid, commentId, content }),
  });
}

export function useDeleteTaskComment() {
  return useMutation({
    mutationFn: ({
      taskid,
      commentId,
    }: {
      taskid: string;
      commentId: number;
    }) => removeTaskComment(taskid, commentId),
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: ({
      teamid,
      tasklistid,
      taskid,
    }: {
      teamid: string;
      tasklistid: string;
      taskid: string;
    }) => removeTask({ teamid, tasklistid, taskid }),
  });
}
