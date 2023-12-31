import { Appointment, Patient } from "../../lib/api";

export function filterAppointments(
  apps: Appointment[],
  patientId: Patient["id"],
  past: boolean
): Appointment[] {
  return sortAppointments(apps, past)?.filter((app) => {
    const currentDate = new Date();
    const appDate = new Date(app.clinic?.date ? app.clinic?.date : 0);

    if (past) {
      return (
        (!isToday(appDate, currentDate) && !isFuture(appDate, currentDate)) ||
        (isToday(appDate, currentDate) && app.status == "SEEN")
      );
    } else {
      return (
        isFuture(appDate, currentDate) ||
        (isToday(appDate, currentDate) && app.status == "UNSEEN")
      );
    }
  });
}

function isToday(date1: Date, date2: Date) {
  return (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  );
}

function isFuture(date1: Date, date2: Date) {
  return (
    date1.getFullYear() > date2.getFullYear() ||
    date1.getMonth() > date2.getMonth() ||
    date1.getDate() > date2.getDate()
  );
}

function sortAppointments(apps: Appointment[], reverse: boolean) {
  apps?.sort((app1, app2) => {
    const date1 = app1.clinic?.date ? new Date(app1.clinic?.date) : new Date(0);
    const date2 = app2.clinic?.date ? new Date(app2.clinic?.date) : new Date(0);

    return subtractTimeString(
      app1.startTime,
      app2.startTime,
      date1,
      date2,
      reverse
    );
  });

  return apps;
}

export function subtractTimeString(
  t1: string,
  t2: string,
  date1 = new Date(0),
  date2 = new Date(0),
  reverse = false
) {
  const [hrs1, mins1] = t1.split(":").map(Number);
  const [hrs2, mins2] = t2.split(":").map(Number);

  date1.setHours(hrs1);
  date1.setMinutes(mins1);

  date2.setHours(hrs2);
  date2.setMinutes(mins2);

  if (reverse) {
    return date2.getTime() - date1.getTime();
  }

  return date1.getTime() - date2.getTime();
}
