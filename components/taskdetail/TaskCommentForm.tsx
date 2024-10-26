"use clinet";

import { ChangeEvent, FormEvent, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import Textarea from "@/@common/Textarea";
import { useAddTaskComment } from "@/queries/task";

export default function TaskCommentForm({ taskid }: { taskid: string }) {
  const queryClient = useQueryClient();
  const { mutate: addTaskComment } = useAddTaskComment();
  const [content, setContent] = useState("");

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    addTaskComment(
      { taskid, content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["taskList"],
          });
          setContent("");
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmitComment}>
      <div className="flex w-full items-center justify-center rounded-xl bg-input-default">
        <Textarea
          className="bg-transparent text-md"
          BoxSize="sm"
          name="content"
          placeholder="댓글을 달아주세요."
          value={content ?? ""}
          onChange={handleChangeComment}
        />
        <button
          disabled={!content}
          className="mr-[12px] inline-block h-[24px] w-[24px] rounded-full bg-brand-primary-light p-1 disabled:bg-[#888888]"
        >
          <span>
            <Image
              width={16}
              height={16}
              src="/images/enter.png"
              alt="엔터 아이콘"
            />
          </span>
        </button>
      </div>
    </form>
  );
}
