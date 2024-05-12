"use client";

import { getCookie } from "cookies-next";
import Login from "./Login";
import { Lazyload } from "@/components";
import { goToHome } from "@/lib";

export default function LoginPage() {
  const token = getCookie("token");

  if (token) return goToHome();

  return (
    <Lazyload>
      <Login />
    </Lazyload>
  );
}
