import React from "react";
import Schedule from "./Schedule";
import { Clinic } from "../lib/api";
import { View, Text, StyleSheet } from "react-native";

export default class ClinicInfo extends React.Component<{ clinic?: Clinic }> {
  render() {
    const { clinic } = this.props;

    if (!clinic) {
      return (
        <View style={styles.container}>
          <Text>Clinic failed to load</Text>
        </View>
      );
    }

    return <Schedule title={clinic.title} date={clinic.date} />;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
  },
});
