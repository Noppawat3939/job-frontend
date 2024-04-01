"use client";

import { type PropsWithChildren } from "react";
import { MainLayout } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientConfig } from "@/config";

export default function AppProvider({ children }: Readonly<PropsWithChildren>) {
  const queryClient = new QueryClient(queryClientConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>{children}</MainLayout>
    </QueryClientProvider>
  );
}
