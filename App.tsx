import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import * as api from "./lib/api";
import { late } from "zod";

export default function App() {
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
          <View style={styles.notification}>
            <Text>{item.message}</Text>
            <Button
              border="dashed"
              color="C0C0C0"
              height="50px"
              onClick={async () => {
                await api.deleteNotification(item.id);
                mutate();
              }}
              radius="0%"
              width="200px"
            >
              <Text>Delete</Text>
            </Button>
          </View>
        )}
      />
    );
  })();

  async function onClick() {
    const recipient = prompt("Phone number", "+447770160480");
    if (!recipient) return;

    const lateness = parseInt(prompt("How late?", "45") || "");
    if (Number.isNaN(lateness)) return;

    try {
      await api.createNotification(lateness);
      mutate();
    } catch (e) {
      alert("Web notification failed: " + e);
    }

    try {
      await api.notifySMS(recipient, lateness);
    } catch (e) {
      alert("SMS failed: " + e);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        border="dashed"
        color="C0C0C0"
        height="50px"
        onClick={onClick}
        radius="0%"
        width="200px"
        children="Send text to patient"
      />
      {notifications}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    backgroundColor: "#f9c2ff",
    marginVertical: 16,
    padding: 20,
  },
});
