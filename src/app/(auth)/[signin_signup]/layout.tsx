"use client";

import { goToHome } from "@/lib";
import { usePathname, useSearchParams } from "next/navigation";
import { type PropsWithChildren } from "react";

export default function SignInWithSignUpLayout({
  children,
}: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");

  const allowed = [
    ["/signin", "/signup"].includes(pathname),
    ["jobseeker", "employer"].includes(String(selected)),
  ].every(Boolean);

  if (!allowed) return goToHome();

  return (
    <main
      role="auth-signin-signup-layout"
      className=" bg-white h-[calc(100vh-80px)]"
    >
      {children}
    </main>
  );
}
