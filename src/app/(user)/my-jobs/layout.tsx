"use client";

import { Lazyload, PageLoader } from "@/components";
import { goToHome } from "@/lib";
import { userStore } from "@/store";
import {
  type PropsWithChildren,
  useState,
  useEffect,
  useTransition,
} from "react";

type UserLayoutProps = Readonly<PropsWithChildren>;

export default function UserLayout({ children }: UserLayoutProps) {
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();
  const { user } = userStore((s) => ({ user: s.user }));

  useEffect(() => {
    if (user && ["user"].includes(user.role)) {
      setLoading(false);
    } else {
      setLoading(true);
      startTransition(goToHome);
    }

    return () => {
      console.clear();
    };
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
