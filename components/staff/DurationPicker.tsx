import { Picker } from "@react-native-picker/picker";
import React from "react";
import { TextInput } from "react-native-paper";

const DURATIONS = [5, 10, 15, 20, 25, 30];

function DurationPicker(props: {
  value?: number;
  suggested?: number;
  onChange: (value: number) => void;
}) {
  const durationSet = new Set(DURATIONS);
  if (props.suggested) {
    durationSet.add(props.suggested);
  }

  const durations = [...durationSet]
    .sort((a, b) => a - b)
    .map((duration) => ({
      label: `${duration} minutes${
        duration == props.suggested ? " (suggested)" : ""
      }`,
      value: duration,
    }));

  const selectedValue = (props.value ?? durations[0].value).toString();

  return (
    <TextInput
      label="Appointment Length"
      value={selectedValue}
      render={(renderProps) => (
        <Picker
          style={renderProps.style}
          selectedValue={selectedValue}
          onValueChange={(value) => props.onChange(parseInt(value))}
        >
          {durations.map(({ label, value }) => (
            <Picker.Item
              key={value.toString()}
              label={label}
              value={value.toString()}
            />
          ))}
        </Picker>
      )}
    />
  );
}
export default DurationPicker;
