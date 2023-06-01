import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        border="dashed"
        color="C0C0C0"
        height="50px"
        onClick={() => alert("Text message pipeline not implemented yet")}
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
