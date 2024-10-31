import React, { forwardRef } from "react";

interface SelectDateProps {
  value?: string;
  onClick?: () => void;
}

function SelectDate(
  { value, onClick }: SelectDateProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      className="w-full rounded-xl bg-input-default p-3 text-left text-placeHolder"
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      ref={ref}
    >
      {value}
    </button>
  );
}

export default forwardRef(SelectDate);
