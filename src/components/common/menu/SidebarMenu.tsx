"use client";

import {
  type LucideIcon,
  Home,
  Users,
  BriefcaseBusiness,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react";
import { Avatar, Button, Command, Show } from "@/components";
import { useRouter } from "next/navigation";
import type { Role } from "@/types";
import { eq } from "@/lib";

type Menu = {
  heading?: string;
  items: {
    label: string;
    value: string;
    leftIcon?: LucideIcon;
    active?: boolean;
    path?: string;
    hide?: boolean;
  }[];
}[];

type SidebarMenuProps = { role?: Role };

export default function SidebarMenu({ role }: SidebarMenuProps) {
  const { push } = useRouter();

  const menus: Menu = [
    {
      items: [
        {
          label: "Home",
          value: "home",
          leftIcon: Home,
          path: `/home/${role}`,
          active: true,
        },
        {
          label: "Accouts",
          value: "accounts",
          leftIcon: Users,
          hide: eq(role, "employer"),
          path: `/account/${role}`,
        },
        {
          label: "Jobs",
          value: "jobs",
          leftIcon: BriefcaseBusiness,
          path: `/job/${role}`,
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
    <aside
      role="sidebar-menus"
      className="bg-transparent h-full border-r  py-3 px-2"
    >
      <div>
        <Button
          className="w-full flex justify-start text-slate-800"
          variant="secondary"
        >
          <Avatar.Avatar className="w-7 h-7 mr-2">
            <Avatar.AvatarFallback className="bg-sky-400 text-white">
              {"SA"}
            </Avatar.AvatarFallback>
          </Avatar.Avatar>
          <span className="flex items-center w-full justify-between">
            {"Super Admin"}
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </span>
        </Button>
      </div>
      <Command.Command className="mt-1 h-auto">
        <Command.CommandList>
          {menus.map(({ items, heading }, idx) => (
            <Command.CommandGroup
              heading={heading}
              key={`menu_${idx}`}
              value="accounts"
            >
              {items.map((item, itemIdx) => (
                <Show key={`item_${itemIdx}`} when={!item.hide}>
                  <div
                    defaultValue={item.value}
                    onClick={() => (item.path ? push(item.path) : null)}
                    className={`${
                      item.active ? "text-slate-500" : "text-slate-400"
                    } flex items-center text-sm my-2 w-full p-2 cursor-pointer hover:bg-slate-50 hover:text-slate-500 transition-all duration-200`}
                  >
                    {item.leftIcon && (
                      <item.leftIcon className="w-4 h-4 mr-2" />
                    )}
                    {item.label}
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
    </aside>
  );
}
