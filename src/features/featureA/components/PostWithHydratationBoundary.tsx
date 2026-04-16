// app/posts/page.tsx
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import getQueryClient from "@/lib/queryClient";

import { postQueryKeys } from "../services/post.queryKeys";
import { postsApi } from "../services/post.api";
import Post from "./Post";

export default async function PostWithHydratationBoundary() {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryFn: () => postsApi.getById(1),
      queryKey: postQueryKeys.byId(1),
    });
  } catch {
    // return <p>error...</p>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post id={1} />
    </HydrationBoundary>
  );
}
