export const postQueryKeys = {
  byId: (id: number) => ["posts", id] as const,
  create: () => ["posts-create"] as const,
  delete: () => ["posts-delete"] as const,
  patch: () => ["posts-patch"] as const,
  all: () => ["posts"] as const,
};
