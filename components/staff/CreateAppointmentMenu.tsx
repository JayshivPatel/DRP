import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Card, Dialog, Menu, TextInput } from "react-native-paper";
import { Patient } from "../../lib/api";
import DurationPicker from "./DurationPicker";

export default function CreateAppointmentMenu(props: {
  anchor: { x: number; y: number };
  visible: boolean;
  onDismiss: () => void;
  patient?: Patient;
  changePatient: () => void;
  startTime?: string;
  duration: number;
  onChangeDuration: (duration: number) => void;
  notes: string;
  onChangeNotes: (notes: string) => void;
  onSubmit: () => void;
}) {
  const isValid = props.patient;

  return (
    <Menu
      anchor={props.anchor}
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={styles.menu}
    >
      <Dialog.Title>Schedule appointment</Dialog.Title>
      <Dialog.Content style={styles.content}>
        <View style={styles.row}>
          <TextInput
            label="Patient"
            editable={false}
            value={
              props.patient
                ? `${props.patient.firstName} ${props.patient.lastName}`
                : "No patient selected"
            }
            error={!props.patient}
            style={{ flex: 1 }}
          />
          <Button
            mode="outlined"
            onPress={() => {
              props.onDismiss();
              props.changePatient();
            }}
          >
            Change
          </Button>
        </View>
        <TextInput
          label="Appointment Time"
          editable={false}
          value={props.startTime}
        />
        <DurationPicker
          value={props.duration}
          onChange={props.onChangeDuration}
        />
        <TextInput
          label="Appointment Reason"
          multiline
          numberOfLines={5}
          value={props.notes}
          onChangeText={props.onChangeNotes}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button disabled={!isValid} onPress={props.onSubmit}>
          Create
        </Button>
      </Dialog.Actions>
    </Menu>
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
