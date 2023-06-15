import {
  Clinic,
  PrismaClient,
  Prisma,
  Appointment,
  PrismaPromise,
} from "@prisma/client";

const TIMEZONE = "Europe/London";

const MILLIS_PER_MINUTE = 60 * 1000;
const NOTIFY_THRESHOLD_MINUTES = 30;

export const prisma: PrismaClient = new PrismaClient();

export type ClinicWithMinutesLate = Clinic & {
  minutesLate?: number;
};

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

function getLocalDate(timeZone: string): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone }));
}

function computeLateness(
  clinic: Clinic,
  appointments: Appointment[],
  localTime: number
): ClinicWithMinutesLate {
  /* Sort appointments by end time */
  appointments.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());

  /* Find the last appointment marked as seen */
  const lastSeenIndex = appointments.findLastIndex(
    ({ status }) => status === "SEEN"
  );

  /* This works even if lastSeenIndex is -1 because it wasn't found */
  const [firstUnseen, ...lateAppointments] = appointments.slice(
    lastSeenIndex + 1
  );

  const millisLate = firstUnseen
    ? Math.max(localTime - firstUnseen.endTime.getTime(), 0)
    : 0;
  const minutesLate = Math.round(millisLate / MILLIS_PER_MINUTE);

  return { ...clinic, minutesLate };
}

export async function getClinicsWithLateness(
  date: Date
): Promise<ClinicWithMinutesLate[]> {
  /* Get the current date and time in the local timezone */
  const localDate = getLocalDate(TIMEZONE);
  /* Check whether the requested date matches the current local date */
  const isToday =
    date.getDate() == localDate.getDate() &&
    date.getMonth() == localDate.getMonth() &&
    date.getFullYear() == localDate.getFullYear();

  const where: Prisma.ClinicWhereInput = {
    date: filterDateOnly(date),
  };

  if (!isToday) {
    return await prisma.clinic.findMany({ where });
  }

  /* Create date comparable to Prisma dates */
  const localTime = new Date(
    Date.UTC(
      1970,
      0,
      2,
      localDate.getHours(),
      localDate.getMinutes(),
      localDate.getSeconds(),
      localDate.getMilliseconds()
    )
  ).getTime();

  const clinics = await prisma.$transaction(async (tx) => {
    const clinics = (
      await tx.clinic.findMany({
        where,
        include: {
          appointments: true,
        },
      })
    ).map(({ appointments, ...clinic }) =>
      computeLateness(clinic, appointments, localTime)
    );

    for (const { id, minutesLate, minutesLateNotified, title } of clinics) {
      const minutesChange =
        minutesLate !== undefined
          ? Math.abs(minutesLate - minutesLateNotified)
          : 0;

      if (minutesChange < NOTIFY_THRESHOLD_MINUTES) {
        continue;
      }

      /* TODO: Send notifications */
      console.log(
        `${JSON.stringify(
          title
        )} changed from ${minutesLateNotified} to ${minutesLate} (${minutesChange})`
      );

      await tx.clinic.update({
        where: { id },
        data: { minutesLateNotified: minutesLate },
      });
    }

    return clinics;
  });

  return clinics;
}
