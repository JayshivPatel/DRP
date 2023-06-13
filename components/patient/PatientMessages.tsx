import {
  Card,
  Divider,
  PaperProvider,
  Text,
  Button,
  List,
} from "react-native-paper";
import Message from "./PatientMessage";
import { ScrollView, StyleSheet, FlatList, View } from "react-native";
import * as api from "../../lib/api";

export default function PatientMessages() {
  const { data, error, isLoading, mutate } = api.useNotifications();

  const notifications = (function () {
    if (error || isLoading) {
      return (
        <View>
          <Text>{error ? "Failed to load" : "Loading"}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <List.Item
            title={"Message"}
            description={item.message}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
        )}
      />
    );
  })();

  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title title="Your Messages" titleVariant="displayMedium" />
          <Card.Content>
            <Card>
              <Card.Content style={styles.messagebuttons}>
                <Button onPress={() => alert("Button pressed")}>
                  All Messages
                </Button>
                <Button>Unread Messages</Button>
                <Button>Read Messages</Button>
              </Card.Content>
            </Card>
            <Card>
              <Card.Title title="Messages" titleVariant="headlineMedium" />
              <Card.Content>{notifications}</Card.Content>
            </Card>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  messagebuttons: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
