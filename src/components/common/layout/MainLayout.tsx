import { type PropsWithChildren } from "react";
import { Navbar } from "..";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { userService } from "@/services/user";
import { isUndifined } from "@/lib";
import { QUERY_KEY } from "@/constants";

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.GET_ME, getCookie("token")],
    queryFn: () => userService.fetchUser(),
    enabled: !isUndifined(getCookie("token")),
    select: ({ data }) => data,
  });

  return (
    <main
      role="main-layout"
      className="h-screen bg-gradient-to-b from-white to-slate-50"
    >
      <Navbar user={user} />
      {children}
    </main>
  );
}
