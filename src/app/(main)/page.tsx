"use client";

import { Lazyload } from "@/components";
import Landing from "./Landing";
import { userStore } from "@/store";
import { useRouter } from "next/navigation";
import { redirectWithRole } from "@/lib";

export default function MainPage() {
  const { user } = userStore((store) => ({ user: store.user }));
  const router = useRouter();

  if (user && redirectWithRole?.[user?.role])
    return router.push(redirectWithRole?.[user?.role]);

  return (
    <Lazyload>
      <Landing />
    </Lazyload>
  );
}
