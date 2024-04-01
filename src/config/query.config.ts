import { type QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig = {
  defaultOptions: {
    mutations: { retryDelay: 3000 },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchInterval: false,
      retryDelay: 3000,
      retry(failureCount, error) {
        if (error && failureCount > 3) {
          return false;
        }

        return true;
      },
    },
  },
} as QueryClientConfig;
