"use client";

import Login from "./Login";
import { Lazyload } from "@/components";

export default function LoginPage() {
  return (
    <Lazyload>
      <Login />
    </Lazyload>
  );
}
