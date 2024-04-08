"use client";

import { type PropsWithChildren } from "react";
import { SidebarMenu } from "@/components";
import { eq } from "@/lib";
import { userStore } from "@/store";
import { Heart, History } from "lucide-react";
import { useSearchParams } from "next/navigation";

type UserLayoutProps = Readonly<PropsWithChildren>;

export default function UserLayout({ children }: UserLayoutProps) {
  const { user } = userStore((store) => ({ user: store.user }));
  const searchParam = useSearchParams();
  const searchTabParam = searchParam.get("tab") as
    | "favorite"
    | "apply-history"
    | undefined;

  const menus = [
    {
      items: [
        {
          label: "Job Favorite",
          value: "job-favorite",
          path: "/my-jobs?tab=favorite",
          leftIcon: Heart,
          active: eq(searchTabParam, "favorite"),
        },
        {
          label: "Job Apply history",
          value: "job-apply-history",
          path: "/my-jobs?tab=apply-history",
          leftIcon: History,
          active: eq(searchTabParam, "apply-history"),
        },
      ],
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
