import { FlatList, StyleSheet, Text, View } from "react-native";
import Clinic from "./components/Clinic";

export default function App() {
  return (
        <View
            style={[
                styles.container,
                {
                    flexDirection: "row",
                },
            ]}>
            <Clinic></Clinic>
            <Clinic></Clinic>
            <Clinic></Clinic>
            <Clinic></Clinic>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  }
});
