import { AxiosError } from "axios";
import { ZodError } from "zod";

import { ApiErrorResponse } from "./api.types";

export type AppError =
  | { error: AxiosError<ApiErrorResponse>; kind: "axios" }
  | { kind: "validation"; error: ZodError }
  | { kind: "unknown"; error: unknown };
