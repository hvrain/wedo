import fetchExtended from "@/apis/fetchExtended";

export async function postArticle(param: {
  title: string;
  content: string;
  image?: string;
}): Promise<{
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  writer: { id: number; nickname: string };
  likeCount: number;
}> {
  const res = await fetchExtended("/articles", {
    method: "POST",
    body: JSON.stringify(param),
  });

  const data = await res.json();

  return data;
}

export async function deleteArticle(
  articleId: number,
): Promise<{ id: number }> {
  const res = await fetchExtended(`/articles/${articleId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
}
