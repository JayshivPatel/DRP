import { Card, PaperProvider, DefaultTheme, Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import { Patient } from "../../lib/api";
import renderNotifications from "./RenderNotifications";
import renderUpcomingAppointments from "./RenderUpcomingAppointments";
import { usePatientFull } from "../../lib/api";
import materialColors from "../../material-colors.json";

export default function PatientDashboard(props: { patientId: Patient["id"] }) {
  const { data: patient, error, isLoading } = usePatientFull(props.patientId);

  const upcomingAppointments = renderUpcomingAppointments(
    patient?.appointments,
    error,
    isLoading,
    props.patientId
  );

  const notifications = renderNotifications(
    patient?.notifications,
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
      <ScrollView>
        <Card>
          <Card.Title title="Dashboard" titleVariant="headlineLarge" />
          <Card.Content>
            <Card style={{ margin: 10 }}>
              <Card.Title
                title="Upcoming Appointments:"
                titleVariant="headlineMedium"
              />
              <Card.Content>{upcomingAppointments}</Card.Content>
            </Card>
            <Divider />
            <Card style={{ margin: 10 }}>
              <Card.Title title="Messages" titleVariant="headlineMedium" />
              <Card.Content>{notifications}</Card.Content>
            </Card>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
