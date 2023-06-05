import { FlatList, StyleSheet, Text, View } from "react-native";
import Clinic from "./components/Clinic";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
          },
        ]}
      >
        <Clinic></Clinic>
        <Clinic></Clinic>
        <Clinic></Clinic>
        <Clinic></Clinic>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
