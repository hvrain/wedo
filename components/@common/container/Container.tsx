import { ReactNode } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variant = cva("min-h-screen pt-[60px]", {
  variants: {
    background: {
      white: "bg-inverse",
      lightBeige: "bg-primary-light",
    },
  },
});

type Prop = VariantProps<typeof variant> & {
  className?: string;
  children: ReactNode;
};

export default function Container({ className, children, background }: Prop) {
  return (
    <main className={cn(variant({ background }))}>
      <div
        className={cn([
          "mx-auto",
          "max-w-screen-pc",
          "px-4 tab:px-6 pc:px-0",
          className,
        ])}
      >
        {children}
      </div>
    </main>
  );
}
