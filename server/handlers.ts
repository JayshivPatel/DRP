import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { parse as parseDate } from "date-fns";

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const apiMethods = ["GET", "POST", "DELETE", "PUT"] as const;
type ApiMethod = (typeof apiMethods)[number];

function isApiMethod(method?: string): method is ApiMethod {
  return apiMethods.includes(method as ApiMethod);
}

type RouteHandler = {
  [key in ApiMethod]?: ApiHandler;
};

function coerceDate(format: string) {
  return z.string().transform((val, ctx) => {
    const date = parseDate(val, format, new Date(0));

    if (isNaN(date.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.invalid_date });
      return z.NEVER;
    }

    /* Treat the input as UTC */
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
  });
}

export function dateOnly() {
  return coerceDate("yyyy-MM-dd");
}

export function timeOnly() {
  return coerceDate("HH:mm");
}

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
      if (e instanceof z.ZodError) {
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
