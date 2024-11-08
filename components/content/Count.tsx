"use client";

import actionPatchLike from "@/action/content";
import Comment from "@/public/svg/comment.svg";
import Like from "@/public/svg/like.svg";

export default function CountContent({
  content,
  count,
  Detail,
}: {
  content: "like" | "comment";
  count: number;
  Detail?: {
    articleId: number;
    isLike: boolean;
  };
}) {
  return (
    <figure className="flex items-center gap-x-1">
      {(() => {
        switch (content) {
          case "comment":
            return <Comment />;

          case "like":
            return (
              <Like
                fill={Detail?.isLike ? "red" : "#00000000"}
                onClick={() => {
                  if (Detail) {
                    actionPatchLike(Detail.articleId, !Detail?.isLike);
                  }
                }}
              />
            );

          // no default
        }
      })()}

      <figcaption className="xs-normal text-slate-400 tab:md-normal">
        {count}
      </figcaption>
    </figure>
  );
}
