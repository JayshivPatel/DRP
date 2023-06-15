import { Card, PaperProvider, DefaultTheme, Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import { Patient } from "../../lib/api";
import PatientNotifications from "./PatientNotifications";
import { usePatientFull } from "../../lib/api";
import materialColors from "../../material-colors.json";
import { renderAppointments } from "./RenderAppointments";

export default function PatientDashboard(props: { patientId: Patient["id"] }) {
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
                title="Upcoming Appointments"
                titleVariant="headlineMedium"
                titleNumberOfLines={5}
              />
              <Card.Content>{upcomingAppointments}</Card.Content>
            </Card>
            <Divider />
            <Card style={{ margin: 10 }}>
              <Card.Title title="Messages" titleVariant="headlineMedium" />
              <Card.Content>
                <PatientNotifications
                  notifications={patient?.notifications}
                  error={error}
                  isLoading={isLoading}
                  mutate={mutate}
                  unreadOnly
                />
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
