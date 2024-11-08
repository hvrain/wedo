import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown";

interface List {
  btnLabel: string;
  btnType: string;
  btnFn?: () => void;
}

interface ActionsDropDownProps {
  children: ReactNode;
  menuList: List[];
}

export default function SelectCycleDropDown({
  children,
  menuList,
}: ActionsDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{children}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="min-w-[109px] rounded-xl border border-dropDown-border bg-dropDown-secondary p-0"
      >
        <DropdownMenuGroup className="max-w-[120px]">
          {menuList.map((list) => (
            <DropdownMenuItem
              key={list.btnType}
              className="p-0"
              onClick={list.btnFn}
            >
              <button className="w-full px-4 py-3 text-left text-md transition duration-300 ease-in-out hover:bg-dropDown-default">
                {list.btnLabel}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
