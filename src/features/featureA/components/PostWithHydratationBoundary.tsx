// app/posts/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Post from "./Post";
import getQueryClient from "@/lib/queryClient";
import { postsApi } from "../services/post.api";
import { postQueryKeys } from "../services/post.queryKeys";

export default async function PostWithHydratationBoundary() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: postQueryKeys.byId(1),
    queryFn: () => postsApi.getById(1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post />
    </HydrationBoundary>
  );
}
