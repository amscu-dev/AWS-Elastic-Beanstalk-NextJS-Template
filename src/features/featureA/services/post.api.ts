import z from "zod";

import { customAxiosInstance } from "@/config/axios.config";
import { apiResponseSchema } from "@/schemas/api.schemas";
import { toAppError } from "@/utils/handle-api-error";
import { OptionalConfig } from "@/types/axios.types";
import { ApiResponse } from "@/types/api.types";

import { CreatePostDto, UpdatePostDto, Post } from "../types/post.types";
import { postSchema } from "../schemas/post.schema";

export const postsApi = {
  patch: async (
    id: number,
    body: UpdatePostDto,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post>> => {
    try {
      const response = await customAxiosInstance<ApiResponse<Post>>(
        { url: `/posts/${id}`, method: "PATCH", data: body },
        optionalAxiosConfig,
      );
      return apiResponseSchema(postSchema).parse(response);
    } catch (error) {
      throw toAppError(error);
    }
  },

  create: async (
    body: CreatePostDto,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post>> => {
    try {
      const response = await customAxiosInstance<ApiResponse<Post>>(
        { method: "POST", url: "/posts", data: body },
        optionalAxiosConfig,
      );
      return apiResponseSchema(postSchema).parse(response);
    } catch (error) {
      throw toAppError(error);
    }
  },

  getById: async (
    id: number,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post>> => {
    try {
      const response = await customAxiosInstance<ApiResponse<Post>>(
        { url: `/posts/${id}`, method: "GET" },
        optionalAxiosConfig,
      );
      return apiResponseSchema(postSchema).parse(response);
    } catch (error) {
      throw toAppError(error);
    }
  },

  getAll: async (
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post[]>> => {
    try {
      const response = await customAxiosInstance<ApiResponse<Post[]>>(
        { url: "/posts", method: "GET" },
        optionalAxiosConfig,
      );
      return apiResponseSchema(z.array(postSchema)).parse(response);
    } catch (error) {
      throw toAppError(error);
    }
  },

  delete: async (
    id: number,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<void> => {
    try {
      await customAxiosInstance<unknown>(
        { url: `/posts/${id}`, method: "DELETE" },
        optionalAxiosConfig,
      );
    } catch (error) {
      throw toAppError(error);
    }
  },
};
