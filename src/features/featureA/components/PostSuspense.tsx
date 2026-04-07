import { Suspense } from "react";
import PostWithHydratationBoundary from "./PostWithHydratationBoundary";

export default function PostSuspense() {
  return (
    <Suspense>
      <PostWithHydratationBoundary />
    </Suspense>
  );
}
