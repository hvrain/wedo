"use client";

import { PropsWithChildren } from "react";

import Link from "next/link";

import useToggle from "@/hooks/useToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown";

interface UserDropDownProps {
  actionSignOut: () => Promise<void>;
}

export default function UserDropDown({
  children,
  actionSignOut,
}: PropsWithChildren<UserDropDownProps>) {
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
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <Link
              href="/history"
              className="inline-block w-full py-3 text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
              onClick={toggleOpen}
            >
              마이 히스토리
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              href="/mypage"
              className="inline-block w-full py-3 text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
              onClick={toggleOpen}
            >
              계정 설정
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              href="/jointeam"
              className="inline-block w-full py-3 text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
              onClick={toggleOpen}
            >
              팀 참여
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <form
              className="w-full py-3 text-md duration-300 hover:bg-dropDown-default pc:text-lg"
              action={actionSignOut}
            >
              <button className="w-full" type="submit" onClick={toggleOpen}>
                로그아웃
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
