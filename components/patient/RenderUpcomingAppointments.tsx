import { View } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { Patient } from "../../lib/api";
import PatientAppointment from "./PatientAppointment";
import { filterAppointments } from "./SortAppointments";

const renderUpcomingAppointments = function (
  data: any,
  error: Error | undefined,
  isLoading: boolean,
  patientId: Patient["id"]
) {
  const appointments = filterAppointments(data, patientId, false)
  if (error || isLoading) {
    return (
      <View>
        <Text>{error ? "Failed to load" : "Loading"}</Text>
      </View>
    );
  }
  console.log(patientId)
  console.log(appointments)
  if (appointments.length == 0) {
    return (
      <View>
        <Text>{"No upcoming appointments"}</Text>
      </View>
    )
  } else {
    return appointments.map((app) => (
      <>
        <PatientAppointment {...app} />
        <Divider />
      </>
    ))
  }

};

export default renderUpcomingAppointments;
