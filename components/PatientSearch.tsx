import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { List, Searchbar } from "react-native-paper";
import DateInput from "./DateInput";

import type { Patient } from "../lib/api";
import { usePatients } from "../lib/api";

export default function PatientSearch(props: {
  setPatient: (patient: Patient) => void;
}) {
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [nameQuery, setNameQuery] = useState("");

  const searchResults = usePatients({ dateOfBirth })
    .data?.map((item) => ({
      name: `${item.firstName} ${item.lastName}`,
      ...item,
    }))
    .filter((item) =>
      item.name.toLowerCase().includes(nameQuery.toLowerCase())
    );

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Patient Search</Text>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DateInput value={dateOfBirth} onChange={setDateOfBirth} />
        <Searchbar
          placeholder="Name"
          value={nameQuery}
          onChangeText={setNameQuery}
        />

        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={item.nhsNumber}
              left={(props) => <List.Icon {...props} icon="account" />}
              onPress={() => props.setPatient(item)}
            />
          )}
        />
      </View>
    </View>
  );
}
