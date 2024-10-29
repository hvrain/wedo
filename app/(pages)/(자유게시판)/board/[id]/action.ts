"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  patchArticle,
  patchArticleComment,
  deleteArticle,
  deleteArticleComment,
} from "@/apis/article";
import T from "@/dtos/Article";

export async function actionPatchArticle(
  articleId: number,
  param: T.ArticleContent,
) {
  await patchArticle(articleId, param);

  revalidatePath("/", "layout");
}

export async function actionPatchArticleComment(
  id: {
    articleId: number;
    commentId: number;
  },
  param: T.ArticleContent,
) {
  await patchArticleComment(id.commentId, param);

  revalidatePath(`/board/${id.articleId}`);
}

export async function actionDeleteArticle(articleId: number) {
  await deleteArticle(articleId);

  revalidatePath("/", "layout");
  redirect("/boards");
}

export async function actionDeleteArticleComment(id: {
  articleId: number;
  commentId: number | null;
}) {
  await deleteArticleComment(id.commentId!);

  revalidatePath(`/board/${id.articleId}`);
}
