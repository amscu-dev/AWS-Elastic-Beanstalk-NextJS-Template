import queryClientConfig from "@/config/reactQuery.config";
import { QueryClient } from "@tanstack/react-query";
import { environmentManager } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient(queryClientConfig);
}

let browserQueryClient: QueryClient | undefined = undefined;

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
