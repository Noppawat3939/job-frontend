import { LayoutWithSidebar } from "@/components";
import { generateMenusSidebar } from "@/lib";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Applied() {
  const pathname = usePathname();

  const menu = useMemo(() => generateMenusSidebar(pathname), [pathname]);

  return <LayoutWithSidebar menu={menu.companyMenus}>Appied</LayoutWithSidebar>;
}
