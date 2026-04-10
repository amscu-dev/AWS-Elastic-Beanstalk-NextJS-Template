import { postsApi } from "@/features/featureA/services/post.api";
import { createServer } from "../mocks/createServer";
const BASE_URL = "http://localhost:3001";

const mockMeta = {
  requestId: "req-123",
  traceId: "trace-123",
  timestamp: new Date().toISOString(),
};

const mockPost = {
  id: 1,
  userId: 10,
  title: "Test title",
  completed: false,
};

createServer([
  {
    path: `${BASE_URL}/posts`,
    method: "get",
    res: () => ({
      data: [mockPost],
      meta: mockMeta,
    }),
  },
  {
    path: `${BASE_URL}/posts/:id`,
    method: "get",
    res: ({ params }) => ({
      data: { ...mockPost, id: Number(params.id) },
      meta: mockMeta,
    }),
  },
  {
    path: `${BASE_URL}/posts`,
    method: "post",
    res: () => ({
      data: mockPost,
      meta: mockMeta,
    }),
  },
  {
    path: `${BASE_URL}/posts/:id`,
    method: "patch",
    res: ({ params }) => ({
      data: { ...mockPost, id: Number(params.id), title: "Updated title" },
      meta: mockMeta,
    }),
  },
  {
    path: `${BASE_URL}/posts/:id`,
    method: "delete",
    status: 204,
    res: () => null,
  },
]);

describe("postsApi", () => {
  it("getAll should return all posts", async () => {
    const result = await postsApi.getAll();

    expect(result).toEqual({
      data: [
        {
          id: 1,
          userId: 10,
          title: "Test title",
          completed: false,
        },
      ],
      meta: expect.objectContaining({
        requestId: "req-123",
        traceId: "trace-123",
        timestamp: expect.any(String),
      }),
    });
  });

  it("getById should return one post by id", async () => {
    const result = await postsApi.getById(5);

    expect(result).toEqual({
      data: {
        id: 5,
        userId: 10,
        title: "Test title",
        completed: false,
      },
      meta: expect.objectContaining({
        requestId: "req-123",
        traceId: "trace-123",
        timestamp: expect.any(String),
      }),
    });
  });

  it("create should return the created post", async () => {
    const payload = {
      userId: 10,
      title: "New post",
      completed: false,
    };

    const result = await postsApi.create(payload);

    expect(result).toEqual({
      data: {
        id: 1,
        userId: 10,
        title: "Test title",
        completed: false,
      },
      meta: expect.objectContaining({
        requestId: "req-123",
        traceId: "trace-123",
        timestamp: expect.any(String),
      }),
    });
  });

  it("patch should return the updated post", async () => {
    const payload = {
      title: "Changed title",
    };

    const result = await postsApi.patch(7, payload);

    expect(result).toEqual({
      data: {
        id: 7,
        userId: 10,
        title: "Updated title",
        completed: false,
      },
      meta: expect.objectContaining({
        requestId: "req-123",
        traceId: "trace-123",
        timestamp: expect.any(String),
      }),
    });
  });

  it("delete should resolve without returning data", async () => {
    await expect(postsApi.delete(3)).resolves.toBeUndefined();
  });
});
