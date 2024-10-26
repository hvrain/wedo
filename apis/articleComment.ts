import fetchExtended from "@/apis/fetchExtended";

export async function postArticleComment(
  articleId: number,
  param: {
    content: string;
  },
): Promise<{
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
}> {
  const res = await fetchExtended(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify(param),
  });

  const data = await res.json();

  return data;
}

export async function deleteComment(
  commentId: number,
): Promise<{ id: number }> {
  const res = await fetchExtended(`/comments/${commentId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
}
