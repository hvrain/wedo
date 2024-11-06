"use client";

import Link from "next/link";

export default function BoardsLink() {
  return (
    <Link
      className="p-2 hover:bg-primary-light"
      href="/boards"
      onClick={() => {
        sessionStorage.removeItem("articles");
        sessionStorage.removeItem("scrollY");
      }}
    >
      자유게시판
    </Link>
  );
}
