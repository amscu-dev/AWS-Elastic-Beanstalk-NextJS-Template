import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function NuqsProvider({ children }: Props) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
