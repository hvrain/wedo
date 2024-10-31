"use server";

import T from "Type/Article";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  getArticleDetail,
  patchArticle,
  patchArticleComment,
  deleteArticle,
  deleteArticleComment,
} from "@/apis/article";

export async function actionGetArticleDetail(articleId: number) {
  return getArticleDetail(articleId);
}

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
