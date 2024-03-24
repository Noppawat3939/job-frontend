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

type Menu = {
  heading?: string;
  items: {
    label: string;
    value: string;
    leftIcon?: LucideIcon;
    active?: boolean;
  }[];
}[];

export default function SidebarMenu() {
  const menus: Menu = [
    {
      items: [
        { label: "Home", value: "home", leftIcon: Home, active: true },
        { label: "Accouts", value: "accounts", leftIcon: Users },
        { label: "Jobs", value: "jobs", leftIcon: BriefcaseBusiness },
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
      className="bg-transparent h-[calc(100vh-78px)] border rounded-md py-3 px-2  max-w-xs"
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
                <div
                  key={`item_${itemIdx}`}
                  defaultValue={item.value}
                  className={`${
                    item.active ? "text-slate-500" : "text-slate-400"
                  } flex items-center text-sm my-2 w-full p-2 cursor-pointer hover:bg-slate-50 hover:text-slate-500 transition-all duration-200`}
                >
                  {item.leftIcon && <item.leftIcon className="w-4 h-4 mr-2" />}
                  {item.label}
                </div>
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
