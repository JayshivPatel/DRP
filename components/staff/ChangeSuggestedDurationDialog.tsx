import * as React from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import DurationPicker from "./DurationPicker";
import { Patient } from "../../lib/api";

export default function ChangeSuggestedDurationDialog(props: {
  visible: boolean;
  onDismiss: () => void;
}) {
  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={props.onDismiss}
        style={{ alignSelf: "center", minWidth: 480 }}
      >
        <Dialog.Title>Change suggested time for patient</Dialog.Title>
        <Dialog.Content>
          <DurationPicker value={15} onChange={() => {}} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
