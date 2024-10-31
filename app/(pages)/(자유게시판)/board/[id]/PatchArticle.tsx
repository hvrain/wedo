"use client";

import { ChangeEvent, FormEvent, ReactElement, useState } from "react";

import T from "Type/Article";
import Image from "next/image";

import { Button } from "@/@common/Button";
import Input from "@/components/@common/Input";
import Textarea from "@/components/@common/Textarea";

import PatchAndDelete from "./PatchAndDelete";
import { actionPatchArticle } from "./action";

export default function PatchArticle({
  article,
  userId,
  children,
}: {
  article: T.ArticleDetail;
  userId: number;
  children: ReactElement[];
}) {
  const [reWrite, setReWrite] = useState(false);
  const [articleValue, setArticleValue] = useState({
    title: article.title,
    content: article.content,
  });

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setArticleValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setArticleValue((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const param = {
      title: articleValue.title,
      content: articleValue.content,
    };

    actionPatchArticle(article.id, param);

    setReWrite(false);
  };

  return (
    <article className="flex flex-col gap-y-6">
      {reWrite ? (
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col gap-y-4 py-6">
            <header className="min-h-6">
              <Input
                type="text"
                name="title"
                className="lg-medium text-default-light tab:2lg-medium"
                defaultValue={articleValue.title}
                autoFocus
                onChange={handleChangeTitle}
              />
            </header>

            {children}
          </div>

          <div>
            {article.image && (
              <figure className="relative float-right size-20 overflow-hidden rounded-xl tab:size-40">
                <Image alt="게시글 이미지" src={article.image} fill />
              </figure>
            )}

            <Textarea
              name="content"
              BoxSize="lg"
              Padding="lg"
              className="md-normal leading-6 text-default-light [overflowWrap:anywhere] tab:lg-normal tab:leading-7"
              defaultValue={articleValue.content}
              onChange={handleChangeContent}
            />
          </div>

          <div className="absolute -bottom-8 right-0 flex gap-3">
            <Button
              type="button"
              variant="transparent"
              size="sm"
              className="border-none"
              onClick={() => {
                setReWrite(false);
              }}
            >
              취소
            </Button>

            <Button type="submit" variant="outline" size="sm">
              수정하기
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex flex-col gap-y-4 py-6">
            <header className="min-h-6">
              {article.writer.id === userId && (
                <div className="float-end">
                  <PatchAndDelete
                    id={{ articleId: article.id, commentId: null }}
                    section="article"
                    setState={setReWrite}
                  />
                </div>
              )}

              <h1 className="lg-medium text-default-light tab:2lg-medium">
                {article.title}
              </h1>
            </header>

            {children}
          </div>

          <div>
            {article.image && (
              <figure className="relative float-right size-20 overflow-hidden rounded-xl tab:size-40">
                <Image alt="게시글 이미지" src={article.image} fill />
              </figure>
            )}

            <p className="md-normal leading-6 text-default-light [overflowWrap:anywhere] tab:lg-normal tab:leading-7">
              {article.content}
            </p>
          </div>
        </>
      )}
    </article>
  );
}
