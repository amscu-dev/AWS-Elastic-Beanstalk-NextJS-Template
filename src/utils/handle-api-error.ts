import { AxiosError } from "axios";
import { ZodError } from "zod";

// utils/handleApiError.ts
import { AppError } from "@/types/errors.types";

export const toAppError = (error: unknown): AppError => {
  if (error instanceof ZodError) return { kind: "validation", error };
  if (error instanceof AxiosError) return { kind: "axios", error };
  return { kind: "unknown", error };
};

export const isAppError = (error: unknown): error is AppError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "kind" in error &&
    ["validation", "unknown", "axios"].includes((error as AppError).kind)
  );
};
