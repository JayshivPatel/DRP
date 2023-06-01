import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import * as API from "./lib/api";

async function onClick() {
  const recipient = prompt("Phone number", "+447770160480");
  if (!recipient) return;

  const lateness = parseInt(prompt("How late?", "45") || "");
  if (Number.isNaN(lateness)) return;

  try {
    await API.notifySMS(recipient, lateness);
  } catch (e) {
    alert("SMS failed: " + e);
    return;
  }

  alert("SMS successful!");
}

export default function App() {
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
});
