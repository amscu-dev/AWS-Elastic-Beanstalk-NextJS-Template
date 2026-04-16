"use client";
import { FallbackProps } from "react-error-boundary";

import { isAppError } from "@/utils/handleApiError";

export default function PostErrorFallback({
  resetErrorBoundary,
  error,
}: FallbackProps) {
  const is404 =
    isAppError(error) &&
    error.kind === "axios" &&
    error.error.response?.status === 404;

  if (is404) return <div>Post not found.</div>;

  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
