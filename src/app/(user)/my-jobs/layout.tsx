"use client";

import { Lazyload } from "@/components";
import { type PropsWithChildren } from "react";

type UserLayoutProps = Readonly<PropsWithChildren>;

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <Lazyload>
      <main className="h-[calc(100vh-80px)]">{children}</main>
    </Lazyload>
  );
}
