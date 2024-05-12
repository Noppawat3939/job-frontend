"use client";

import { Lazyload } from "@/components";
import Signup from "./Signup";
import { getCookie } from "cookies-next";
import { goToHome } from "@/lib";

export default function SignupPage() {
  const token = getCookie("token");

  if (token) return goToHome();

  return (
    <Lazyload>
      <Signup />
    </Lazyload>
  );
}
