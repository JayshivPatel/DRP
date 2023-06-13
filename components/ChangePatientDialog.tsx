import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Dialog,
  Portal,
  List,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";

import { Patient, usePatients } from "../lib/api";
import { DatePickerInput } from "react-native-paper-dates";

function getPatientFullName({ firstName, lastName }: Patient): string {
  return `${firstName} ${lastName}`;
}

function Result(props: { patient: Patient; onPress: (id: Patient) => void }) {
  const title = `${getPatientFullName(props.patient)}`;
  const description = `NHS Number: ${props.patient.nhsNumber}`;

  return (
    <List.Item
      title={title}
      description={description}
      left={(props) => <List.Icon {...props} icon="account" />}
      onPress={() => props.onPress(props.patient)}
    />
  );
}

export default function ChangePatientDialog(props: {
  visible: boolean;
  onDismiss: () => void;
  onChangePatient: (id: Patient) => void;
}) {
  const theme = useTheme();

  const [dateOfBirth, setDateOfBirth] = React.useState<Date>(
    new Date(2000, 0, 1)
  );
  const [query, setQuery] = React.useState("");

  function formatDate(date: Date): string {
    /* TODO(saleem): Change to date library */
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function onChangeDate(date?: Date) {
    if (date) {
      setDateOfBirth(date);
    }
  }

  const { data, error, isLoading } = usePatients({
    dateOfBirth: formatDate(dateOfBirth),
  });

  const canonicalQuery = query.toLocaleLowerCase();
  const results = data?.filter((patient) =>
    getPatientFullName(patient).toLocaleLowerCase().includes(canonicalQuery)
  );

  let content;
  if (error) {
    content = (
      <>
        <View style={styles.row}>
          <Text
            variant="labelLarge"
            style={{
              color: theme.colors.error,
            }}
          >
            Failed to load results
          </Text>
        </View>
      </>
    );
  } else if (isLoading) {
    content = (
      <>
        <View style={styles.row}>
          <ActivityIndicator />
          <Text variant="labelLarge">Loading results</Text>
        </View>
      </>
    );
  } else if (results) {
    content = (
      <>
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <Result patient={item} onPress={props.onChangePatient} />
          )}
        />
      </>
    );
  }

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Title>Search for patient</Dialog.Title>
        <Dialog.Content>
          <DatePickerInput
            locale="en-GB"
            inputMode="end"
            label="Date of birth"
            value={dateOfBirth}
            onChange={onChangeDate}
          />
          <Searchbar
            placeholder="Search by name"
            value={query}
            onChangeText={setQuery}
          />
          {content}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
  },
});
