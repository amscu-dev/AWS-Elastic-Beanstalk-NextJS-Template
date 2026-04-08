import { isAppError } from "@/utils/handleApiError";
import {
  MutationCache,
  QueryCache,
  QueryClientConfig,
} from "@tanstack/react-query";

// Jitter Strategy
// Docs: https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
const decorrelatedRetryDelay = (attemptIndex: number) => {
  const base = Math.min(1000 * 2 ** attemptIndex, 30000);
  return Math.random() * base;
};

const queryClientConfig: QueryClientConfig = {
  queryCache: new QueryCache({
    // Global onErrorHandler for useQuery
    onError: (error) => {
      if (!isAppError(error)) {
        console.error("Unknown error");
        return;
      }

      if (error.kind === "axios") {
        const msg = error.error.response?.data.message || error.error.message;
        console.error(msg);
      } else if (error.kind === "validation") {
        console.error(`Validation error: ${error.error.message}`);
      } else {
        console.error("Unknown error");
      }
    },
  }),
  mutationCache: new MutationCache({
    // Global onErrorHandler for useQuery
    onError: (error) => {
      if (!isAppError(error)) {
        console.error("Unknown error");
        return;
      }

      if (error.kind === "axios") {
        const msg = error.error.response?.data.message || error.error.message;
        console.error(msg);
      } else if (error.kind === "validation") {
        console.error(`Validation error: ${error.error.message}`);
      } else {
        console.error("Unknown error");
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: (failureCount, error) => {
        if (!isAppError(error)) return false;

        if (error.kind === "validation") return false;
        if (error.kind === "axios") {
          const { code } = error.error;
          const status = error.error.response?.status;
          if (
            code === "ERR_NETWORK" ||
            code === "ECONNABORTED" ||
            !error.error.response
          )
            return false;
          if (status && status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: decorrelatedRetryDelay,
    },

    mutations: {
      retry: (failureCount, error) => {
        if (!isAppError(error)) return false;

        if (error.kind === "validation") return false;
        if (error.kind === "axios") {
          const { code } = error.error;
          const status = error.error.response?.status;
          if (
            code === "ERR_NETWORK" ||
            code === "ECONNABORTED" ||
            !error.error.response
          )
            return false;
          if (status && status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: decorrelatedRetryDelay,
    },
  },
};

export default queryClientConfig;
