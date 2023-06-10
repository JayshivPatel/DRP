import { Card, PaperProvider, Divider, Text, Button } from "react-native-paper";
import Appointment from "./PatientAppointment";
import Message from "./PatientMessage";
import { ScrollView } from "react-native";

export default function PatientDashboard() {
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
              <Card.Content>
                <Appointment />
                <Divider />
                <Appointment />
              </Card.Content>
            </Card>
            <Card>
              <Card.Title
                title="Most Recent Message:"
                titleVariant="headlineMedium"
              />
              <Card.Content>
                <Message />
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
