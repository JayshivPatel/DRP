import { Card, Divider, PaperProvider } from "react-native-paper";
import Appointment from "./PatientAppointment";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  Appointment as App,
  useAppointments,
  usePatientFull,
} from "../../lib/api";
import { Patient } from "../../lib/api";
import renderUpcomingAppointments from "./RenderUpcomingAppointments";
import renderPastAppointments from "./RenderPastAppointments";

export default function Appointments(props: { patientId: Patient["id"] }) {
  const { data: patient, error, isLoading } = usePatientFull(props.patientId);

  const upcomingAppointments = renderUpcomingAppointments(
    patient?.appointments,
    error,
    isLoading,
    props.patientId
  );

  const pastAppointments = renderPastAppointments(
    patient?.appointments,
    error,
    isLoading,
    props.patientId
  );

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
        {upcomingAppointments}
        <Divider />
        <Card style={{ margin: 10 }}>
          <Card.Title title="Past Appointments" titleVariant="headlineMedium" />
        </Card>
        {pastAppointments}
      </ScrollView>
    </PaperProvider>
  );
}
