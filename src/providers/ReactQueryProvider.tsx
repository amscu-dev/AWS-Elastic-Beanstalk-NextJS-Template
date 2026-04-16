"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

import getQueryClient from "@/lib/queryClient";

interface Props {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools
        buttonPosition="bottom-right" // Position of toggle button
        initialIsOpen={false} // Start with panel closed
        client={queryClient} // Specify QueryClient (optional)
        position="right" // Position of panel
      />
    </QueryClientProvider>
  );
}
