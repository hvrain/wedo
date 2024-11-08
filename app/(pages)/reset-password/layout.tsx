import React, { PropsWithChildren, ReactNode } from "react";

import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default function layout({
  children,
  auth,
}: PropsWithChildren<{ auth: ReactNode }>) {
  const accessToken = getCookie("accessToken", { cookies });

  return (
    <>
      {children}
      {accessToken && auth}
    </>
  );
}
