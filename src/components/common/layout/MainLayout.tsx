import { type PropsWithChildren } from "react";
import { Navbar } from "..";

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main
      role="main-layout"
      className="h-screen bg-gradient-to-b from-white to-slate-50"
    >
      <Navbar />
      {children}
    </main>
  );
}
