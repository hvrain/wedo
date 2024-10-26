import Comment from "@/public/svg/comment.svg";
import Like from "@/public/svg/like.svg";

export default function CountContent({
  content,
  count,
}: {
  content: "like" | "comment";
  count: number;
}) {
  return (
    <figure className="flex items-center gap-x-1">
      {(() => {
        switch (content) {
          case "like":
            return <Like />;

          case "comment":
            return <Comment />;

          // no default
        }
      })()}

      <figcaption className="xs-normal text-slate-400 tab:md-normal">
        {count}
      </figcaption>
    </figure>
  );
}
