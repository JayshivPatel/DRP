import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Patient } from "../lib/api";
import { List, Card } from "react-native-paper";

export default class PatientInfo extends React.Component<{
  patient?: Patient;
}> {
  render() {
    const { patient } = this.props;

    if (!patient) {
      return (
        <View style={styles.container}>
          <Text>No patient selected</Text>
        </View>
      );
    }

    const fields = [
      ["Name", `${patient.firstName} ${patient.lastName}`],
      ["Date of birth", `${patient.dateOfBirth}`],
      ["NHS number", `${patient.nhsNumber}`],
      ["Phone number", `${patient.phoneNumber}`],
    ];

    return (
      <Card style={styles.container}>
        <FlatList
          data={fields}
          renderItem={({ item }) => (
          <List.Item title={item[0]} description={item[1]} />
          )}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196f3",
    color: "black"
  },
});
