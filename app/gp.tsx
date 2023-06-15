import * as React from "react";
import { OrderedSet } from "immutable";

import type { Clinic, Patient } from "../lib/api";

import Container from "../components/staff/Container";
import ClinicToolbar from "../components/staff/ClinicToolbar";
import ClinicViews from "../components/staff/ClinicViews";
import PatientToolbar from "../components/staff/PatientToolbar";

import ChangePatientDialog from "../components/staff/ChangePatientDialog";
import { DatePickerModal } from "react-native-paper-dates";
import ChangeSuggestedDurationDialog from "../components/staff/ChangeSuggestedDurationDialog";

export default function GP() {
  const [changeDateVisible, setChangeDateVisible] = React.useState(false);
  const [changePatientVisible, setChangePatientVisible] = React.useState(false);
  const [changeSuggestedDurationVisible, setChangeSuggestedDurationVisible] =
    React.useState(false);

  function formatDate(date: Date): string {
    /* TODO(saleem): Change to date library */
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  const [date, setDate] = React.useState(formatDate(new Date()));
  const [selectedClinics, setSelectedClinics] = React.useState(
    OrderedSet<Clinic["id"]>()
  );
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  function openSuggestedDuration() {
    setChangeSuggestedDurationVisible(true);
  }

  function closeSuggestedDuration() {
    setChangeSuggestedDurationVisible(false);
  }

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

  function updateSuggestedDuration(duration: number) {
    alert("new duration " + duration);
  }

  return (
    <Container>
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
        changeSuggestedDuration={openSuggestedDuration}
        gp={true}
      />
      <ClinicViews
        date={date}
        selected={selectedClinics}
        onChangeSelected={onChangeSelected}
        patient={patient}
        changePatient={openChangePatient}
        gp={true}
      />
      <ChangePatientDialog
        visible={changePatientVisible}
        onChangePatient={onChangePatient}
        onDismiss={closeChangePatient}
      />
      <ChangeSuggestedDurationDialog
        visible={changeSuggestedDurationVisible}
        onDismiss={closeSuggestedDuration}
        updateSuggestedDuration={updateSuggestedDuration}
      />
    </Container>
  );
}
