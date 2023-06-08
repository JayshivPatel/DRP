import type { NextApiRequest, NextApiResponse } from "next";

import { routeHandler, timeOnly } from "../../server/handlers";
import { prisma } from "../../server/database";
import * as z from "zod";
import { sendSms } from "../../server/sms";

const getSchema = z.object({
  clinicId: z.coerce.number().int().optional(),
  patientId: z.coerce.number().int().optional(),
  includeClinic: z.coerce.boolean().default(false),
  includePatient: z.coerce.boolean().default(false),
});

const postSchema = z
  .object({
    clinicId: z.number().int(),
    patientId: z.number().int(),
    startTime: timeOnly(),
    endTime: timeOnly(),
    notes: z.string(),
    notifySms: z.boolean().default(false),
  })
  .refine((val) => val.endTime > val.startTime, {
    message: "end time cannot be earlier than start time",
    path: ["endTime"],
  });

function timeToString(date: Date): string {
  return (
    date.getUTCHours().toString().padStart(2, "0") +
    ":" +
    date.getUTCMinutes().toString().padStart(2, "0")
  );
}

export default routeHandler({
  async GET(req: NextApiRequest, res: NextApiResponse) {
    const { clinicId, patientId, includeClinic, includePatient } =
      getSchema.parse(req.query);

    const appointments = (
      await prisma.appointment.findMany({
        where: {
          clinicId,
          patientId,
        },
        include: {
          clinic: includeClinic,
          patient: includePatient,
        },
      })
    ).map((data) => ({
      ...data,
      startTime: timeToString(data.startTime),
      endTime: timeToString(data.endTime),
    }));

    res.status(200).json(appointments);
  },

  async POST(req: NextApiRequest, res: NextApiResponse) {
    const { clinicId, patientId, startTime, endTime, notes, notifySms } =
      postSchema.parse(req.body);

    const { id, clinic, patient } = await prisma.appointment.create({
      data: {
        startTime,
        endTime,
        notes,
        clinic: { connect: { id: clinicId } },
        patient: { connect: { id: patientId } },
      },
      include: {
        clinic: notifySms,
        patient: notifySms,
      },
    });

    if (notifySms) {
      const message = `Dear ${
        patient.firstName
      }, your appointment has been booked for ${startTime} on ${clinic.date.toLocaleDateString()}`;
      await sendSms(patient.phoneNumber, message);
    }

    res.status(200).json({ id });
  },
});
