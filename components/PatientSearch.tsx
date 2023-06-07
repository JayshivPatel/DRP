import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { List, Searchbar, Card } from "react-native-paper";
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
    <Card
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Card.Title
        title="Patient Search"
        titleStyle={{ color: "black" }}
        titleVariant={"titleLarge"}
      ></Card.Title>

      <Card.Content
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>Date Of Birth: </Text>
          <DateInput value={dateOfBirth} onChange={setDateOfBirth} />
        </View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>Name: </Text>
          <Searchbar
            placeholder="Search by name.."
            value={nameQuery}
            onChangeText={setNameQuery}
            style={{
              backgroundColor: "white",
              marginTop: 20,
              maxHeight: 60,
              maxWidth: 200,
              borderWidth: 1,
            }}
          />
        </View>

        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={item.nhsNumber}
              left={(props) => <List.Icon {...props} icon="account" />}
              onPress={() => props.setPatient(item)}
              style={{ backgroundColor: "white", borderRadius: 15 }}
            />
          )}
        />
      </Card.Content>
    </Card>
  );
}
