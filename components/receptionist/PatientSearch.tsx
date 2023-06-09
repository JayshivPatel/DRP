import React, { useState } from "react";
import { View, FlatList } from "react-native";
import {
  List,
  Searchbar,
  Card,
  Text,
  Divider,
  PaperProvider,
} from "react-native-paper";
import DateInput from "./DateInput";

import type { Patient } from "../../lib/api";
import { usePatients } from "../../lib/api";

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
    <PaperProvider theme={{ version: 2 }}>
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
          titleVariant={"headlineLarge"}
        ></Card.Title>

        <Card.Content
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View>
              <Text variant="titleMedium" style={{ color: "black" }}>
                Date Of Birth:{" "}
              </Text>
              <DateInput value={dateOfBirth} onChange={setDateOfBirth} />

              <Text
                variant="titleMedium"
                style={{ color: "black", marginTop: 20 }}
              >
                Name:
              </Text>
              <Searchbar
                placeholder="Search by name.."
                value={nameQuery}
                onChangeText={setNameQuery}
                mode="bar"
                iconColor="white"
                style={{
                  backgroundColor: "#2196f3",
                  marginTop: 0,
                  maxHeight: 55,
                  borderWidth: 1,
                  color: "white",
                  borderRadius: 10,
                }}
                theme={{ colors: { primary: "white" } }}
              />
            </View>
          </View>
          <PaperProvider theme={{ version: 2 }}>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  description={item.nhsNumber}
                  left={(props) => <List.Icon {...props} icon="account" />}
                  onPress={() => props.setPatient(item)}
                  style={{ backgroundColor: "#2196f3", borderRadius: 15 }}
                />
              )}
            />
          </PaperProvider>
        </Card.Content>
      </Card>
    </PaperProvider>
  );
}
