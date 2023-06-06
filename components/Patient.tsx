import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default class Patient extends React.Component<
  {
    name: string;
    dob: string;
    address: string;
    phone: string;
    nhsNum: string;
    flags: string;
    avgTime: string;
  },
  {}
> {
  render() {
    const name = this.props.name;
    const dob = this.props.dob;
    const address = this.props.address;
    const phone = this.props.phone;
    const nhsNum = this.props.nhsNum;
    const flags = this.props.flags;
    const avgTime = this.props.avgTime;
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
    fontFamily: "Times New Roman"
  },
});
