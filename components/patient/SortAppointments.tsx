import { Appointment } from "../../lib/api";

export function sortAppointments(apps: Appointment[], reverse: boolean) {
  apps?.sort((app1, app2) => {
    const date1 = app1.clinic?.date ? new Date(app1.clinic?.date) : new Date(0);
    const date2 = app2.clinic?.date ? new Date(app2.clinic?.date) : new Date(0);

    const [hrs1, mins1] = app1.startTime.split(":").map(Number);
    const [hrs2, mins2] = app2.startTime.split(":").map(Number);

    date1.setHours(hrs1);
    date1.setMinutes(mins1);

    date2.setHours(hrs2);
    date2.setMinutes(mins2);

    if (reverse) {
      return date2.getTime() - date1.getTime();
    }

    return date1.getTime() - date2.getTime();
  });

  return apps;
}
