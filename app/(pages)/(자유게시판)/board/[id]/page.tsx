import Container from "@/@common/container/Container";
import { getArticleDetail, getArticleComment } from "@/apis/article";
import { getUser } from "@/apis/user";
import CountContent from "@/components/content/Count";
import UserProfile from "@/components/user/Profile";
import { formatToDotDate } from "@/utils/convertDate";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import PatchArticle from "./PatchArticle";

export default async function Board({ params }: { params: { id: string } }) {
  const article = await getArticleDetail(params.id);
  const comments = await getArticleComment(params.id);
  const user = await getUser();

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
        <CommentForm articleId={params.id} />

        <hr />

        <CommentList
          comments={comments}
          articleId={params.id}
          userId={user.id}
        />
      </section>
    </Container>
  );
}
