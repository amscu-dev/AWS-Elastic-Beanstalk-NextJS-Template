"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

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

export default function Post() {
  const { data } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: getTodo,
  });

  return (
    <ul>
      <li>ID: {data.id}</li>
      <li>Title: {data.title}</li>
      <li>User ID: {data.userId}</li>
      <li>Completed: {data.completed ? "Yes" : "No"}</li>
    </ul>
  );
}
