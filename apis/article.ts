import T from "Type/Article";

import fetchExtended from "@/apis/fetchExtended";

async function fetchArticle<P>({
  baseUrl = "articles",
  url = "",
  method = "GET",
  body,
}: {
  baseUrl?: "articles" | "comments";
  url?: string;
  method?: string;
  body?: T.ArticleContent;
}): Promise<P> {
  const res = await fetchExtended(`/${baseUrl}${url}`, {
    method,
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${res.status}: ${data.message}`);
  }

  return data;
}

export function getArticle(query: T.Query): Promise<T.Articles> {
  const param = new URLSearchParams(query).toString();

  return fetchArticle({
    url: `?${param}`,
  });
}

export function postArticle(param: T.ArticleContent): Promise<T.Article> {
  return fetchArticle({
    method: "POST",
    body: param,
  });
}

export function getArticleDetail(articleId: string): Promise<T.ArticleDetail> {
  return fetchArticle({
    url: `/${articleId}`,
  });
}

export function patchArticle(
  articleId: string,
  param: T.ArticleContent,
): Promise<T.ArticleDetail> {
  return fetchArticle({
    url: `/${articleId}`,
    method: "PATCH",
    body: param,
  });
}

export function deleteArticle(articleId: string): Promise<T.Delete> {
  return fetchArticle({
    url: `/${articleId}`,
    method: "DELETE",
  });
}

export function postArticleLike(articleId: string): Promise<T.ArticleDetail> {
  return fetchArticle({
    url: `/${articleId}/like`,
    method: "POST",
  });
}

export function deleteArticleLike(articleId: string): Promise<T.Delete> {
  return fetchArticle({
    url: `/${articleId}/like`,
    method: "DELETE",
  });
}

export function getArticleComment(
  articleId: string,
  query?: {
    cursor: number | null;
  },
): Promise<T.Comments> {
  return fetchArticle({
    url: `/${articleId}/comments?limit=10&${query ?? ""}`,
  });
}

export function postArticleComment(
  articleId: string,
  param: {
    content: string;
  },
): Promise<T.Comment> {
  return fetchArticle({
    url: `/${articleId}/comments`,
    method: "POST",
    body: param,
  });
}

export function patchArticleComment(
  commentId: string,
  param: {
    content: string;
  },
): Promise<T.Comment> {
  return fetchArticle({
    baseUrl: "comments",
    url: `/${commentId}`,
    method: "PATCH",
    body: param,
  });
}

export function deleteArticleComment(commentId: string): Promise<T.Delete> {
  return fetchArticle({
    baseUrl: "comments",
    url: `/${commentId}`,
    method: "DELETE",
  });
}
