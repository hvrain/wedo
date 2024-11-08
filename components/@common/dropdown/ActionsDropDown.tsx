import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown";

interface ActionsDropDownProps {
  children: ReactNode;
  onEditHandler: () => void;
  onDeleteHandler: () => void;
}

export default function ActionsDropDown({
  children,
  onEditHandler,
  onDeleteHandler,
}: ActionsDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{children}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[94px] rounded-xl border border-dropDown-border bg-dropDown-secondary p-0 pc:min-w-[120px]"
      >
        <DropdownMenuGroup className="max-w-[120px]">
          <DropdownMenuItem className="p-0">
            <button
              onClick={onEditHandler}
              className="w-full py-3 text-center text-md transition duration-300 ease-in-out hover:bg-dropDown-default"
            >
              수정하기
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <button
              onClick={onDeleteHandler}
              className="w-full py-3 text-center text-md transition duration-300 ease-in-out hover:bg-dropDown-default"
            >
              삭제하기
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
