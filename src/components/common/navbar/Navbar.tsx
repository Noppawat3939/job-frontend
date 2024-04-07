"use client";

import type { User } from "@/types/user";
import { Alert, Button, SelectItem, Show } from "@/components";
import { eq, goToHome, isUndifined, noSpace } from "@/lib";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useState, useTransition } from "react";
import { deleteCookie } from "cookies-next";
import { QueryCache } from "@tanstack/react-query";

const ROLES = ["Job Seeker", "Employer"];

type NavbarProps = { user?: User };

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const queryCache = new QueryCache();

  const pathname = usePathname();

  const isMainPath = eq(pathname, "/");
  const isSigninPath = eq(pathname, "/signin");
  const isSignupPath = eq(pathname, "/signup");

  const [pending, startTransition] = useTransition();

  const [selectedRole, setSelectedRole] = useState<"job_seeker" | "employer">(
    "job_seeker"
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
    queryCache.clear();

    startTransition(() => {
      setOpenSignoutModal(false);
      goToHome();
    });
  };

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
        <div className="flex items-baseline space-x-4">
          <Show when={!isUndifined(user)}>
            <div datatype="loginned-menus">
              <Button size="sm" variant="ghost" className="font-normal">
                <Link href={"/job"}>{"Find jobs"}</Link>
              </Button>
              <Button size="sm" variant="ghost" className="font-normal">
                <Link href={"/my-jobs"}>{"My jobs"}</Link>
              </Button>
            </div>
          </Show>

          <Show when={!user}>
            <Fragment>
              <SelectItem
                onChange={(role) =>
                  handleSelectRole(role as typeof selectedRole)
                }
                className="w-[150px]"
                placeholder={ROLES.at(0)}
                items={ROLES?.map((role) => ({
                  label: role,
                  value: noSpace(role.toLowerCase()),
                }))}
              />
              <Button size="sm">{`${
                eq(selectedRole, "employer") ? "Post" : "Find"
              } your job`}</Button>
            </Fragment>
          </Show>

          <Show when={!isSigninPath && !isSignupPath}>
            {user ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setOpenSignoutModal(true)}
              >
                {"Sign out"}
              </Button>
            ) : (
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
            )}
          </Show>
        </div>
      </nav>

      <Alert
        onOpenChange={setOpenSignoutModal}
        title={"Are you sure signout?"}
        open={openSignoutModal}
        okText="Confirm"
        onOk={handleSignout}
      />
    </Fragment>
  );
}
