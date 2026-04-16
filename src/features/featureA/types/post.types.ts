import z from "zod";

import {
  createPostSchema,
  updatePostSchema,
  postSchema,
} from "../schemas/post.schema";

export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;
// Tipuri derivate din scheme
export type Post = z.infer<typeof postSchema>;
