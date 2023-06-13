import * as React from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

export default function CreateClinicDialog(props: {
  visible: boolean;
  onDismiss: () => void;
  date: string;
  onCreate: (title: string) => void;
}) {
  const [title, setTitle] = React.useState("");

  function onSubmit() {
    props.onCreate(title);
  }

  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={props.onDismiss}
        style={{ alignSelf: "center", minWidth: 480 }}
      >
        <Dialog.Title>Create new clinic on {props.date}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Clinic name"
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={onSubmit}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onDismiss}>Cancel</Button>
          <Button onPress={onSubmit}>Create</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
