import axios, { AxiosInstance, AxiosError } from "axios";

import { OptionalConfig, RequiredConfig } from "@/types/axios.types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  // withCredentials: true,
  timeout: 10_000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    throw error;
  },
);

export const customAxiosInstance = async <T>(
  config: RequiredConfig,
  { axiosOptions, signal }: OptionalConfig = {},
): Promise<T> => {
  return axiosInstance<T>({
    ...config,
    ...axiosOptions,
    signal,
  }).then(({ data }) => data);
};
