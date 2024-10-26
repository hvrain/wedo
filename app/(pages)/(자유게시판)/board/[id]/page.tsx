/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import Image from "next/image";

import Container from "@/@common/container/Container";
import { postArticleComment } from "@/apis/articleComment";
import { getUser } from "@/apis/user";
import { Button } from "@/components/@common/Button";
import Textarea from "@/components/@common/Textarea";
import CountContent from "@/components/content/Count";
import UserProfile from "@/components/user/Profile";
import { formatToDotDate } from "@/utils/convertDate";

import PatchAndDelete from "./PatchAndDelete";

export default async function Board({ params }: { params: { id: number } }) {
  const article = await (
    await fetch(
      `https://fe-project-cowokers.vercel.app/8-7/articles/${params.id}`,
    )
  ).json();

  const Comments = await (
    await fetch(
      `https://fe-project-cowokers.vercel.app/8-7/articles/${params.id}/comments?limit=20`,
    )
  ).json();

  const user = await getUser();

  async function addArticleComment(formData: FormData) {
    "use server";

    const req = {
      content: formData.get("content") as string,
    };

    await postArticleComment(params.id, req);

    revalidatePath(`/board/${params.id}`);
  }

  return (
    <Container
      background="white"
      className="flex flex-col gap-y-20 pb-8 pt-10 tab:pt-14"
    >
      <article className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4 py-6">
          <header className="min-h-6">
            {article.writer.id === user.id && (
              <div className="float-end">
                <PatchAndDelete
                  id={{ articleId: article.id, commentId: null }}
                  section="article"
                />
              </div>
            )}

            <h1 className="lg-medium text-default-light tab:2lg-medium">
              {article.title}
            </h1>
          </header>

          <hr />

          <footer className="flex justify-between">
            <section className="flex items-center gap-x-4">
              <UserProfile
                profileImage={null}
                nickname={article.writer.nickname}
              />

              <hr className="h-4 w-px border-0 bg-slate-700" />

              <time className="xs-medium text-secondary-light tab:md-medium">
                {formatToDotDate(article.createdAt)}
              </time>
            </section>

            <div className="flex gap-x-4">
              <CountContent content="comment" count={article.commentCount} />

              <CountContent content="like" count={article.likeCount} />
            </div>
          </footer>
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
      </article>

      <section className="flex flex-col gap-y-8 tab:gap-10">
        <form action={addArticleComment} className="flex flex-col gap-y-4">
          <label
            htmlFor="boardContentTextarea"
            className="lg-medium flex flex-col gap-y-4 text-default-light tab:xl-bold tab:gap-y-6"
          >
            댓글달기
            <Textarea
              id="boardContentTextarea"
              name="content"
              Padding="lg"
              BoxSize="md"
              placeholder="댓글을 입력해주세요."
              required
            />
          </label>

          <Button
            type="submit"
            size="sm"
            className="w-20 self-end tab:lg-semibold tab:h-12 tab:w-48"
          >
            등록
          </Button>
        </form>

        <hr />

        <ol className="flex flex-col gap-y-4">
          {Comments.list.map((comment: any) => (
            <li key={comment.id}>
              <article className="flex w-full flex-col gap-y-8 rounded-xl bg-primary-light p-4 tab:px-6 tab:py-5">
                <div>
                  {comment.writer.id === user.id && (
                    <div className="float-end">
                      <PatchAndDelete
                        id={{ articleId: article.id, commentId: comment.id }}
                        section="comment"
                      />
                    </div>
                  )}

                  <p>{comment.content}</p>
                </div>

                <footer className="flex justify-between">
                  <div className="flex items-center gap-x-4">
                    <UserProfile
                      profileImage={comment.writer.image}
                      nickname={comment.writer.nickname}
                    />

                    <hr className="h-4 w-px border-0 bg-slate-700" />

                    <time className="xs-medium text-secondary-light tab:md-medium">
                      {formatToDotDate(comment.createdAt)}
                    </time>
                  </div>

                  {/* api로 안 보내줌 물어보기 */}
                  {/*
                  <section>
                    <p>{comment.commentCount}</p>

                    하트 svg 아이콘

                    <p>{comment.likeCount}</p>
                  </section>
                  */}
                </footer>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
