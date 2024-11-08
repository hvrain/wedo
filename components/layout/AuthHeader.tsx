import Image from "next/image";

import { getUser } from "@/apis/user";
import UserDropDown from "@/components/@common/dropdown/UserDropDown";
import GroupsResponsive from "@/layout/groups/GroupsResponsive";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

export default async function AuthHeader() {
  const user = await getUser();

  return (
    <>
      <GroupsResponsive />
      <UserDropDown>
        <div className="flex grow items-center justify-end gap-[10px] tab:grow-0">
          <Avatar className="flex h-[30px] w-[30px] items-center justify-center bg-[#EDEDED]">
            <AvatarImage src={user?.image} alt="user avatar" />
            <AvatarFallback>
              <Image
                width={15}
                height={15}
                src="/svg/profile_fallback.svg"
                alt="fallback avatar"
              />
            </AvatarFallback>
          </Avatar>
          <span className="hidden pc:block">{user?.nickname ?? "Unknown"}</span>
        </div>
      </UserDropDown>
    </>
  );
}
