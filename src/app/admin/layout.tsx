import { type PropsWithChildren } from "react";

export default function AdminLayout({ children }: Readonly<PropsWithChildren>) {
  return <main role="admin-layout">{children}</main>;
}
