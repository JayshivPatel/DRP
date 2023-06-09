import { Text, Card, Button, List } from "react-native-paper";

export default function Message() {
  return (
  <Card>
  <Card.Content>
    <Text variant="bodyLarge">
      Dear Patient,...
    </Text>
  </Card.Content>
  <Card.Actions>
    <Button>Cancel</Button>
  </Card.Actions>
</Card>
  )
}
