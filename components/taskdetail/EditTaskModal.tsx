import { MouseEvent, ChangeEvent, useState, useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/@common/Button";
import Input from "@/@common/Input";
import Textarea from "@/@common/Textarea";
import Modal from "@/@common/modal/Modal";
import { Recurring } from "@/dtos/TaskDtos";
import { useUpdateTask } from "@/queries/task";

interface EditTaskModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  task: Recurring;
  taskId: number;
  taskName: string;
  description: string;
  done: Date | null;
}

export default function EditTaskModal({
  isOpen,
  toggleIsOpen,
  task,
  taskId,
  taskName,
  description,
  done,
}: EditTaskModalProps) {
  const queryClient = useQueryClient();

  const { mutate: updateTasks } = useUpdateTask();
  const [errorMessage, setErrorMessage] = useState("");
  const [taskData, setTaskData] = useState({
    name: taskName,
    description,
    done: !!done,
  });

  useEffect(() => {
    setTaskData((prevData) => ({
      ...prevData,
      done: !!done,
    }));
  }, [done]);

  const handleChangeComment = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (taskData.name.trim() === "") {
      e.stopPropagation();
      setErrorMessage("할 일 제목을 입력해주세요.");
      return;
    }
    if (taskData.name.trim().length > 30) {
      e.stopPropagation();
      setErrorMessage("제목은 30자 미만으로 작성해주세요.");
      return;
    }
    if (taskData.description.trim() === "") {
      e.stopPropagation();
      setErrorMessage("할 일 메모를 입력해주세요.");
      return;
    }
    if (taskData.description.trim().length > 255) {
      e.stopPropagation();
      setErrorMessage("255자 미만으로 작성해주세요.");
      return;
    }
    const requestData = {
      name: taskData?.name,
      description: taskData?.description,
      done: taskData?.done,
    };

    updateTasks(
      {
        teamid: String(task.groupId),
        tasklistid: String(task.taskListId),
        taskid: String(taskId),
        request: requestData,
      },
      {
        onError: (error) => {
          e.stopPropagation();
          setErrorMessage(error.message);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["taskList"],
          });
          setErrorMessage("");
        },
      },
    );
  };

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={toggleIsOpen}
      footer={
        <>
          <Button className="flex-1" variant="outlinedSecondary">
            닫기
          </Button>
          <Button className="flex-1" variant="default" onClick={handleEditTask}>
            수정 하기
          </Button>
        </>
      }
    >
      <div>
        <h2 className="lg-medium mb-2 text-center text-default-light">
          할 일 수정 하기
        </h2>
        <div>
          <div className="mb-4">
            <label id="name" htmlFor="name" className="mb-[8px] block">
              할 일 제목
            </label>
            <Input
              type="text"
              name="name"
              placeholder="할 일 제목을 입력해주세요."
              value={taskData.name}
              onChange={handleChangeComment}
            />
          </div>
          <div>
            <label
              id="description"
              htmlFor="description"
              className="mb-[8px] block"
            >
              할 일 메모
            </label>
            <Textarea
              name="description"
              placeholder="할 일 메모를 입력해주세요."
              value={taskData.description}
              onChange={handleChangeComment}
            />
          </div>
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
    </Modal>
  );
}
