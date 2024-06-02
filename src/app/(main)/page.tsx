"use client";

import { Lazyload } from "@/components";
import Landing from "./Landing";
import { userStore } from "@/store";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const { user } = userStore((store) => ({ user: store.user }));
  const router = useRouter();

  if (user?.role === "employer") return router.push("/company");

  return (
    <Lazyload>
      <Landing />
    </Lazyload>
  );
}
