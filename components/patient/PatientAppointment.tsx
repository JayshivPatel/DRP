import { Text, Card, Button, Portal, Dialog } from "react-native-paper";
import {
  Clinic,
  Patient,
  PatientFull,
  deleteAppointment,
  useAppointments,
  usePatientFull,
} from "../../lib/api";
import { format } from "date-fns";
import { KeyedMutator, mutate } from "swr";
import React from "react";

export default function PatientAppointment(props: {
  startTime: string;
  endTime: string;
  notes: string;
  id: number;
  clinic?: Clinic;
  patient?: Patient;
  mutate: KeyedMutator<PatientFull>;
  cancellable: boolean;
}) {
  const [visible, setVisible] = React.useState(false);

  const RenderCancelButton = () => {
    if (props.cancellable) {
      return <Button onPress={showDialog}>Cancel</Button>;
    }
    return <></>;
  };

  const date = props.clinic?.date;
  const doctor = props.clinic?.title;
  var status = props.clinic?.minutesLate
    ? "Running " + props.clinic?.minutesLate + " minutes late"
    : "On Time";

  if (!props.cancellable) {
    status = "Appointment Finished";
  }

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Card style={{ margin: 10 }}>
      <Card.Title
        title={date ? format(new Date(date), "MMMM d, yyyy") : ""}
        subtitle={"Seeing: " + doctor}
        titleVariant="headlineMedium"
        style={{ marginTop: 20 }}
        titleNumberOfLines={5}
        subtitleNumberOfLines={3}
      />
      <Card.Content>
        <Text variant="bodyLarge">Start Time: {props.startTime}</Text>
        <Text variant="bodyLarge">End Time: {props.endTime}</Text>
        <Text variant="bodyLarge">Current Status: {status}</Text>
        <Text variant="bodyLarge" numberOfLines={100}>
          Reason: {props.notes}
        </Text>
      </Card.Content>
      <Card.Actions>
        <RenderCancelButton />
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
                onPress={async () =>
                  deleteAppointment(props.id)
                    .then(hideDialog)
                    .then(() => props.mutate())
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
