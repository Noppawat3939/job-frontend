import { type ElementRef, type PropsWithChildren } from "react";
import { Scroll } from "@/components";
import { SidebarMenu } from "..";
import { type Menu } from "../menu/SidebarMenu";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { collapseSidebarStore } from "@/store";
import { cn } from "@/lib";

type LayoutWithSidebarProps = {
  menu: Menu;
  scrollAreaClass?: ElementRef<typeof ScrollAreaPrimitive.Root>["className"];
} & Readonly<PropsWithChildren>;

export default function LayoutWithSidebar({
  menu,
  children,
  scrollAreaClass,
}: LayoutWithSidebarProps) {
  const { collapse } = collapseSidebarStore();

  return (
    <div className="flex h-full">
      <SidebarMenu
        menus={menu}
        className="top-[72px] h-[calc(100dvh-72px)] fixed bg-white"
      />
      <Scroll.ScrollArea
        className={cn(
          scrollAreaClass,
          collapse
            ? "translate-x-[60px] w-[calc(100vw-60px)]"
            : "translate-x-[300px] w-[calc(100vw-300px)]"
        )}
      >
        {children}
      </Scroll.ScrollArea>
    </div>
  );
}
