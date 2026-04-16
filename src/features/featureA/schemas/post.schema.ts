import z from "zod";

// Schema de baza
export const postSchema = z.object({
  completed: z.boolean(),
  userId: z.number(),
  title: z.string(),
  id: z.number(),
});

// DTO creare — fara id (generat de server)
export const createPostSchema = postSchema.omit({ id: true });

// DTO update — toate campurile optionale (patch partial)
export const updatePostSchema = postSchema.omit({ id: true }).partial();
