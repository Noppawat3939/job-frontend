"use client";

import type { User } from "@/types/user";
import { Alert, Button, Show } from "@/components";
import { cn, eq, goToHome, isUndifined, noSpace } from "@/lib";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useMemo, useState, useTransition } from "react";
import { deleteCookie } from "cookies-next";
import { QueryCache } from "@tanstack/react-query";
import { userStore } from "@/store";
import { LogOut } from "lucide-react";

type SelectedSearchParams = "job_seeker" | "employer";

type NavbarProps = { user?: User };

export default function Navbar({ user }: NavbarProps) {
  const queryCache = new QueryCache();
  const { removeUser } = userStore((store) => ({
    removeUser: store.removeUser,
  }));

  const router = useRouter();
  const search = useSearchParams();
  const selectedSearchParams = search.get("selected") as SelectedSearchParams;

  const pathname = usePathname();

  const isMainPath = eq(pathname, "/");
  const isSigninPath = eq(pathname, "/signin");
  const isSignupPath = eq(pathname, "/signup");

  const [, startTransition] = useTransition();

  const [selectedRole, setSelectedRole] = useState<SelectedSearchParams>(
    () => selectedSearchParams || "job_seeker"
  );
  const [openSignoutModal, setOpenSignoutModal] = useState(false);

  const handleSelectRole = useCallback(
    (role: typeof selectedRole) => {
      const [, searchParams] = location.search.split("?");
      setSelectedRole(role);

      if (searchParams && (isSigninPath || isSignupPath)) {
        const href = `${location.origin}${location.pathname}?selected=${
          eq(role, "employer") ? "employer" : "jobseeker"
        }`;

        router.push(href);
      }
    },
    [isSigninPath, isSignupPath, router]
  );

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
          hide: false,
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

  const signinAndSignup = isSigninPath ? "Sign up" : "Sign in";

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

        <Show when={isSigninPath || isSignupPath}>
          <div aria-label="select-role" className="flex space-x-[50px]">
            <h2
              datatype="job_seekeer"
              aria-label="job-seeker-role"
              className={cn(
                "text-slate-700 cursor-pointer hover:opacity-60 transition-all duration-200",
                eq(selectedRole, "job_seeker") && "font-medium text-slate-800"
              )}
              onClick={() => handleSelectRole("job_seeker")}
            >
              {"Job seeker"}
            </h2>
            <h2
              datatype="company"
              aria-label="employer-role"
              className={cn(
                "text-slate-700 cursor-pointer hover:opacity-60 transition-all duration-200",
                eq(selectedRole, "employer") && "font-medium text-slate-800"
              )}
              onClick={() => handleSelectRole("employer")}
            >
              {"Company"}
            </h2>
          </div>
        </Show>

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

          <Show when={!isSigninPath && !isSignupPath && !user}>
            <Button className="w-[80px]" size="sm" variant="outline" asChild>
              <Link
                href={`/${noSpace(
                  signinAndSignup.toLowerCase()
                )}?selected=${noSpace(selectedRole, "_")}`}
                shallow={false}
              >
                {signinAndSignup}
              </Link>
            </Button>
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
