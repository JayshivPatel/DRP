import { Card, Divider, PaperProvider } from "react-native-paper";
import Appointment from "./PatientAppointment";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Appointment as App, useAppointments } from "../../lib/api";
import { format } from "date-fns";
import { number } from "zod";

export default function Appointments() {
  const { data: apps, isLoading } = useAppointments({
    includeClinic: true,
    includePatient: true,
  });

  function sortAppointments(reverse: boolean) {
    apps?.sort((app1, app2) => {
      const date1 = app1.clinic?.date
        ? new Date(app1.clinic?.date)
        : new Date(0);
      const date2 = app2.clinic?.date
        ? new Date(app2.clinic?.date)
        : new Date(0);

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

  return (
    <PaperProvider>
      <Divider />
      <ScrollView>
        <Card style={{ margin: 10 }}>
          <Card.Title
            title="Upcoming Appointments"
            titleVariant="headlineMedium"
          />
        </Card>

        <Card>
          <Card.Content>
            {sortAppointments(false)
              ?.filter((app) => {
                const currentDate = new Date();
                const appDate = new Date(
                  app.clinic?.date ? app.clinic?.date : 0
                );

                const [hrs, mins] = app.startTime.split(":").map(Number);
                appDate.setHours(hrs);
                appDate.setMinutes(mins);

                return appDate.getTime() >= currentDate.getTime();
              })
              .map((app) => (
                <>
                  <Appointment {...app} />
                  <Divider />
                </>
              ))}
          </Card.Content>
        </Card>

        <Divider />
        <Card style={{ margin: 10 }}>
          <Card.Title title="Past Appointments" titleVariant="headlineMedium" />
        </Card>

        <Card>
          <Card.Content>
            {sortAppointments(true)
              ?.filter((app) => {
                const currentDate = new Date();
                const appDate = new Date(
                  app.clinic?.date ? app.clinic?.date : 0
                );

                const [hrs, mins] = app.startTime.split(":").map(Number);
                appDate.setHours(hrs);
                appDate.setMinutes(mins);

                return appDate.getTime() < currentDate.getTime();
              })
              .map((app) => (
                <>
                  <Appointment {...app} />
                  <Divider />
                </>
              ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
