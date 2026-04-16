"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

type ThemeProviderProperties = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({
  children,
  ...properties
}: ThemeProviderProperties) {
  return (
    <NextThemesProvider
      disableTransitionOnChange
      defaultTheme="system"
      attribute="class"
      enableSystem
      {...properties}
    >
      {children}
    </NextThemesProvider>
  );
}
