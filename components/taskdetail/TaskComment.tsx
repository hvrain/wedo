"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import { Button } from "@/@common/Button";
import Input from "@/@common/Input";
import ActionsDropDown from "@/@common/dropdown/ActionsDropDown";
import { TaskCommentType } from "@/dtos/TaskDtos";
import useToggle from "@/hooks/useToggle";
import { useUpdateTaskComment } from "@/queries/task";
import { convertDate } from "@/utils/convertDate";

import DeleteCommentModal from "./DeleteCommentModal";

interface TaskCommentProps {
  comment: TaskCommentType;
  userId: number;
}

export default function TaskComment({ comment, userId }: TaskCommentProps) {
  const queryClient = useQueryClient();
  const [isEditCommentFormOpen, toggleEditCommentFormOpen] = useToggle(false);
  const [isDeleteModelOpen, toggleDeleteModalOpen] = useToggle(false);
  const [commentValue, setCommentValue] = useState(comment.content);

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const { mutate: updateTaskComment } = useUpdateTaskComment();
  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    updateTaskComment(
      {
        taskid: comment.taskId,
        commentId: String(comment.id),
        content: commentValue,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["taskList"],
          });
          toggleEditCommentFormOpen();
        },
      },
    );
  };

  return (
    <>
      <article className="border-dropdown-border mb-[20px] max-w-[699px] overflow-hidden border-b pb-[20px]">
        {isEditCommentFormOpen ? (
          <form onSubmit={handleSubmitComment}>
            <Input
              value={commentValue}
              FontSize="sm"
              BgColor="white"
              onChange={handleChangeComment}
            />
            <div className="flex justify-end gap-[12px] py-4 text-right">
              <Button
                type="button"
                onClick={toggleEditCommentFormOpen}
                variant="transparent"
                size="sm"
                className="border-none"
              >
                취소
              </Button>
              <Button variant="outline" size="sm" type="submit">
                수정하기
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-[16px] flex items-center justify-between">
              <p className="max-w-[660px] whitespace-normal text-wrap break-all text-md">
                {comment.content}
              </p>
              {comment.user.id === userId && (
                <ActionsDropDown
                  onEditHandler={toggleEditCommentFormOpen}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                {comment.user.image ? (
                  <Image
                    width={32}
                    height={32}
                    src={comment.user.image}
                    alt={`${comment.user.nickname} 프로필`}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    width={32}
                    height={32}
                    src="/images/default_userImage.png"
                    alt={`${comment.user.nickname} 프로필`}
                  />
                )}
                <span className="text-md">{comment.user.nickname}</span>
              </div>
              <p className="text-md">{convertDate(comment.createdAt)}</p>
            </div>
          </div>
        )}
      </article>
      <DeleteCommentModal
        taskid={comment.taskId}
        commentId={comment.id}
        isOpen={isDeleteModelOpen}
        toggleIsOpen={toggleDeleteModalOpen}
      />
    </>
  );
}
