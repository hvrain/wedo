import { InputHTMLAttributes, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/@common/Button";

export default function Submit({
  disabled,
  children,
}: PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={disabled || pending} className="flex-1" type="submit">
      {pending ? "전송중..." : children}
    </Button>
  );
}
