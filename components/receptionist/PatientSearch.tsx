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
      <Card>
        <Card.Title
          title="Patient Search"
          titleVariant={"headlineLarge"}
        ></Card.Title>

        <Card.Content
          style={{
            flexDirection: "column",
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View>
              <Text variant="titleLarge">
                Date Of Birth:{" "}
              </Text>
              <DateInput value={dateOfBirth} onChange={setDateOfBirth} />

              <Text
                variant="titleMedium"
                style={{marginTop: 20 }}
              >
                Name:
              </Text>
              <Searchbar
                placeholder="Search by name.."
                value={nameQuery}
                onChangeText={setNameQuery}
                mode="bar"

                style={{
                  marginTop: 0,
                  maxHeight: 55,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <PaperProvider>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  description={"NHS No. " +item.nhsNumber}
                  left={(props) => <List.Icon {...props} icon="account" />}
                  onPress={() => props.setPatient(item)}
                  style={{borderRadius: 15}}
                />
              )}
            />
          </PaperProvider>
        </Card.Content>
      </Card>
    </PaperProvider>
  );
}
