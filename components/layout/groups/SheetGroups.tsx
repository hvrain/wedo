"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/@common/Button";
import { UserGroupsResponse } from "@/dtos/UserDtos";
import { cn } from "@/lib/utils";
import Burger from "@/public/svg/burger";
import { navigationMenuTriggerStyle } from "@/ui/navigation-menu";
import { ScrollArea } from "@/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

export default function SheetGroups({
  groups,
}: {
  groups: UserGroupsResponse[];
}) {
  const { teamid: teamId } = useParams();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center">
        <Burger
          className="rounded-xl p-2 hover:bg-primary-light"
          color="gray"
        />
      </SheetTrigger>
      <SheetContent side="left" className="w-1/2 px-2">
        <SheetHeader className="pl-4">
          <SheetTitle>그룹 목록</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[88%]">
          <ul className="mt-10 flex flex-col gap-3 py-2">
            {groups &&
              groups.map(({ id, name, image }) => (
                <Link
                  key={`${name + id}mobile`}
                  href={`/${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "2xl-medium m-0 flex h-full w-full justify-start gap-3 p-2 hover:bg-brand-secondary-light",
                    id === Number(teamId) && "bg-brand-header",
                  )}
                >
                  <Image
                    className="rounded-md"
                    width={32}
                    height={32}
                    src={image ?? ""}
                    alt="그룹 이미지"
                  />
                  <span className="lg-medium">{name}</span>
                </Link>
              ))}
          </ul>
        </ScrollArea>
        <Button
          variant="outlinedSecondary"
          className="w-full hover:bg-gray-500"
          onClick={() => setOpen(false)}
          asChild
        >
          <Link href="/boards">자유게시판</Link>
        </Button>
        <Button
          variant="default"
          className="mt-3 w-full border-0 text-[#222222] shadow-[rgb(0,0,0,0.1)_0px_3px_10px_1px]"
          onClick={() => setOpen(false)}
          asChild
        >
          <Link href="/addteam">팀 추가하기</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
