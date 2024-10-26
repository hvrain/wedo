/* eslint-disable @typescript-eslint/no-explicit-any */
import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import BestBadge from "@/components/content/BestBadge";
import CountContent from "@/components/content/Count";
import UserProfile from "@/components/user/Profile";
import { cn } from "@/lib/utils";
import { formatToDotDate } from "@/utils/convertDate";

export default async function BestArticleSection() {
  const getBestArticle = await fetch(
    "https://fe-project-cowokers.vercel.app/8-7/articles?pageSize=3&orderBy=like",
    { next: { revalidate: 3600 } },
  );
  const BestArticles = await getBestArticle.json();

  return (
    <section className="flex flex-col gap-y-6 tab:gap-y-10 pc:gap-y-14">
      <h2 className="lg-bold tab:xl-bold">베스트 게시글</h2>

      <ol className="flex tab:gap-x-4 pc:gap-x-5">
        {BestArticles.list.map((article: any, i: any) => (
          <li
            key={article.id}
            className={cn(
              cva("w-full", {
                variants: {
                  i: {
                    1: "max-tab:hidden",
                    2: "max-pc:hidden",
                  },
                },
              })({ i }),
            )}
          >
            <Link href={`/board/${article.id}`}>
              <article className="relative flex h-44 w-full flex-col justify-between gap-y-4 overflow-hidden rounded-xl bg-primary-light p-4 pt-10 tab:h-56 tab:gap-y-6 tab:px-6 tab:pt-12">
                <header>
                  <BestBadge />

                  {article.image && (
                    <figure className="relative float-right size-16 overflow-hidden rounded-xl tab:size-20">
                      <Image alt="게시글 이미지" src={article.image} fill />
                    </figure>
                  )}

                  <h3 className="line-clamp-3">{article.title}</h3>
                </header>

                <footer className="flex justify-between">
                  <div className="flex items-center gap-x-4">
                    <UserProfile
                      profileImage={null}
                      nickname={article.writer.nickname}
                    />

                    <hr className="h-4 w-px border-0 bg-slate-700" />

                    <time className="xs-medium text-secondary-light tab:md-medium">
                      {formatToDotDate(article.createdAt)}
                    </time>
                  </div>

                  <CountContent content="like" count={article.likeCount} />
                </footer>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
