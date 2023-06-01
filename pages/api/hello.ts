import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.appointment.create({
    data: {
      name: "Hello, World: " + new Date(),
    },
  });

  const appointments = await prisma.appointment.findMany();

  res.status(200).json(appointments);
}
