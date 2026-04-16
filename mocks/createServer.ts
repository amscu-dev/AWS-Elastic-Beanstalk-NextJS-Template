import { HttpResponse, JsonBodyType, HttpMethods, PathParams, http } from "msw";
import { setupServer } from "msw/node";

interface HandlerConfig {
  res: (info: { params: PathParams; request: Request }) => JsonBodyType;
  method?: SupportedMethod;

  status?: number;

  path: string;
}

type SupportedMethod = Lowercase<HttpMethods>;

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
