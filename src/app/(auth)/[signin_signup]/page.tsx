"use client";

import type { RolesParams } from "@/types";
import JobSeekerImage from "@/assets/signin_signup_jobseeker.jpg";
import EmployerImage from "@/assets/signin-signup_employer.jpg";
import Image from "next/image";
import { eq } from "@/lib";

type SignInSignUpPageProps = {
  params: { signin_signup: string };
  searchParams: { selected: RolesParams };
};

export default function SignInSignUpPage({
  searchParams,
}: SignInSignUpPageProps) {
  const { selected } = searchParams;

  return (
    <div>
      <Image
        height={600}
        className="object-contain"
        src={eq(selected, "jobseeker") ? JobSeekerImage : EmployerImage}
        alt="signin-signup"
      />
    </div>
  );
}
