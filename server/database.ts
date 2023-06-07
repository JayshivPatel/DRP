import type { Prisma } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = new PrismaClient();

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
