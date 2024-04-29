"use client";

import { SidebarMenu } from "@/components";
import type { Menu } from "@/components/common/menu/SidebarMenu";
import { eq, goToHome } from "@/lib";
import { userStore } from "@/store";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

export default function CompanyBackofficeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const pathname = usePathname();

  const { user } = userStore((s) => ({ user: s.user }));

  if (user && user.role !== "employer") return goToHome();

  const menus: Menu = [
    {
      items: [
        {
          label: "Jobs",
          value: "jobs",
          path: "/company",
          active: eq(pathname, "/company"),
        },
        {
          label: "Posts",
          value: "posts",
          path: "/company/posts",
        },
        {
          label: "Job applied",
          value: "jop applied",
          path: "/jobs/applied",
        },
      ],
    },
  ];

  return (
    <main
      rel="company-layout"
      className="flex border-t-4 border-sky-100 h-[calc(100vh-80px)]"
      aria-label="company-layout"
    >
      <div className="w-[300px]">
        <SidebarMenu user={user} menus={menus} />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
