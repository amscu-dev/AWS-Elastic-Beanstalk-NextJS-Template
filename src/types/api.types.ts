import z from "zod";

import { metaSchema } from "@/schemas/api.schemas";

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  code: string;
};

export type ApiResponse<T> = {
  meta: z.infer<typeof metaSchema>;
  data: T;
};
