import { FlatList, View } from "react-native";
import { Text, List } from "react-native-paper";

const renderNotifications = function (data: any, error: any, isLoading: any) {
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
};

export default renderNotifications;
