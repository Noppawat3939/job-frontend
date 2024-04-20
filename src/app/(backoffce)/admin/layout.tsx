"use client";

import { useEffect, type PropsWithChildren } from "react";
import { SidebarMenu } from "@/components";
import { useSearchParams } from "next/navigation";
import { eq, goToHome } from "@/lib";
import { BriefcaseBusiness, LogOut, User, Users } from "lucide-react";
import { userStore } from "@/store";

export default function BackofficeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const searchParam = useSearchParams();
  const searchTabParam = searchParam.get("tab") as
    | undefined
    | "accounts"
    | "jobs";

  const { user } = userStore((store) => ({ user: store.user }));

  useEffect(() => {
    if (searchTabParam && user?.role) {
      const allowedSuperAdmin =
        user.role === "super_admin" &&
        ["accounts", "jobs"].includes(searchTabParam);

      const allowedAdmin =
        eq(user.role, "admin") && ["jobs"].includes(searchTabParam);

      if (!allowedAdmin && !allowedSuperAdmin) return goToHome();
    }
  }, [searchTabParam, user?.role]);

  if (user && !["admin", "super_admin"].includes(user.role)) return goToHome();

  const menus = [
    {
      items: [
        {
          label: "Accouts",
          value: "accounts",
          leftIcon: Users,
          hide: user?.role && ["employer", "admin"].includes(user.role),
          path: "/admin?tab=accounts",
          active: eq(searchTabParam, "accounts"),
        },
        {
          label: "Jobs",
          value: "jobs",
          leftIcon: BriefcaseBusiness,
          path: "/admin?tab=jobs",
          active: eq(searchTabParam, "jobs"),
        },
      ],
    },
    {
      heading: "Setting",
      items: [
        { label: "Profile", value: "profile", leftIcon: User, disabled: true },
      ],
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