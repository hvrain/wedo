"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

import Link from "next/link";

import { actionSignOut } from "@/apis/action";
import useToggle from "@/hooks/useToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown";

function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="h-full w-full" type="submit">
      {pending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}

export default function UserDropDown({ children }: PropsWithChildren) {
  const [open, toggleOpen] = useToggle(false);

  return (
    <DropdownMenu open={open} onOpenChange={toggleOpen}>
      <DropdownMenuTrigger asChild>
        <button className="rounded-xl p-2 hover:bg-primary-light">
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[120px] rounded-xl border border-dropDown-border bg-dropDown-secondary p-0 pc:min-w-[135px]"
      >
        <DropdownMenuGroup onClick={toggleOpen}>
          <DropdownMenuItem className="p-0">
            <Link
              href="/history"
              className="flex h-[41px] w-full items-center justify-center text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
            >
              마이 히스토리
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              href="/mypage"
              className="flex h-[41px] w-full items-center justify-center text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
            >
              계정 설정
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              href="/jointeam"
              className="flex h-[41px] w-full items-center justify-center text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
            >
              팀 참여
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <form
              className="flex h-[41px] w-full items-center justify-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
              action={actionSignOut}
            >
              <SignOutButton />
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
