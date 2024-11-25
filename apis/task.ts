import {
  AddTaskRequest,
  TasksType,
  TaskUpdateDto,
  TaskCommentType,
} from "@/dtos/TaskDtos";

import fetchExtended from "./fetchExtended";

export async function addTask({
  teamid,
  tasklistid,
  request,
}: {
  teamid: string;
  tasklistid: string;
  request: AddTaskRequest;
}) {
  const body = {
    name: request.name,
    description: request.description,
    startDate: request.startDate ? new Date(request.startDate) : null,
    frequencyType: request.frequencyType,
    monthDay: request.monthDay,
    weekDays: request.weekDays,
  };
  const res = await fetchExtended(
    `/groups/${teamid}/task-lists/${tasklistid}/tasks`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function getTask({
  teamid,
  tasklistid,
  date,
}: {
  teamid: string;
  tasklistid: string;
  date: string | Date;
}): Promise<TasksType[]> {
  const res = await fetchExtended(
    `/groups/${teamid}/task-lists/${tasklistid}/tasks?date=${date}`,
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json;
}

export async function removeTask({
  teamid,
  tasklistid,
  taskid,
}: {
  teamid: string;
  tasklistid: string;
  taskid: string;
}) {
  const res = await fetchExtended(
    `/groups/${teamid}/task-lists/${tasklistid}/tasks/${taskid}`,
    {
      method: "DELETE",
    },
  );
  if (res.status === 204) {
    return;
  }
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message);
  }
}

export async function getDetailTask({
  teamid,
  tasklistid,
  taskid,
}: {
  teamid: string;
  tasklistid: string;
  taskid: string;
}) {
  const res = await fetchExtended(
    `/groups/${teamid}/task-lists/${tasklistid}/tasks/${taskid}`,
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function getTaskComment(
  taskid: string,
): Promise<TaskCommentType[]> {
  const res = await fetchExtended(`/tasks/${taskid}/comments`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function addTaskComment(taskid: string, content: string) {
  const res = await fetchExtended(`/tasks/${taskid}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json;
}

export async function updateTaskComment({
  taskid,
  commentId,
  content,
}: {
  taskid: string;
  commentId: string;
  content: string;
}) {
  const res = await fetchExtended(`/tasks/${taskid}/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function removeTaskComment(taskid: string, commentId: number) {
  const res = await fetchExtended(`/tasks/${taskid}/comments/${commentId}`, {
    method: "DELETE",
  });
  if (res.status === 204) {
    return;
  }
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message);
  }
}

export async function updateTask({
  teamid,
  tasklistid,
  taskid,
  request,
}: {
  teamid: string;
  tasklistid: string;
  taskid: string;
  request: TaskUpdateDto;
}) {
  const body = {
    name: request.name,
    description: request.description,
    done: request.done,
  };

  const res = await fetchExtended(
    `/groups/${teamid}/task-lists/${tasklistid}/tasks/${taskid}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json;
}
