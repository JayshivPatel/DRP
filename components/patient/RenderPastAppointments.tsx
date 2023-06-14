import { View } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { Patient } from "../../lib/api";
import PatientAppointment from "./PatientAppointment";
import { filterAppointments } from "./SortAppointments";

const renderPastAppointments = function (
  data: any,
  error: Error | undefined,
  isLoading: boolean,
  patientId: Patient["id"]
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
        <PatientAppointment {...app} />
        <Divider />
      </>
    ));
  }
};

export default renderPastAppointments;
