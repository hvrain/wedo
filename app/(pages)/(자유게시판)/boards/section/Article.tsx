"use client";

import { useState, useEffect, ReactElement } from "react";
import { useFormState } from "react-dom";
import { useInView } from "react-intersection-observer";

import T from "Type/Article";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/@common/Button";
import Input from "@/components/@common/Input";
import CountContent from "@/components/content/Count";
import UserProfile from "@/components/user/Profile";
import Search from "@/public/svg/search.svg";
import Toggle from "@/public/svg/toggle.svg";
import { formatToDotDate } from "@/utils/convertDate";

import { actionGetArticle, actionSearchArticle } from "../action";

export default function ArticleSection({
  Articles,
  children,
}: {
  Articles: T.Articles;
  children: ReactElement;
}) {
  const [state, formAction] = useFormState(actionSearchArticle, Articles);
  const [articles, setArticle] = useState(state);
  const [ref, inView] = useInView();
  const [isVisible, setIsVisible] = useState(false);
  const [orderBy, setOrderBy] = useState({
    current: "최신순",
    option: ["최신순", "인기순"],
  });

  useEffect(() => {
    setArticle(state);
  }, [state]);

  useEffect(() => {
    if (inView) {
      (async () => {
        const newArticle = await actionGetArticle({
          ...articles.query,
          page: (Number(articles.query.page) + 1).toString(),
        });

        setArticle((prev) => ({
          ...newArticle,
          list: [...prev.list, ...newArticle.list],
        }));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <search>
        <form action={formAction} id="boardsSearchForm" className="relative">
          <label htmlFor="boardsSearchInput">
            <Search className="absolute left-4 top-3" />

            <Input
              type="search"
              name="keyword"
              id="boardsSearchInput"
              className="pl-10 pr-20"
              placeholder="검색어를 입력해주세요."
            />
          </label>

          <Button
            type="submit"
            variant="floating"
            size="low"
            className="right-top absolute right-1 top-1"
          >
            검색
          </Button>
        </form>
      </search>

      <div className="flex flex-col gap-y-8 tab:gap-y-10">
        {children}

        <hr />

        <section className="flex flex-col gap-y-6 tab:gap-y-8">
          <header className="relative flex items-center justify-between">
            <h2 className="lg-bold tab:xl-bold">게시글</h2>

            <label
              htmlFor="boardsOrderByInput"
              className="relative cursor-pointer overflow-hidden rounded-xl bg-input-default"
            >
              <input
                form="boardsSearchForm"
                type="text"
                name="orderBy"
                id="boardsOrderByInput"
                className="h-10 w-24 cursor-pointer p-2 text-start"
                value={orderBy.current}
                onClick={() => {
                  setIsVisible(true);
                }}
                readOnly
              />

              <Toggle className="absolute right-2 top-2" />
            </label>

            <div
              className={`absolute right-0 top-11 z-[5] flex flex-col rounded-xl border border-dropDown-border bg-dropDown-secondary${isVisible ? "" : ` ${"hidden"}`}`}
            >
              {orderBy.option.map((option: string) => (
                <button
                  key={option}
                  type="submit"
                  form="boardsSearchForm"
                  className="h-10 w-24"
                  onClick={(e) => {
                    setIsVisible(false);

                    if (option === orderBy.current) {
                      e.preventDefault();
                      return;
                    }

                    setOrderBy((prev) => ({
                      ...prev,
                      current: option,
                    }));
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </header>

          <ol className="grid gap-y-4 tab:gap-y-6 pc:grid-cols-2 pc:gap-x-5">
            {articles.list.map((article: T.Article) => (
              <li key={article.id}>
                <Link href={`/board/${article.id}`}>
                  <article className="flex h-40 flex-col justify-between rounded-xl bg-primary-light p-4 pt-6 tab:h-44 tab:px-8 tab:pb-6">
                    <header>
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

          {articles.list.length !== articles.totalCount && <span ref={ref} />}
        </section>
      </div>
    </>
  );
}
