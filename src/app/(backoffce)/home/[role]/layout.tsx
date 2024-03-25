"use client";

import { SidebarMenu } from "@/components";
import type { Role } from "@/types";
import { redirect, useParams } from "next/navigation";
import { type PropsWithChildren } from "react";

export default function RoleLayout({ children }: Readonly<PropsWithChildren>) {
  const param = useParams();

  const role = param.role as Role;

  if (!["user", "admin", "super_admin", "employer"].includes(role))
    return redirect("/");

  return (
    <main
      role="admin-layout"
      className="flex border-t-4 border-sky-100 h-[calc(100vh-80px)]"
    >
      <div className="w-[300px]">
        <SidebarMenu role={role} />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
