import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/database";
import * as z from "zod";
import { routeHandler } from "../../../server/handlers";

const querySchema = z.object({
  id: z.coerce.number().int(),
});

const putSchema = z.object({
  status: z.union([z.literal("UNSEEN"), z.literal("SEEN")]),
});

export default routeHandler({
  async DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { id } = querySchema.parse(req.query);

    await prisma.appointment.delete({
      where: { id },
    });

    res.status(200).json({});
  },

  async PUT(req: NextApiRequest, res: NextApiResponse) {
    const { id } = querySchema.parse(req.query);
    const { status } = putSchema.parse(req.body);

    await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({});
  },
});
