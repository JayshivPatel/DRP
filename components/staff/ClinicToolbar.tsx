import * as React from "react";
import {
  ActivityIndicator,
  Button,
  Chip,
  Snackbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { OrderedSet } from "immutable";

import { Clinic, createClinic, useClinics } from "../../lib/api";
import CreateClinicDialog from "./CreateClinicDialog";
import Toolbar from "./Toolbar";

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
        <Toolbar.Text
          style={{
            color: theme.colors.error,
          }}
        >
          Failed to load clinics for {dateString}
        </Toolbar.Text>
      </>
    );
  } else if (isLoading) {
    content = (
      <>
        <ActivityIndicator />
        <Toolbar.Text>Loading clinics for {dateString}</Toolbar.Text>
      </>
    );
  } else {
    content = (
      <>
        <Button
          mode="outlined"
          icon="calendar-month"
          onPress={props.changeDate}
        >
          Change date
        </Button>
        <Toolbar.Text>Available clinics for {dateString}</Toolbar.Text>
        {data?.map((clinic) => (
          <ClinicItem
            key={clinic.id}
            clinic={clinic}
            selected={props.selected.has(clinic.id)}
            onChange={(value) => onChange(clinic, value)}
          />
        ))}
        <Button
          mode="outlined"
          icon="clipboard-list"
          onPress={openCreateDialog}
        >
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

  return <Toolbar>{content}</Toolbar>;
}
