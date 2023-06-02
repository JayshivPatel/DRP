import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/database";
import * as z from "zod";

const deleteSchema = z.object({
  id: z.coerce.number().int(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = deleteSchema.parse(req.query);

    await prisma.notification.delete({
      where: { id },
    });

    res.status(200).json({});
  } else if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    res.status(404).json({});
  }
}
