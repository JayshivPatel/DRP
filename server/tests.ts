import type { IncomingMessage, ServerResponse } from "http";

import { apiResolver } from "next/dist/server/api-utils/node";
import { parse as parseUrl } from "node:url";
import request from "supertest";

export function createAgent(page: string) {
  const pageModule = require(page);

  const handler = async (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parseUrl(req.url!, true);

    await apiResolver(
      req,
      res,
      parsedUrl.query,
      pageModule,
      {
        previewModeId: "",
        previewModeEncryptionKey: "",
        previewModeSigningKey: "",
      },
      false,
      true,
      page
    );
  };

  return request(handler);
}
