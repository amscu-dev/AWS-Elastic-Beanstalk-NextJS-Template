"use client";

import { withNoSSR } from "@/components/hoc/withNoSsr";

import { useGetPostById } from "../services/post.hooks";
// Solve#1 for issue :
// Uncaught Error: Switched to client rendering because the server rendering errored:
const Post = withNoSSR(({ id }: { id: number }) => {
  const { data } = useGetPostById(id);

  return (
    <ul>
      <li>ID: {data.id}</li>
      <li>Title: {data.title}</li>
      <li>User ID: {data.userId}</li>
      <li>Completed: {data.completed ? "Yes" : "No"}</li>
    </ul>
  );
});

export default Post;

// Solve#2:
/*
"use client";

import dynamic from "next/dynamic";

const Post = dynamic(() => import("@/features/featureA/components/Post"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PostClientWrapper({ id }: { id: number }) {
  return <Post id={id} />;
}
*/
