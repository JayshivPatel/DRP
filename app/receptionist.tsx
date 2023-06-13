import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { DefaultTheme, PaperProvider, Surface } from "react-native-paper";
import { OrderedSet } from "immutable";

import type { Clinic, Patient } from "../lib/api";

import ClinicToolbar from "../components/receptionist/ClinicToolbar";
import ClinicViews from "../components/receptionist/ClinicViews";
import PatientToolbar from "../components/receptionist/PatientToolbar";

import materialColors from "../material-colors.json";
import ChangePatientDialog from "../components/receptionist/ChangePatientDialog";
import { DatePickerModal } from "react-native-paper-dates";
import { SWRConfig } from "swr";

export default function Receptionist() {
  const [changeDateVisible, setChangeDateVisible] = React.useState(false);
  const [changePatientVisible, setChangePatientVisible] = React.useState(false);

  function formatDate(date: Date): string {
    /* TODO(saleem): Change to date library */
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  const [date, setDate] = React.useState(formatDate(new Date()));
  const [selectedClinics, setSelectedClinics] = React.useState(
    OrderedSet<Clinic["id"]>()
  );
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  function openChangeDate() {
    setChangeDateVisible(true);
  }

  function closeChangeDate() {
    setChangeDateVisible(false);
  }

  function openChangePatient() {
    setChangePatientVisible(true);
  }

  function closeChangePatient() {
    setChangePatientVisible(false);
  }

  function onConfirmDate(params: { date: Date }) {
    const newDate = formatDate(params.date);
    if (date != newDate) {
      setSelectedClinics(OrderedSet());
    }
    setDate(newDate);
    closeChangeDate();
  }

  function onChangeSelected(selected: OrderedSet<Clinic["id"]>) {
    setSelectedClinics(selected);
  }

  function onChangePatient(patient: Patient) {
    setPatient(patient);
    closeChangePatient();
  }

  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        colors: materialColors.colors,
      }}
    >
      <SWRConfig
        value={{
          refreshInterval: 100,
        }}
      >
        <View style={styles.container}>
          <ClinicToolbar
            date={date}
            selected={selectedClinics}
            changeDate={openChangeDate}
            onChangeSelected={onChangeSelected}
          />
          <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={changeDateVisible}
            date={new Date(date)}
            onConfirm={onConfirmDate as any}
            onDismiss={closeChangeDate}
          />
          <PatientToolbar patient={patient} changePatient={openChangePatient} />
          <ClinicViews
            date={date}
            selected={selectedClinics}
            onChangeSelected={onChangeSelected}
            patient={patient}
            changePatient={openChangePatient}
          />
          <ChangePatientDialog
            visible={changePatientVisible}
            onChangePatient={onChangePatient}
            onDismiss={closeChangePatient}
          />
        </View>
      </SWRConfig>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...(Platform.OS == "web" ? { height: "100vh" } : {}),
  },
});
