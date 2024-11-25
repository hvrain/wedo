import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-button-default rounded-xl text-default-light hover:bg-button-hover active:bg-button-active disabled:bg-gray-500 disabled:text-subText",
        danger: "bg-danger rounded-xl text-inverse",
        outline:
          "bg-inverse border border-solid border-button-default rounded-xl text-button-default hover:border-button-hover active:border-button-active disabled:border-gray-500 hover:text-button-hover active:text-button-active disabled:text-subText",
        outlinedSecondary:
          "bg-inverse border border-solid border-gray-500 rounded-xl text-subText",
        floating:
          "bg-button-default rounded-full text-default-light hover:bg-button-hover active:bg-button-active disabled:bg-gray-500",
        floatingOutlined:
          "bg-inverse border border-solid border-button-default rounded-full text-button-default hover:border-button-hover active:border-button-active disabled:border-gray-500 hover:text-button-hover active:text-button-active disabled:text-subText",
        transparent:
          "border border-solid border-button-default rounded-xl text-button-default  hover:border-button-hover active:border-button-active disabled:border-gray-500 hover:text-button-hover active:text-button-active disabled:text-subText",
      },
      size: {
        default: "h-12 px-5 py-[14px] lg-semibold",
        low: "h-10 px-5 py-3 md-semibold",
        sm: "h-8 px-3 py-2 md-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
