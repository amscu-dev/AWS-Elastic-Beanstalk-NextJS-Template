import { Flagsmith } from "flagsmith-nodejs";

import { Environment } from "./environment";

const flagsmithInstance = new Flagsmith({
  environmentKey: Environment.FLAGSMITH_KEY,
});

// export default flagsmithInstance;
// added modification here
export default flagsmithInstance;
