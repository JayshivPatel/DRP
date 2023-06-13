import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Chip,
  Snackbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { Collection, OrderedSet } from "immutable";

import { Clinic, createClinic, useClinics } from "../lib/api";
import CreateClinicDialog from "./CreateClinicDialog";

function ClinicItem(props: {
  clinic: Clinic;
  selected: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Chip
      mode="flat"
      showSelectedOverlay
      selected={props.selected}
      onPress={() => props.onChange(!props.selected)}
    >
      {props.clinic.title}
    </Chip>
  );
}

export default function ClinicToolbar(props: {
  date: string;
  selected: OrderedSet<Clinic["id"]>;
  changeDate: () => void;
  onChangeSelected: (selected: OrderedSet<Clinic["id"]>) => void;
}) {
  const theme = useTheme();

  const { data, error, isLoading, mutate } = useClinics({
    date: props.date,
  });

  const [createVisible, setCreateVisible] = React.useState(false);
  const [createFailed, setCreateFailed] = React.useState(false);

  const dateString = new Date(props.date).toLocaleDateString();

  function onChange(clinic: Clinic, value: boolean) {
    const newSelected = value
      ? props.selected.add(clinic.id)
      : props.selected.delete(clinic.id);
    props.onChangeSelected(newSelected);
  }

  function openCreateDialog() {
    setCreateVisible(true);
  }

  function closeCreateDialog() {
    setCreateVisible(false);
  }

  function onCreateClinic(title: string) {
    createClinic(props.date, title)
      .then((id) => {
        /* Show the newly created clinic */
        props.onChangeSelected(props.selected.add(id));
        mutate();
      })
      .catch((e) => {
        console.error(e);
        setCreateFailed(true);
      });

    closeCreateDialog();
  }

  let content;
  if (error) {
    content = (
      <>
        <Text
          variant="labelLarge"
          style={{
            color: theme.colors.error,
            ...styles.text,
          }}
        >
          Failed to load clinics for {dateString}
        </Text>
      </>
    );
  } else if (isLoading) {
    content = (
      <>
        <ActivityIndicator />
        <Text variant="labelLarge" style={styles.text}>
          Loading clinics for {dateString}
        </Text>
      </>
    );
  } else {
    content = (
      <>
        <Text variant="labelLarge" style={styles.text}>
          Available clinics for {dateString}
        </Text>
        <Button mode="outlined" onPress={props.changeDate}>
          Change date
        </Button>
        {data?.map((clinic) => (
          <ClinicItem
            key={clinic.id}
            clinic={clinic}
            selected={props.selected.has(clinic.id)}
            onChange={(value) => onChange(clinic, value)}
          />
        ))}
        <Button mode="outlined" onPress={openCreateDialog}>
          Create clinic
        </Button>
        <CreateClinicDialog
          visible={createVisible}
          onDismiss={closeCreateDialog}
          date={dateString}
          onCreate={onCreateClinic}
        />
        <Snackbar
          visible={createFailed}
          onDismiss={() => setCreateFailed(false)}
        >
          Failed to create clinic
        </Snackbar>
      </>
    );
  }

  return (
    <Surface mode="flat" elevation={1} style={styles.surface}>
      {content}
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    flexBasis: 56,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 8,
  },
});
