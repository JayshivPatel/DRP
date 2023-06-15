import * as React from "react";
import { useState } from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import DurationPicker from "./DurationPicker";

export default function ChangeSuggestedDurationDialog(props: {
  initialValue?: number;
  visible: boolean;
  onDismiss: () => void;
  updateSuggestedDuration: (duration: number) => void;
}) {
  const [selectedValue, setSelectedValue] = useState(props.initialValue);

  React.useEffect(() => {
    setSelectedValue(props.initialValue);
  }, [props.initialValue]);

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
          <Button onPress={() => props.updateSuggestedDuration(selectedValue!)}>
            Confirm
          </Button>
          <Button onPress={props.onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
