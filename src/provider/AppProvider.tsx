import { MainLayout } from "@/components";
import { PropsWithChildren } from "react";

export default function AppProvider({ children }: Readonly<PropsWithChildren>) {
  return <MainLayout>{children}</MainLayout>;
}
