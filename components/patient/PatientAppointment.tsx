import { Text, Card, Button, Portal, Dialog } from "react-native-paper";
import {
  Clinic,
  Patient,
  deleteAppointment,
  useAppointments,
} from "../../lib/api";
import { format } from "date-fns";
import { mutate } from "swr";
import React from "react";

export default function PatientAppointment(props: {
  startTime: string;
  endTime: string;
  notes: string;
  id: number;
  clinic?: Clinic;
}) {
  const [visible, setVisible] = React.useState(false);

  const date = props.clinic?.date;
  const doctor = props.clinic?.title;

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Card style={{ margin: 10 }}>
      <Card.Title
        title={date ? format(new Date(date), "MMMM d, yyyy") : ""}
        subtitle={"Seeing: " + doctor}
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
        <Button onPress={showDialog}>Cancel</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Cancel Appointment?</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Are you sure you want to cancel your appointment?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() =>
                  deleteAppointment(props.id)
                    .then(hideDialog)
                    .catch((e) => console.error(e))
                }
              >
                Confirm Cancellation
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Card.Actions>
    </Card>
  );
}
