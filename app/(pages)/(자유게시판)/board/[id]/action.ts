"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteArticle } from "@/apis/article";
import { deleteComment } from "@/apis/articleComment";

export async function handleDeleteArticle(articleId: number) {
  await deleteArticle(articleId);

  revalidatePath("/", "layout");
  redirect("/boards");
}

export async function handleDeleteComment(id: {
  articleId: number;
  commentId: number | null;
}) {
  await deleteComment(id.commentId!);

  revalidatePath(`/board/${id.articleId}`);
}
