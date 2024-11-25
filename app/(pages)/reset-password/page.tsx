import React from "react";

import Container from "@/@common/container/Container";
import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: {
    token?: string;
  };
}

export default function page({ searchParams }: ResetPasswordPageProps) {
  const { token } = searchParams;

  if (!token) {
    return <div>비밀번호를 변경하기 위한 토큰이 없습니다.</div>;
  }

  return (
    <Container background="lightBeige">
      <div className="mx-auto mt-6 flex max-w-[460px] flex-col items-center justify-center pb-20 tab:mt-[100px] pc:mt-[140px]">
        <h1 className="2xl-medium pc:4xl-medium">비밀번호 변경</h1>
        <ResetPasswordForm token={token} />
        <div className="mt-[60px] flex w-full flex-col items-center gap-4" />
      </div>
    </Container>
  );
}
