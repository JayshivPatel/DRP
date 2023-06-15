import type { NextApiRequest, NextApiResponse } from "next";

import { prisma, updateClinic } from "../../../server/database";
import * as z from "zod";
import { routeHandler } from "../../../server/handlers";

const querySchema = z.object({
  id: z.coerce.number().int(),
});

const putSchema = z.object({
  isRead: z.boolean().optional(),
});

export default routeHandler({
  async PUT(req: NextApiRequest, res: NextApiResponse) {
    const { id } = querySchema.parse(req.query);
    const { isRead } = putSchema.parse(req.body);

    await prisma.notification.update({
      where: { id },
      data: { isRead },
    });

    res.status(200).json({});
  },
});
