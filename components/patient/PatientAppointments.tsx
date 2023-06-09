import { Text, Card } from "react-native-paper";
import Appointment from "./PatientAppointment";

export default function Appointments() {
  return (
    <Card>
    <Card.Content>
      <Appointment/>
      <Appointment/>
      <Appointment/>
    </Card.Content>
  </Card>
  )
}
