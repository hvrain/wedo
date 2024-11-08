import React from "react";

import Container from "@/@common/container/Container";
import { getUser } from "@/apis/user";
import ProfileEditInputs from "@/components/auth/mypage/ProfileEditInput";

export default async function MyPage() {
  const { image, nickname, email } = await getUser();

  return (
    <Container background="lightBeige">
      <div className="mx-auto mt-6 flex max-w-[792px] flex-col justify-center pb-20">
        <h1 className="2lg-bold pc:4xl-medium">계정 설정</h1>
        <ProfileEditInputs user={{ image, nickname, email }} />
        <div className="mt-[60px] flex w-full flex-col items-center gap-4" />
      </div>
    </Container>
  );
}
