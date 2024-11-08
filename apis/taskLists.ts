import { AddTaskListResponse, EditTaskListResponse } from "@/dtos/TaskLists";

import fetchExtended from "./fetchExtended";

export async function addTaskList({
  groupId,
  taskListName,
}: {
  groupId: number;
  taskListName: string;
}): Promise<AddTaskListResponse> {
  const res = await fetchExtended(`/groups/${groupId}/task-lists`, {
    method: "POST",
    body: JSON.stringify({ name: taskListName }),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function editTaskList({
  groupId,
  taskListId,
  taskListName,
}: {
  groupId: number;
  taskListId: number;
  taskListName: string;
}): Promise<EditTaskListResponse> {
  const res = await fetchExtended(
    `/groups/${groupId}/task-lists/${taskListId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ name: taskListName }),
    },
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function delTaskList({
  groupId,
  taskListId,
}: {
  groupId: number;
  taskListId: number;
}) {
  const res = await fetchExtended(
    `groups/${groupId}/task-lists/${taskListId}`,
    { method: "DELETE" },
  );

  if (res.status === 204) {
    return;
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
}
