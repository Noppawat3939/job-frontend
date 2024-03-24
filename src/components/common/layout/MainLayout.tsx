import { type PropsWithChildren } from "react";
import { Navbar } from "..";

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main
      role="main-layout"
      className="h-screen bg-gradient-to-b from-whit to-5%-slate-50"
    >
      <Navbar />
      {children}
    </main>
  );
}
