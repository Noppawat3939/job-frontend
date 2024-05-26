"use client";

import { Lazyload } from "@/components";
import { goToHome } from "@/lib";
import { userStore } from "@/store";
import { Fragment, type PropsWithChildren } from "react";

export default function CompanyBackofficeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { user } = userStore((s) => ({ user: s.user }));

  if (user && user.role !== "employer") return goToHome();

  return (
    <Lazyload fallback={<Fragment />}>
      <main
        rel="company-layout"
        className="flex border-t-4 border-pink-200 h-[calc(100vh-80px)]"
        aria-label="company-layout"
      >
        <section className="w-full">{children}</section>
      </main>
    </Lazyload>
  );
}
