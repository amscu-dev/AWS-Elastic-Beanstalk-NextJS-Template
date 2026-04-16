import { AxiosRequestConfig } from "axios";

export interface RequiredConfig {
  method: AxiosRequestConfig["method"];
  params?: unknown;
  data?: unknown;
  url: string;
}

export interface OptionalConfig {
  axiosOptions?: AxiosRequestConfig;
  signal?: AbortSignal;
}
