import { Card, Divider, PaperProvider, DefaultTheme } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
  Appointment as App,
  useAppointments,
  usePatientFull,
} from "../../lib/api";
import { Patient } from "../../lib/api";
import renderUpcomingAppointments from "./RenderUpcomingAppointments";
import renderPastAppointments from "./RenderPastAppointments";
import materialColors from "../../material-colors.json";

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
    <PaperProvider
      theme={{
        ...DefaultTheme,
        colors: materialColors.colors,
      }}
    >
      <Divider />
      <ScrollView>
        <Card style={styles.cards}>
          <Card.Title
            title="Upcoming Appointments"
            titleVariant="headlineMedium"
          />
          <Card.Content>{upcomingAppointments}</Card.Content>
        </Card>

        <Divider />
        <Card style={styles.cards}>
          <Card.Title title="Past Appointments" titleVariant="headlineMedium" />
          <Card.Content>{pastAppointments}</Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  cards: {
    margin: 30,
  },
});
