"use client";
import { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";

interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </>
  );
}
