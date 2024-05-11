import type { Metadata } from "next";
import { Kanit, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/provider";

import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jobify.com | find your job easy and fast.",
  description: "Jobify | Find your jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          kanit.variable,
          poppins.variable
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
