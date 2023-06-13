import * as React from "react";
import { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import DurationPicker from "./DurationPicker";
import { Patient } from "../../lib/api";

export default function ChangeSuggestedDurationDialog(props: {
  visible: boolean;
  onDismiss: () => void;
}) {
  const [selectedValue, setSelectedValue] = useState(15);
  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={props.onDismiss}
        style={{ alignSelf: "center", minWidth: 480 }}
      >
        <Dialog.Title>Change suggested time for patient</Dialog.Title>
        <Dialog.Content>
          <DurationPicker
            value={selectedValue}
            onChange={(value) => setSelectedValue(value)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
