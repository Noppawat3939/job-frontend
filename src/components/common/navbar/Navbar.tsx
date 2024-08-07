"use client";

import type { User } from "@/types/user";
import { Alert, Button, Card, Show } from "@/components";
import { cn, eq, goToHome, isUndifined } from "@/lib";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo, useState, useTransition } from "react";
import { deleteCookie } from "cookies-next";
import { QueryCache } from "@tanstack/react-query";
import { userStore } from "@/store";
import { LogOut } from "lucide-react";
import AppLogo from "../../../../public/favicon.ico";
import Image from "next/image";
import { Role } from "@/types";

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
  const isPricing = eq(pathname, "/pricing");

  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const handleScroll = () => {
    const { scrollY } = window;

    setIsScrollingDown(scrollY > 200 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          key: "find_job",
          href: "/jobs",
          label: "Find jobs",
          hide: ["/jobs"].includes(pathname) || isPricing,
        },
        {
          key: "resume_template",
          label: "Resume",
          href: "/resume-template/list",
          hide: ["/resume-template/list"].includes(pathname) || isPricing,
        },
        {
          key: "my_resume",
          label: "My Resume",
          href: "/my-resume",
          hide: !["/resume-template/list"].includes(pathname),
        },
        {
          key: "my_jobs",
          label: "My jobs",
          href: "/my-jobs?tab=apply",
          hide: ["/my-jobs"].includes(pathname) || isPricing,
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

  const shouldBlurNavbar = useMemo(
    () => ["/", "/signup", "/login"].includes(pathname),
    [pathname]
  );

  const redirectWithLogo = {
    employer: "/company",
    admin: "/admin?tab=jobs",
    super_admin: "/admin?tab=accounts",
  } as Record<Role, string>;

  return (
    <Fragment>
      <nav
        className={cn(
          "sticky top-0 z-10 rounded-b-xl mx-auto flex items-center",
          shouldBlurNavbar
            ? "max-w-[1250px] p-5 bg-white/40 backdrop-blur-md"
            : "w-full bg-white py-5 px-[50px]"
        )}
      >
        <Link
          href={
            isPricing
              ? "/pricing"
              : (user && redirectWithLogo?.[user?.role]) || "/"
          }
          className={cn(
            "flex items-center hover:opacity-90 bg-white",
            isMainPath && "border rounded-lg shadow-sm pl-1 pr-2 py-1"
          )}
          aria-label="app-logo-link"
          shallow={!user || user.role === "user" || isPricing}
        >
          <div
            className={cn(
              "flex rounded-full mr-1",
              !isMainPath && "border border-gray-100"
            )}
          >
            <Image src={AppLogo} alt="app-logo" className="w-8 h-8" />
          </div>
          <div
            aria-label="logo"
            className={cn(
              "text-slate-800 max-md:text-3xl font-semibold",
              isMainPath ? "text-2xl" : "text-3xl"
            )}
          >
            {"Jobify"}
          </div>
        </Link>

        <Show
          when={isScrollingDown && ["/resume-template/list"].includes(pathname)}
        >
          <div className="flex bg-white border  ml-[30px] justify-center p-1 rounded-lg mx-2">
            <Button asChild size="sm" variant="ghost">
              <Link href={"/pricing"} target="_blank" rel="noreferer">
                {"Pricing"}
              </Link>
            </Button>
          </div>
        </Show>

        <div className="flex items-baseline ml-auto space-x-4">
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

          <Show when={!isUndifined(user) && !isPricing}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpenSignoutModal(true)}
            >
              {"Sign out"}
            </Button>
          </Show>

          <Show when={!user && !isPricing}>
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
                  variant={isSignupPath ? "primary" : "outline"}
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
        okButtonProps={{ variant: "purple-shadow" }}
        title={"Are you sure want to sign out?"}
        closeable={false}
        leftIcon={<LogOut className="mr-2 text-violet-400" />}
        open={openSignoutModal}
        okText="Confirm"
        onOk={handleSignout}
      />
    </Fragment>
  );
}
