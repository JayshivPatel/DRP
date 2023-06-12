import { Card, Divider, PaperProvider } from "react-native-paper";
import Appointment from "./PatientAppointment";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Appointment as App, useAppointments } from "../../lib/api";

export default function Appointments() {
  const { data: apps, isLoading } = useAppointments({
    includeClinic: true,
    includePatient: true,
  });

  const sortedApps = apps?.sort((app1, app2) => {
    const date1 = app1.clinic?.date ? new Date(app1.clinic?.date) : new Date(0);
    const date2 = app2.clinic?.date ? new Date(app2.clinic?.date) : new Date(0);

    return date2.getTime() - date1.getTime();
  });

  return (
    <PaperProvider>
      <Divider />
      <Card>
        <Card.Title
          title="Upcoming Appointments"
          titleVariant="displayMedium"
        />
      </Card>

      <ScrollView style={{ height: "50%" }}>
        <Card>
          <Card.Content>
            {sortedApps?.map((app) => (
              <>
                <Appointment {...app} />
                <Divider />
              </>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
      <Divider />
      <Card>
        <Card.Title title="Past Appointments" titleVariant="displayMedium" />
      </Card>
      <ScrollView style={{ height: "50%" }}>
        <Card>
          <Card.Content>
            <Appointment
              startTime="09:00"
              endTime="09:30"
              notes="Broken Toe"
              id={10}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
