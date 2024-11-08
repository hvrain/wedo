import React, { ReactNode } from "react";

export default function Task({
  children,
  taskdetail,
}: {
  children: ReactNode;
  taskdetail: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pb-8">
      {children}
      {taskdetail}
    </div>
  );
}
