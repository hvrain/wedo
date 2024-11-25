"use server";

import T from "Type/Article";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  postArticleComment,
  patchArticle,
  patchArticleComment,
  deleteArticle,
  deleteArticleComment,
} from "@/apis/article";

export async function actionPatchArticle(
  articleId: string,
  param: T.ArticleContent,
) {
  await patchArticle(articleId, param);

  revalidatePath("/", "layout");
}

export async function actionPatchArticleComment(
  id: {
    articleId: string;
    commentId: string;
  },
  param: T.ArticleContent,
) {
  await patchArticleComment(id.commentId, param);

  revalidatePath(`/board/${id.articleId}`);
}

export async function actionDeleteArticle(articleId: string) {
  await deleteArticle(articleId);

  revalidatePath("/", "layout");
  redirect("/boards");
}

export async function actionDeleteArticleComment(id: {
  articleId: string;
  commentId: string | null;
}) {
  await deleteArticleComment(id.commentId!);

  revalidatePath(`/board/${id.articleId}`);
}

export async function addArticleComment(articleId: string, formData: FormData) {
  const req = {
    content: formData.get("content") as string,
  };

  await postArticleComment(articleId, req);

  revalidatePath(`/board/${articleId}`);
}
