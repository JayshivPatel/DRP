import type { NextApiRequest, NextApiResponse } from "next";

import { routeHandler } from "../../server/handlers";
import { prisma } from "../../server/database";
import * as z from "zod";

const postSchema = z.object({
  lateness: z.number().int().positive(),
});

export default routeHandler({
  async GET(req: NextApiRequest, res: NextApiResponse) {
    const notifications = await prisma.notification.findMany();
    res.status(200).json(notifications);
  },

  async POST(req: NextApiRequest, res: NextApiResponse) {
    const { lateness } = postSchema.parse(req.body);

    const message = `Dear PATIENT, we regret to inform you that the clinic is currently running ${lateness} minutes late.
If you can no longer make this, please phone the surgery to cancel your appointment`;

    const { id } = await prisma.notification.create({
      data: {
        message,
      },
    });

    res.status(200).json({ id });
  },
});
