import { Card, Divider, PaperProvider } from "react-native-paper";
import Appointment from "./PatientAppointment";
import { ScrollView } from "react-native";

export default function Appointments() {
  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Content>
            <Card.Title title="Your Appointments" />
            <Appointment />
            <Divider />
            <Appointment />
            <Divider />
            <Appointment />
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
