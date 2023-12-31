import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Dialog, Menu, Text } from "react-native-paper";
import { Appointment, AppointmentStatus } from "../../lib/api";
import PatientData from "./PatientData";
import ConfirmDialog from "./ConfirmDialog";

function useInterval(handler: () => void, timeout: number) {
  React.useEffect(() => {
    const id = setInterval(handler, timeout);
    return () => clearInterval(id);
  });
}

function Row(props: { name: string; value: string }) {
  return (
    <DataTable.Row>
      <DataTable.Cell>{props.name}</DataTable.Cell>
      <DataTable.Cell>{props.value}</DataTable.Cell>
    </DataTable.Row>
  );
}

export default function AppointmentDetailsMenu(props: {
  anchor: { x: number; y: number };
  visible: boolean;
  onDismiss: () => void;
  appointment?: Appointment;
  onCancel: (id: Appointment["id"]) => void;
  onChangeStatus: (id: Appointment["id"], status: AppointmentStatus) => void;
}) {
  const [confirmVisible, setConfirmVisible] = React.useState(false);

  function onPressCancel() {
    setConfirmVisible(true);
  }

  function onToggleSeen() {
    const newStatus = props.appointment!.status == "SEEN" ? "UNSEEN" : "SEEN";
    props.onChangeStatus(props.appointment!.id, newStatus);
  }

  function onDismissCancel() {
    setConfirmVisible(false);
  }

  function onConfirmCancel() {
    setConfirmVisible(false);
    props.onCancel(props.appointment!.id);
  }

  return (
    <>
      <Menu
        anchor={props.anchor}
        visible={props.visible && !confirmVisible}
        onDismiss={props.onDismiss}
        style={styles.menu}
      >
        <Dialog.Title>Appointment details</Dialog.Title>
        <Dialog.Content style={styles.content}>
          {props.appointment && (
            <DataTable>
              <PatientData patient={props.appointment.patient}>
                {(name, value) => <Row name={name} value={value} />}
              </PatientData>
              <Row name="Appointment Reason" value={props.appointment.notes} />
            </DataTable>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onToggleSeen}>
            {props.appointment?.status == "UNSEEN"
              ? "Mark as seen"
              : "Mark as unseen"}
          </Button>
          <Button onPress={onPressCancel}>Cancel appointment</Button>
        </Dialog.Actions>
      </Menu>
      <ConfirmDialog
        visible={confirmVisible}
        title="Cancel appointment"
        onDismiss={onDismissCancel}
        onConfirm={onConfirmCancel}
      >
        Are you sure you would like to cancel this appointment?
      </ConfirmDialog>
    </>
  );
}

const styles = StyleSheet.create({
  menu: {
    minWidth: 480,
  },
  content: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
