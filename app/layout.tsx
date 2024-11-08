import localFont from "next/font/local";

import "@/styles/globals.css";
import { Toaster } from "@/components/@common/toast/Toaster";

import Providers from "./providers";

import type { Metadata } from "next";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "WeDo",
  description: "WeDo - 팀과 함께 하는 협업",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
