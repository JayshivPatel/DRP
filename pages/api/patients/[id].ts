import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/database";
import * as z from "zod";
import { routeHandler } from "../../../server/handlers";

const getSchema = z.object({
  id: z.coerce.number().int(),
});

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
    const { id } = getSchema.parse(req.query);

    const patient = await prisma.patient.findFirst({
      where: { id },
      include: {
        appointments: {
          include: {
            clinic: true,
          },
        },
        notifications: true,
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
});
