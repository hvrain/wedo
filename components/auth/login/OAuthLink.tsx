import React, { PropsWithChildren } from "react";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface OAuthLinkProps {
  alt: string;
  href: string;
  icon: StaticImageData;
}

export default function OAuthLink({
  icon,
  href,
  alt,
  children,
}: PropsWithChildren<OAuthLinkProps>) {
  return (
    <Link
      className="relative flex h-[50px] w-full items-center rounded-full border bg-gray-500"
      href={href}
    >
      <Image
        className="absolute left-[3px]"
        width={42}
        height={42}
        src={icon}
        alt={alt}
      />
      <span className="lg-medium mx-auto">{children}</span>
    </Link>
  );
}
