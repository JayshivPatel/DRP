import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import {
  Appointment,
  Clinic,
  Patient,
  deleteAppointment,
  useAppointments,
} from "../../lib/api";
import { createAppointment } from "../../lib/api";
import { styles } from "./ClinicViews";
import ClinicSchedule from "./ClinicSchedule";
import CreateAppointmentMenu from "./CreateAppointmentMenu";
import AppointmentDetailsMenu from "./AppointmentDetailsMenu";
import ConfirmDialog from "./ConfirmDialog";

export function formatTime(date: Date): string {
  /* TODO(saleem): Change to date library */
  return `${date.getHours()}:${date.getMinutes()}`;
}

export default function ClinicView(props: {
  clinic: Clinic;
  onHidePress: (clinic: Clinic) => void;
  onDelete: (clinic: Clinic) => void;
  patient?: Patient;
  changePatient: () => void;
}) {
  const theme = useTheme();

  const [anchor, setAnchor] = React.useState({ x: 0, y: 0 });

  const [creationStart, setCreationStart] = React.useState<Date | undefined>(
    undefined
  );
  const [creationDuration, setCreationDuration] = React.useState(5);
  const [creationNotes, setCreationNotes] = React.useState("");

  const [selectedAppointment, setSelectedAppointment] = React.useState<
    Appointment | undefined
  >();

  const [creationFailed, setCreationFailed] = React.useState(false);
  const [cancelFailed, setCancelFailed] = React.useState(false);

  const [confirmVisible, setConfirmVisible] = React.useState(false);

  function onPressDate(date: Date, x: number, y: number) {
    setAnchor({ x, y });
    setCreationStart(date);
  }

  function onPressEvent(appointment: Appointment, x: number, y: number) {
    setAnchor({ x, y });
    console.log(appointment);
    setSelectedAppointment(appointment);
  }

  function closeCreateMenu() {
    setCreationStart(undefined);
  }

  function closeAppointmentDetails() {
    setSelectedAppointment(undefined);
  }

  const { data, error, isLoading, mutate } = useAppointments({
    clinicId: props.clinic.id,
    includePatient: true,
  });

  function onCreateAppointment() {
    createAppointment({
      patientId: props.patient!.id,
      clinicId: props.clinic.id,
      startTime: formatTime(creationStart!),
      endTime: formatTime(creationEnd!),
      notes: creationNotes,
    })
      .then(() => mutate())
      .catch((e) => {
        console.error(e);
        setCreationFailed(true);
      });

    closeCreateMenu();
  }

  function onCancelAppointment(id: Appointment["id"]) {
    deleteAppointment(id)
      .then(() => mutate())
      .catch((e) => {
        console.error(e);
        setCancelFailed(true);
      });

    closeAppointmentDetails();
  }

  const creationEnd = creationStart && new Date(creationStart);
  creationEnd?.setMinutes(creationEnd.getMinutes() + creationDuration);

  let content;
  if (error) {
    content = (
      <>
        <View style={styles.loading}>
          <Text
            variant="labelLarge"
            style={{
              color: theme.colors.error,
            }}
          >
            Failed to load appointments
          </Text>
        </View>
      </>
    );
  } else if (isLoading) {
    content = (
      <>
        <View style={styles.loading}>
          <ActivityIndicator />
          <Text variant="labelLarge">Loading appointments</Text>
        </View>
      </>
    );
  } else {
    content = (
      <>
        <ClinicSchedule
          appointments={data}
          selectionStart={creationStart}
          selectionEnd={creationEnd}
          onPressDate={onPressDate}
          onPressEvent={onPressEvent}
        />
      </>
    );
  }

  return (
    <>
      <Card mode="elevated" style={styles.card}>
        <Card.Title
          title={props.clinic.title}
          titleVariant="titleLarge"
          right={(rightProps) => (
            <Card.Actions {...rightProps}>
              <Button onPress={() => setConfirmVisible(true)}>Delete</Button>
              <Button onPress={() => props.onHidePress(props.clinic)}>
                Hide
              </Button>
            </Card.Actions>
          )}
        />
        <Card.Content style={styles.content}>
          <ScrollView>{content}</ScrollView>
        </Card.Content>
      </Card>
      <CreateAppointmentMenu
        anchor={anchor}
        visible={!!creationStart}
        onDismiss={closeCreateMenu}
        patient={props.patient}
        changePatient={props.changePatient}
        startTime={creationStart?.toLocaleTimeString()}
        duration={creationDuration}
        onChangeDuration={setCreationDuration}
        notes={creationNotes}
        onChangeNotes={setCreationNotes}
        onSubmit={onCreateAppointment}
      />
      <AppointmentDetailsMenu
        anchor={anchor}
        visible={!!selectedAppointment}
        onDismiss={closeAppointmentDetails}
        appointment={selectedAppointment}
        onCancel={onCancelAppointment}
      />
      <ConfirmDialog
        visible={confirmVisible}
        title="Cancel clinic"
        onDismiss={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          props.onDelete(props.clinic);
        }}
      >
        Are you sure you want to cancel this clinic and all its appointments?
      </ConfirmDialog>
      <Snackbar
        visible={creationFailed}
        onDismiss={() => setCreationFailed(false)}
      >
        Failed to create appointment
      </Snackbar>
      <Snackbar visible={cancelFailed} onDismiss={() => setCancelFailed(false)}>
        Failed to cancel appointment
      </Snackbar>
    </>
  );
}