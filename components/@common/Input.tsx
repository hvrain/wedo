import { forwardRef, InputHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variant = cva(
  [
    "w-full",
    "rounded-xl border border-solid border-primary hover:border-brand-border focus:border-brand-border",
    "p-4",
    "text-default-light placeholder:text-placeHolder",
    "disabled:border-0",
  ],
  {
    variants: {
      BoxSize: {
        default: "h-11 tab:h-12",
        sm: "h-11",
        md: "h-12",
        lg: "h-12 tab:h-14",
      },
      FontSize: {
        default: "md-normal tab:lg-normal",
        sm: "md-normal",
        lg: "lg-normal",
      },
      Padding: {
        default: "py-[10px] tab:py-3",
        xs: "py-[6px] tab:py-2",
        sm: "px-3 py-[10px]",
        md: "max-tab:py-3",
        lg: "tab:px-6",
      },
      BgColor: {
        default: "bg-input-default",
        white: "bg-white",
      },
      Error: {
        true: "border-danger",
      },
    },
    compoundVariants: [
      {
        BoxSize: "sm",
        FontSize: "sm",
        Padding: "sm",
        className: "font-medium",
      },
    ],
    defaultVariants: {
      BoxSize: "default",
      FontSize: "default",
      Padding: "default",
      BgColor: "default",
    },
  },
);

type Props = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof variant> & {
    ErrorMessage?: string;
  };

export default forwardRef<HTMLInputElement, Props>(function Input(
  {
    BoxSize,
    FontSize,
    Padding,
    BgColor,
    Error,
    ErrorMessage,
    className,
    ...props
  },
  ref,
) {
  return (
    <section className="flex w-full flex-col gap-y-2">
      <input
        className={cn(
          variant({ BoxSize, FontSize, Padding, BgColor, Error, className }),
        )}
        ref={ref}
        {...props}
      />
      {ErrorMessage && <p className="md-medium text-danger">{ErrorMessage}</p>}
    </section>
  );
});
