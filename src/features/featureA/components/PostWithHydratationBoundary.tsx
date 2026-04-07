// app/posts/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Post from "./Post";
import getQueryClient from "@/lib/queryClient";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTodo(): Promise<Todo> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todo");
  }

  return res.json();
}

export default async function PostWithHydratationBoundary() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getTodo,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post />
    </HydrationBoundary>
  );
}
