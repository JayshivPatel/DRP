import type { NextApiRequest, NextApiResponse } from "next";

import { routeHandler } from "../../server/handlers";
import { prisma } from "../../server/database";
import * as z from "zod";
import { dateOnly } from "../../server/handlers";
import { filterDateOnly } from "../../server/database";

const getSchema = z.object({
  date: dateOnly(),
});

const postSchema = z.object({
  date: dateOnly(),
  title: z.string(),
});

export default routeHandler({
  async GET(req: NextApiRequest, res: NextApiResponse) {
    const { date } = getSchema.parse(req.query);

    const clinics = await prisma.clinic.findMany({
      where: {
        date: filterDateOnly(date),
      },
    });

    res.status(200).json(clinics);
  },

  async POST(req: NextApiRequest, res: NextApiResponse) {
    const { date, title } = postSchema.parse(req.body);

    const { id } = await prisma.clinic.create({
      data: {
        date,
        title,
      },
    });

    res.status(200).json({ id });
  },
});
