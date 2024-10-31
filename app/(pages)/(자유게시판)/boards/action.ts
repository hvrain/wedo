"use server";

import T from "Type/Article";

import { getArticle } from "@/apis/article";

export async function actionGetArticle(query: T.Query) {
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
    orderBy: (() => {
      switch (formData.get("orderBy")) {
        case "최신순":
          return "recent";

        case "인기순":
          return "like";

        // no default
      }
    })() as "recent" | "like",
    keyword: formData.get("keyword") as string,
  };

  const data = await getArticle(query);

  data.query = query;

  return data;
}
