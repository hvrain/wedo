"use server";

export async function getArticle({
  page,
  search,
}: {
  page: number;
  search: {
    orderBy: "recent" | "like";
    keyword: string;
  };
}) {
  const req = new URLSearchParams(search).toString();

  const res = await fetch(
    `https://fe-project-cowokers.vercel.app/8-777/articles?page=${page}&pageSize=20&${req}`,
  );
  const data = await res.json();

  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function searchArticle(prev: any, formData: FormData) {
  const param = {
    orderBy: (() => {
      switch (formData.get("orderBy")) {
        case "최신순":
          return "recent";

        case "인기순":
          return "like";

        // no default
      }
    })() as string,
    keyword: formData.get("keyword") as string,
  };

  const req = new URLSearchParams(param).toString();

  const res = await fetch(
    `https://fe-project-cowokers.vercel.app/8-777/articles?page=1&pageSize=20&${req}`,
  );

  const data = await res.json();

  data.search = {};
  data.search.orderBy = param.orderBy;
  data.search.keyword = param.keyword;

  return data;
}
