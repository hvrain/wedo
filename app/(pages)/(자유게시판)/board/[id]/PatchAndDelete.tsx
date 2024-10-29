"use client";

import { Dispatch, SetStateAction } from "react";

import Kebab from "@/public/svg/kebab.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown";

import { actionDeleteArticle, actionDeleteArticleComment } from "./action";

export default function PatchAndDelete({
  id,
  section,
  setState,
}: {
  id: {
    articleId: number;
    commentId: number | null;
  };
  section: "article" | "comment";
  setState: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Kebab width={24} height={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[94px] rounded-xl border border-dropDown-border bg-dropDown-secondary p-0 pc:min-w-[120px]"
      >
        <DropdownMenuGroup className="max-w-[120px]">
          <DropdownMenuItem className="p-0">
            <button
              type="button"
              onClick={() => {
                setState(true);
              }}
              className="w-full py-3 text-center text-md transition duration-300 ease-in-out hover:bg-dropDown-default"
            >
              수정하기
            </button>
          </DropdownMenuItem>
          <form
            action={() => {
              switch (section) {
                case "article":
                  actionDeleteArticle(id.articleId);
                  return;

                case "comment":
                  actionDeleteArticleComment(id);

                // no default
              }
            }}
          >
            <DropdownMenuItem className="p-0">
              <button
                type="submit"
                className="w-full py-3 text-center text-md transition duration-300 ease-in-out hover:bg-dropDown-default"
              >
                삭제하기
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
