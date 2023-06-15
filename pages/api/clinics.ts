import type { NextApiRequest, NextApiResponse } from "next";

import { routeHandler } from "../../server/handlers";
import { getClinicsWithLateness, prisma } from "../../server/database";
import * as z from "zod";
import { dateOnly } from "../../server/handlers";
import { filterDateOnly } from "../../server/database";
import { Prisma } from "@prisma/client";

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

    const clinics = await getClinicsWithLateness(date);

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
