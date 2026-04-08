import { metaSchema } from "@/schemas/api.schemas";
import z from "zod";

export type ApiResponse<T> = {
  data: T;
  meta: z.infer<typeof metaSchema>;
};

export type ApiErrorResponse = {
  message: string;
  code: string;
  statusCode: number;
};
