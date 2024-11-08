import T from "Type/Article";
import Link from "next/link";

import Container from "@/@common/container/Container";
import { cn } from "@/lib/utils";

import { actionGetArticle } from "./action";
import ArticleSection from "./section/Article";
import BestArticleSection from "./section/BestArticle";

export default async function Boards({
  searchParams: { orderBy, keyword },
}: {
  searchParams: T.Query;
}) {
  const defaultArticles = await actionGetArticle({
    page: "1",
    pageSize: "10",
    orderBy,
    keyword,
  });

  return (
    <Container
      background="white"
      className="flex flex-col gap-y-6 py-8 tab:gap-y-8 tab:pt-10 pc:gap-y-10"
    >
      <h1 className="2lg-bold tab:2xl-bold">자유게시판</h1>

      <ArticleSection Articles={defaultArticles}>
        <BestArticleSection />
      </ArticleSection>

      <Link
        className={cn([
          "fixed bottom-8 right-6 pc:right-[calc(50%-600px+24px)]",
          "flex items-center justify-center",
          "h-12 w-[104px]",
          "rounded-full",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]",
          "lg-semibold",
          "text-default-light",
          "bg-button-default hover:bg-button-hover active:bg-button-active",
        ])}
        href="/addboard"
      >
        + 글쓰기
      </Link>
    </Container>
  );
}
