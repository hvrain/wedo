import React from "react";

import Image from "next/image";
import Link from "next/link";

import { getUserGroups } from "@/apis/user";
import NavigationMenuGroups from "@/layout/groups/NavigationMenuGroups";
import SheetGroups from "@/layout/groups/SheetGroups";
import Logo from "@/public/images/logo.png";

import BoardsLink from "./boardsLink";

export default async function GroupsResponsive() {
  const groups = await getUserGroups();

  return (
    <nav className="flex grow items-center gap-4 tab:gap-8 pc:gap-10">
      <div className="tab:hidden">
        <SheetGroups groups={groups} />
      </div>
      <Link href="/">
        <Image width={65} height={32} src={Logo} alt="로고" />
      </Link>
      <div className="lg-medium hidden items-center gap-4 tab:flex">
        <NavigationMenuGroups groups={groups} />
        <BoardsLink />
      </div>
    </nav>
  );
}
