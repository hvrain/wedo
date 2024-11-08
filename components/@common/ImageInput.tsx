"use client";

import { InputHTMLAttributes, useState } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultPreview: string;
}

export default function ImageInput<T extends FieldValues>({
  type,
  defaultPreview,
  ...props
}: InputFieldProps & UseControllerProps<T>) {
  const [preview, setPreview] = useState(defaultPreview ?? "");
  const [isHover, setIsHover] = useState(false);

  const onHover = () => {
    setIsHover(true);
  };

  const onBlur = () => {
    setIsHover(false);
  };

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field: { ref, value, onChange, ...rest } }) => {
        return (
          <div className="space-y-2">
            <FormItem className="relative space-y-3">
              <FormLabel
                className="relative flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-md"
                onMouseOver={onHover}
                onFocus={onHover}
                onMouseOut={onBlur}
                onBlur={onBlur}
              >
                {!preview && (
                  <Image
                    fill
                    src="/images/profile_pfp_register.png"
                    alt="팀 이미지 등록"
                  />
                )}
                {preview && (
                  <div className="dark:bg-black-600 absolute h-full w-full rounded-full bg-white">
                    <Image
                      className="rounded-full bg-cover"
                      fill
                      src={preview}
                      alt="preview"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "absolute z-20 hidden h-full w-full items-center justify-center rounded-md bg-[#000000] opacity-60",
                    isHover && "flex",
                  )}
                >
                  <Image
                    fill
                    className="bg-cover"
                    src="/images/pencil.png"
                    alt="preview"
                  />
                </div>
              </FormLabel>
              <FormControl>
                <input
                  className="hidden"
                  type={type}
                  {...rest}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (!(file instanceof File)) return;
                    const nextPreview = URL.createObjectURL(file);
                    setPreview((prevPreview) => {
                      if (prevPreview) URL.revokeObjectURL(prevPreview);
                      return nextPreview;
                    });
                    onChange(file);
                  }}
                />
              </FormControl>
            </FormItem>
            <FormMessage />
          </div>
        );
      }}
    />
  );
}
