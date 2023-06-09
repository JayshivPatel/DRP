import { Card, Text } from "react-native-paper";
import Message from "./PatientMessage";

export default function PatientMessages() {
  return (
    <Card>
      <Card.Content>
        <Message/>
        <Message/>
        <Message/>
      </Card.Content>
    </Card>
  );
}
