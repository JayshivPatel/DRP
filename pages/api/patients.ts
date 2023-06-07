import type { NextApiRequest, NextApiResponse } from "next";

import { routeHandler, dateOnly } from "../../server/handlers";
import { prisma, filterDateOnly } from "../../server/database";
import * as z from "zod";

const getSchema = z.object({
  dateOfBirth: dateOnly(),
});

export default routeHandler({
  async GET(req: NextApiRequest, res: NextApiResponse) {
    const { dateOfBirth } = getSchema.parse(req.query);
    const patients = await prisma.patient.findMany({
      where: {
        dateOfBirth: filterDateOnly(dateOfBirth),
      },
    });
    res.status(200).json(patients);
  },
});
