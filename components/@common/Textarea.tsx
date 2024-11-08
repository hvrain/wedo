import { forwardRef, TextareaHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variant = cva(
  [
    "w-full",
    "rounded-xl border border-solid border-primary",
    "bg-input-default",
    "text-default-light placeholder:text-placeHolder",
  ],
  {
    variants: {
      BoxSize: {
        default: "h-[75px]",
        sm: "h-[50px]",
        md: "h-[6.5rem]",
        lg: "h-60",
      },
      FontSize: {
        default: "md-normal tab:lg-normal",
        sm: "md-normal",
        lg: "lg-normal",
      },
      Padding: {
        default: "px-4 py-3",
        lg: "p-4 max-tab:py-2 tab:px-6",
      },
    },
    compoundVariants: [
      {
        BoxSize: ["md", "lg"],
        FontSize: "default",
        Padding: "lg",
        className: "!leading-[26px]",
      },
    ],
    defaultVariants: {
      BoxSize: "default",
      FontSize: "default",
      Padding: "default",
    },
  },
);

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof variant>;

export default forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { BoxSize, FontSize, Padding, className, ...props },
  ref,
) {
  return (
    <textarea
      className={cn(variant({ BoxSize, FontSize, Padding, className }))}
      ref={ref}
      {...props}
    />
  );
});
