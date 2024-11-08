"use client";

import { useRef } from "react";

import { Button } from "@/components/@common/Button";
import Textarea from "@/components/@common/Textarea";

import { addArticleComment } from "./action";

export default function CommentForm({ articleId }: { articleId: string }) {
  const formAction = addArticleComment.bind(null, articleId);
  const ref = useRef<HTMLTextAreaElement>(null);

  if (ref.current) {
    ref.current.value = "";
  }

  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <label
        htmlFor="boardContentTextarea"
        className="lg-medium flex flex-col gap-y-4 text-default-light tab:xl-bold tab:gap-y-6"
      >
        댓글달기
        <Textarea
          id="boardContentTextarea"
          name="content"
          Padding="lg"
          BoxSize="md"
          placeholder="댓글을 입력해주세요."
          ref={ref}
          required
        />
      </label>

      <Button
        type="submit"
        size="sm"
        className="w-20 self-end tab:lg-semibold tab:h-12 tab:w-48"
      >
        등록
      </Button>
    </form>
  );
}
