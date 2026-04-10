import { setupServer } from "msw/node";

import { http, HttpResponse, HttpMethods, JsonBodyType, PathParams } from "msw";

type SupportedMethod = Lowercase<HttpMethods>;

interface HandlerConfig {
  path: string;
  method?: SupportedMethod;

  res: (info: { request: Request; params: PathParams }) => JsonBodyType;

  status?: number;
}

export function createServer(handlerConfigs: HandlerConfig[]) {
  const handlers = handlerConfigs.map((config) => {
    const method = config.method ?? "get";

    return http[method](config.path, ({ request, params }) => {
      return HttpResponse.json(config.res({ request, params }), {
        status: config.status ?? 200,
      });
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
}
