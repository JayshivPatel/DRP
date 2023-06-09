import { Card, PaperProvider, Text } from "react-native-paper";
import Appointment from "./PatientAppointment";
import Message from "./PatientMessage";

export default function PatientDashboard() {
  return (
    <PaperProvider>
      <Card>
        <Card.Title title="Dashboard" />
        <Card.Content>
          <Appointment />
          <Message />
        </Card.Content>
      </Card>
    </PaperProvider>
  );
}
