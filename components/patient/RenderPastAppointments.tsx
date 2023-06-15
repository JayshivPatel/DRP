import { FlatList, View } from "react-native";
import { Text, List, Card, Divider } from "react-native-paper";
import { Patient, PatientFull } from "../../lib/api";
import { Appointment } from "../../lib/api";
import PatientAppointment from "./PatientAppointment";
import { filterAppointments } from "./SortAppointments";
import { KeyedMutator } from "swr";

const renderPastAppointments = function (
  data: any,
  error: Error | undefined,
  isLoading: boolean,
  patientId: Patient["id"],
  mutate: KeyedMutator<PatientFull>
) {
  const appointments = filterAppointments(data, patientId, true);
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
        <Text>{"No previous appointments"}</Text>
      </View>
    );
  } else {
    return appointments.map((app) => (
      <>
        <PatientAppointment {...app} mutate={mutate} cancellable={false} />
        <Divider />
      </>
    ));
  }
};

export default renderPastAppointments;
