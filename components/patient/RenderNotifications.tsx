import { FlatList, View } from "react-native";
import { Text, List, Card, Badge } from "react-native-paper";
import { Patient } from "../../lib/api";

const ComponentTest = (props: { isRead: boolean }) => {
  if (!props.isRead) {
    return <Badge>!</Badge>;
  }
  return <></>;
};

const renderNotifications = function (
  data: any,
  error: Error | undefined,
  isLoading: boolean,
  patientId: Patient["id"]
) {
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
        <Card
          onPress={() => item.isRead} // TODO: This should update the notification status in the database
        >
          <Card.Content>
            <ComponentTest isRead={item.isRead} />
            <List.Item
              title={"Message"}
              description={item.message}
              left={(props) => <List.Icon {...props} icon="email" />}
            />
          </Card.Content>
        </Card>
      )}
    />
  );
};

export default renderNotifications;
