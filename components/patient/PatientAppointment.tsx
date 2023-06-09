import { Text, Card, Button } from "react-native-paper";

export default function Appointment() {
  const messageComponents = [
    "Tuesday 30 May 2023",
    "Dr Danny",
    "14:30",
    "On time",
    "Headache",
  ];

  return (
    <Card>
      <Card.Title
        title={messageComponents[0]}
        subtitle={messageComponents[1]}
        titleVariant="headlineMedium"
      />
      <Card.Content>
        <Text variant="bodyLarge">Time: {messageComponents[2]}</Text>
        <Text variant="bodyLarge">Current Status: {messageComponents[3]}</Text>
        <Text variant="bodyLarge">Reason: {messageComponents[4]}</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
      </Card.Actions>
    </Card>
  );
}
