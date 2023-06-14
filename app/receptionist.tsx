import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { DefaultTheme, PaperProvider, Surface } from "react-native-paper";
import { OrderedSet } from "immutable";

import type { Clinic, Patient } from "../lib/api";

import ClinicToolbar from "../components/staff/ClinicToolbar";
import ClinicViews from "../components/staff/ClinicViews";
import PatientToolbar from "../components/staff/PatientToolbar";

import materialColors from "../material-colors.json";
import ChangePatientDialog from "../components/staff/ChangePatientDialog";
import { DatePickerModal } from "react-native-paper-dates";
import Config from "../components/Config";

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
    <Config>
      <View style={styles.container}>
        <PaperProvider
          theme={{
            ...DefaultTheme,
            colors: materialColors.colors,
          }}
        >
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
          <PatientToolbar
            patient={patient}
            changePatient={openChangePatient}
            gp={false}
          />
          <ClinicViews
            date={date}
            selected={selectedClinics}
            onChangeSelected={onChangeSelected}
            patient={patient}
            changePatient={openChangePatient}
            gp={false}
          />
          <ChangePatientDialog
            visible={changePatientVisible}
            onChangePatient={onChangePatient}
            onDismiss={closeChangePatient}
          />
        </PaperProvider>
      </View>
    </Config>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    ...(Platform.OS == "web" && { height: "100vh" }),
  },
});
