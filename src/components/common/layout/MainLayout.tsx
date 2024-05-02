import { useEffect, type PropsWithChildren } from "react";
import { Navbar } from "..";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { userService } from "@/services";
import { isUndifined } from "@/lib";
import { QUERY_KEY } from "@/constants";
import { userStore } from "@/store";
import { Toaster } from "@/components";

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  const { user, setUser } = userStore();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ME, getCookie("token")],
    queryFn: () => userService.fetchUser(),
    enabled: !isUndifined(getCookie("token")),
    select: ({ data }) => data,
  });

  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, user]);

  return (
    <main
      role="main-layout"
      className="h-screen bg-gradient-to-b from-white to-slate-50"
    >
      <Navbar user={user} />
      {children}
      <Toaster />
    </main>
  );
}
