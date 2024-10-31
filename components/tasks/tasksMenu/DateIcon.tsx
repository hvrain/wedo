import React, { forwardRef } from "react";

import Image from "next/image";

interface SelectDateProps {
  onClick?: () => void;
}

function SelectDate(
  { onClick }: SelectDateProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      ref={ref}
    >
      <Image
        width={24}
        height={24}
        src="/images/calendar_button.png"
        alt="날짜 선택"
      />
    </button>
  );
}

export default forwardRef(SelectDate);
