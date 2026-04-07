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
      console.log(error);
    },
  }),
  mutationCache: new MutationCache({
    // Global onErrorHandler for useQuery
    onError: (error) => {
      console.log(error);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: (failureCount, error) => {
        console.log(error);
        return failureCount < 3;
      },
      retryDelay: decorrelatedRetryDelay,
    },
    mutations: {
      retry: (failureCount, error) => {
        console.log(error);
        return failureCount < 3;
      },
      retryDelay: decorrelatedRetryDelay,
    },
  },
};

export default queryClientConfig;
