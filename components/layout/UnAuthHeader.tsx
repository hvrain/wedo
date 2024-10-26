import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/@common/Button";
import Logo from "@/public/images/logo.png";

export default function UnAuthHeader() {
  return (
    <>
      <Link href="/">
        <Image width={65} height={32} src={Logo} alt="로고" />
      </Link>
      <Button className="bg-transparent" asChild>
        <Link className="flex justify-end" href="/login">
          로그인
        </Link>
      </Button>
    </>
  );
}
