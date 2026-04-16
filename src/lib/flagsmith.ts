import { Flagsmith } from "flagsmith-nodejs";

import { Env } from "./env";

const flagsmithInstance = new Flagsmith({
  environmentKey: Env.FLAGSMITH_KEY,
});

// export default flagsmithInstance;
// added modification here
export default flagsmithInstance;
