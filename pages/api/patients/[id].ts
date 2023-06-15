import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/database";
import * as z from "zod";
import { routeHandler } from "../../../server/handlers";

const querySchema = z.object({
  id: z.coerce.number().int(),
});

const putSchema = z
  .object({
    suggestedDuration: z.number().int(),
  })
  .partial();

/* TODO(saleem): move this into prisma */
function timeToString(date: Date): string {
  return (
    date.getUTCHours().toString().padStart(2, "0") +
    ":" +
    date.getUTCMinutes().toString().padStart(2, "0")
  );
}

export default routeHandler({
  async GET(req: NextApiRequest, res: NextApiResponse) {
    const { id } = querySchema.parse(req.query);

    const patient = await prisma.patient.findFirst({
      where: { id },
      include: {
        appointments: {
          include: {
            clinic: true,
          },
        },
        notifications: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (patient) {
      const result = {
        ...patient,
        appointments: patient.appointments.map(
          ({ startTime, endTime, ...appointment }) => ({
            ...appointment,
            startTime: timeToString(startTime),
            endTime: timeToString(endTime),
          })
        ),
      };

      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  },

  async PUT(req: NextApiRequest, res: NextApiResponse) {
    const { id } = querySchema.parse(req.query);
    const { suggestedDuration } = putSchema.parse(req.body);

    await prisma.patient.update({
      where: { id },
      data: { suggestedDuration },
    });

    res.status(200).json({});
  },
});
