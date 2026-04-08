import { OptionalConfig, RequiredConfig } from "@/types/axios.types";
import axios, { AxiosError, AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export const customAxiosInstance = async <T>(
  config: RequiredConfig,
  { signal, axiosOptions }: OptionalConfig = {},
): Promise<T> => {
  return axiosInstance<T>({
    ...config,
    ...axiosOptions,
    signal,
  }).then(({ data }) => data);
};
