import { AxiosError } from "axios";
import { ApiErrorResponse } from "./api.types";
import { ZodError } from "zod";

export type AppError =
  | { kind: "axios"; error: AxiosError<ApiErrorResponse> }
  | { kind: "validation"; error: ZodError }
  | { kind: "unknown"; error: unknown };
