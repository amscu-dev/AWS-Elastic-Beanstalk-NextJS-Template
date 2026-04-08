// utils/handleApiError.ts
import { AppError } from "@/types/errors.types";
import { AxiosError } from "axios";
import { ZodError } from "zod";

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
    ["axios", "validation", "unknown"].includes((error as AppError).kind)
  );
};
