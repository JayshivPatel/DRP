import { Notification, Patient } from "@prisma/client";
import { prisma, TransactionClient } from "./database";

const LIST_FORMAT = new Intl.ListFormat("en");

export async function sendNotifications(
  tx: TransactionClient,
  notifications: { patientId: Patient["id"]; message: string }[]
) {
  await tx.notification.createMany({ data: notifications });
}

function formatMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (hours) {
    parts.push(`${hours} hours`);
  }
  if (minutes) {
    parts.push(`${minutes} minutes`);
  }

  return LIST_FORMAT.format(parts);
}

export async function sendLateNotifications(
  tx: TransactionClient,
  patientIds: Patient["id"][],
  lateMinutes: number
) {
  const status = lateMinutes
    ? `around ${formatMinutes(lateMinutes)} late`
    : "on time now";
  const message = `The clinic is running ${status}.`;

  await sendNotifications(
    tx,
    patientIds.map((patientId) => ({ patientId, message }))
  );
}
