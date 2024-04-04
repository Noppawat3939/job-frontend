"use client";

import type { RolesParams } from "@/types";
import JobSeekerImage from "@/assets/signin_signup_jobseeker.jpg";
import EmployerImage from "@/assets/signin-signup_employer.jpg";
import Image from "next/image";
import { eq, noSpace } from "@/lib";
import { GeneralForm, Tabs } from "@/components";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type SignInSignUpPageProps = {
  params: { signin_signup: string };
  searchParams: { selected: RolesParams };
};

const TABS = ["Sign in", "Sign up"] as const;

export default function SignInSignUpPage({
  searchParams,
  params,
}: SignInSignUpPageProps) {
  const { selected } = searchParams;

  const router = useRouter();

  const handleChangeTab = useCallback(
    (pathname: string) => {
      const url = `${location.origin}/${pathname}${location.search}`;

      router.push(url);
    },
    [router]
  );

  return (
    <section className="max-md:px-4">
      <div className="flex w-fit mx-auto max-md:flex-col">
        <Image
          className="object-contain mb-auto w-[600px] max-md:w-[480px] max-sm:w-[360px]"
          src={eq(selected, "jobseeker") ? JobSeekerImage : EmployerImage}
          alt="signin-signup"
        />
        <Tabs.Tabs
          onValueChange={handleChangeTab}
          defaultValue={params.signin_signup}
          className="w-[500px] border rounded-md shadow-sm p-3 max-md:w-[95%] max-sm:w-full"
        >
          <Tabs.TabsList>
            {TABS.map((tab) => (
              <Tabs.TabsTrigger
                key={`tab-${tab}`}
                value={noSpace(tab.toLowerCase())}
              >
                {tab}
              </Tabs.TabsTrigger>
            ))}
          </Tabs.TabsList>
          <GeneralForm
            value={"signin"}
            title={TABS[0]}
            inputs={[
              {
                key: "email",
                props: {
                  name: "email",
                  label: "Email",
                  placeholder: "Please enter your email",
                },
              },
              {
                key: "password",
                props: {
                  label: "Password",
                  placeholder: "********",
                  type: "password",
                },
              },
            ]}
            buttonProps={{ submit: { text: TABS[0] } }}
          />
          <GeneralForm
            value={"signup"}
            title={TABS[1]}
            inputs={[
              {
                key: "email",
                props: {
                  name: "email",
                  label: "Email",
                  placeholder: "Please enter your email",
                },
              },
              {
                key: "firstname",
                props: {
                  name: "firstname",
                  label: "First name",
                  placeholder: "Please enter your first name",
                },
              },
              {
                key: "lastname",
                props: {
                  name: "lastname",
                  label: "lastname",
                  placeholder: "Please enter your lastname",
                },
              },
              {
                key: "password",
                props: {
                  name: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "Please enter your password",
                },
              },
              {
                key: "confirmPassword",
                props: {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: "password",
                  placeholder: "Confirm your password",
                },
              },
            ]}
            buttonProps={{ submit: { text: TABS[1] } }}
          />
        </Tabs.Tabs>
      </div>
    </section>
  );
}
