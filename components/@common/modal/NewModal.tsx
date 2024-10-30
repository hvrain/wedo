"use client";

import * as React from "react";

import * as ModalPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Modal = ModalPrimitive.Root;

const ModalTrigger = ModalPrimitive.Trigger;

const ModalPortal = ModalPrimitive.Portal;

const ModalClose = ModalPrimitive.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    onClick={(e) => e.preventDefault()}
    {...props}
  />
));
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Content> & {
    hasCrossCloseIcon?: boolean;
    type?: "modal" | "alert";
  }
>(
  (
    {
      className,
      children,
      hasCrossCloseIcon = false,
      type = "modal",
      ...props
    },
    ref,
  ) => {
    const handleInteractOutside = (e: Event) => {
      if (type === "modal") return;
      e.preventDefault();
    };

    return (
      <ModalPortal>
        <ModalOverlay />
        <ModalPrimitive.Content
          ref={ref}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 grid gap-6 rounded-t-xl border-t bg-inverse px-12 pb-8 pt-12 text-default-light shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom tab:inset-auto tab:left-[50%] tab:top-[50%] tab:w-full tab:max-w-96 tab:translate-x-[-50%] tab:translate-y-[-50%] tab:rounded-xl tab:data-[state=closed]:duration-200 tab:data-[state=open]:duration-200 tab:data-[state=closed]:slide-out-to-left-1/2 tab:data-[state=closed]:slide-out-to-top-[48%] tab:data-[state=open]:slide-in-from-left-1/2 tab:data-[state=open]:slide-in-from-top-[48%]",
            className,
          )}
          onInteractOutside={handleInteractOutside}
          {...props}
        >
          {children}
          {hasCrossCloseIcon && (
            <ModalPrimitive.Close className="absolute right-6 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-50">
              <Cross2Icon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </ModalPrimitive.Close>
          )}
        </ModalPrimitive.Content>
      </ModalPortal>
    );
  },
);
ModalContent.displayName = ModalPrimitive.Content.displayName;

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center", className)}
    {...props}
  />
);
ModalHeader.displayName = "DialogHeader";

const ModalFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-center gap-2 [&>*]:flex-1",
      className,
    )}
    {...props}
  >
    <ModalPrimitive.Close asChild>{children}</ModalPrimitive.Close>
  </div>
);
ModalFooter.displayName = "DialogFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    ref={ref}
    className={cn("lg-medium text-default-light", className)}
    {...props}
  />
));
ModalTitle.displayName = ModalPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description
    ref={ref}
    className={cn("md-medium text-default-dark", className)}
    {...props}
  />
));
ModalDescription.displayName = ModalPrimitive.Description.displayName;

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};
