"use client";

import { SidebarMenu } from "@/components";
import type { Menu } from "@/components/common/menu/SidebarMenu";
import { eq, goToHome } from "@/lib";
import { userStore } from "@/store";
import { BriefcaseBusiness, FileText } from "lucide-react";
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
          leftIcon: BriefcaseBusiness,
        },
        {
          label: "Job applied",
          value: "jop applied",
          path: "/company/applied",
          leftIcon: FileText,
          active: eq(pathname, "/company/applied"),
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
      <div className="w-fit">
        <SidebarMenu user={user} menus={menus} />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
