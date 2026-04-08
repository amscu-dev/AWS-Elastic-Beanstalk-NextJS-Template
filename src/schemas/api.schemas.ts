import { z } from "zod";

// Sub-scheme
const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

const rateLimitSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  resetAt: z.iso.datetime(),
});

export const metaSchema = z.object({
  requestId: z.string(),
  traceId: z.string().optional(),
  timestamp: z.iso.datetime().optional(),
  processingTime: z.number().optional(),
  pagination: paginationSchema.optional(),
  apiVersion: z.string().optional(),
  rateLimit: rateLimitSchema.optional(),
});

// Schema factory with generic — receives the data schema as parameter
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: metaSchema,
  });
