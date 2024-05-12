"use client";

import type { User } from "@/types/user";
import { Alert, Button, Card, Show } from "@/components";
import { cn, eq, goToHome, isUndifined } from "@/lib";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo, useState, useTransition } from "react";
import { deleteCookie } from "cookies-next";
import { QueryCache } from "@tanstack/react-query";
import { userStore } from "@/store";
import { LogOut } from "lucide-react";

type NavbarProps = { user?: User };

export default function Navbar({ user }: NavbarProps) {
  const queryCache = new QueryCache();
  const { removeUser } = userStore((store) => ({
    removeUser: store.removeUser,
  }));

  const pathname = usePathname();

  const isMainPath = eq(pathname, "/");

  const isLoginPath = eq(pathname, "/login");
  const isSignupPath = eq(pathname, "/signup");

  const [, startTransition] = useTransition();

  const [openSignoutModal, setOpenSignoutModal] = useState(false);

  const handleSignout = () => {
    deleteCookie("token");
    removeUser();
    queryCache.clear();

    startTransition(() => {
      setOpenSignoutModal(false);
      goToHome();
    });
  };

  const displayLoginnedMenus = useMemo(() => {
    if (!user) return;

    if (eq(user?.role, "user"))
      return [
        {
          key: "findJob",
          href: "/job",
          label: "Find jobs",
          hide: ["/job"].includes(pathname),
        },
        {
          key: "myJobs",
          label: "My jobs",
          href: "/my-jobs?tab=favorite",
          hide: ["/my-jobs"].includes(pathname),
        },
      ];

    if (eq(user.role, "employer"))
      return [
        {
          key: "homeCompany",
          label: user.companyName,
          href: "/company",
          hide: false,
        },
      ];

    if (["super_admin", "admin"].includes(user.role))
      return [
        {
          key: "homeAdmin",
          label: `${user.firstName} ${user.lastName}`,
          href: eq(user.role, "admin")
            ? "/admin?tab=jobs"
            : "/admin?tab=accounts",
          hide: false,
        },
      ];
  }, [user, pathname]);

  return (
    <Fragment>
      <nav
        className={`${
          isMainPath && "sticky top-0"
        } backdrop-blur-md border-b border-white px-4 py-5 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-10">
          <span
            aria-label="logo"
            className="text-4xl max-md:text-3xl font-semibold bg-gradient-to-t from-sky-500 via-sky-400 to-sky-300 inline-block text-transparent bg-clip-text"
          >
            <Link href={"/"} shallow>
              {"Jobify"}
            </Link>
          </span>
        </div>

        <div className="flex items-baseline space-x-4">
          <Show when={!isUndifined(user)}>
            <div datatype="loginned-menus" className=" space-x-4">
              {displayLoginnedMenus
                ?.filter((menu) => !menu.hide)
                ?.map((menu) => (
                  <Button
                    asChild
                    key={menu.key}
                    size="sm"
                    variant={"ghost"}
                    className="text-slate-600"
                  >
                    <Link href={menu.href}>{menu.label}</Link>
                  </Button>
                ))}
            </div>
          </Show>

          <Show when={!isUndifined(user)}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpenSignoutModal(true)}
            >
              {"Sign out"}
            </Button>
          </Show>

          <Show when={!user}>
            <Card.Card
              className={cn(
                "p-1 flex gap-2",
                ["/login", "/signup"].includes(pathname)
                  ? "border-none shadow-none bg-transparent"
                  : null
              )}
            >
              {!isLoginPath && (
                <Button
                  variant="outline"
                  className="w-[80px] cursor-pointer"
                  size="sm"
                  asChild
                >
                  <Link href="/login" aria-label="login-link" shallow={false}>
                    {"Login"}
                  </Link>
                </Button>
              )}
              {!isSignupPath && (
                <Button
                  variant="primary"
                  className="font-bold w-[80px] cursor-pointer"
                  size="sm"
                  asChild
                >
                  <Link href="/signup" aria-label="signup-link" shallow={false}>
                    {"Sign Up"}
                  </Link>
                </Button>
              )}
            </Card.Card>
          </Show>
        </div>
      </nav>

      <Alert
        onOpenChange={setOpenSignoutModal}
        onCancel={() => setOpenSignoutModal(false)}
        title={"Are you sure want to sign out?"}
        closeable={false}
        leftIcon={<LogOut className="mr-2 text-sky-400" />}
        open={openSignoutModal}
        okText="Confirm"
        onOk={handleSignout}
      />
    </Fragment>
  );
}
