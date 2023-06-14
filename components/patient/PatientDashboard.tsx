import { Card, PaperProvider, Divider, Text, List } from "react-native-paper";
import { FlatList, View } from "react-native";
import Message from "./PatientMessage";
import { ScrollView } from "react-native";
import { Patient } from "../../lib/api";
import renderNotifications from "./RenderNotifications";
import renderUpcomingAppointments from "./RenderUpcomingAppointments";
import { usePatientFull } from "../../lib/api";

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
