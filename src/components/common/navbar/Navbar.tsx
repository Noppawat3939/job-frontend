"use client";

import { Button, SelectItem, Show } from "@/components";
import { eq, noSpace } from "@/lib";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const ROLES = ["Job Seeker", "Employer"];

export default function Navbar() {
  const router = useRouter();

  const pathname = usePathname();

  const isMainPath = eq(pathname, "/");
  const isSigninPath = eq(pathname, "/signin");
  const isSignupPath = eq(pathname, "/signup");

  const [selectedRole, setSelectedRole] = useState<"job_seeker" | "employer">(
    "job_seeker"
  );

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

  const signinAndSignup = isSigninPath ? "Sign up" : "Sign in";

  return (
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
          <Link href="/" shallow>
            {"Jobify"}
          </Link>
        </span>
      </div>
      <div className="flex items-baseline space-x-4">
        <SelectItem
          onChange={(role) => handleSelectRole(role as typeof selectedRole)}
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

        <Show when={!isSigninPath && !isSignupPath}>
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
  );
}
