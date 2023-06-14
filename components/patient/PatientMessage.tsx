import { Text, Card, Button, List, PaperProvider } from "react-native-paper";

export default function Message() {
  return (
    <Card>
      <Card.Content style={{ margin: 10 }}>
        <Text variant="bodyLarge">
          Dear Patient, This is a test message sent from your surgery.
        </Text>
      </Card.Content>
    </Card>
  );
}
