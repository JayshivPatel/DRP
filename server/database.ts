import {
  PrismaClient,
  Prisma,
  Appointment,
  PrismaPromise,
} from "@prisma/client";
import { dateOnly } from "./handlers";

const TIMEZONE = "Europe/London";

const MILLIS_PER_MINUTE = 60 * 1000;
const NOTIFY_THRESHOLD_MINUTES = 30;

function getLocalDate(timeZone: string): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone }));
}

const MinutesLateExtension = Prisma.defineExtension((client) =>
  client.$extends({
    result: {
      clinic: {
        minutesLate: {
          needs: { date: true, firstUnseenEndTime: true },
          compute({ date, firstUnseenEndTime }) {
            /* Get the current date and time in the local timezone */
            const localDate = getLocalDate(TIMEZONE);
            /* Check whether the requested date matches the current local date */
            const isToday =
              date.getDate() == localDate.getDate() &&
              date.getMonth() == localDate.getMonth() &&
              date.getFullYear() == localDate.getFullYear();

            if (!isToday) {
              return 0;
            }

            /* Create date comparable to Prisma dates */
            const localTime = new Date(
              Date.UTC(
                1970,
                0,
                1,
                localDate.getHours(),
                localDate.getMinutes(),
                localDate.getSeconds(),
                localDate.getMilliseconds()
              )
            ).getTime();

            const millisLate = firstUnseenEndTime
              ? Math.max(localTime - firstUnseenEndTime.getTime(), 0)
              : 0;
            const minutesLate = Math.round(millisLate / MILLIS_PER_MINUTE);

            return minutesLate;
          },
        },
      },
    },
  })
);

export const prisma = new PrismaClient().$extends(MinutesLateExtension);

type TransactionClient = Pick<typeof prisma, keyof Prisma.TransactionClient>;

type Clinic = Prisma.PromiseReturnType<typeof prisma.clinic.findFirstOrThrow>;

export function filterDateOnly(date: Date): Prisma.DateTimeFilter {
  const startDate = new Date(date);
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  return {
    gte: startDate,
    lt: endDate,
  };
}

export async function updateClinic(tx: TransactionClient, id: Clinic["id"]) {
  const appointments = await tx.appointment.findMany({
    where: {
      clinicId: id,
    },
    select: {
      endTime: true,
      status: true,
    },
    orderBy: {
      endTime: "asc",
    },
  });

  /* Find the last appointment marked as seen */
  const lastSeenIndex = appointments.findLastIndex(
    ({ status }) => status === "SEEN"
  );

  /* This works even if lastSeenIndex is -1 because it wasn't found */
  const firstUnseenIndex = lastSeenIndex + 1;

  let firstUnseenEndTime;
  if (firstUnseenIndex < appointments.length) {
    firstUnseenEndTime = appointments[firstUnseenIndex].endTime;
  } else {
    firstUnseenEndTime = null;
  }

  const clinic = await tx.clinic.update({
    where: { id },
    data: {
      firstUnseenEndTime,
    },
  });

  await maybeNotifyClinic(tx, clinic);
}

export async function maybeNotifyClinic(tx: TransactionClient, clinic: Clinic) {
  const minutesChange = Math.abs(
    clinic.minutesLate - clinic.minutesLateNotified
  );

  if (minutesChange < NOTIFY_THRESHOLD_MINUTES) {
    return;
  }

  await tx.clinic.update({
    where: { id: clinic.id },
    data: {
      minutesLateNotified: clinic.minutesLate,
    },
  });

  if (!clinic.firstUnseenEndTime) {
    return;
  }

  /* Get list of patients with potentially delayed appointments */
  const patientIds = (
    await tx.appointment.findMany({
      where: {
        clinicId: clinic.id,
        endTime: {
          gt: clinic.firstUnseenEndTime,
        },
      },
      distinct: ["patientId"],
      select: {
        patientId: true,
      },
    })
  ).map(({ patientId }) => patientId);

  /* TODO: Fix notification order */
  const roundedMinutesLate = Math.round(clinic.minutesLate / 5) * 5;
  const message = `The clinic is running ${
    roundedMinutesLate ? `about ${roundedMinutesLate} minutes late` : "on time"
  }.`;

  await tx.notification.createMany({
    data: patientIds.map((patientId) => ({
      patientId,
      message,
    })),
  });
}

export async function getClinicsWithLateness(date: Date): Promise<Clinic[]> {
  return await prisma.clinic.findMany({
    where: { date: filterDateOnly(date) },
  });
}
