import { type FallbackProps, ErrorBoundary } from "react-error-boundary";
import { ComponentType, ReactNode, Suspense } from "react";

type withSuspenseOptions = {
  errorComponent: ComponentType<FallbackProps>;
  loadingComponent?: ReactNode;
};

export const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: withSuspenseOptions,
) => {
  const { errorComponent: ErrorFallbackComponent, loadingComponent = null } =
    options;

  const WithSuspenseComponent = (properties: P) => {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
        <Suspense fallback={loadingComponent}>
          <WrappedComponent {...properties} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  WithSuspenseComponent.displayName = `withSuspense(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithSuspenseComponent;
};
