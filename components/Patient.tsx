import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const name = "Test Name";
const dob = "01/02/1234";
const address = "Test Address";
const phone = "0123456789";
const nhsNum = "0000000000";
const flags = "Test flags";
const avgTime = "15";

export default class Patient extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            { key: `Name: ${name}` },
            { key: `DoB: ${dob}` },
            { key: `Address: ${address}` },
            { key: `Phone: ${phone}` },
            { key: `NHS Number: ${nhsNum}` },
            { key: `Flags: ${flags}` },
            { key: `Average Time: ${avgTime}` },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 32,
  },
});
