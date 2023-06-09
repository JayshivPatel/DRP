import { Card, Divider, PaperProvider, Text } from "react-native-paper";
import Message from "./PatientMessage";
import { ScrollView } from "react-native";

export default function PatientMessages() {
  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title title="Your Messages" titleVariant="displayMedium" />
          <Card.Content>
            <Message />
            <Divider />
            <Message />
            <Divider />
            <Message />
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
