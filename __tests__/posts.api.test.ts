import { postsApi } from "@/features/featureA/services/post.api";

import { createServer } from "../mocks/create-server";
const BASE_URL = "http://localhost:3001";

const mockMeta = {
  timestamp: new Date().toISOString(),
  requestId: "req-123",
  traceId: "trace-123",
};

const mockPost = {
  title: "Test title",
  completed: false,
  userId: 10,
  id: 1,
};

createServer([
  {
    res: () => ({
      data: [mockPost],
      meta: mockMeta,
    }),
    path: `${BASE_URL}/posts`,
    method: "get",
  },
  {
    res: ({ params }) => ({
      data: { ...mockPost, id: Number(params.id) },
      meta: mockMeta,
    }),
    path: `${BASE_URL}/posts/:id`,
    method: "get",
  },
  {
    res: () => ({
      data: mockPost,
      meta: mockMeta,
    }),
    path: `${BASE_URL}/posts`,
    method: "post",
  },
  {
    res: ({ params }) => ({
      data: { ...mockPost, title: "Updated title", id: Number(params.id) },
      meta: mockMeta,
    }),
    path: `${BASE_URL}/posts/:id`,
    method: "patch",
  },
  {
    path: `${BASE_URL}/posts/:id`,
    method: "delete",
    res: () => null,
    status: 204,
  },
]);

describe("postsApi", () => {
  it("getAll should return all posts", async () => {
    const result = await postsApi.getAll();

    expect(result).toEqual({
      meta: expect.objectContaining({
        timestamp: expect.any(String),
        requestId: "req-123",
        traceId: "trace-123",
      }),
      data: [
        {
          title: "Test title",
          completed: false,
          userId: 10,
          id: 1,
        },
      ],
    });
  });

  it("getById should return one post by id", async () => {
    const result = await postsApi.getById(5);

    expect(result).toEqual({
      meta: expect.objectContaining({
        timestamp: expect.any(String),
        requestId: "req-123",
        traceId: "trace-123",
      }),
      data: {
        title: "Test title",
        completed: false,
        userId: 10,
        id: 5,
      },
    });
  });

  it("create should return the created post", async () => {
    const payload = {
      title: "New post",
      completed: false,
      userId: 10,
    };

    const result = await postsApi.create(payload);

    expect(result).toEqual({
      meta: expect.objectContaining({
        timestamp: expect.any(String),
        requestId: "req-123",
        traceId: "trace-123",
      }),
      data: {
        title: "Test title",
        completed: false,
        userId: 10,
        id: 1,
      },
    });
  });

  it("patch should return the updated post", async () => {
    const payload = {
      title: "Changed title",
    };

    const result = await postsApi.patch(7, payload);

    expect(result).toEqual({
      meta: expect.objectContaining({
        timestamp: expect.any(String),
        requestId: "req-123",
        traceId: "trace-123",
      }),
      data: {
        title: "Updated title",
        completed: false,
        userId: 10,
        id: 7,
      },
    });
  });

  it("delete should resolve without returning data", async () => {
    await expect(postsApi.delete(3)).resolves.toBeUndefined();
  });
});
