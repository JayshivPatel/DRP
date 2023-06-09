import { Text, Card, Button, List } from "react-native-paper";

export default function Message() {
  return (
  <Card>
  <Card.Content>
    <Text variant="bodyLarge">
      Dear Patient,
        This is a test message sent from your surgery.
    </Text>
  </Card.Content>
  <Card.Actions>
    <Button>Cancel</Button>
  </Card.Actions>
</Card>
  )
}
