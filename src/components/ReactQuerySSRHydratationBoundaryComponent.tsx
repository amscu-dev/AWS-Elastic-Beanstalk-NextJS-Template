// app/posts/page.tsx
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Post from "./ReactQuerySSRClientComponent";
import getQueryClient from "@/lib/queryClient";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTodo(): Promise<Todo> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  if (!res.ok) {
    throw new Error("Failed to fetch todo");
  }

  return res.json();
}

export default function PostContainer() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getTodo,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Post />
      </Suspense>
    </HydrationBoundary>
  );
}
