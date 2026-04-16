import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const Env = createEnv({
  server: {
    FLAGSMITH_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
  client: {},
});
