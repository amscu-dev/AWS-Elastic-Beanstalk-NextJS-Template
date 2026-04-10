import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import {
  useGetAllPosts,
  useGetPostById,
  useCreatePost,
  usePatchPost,
  useDeletePost,
} from "@/features/featureA/services/post.hooks";
import { postsApi } from "@/features/featureA/services/post.api";
import { postQueryKeys } from "@/features/featureA/services/post.queryKeys";

jest.mock("@/features/featureA/services/post.api", () => ({
  postsApi: {
    getAll: jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "Default Post", userId: 1, completed: false }],
      meta: { requestId: "default-getAll" },
    }),
    getById: jest.fn().mockResolvedValue({
      data: { id: 1, title: "Default By Id", userId: 1, completed: false },
      meta: { requestId: "default-getById" },
    }),
    create: jest.fn().mockResolvedValue({
      data: { id: 2, title: "Default Created", userId: 1, completed: false },
      meta: { requestId: "default-create" },
    }),
    patch: jest.fn().mockResolvedValue({
      data: { id: 1, title: "Default Patched", userId: 1, completed: true },
      meta: { requestId: "default-patch" },
    }),
    delete: jest.fn().mockResolvedValue(undefined),
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
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
        { id: 1, title: "Post 1", userId: 1, completed: false },
        { id: 2, title: "Post 2", userId: 1, completed: true },
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
      { id: 1, title: "Post 1", userId: 1, completed: false },
      { id: 2, title: "Post 2", userId: 1, completed: true },
    ]);
  });

  test("useGetPostById", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.getById.mockResolvedValueOnce({
      data: {
        id: 1,
        title: "Post 1",
        userId: 1,
        completed: false,
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
      id: 1,
      title: "Post 1",
      userId: 1,
      completed: false,
    });
  });

  test("useCreatePost", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.create.mockResolvedValueOnce({
      data: {
        id: 3,
        title: "New Post",
        userId: 1,
        completed: false,
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
        userId: 1,
        completed: false,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedPostsApi.create).toHaveBeenCalledTimes(1);
    expect(mockedPostsApi.create).toHaveBeenCalledWith(
      {
        title: "New Post",
        userId: 1,
        completed: false,
      },
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result.current.data).toEqual({
      data: {
        id: 3,
        title: "New Post",
        userId: 1,
        completed: false,
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
        id: 1,
        title: "Updated title",
        userId: 1,
        completed: true,
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
        id: 1,
        body: {
          title: "Updated title",
          completed: true,
        },
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
        id: 1,
        title: "Updated title",
        userId: 1,
        completed: true,
      },
      meta: {
        requestId: "req-4",
      },
    });
  });

  test("useDeletePost", async () => {
    const mockedPostsApi = postsApi as jest.Mocked<typeof postsApi>;

    mockedPostsApi.delete.mockResolvedValueOnce(undefined);

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
        id: 10,
        title: "Patched",
        userId: 1,
        completed: true,
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
        id: 10,
        body: {
          title: "Patched",
          completed: true,
        },
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
      { id: 1, title: "Default Post", userId: 1, completed: false },
    ]);
  });

  test("extra - uses jest.mocked(postsApi) fosr typesafety", async () => {
    const mockedPostsApi = jest.mocked(postsApi);

    mockedPostsApi.getAll.mockResolvedValueOnce({
      data: [{ id: 100, title: "Typed mock", userId: 5, completed: false }],
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
      { id: 100, title: "Typed mock", userId: 5, completed: false },
    ]);
  });

  test("extra - uses cast direct on method without jest.mocked for typesafety", async () => {
    (postsApi.getAll as jest.Mock).mockResolvedValueOnce({
      data: [{ id: 200, title: "Cast mock", userId: 9, completed: true }],
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
      { id: 200, title: "Cast mock", userId: 9, completed: true },
    ]);
  });
});
