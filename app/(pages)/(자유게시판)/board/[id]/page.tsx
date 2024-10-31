/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";

import Container from "@/@common/container/Container";
import { getArticleComment, postArticleComment } from "@/apis/article";
import { getUser } from "@/apis/user";
import { Button } from "@/components/@common/Button";
import Textarea from "@/components/@common/Textarea";
import CountContent from "@/components/content/Count";
import UserProfile from "@/components/user/Profile";
import T from "@/dtos/Article";
import { formatToDotDate } from "@/utils/convertDate";

import PatchArticle from "./PatchArticle";
import PatchComment from "./PatchComment";

export default async function Board({ params }: { params: { id: number } }) {
  const article = (await (
    await fetch(
      `https://fe-project-cowokers.vercel.app/8-7/articles/${params.id}`,
    )
  ).json()) as T.ArticleDetail;

  const Comments = await getArticleComment(params.id);

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
      <PatchArticle article={article} userId={user.id}>
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

            <CountContent
              content="like"
              count={article.likeCount}
              Detail={{ articleId: article.id, isLike: article.isLiked }}
            />
          </div>
        </footer>
      </PatchArticle>

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
              <PatchComment
                ArticleId={article.id}
                comment={comment}
                userId={user.id}
              />
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
