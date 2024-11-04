"use server";

import T from "Type/Article";

import { getArticle } from "@/apis/article";

export async function actionGetArticle(param: T.Query) {
  const query: T.Query = {
    page: param.page,
    pageSize: param.pageSize,
    orderBy: param.orderBy === "like" ? param.orderBy : "recent",
    keyword: param.keyword || "",
  };
  const data = await getArticle(query);

  data.query = query;

  return data;
}

export async function actionSearchArticle(
  prev: T.Articles,
  formData: FormData,
) {
  const query: T.Query = {
    page: "1",
    pageSize: prev.query.pageSize,
    orderBy: formData.get("orderBy") === "like" ? "like" : "recent",
    keyword: formData.get("keyword") as string,
  };

  const data = await getArticle(query);

  data.query = query;

  return data;
}
