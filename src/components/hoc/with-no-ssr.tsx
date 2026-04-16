import { ComponentType, ReactNode } from "react";
import { useIsClient } from "@uidotdev/usehooks";

type WithNoSSROptions = {
  fallback?: ReactNode;
};

export const withNoSSR = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithNoSSROptions,
) => {
  const { fallback = null } = options ?? {};

  const NoSSRComponent = (properties: P) => {
    const isClient = useIsClient();

    if (!isClient) return <>{fallback}</>;

    return <WrappedComponent {...properties} />;
  };

  NoSSRComponent.displayName = `withNoSSR(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return NoSSRComponent;
};
