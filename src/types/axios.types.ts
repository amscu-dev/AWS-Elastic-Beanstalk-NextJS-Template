import { AxiosRequestConfig } from "axios";

export interface RequiredConfig {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: unknown;
  params?: unknown;
}

export interface OptionalConfig {
  signal?: AbortSignal;
  axiosOptions?: AxiosRequestConfig;
}
