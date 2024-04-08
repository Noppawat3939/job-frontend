"use client";

import type { Role } from "@/types";
import { type PropsWithChildren } from "react";
import { SidebarMenu } from "@/components";
import { useParams, useSearchParams } from "next/navigation";
import { eq, goToHome } from "@/lib";
import { BriefcaseBusiness, Home, LogOut, User, Users } from "lucide-react";
import { userStore } from "@/store";

export default function BackofficeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const param = useParams();
  const searchParam = useSearchParams();
  const searchTabParam = searchParam.get("tab") as
    | undefined
    | "accounts"
    | "jobs";

  const { user } = userStore((store) => ({ user: store.user }));

  const role = param.role as Role;

  if (role !== "admin") return goToHome();

  const menus = [
    {
      items: [
        {
          label: "Accouts",
          value: "accounts",
          leftIcon: Users,
          hide: eq(role, "employer"),
          path: `/home/${role}?tab=accounts`,
          active: eq(searchTabParam, "accounts"),
        },
        {
          label: "Jobs",
          value: "jobs",
          leftIcon: BriefcaseBusiness,
          path: `/home/${role}?tab=jobs`,
          active: eq(searchTabParam, "jobs"),
        },
      ],
    },
    {
      heading: "Setting",
      items: [{ label: "Profile", value: "profile", leftIcon: User }],
    },
    {
      items: [{ label: "Sign out", value: "signout", leftIcon: LogOut }],
    },
  ];

  return (
    <main
      role="admin-layout"
      className="flex border-t-4 border-sky-100 h-[calc(100vh-80px)]"
    >
      <div className="w-[300px]">
        <SidebarMenu menus={menus} user={user} />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
