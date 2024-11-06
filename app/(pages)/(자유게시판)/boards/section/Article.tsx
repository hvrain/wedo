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
import { cn } from "@/lib/utils";
import Search from "@/public/svg/search.svg";
import Toggle from "@/public/svg/toggle.svg";
import Warning from "@/public/svg/warning.svg";
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
    current: Articles.query.orderBy,
    option: ["recent", "like"] as T.OrderBy[],
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

  useEffect(() => {
    const handleChangeVisible = () => {
      setIsVisible(false);
    };

    if (isVisible) {
      window.addEventListener("click", handleChangeVisible);

      return () => {
        window.removeEventListener("click", handleChangeVisible);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");

    if (scrollY) {
      setArticle(JSON.parse(sessionStorage.getItem("articles")!));
      window.scrollTo(0, Number(scrollY));

      sessionStorage.removeItem("articles");
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  return (
    <>
      <search>
        <form
          action={formAction}
          onSubmit={(e) => {
            const keyword = e.currentTarget.keyword.value;
            const OrderBy = `?orderBy=${orderBy.current}`;

            if (keyword === state.query.keyword) {
              e.preventDefault();
              return;
            }

            if (orderBy.current === "recent") {
              if (!keyword) {
                window.history.replaceState(null, "", "/boards");
              } else {
                window.history.replaceState(null, "", `?keyword=${keyword}`);
              }
            } else if (!keyword) {
              window.history.replaceState(null, "", `${OrderBy}`);
            } else {
              window.history.replaceState(
                null,
                "",
                `${OrderBy}&keyword=${keyword}`,
              );
            }
          }}
          id="boardsSearchForm"
          className="relative"
        >
          <label htmlFor="boardsSearchInput">
            <Search className="absolute left-4 top-3" />

            <Input
              type="search"
              name="keyword"
              id="boardsSearchInput"
              className="pl-10 pr-20"
              placeholder="검색어를 입력해주세요."
              defaultValue={state.query.keyword}
            />
          </label>

          <Button
            type="submit"
            variant="floating"
            size="low"
            className="absolute inset-y-1 right-1 max-tab:h-9"
          >
            검색
          </Button>
        </form>
      </search>

      <div className="flex flex-col gap-y-8 tab:gap-y-10">
        {children}

        <hr />

        <section className="flex flex-col gap-y-6 tab:gap-y-8">
          <header className="flex items-center justify-between">
            <h2 className="lg-bold tab:xl-bold">게시글</h2>

            <form
              action={formAction}
              onSubmit={() => {
                const { keyword } = state.query;
                const OrderBy = `?orderBy=${orderBy.current}`;

                if (orderBy.current === "recent") {
                  if (!keyword) {
                    window.history.replaceState(null, "", "/boards");
                  } else {
                    window.history.replaceState(
                      null,
                      "",
                      `?keyword=${keyword}`,
                    );
                  }
                } else if (!keyword) {
                  window.history.replaceState(null, "", `${OrderBy}`);
                } else {
                  window.history.replaceState(
                    null,
                    "",
                    `${OrderBy}&keyword=${keyword}`,
                  );
                }
              }}
              className="relative"
            >
              <label
                htmlFor="boardsOrderByInput"
                className={cn(
                  "block h-10 w-24 cursor-pointer overflow-hidden rounded-xl border bg-input-default p-2",
                  isVisible && "pointer-events-none",
                )}
              >
                {orderBy.current === "like" ? "인기순" : "최신순"}
                <input
                  type="text"
                  name="orderBy"
                  id="boardsOrderByInput"
                  className="hidden"
                  value={orderBy.current}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!isVisible) {
                      setIsVisible(true);
                    }
                  }}
                  readOnly
                />

                <Toggle className="absolute right-2 top-2" />
              </label>

              <div
                className={cn(
                  "absolute right-0 top-12 z-[5] h-20 w-24",
                  "flex flex-col",
                  "rounded-xl border border-dropDown-border bg-dropDown-secondary",
                  isVisible ? "" : "hidden",
                )}
              >
                {orderBy.option.map((option) => (
                  <button
                    key={option}
                    type="submit"
                    className="flex-grow"
                    onClick={(e) => {
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
                    {option === "like" ? "인기순" : "최신순"}
                  </button>
                ))}
              </div>
            </form>
          </header>

          {articles.list[0] ? (
            <ol className="grid gap-y-4 tab:gap-y-6 pc:grid-cols-2 pc:gap-x-5">
              {articles.list.map((article: T.Article) => (
                <li key={article.id}>
                  <Link
                    href={`/board/${article.id}`}
                    onClick={() => {
                      sessionStorage.setItem(
                        "articles",
                        JSON.stringify(articles),
                      );
                      sessionStorage.setItem(
                        "scrollY",
                        window.scrollY.toString(),
                      );
                    }}
                  >
                    <article className="flex h-40 flex-col justify-between rounded-xl bg-primary-light p-4 pt-6 tab:h-44 tab:px-8 tab:pb-6">
                      <header>
                        {article.image && (
                          <figure className="relative float-right size-16 overflow-hidden rounded-xl tab:size-20">
                            <Image
                              alt="게시글 이미지"
                              src={article.image as string}
                              fill
                            />
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

                        <CountContent
                          content="like"
                          count={article.likeCount}
                        />
                      </footer>
                    </article>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex flex-col items-center gap-y-4">
              <Warning
                width="64"
                height="64"
                className="w-1/3 tab:w-1/4 pc:w-1/5"
              />

              <p className="2xl-bold text-center tab:3xl-bold pc:4xl-bold">
                검색 데이터가 존재하지 <br /> 않습니다.
              </p>
            </div>
          )}

          {articles.list.length !== articles.totalCount && <span ref={ref} />}
        </section>
      </div>
    </>
  );
}
