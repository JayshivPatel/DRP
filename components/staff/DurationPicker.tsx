import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";

function DurationPicker(props: {
  value: number;
  onChange: (value: number) => void;
}) {
  const DURATIONS = [5, 10, 15, 20, 25, 30];
  return (
    <TextInput
      label="Appointment Length"
      value={props.value.toString()}
      render={(renderProps) => (
        <Picker
          style={renderProps.style}
          selectedValue={props.value.toString()}
          onValueChange={(value) => props.onChange(parseInt(value))}
        >
          {DURATIONS.map((duration) => (
            <Picker.Item
              key={duration}
              label={`${duration} minutes`}
              value={duration.toString()}
            />
          ))}
        </Picker>
      )}
    />
  );
}
export default DurationPicker;
