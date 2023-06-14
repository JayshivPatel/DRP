import { FlatList, View } from "react-native";
import { Text, List, Card, Badge, Divider } from "react-native-paper";
import { Patient } from "../../lib/api";
import { useEffect, useState } from "react";

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
  if (data.length == 0) {
    return (
      <View>
        <Text>{"No messages"}</Text>
      </View>
    );
  }

  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowIcon(window.innerWidth >= 285);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <>
          <Card
            style={{ margin: 10 }}
            onPress={() => item.isRead} // TODO: This should update the notification status in the database
          >
            <Card.Content>
              <ComponentTest isRead={item.isRead} />
              <List.Item
                title={"Message"}
                description={item.message}
                left={
                  showIcon
                    ? (props) => <List.Icon {...props} icon="email" />
                    : undefined
                }
                titleNumberOfLines={2}
                descriptionNumberOfLines={100}
                style={{ flex: 1 }}
              />
            </Card.Content>
          </Card>
          <Divider />
        </>
      )}
    />
  );
};

export default renderNotifications;
