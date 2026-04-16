import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- no need to use _request as of now
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!_next|_vercel|monitoring|.*\\..*).*)",
};
