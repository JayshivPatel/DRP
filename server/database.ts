import { Clinic, PrismaClient, Prisma, Appointment } from "@prisma/client";

const TIMEZONE = "Europe/London";
const MILLIS_PER_MINUTE = 60 * 1000;

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
    ({ status }) => status == "SEEN"
  );

  const [lastSeen, firstUnseen, ...lateAppointments] =
    lastSeenIndex === -1 ? [] : appointments.slice(lastSeenIndex);

  if (!firstUnseen) {
    return clinic;
  }

  const lateness = localTime - firstUnseen.endTime.getTime();

  if (lateness <= 0) {
    return clinic;
  }

  const minutesLate = Math.round(lateness / MILLIS_PER_MINUTE);

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
      1,
      localDate.getHours(),
      localDate.getMinutes(),
      localDate.getSeconds(),
      localDate.getMilliseconds()
    )
  ).getTime();

  const clinics = await prisma.clinic.findMany({
    where,
    include: {
      appointments: true,
    },
  });

  return clinics.map(({ appointments, ...clinic }) =>
    computeLateness(clinic, appointments, localTime)
  );
}
