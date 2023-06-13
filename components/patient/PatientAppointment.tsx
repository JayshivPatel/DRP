import { Text, Card, Button } from "react-native-paper";
import { Clinic, Patient } from "../../lib/api";
import { format } from "date-fns";

export default function PatientAppointment(props: {
  startTime: string;
  endTime: string;
  notes: string;
  id: number;
  clinic?: Clinic;
  patient?: Patient;
}) {
  const date = props.clinic?.date;
  const doctor = props.clinic?.title;

  return (
    <Card>
      <Card.Title
        title={date ? format(new Date(date), "MMMM d, yyyy") : ""}
        subtitle={doctor}
        titleVariant="headlineMedium"
        style={{ marginTop: 20 }}
      />
      <Card.Content>
        <Text variant="bodyLarge">Start Time: {props.startTime}</Text>
        <Text variant="bodyLarge">End Time: {props.endTime}</Text>
        <Text variant="bodyLarge">Current Status: {"On time"}</Text>
        <Text variant="bodyLarge">Reason: {props.notes}</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
      </Card.Actions>
    </Card>
  );
}
