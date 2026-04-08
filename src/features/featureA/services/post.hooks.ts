import { ApiResponse } from "@/types/api.types";
import { CreatePostDto, Post, UpdatePostDto } from "../types/post.types";

import {
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { postQueryKeys } from "./post.queryKeys";
import { postsApi } from "./post.api";
import { OptionalConfig } from "@/types/axios.types";
import { AppError } from "@/types/errors.types";
import { useRef } from "react";

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
    UseQueryOptions<ApiResponse<Post[]>, AppError, TData>,
    "queryKey" | "queryFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  return useSuspenseQuery<ApiResponse<Post[]>, AppError, TData>({
    queryKey: postQueryKeys.all(),
    queryFn: ({ signal }) =>
      postsApi.getAll({ signal, ...optionalAxiosConfig }),
    select: (response) => response.data as TData,
    ...queryConfig,
  });
};

export const useGetPostById = <TData = Post>(
  id: number,
  queryConfig?: Omit<
    UseQueryOptions<ApiResponse<Post>, AppError, TData>,
    "queryKey" | "queryFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  return useSuspenseQuery<ApiResponse<Post>, AppError, TData>({
    queryKey: postQueryKeys.byId(id),
    queryFn: ({ signal }) =>
      postsApi.getById(id, { signal, ...optionalAxiosConfig }),
    select: (response) => response.data as TData,
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
  const controllerRef = useRef<AbortController | null>(null);

  return useMutation<ApiResponse<Post>, AppError, CreatePostDto>({
    mutationKey: postQueryKeys.create(),
    mutationFn: (body) => {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      return postsApi.create(body, {
        ...optionalAxiosConfig,
        signal: controllerRef.current.signal,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all() });
    },
    ...mutationConfig,
  });
};

export const usePatchPost = (
  mutationConfig?: Omit<
    UseMutationOptions<
      ApiResponse<Post>,
      AppError,
      { id: number; body: UpdatePostDto }
    >,
    "mutationKey" | "mutationFn"
  >,
  optionalAxiosConfig?: Omit<OptionalConfig, "signal">,
) => {
  const queryClient = useQueryClient();
  const controllerRef = useRef<AbortController | null>(null);

  return useMutation<
    ApiResponse<Post>,
    AppError,
    { id: number; body: UpdatePostDto }
  >({
    mutationKey: postQueryKeys.patch(),
    mutationFn: ({ id, body }) => {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      return postsApi.patch(id, body, {
        ...optionalAxiosConfig,
        signal: controllerRef.current.signal,
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.byId(id) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all() });
    },
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
  const controllerRef = useRef<AbortController | null>(null);

  return useMutation<void, AppError, number>({
    mutationKey: postQueryKeys.delete(),
    mutationFn: (id) => {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      return postsApi.delete(id, {
        ...optionalAxiosConfig,
        signal: controllerRef.current.signal,
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.byId(id) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all() });
    },
    ...mutationConfig,
  });
};
