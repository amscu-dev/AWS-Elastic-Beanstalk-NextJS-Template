import type { ReactNode } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor, act } from "@testing-library/react";

import {
  useGetAllPosts,
  useGetPostById,
  useCreatePost,
  useDeletePost,
  usePatchPost,
} from "@/features/featureA/services/post.hooks";
import { postQueryKeys } from "@/features/featureA/services/post.queryKeys";
import { postsApi } from "@/features/featureA/services/post.api";

jest.mock("@/features/featureA/services/post.api", () => ({
  postsApi: {
    getById: jest.fn().mockResolvedValue({
      data: { title: "Default By Id", completed: false, userId: 1, id: 1 },
      meta: { requestId: "default-getById" },
    }),
    create: jest.fn().mockResolvedValue({
      data: { title: "Default Created", completed: false, userId: 1, id: 2 },
      meta: { requestId: "default-create" },
    }),
    getAll: jest.fn().mockResolvedValue({
      data: [{ title: "Default Post", completed: false, userId: 1, id: 1 }],
      meta: { requestId: "default-getAll" },
    }),
    patch: jest.fn().mockResolvedValue({
      data: { title: "Default Patched", completed: true, userId: 1, id: 1 },
      meta: { requestId: "default-patch" },
    }),
    delete: jest.fn().mockResolvedValue({}),
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  });

const createWrapper = (queryClient = createTestQueryClient()) => {
  function TestQueryWrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return TestQueryWrapper;
};

describe("post hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("useGetAllPosts", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.getAll.mockResolvedValueOnce({
      data: [
        { completed: false, title: "Post 1", userId: 1, id: 1 },
        { title: "Post 2", completed: true, userId: 1, id: 2 },
      ],
      meta: {
        requestId: "req-1",
      },
    });

    const { result } = renderHook(() => useGetAllPosts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedPostsApi.getAll).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual([
      { completed: false, title: "Post 1", userId: 1, id: 1 },
      { title: "Post 2", completed: true, userId: 1, id: 2 },
    ]);
  });

  test("useGetPostById", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.getById.mockResolvedValueOnce({
      data: {
        completed: false,
        title: "Post 1",
        userId: 1,
        id: 1,
      },
      meta: {
        requestId: "req-2",
      },
    });

    const { result } = renderHook(() => useGetPostById(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedPostsApi.getById).toHaveBeenCalledTimes(1);
    expect(mockedPostsApi.getById).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result.current.data).toEqual({
      completed: false,
      title: "Post 1",
      userId: 1,
      id: 1,
    });
  });

  test("useCreatePost", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.create.mockResolvedValueOnce({
      data: {
        title: "New Post",
        completed: false,
        userId: 1,
        id: 3,
      },
      meta: {
        requestId: "req-3",
      },
    });

    const { result } = renderHook(() => useCreatePost(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync({
        title: "New Post",
        completed: false,
        userId: 1,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedPostsApi.create).toHaveBeenCalledTimes(1);
    expect(mockedPostsApi.create).toHaveBeenCalledWith(
      {
        title: "New Post",
        completed: false,
        userId: 1,
      },
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result.current.data).toEqual({
      data: {
        title: "New Post",
        completed: false,
        userId: 1,
        id: 3,
      },
      meta: {
        requestId: "req-3",
      },
    });
  });

  test("usePatchPost", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.patch.mockResolvedValueOnce({
      data: {
        title: "Updated title",
        completed: true,
        userId: 1,
        id: 1,
      },
      meta: {
        requestId: "req-4",
      },
    });

    const { result } = renderHook(() => usePatchPost(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync({
        body: {
          title: "Updated title",
          completed: true,
        },
        id: 1,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedPostsApi.patch).toHaveBeenCalledTimes(1);
    expect(mockedPostsApi.patch).toHaveBeenCalledWith(
      1,
      {
        title: "Updated title",
        completed: true,
      },
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result.current.data).toEqual({
      data: {
        title: "Updated title",
        completed: true,
        userId: 1,
        id: 1,
      },
      meta: {
        requestId: "req-4",
      },
    });
  });

  test("useDeletePost", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.delete.mockResolvedValueOnce();

    const { result } = renderHook(() => useDeletePost(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync(1);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedPostsApi.delete).toHaveBeenCalledTimes(1);
    expect(mockedPostsApi.delete).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  test("usePatchPost - invalidate queries", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;
    const queryClient = createTestQueryClient();
    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    mockedPostsApi.patch.mockResolvedValueOnce({
      data: {
        title: "Patched",
        completed: true,
        userId: 1,
        id: 10,
      },
      meta: {
        requestId: "req-5",
      },
    });

    const { result } = renderHook(() => usePatchPost(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync({
        body: {
          title: "Patched",
          completed: true,
        },
        id: 10,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: postQueryKeys.byId(10),
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: postQueryKeys.all(),
    });
  });

  test("extra - uses default values from jest.mock factory", async () => {
    const { result } = renderHook(() => useGetAllPosts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      { title: "Default Post", completed: false, userId: 1, id: 1 },
    ]);
  });

  test("extra - uses jest.mocked(postsApi) fosr typesafety", async () => {
    const mockedPostsApi = jest.mocked(postsApi);

    mockedPostsApi.getAll.mockResolvedValueOnce({
      data: [{ title: "Typed mock", completed: false, userId: 5, id: 100 }],
      meta: {
        requestId: "req-6",
      },
    });

    const { result } = renderHook(() => useGetAllPosts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedPostsApi.getAll).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual([
      { title: "Typed mock", completed: false, userId: 5, id: 100 },
    ]);
  });

  test("extra - uses cast direct on method without jest.mocked for typesafety", async () => {
    (postsApi.getAll as jest.Mock).mockResolvedValueOnce({
      data: [{ title: "Cast mock", completed: true, userId: 9, id: 200 }],
      meta: {
        requestId: "req-7",
      },
    });

    const { result } = renderHook(() => useGetAllPosts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(postsApi.getAll).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual([
      { title: "Cast mock", completed: true, userId: 9, id: 200 },
    ]);
  });
});
