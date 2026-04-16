import {
  UseSuspenseQueryOptions,
  UseMutationOptions,
  useSuspenseQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { environmentManager } from "@tanstack/react-query";
import memoize from "fast-memoize";
import { useRef } from "react";

import { OptionalConfig } from "@/types/axios.types";
import { ApiResponse } from "@/types/api.types";
import { AppError } from "@/types/errors.types";

import { CreatePostDto, UpdatePostDto, Post } from "../types/post.types";
import { postQueryKeys } from "./post.queryKeys";
import { postsApi } from "./post.api";
// useMutation<TData, TError, TVariables, TContext>
// TData      — what mutationFn returns (server response)
// TError     — error type
// TVariables — what mutationFn receives (request body)
// TContext   — optional context for onMutate (rarely used)

// useQuery<TQueryFnData, TError, TData, TQueryKey>
// TQueryFnData — what queryFn returns
// TError       — error type
// TData        — what the component receives (after select) — default: TQueryFnData
// TQueryKey    — type of the query key — default: QueryKey

export const useGetAllPosts = <TData = Post[]>(
  queryConfig: Omit<
    UseSuspenseQueryOptions<ApiResponse<Post[]>, AppError, TData>,
    "queryKey" | "queryFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  return useSuspenseQuery<ApiResponse<Post[]>, AppError, TData>({
    queryFn: ({ signal }) =>
      postsApi.getAll({ signal, ...optionalAxiosConfig }),
    select: (response) => response.data as TData,
    queryKey: postQueryKeys.all(),
    ...queryConfig,
  });
};

// Called only once no matter how many components use useSuspenseQuery

// Singleton on browser (reutilised between re-renders)
let browserSelectPost: ((response: ApiResponse<Post>) => Post) | undefined;

export function getSelectPost() {
  if (environmentManager.isServer()) {
    // On server new instance
    console.log("server");
    return makeSelectPost();
  } else {
    // On browser reutilised instance
    if (!browserSelectPost) {
      console.log("client");
      browserSelectPost = makeSelectPost();
    }
    return browserSelectPost;
  }
}

function makeSelectPost() {
  return memoize((response: ApiResponse<Post>) => {
    return response.data;
  });
}

export const useGetPostById = <TData = Post>(
  id: number,
  queryConfig?: Omit<
    UseSuspenseQueryOptions<ApiResponse<Post>, AppError, TData>,
    "queryKey" | "queryFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  // select its called only when ApiResponse<Post> change
  // const select = useCallback((response: ApiResponse<Post>) => {
  //   return response.data as TData;
  // }, []);

  return useSuspenseQuery<ApiResponse<Post>, AppError, TData>({
    queryFn: ({ signal }) =>
      postsApi.getById(id, { signal, ...optionalAxiosConfig }),
    select: getSelectPost() as (response: ApiResponse<Post>) => TData,
    queryKey: postQueryKeys.byId(id),
    ...queryConfig,
  });
};

export const useCreatePost = (
  mutationConfig?: Omit<
    UseMutationOptions<ApiResponse<Post>, AppError, CreatePostDto>,
    "mutationKey" | "mutationFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  const queryClient = useQueryClient();
  const controllerReference = useRef<AbortController | null>(null);

  return useMutation<ApiResponse<Post>, AppError, CreatePostDto>({
    mutationFn: (body) => {
      controllerReference.current?.abort();
      controllerReference.current = new AbortController();

      return postsApi.create(body, {
        ...optionalAxiosConfig,
        signal: controllerReference.current.signal,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all() });
    },
    mutationKey: postQueryKeys.create(),
    ...mutationConfig,
  });
};

export const usePatchPost = (
  mutationConfig?: Omit<
    UseMutationOptions<
      ApiResponse<Post>,
      AppError,
      { body: UpdatePostDto; id: number }
    >,
    "mutationKey" | "mutationFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  const queryClient = useQueryClient();
  const controllerReference = useRef<AbortController | null>(null);

  return useMutation<
    ApiResponse<Post>,
    AppError,
    { body: UpdatePostDto; id: number }
  >({
    mutationFn: ({ body, id }) => {
      controllerReference.current?.abort();
      controllerReference.current = new AbortController();

      return postsApi.patch(id, body, {
        ...optionalAxiosConfig,
        signal: controllerReference.current.signal,
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.byId(id) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all() });
    },
    mutationKey: postQueryKeys.patch(),
    ...mutationConfig,
  });
};

export const useDeletePost = (
  mutationConfig?: Omit<
    UseMutationOptions<void, AppError, number>,
    "mutationKey" | "mutationFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  const queryClient = useQueryClient();
  const controllerReference = useRef<AbortController | null>(null);

  return useMutation<void, AppError, number>({
    mutationFn: (id) => {
      controllerReference.current?.abort();
      controllerReference.current = new AbortController();

      return postsApi.delete(id, {
        ...optionalAxiosConfig,
        signal: controllerReference.current.signal,
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.byId(id) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all() });
    },
    mutationKey: postQueryKeys.delete(),
    ...mutationConfig,
  });
};
