"use client";

import { useGetPostById } from "../services/post.hooks";

export default function Post() {
  const { data } = useGetPostById(1);

  return (
    <ul>
      <li>ID: {data.id}</li>
      <li>Title: {data.title}</li>
      <li>User ID: {data.userId}</li>
      <li>Completed: {data.completed ? "Yes" : "No"}</li>
    </ul>
  );
}
