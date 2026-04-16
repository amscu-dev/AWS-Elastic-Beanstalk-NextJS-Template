"use client";
import { ReactNode } from "react";

import StoreContextProvider from "./ReduxStoreProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import NuqsProvider from "./NuqsProvider";

interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
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
