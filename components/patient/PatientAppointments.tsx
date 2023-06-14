import { Card, Divider, PaperProvider, DefaultTheme } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
  Appointment as App,
  useAppointments,
  usePatientFull,
} from "../../lib/api";
import { Patient } from "../../lib/api";
import materialColors from "../../material-colors.json";
import { renderAppointments } from "./RenderAppointments";

export default function Appointments(props: { patientId: Patient["id"] }) {
  const {
    data: patient,
    error,
    isLoading,
    mutate,
  } = usePatientFull(props.patientId);

  const upcomingAppointments = renderAppointments(
    patient?.appointments,
    error,
    isLoading,
    props.patientId,
    mutate,
    false
  );

  const pastAppointments = renderAppointments(
    patient?.appointments,
    error,
    isLoading,
    props.patientId,
    mutate,
    true
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
            titleNumberOfLines={5}
          />
          <Card.Content>{upcomingAppointments}</Card.Content>
        </Card>

        <Divider />
        <Card style={styles.cards}>
          <Card.Title
            title="Past Appointments"
            titleVariant="headlineMedium"
            titleNumberOfLines={5}
          />
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
