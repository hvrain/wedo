import { ChangeEvent } from "react";

import Input from "@/components/@common/Input";

interface TeamNameInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage: string;
}

export default function TeamNameInput({
  onChange,
  value,
  errorMessage,
}: TeamNameInputProps) {
  return (
    <>
      <label htmlFor="teamName">
        <h3 className="lg-medium text-default-light">팀 이름</h3>
      </label>
      <Input
        id="teamName"
        Error={!!errorMessage}
        ErrorMessage={errorMessage}
        onChange={onChange}
        placeholder="팀 이름을 입력해주세요."
        className="mt-3"
        value={value}
      />
    </>
  );
}
