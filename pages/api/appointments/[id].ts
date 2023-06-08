import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/database";
import * as z from "zod";
import { routeHandler } from "../../../server/handlers";

const deleteSchema = z.object({
  id: z.coerce.number().int(),
});

export default routeHandler({
  async DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { id } = deleteSchema.parse(req.query);

    await prisma.appointment.delete({
      where: { id },
    });

    res.status(200).json({});
  },
});
