"use client";

import { PageLoader } from "@/components";
import { userStore } from "@/store";
import { useState, type PropsWithChildren, useEffect } from "react";

export default function AdminBackofficeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { user } = userStore((s) => ({ user: s.user }));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && ["admin", "super_admin"].includes(user.role)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);

  return (
    <main
      role="admin-layout"
      aria-label="admin-layout"
      className="flex h-[calc(100vh-80px)]"
    >
      {loading ? (
        <PageLoader open={loading} />
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </main>
  );
}
