import { environmentManager } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import queryClientConfig from "@/config/react-query.config";

function makeQueryClient() {
  return new QueryClient(queryClientConfig);
}

let browserQueryClient: QueryClient | undefined;

export default function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}
