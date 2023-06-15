import { FlatList, View } from "react-native";
import { Text, List, Card, Badge, Divider } from "react-native-paper";
import { Notification, Patient, updateNotification } from "../../lib/api";
import * as React from "react";

function NotificationBadge(props: { isRead: boolean }) {
  return props.isRead ? <></> : <Badge>!</Badge>;
}

export default function PatientNotifications(props: {
  notifications?: Notification[];
  error?: Error;
  isLoading: boolean;
  mutate: () => void;
  unreadOnly?: boolean;
}) {
  const notifications = React.useMemo(() => {
    if (!props.unreadOnly) {
      return props.notifications;
    }

    return props.notifications?.filter((item) => !item.isRead);
  }, [props.notifications]);

  if (props.error || props.isLoading) {
    return (
      <View>
        <Text>{props.error ? "Failed to load" : "Loading"}</Text>
      </View>
    );
  }

  function onChangeRead(id: number, isRead: boolean) {
    updateNotification(id, { isRead }).then(() => props.mutate());
  }

  if (notifications!.length == 0) {
    return (
      <View>
        <Text>{props.unreadOnly ? "No unread messages" : "No messages"}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <>
          <Card
            style={{ margin: 10 }}
            onPress={() => onChangeRead(item.id, true)}
          >
            <Card.Content>
              <NotificationBadge isRead={item.isRead} />
              <List.Item
                title={"Message"}
                description={item.message}
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
}
