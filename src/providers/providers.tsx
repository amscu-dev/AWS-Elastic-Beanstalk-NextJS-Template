"use client";
import { ReactNode } from "react";

import StoreContextProvider from "./redux-store-provider";
import ReactQueryProvider from "./react-query-provider";
import NuqsProvider from "./nuqs-provider";

interface Properties {
  children: ReactNode;
}
export default function Providers({ children }: Properties) {
  return (
    <>
      <ReactQueryProvider>
        <StoreContextProvider>
          <NuqsProvider>{children}</NuqsProvider>
        </StoreContextProvider>
      </ReactQueryProvider>
    </>
  );
}
