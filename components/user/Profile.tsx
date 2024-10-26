import Image from "next/image";

import { cn } from "@/lib/utils";
import defaultProfile from "@/public/images/default_profile.png";

export default function UserProfile({
  profileImage,
  nickname,
}: {
  profileImage: string | null;
  nickname: string;
}) {
  return (
    <address
      className={cn([
        "flex items-center gap-x-3",
        "xs-medium tab:md-medium",
        "text-default-light",
      ])}
    >
      <figure className="relative size-8 overflow-hidden rounded-full">
        <Image fill alt="프로필 이미지" src={profileImage ?? defaultProfile} />
      </figure>
      {/* 게시글 API에서 유저 프로필 정보를 안 보내줌 물어보기, 댓글 쪽은 보내줌 */}

      {nickname}
    </address>
  );
}
