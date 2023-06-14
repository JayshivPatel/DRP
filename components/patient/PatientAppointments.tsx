import { Card, Divider, PaperProvider, DefaultTheme } from "react-native-paper";
import { ScrollView } from "react-native";
import { Appointment as App, useAppointments } from "../../lib/api";
import { Patient } from "../../lib/api";
import renderUpcomingAppointments from "./RenderUpcomingAppointments";
import renderPastAppointments from "./RenderPastAppointments";
import materialColors from "../../material-colors.json";

export default function Appointments(props: { patientId: Patient["id"] }) {
  const {
    data: apps,
    error,
    isLoading,
  } = useAppointments({
    includeClinic: true,
    includePatient: true,
  });

  const upcomingAppointments = renderUpcomingAppointments(
    apps,
    error,
    isLoading,
    props.patientId
  );

  const pastAppointments = renderPastAppointments(
    apps,
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
