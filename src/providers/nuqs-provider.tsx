import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode } from "react";

interface Properties {
  children: ReactNode;
}

export default function NuqsProvider({ children }: Properties) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
