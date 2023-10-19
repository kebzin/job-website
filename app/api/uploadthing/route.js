import { createNextRouteHandler } from "uploadthing/next";

import { FileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: FileRouter,
});
