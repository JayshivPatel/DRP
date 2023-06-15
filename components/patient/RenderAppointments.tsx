import { KeyedMutator } from "swr";
import { Patient, PatientFull } from "../../lib/api";
import { View } from "react-native";
import { Text, Divider } from "react-native-paper";
import PatientAppointment from "./PatientAppointment";
import { filterAppointments } from "./SortAppointments";

export const renderAppointments = function (
  data: any,
  error: Error | undefined,
  isLoading: boolean,
  patientId: Patient["id"],
  mutate: KeyedMutator<PatientFull>,
  past: boolean
) {
  const upcoming = past ? "previous" : "upcoming";

  const appointments = filterAppointments(data, patientId, past);
  if (error || isLoading) {
    return (
      <View>
        <Text>{error ? "Failed to load" : "Loading"}</Text>
      </View>
    );
  }
  if (appointments.length == 0) {
    return (
      <View>
        <Text>{"No " + upcoming + " appointments"}</Text>
      </View>
    );
  } else {
    return appointments.map((app) => (
      <>
        <PatientAppointment {...app} mutate={mutate} cancellable={!past} />
        <Divider />
      </>
    ));
  }
};
