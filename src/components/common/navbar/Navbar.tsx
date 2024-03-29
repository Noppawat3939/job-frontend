"use client";

import { Button, SelectItem } from "@/components";
import { eq, noSpace } from "@/lib";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const ROLES = ["Job Seeker", "Employer"];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isSigninPath = eq(pathname, "/signin");
  const isSignupPath = eq(pathname, "/signup");

  const [selectedRole, setSelectedRole] = useState<"job_seeker" | "employer">(
    "job_seeker"
  );

  const handleSelectRole = useCallback(
    (role: typeof selectedRole) => setSelectedRole(role),
    []
  );

  const signinAndSignup = isSigninPath ? "Sign up" : "Sign in";

  return (
    <nav className="px-4 py-5 flex items-center justify-between">
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
          items={ROLES.map((role) => ({
            label: role,
            value: noSpace(role.toLowerCase()),
          }))}
        />

        <Button size="sm">{`${
          selectedRole === "employer" ? "Post" : "Find"
        } your job`}</Button>
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
      </div>
    </nav>
  );
}
