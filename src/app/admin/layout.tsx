import { SidebarMenu } from "@/components";
import { type PropsWithChildren } from "react";

export default function AdminLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main
      role="admin-layout"
      className="flex border-t-4 border-sky-100 h-[calc(100vh-76px)]"
    >
      <div className="w-[300px]">
        <SidebarMenu />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
