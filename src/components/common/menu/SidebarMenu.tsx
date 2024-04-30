"use client";

import { type LucideIcon, ChevronRight, ChevronLeft } from "lucide-react";
import type { User } from "@/types/user";
import { Avatar, Button, Command, Show } from "@/components";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib";
import { collapseSidebarStore } from "@/store";

export type Menu = {
  heading?: string;
  items: {
    label: string;
    value: string;
    leftIcon?: LucideIcon;
    active?: boolean;
    path?: string;
    hide?: boolean;
    disabled?: boolean;
  }[];
}[];

type SidebarMenuProps = { menus: Menu; user?: User };

export default function SidebarMenu({ menus, user }: SidebarMenuProps) {
  const { push } = useRouter();

  const { collapse, toggleCollapse } = collapseSidebarStore();

  const displayName = useMemo(() => {
    if (user?.firstName && user.lastName)
      return {
        name: `${user.firstName} ${user.lastName}`,
        fallbackImage: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
      };
    if (user?.firstName && !user.lastName)
      return {
        name: `${user.firstName}`,
        fallbackImage: `${user.firstName.charAt(0)}`,
      };

    return { name: user?.email, fallbackImage: "" };
  }, [user]);

  return (
    <aside
      role="sidebar-menus"
      className={cn(
        "bg-transparent h-full border-r py-3 px-2 transition-all duration-200 relative",
        collapse ? "w-[60px] flex flex-col items-center" : "w-[300px]"
      )}
    >
      <div>
        <Button
          className="w-full flex justify-start text-slate-800"
          variant="secondary"
        >
          <Avatar.Avatar className={cn("w-7 h-7", !collapse ? "mr-2" : "")}>
            <Avatar.AvatarFallback className="bg-sky-400 text-white">
              {displayName.fallbackImage.toUpperCase()}
            </Avatar.AvatarFallback>
          </Avatar.Avatar>

          {!collapse && (
            <span className="flex items-center w-full justify-between">
              {displayName.name}
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </span>
          )}
        </Button>
      </div>
      <Command.Command className="mt-1 h-auto">
        <Command.CommandList>
          {menus.map(({ items, heading }, idx) => (
            <Command.CommandGroup
              heading={collapse ? null : heading}
              key={`menu_${idx}`}
              value="accounts"
            >
              {items.map((item, itemIdx) => (
                <Show key={`item_${itemIdx}`} when={!item.hide}>
                  <div
                    defaultValue={item.value}
                    aria-disabled={item.disabled}
                    onClick={() =>
                      item.path && !item.disabled ? push(item.path) : null
                    }
                    className={`${
                      item.disabled
                        ? "opacity-20 !cursor-default !hover:bg-transparent"
                        : item.active
                        ? "text-slate-500 font-medium"
                        : "text-slate-400 opacity-70"
                    } flex items-center text-sm my-2 w-full p-2 cursor-pointer hover:bg-slate-50 hover:text-slate-500 transition-all duration-200`}
                  >
                    {item.leftIcon && (
                      <item.leftIcon
                        className={cn("w-4 h-4", collapse ? "w-5 h-5" : "mr-2")}
                      />
                    )}
                    {!collapse && item.label}
                  </div>
                </Show>
              ))}

              <Show when={menus.length > 1 && idx !== menus.length - 1}>
                <Command.CommandSeparator />
              </Show>
            </Command.CommandGroup>
          ))}
        </Command.CommandList>
      </Command.Command>
      <Button
        variant="ghost"
        onClick={toggleCollapse}
        className="w-full absolute bottom-1 left-0"
      >
        {collapse ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>
    </aside>
  );
}
