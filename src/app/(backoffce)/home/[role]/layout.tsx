"use client";

import type { Role } from "@/types";
import { type PropsWithChildren } from "react";
import { SidebarMenu } from "@/components";
import { useParams } from "next/navigation";
import { goToHome } from "@/lib";

export default function BackofficeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const param = useParams();

  const role = param.role as Role;

  if (role !== "admin") return goToHome();

  const mappingRolePath = {
    admin: "admin",
    super_admin: "admin",
    employer: "employer",
  } as Record<Role, Role>;

  return (
    <main
      role="admin-layout"
      className="flex border-t-4 border-sky-100 h-[calc(100vh-80px)]"
    >
      <div className="w-[300px]">
        <SidebarMenu role={mappingRolePath[role]} />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
