"use client";

import { Lazyload, PageLoader } from "@/components";
import { goToHome } from "@/lib";
import { userStore } from "@/store";
import { getCookie } from "cookies-next";
import {
  type PropsWithChildren,
  useState,
  useEffect,
  useTransition,
  useLayoutEffect,
} from "react";

type UserLayoutProps = Readonly<PropsWithChildren>;

export default function UserLayout({ children }: UserLayoutProps) {
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();
  const { user } = userStore((s) => ({ user: s.user }));

  useLayoutEffect(() => {
    if ((user && ["user"].includes(user.role)) || getCookie("token")) {
      setLoading(false);
    } else {
      setLoading(true);
      startTransition(goToHome);
    }

    return () => console.clear();
  }, [user]);

  return (
    <Lazyload>
      {loading ? (
        <PageLoader open={loading} />
      ) : (
        <main className="h-[calc(100vh-80px)]">{children}</main>
      )}
    </Lazyload>
  );
}
