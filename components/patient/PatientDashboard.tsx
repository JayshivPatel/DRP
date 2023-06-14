import { Card, PaperProvider } from "react-native-paper";
import { ScrollView } from "react-native";
import * as api from "../../lib/api";
import { Patient } from "../../lib/api";
import renderNotifications from "./RenderNotifications";
import renderUpcomingAppointments from "./RenderUpcomingAppointments";
import { useAppointments } from "../../lib/api";

export default function PatientDashboard(props: { patientId: Patient["id"] }) {
  const {
    data: apps,
    error: appsError,
    isLoading: appsIsLoading,
  } = useAppointments({
    includeClinic: true,
    includePatient: true,
  });

  const upcomingAppointments = renderUpcomingAppointments(
    apps,
    appsError,
    appsIsLoading,
    props.patientId
  );

  const { data, error, isLoading, mutate } = api.useNotifications();

  const notifications = renderNotifications(
    data,
    error,
    isLoading,
    props.patientId
  );

  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title title="Dashboard" titleVariant="displayMedium" />
          <Card.Content>
            <Card>
              <Card.Title
                title="Upcoming Appointments:"
                titleVariant="headlineMedium"
              />
              <Card.Content>{upcomingAppointments}</Card.Content>
            </Card>
            <Card>
              <Card.Title title="Messages" titleVariant="headlineMedium" />
              <Card.Content>{notifications}</Card.Content>
            </Card>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
