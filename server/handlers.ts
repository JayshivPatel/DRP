import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const apiMethods = ["GET", "POST", "DELETE"] as const;
type ApiMethod = (typeof apiMethods)[number];

function isApiMethod(method?: string): method is ApiMethod {
  return apiMethods.includes(method as ApiMethod);
}

type RouteHandler = {
  [key in ApiMethod]?: ApiHandler;
};

export function routeHandler(handler: RouteHandler): ApiHandler {
  const allowedMethods = [
    "OPTIONS",
    ...apiMethods.filter((method) => handler[method]),
  ].join(", ");

  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "OPTIONS") {
      return res.status(204).setHeader("Allow", allowedMethods).send(null);
    }

    const handle = isApiMethod(req.method) ? handler[req.method] : null;

    if (!handle) {
      return res.status(405).setHeader("Allow", allowedMethods).json({
        error: "Method not allowed",
      });
    }

    try {
      await handle(req, res);
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          issues: e.issues,
        });
      }

      console.error(e);
      return res.status(500).json({
        error: `Internal server error: ${e}`,
      });
    }
  };
}
